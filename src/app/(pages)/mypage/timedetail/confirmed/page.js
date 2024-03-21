"use client";
import ConfirmedBox from '@/app/components/result/confirmedmeetingBox';
import ConfirmedResultBox from '@/app/components/result/confirmed-resultBox';
import ResultTimeTable from '@/app/components/table/result-timetable';
import React,{useState,useEffect,Suspense} from 'react';
import { useRouter,useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';


const MypageConfirmedDetail = () => {
  // 쿼리 파라미터
  const router = useRouter();
  const searchParams = useSearchParams()
  const meetingId = searchParams.get('meetingId');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredResultData, setFilteredResultData] = useState([]);
  const [meetingInfo, setMeetingInfo] = useState({
    "numberOfSubmit":6,
    "confirmedDate" : "2023-03-12",
    "confirmedTime" : {"startTime" : "09:30", "endTime" : "10:30"},
    "confirmedAttendee" : ["박지우","최유정","오승준","윤혜원"],
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
  }, [meetingInfo]); // 의존성 배열에 meetingInfo 추가

  // 데이터 로딩 중일 때 로딩 인디케이터를 보여줍니다.
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading meeting data: {error}</div>;
  if (!meetingInfo) return <div>Meeting information is not available.</div>; // 데이터가 없을 경우를 처리
  
  return (
    <Suspense fallback={<div>Loading...</div>}> 

    <div>
      <div className='flex items-center justify-center m-[50px]'>
        <ConfirmedBox slotData={meetingInfo} />
      </div>
      <div className='w-[3/4] flex justify-between'>
          <div>
                <ResultTimeTable onHoverChange={()=> console.log(0)} resultData={meetingInfo}/>
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
    </Suspense>
  );
};

export default MypageConfirmedDetail;
