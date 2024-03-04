import React, {useState} from 'react';
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const MypageResultBox = () => {

    const meetingInfo = {
        name: "3월 면접 스터디",
        date: "2024.03.14",
        time: "14:00 - 14:30",
        participants: 10,
        participantsList: ['김철수', '박영희', '이영수', '홍길동', '김성진', '박지우', '최유정', '여성찬', '윤혜원', '오승준'],
    };
    const meetingDate = meetingInfo.date;
    const [, month, day] = meetingDate.split('.');
    const formattedDate = `${month}월 ${day}일`;

    return (
        <div className='flex flex-col w-[588px] px-8 py-6 border-2 border-green-600 rounded-resultBox bg-white'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4 font-main text-body1 font-normal'>
                    <span>{formattedDate} (금) {meetingInfo.time}</span>
                    
                </div>
                <div className='flex items-center'>
                <span className='font-main text-body1 font-normal'>{meetingInfo.participants}명</span>
                </div>
            </div>
        </div>  
    );
};

export default MypageResultBox;
