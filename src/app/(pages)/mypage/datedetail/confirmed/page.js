"use client";
import ConfirmedBox from '@/app/components/result/confirmedmeetingBox';
import HoverBox from '@/app/components/result/hoverBox';
import ConfirmedResultBox from '@/app/components/result/confirmed-resultBox';
import React,{useState,useEffect,useMemo} from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ResultCalendar from '@/app/components/calendar/result-calender';

const MypageDateConfirmedDetail = () => {
      // 쿼리 파라미터
        const router = useRouter();
        const searchParams = useSearchParams()
        const meetingId = searchParams.get('meetingId');

        const [filteredResultData, setFilteredResultData] = useState([]);
        const [meetingInfo, setMeetingInfo] = useState(({
          "numberOfSubmit" : 6,
          "data": [
          {
            "2024-03-12": [
              {
                "attendee": ["박지우", "최유정", "오승준"],
                "ratio": 0.5
              }
            ],
            "2024-03-13": [
              {
                "attendee": ["박지우", "최유정", "오승준"],
                "ratio": 0.9
              }
            ],
            "2024-03-14": [
              {
                "attendee": ["박지우", "최유정", "오승준","오승준","오승준","오승준"],
                "ratio": 1.0
              }
            ]
          }]
        }));

        useEffect(() => {
          const sortDataByRatio = () => {
              // 객체의 배열을 단일 객체로 가정하는 현재 구조에 맞게 접근 수정 필요
              // 날짜별 데이터를 모두 포함하는 새로운 배열 생성
              const allData = Object.entries(meetingInfo.data[0]).flatMap(([date, data]) => {
                  return data.map(entry => ({
                      date,
                      ...entry
                  }));
              });
      
              // 생성된 배열을 ratio에 따라 정렬
              const sortedData = allData.sort((a, b) => b.ratio - a.ratio);
      
              return sortedData;
          };
      
          const filteredResultData = sortDataByRatio();
          setFilteredResultData(filteredResultData);
          console.log('Sorted by ratio:', filteredResultData);
      }, [meetingInfo]);


      return (
        <div>
          <div className='flex items-center justify-center m-[50px]'>
            <ConfirmedBox confirmedMeetingData={()=>console.log()} />
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
