"use client";
import React,{useState,useEffect,Suspense} from 'react';
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

  //더미데이터
  // const [meetingInfo, setMeetingInfo] = useState({
  //     name: "모임명1", // 추가 요청 
  //     "meetingId" : 1,
  //     "createdAt" : "2024-03-02T23:33",
  //     "numberOfSubmit":6,
  //     "confirmedDate" : "2023-03-12",
  //     "confirmedTime" : {"startTime" : "09:30", "endTime" : "10:30"},
  //     "confirmedAttendee" : ["박지우","최유정","오승준","윤혜원"],
  //     "attendee" : ["박지우","최유정","오승준","윤혜원","김태연","정수정"], // 추가 요청
  //     "data":[
  //     {
  //       '2023-03-12': [
  //       { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
  //       { "time":"09:30", "attendee" : ["김태연", "정수정"] },
  //       { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
  //       { "time":"10:30", "attendee" : ["조인성", "정우성"] },
  //       { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
  //       { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
  //       { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
  //       { "time":"12:30", "attendee" : ["박서준", "박보영"] },
  //       { "time":"13:00", "attendee" : ["이민호", "김고은"] },
  //       { "time":"13:30", "attendee" : ["정해인", "김서형"] },
  //       { "time":"14:00", "attendee" : ["류준열", "전도연"] },
  //       { "time":"14:30", "attendee" : ["조승우", "배두나"] }
  //       ],
  //     '2023-03-13': [
  //       { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
  //       { "time":"09:30", "attendee" : ["김태연", "정수정"] },
  //       { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
  //       { "time":"10:30", "attendee" : ["조인성", "정우성"] },
  //       { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
  //       { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
  //       { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
  //       { "time":"12:30", "attendee" : ["박서준", "박보영"] },
  //       { "time":"13:00", "attendee" : ["이민호", "김고은"] },
  //       { "time":"13:30", "attendee" : ["정해인", "김서형"] },
  //       { "time":"14:00", "attendee" : ["류준열", "전도연"] },
  //       { "time":"14:30", "attendee" : ["조승우", "배두나"] }
  //     ],
  //     '2023-03-15': [
  //       { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
  //       { "time":"09:30", "attendee" : ["김태연", "정수정"] },
  //       { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
  //       { "time":"10:30", "attendee" : ["조인성", "정우성"] },
  //       { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
  //       { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
  //       { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
  //       { "time":"12:30", "attendee" : ["박서준", "박보영"] },
  //       { "time":"13:00", "attendee" : ["이민호", "김고은"] },
  //       { "time":"13:30", "attendee" : ["정해인", "김서형"] },
  //       { "time":"14:00", "attendee" : ["류준열", "전도연"] },
  //       { "time":"14:30", "attendee" : ["조승우", "배두나"] }
  //     ],
  //     '2023-03-17': [
  //       { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
  //       { "time":"09:30", "attendee" : ["김태연", "정수정"] },
  //       { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
  //       { "time":"10:30", "attendee" : ["조인성", "정우성"] },
  //       { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
  //       { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
  //       { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
  //       { "time":"12:30", "attendee" : ["박서준", "박보영"] },
  //       { "time":"13:00", "attendee" : ["이민호", "김고은"] },
  //       { "time":"13:30", "attendee" : ["정해인", "김서형"] },
  //       { "time":"14:00", "attendee" : ["류준열", "전도연"] },
  //       { "time":"14:30", "attendee" : ["조승우", "배두나"] }
  //     ],
  //     '2023-03-20': [
  //       { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
  //       { "time":"09:30", "attendee" : ["김태연", "정수정"] },
  //       { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
  //       { "time":"10:30", "attendee" : ["조인성", "정우성"] },
  //       { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
  //       { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
  //       { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
  //       { "time":"12:30", "attendee" : ["박서준", "박보영"] },
  //       { "time":"13:00", "attendee" : ["이민호", "김고은"] },
  //       { "time":"13:30", "attendee" : ["정해인", "김서형"] },
  //       { "time":"14:00", "attendee" : ["류준열", "전도연"] },
  //       { "time":"14:30", "attendee" : ["조승우", "배두나"] }
  //     ],
  //     '2023-03-22': [
  //       { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
  //       { "time":"09:30", "attendee" : ["김태연", "정수정"] },
  //       { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
  //       { "time":"10:30", "attendee" : ["조인성", "정우성"] },
  //       { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
  //       { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
  //       { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
  //       { "time":"12:30", "attendee" : ["박서준", "박보영"] },
  //       { "time":"13:00", "attendee" : ["이민호", "김고은"] },
  //       { "time":"13:30", "attendee" : ["정해인", "김서형"] },
  //       { "time":"14:00", "attendee" : ["류준열", "전도연"] },
  //       { "time":"14:30", "attendee" : ["조승우", "배두나"] }
  //     ],
  //     '2023-03-23': [
  //       { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
  //       { "time":"09:30", "attendee" : ["김태연", "정수정"] },
  //       { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
  //       { "time":"10:30", "attendee" : ["조인성", "정우성"] },
  //       { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
  //       { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
  //       { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
  //       { "time":"12:30", "attendee" : ["박서준", "박보영"] },
  //       { "time":"13:00", "attendee" : ["이민호", "김고은"] },
  //       { "time":"13:30", "attendee" : ["정해인", "김서형"] },
  //       { "time":"14:00", "attendee" : ["류준열", "전도연"] },
  //       { "time":"14:30", "attendee" : ["조승우", "배두나"] }
  //     ],
  //     '2023-03-24': [
  //       { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
  //       { "time":"09:30", "attendee" : ["김태연", "정수정"] },
  //       { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
  //       { "time":"10:30", "attendee" : ["조인성", "정우성"] },
  //       { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
  //       { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
  //       { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
  //       { "time":"12:30", "attendee" : ["박서준", "박보영"] },
  //       { "time":"13:00", "attendee" : ["이민호", "김고은"] },
  //       { "time":"13:30", "attendee" : ["정해인", "김서형"] },
  //       { "time":"14:00", "attendee" : ["류준열", "전도연"] },
  //       { "time":"14:30", "attendee" : ["조승우", "배두나"] }
  //     ],
  //     '2023-03-25': [
  //       { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
  //       { "time":"09:30", "attendee" : ["김태연", "정수정"] },
  //       { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
  //       { "time":"10:30", "attendee" : ["조인성", "정우성"] },
  //       { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
  //       { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
  //       { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
  //       { "time":"12:30", "attendee" : ["박서준", "박보영"] },
  //       { "time":"13:00", "attendee" : ["이민호", "김고은"] },
  //       { "time":"13:30", "attendee" : ["정해인", "김서형"] },
  //       { "time":"14:00", "attendee" : ["류준열", "전도연"] },
  //       { "time":"14:30", "attendee" : ["조승우", "배두나"] }
  //     ],
  //     '2023-03-26': [
  //       { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
  //       { "time":"09:30", "attendee" : ["김태연", "정수정"] },
  //       { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
  //       { "time":"10:30", "attendee" : ["조인성", "정우성"] },
  //       { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
  //       { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
  //       { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
  //       { "time":"12:30", "attendee" : ["박서준", "박보영"] },
  //       { "time":"13:00", "attendee" : ["이민호", "김고은"] },
  //       { "time":"13:30", "attendee" : ["정해인", "김서형"] },
  //       { "time":"14:00", "attendee" : ["류준열", "전도연"] },
  //       { "time":"14:30", "attendee" : ["조승우", "배두나"] }
  //     ],
  //     '2023-03-27': [
  //       { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
  //       { "time":"09:30", "attendee" : ["김태연", "정수정"] },
  //       { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
  //       { "time":"10:30", "attendee" : ["조인성", "정우성"] },
  //       { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
  //       { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
  //       { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
  //       { "time":"12:30", "attendee" : ["박서준", "박보영"] },
  //       { "time":"13:00", "attendee" : ["이민호", "김고은"] },
  //       { "time":"13:30", "attendee" : ["정해인", "김서형"] },
  //       { "time":"14:00", "attendee" : ["류준열", "전도연"] },
  //       { "time":"14:30", "attendee" : ["조승우", "배두나"] }
  //     ],
  //     '2023-03-28': [
  //       { "time":"09:00", "attendee" : ["박지우", "오승준", "최유정"] },
  //       { "time":"09:30", "attendee" : ["김태연", "정수정"] },
  //       { "time":"10:00", "attendee" : ["이병헌", "김태리", "유아인", "송강호"] },
  //       { "time":"10:30", "attendee" : ["조인성", "정우성"] },
  //       { "time":"11:00", "attendee" : ["김소현", "남주혁"] },
  //       { "time":"11:30", "attendee" : ["한지민", "남궁민"] },
  //       { "time":"12:00", "attendee" : ["송중기", "송혜교"] },
  //       { "time":"12:30", "attendee" : ["박서준", "박보영"] },
  //       { "time":"13:00", "attendee" : ["이민호", "김고은"] },
  //       { "time":"13:30", "attendee" : ["정해인", "김서형"] },
  //       { "time":"14:00", "attendee" : ["류준열", "전도연"] },
  //       { "time":"14:30", "attendee" : ["조승우", "배두나"] }
  //     ]}]});
  const [meetingInfo, setMeetingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //resultBox 생성
  const [filteredResultData, setFilteredResultData] = useState([]);
  
  const onClickFilterBtn = () => {
    console.log('필터 버튼 클릭');
  }

  // 날짜와 시간대 정보를 처리할 함수
  const handleHoverChange = (date, time) => {
    setHoveredInfo({ date, time });
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
        setError(error);
      }
    }

    const sortDataByRatio = (data) => {
      const allData = data.flatMap(item => {
        const date = Object.keys(item)[0];
        return item[date].map(entry => ({
          date,
          ...entry,
          ratio: entry.attendee.length / meetingInfo.numberOfSubmit
        }));
      });

      const sortedData = allData.sort((a, b) => b.ratio - a.ratio);
      return sortedData;
    }
    fetchMeetingInfo();
    // 필터링 및 정렬 로직
    // const filteredAndSortedData = meetingInfo.data.flatMap(dayObject => 
    //   Object.entries(dayObject).flatMap(([date, slots]) => 
    //     slots.map(slot => ({
    //       ...slot,
    //       date,
    //       ratio: slot.attendee.length / meetingInfo.numberOfSubmit
    //     }))
    //     .filter(slot => slot.ratio >= 0.5)
    //   )
    // ).sort((a, b) => b.ratio - a.ratio); // 비율이 높은 순으로 정렬
  
    // // 필터링 및 정렬된 데이터를 상태에 저장
    // setFilteredResultData(filteredAndSortedData);
    // console.log('Sorted by ratio:', filteredAndSortedData);
  }, [meetingInfo]); // 의존성 배열에 meetingInfo 추가

  return (
    <Suspense fallback={<div>Loading...</div>}> 

      <div className='m-[50px] w-[3/4] flex justify-between'>
          <div>
                {!loading && <ResultTimeTable onHoverChange={handleHoverChange}  resultData={meetingInfo}/>}
            </div>
            <div className='flex flex-col gap-2.5 mt-[50px]'>
              {hoveredInfo.date && hoveredInfo.time && <HoverBox date={hoveredInfo.date} slotData={slotData} />
}
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
    </Suspense>
  );
};

export default ResultPage;
