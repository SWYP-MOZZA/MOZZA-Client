import React, {useEffect, useState} from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { SERVER_BASE_URL } from '@/app/constants/BaseUrl';


const MypageResultBox = ({
    handleDeletePopup,
    meeting
}) => {
    const router = useRouter();

    // Date 객체 생성
    const date = new Date(meeting.createdAt);

    // Date 객체를 원하는 형식의 문자열로 변환
    const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;

    const onClickDeleteBtn  = () => {
        console.log('delete');
        handleDeletePopup();
    }

    const onClickDetailBtn = async (meetingId, meeting) => {
        const response = await axios.get(`${SERVER_BASE_URL}/meeting/${meetingId}/short`);
        console.log('모임 분류를 위한 통신:', response.data);
        if (response.data.Data.startTime === response.data.Data.endTime) {
            if (!('confirmedDate' in meeting) || meeting.confirmedDate === null) {
                router.push(`/mypage/datedetail/unconfirmed?meetingId=${meetingId}`);
            } else {
                // confirmedDate 키가 존재하고, 그 값이 null이 아니면
                router.push(`/mypage/datedetail/confirmed?meetingId=${meetingId}`);
            }
        } else {
            // confirmedDate 키가 없거나 해당 키의 값이 null이면
            if (!('confirmedDate' in meeting) || meeting.confirmedDate === null) {
                router.push(`/mypage/timedetail/unconfirmed?meetingId=${meetingId}`);
            } else {
                // confirmedDate 키가 존재하고, 그 값이 null이 아니면
                router.push(`/mypage/timedetail/confirmed?meetingId=${meetingId}`);
            }
    }
}

    return (
            <div className='flex flex-col w-[588px] px-8 py-6 border-2 border-green-600 rounded-resultBox bg-white'>
            <div className='flex flex-col justify-between'>
                <div className='flex justify-between font-main text-body1 font-normal'>
                    <span>{meeting.meetingName}</span>
                    <button onClick={onClickDeleteBtn}>
                        <FaRegTrashAlt size={32} />
                    </button>
                </div>
                <div className='flex items-center gap-4 font-main text-body1 font-normal'>
                    <span>현재 {meeting.submitUserNumber}명 참여</span>
                    
                </div>
                <div className='flex w-[524px] items-end justify-between'>
                    <div className='flex flex-col items-center '>
                        <div className='flex-1 shrink-0 basis-0 font-main text-body3 font-normal text-gray-800 leading-resultBox'>모임 생성일: {formattedDate}</div>
                    </div>
                    <button className="flex h-12 px-8 text-white justify-center items-center gap-2.5 rounded-full bg-green-600"
                        onClick={() => onClickDetailBtn(meeting.meetingId,meeting)}>
                    자세히 보기
                    </button>
                </div>
            </div>
        </div>         
    );
};

export default MypageResultBox;
