"use client";
import React,{useState,useEffect, Suspense} from 'react';
import HoverBox from '@/app/components/result/hoverBox';
import ConfirmedResultBox from '@/app/components/result/confirmed-resultBox';
import ResultCalendar from '@/app/components/calendar/result-calender';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { SERVER_BASE_URL } from '@/app/constants/BaseUrl';

const ResultPage = () => {
    const router = useRouter();
    const params = useSearchParams();
    const meetingId = params.get('meetingId');

    // 호버한 쎌 데이터
    const [hoveredInfo, setHoveredInfo] = useState({
      date:null
  });

    // details 데이터
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
      };
    
      // sortDataByRatio 함수 수정
      // 이 함수가 이제 인자로 데이터를 받도록 함
      const sortDataByRatio = (data) => {
        const allData = data.flatMap(item => {
          const date = Object.keys(item)[0];
          return item[date].map(entry => ({
            date,
            ...entry,
            ratio: parseFloat(entry.ratio)
          }));
        });
    
        const sortedData = allData.sort((a, b) => {
          if (isNaN(a.ratio)) return 1;
          if (isNaN(b.ratio)) return -1;
          return b.ratio - a.ratio;
        });
    
        return sortedData;
      };
      fetchMeetingInfo();
    }, [meetingId]);
    

    // 날짜와 시간대 정보를 처리할 함수
    const handleHoverChange = (date) => {
        setHoveredInfo({ date });
        console.log(date);
    };

    // hoveredInfo를 기반으로 해당하는 데이터 찾기
    const findDataForHoveredInfo = () => {
      if (!hoveredInfo || !hoveredInfo.date) {
          return null;
      }
      const formattedDate = hoveredInfo.date;
  
      // meetingInfo.data 배열을 순회하여 해당 날짜에 대한 데이터를 찾습니다.
      const dataEntry = meetingInfo.data.find(data => data.hasOwnProperty(formattedDate));
      if (!dataEntry) {
          return null;
      }
  
      // 찾은 데이터와 날짜를 포함하는 객체를 반환합니다.
      return {
          date: formattedDate,
          data: dataEntry[formattedDate],
      };
  };
  

        // hoveredInfo를 기반으로 해당하는 데이터 찾기
        const slotData = findDataForHoveredInfo();
        
        const onClickFilterBtn = () => {
            console.log('필터 버튼 클릭');
          }
          // 데이터 로딩 중일 때 로딩 인디케이터를 보여줍니다.
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error loading meeting data: {error}</div>;
          if (!meetingInfo) return <div>Meeting information is not available.</div>; // 데이터가 없을 경우를 처리
    return (
      <Suspense fallback={<div>Loading...</div>}> 
        <div className='w-[3/4] m-[50px] flex justify-between'>
            <div>
            {!loading &&<ResultCalendar onHoverChange={handleHoverChange} dateResult={meetingInfo}/>}
            </div>
            <div className='flex flex-col gap-2.5 mt-[50px]'>
            {hoveredInfo.date && slotData && <HoverBox date={hoveredInfo.date} slotData={slotData} />}
            <div className='flex justify-end'>
                    <button onClick={onClickFilterBtn} className="inline-flex px-6 py-2 justify-center items-center gap-2 rounded-full bg-gray-300">필터</button>
                </div>
                {
                filteredResultData.map((slot, index) => (
                  <ConfirmedResultBox key={index} slotData={slot} />
                ))
              }
            </div>
            <div className='fixed bottom-[24px] left-1/2 transform -translate-x-1/2 flex gap-2 font-main font-normal text-subtitle2'>
              <button className="flex w-[588px] h-[64px] px-16 justify-center items-center rounded-full bg-green-100"
                        onClick={()=> {router.back();}}>이전</button>
            </div>
        </div>
      </Suspense>
    )
}
export default ResultPage;
