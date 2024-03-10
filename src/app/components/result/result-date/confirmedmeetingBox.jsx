import React, {useState} from 'react';
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const ConfirmedDateBox = () => {
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
                    <div className="flex h-[38px] px-4 py-1 justify-center items-center gap-2 rounded bg-green-600 text-white">
                        확정
                    </div>

                    <span>{formattedDate} (금) {meetingInfo.time ? meetingInfo.time : ''}</span>
                </div>
                <div className='flex items-center'>
                <span className='font-main text-body1 font-normal'>{meetingInfo.participants}명</span>
                </div>
            </div>

                <div className='w-full pt-4 flex flex-wrap justify-between gap-y-2'>
                {meetingInfo.participantsList.map((participant, index) => (
                  <div key={index} className='w-[18%] p-1 flex justify-center items-center rounded-resultName bg-gray-100'>{participant}</div>
                ))}
              </div>
                 
        </div>  
    );
};

export default ConfirmedDateBox;
