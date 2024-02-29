'use client' 
import React , {useState,useEffect}from 'react';
import Container from '../../components/common/Container';
import LongBtn from '@/app/components/common/LongBtn';
import styled from 'styled-components';
import { usePathname, useRouter } from 'next/navigation';
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";

const InvitedPage = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false); // 참여자 목록 토글 상태

    // 모임 정보 (예시 데이터)
    const meetingInfo = {
        name: "3월 면접 스터디",
        date: "2024.03.07 - 2024.03.14",
         time: "14:00 - 20:00",
        participants: 10, // 참여자 수
        participantsList: ['김철수','박영희', '이영수', '홍길동', '김성진','박지우','최유정','여성찬','윤혜원','오승준'],
    };

    useEffect(() => {
        // 컴포넌트가 마운트된 후에 라우터를 사용
        // 예: 초기 경로 설정, 리디렉션 등
    }, []);
    const onClickRegister = () => {
        console.log('click Register');
        router.push('/invited/register');
    }

    const onClickInvite = () => {
        console.log('click Invite');
    }

    const onClickResult = () => {
        console.log('click Result');
    }
    

  return (
    <div className='container w-full h-full font-main flex flex-col justify-center items-center pt-[80px] pb-[80px] gap-y-6'>
      <span className="text-h1 font-bold">가능한 시간을 선택해주세요!</span>
      <div className={' w-[588px] bg-gray-100 rounded-3xl font-main font-normal p-[24px] flex flex-col justify-center text-subtitle3'}>
        <div className="w-full pt-[20px] ">
            <span className="w-[100px] inline-block">모임명</span> <span>{meetingInfo.name}</span>
        </div>
        <div className="w-full pt-[20px]">
            <span className="w-[100px] inline-block">모임날짜</span> <span>{meetingInfo.date}</span>
        </div>
        <div className="w-full pt-[20px] pb-[20px]">
            <span className="w-[100px] inline-block">시간대</span> <span>{meetingInfo.time}</span>
        </div>
        <hr className="w-full border-t border-gray-300 my-2 " /> {/* 가로선 */}
        <div className='w-full flex justify-between items-center pt-[20px]'>
            <div className='flex items-center gap-[10px]'> {/* 내부 컨테이너 추가 */}
                <span className="w-[100px] inline-block">참여자</span>
                <span>총 {meetingInfo.participants} 명</span>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className='bg-blue-500 text-black p-2 rounded-md'>
                {isOpen ? <AiOutlineUp size={24}/> : <AiOutlineDown size={24} />}
            </button>
        </div>
        {isOpen && (
            <div className='w-full pt-[20px] flex flex-wrap justify-start'>
            {meetingInfo.participantsList.map((participant, index) => (
              <div key={index} className='w-1/5 min-w-[20%] p-1 flex justify-center items-center text-center'>{participant}</div>
            ))}
          </div>    
        )}
        </div>
        <div className="w-full pt-[20px]"/>
        <LongBtn style={'primary-longBtn'} onClick={onClickRegister}>일정 등록하기</LongBtn>
        <LongBtn style={'secondary-longBtn'} onClick={onClickInvite}>모임 초대하기</LongBtn>
        <LongBtn style={'secondary-longBtn'} onClick={onClickResult}>결과 확인하기</LongBtn>
        {/* <SpeechBubble>
            <span>모임장이 일정을 확정하면</span>
            <span>바로 카카오 알림을 보내드려요!</span>
        </SpeechBubble> */}
        {/* <div className="speech-bubble mt-3 p-4 bg-[#FEEED2] rounded-lg text-sm max-w-xs text-center relative before:content-[''] before:absolute before:border-[10px] before:border-solid before:border-t-transparent before:border-x-transparent before:border-b-[#FEEED2] before:top-[-20px] before:left-1/2 before:-translate-x-1/2">
            <span>모임장이 일정을 확정하면</span>
            <span>바로 카카오 알림을 보내드려요!</span>
        </div> */}
    </div>
  );
};

export default InvitedPage;

// 말풍선 스타일 컴포넌트
const SpeechBubble = styled.div`
  display: flex;
    flex-direction: column;
  position: relative;
  padding: 1rem;
  background-color: #FEEED2;
  text-align: center;
  max-width: 20rem;
  &::after {
    content: "";
    position: absolute;
    bottom: 100%; /* 말풍선 본체 아래에서 시작 */
    left: 50%; /* 부모 컨테이너(말풍선)의 중앙 */
    transform: translateX(-50%); /* 중앙 정렬 */
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 15px 15px 15px; /* 꼬리의 크기 조정 및 아래쪽을 향하게 조정 */
    border-color: transparent transparent #FEEED2 transparent; /* 꼬리의 색상 지정 */
  }
  
`;