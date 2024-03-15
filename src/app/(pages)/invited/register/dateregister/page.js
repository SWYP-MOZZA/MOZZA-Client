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

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiVVNFUiIsInVzZXJuYW1lIjoi7ISx7LCsIiwiaWF0IjoxNzEwMDY5NTU2LCJleHAiOjE3MTEwNjk1NTZ9.ZfhZsnQMKutejEKD4XaHHqHktIRpjK7oFemCDN-zkvcsXHEMe_hNMPhI5Et5pTFM1G9lowkdr_ksBUFMkF3VXg'
const DateRegister = () => {
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
  const ResultCalendarMemo = useMemo(() => ResultCalendar, []);
  const [selected, setSelected] = useState('register');

  // 일정 등록에 필요한 상태
  // const { meetingInfo, meetingData, loading, error } = useMeetingInfonData(meetingId);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  //일정 결과에 필요한 상태
  const [meetingInfo, setMeetingInfo] = useState({
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
  });
  const [meetingData, setMeetingData] = useState(
    {
      "meetingId": 123,
      "name": "Meeting1",
      "date" : ["2023-10-20","2023-10-21","2023-10-25"]   
    }
  );
  const [loading, setLoading] = useState(false);

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


// 팝업을 관리하는 상태
const [currentPopup, setCurrentPopup] = useState(null);
  
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
// 등록하기 버튼 클릭시
const onClickRegisterBtn = async () => {
  setCurrentPopup(1); // 첫 번째 팝업 열기
};

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
            { !loading && <ResultCalendarMemo onHoverChange={handleHoverChange}  dateResult={meetingInfo}/>}
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
