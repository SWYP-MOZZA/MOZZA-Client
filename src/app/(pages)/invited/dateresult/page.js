"use client";
import React,{useState,useEffect,useMemo} from 'react';
import HoverBox from '@/app/components/result/hoverBox';
import ConfirmedResultBox from '@/app/components/result/confirmed-resultBox';
import ResultCalendar from '@/app/components/calendar/result-calender';
import { useSearchParams, useRouter } from 'next/navigation';


const ResultPage = () => {
    const router = useRouter();
    const params = useSearchParams();
    const meetingId = params.get('meetingId');
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

    //resultBox 생성
    const [filteredResultData, setFilteredResultData] = useState([]);

    // 호버한 쎌 데이터
    const [hoveredInfo, setHoveredInfo] = useState({
        date:null
    });

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
  
      // meetingInfo.data[0]를 통해 첫 번째 (그리고 유일한) 객체에 접근하고,
      // 해당 객체에서 formattedDate 키를 사용하여 데이터에 접근합니다.
      const dayDataArray = meetingInfo.data[0][formattedDate];
      if (!dayDataArray) {
          return null;
      }
  
      // 찾은 데이터와 날짜를 포함하는 객체를 반환합니다.
      return {
          date: formattedDate,
          data: dayDataArray,
      };
  };
  
    
    
        // hoveredInfo를 기반으로 해당하는 데이터 찾기
        const slotData = findDataForHoveredInfo();

        useEffect(() => {
            console.log('slotData : ', slotData);
            console.log('hoveredInfo.date : ', hoveredInfo.date);
        }
        ,[slotData,hoveredInfo.date]);

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
      
        
        
        const onClickFilterBtn = () => {
            console.log('필터 버튼 클릭');
          }

        const onClickBackBtn = () => {
            console.log('이전 버튼 클릭');
            router.back();
          }
        
          const onClickRegisterBtn = (meetingId) => {
            console.log('등록하기 버튼 클릭');
            router.push(`/invited/register/timeregister?meetingId=${meetingId}`);
          }
    return (
        <div className='w-[3/4] m-[50px] flex justify-between'>
            <div>
            <ResultCalendar onHoverChange={handleHoverChange} dateResult={meetingInfo}/>
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
                <button className="flex w-[282px] h-[64px] px-16 justify-center items-center rounded-full bg-green-100"
                  onClick={onClickBackBtn}
                >이전</button>
                <button className="flex w-[282px] h-[64px] px-16 justify-center items-center rounded-full bg-green-600 text-white"
                  onClick={()=>onClickRegisterBtn(meetingId)}
                >등록하기</button>
            </div>
        </div>
    )
}
export default ResultPage;
