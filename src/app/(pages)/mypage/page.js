"use client";
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import MypageResultBox from '@/app/components/mypage/mypage-resultBox';
import axios from 'axios';
import MeetDelete from '@/app/components/popup/meet-delete';

export default function MyPage(){
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // useEffect(() => {
    //   // 로컬 스토리지에서 로그인 상태를 확인
    //   const loginState = localStorage.getItem('isLoggedIn');
      
    //   // 로그인 상태 업데이트
    //   setIsLoggedIn(loginState === 'true');
    // }, []);
    // if (!isLoggedIn) {
    //   // 로그인 상태가 false일 때 로그인이 필요하다는 페이지 렌더링
    //   return <div>로그인이 필요합니다.</div>;
// }


    const [selected, setSelected] = useState('unconfirmed');
    const [isLatest, setIsLatest] = useState(false);
    const [myConfirmedMeetingList, setConfirmedMeetingList] = useState([
      {
        "meetingId" : 1,
        "meetingName" : "모임명1",
        "confirmedDate" : "2024-01-10",
        "confirmedTime" : {"startTime" : "10:00", "endTime" : "11:30"},
        "submitUserNumber" : 4,
        "createdAt" : "2023-12-21T22:30"
         },
      {
        "meetingId" : 2,
        "meetingName" : "모임명2",
        "confirmedDate" : "2024-01-20",
        "confirmedTime" : {"startTime" : "14:00", "endTime" : "14:30"},
        "submitUserNumber" : 4,
        "createdAt" : "2024-01-22T04:32"
        },
      {
        "meetingId" : 3,
        "meetingName" : "모임명3",
        "confirmedDate" : "2024-02-10",
        "confirmedTime" : {"startTime" : "14:00", "endTime" : "14:30"},
        "submitUserNumber" : 4,
        "createdAt" : "2024-02-01T11:09"
        },
      {
        "meetingId" : 4,
        "meetingName" : "모임명4",
        "confirmedDate" : "2024-02-20",
        "confirmedTime" : null,
        "submitUserNumber" : 4,
        "createdAt" : "2024-02-05T02:20"
        }
    ]);
    const [myUnconfirmedMeetingList, setUnconfirmedMeetingList] = useState([
      {
        "meetingId" : 5,
        "meetingName" : "모임명5",
        "confirmedDate" : null,
        "confirmedTime" : null,
        "submitUserNumber" : 4,
        "createdAt" : "2024-03-01T01:12"
      }
    ]);
  

    //모임 삭제를 위한 상태
    const [isDeletePopup, setIsDeletePopup] = useState(false);
    const handleDeleteNo = () => {
        setIsDeletePopup(false);
    }
    const handleDeletePopup = () => {
        setIsDeletePopup(true);
    }
    
    //모임 삭제 api호출함수
    const deleteMeeting = async (meetingId) => {
      try {
        const response = await axios.put(
          `${SERVER_BASE_URL}/meeting/delete`, 
          {
            meetingId: meetingId, // 요청과 함께 보낼 데이터
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // 인증 토큰
            },
          }
        );
        console.log(response.data);
        // 삭제 후 새로고침
        window.location.reload();
      } catch (error) {
        console.error('error:', error.response ? error.response : error.message);
      }
    }
    


    //버튼 클릭시마다 타입을 바꿔줍니다
    const onChangeMode = (type) => {
      if (type === "unconfirmed") {
        setSelected("unconfirmed");
        console.log('selected');
      } else if (type === "confirmed") {
        setSelected("confirmed");
        console.log('selected');
      }
      };
      useEffect(() => {
        // 비동기 작업을 수행하는 별도의 함수 선언
        const fetchData = async () => {
          try {
            // 서버에서 데이터 받아오기
            const response = await axios.get(`${SERVER_BASE_URL}/all-meeting`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
            console.log(response.data);
            
            // 받아온 데이터를 createdAt 날짜 기준으로 오름차순 정렬
            const sortedConfirmedMeetings = response.data.ConfirmedMeeting.sort((a, b) => 
            new Date(a.createdAt) - new Date(b.createdAt)
            );
            const sortedUnconfirmedMeetings = response.data.Inprogress.sort((a, b) => 
              new Date(a.createdAt) - new Date(b.createdAt)
            );

            // 정렬된 데이터를 상태에 저장
            setConfirmedMeetingList(sortedConfirmedMeetings); 
            setUnconfirmedMeetingList(sortedUnconfirmedMeetings);
          } catch (error) {
            // error.response가 있는지 확인하고, 없다면 error.message를 로깅
            console.error('error:', error.response ? error.response : error.message);
          }
        };
      
        fetchData(); // 정의한 비동기 함수 호출
      }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시 1회 실행
      
    return (
        <div className='container w-full h-full font-main flex flex-col justify-center items-center pt-[30px] pb-[180px] gap-y-6'>
          {isDeletePopup === true && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          )}
            <Switch value={selected}>
                <span /> 
                <UnconfirmedBtn //상세정보 버튼
                type="button"
                value={selected}
                onClick={() => onChangeMode("confirmed")}
                >
                미확정된 모임
                </UnconfirmedBtn>
                <ConfirmedBtn //전시리뷰 버튼
                type="button"
                value={selected}
                onClick={() => onChangeMode("unconfirmed")}
                >
                확정된 모임
                </ConfirmedBtn>
            </Switch>
            <div className='flex flex-col justify-center items-center'>
                <div className="inline-flex w-[588px] pt-[20px] items-start gap-2">
                <button
                    className={`flex px-6 py-2 justify-center items-center gap-2 rounded-full font-normal font-main ${isLatest ? 'bg-green-100' : 'bg-gray-300'}`}
                    onClick={() => setIsLatest(true)}
                >
                    최신순
                </button>
                <button
                    className={`flex px-6 py-2 justify-center items-center gap-2 rounded-full font-normal font-main ${!isLatest ? 'bg-green-100' : 'bg-gray-300'}`}
                    onClick={() => setIsLatest(false)}
                >
                    오래된순
                </button>
                </div>
            </div>
            {selected === "unconfirmed" ? 
            // 일정 등록 페이지
            <div className='flex flex-col gap-6'>
              {!isLatest ? 
                myConfirmedMeetingList.map((meeting, index) => (
                  <MypageResultBox key={index} meeting={meeting} handleDeletePopup={handleDeletePopup} deleteFn={deleteMeeting}/>
                ))
                :
                [...myConfirmedMeetingList].reverse().map((meeting, index) => (
                  <MypageResultBox key={index} meeting={meeting} handleDeletePopup={handleDeletePopup} deleteFn={deleteMeeting}/>
                ))
              }
            </div>

             : 
            // 일정 결과 페이지
            <div className='flex flex-col gap-6'>
              {!isLatest ? 
                myUnconfirmedMeetingList.map((meeting, index) => (
                  <MypageResultBox key={index} meeting={meeting} handleDeletePopup={handleDeletePopup} deleteFn={deleteMeeting}/>
                ))
                :
                [...myUnconfirmedMeetingList].reverse().map((meeting, index) => (
                  <MypageResultBox key={index} meeting={meeting} handleDeletePopup={handleDeletePopup} deleteFn={deleteMeeting}/>
                ))
              }
            </div>}
            {isDeletePopup === true && <MeetDelete onClickDelete={deleteMeeting} onClickNo={handleDeleteNo} />}
            </div>
    );

}

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
      value === "confirmed"
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

const ConfirmedBtn = styled(Button)`
  ${({ value }) => value === "info" && "color: #000"}
`;

const UnconfirmedBtn = styled(Button)`
  ${({ value }) => value === "review" && "color: #000;"}
`;
