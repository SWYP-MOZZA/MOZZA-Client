// TimeRegister 컴포넌트
"use client";
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import LongBtn from '@/app/components/common/LongBtn';
import ConfirmedResultBox from '../../../../components/result/confirmed-resultBox';
import HoverBox from '../../../../components/result/hoverBox';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import MeetConfirmed1 from '@/app/components/popup/meet-confirmed1';
import MeetConfirmed2 from '@/app/components/popup/meet-confirmed2';
import MeetConfirmed3 from '@/app/components/popup/meet-confirmed3';
import { SERVER_BASE_URL } from '@/app/constants/BaseUrl';
import { sendRequest } from '@/app/utils/apiFn';
import ResultTimeTable from '@/app/components/table/result-timetable';
import DraggableTimeTable from '@/app/components/table/draggable-timetable';
import { useSelector } from 'react-redux';

const TimeRegister = () => {
  const router = useRouter();
  const params = useSearchParams();
  const meetingId = params.get('meetingId');
  const token = useSelector((state) => state.token.token);

  const [guestState, setGuestState] = useState({ name: '', password: '' });
  const [currentPopup, setCurrentPopup] = useState(null);
  const [hoveredInfo, setHoveredInfo] = useState({ date: null, time: null });
  const [filteredResultData, setFilteredResultData] = useState([]);
  const [timeSlots, setTimeSlots] = useState({});
  const [meetingInfo, setMeetingInfo] = useState(null);
  const [meetingData, setMeetingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedGuestState = localStorage.getItem('guestState');
    if (storedGuestState) setGuestState(JSON.parse(storedGuestState));

  }, []);

  useEffect(() => {
    console.log('timeSlots:', timeSlots);
  }
  ,[timeSlots]);
  // 일정 등록을 위한 useEffect
  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const response = await axios.get(`${SERVER_BASE_URL}/meeting/${meetingId}/choice`);
        return response.data.Data;
      } catch (error) {
        console.error("Error fetching meeting choice data:", error);
        throw error; // 오류 발생 시 catch 블록에서 오류를 다시 던짐
      }
    };
    
    const fetchMeetingInfo = async () => {
      try {
        const response = await axios.get(`${SERVER_BASE_URL}/meeting/${meetingId}/details`);
        return response.data; // 여기서 바로 상태를 업데이트하지 않고, 데이터를 반환
      } catch (error) {
        console.error('Error fetching meeting details:', error);
        throw error; // 오류 발생 시 catch 블록에서 오류를 다시 던짐
      }
    };
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
  
    // Promise.all을 사용하여 두 비동기 요청이 모두 완료될 때까지 기다림
    Promise.all([fetchMeetingInfo(), fetchMeetingData()]).then(([meetingInfoData, meetingDataData]) => {
      // 여기에서 상태 업데이트 로직 실행
      setMeetingInfo(meetingInfoData);
      console.log('meetingInfoData : ', meetingInfoData);
      setMeetingData(meetingDataData); // 예제에서는 이 형식을 가정함. 실제 데이터 구조에 맞게 조정 필요
      console.log('meetingDataData : ', meetingDataData);
      // 데이터 정렬 함수 호출
      const sortedData = sortDataByRatio(meetingInfoData.data);
      setFilteredResultData(sortedData);
      console.log('filteredResultData:', sortedData);
      setLoading(false); // 두 요청이 모두 성공적으로 완료되면 로딩 상태 업데이트
    }).catch((error) => {
      setError(error); // 어느 한 요청에서 오류 발생 시 처리
    });
  }, [meetingId]);

  //스위치 전환
  const [selected, setSelected] = useState('register');

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
  // hoveredInfo를 기반으로 해당하는 데이터 찾기
  const slotData = useMemo(() => findDataForHoveredInfo(), [hoveredInfo, meetingInfo]);
  // 일정 등록에 필요한 상태
  

  const onClickFilterBtn = () => {
    console.log('필터 버튼 클릭');
  }

  //버튼 클릭시마다 타입을 바꿔줍니다
  const onChangeMode = (type) => {
    if (type === "result") {
      setSelected("result");
      console.log('selected');
    } else if (type === "register") {
      setSelected("register");
      console.log('selected');
    }
  };
  
  // "예" 버튼 핸들러
  const handleYesPopup = () => setCurrentPopup(currentPopup+1); 
  const handleKakaoLogin = () => {
    console.log('카카오 로그인');
    setCurrentPopup(currentPopup+1)
  }

  // "아니오" 버튼 핸들러
  const handleNoPopup = (token,meetingId) => {
    sendRequestAndClosePopup(token,meetingId); // request 보내고 팝업 닫기
  };

  const sendRequestAndClosePopup = async (token, meetingId) => {
    try {
      await sendRequest(token, meetingId, timeSlots);
      setCurrentPopup(null); // 상태 변경
      router.push(`/invited/timeresult?meetingId=${meetingId}`); // 페이지 이동
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // 등록하기 버튼 클릭시
  const onClickRegisterBtn = async () => {
    setCurrentPopup(1); // 첫 번째 팝업 열기
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 상태 UI
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>; // 에러 상태 UI
  }

  // 데이터가 없는 경우도 고려하여 UI 제공
  if (!meetingData || Object.keys(meetingInfo).length === 0) {
    return <div>No meeting data available.</div>;
  }

  if (!meetingInfo.data || meetingInfo.data.length === 0) {
    return <div>No meeting details available.</div>;
  }

  return (
    <div className='container w-[1/2] h-full font-main flex flex-col justify-center items-center pt-[30px] pb-[180px] gap-y-6'>
      {currentPopup !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <Switch value={selected}>
        <span /> 
        <ResultBtn //상세정보 버튼
          type="button"
          value={selected}
          onClick={() => onChangeMode("result")}
        >
          일정 결과
        </ResultBtn>
        <RegisterBtn //전시리뷰 버튼
          type="button"
          value={selected}
          onClick={() => onChangeMode("register")}
        >
          일정 등록
        </RegisterBtn>
      </Switch>
      {selected === "register" ? 
        // 일정 등록 페이지
        <div className='flex flex-col justify-center items-center'>
          <div className="w-full pt-[20px] flex flex-col justify-center items-center">
            <span className="text-subtitle1 font-midium">가능한 일정을</span>
            <span className="text-subtitle1 font-midium">클릭이나 드래그로 선택해주세요!</span>
          </div>
          {!loading && <DraggableTimeTable meetingData={meetingData} timeSlots={timeSlots} setTimeSlots={setTimeSlots} />}
          <div className='m-[20px]'/>
          <LongBtn style={'primary-longBtn'} 
          onClick={onClickRegisterBtn}>등록하기</LongBtn>
          {currentPopup === 1 && <MeetConfirmed1 onConfirm={handleYesPopup} onDecline={()=>handleNoPopup(token,meetingId)} />}
          {currentPopup === 2 && <MeetConfirmed2 onConfirm={handleKakaoLogin} onDecline={()=>handleNoPopup(token,meetingId)} />}
          {currentPopup === 3 && <MeetConfirmed3 onConfirm={()=>handleNoPopup(token,meetingId)} />}

        </div> : 
        // 일정 결과 페이지
        <div className='w-[3/4] flex justify-between'>
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
                  <ConfirmedResultBox key={index} slotData={slot} />
                ))
              }
            </div>
          </div>}
    </div>
  );
}

export default TimeRegister;

const Switch = styled.div`
  position: relative;
  width: 380px;
  border-radius: 1000px;
  height: 44px;
  background-color: #F5F5F5;
  span {
    position: absolute;
    width: 188px;
    height: 40px;
    top: 2px;
    border-radius: 1000px;
    background-color: #ffffff;
    transition: all 0.6s ease-in-out;
    z-index: 1;
    ${({ value }) => //props에 따른 삼항연산자 처리
      value === "result"
        ? "transform: translateX(0px)"
        : "transform: translateX(188px)"}
  }
`;
// Button 컴포넌트 정의
const Button = styled.button`
  position: relative;
  width: 188px;
  height: 44px;
  color: #000;
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
  z-index: 2;
`;

const ResultBtn = styled(Button)`
  ${({ value }) => value === "info" && "color: #000"}
`;

const RegisterBtn = styled(Button)`
  ${({ value }) => value === "review" && "color: #000;"}
`;
