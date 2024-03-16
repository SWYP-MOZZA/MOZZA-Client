"use client";
import React,{ useState,useEffect,useMemo } from 'react';
import styled from 'styled-components';
import LongBtn from '@/app/components/common/LongBtn';
import Container from '@/app/components/common/Container';
import HoverBox from '@/app/components/result/hoverBox';
import RegisterResultCalendar from '@/app/components/calendar/register-draggabel-calendar';
import ResultCalendar from '@/app/components/calendar/result-calender';
import { useSearchParams,useRouter } from 'next/navigation';
import ConfirmedResultBox from '@/app/components/result/confirmed-resultBox';
import MeetConfirmed1 from '@/app/components/popup/meet-confirmed1';
import MeetConfirmed2 from '@/app/components/popup/meet-confirmed2';
import MeetConfirmed3 from '@/app/components/popup/meet-confirmed3';
import { useMeetingInfonData } from '@/app/hooks/useMeetingInfonData';
import { SERVER_BASE_URL } from '@/app/constants/BaseUrl';
import axios from 'axios';
import { set } from 'lodash';
import { useSelector } from 'react-redux';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=8728eb9b1a227742d8aef92354fbb090&`
const DateRegister = () => {
  //라우터
  const router = useRouter();
  const params = useSearchParams();
  const meetingId = params.get('meetingId');
  const token = useSelector((state) => state.token.token);

    //guest 정보
  const [guestState, setGuestState] = useState({
    name: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [meetingInfo, setMeetingInfo] = useState({
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
      ],
      "2024-03-15": [
        {
          "attendee": ["박지우", "최유정", "오승준","오승준","오승준","오승준"],
          "ratio": 0.9
        }
      ],
      "2024-03-16": [
        {
          "attendee": ["박지우", "최유정", "오승준","오승준","오승준","오승준"],
          "ratio": 0.9
        }
      ],
      "2024-03-17": [
        {
          "attendee": ["박지우", "최유정", "오승준","오승준","오승준","오승준"],
          "ratio": 0.9
        }
      ],
      "2024-03-18": [
        {
          "attendee": ["박지우", "최유정", "오승준","오승준","오승준","오승준"],
          "ratio": 0.9
        }
      ],
      "2024-03-19": [
        {
          "attendee": ["박지우", "최유정", "오승준","오승준","오승준","오승준"],
          "ratio": 0.9
        }
      ],
      "2024-03-20": [
        {
          "attendee": ["박지우", "최유정", "오승준","오승준","오승준","오승준"],
          "ratio": 0.9
        }
      ],
    }]
  });
  const [meetingData, setMeetingData] = useState({
    date: ["2024-03-12","2024-03-13","2024-03-14","2024-03-15","2024-03-16","2024-03-17","2024-03-18","2024-03-19","2024-03-20"]
  });

  useEffect(() => {
    // 페이지 로드 시 localStorage에서 guestState를 불러옴
    const storedGuestState = localStorage.getItem('guestState');
    if (storedGuestState) {
        setGuestState(JSON.parse(storedGuestState));
    }
    console.log(JSON.parse(storedGuestState));
  }, []);
  
  const bringMeetingData = async () => {
    try {
      const response = await axios.get(`${SERVER_BASE_URL}/meeting/${meetingId}/choice`);
      console.log('response : ', response);
      setMeetingData(response.data);
    }
    catch (error) {
      console.error('Error : ', error);
    }
  };
  
  // useEffect(() => {
  //   // 토큰 상태 변수가 업데이트되었을 때 API 호출
  //   if (token) {
  //     bringMeetingInfo(token); // 토큰을 매개변수로 전달하여 API 호출
  //     bringMeetingData(); // 필요한 경우 Meeting Data도 같은 방식으로 호출
  //   }
  // }, [token]); // 토큰 상태 변수를 의존성 배열에 추가
  
  // API 호출 함수는 토큰을 매개변수로 받아 사용합니다.
  const bringMeetingInfo = async (token) => {
    try {
      const response = await axios.get(`${SERVER_BASE_URL}/meeting/${meetingId}/details`, {
        headers: {
          Authorization: `${token}` // 매개변수로 받은 토큰을 사용
        }
      });
      console.log('response : ', response);
      setMeetingInfo(response.data);
    } catch (error) {
      console.error('Error : ', error);
    }
  };
  
  const [selected, setSelected] = useState('register');

  // 호버한 쎌 데이터
  const [hoveredInfo, setHoveredInfo] = useState({ date: null});

  // 필터링된 결과 데이터 참여율 50퍼 이상인 데이터만 저장
  const [filteredResultData, setFilteredResultData] = useState([]);
  
  const [dateSlot, setDateSlots] = useState({});

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

  // 날짜와 시간대 정보를 처리할 함수
  const handleHoverChange = (date) => {
    setHoveredInfo({ date });
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


  // 팝업을 관리하는 상태
  const [currentPopup, setCurrentPopup] = useState(null);
    
  // "예" 버튼 핸들러
  const handleYesPopup = () => setCurrentPopup(currentPopup+1); 

  // "아니오" 버튼 핸들러
  const handleNoPopup = (token,meetingId) => {
    sendRequestAndClosePopup(token,meetingId); // request 보내고 팝업 닫기
  };
  // 등록하기 버튼 클릭시
  const onClickRegisterBtn = async () => {
    setCurrentPopup(1); // 첫 번째 팝업 열기
  };

  useEffect(() => {
    console.log('dateSlot : ', dateSlot);
  }
  ,[dateSlot]);

  const handleKakaoLogin = () => {
    console.log('카카오 로그인 시작');
    // 카카오 로그인이 성공한 후 돌아올 URL 설정
    const returnUrl = `${window.location.origin}${window.location.pathname}?popup=meetConfirmed3`;
  
    // 현재 상태를 로컬 스토리지에 저장
    localStorage.setItem('postLoginState', JSON.stringify({ popup: 'meetConfirmed3' }));
  
    // 수정된 부분: KAKAO_AUTH_URL 변수를 사용하여 카카오 로그인 페이지로 리다이렉트
    const loginUrl = `${KAKAO_AUTH_URL}&redirect_uri=${encodeURIComponent(returnUrl)}`;
    window.location.href = loginUrl;
  };
  

  useEffect(() => {
    // 페이지 로드 시 URL 파라미터 확인
    const searchParams = new URLSearchParams(window.location.search);
    const popupState = searchParams.get('popup');
  
    // 로컬 스토리지에서 postLoginState 가져오기
    const postLoginState = JSON.parse(localStorage.getItem('postLoginState'));
  
    // URL 파라미터 또는 로컬 스토리지 상태에 따라 팝업 상태 설정
    if (popupState === 'meetConfirmed3' || postLoginState?.popup === 'meetConfirmed3') {
      setCurrentPopup(3); // MeetConfirmed3 팝업 표시
      localStorage.removeItem('postLoginState'); // 사용 후 상태 제거
    }
  }, []);

  const sendRequestAndClosePopup = (token,meetingId) => {
    const submitRequest = async () => {
      const requestBody = meetingData.date.map(date => {
        return {
          date: date,
          isActive: dateSlot.includes(date)
        };
      });
      console.log('requestBody : ', requestBody);
      try {
        const response = await axios.post(`${SERVER_BASE_URL}/meeting/${meetingId}/submit`, requestBody, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('response : ', response);
      }
      catch (error) {
        console.error('Error : ', error);
      }
    };
    submitRequest();
    setCurrentPopup(null);
  }


  return (
    <div className='container w-full h-full font-main flex flex-col justify-center items-center pt-[30px] pb-[180px] gap-y-6'>
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
          <Container type={'container-basic'} style={'p-4 flex flex-col'}>
          { !loading && <RegisterResultCalendar meetingData={meetingData} setDateSlots={setDateSlots}/>}
          </Container>
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
            { !loading && <ResultCalendar onHoverChange={handleHoverChange}  dateResult={meetingInfo}/>}
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
          </div>}
          
    </div>
  );
}

export default DateRegister;

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
