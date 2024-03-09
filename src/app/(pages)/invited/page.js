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
    // 더미데이터
    const [meetingInfo, setMeetingInfo] = useState({
        "meetingId": 1,
        "name": "Meeting1",
        "startDate": "2024-03-12",
        "endDate" : "2024-03-15",
        "startTime": "09:00",
        "endTime": "10:30",
        "numberOfVoter": 4,
        "attendee" : ["최유정", "윤혜원", "여성찬","김성진"] 
    });

    const onClickRegister = (meetingId) => {
        console.log('click Register');
        router.push(`/invited/register?meetingId=${meetingId}`);
    }

    const onClickInvite = () => {
        console.log('click Invite');
    }

    const onClickResult = (meetingId) => {
        console.log('click Result');
        router.push(`/invited/timeresult?meetingId=${meetingId}`);
    }
    

  return (
    <div className='container w-full h-full font-main flex flex-col justify-center items-center pt-[80px] pb-[80px] gap-y-6'>
      <span className="text-h1 font-bold">가능한 일정을 등록해주세요!</span>
      <div className={' w-[588px] bg-gray-100 rounded-3xl font-main font-normal p-[24px] flex flex-col justify-center text-subtitle3'}>
        <div className="w-full pt-[20px] ">
            <span className="w-[100px] inline-block">모임명</span> <span>{meetingInfo.name}</span>
        </div>
        <div className="w-full pt-[20px]">
            <span className="w-[100px] inline-block">모임날짜</span> <span>{meetingInfo.startDate} ~ {meetingInfo.endDate}</span>
        </div>
        <div className="w-full pt-[20px] pb-[20px]">
            <span className="w-[100px] inline-block">시간대</span> <span>{meetingInfo.startTime} ~ {meetingInfo.endTime}</span>
        </div>
        <hr className="w-full border-t border-gray-300 my-2 " /> {/* 가로선 */}
        <div className='w-full flex justify-between items-center pt-[20px]'>
            <div className='flex items-center gap-[10px]'> {/* 내부 컨테이너 추가 */}
                <span className="w-[100px] inline-block">참여자</span>
                <span>총 {meetingInfo.numberOfSubmit} 명</span>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className='bg-blue-500 text-black p-2 rounded-md'>
                {isOpen ? <AiOutlineUp size={24}/> : <AiOutlineDown size={24} />}
            </button>
        </div>
        {isOpen && (
            <div className='w-full pt-[20px] flex flex-wrap justify-start'>
            {meetingInfo.attendee.map((participant, index) => (
              <div key={index} className='w-1/5 min-w-[20%] p-1 flex justify-center items-center text-center'>{participant}</div>
            ))}
          </div>    
        )}
        </div>
        <div className="w-full pt-[20px]"/>
        <LongBtn style={'primary-longBtn'} onClick={()=>onClickRegister(meetingInfo.meetingId)}>일정 등록하기</LongBtn>
        <LongBtn style={'secondary-longBtn'} onClick={onClickInvite}>모임 초대하기</LongBtn>
        <LongBtn style={'secondary-longBtn'} onClick={()=> onClickResult(meetingInfo.meetingId)}>결과 확인하기</LongBtn>
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