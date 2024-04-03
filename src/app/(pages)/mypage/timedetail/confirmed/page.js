"use client";
import ConfirmedBox from '@/app/components/result/confirmedmeetingBox';
import ConfirmedResultBox from '@/app/components/result/confirmed-resultBox';
import ResultTimeTable from '@/app/components/table/result-timetable';
import React,{useState,useEffect} from 'react';
import { useRouter,useSearchParams } from 'next/navigation';
import axios from 'axios';
import { SERVER_BASE_URL } from '@/app/constants/BaseUrl';


const MypageConfirmedDetail = () => {
  // 쿼리 파라미터
  const router = useRouter();
  const searchParams = useSearchParams()
  const meetingId = searchParams.get('meetingId');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredResultData, setFilteredResultData] = useState([]);
  const [meetingInfo, setMeetingInfo] = useState(null);

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
  }, [meetingInfo]); // 의존성 배열에 meetingInfo 추가

  // 데이터 로딩 중일 때 로딩 인디케이터를 보여줍니다.
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading meeting data: {error}</div>;
  if (!meetingInfo) return <div>Meeting information is not available.</div>; // 데이터가 없을 경우를 처리
  
  return (
        <div>
      <div className='flex items-center justify-center m-[50px]'>
        {!loading && <ConfirmedBox slotData={meetingInfo} />}
      </div>
      <div className='w-[3/4] flex justify-between'>
          <div>
            {!loading && <ResultTimeTable onHoverChange={()=> console.log(0)} resultData={meetingInfo}/>}
            </div>
            <div className='flex flex-col gap-2.5 mt-[50px]'>
                {/* <div className='flex justify-end'>
                    <button onClick={onClickFilterBtn} className="inline-flex px-6 py-2 justify-center items-center gap-2 rounded-full bg-gray-300">필터</button>
                </div> */}
                {
                  filteredResultData.map((slot,index) => (
                    <ConfirmedResultBox
                      key={index}
                      slotData={slot}
                    />
                  ))
                }
            </div>
            <div className='fixed bottom-[24px] left-1/2 transform -translate-x-1/2 flex gap-2 font-main font-normal text-subtitle2'>
                <button className="flex w-[588px] h-[64px] px-16 justify-center items-center rounded-full bg-green-100"
                  onClick={()=> {router.back();}}>이전</button>
            </div>
          </div>
    </div>
  );
};

export default MypageConfirmedDetail;
