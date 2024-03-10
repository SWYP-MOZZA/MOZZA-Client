"use client";
import React,{ useState,useEffect,useMemo } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import LongBtn from '@/app/components/common/LongBtn';
import ConfirmedResultBox from '../../../../components/result/result-time/confirmed-resultBox';
import HoverBox from '../../../../components/result/result-time/hoverBox';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import MeetConfirmed1 from '@/app/components/popup/meet-confirmed1';
import MeetConfirmed2 from '@/app/components/popup/meet-confirmed2';
import MeetConfirmed3 from '@/app/components/popup/meet-confirmed3';
import { useQuery } from 'react-query';
import { SERVER_BASE_URL } from '@/app/constants/BaseUrl';

const ResultTimeTable = dynamic(() => import('@/app/components/table/result-timetable'), {
  ssr: false
  });

const DraggableTimeTable = dynamic(() => import('../../../../components/table/draggable-timetable'), {
  ssr: false
  }); 

const TimeRegister = () => {
  const HoverBoxMemo = React.memo(HoverBox);
  const ConfirmedResultBoxMemo = React.memo(ConfirmedResultBox);
  const DraggableTimeTableMemo = React.memo(DraggableTimeTable);

  //guest 정보
  const [guestState, setGuestState] = useState({
    name: '',
    password: '',
  });

  useEffect(() => {
    // 페이지 로드 시 localStorage에서 guestState를 불러옴
    const storedGuestState = localStorage.getItem('guestState');
    if (storedGuestState) {
        setGuestState(JSON.parse(storedGuestState));
    }
    console.log(JSON.parse(storedGuestState));
  }, []);

  //라우터
  const router = useRouter();
  const params = useSearchParams();
  // const meetingId = params.get('meetingId');
  const meetingId = 3; // 임시로 1로 설정
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태 관리

  //스위치 전환
  const [selected, setSelected] = useState('register');

  //더미데이터
  const [meetingInfo, setMeetingInfo] = useState({
    name: "모임명1", // 추가 요청 
    "meetingId" : 1,
    "createdAt" : "2024-03-02T23:33",
    "numberOfSubmit":6,
    "confirmedDate" : "2023-03-12",
    "confirmedTime" : {"startTime" : "09:30", "endTime" : "10:30"},
    "confirmedAttendee" : ["박지우","최유정","오승준","윤혜원"],
    "attendee" : ["박지우","최유정","오승준","윤혜원","김태연","정수정"], // 추가 요청
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

  const fetchMeetingData = async (meetingId) => {
    // 로컬 스토리지에서 'token' 키로 저장된 JWT 토큰을 가져옵니다.
    // const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiVVNFUiIsInVzZXJuYW1lIjoi7ISx7LCsIiwiaWF0IjoxNzEwMDY5NTU2LCJleHAiOjE3MTEwNjk1NTZ9.ZfhZsnQMKutejEKD4XaHHqHktIRpjK7oFemCDN-zkvcsXHEMe_hNMPhI5Et5pTFM1G9lowkdr_ksBUFMkF3VXg'
    try {
      const response = await axios.get(`${SERVER_BASE_URL}/meeting/${meetingId}/details`, {
        headers: {
          // 가져온 토큰을 'Authorization
          // ' 헤더에 'Bearer' 스키마와 함께 추가합니다.
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Meeting data fetched successfully', response.data.Data);
      setMeetingInfo(response.data.Data);
    } catch (error) {
      console.error('Error fetching meeting data:', error);
    }
  };
  
  // 호버한 쎌 데이터
  const [hoveredInfo, setHoveredInfo] = useState({ date: null, time: null });
  
  // 필터링된 결과 데이터 참여율 50퍼 이상인 데이터만 저장
  const [filteredResultData, setFilteredResultData] = useState([]);

  // 일정 등록에 필요한 상태 , 더미데이터
  const [meetingData, setMeetingData] = useState({});
  // 일정 등록에 필요한 상태
  
  const bringMeetingData = async (meetingId) => {
    // 로컬 스토리지에서 'token' 키로 저장된 JWT 토큰을 가져옵니다.
    // const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiVVNFUiIsInVzZXJuYW1lIjoi7ISx7LCsIiwiaWF0IjoxNzEwMDY5NTU2LCJleHAiOjE3MTEwNjk1NTZ9.ZfhZsnQMKutejEKD4XaHHqHktIRpjK7oFemCDN-zkvcsXHEMe_hNMPhI5Et5pTFM1G9lowkdr_ksBUFMkF3VXg'
    try {
      const response = await axios.get(`${SERVER_BASE_URL}/meeting/${meetingId}/choice`, {
        headers: {
          // 가져온 토큰을 'Authorization' 헤더에 'Bearer' 스키마와 함께 추가합니다.
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Meeting data fetched successfully', response.data.Data);
      setMeetingData(response.data.Data);
    } catch (error) {
      console.error('Error fetching meeting data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 두 비동기 함수를 동시에 호출하고 모두 완료될 때까지 기다림
        await Promise.all([
          bringMeetingData(meetingId),
          // fetchMeetingData(meetingId),
        ]);
      } catch (error) {
        console.error('데이터 불러오기 중 오류 발생:', error);
      } finally {
        console.log('데이터 불러오기 완료');
        setLoading(false); // 모든 데이터 로딩이 완료되면 로딩 상태를 해제
      }
    };

    fetchData();
  }, [meetingId]); // meetingId가 변경될 때마다 fetchData 실행

  const [timeSlots, setTimeSlots] = useState({});

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

  // 팝업을 관리하는 상태
  const [currentPopup, setCurrentPopup] = useState(null);
  
  // "예" 버튼 핸들러
  const handleYesPopup = () => setCurrentPopup(currentPopup+1); 
  const handleKakaoLogin = () => {
    console.log('카카오 로그인');
    setCurrentPopup(currentPopup+1)
  }

  // "아니오" 버튼 핸들러
  const handleNoPopup = (meetingId) => {
    sendRequestAndClosePopup(meetingId); // request 보내고 팝업 닫기
  };

  const sendRequestAndClosePopup = async (meetingId) => {
    try {
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiVVNFUiIsInVzZXJuYW1lIjoi7ISx7LCsIiwiaWF0IjoxNzEwMDY5NTU2LCJleHAiOjE3MTEwNjk1NTZ9.ZfhZsnQMKutejEKD4XaHHqHktIRpjK7oFemCDN-zkvcsXHEMe_hNMPhI5Et5pTFM1G9lowkdr_ksBUFMkF3VXg'
      const response = await axios.post(`${SERVER_BASE_URL}/meeting/${meetingId}/submit`, timeSlots,{
        headers: {
          // 가져온
          // 토큰을 'Authorization' 헤더에 'Bearer' 스키마와 함께 추가합니다.
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Request sent successfully', response.data);
      router.push(`/invited/timeresult?meetingId=${meetingId}`)
    } catch (error) {
      console.error('Error sending request:', error);
    }
    setCurrentPopup(null); // 팝업 닫기

    // 닫고나서 결과 페이지로 이동 추가
  };
  
  // 등록하기 버튼 클릭시
  const onClickRegisterBtn = async () => {
    setCurrentPopup(1); // 첫 번째 팝업 열기
  };

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
    return slotData;
  };

    // hoveredInfo를 기반으로 해당하는 데이터 찾기
    const slotData = useMemo(() => findDataForHoveredInfo(), [hoveredInfo, meetingInfo]);


  useEffect(() => {
    // 필터링 및 정렬 로직
    const filteredAndSortedData = meetingInfo.data.flatMap(dayObject => 
      Object.entries(dayObject).flatMap(([date, slots]) => 
        slots.map(slot => ({
          ...slot,
          date,
          ratio: slot.attendee.length / meetingInfo.numberOfSubmit
        }))
        .filter(slot => slot.ratio >= 0.5)
      )
    ).sort((a, b) => b.ratio - a.ratio); // 비율이 높은 순으로 정렬
  
    // 필터링 및 정렬된 데이터를 상태에 저장
    setFilteredResultData(filteredAndSortedData);
  }, [meetingInfo]); // 의존성 배열에 meetingInfo 추가
  
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
          {!loading && <DraggableTimeTableMemo meetingData={meetingData} updateTimeSlots={setTimeSlots} />}
          <div className='m-[20px]'/>
          <LongBtn style={'primary-longBtn'} 
          onClick={onClickRegisterBtn}>등록하기</LongBtn>
          {currentPopup === 1 && <MeetConfirmed1 onConfirm={handleYesPopup} onDecline={()=>handleNoPopup(meetingId)} />}
          {currentPopup === 2 && <MeetConfirmed2 onConfirm={handleKakaoLogin} onDecline={()=>handleNoPopup(meetingId)} />}
          {currentPopup === 3 && <MeetConfirmed3 onConfirm={()=>handleNoPopup(meetingId)} />}

        </div> : 
        // 일정 결과 페이지
        <div className='w-[3/4] flex justify-between'>
          <div>
          {!loading && <ResultTimeTable onHoverChange={handleHoverChange}  resultData={meetingInfo}/>}
            </div>
            <div className='flex flex-col gap-2.5 mt-[50px]'>
                {hoveredInfo.date && hoveredInfo.time && <HoverBoxMemo date={hoveredInfo.date} slotData={slotData} />}
                <div className='flex justify-end'>
                    <button onClick={onClickFilterBtn} className="inline-flex px-6 py-2 justify-center items-center gap-2 rounded-full bg-gray-300">필터</button>
                </div>
                {
                filteredResultData.map((slot, index) => (
                  <ConfirmedResultBoxMemo key={index} slotData={slot} />
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
