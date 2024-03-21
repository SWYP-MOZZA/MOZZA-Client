"use client";
import ConfirmedMessage from '@/app/components/popup/confirmed-message';
import axios from 'axios';
import ConfirmedCompleteMessage from '@/app/components/popup/confirmed-completeMessage';
import HoverBox from '@/app/components/result/hoverBox';
import UnconfirmedResultBox from '@/app/components/result/unconfirmed-resultBox';
import ResultTimeTable from '@/app/components/table/result-timetable';
import React,{useState,useEffect,useMemo,Suspense} from 'react';
import { useRouter,useSearchParams} from 'next/navigation';
const MypageConfirmedDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const meetingId = searchParams.get('meetingId');

  const [hoveredInfo, setHoveredInfo] = useState({ date: null, time: null });

    // 더미데이터
  const [meetingInfo, setMeetingInfo] = useState({
    "meetingId" : 1,
    "createdAt" : "2024-03-02T23:33",
    "numberOfSubmit" : 6,
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // 호버 상태

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

  //확정할 약속 데이터  
  const [selectedSlot, setSelectedSlot] = useState(null);
  const handleSlotCheck = (slotData) => {
    // 이미 선택된 항목을 다시 클릭하면 선택 해제
    if (selectedSlot && selectedSlot.date === slotData.date && selectedSlot.time === slotData.time) {
      setSelectedSlot(null);
    } else {
      // 새 항목을 선택
      setSelectedSlot(slotData);
      console.log(slotData);
    }
  };

  const onClickFilterBtn = () => {
    console.log('필터 버튼 클릭');
  }

  //확정을 위한 상태 및 함수
  const [isConfirmedPopup, setIsConfirmedPopup] = useState(false);
  const [isConfirmedPopupComplete, setIsConfirmedPopupComplete] = useState(false);

  const onClickConfirmedDeleteBtn = () => {
    setIsConfirmedPopup(false);
    console.log('확정된 모임 삭제 버튼 클릭');
  }

  const onPopupConfirmedComplete = () => {
    setIsConfirmedPopup(false);
    setIsConfirmedPopupComplete(true);
    console.log('확정된 모임 완료 버튼 클릭');
  }
  //수정 필요
  const onClickConfirmedGoBtn = (meetingId) => {
    const requestData = {
      "meeting id" : meetingInfo.meetingId,
      "createdAt" : meetingInfo.createdAt,
      "numberOfSubmit" : meetingInfo.numberOfSubmit,
      "confirmedDate" : selectedSlot.date,
      "confirmedTime" : {"startTime" : selectedSlot.time , "endTime" :"10:00" },
      "confirmedAttendee" : selectedSlot.attendee
    }
    console.log('request:', requestData);
    // try {
    //   console.log(requestData);
    //   const reponse = axios.put(`${SERVER_BASE_URL}/meeting/${meetingId}/confirm`, {
    //     data: requestData,
    //     }, {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem('token')}`,
    //       },
    //     });
    //     console.log(reponse.data);

    //     onPopupConfirmedComplete();

    //     // 확정 후 새로고침
    //     window.location.reload();
    //   } catch (error) {
    //     console.error('error:', error.response ? error.response : error.message);
    //   }
      onPopupConfirmedComplete();
    }

  const onClickConfirmedBtn = () => {
    setIsConfirmedPopup(true);
    console.log('확정된 모임 버튼 클릭');
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
      console.log('slotData : ', slotData);
      console.log('hoveredInfo.date : ', hoveredInfo.date);
  }
  ,[slotData,hoveredInfo.date]);

  // 데이터 로딩 중일 때 로딩 인디케이터를 보여줍니다.
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading meeting data: {error}</div>;
  if (!meetingInfo) return <div>Meeting information is not available.</div>; // 데이터가 없을 경우를 처리
  return (
    <Suspense fallback={<div>Loading...</div>}> 

    <div>
      { (isConfirmedPopup || isConfirmedPopupComplete) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        )}
      <div className='w-[3/4] m-[50px] flex justify-between'>
          <div>
            <ResultTimeTable onHoverChange={handleHoverChange}  resultData={meetingInfo}/>
            </div>
            <div className='flex flex-col gap-2.5 mt-[50px]'>
              {hoveredInfo.date && hoveredInfo.time && <HoverBox date={hoveredInfo.date} slotData={slotData} />}
                <div className='flex justify-end'>
                    <button onClick={onClickFilterBtn} className="inline-flex px-6 py-2 justify-center items-center gap-2 rounded-full bg-gray-300">필터</button>
                </div>
                {
                  filteredResultData.map((slot, index) => (
                    <UnconfirmedResultBox
                      key={index}
                      slotData={slot}
                      onSlotCheck={handleSlotCheck}
                      selectedSlot={selectedSlot}
                    />
                  ))
                }

            </div>
            <div className='fixed bottom-[24px] left-1/2 transform -translate-x-1/2 flex gap-2 font-main font-normal text-subtitle2'>
                <button className="flex w-[588px] h-[64px] px-16 justify-center items-center rounded-full bg-green-600 text-white"
                  onClick={()=>onClickConfirmedBtn(meetingInfo.meetingId)}
                >확정하기</button>
                
            </div>
          </div>
          {isConfirmedPopup === true && <ConfirmedMessage selectedSlot={selectedSlot} onClickConfirmedDeleteBtn={onClickConfirmedDeleteBtn} onClickConfirmedGoBtn={onClickConfirmedGoBtn}/>}
          {isConfirmedPopupComplete === true && <ConfirmedCompleteMessage setIsConfirmedPopupComplete={setIsConfirmedPopupComplete}/>}
    </div>
    </Suspense>
  );
};

export default MypageConfirmedDetail;
