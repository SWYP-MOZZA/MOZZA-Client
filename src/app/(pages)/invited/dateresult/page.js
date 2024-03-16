"use client";
import React,{useState,useEffect,useMemo} from 'react';
import HoverBox from '@/app/components/result/hoverBox';
import ConfirmedResultBox from '@/app/components/result/confirmed-resultBox';
import ResultCalendar from '@/app/components/calendar/result-calender';
import { useSearchParams, useRouter } from 'next/navigation';


const ResultPage = () => {
    const ResultCalendarMemo = useMemo(() => ResultCalendar, []);
    const router = useRouter();
    const params = useSearchParams();
    const meetingId = params.get('meetingId');
    const [meetingInfo, setMeetingInfo] = useState(({
        "numberOfSubmit" : 6,
        "data": {
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
        }
      }));
    // const [meetingData, setMeetingData] = useState(
    //     {
    //       "meetingId": 123,
    //       "name": "Meeting1",
    //       "date" : ["2023-10-20","2023-10-21","2023-10-25"],
    //       "startTime": "09:00",
    //       "endTime": "18:00",   
    //     }
    //   );

    // useEffect(() => {
    //     console.log('dateSlots : ', dateSlots);
    // }
    // ,[dateSlots]);
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
        // dateSlots.data 객체에서 hoveredInfo.date에 해당하는 키로 직접 접근
        const formattedDate = hoveredInfo.date;
        const dayData = meetingInfo.data[formattedDate];
        if (!dayData) {
            return null;
        }
        // dayData에 날짜 정보를 추가하여 반환
        return {
            date: formattedDate, // 형식이 조정된 날짜
            data: dayData, // 해당 날짜의 데이터
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
            // meetingInfo.data를 기반으로 날짜 정보를 포함하는 새로운 배열 생성 및 정렬
            const sortDataByRatio = (meetingInfo) => {
                // meetingInfo.data의 각 항목에 대해 날짜 정보를 추가하고 하나의 배열로 결합
                const combinedData = Object.entries(meetingInfo.data).flatMap(([date, attendees]) => 
                    attendees.map(attendee => ({ 
                        date, 
                        ...attendee 
                    }))
                );
        
                // combinedData를 ratio에 따라 정렬
                const sortedData = combinedData.sort((a, b) => b.ratio - a.ratio);
        
                return sortedData;
            };
        
            // 정렬된 데이터를 filteredResultData 상태에 저장
            const filteredResultData = sortDataByRatio(meetingInfo);
            setFilteredResultData(filteredResultData);
            console.log('Sorted by ratio:', filteredResultData);
        }, [meetingInfo]); // meetingInfo가 변경될 때마다 정렬 로직 실행
        
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
            <ResultCalendarMemo onHoverChange={handleHoverChange} dateResult={meetingInfo}/>
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
