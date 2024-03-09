"use client";
import ConfirmedBox from '@/app/components/result/result-time/confirmedmeetingBox';
import HoverBox from '@/app/components/result/result-time/hoverBox';
import ConfirmedResultBox from '@/app/components/result/result-time/confirmed-resultBox';
import ResultTimeTable from '@/app/components/table/result-timetable';
import React,{useState,useEffect} from 'react';
import { useRouter,useSearchParams } from 'next/navigation';


const MypageConfirmedDetail = () => {
  // 쿼리 파라미터
  const router = useRouter();
  const searchParams = useSearchParams()
  const meetingId = searchParams.get('meetingId');

  const [filteredResultData, setFilteredResultData] = useState([]);
  const [resultData, setResultData] = useState({
    "numberOfSubmit":6,
    "data":[
    {
      '2023-03-12': [
      { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
      { "time":"09:30", "attendee" : ["김태연", "정수정"] },
      { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
      { "time":"10:30", "attendee" : ["조인성", "정우성"] },
      { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
      { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
      { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
      { "time":"12:30", "attendee" : ["박서준", "박보영"] },
      { "time":"13:00", "attendee" : ["이민호", "김고은"] },
      { "time":"13:30", "attendee" : ["정해인", "김서형"] },
      { "time":"14:00", "attendee" : ["류준열", "전도연"] },
      { "time":"14:30", "attendee" : ["조승우", "배두나"] }
      ],
    '2023-03-13': [
      { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
      { "time":"09:30", "attendee" : ["김태연", "정수정"] },
      { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
      { "time":"10:30", "attendee" : ["조인성", "정우성"] },
      { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
      { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
      { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
      { "time":"12:30", "attendee" : ["박서준", "박보영"] },
      { "time":"13:00", "attendee" : ["이민호", "김고은"] },
      { "time":"13:30", "attendee" : ["정해인", "김서형"] },
      { "time":"14:00", "attendee" : ["류준열", "전도연"] },
      { "time":"14:30", "attendee" : ["조승우", "배두나"] }
    ],
    '2023-03-15': [
      { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
      { "time":"09:30", "attendee" : ["김태연", "정수정"] },
      { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
      { "time":"10:30", "attendee" : ["조인성", "정우성"] },
      { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
      { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
      { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
      { "time":"12:30", "attendee" : ["박서준", "박보영"] },
      { "time":"13:00", "attendee" : ["이민호", "김고은"] },
      { "time":"13:30", "attendee" : ["정해인", "김서형"] },
      { "time":"14:00", "attendee" : ["류준열", "전도연"] },
      { "time":"14:30", "attendee" : ["조승우", "배두나"] }
    ],
    '2023-03-17': [
      { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
      { "time":"09:30", "attendee" : ["김태연", "정수정"] },
      { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
      { "time":"10:30", "attendee" : ["조인성", "정우성"] },
      { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
      { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
      { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
      { "time":"12:30", "attendee" : ["박서준", "박보영"] },
      { "time":"13:00", "attendee" : ["이민호", "김고은"] },
      { "time":"13:30", "attendee" : ["정해인", "김서형"] },
      { "time":"14:00", "attendee" : ["류준열", "전도연"] },
      { "time":"14:30", "attendee" : ["조승우", "배두나"] }
    ],
    '2023-03-20': [
      { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
      { "time":"09:30", "attendee" : ["김태연", "정수정"] },
      { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
      { "time":"10:30", "attendee" : ["조인성", "정우성"] },
      { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
      { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
      { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
      { "time":"12:30", "attendee" : ["박서준", "박보영"] },
      { "time":"13:00", "attendee" : ["이민호", "김고은"] },
      { "time":"13:30", "attendee" : ["정해인", "김서형"] },
      { "time":"14:00", "attendee" : ["류준열", "전도연"] },
      { "time":"14:30", "attendee" : ["조승우", "배두나"] }
    ],
    '2023-03-22': [
      { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
      { "time":"09:30", "attendee" : ["김태연", "정수정"] },
      { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
      { "time":"10:30", "attendee" : ["조인성", "정우성"] },
      { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
      { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
      { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
      { "time":"12:30", "attendee" : ["박서준", "박보영"] },
      { "time":"13:00", "attendee" : ["이민호", "김고은"] },
      { "time":"13:30", "attendee" : ["정해인", "김서형"] },
      { "time":"14:00", "attendee" : ["류준열", "전도연"] },
      { "time":"14:30", "attendee" : ["조승우", "배두나"] }
    ],
    '2023-03-23': [
      { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
      { "time":"09:30", "attendee" : ["김태연", "정수정"] },
      { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
      { "time":"10:30", "attendee" : ["조인성", "정우성"] },
      { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
      { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
      { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
      { "time":"12:30", "attendee" : ["박서준", "박보영"] },
      { "time":"13:00", "attendee" : ["이민호", "김고은"] },
      { "time":"13:30", "attendee" : ["정해인", "김서형"] },
      { "time":"14:00", "attendee" : ["류준열", "전도연"] },
      { "time":"14:30", "attendee" : ["조승우", "배두나"] }
    ],
    '2023-03-24': [
      { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
      { "time":"09:30", "attendee" : ["김태연", "정수정"] },
      { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
      { "time":"10:30", "attendee" : ["조인성", "정우성"] },
      { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
      { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
      { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
      { "time":"12:30", "attendee" : ["박서준", "박보영"] },
      { "time":"13:00", "attendee" : ["이민호", "김고은"] },
      { "time":"13:30", "attendee" : ["정해인", "김서형"] },
      { "time":"14:00", "attendee" : ["류준열", "전도연"] },
      { "time":"14:30", "attendee" : ["조승우", "배두나"] }
    ],
    '2023-03-25': [
      { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
      { "time":"09:30", "attendee" : ["김태연", "정수정"] },
      { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
      { "time":"10:30", "attendee" : ["조인성", "정우성"] },
      { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
      { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
      { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
      { "time":"12:30", "attendee" : ["박서준", "박보영"] },
      { "time":"13:00", "attendee" : ["이민호", "김고은"] },
      { "time":"13:30", "attendee" : ["정해인", "김서형"] },
      { "time":"14:00", "attendee" : ["류준열", "전도연"] },
      { "time":"14:30", "attendee" : ["조승우", "배두나"] }
    ],
    '2023-03-26': [
      { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
      { "time":"09:30", "attendee" : ["김태연", "정수정"] },
      { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
      { "time":"10:30", "attendee" : ["조인성", "정우성"] },
      { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
      { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
      { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
      { "time":"12:30", "attendee" : ["박서준", "박보영"] },
      { "time":"13:00", "attendee" : ["이민호", "김고은"] },
      { "time":"13:30", "attendee" : ["정해인", "김서형"] },
      { "time":"14:00", "attendee" : ["류준열", "전도연"] },
      { "time":"14:30", "attendee" : ["조승우", "배두나"] }
    ],
    '2023-03-27': [
      { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
      { "time":"09:30", "attendee" : ["김태연", "정수정"] },
      { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
      { "time":"10:30", "attendee" : ["조인성", "정우성"] },
      { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
      { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
      { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
      { "time":"12:30", "attendee" : ["박서준", "박보영"] },
      { "time":"13:00", "attendee" : ["이민호", "김고은"] },
      { "time":"13:30", "attendee" : ["정해인", "김서형"] },
      { "time":"14:00", "attendee" : ["류준열", "전도연"] },
      { "time":"14:30", "attendee" : ["조승우", "배두나"] }
    ],
    '2023-03-28': [
      { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
      { "time":"09:30", "attendee" : ["김태연", "정수정"] },
      { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
      { "time":"10:30", "attendee" : ["조인성", "정우성"] },
      { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
      { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
      { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
      { "time":"12:30", "attendee" : ["박서준", "박보영"] },
      { "time":"13:00", "attendee" : ["이민호", "김고은"] },
      { "time":"13:30", "attendee" : ["정해인", "김서형"] },
      { "time":"14:00", "attendee" : ["류준열", "전도연"] },
      { "time":"14:30", "attendee" : ["조승우", "배두나"] }
    ]}]});

  useEffect(() => {
    // 필터링 및 정렬 로직
    const filteredAndSortedData = resultData.data.flatMap(dayObject => 
      Object.entries(dayObject).flatMap(([date, slots]) => 
        slots.map(slot => ({
          ...slot,
          date,
          ratio: slot.attendee.length / resultData.numberOfSubmit
        }))
        .filter(slot => slot.ratio >= 0.5)
      )
    ).sort((a, b) => b.ratio - a.ratio); // 비율이 높은 순으로 정렬
  
    // 필터링 및 정렬된 데이터를 상태에 저장
    setFilteredResultData(filteredAndSortedData);
  }, [resultData]); // 의존성 배열에 resultData 추가

  useEffect(() => {
    console.log(meetingId);
  }
  , [meetingId]);


  return (
    <div>
      <div className='flex items-center justify-center m-[50px]'>
        <ConfirmedBox confirmedMeetingData={()=>console.log()} />
      </div>
      <div className='w-[3/4] flex justify-between'>
          <div>
                <ResultTimeTable onHoverChange={()=> console.log(0)} resultData={resultData}/>
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
