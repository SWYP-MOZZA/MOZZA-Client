"use client";
import ConfirmedMessage from '@/app/components/popup/confirmed-message';
import axios from 'axios';
import ConfirmedCompleteMessage from '@/app/components/popup/confirmed-completeMessage';
import HoverBox from '@/app/components/result/hoverBox';
import UnconfirmedResultBox from '@/app/components/result/unconfirmed-resultBox';
import ResultTimeTable from '@/app/components/table/result-timetable';
import React,{useState,useEffect} from 'react';
import { useRouter,useSearchParams} from 'next/navigation';
import { SERVER_BASE_URL } from '@/app/constants/BaseUrl';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const MypageConfirmedDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const meetingId = searchParams.get('meetingId');
  const token = useSelector((state) => state.token.token);
  
  // 호버 상태
  const [hoveredInfo, setHoveredInfo] = useState({ date: null, time: null });

  const [meetingInfo, setMeetingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []); // 의존성 배열에 meetingInfo 추가

  //확정할 약속 데이터  
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotCheck = (slotData) => {
    // 이미 선택된 항목을 다시 클릭하면 선택 해제
    if (selectedSlot && selectedSlot.date === slotData.date && selectedSlot.time === slotData.time) {
      setSelectedSlot(null);
    } else {
      // 새 항목을 선택
      setSelectedSlot(slotData);
      console.log("seletedSlot :",slotData);
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
  const onClickConfirmedGoBtn = () => {
    const requestData = {
      "confirmedDate": selectedSlot.date,
      "confirmedStartTime": selectedSlot.time,
      "confirmedEndTime": dayjs(`${selectedSlot.date} ${selectedSlot.time}`, "YYYY-MM-DD HH:mm").add(30, 'minute').format("HH:mm")

    };
    
    console.log('request:', requestData);
    try {
      console.log(requestData);
      const reponse = axios.put(`${SERVER_BASE_URL}/meeting/${meetingId}/confirm`,
        requestData
        , {
          headers: {
            Authorization: token,
          },
        });
        console.log(reponse.data);

        onPopupConfirmedComplete();

        // 확정 후 새로고침
        
      } catch (error) {
        console.error('error:', error.response ? error.response : error.message);
      }
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

  // 데이터 로딩 중일 때 로딩 인디케이터를 보여줍니다.
  if (loading) return <div>Loading1...</div>;
  if (error) return <div>Error loading meeting data: {error}</div>;
  if (!meetingInfo) return <div>Meeting information is not available.</div>; // 데이터가 없을 경우를 처리
  return (
    <div>
      { (isConfirmedPopup || isConfirmedPopupComplete) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        )}
      <div className='w-[3/4] m-[50px] flex justify-between'>
          <div>
            {!loading && <ResultTimeTable onHoverChange={handleHoverChange}  resultData={meetingInfo}/>}
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
  );
};

export default MypageConfirmedDetail;
