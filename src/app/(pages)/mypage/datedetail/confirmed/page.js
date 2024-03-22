"use client";
import ConfirmedBox from '@/app/components/result/confirmedmeetingBox';
import ConfirmedResultBox from '@/app/components/result/confirmed-resultBox';
import React,{useState,useEffect} from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ResultCalendar from '@/app/components/calendar/result-calender';
import axios from 'axios';

const MypageDateConfirmedDetail = () => {
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


        // 데이터 로딩 중일 때 로딩 인디케이터를 보여줍니다.
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error loading meeting data: {error}</div>;
        if (!meetingInfo) return <div>Meeting information is not available.</div>; // 데이터가 없을 경우를 처리
      return (
        <div>
          <div className='flex items-center justify-center m-[50px]'>
            <ConfirmedBox slotData={meetingInfo} />
          </div>
          <div className='w-[3/4] flex justify-between'>
              <div>
                <ResultCalendar onHoverChange={()=>{}} dateResult={meetingInfo}/>
                </div>
                <div className='flex flex-col gap-2.5 mt-[50px]'>
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
    
    
export default MypageDateConfirmedDetail;
