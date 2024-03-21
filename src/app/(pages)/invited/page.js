'use client' 
import React , {useState,useEffect,Suspense}from 'react';
import LongBtn from '@/app/components/common/LongBtn';
import { useSearchParams, useRouter } from 'next/navigation';
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import axios from 'axios';
import { SERVER_BASE_URL, Client_URL } from '@/app/constants/BaseUrl';
import LinkShared from '@/app/components/popup/link-shared';
import {useMeetingShortInfo} from '@/app/hooks/useMeetingShortInfo';

// 모임 초대 페이지
const InvitedPage = () => {
    const router = useRouter();
    const params = useSearchParams();
    const meetingId = params.get('meetingId');
    // const meetingId = 1; // 임시로 1로 설정

    // 참여자 목록 토글 상태
    const [isOpen, setIsOpen] = useState(false); 

    const [isCompleteLinkPopup, setIsCompleteLinkPopup] = useState(false);

    const { meetingShortInfo, isOnlyDate, loading, error } = useMeetingShortInfo(meetingId);
    // meetingShortInfo가 없을 때도 처리할 수 있도록 기본값을 설정합니다.
    const defaultMeetingInfo = {
      name: '모임 정보를 불러오는 중...',
      startDate: '',
      endDate: '',
      startTime: '00:00',
      endTime: '00:00',
      numberOfVoter: 0,
      attendee: [],
      meetingId: '',
  };

  // meetingShortInfo가 없거나 로딩 중일 때 기본값을 사용합니다.
    const displayInfo = loading || !meetingShortInfo ? defaultMeetingInfo : meetingShortInfo;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const onClickRegister = (meetingId) => {
        console.log('click Register');
        router.push(`/invited/register?meetingId=${meetingId}`);
    }

    

    const onClickInvite = (meetingId) => {
      console.log('click Invite');
      navigator.clipboard.writeText(`${Client_URL}/invited?meetingId=${meetingId}`)
        .then(() => {
          // 클립보드에 복사 성공 시 실행될 코드
          console.log('Link copied to clipboard');
          setIsCompleteLinkPopup(true);
        })
        .catch(err => {
          // 클립보드 복사 실패 시 실행될 코드
          console.error('Failed to copy link to clipboard', err);
        });
    }
    
    const onClickResult = (meetingId) => {
        console.log('click Result');
        if (meetingShortInfo.startTime ==="00:00" && meetingShortInfo.endTime === "00:00") {
          router.push(`/invited/dateresult?meetingId=${meetingId}`);
      }
      else {
      // 로그인 성공 후 페이지 이동
      router.push(`/invited/timeresult?meetingId=${meetingId}`);
      }
    }
    
  return (
    <Suspense fallback={<div>Loading...</div>}> 

    <div className='container w-full h-full font-main flex flex-col justify-center items-center pt-[80px] pb-[80px] gap-y-6'>
      {isCompleteLinkPopup && 
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>}
      <span className="text-h1 font-bold">가능한 일정을 등록해주세요!</span>
      <div className={' w-[588px] bg-gray-100 rounded-3xl font-main font-normal p-[24px] flex flex-col justify-center text-subtitle3'}>
        <div className="w-full pt-[20px] ">
            <span className="w-[100px] inline-block">모임명</span> <span>{displayInfo.name}</span>
        </div>
        <div className="w-full pt-[20px]">
            <span className="w-[100px] inline-block">모임날짜</span> <span>{displayInfo.startDate} ~ {displayInfo.endDate}</span>
        </div>
        {/* 시간대 정보가 있는 경우에만 렌더링 */}
        {isOnlyDate && (
            <div className="w-full pt-[20px] pb-[20px]">
                <span className="w-[100px] inline-block">시간대</span> <span>{displayInfo.startTime} ~ {displayInfo.endTime}</span>
            </div>
        )}
        <hr className="w-full border-t border-gray-300 my-2 " /> {/* 가로선 */}
        <div className='w-full flex justify-between items-center pt-[20px]'>
            <div className='flex items-center gap-[10px]'> {/* 내부 컨테이너 추가 */}
                <span className="w-[100px] inline-block">참여자</span>
                <span>총 {displayInfo.numberOfVoter} 명</span>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className='bg-blue-500 text-black p-2 rounded-md'>
                {isOpen ? <AiOutlineUp size={24}/> : <AiOutlineDown size={24} />}
            </button>
        </div>
        {isOpen && (
            <div className='w-full pt-[20px] flex flex-wrap justify-start'>
            {displayInfo.attendee.map((participant, index) => (
              <div key={index} className='w-1/5 min-w-[20%] p-1 flex justify-center items-center text-center'>{participant}</div>
            ))}
          </div>    
        )}
        </div>
        <div className="w-full pt-[20px]"/>
        <LongBtn style={'primary-longBtn'} onClick={()=>onClickRegister(displayInfo.meetingId)}>일정 등록하기</LongBtn>
        <LongBtn style={'secondary-longBtn'} onClick={()=>onClickInvite(displayInfo)}>모임 초대하기</LongBtn>
        <LongBtn style={'secondary-longBtn'} onClick={()=> onClickResult(displayInfo.meetingId)}>결과 확인하기</LongBtn>
        {isCompleteLinkPopup && <LinkShared setIsCompleteLinkPopup={setIsCompleteLinkPopup} />}
    </div>
    </Suspense>
  );
};

export default InvitedPage;
