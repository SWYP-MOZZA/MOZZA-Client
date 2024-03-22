"use client";
import React,{useState,useEffect} from 'react';
import ConfiremdResultBox from '@/app/components/result/confirmed-resultBox';
import HoverBox from '@/app/components/result/hoverBox';
import ResultTimeTable from '@/app/components/table/result-timetable';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { SERVER_BASE_URL } from '@/app/constants/BaseUrl';

const ResultPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const meetingId = params.get('meetingId');

  const [hoveredInfo, setHoveredInfo] = useState({ date: null, time: null });

  const [meetingInfo, setMeetingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //resultBox 생성
  const [filteredResultData, setFilteredResultData] = useState([]);
  
  useEffect(() => {
    const fetchMeetingInfo = async () => {
      try {
        const response = await axios.get(`${SERVER_BASE_URL}/meeting/${meetingId}/details`);
        console.log('모임 정보:', response.data);
          
        // 상태 업데이트를 비동기적으로 받아온 데이터로 진행
        setMeetingInfo(response.data);
        setLoading(false);

        // 데이터를 성공적으로 불러온 후에 데이터 정렬 함수 호출
        const sortedData = sortDataByRatio(response.data.data); // 변경된 부분
        setFilteredResultData(sortedData); // 상태 업데이트
        console.log('Sorted by ratio:', sortedData);
      } catch (error) {
        console.error('Error fetching meeting data:', error);
        setError(error);
        setLoading(false);
      }
    } 

      const sortDataByRatio = (data) => {
      const allData = data.flatMap(item => {
      const date = Object.keys(item)[0];
        return item[date].map(entry => ({
          date,
          ...entry,
          ratio: parseFloat(entry.ratio)
        }));
      });

      const sortedData = allData.sort((a, b) => b.ratio - a.ratio);
      return sortedData;
    }
    fetchMeetingInfo();
  }, []); // 의존성 배열에 meetingInfo 추가

  const onClickFilterBtn = () => {
    console.log('필터 버튼 클릭');
  }

  // 날짜와 시간대 정보를 처리할 함수
  const handleHoverChange = (date, time) => {
    setHoveredInfo({ date, time });
    console.log(date,time);
  };

  // hoveredInfo를 기반으로 해당하는 데이터 찾기
  const findDataForHoveredInfo = () => {
    if (!hoveredInfo.date || !hoveredInfo.time) {
      return null;
    }

    const dayData = meetingInfo.data.find(dayObject => dayObject.hasOwnProperty(hoveredInfo.date));
    if (!dayData) {
      return null;
    }

    const slotData = dayData[hoveredInfo.date].find(slot => slot.time === hoveredInfo.time);
    return {
      date: hoveredInfo.date,
      time: hoveredInfo.time,
      data: [{
        attendee : slotData.attendee,
      }
      ]
    };
  };

  const slotData = findDataForHoveredInfo();

  // 데이터 로딩 중일 때 로딩 인디케이터를 보여줍니다.
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error ? error.toString() : 'No errors'}</div>;
  if (!meetingInfo) return <div>Meeting information is not available.</div>; // 데이터가 없을 경우를 처리
  return (
      <div className='m-[50px] w-[3/4] flex justify-between'>
          <div>
                {!loading && <ResultTimeTable onHoverChange={handleHoverChange}  resultData={meetingInfo}/>}
            </div>
            <div className='flex flex-col gap-2.5 mt-[50px]'>
              {hoveredInfo.date && hoveredInfo.time && <HoverBox date={hoveredInfo.date} slotData={slotData} />}
                <div className='flex justify-end'>
                    <button onClick={onClickFilterBtn} className="inline-flex px-6 py-2 justify-center items-center gap-2 rounded-full bg-gray-300">필터</button>
                </div>
                {
                filteredResultData.map((slot, index) => (
                  <ConfiremdResultBox key={index} slotData={slot} />
                ))
              }
            </div>
            <div className='fixed bottom-[24px] left-1/2 transform -translate-x-1/2 flex gap-2 font-main font-normal text-subtitle2'>
              <button className="flex w-[588px] h-[64px] px-16 justify-center items-center rounded-full bg-green-100"
                        onClick={()=> {router.back();}}>이전</button>
            </div>
          </div>
  );
};

export default ResultPage;
