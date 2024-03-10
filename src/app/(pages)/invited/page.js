'use client' 
import React , {useState,useEffect}from 'react';
import LongBtn from '@/app/components/common/LongBtn';
import { useSearchParams, useRouter } from 'next/navigation';
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import axios from 'axios';
import { SERVER_BASE_URL, Client_URL } from '@/app/constants/BaseUrl';
import LinkShared from '@/app/components/popup/link-shared';

const InvitedPage = () => {
    const router = useRouter();
    const params = useSearchParams();
    // const meetingId = params.get('meetingId');
    const meetingId = 1; // 임시로 1로 설정

    // 참여자 목록 토글 상태
    const [isOpen, setIsOpen] = useState(false); 

    // 모임 정보 (예시 데이터)
    // 더미데이터
    const [meetingShortInfo, setMeetingShortInfo] = useState({
        // "meetingId": 1,
        // "name": "Meeting1",
        // "startDate": "2024-03-12",
        // "endDate" : "2024-03-15",
        // "startTime": "09:00",
        // "endTime": "10:30",
        // "numberOfSubmit": 4,
        // "attendee" : ["최유정", "윤혜원", "여성찬","김성진"] 
    });

    const bringMeetingInfo = async () => {
        try {
            // 서버로부터 모임 정보를 가져옴
            const response = await axios.get(`${SERVER_BASE_URL}/meeting/${meetingId}/short`);
            setMeetingShortInfo(response.data.Data);
            console.log('모임 정보:', response.data);
        } catch (error) {
            console.error('error:', error.response ? error.response : error.message);
        }
    }
    useEffect(() => {
        bringMeetingInfo();
    }, []);

    const onClickRegister = (meetingId) => {
        console.log('click Register');
        router.push(`/invited/register?meetingId=${meetingId}`);
    }

    const [isCompleteLinkPopup, setIsCompleteLinkPopup] = useState(false);
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
        router.push(`/invited/timeresult?meetingId=${meetingId}`);
    }
    

  return (
    <div className='container w-full h-full font-main flex flex-col justify-center items-center pt-[80px] pb-[80px] gap-y-6'>
      {isCompleteLinkPopup && 
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>}
      <span className="text-h1 font-bold">가능한 일정을 등록해주세요!</span>
      <div className={' w-[588px] bg-gray-100 rounded-3xl font-main font-normal p-[24px] flex flex-col justify-center text-subtitle3'}>
        <div className="w-full pt-[20px] ">
            <span className="w-[100px] inline-block">모임명</span> <span>{meetingShortInfo.name}</span>
        </div>
        <div className="w-full pt-[20px]">
            <span className="w-[100px] inline-block">모임날짜</span> <span>{meetingShortInfo.startDate} ~ {meetingShortInfo.endDate}</span>
        </div>
        <div className="w-full pt-[20px] pb-[20px]">
            <span className="w-[100px] inline-block">시간대</span> <span>{meetingShortInfo.startTime} ~ {meetingShortInfo.endTime}</span>
        </div>
        <hr className="w-full border-t border-gray-300 my-2 " /> {/* 가로선 */}
        <div className='w-full flex justify-between items-center pt-[20px]'>
            <div className='flex items-center gap-[10px]'> {/* 내부 컨테이너 추가 */}
                <span className="w-[100px] inline-block">참여자</span>
                <span>총 {meetingShortInfo.numberOfSubmit} 명</span>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className='bg-blue-500 text-black p-2 rounded-md'>
                {isOpen ? <AiOutlineUp size={24}/> : <AiOutlineDown size={24} />}
            </button>
        </div>
        {isOpen && (
            <div className='w-full pt-[20px] flex flex-wrap justify-start'>
            {meetingShortInfo.attendee.map((participant, index) => (
              <div key={index} className='w-1/5 min-w-[20%] p-1 flex justify-center items-center text-center'>{participant}</div>
            ))}
          </div>    
        )}
        </div>
        <div className="w-full pt-[20px]"/>
        <LongBtn style={'primary-longBtn'} onClick={()=>onClickRegister(meetingShortInfo.meetingId)}>일정 등록하기</LongBtn>
        <LongBtn style={'secondary-longBtn'} onClick={()=>onClickInvite(meetingId)}>모임 초대하기</LongBtn>
        <LongBtn style={'secondary-longBtn'} onClick={()=> onClickResult(meetingShortInfo.meetingId)}>결과 확인하기</LongBtn>
        {isCompleteLinkPopup && <LinkShared setIsCompleteLinkPopup={setIsCompleteLinkPopup} />}
    </div>
  );
};

export default InvitedPage;