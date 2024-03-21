"use client";
import React,{ useState,useEffect,useMemo,Suspense } from 'react';
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
import ConfirmedRegisterMessage from '@/app/components/popup/confirmed-register';
import { SERVER_BASE_URL } from '@/app/constants/BaseUrl';
import axios from 'axios';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // choice 데이터
  const [meetingData, setMeetingData] = useState(null);
  // details 데이터
  const [meetingInfo, setMeetingInfo] = useState(null);
  

  useEffect(() => {
    // 페이지 로드 시 localStorage에서 guestState를 불러옴
    const storedGuestState = localStorage.getItem('guestState');
    if (storedGuestState) {
        setGuestState(JSON.parse(storedGuestState));
    }
    console.log(JSON.parse(storedGuestState));
  }, []);
  
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
    const dayDataArray = meetingInfo.data.find(data => data.hasOwnProperty(formattedDate));
    if (!dayDataArray) {
        return null;
    }

    // 찾은 데이터와 날짜를 포함하는 객체를 반환합니다.
    return {
        date: formattedDate,
        data: dayDataArray[formattedDate],
    };
};

    // hoveredInfo를 기반으로 해당하는 데이터 찾기
    const slotData = findDataForHoveredInfo();

  // 일정 등록을 위한 useEffect
  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const response = await axios.get(`${SERVER_BASE_URL}/meeting/${meetingId}/choice`);
        return { date: response.data.Data.date };
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

  const [confirmedPopup, setConfirmedPopup] = useState(false);

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
        const response = await axios.post(`${SERVER_BASE_URL}/meeting/${meetingId}/date/submit`, requestBody, {
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
    setConfirmedPopup(true);
  }
  const handleConfirmedRegisterMessage = (meetingId) => {
    console.log('확인 버튼 클릭');
    setConfirmedPopup(false);
    router.push(`/invited/dateresult?meetingId=${meetingId}`);
  }

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
    <Suspense fallback={<div>Loading...</div>}> 

    <div className='container w-full h-full font-main flex flex-col justify-center items-center pt-[30px] pb-[180px] gap-y-6'>
      {currentPopup !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      {confirmedPopup && (
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
          {confirmedPopup && <ConfirmedRegisterMessage onConfrim={()=>handleConfirmedRegisterMessage(meetingId)}/>}
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
    </Suspense>
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
