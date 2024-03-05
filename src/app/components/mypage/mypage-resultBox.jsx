import React, {useState} from 'react';
import { FaRegTrashAlt } from "react-icons/fa";

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

    const onClickDeleteBtn  = () => {
        console.log('delete');
    }

    const onClickDetailBtn = () => {
        console.log('detail');
    }

    return (
        <div className='flex flex-col w-[588px] px-8 py-6 border-2 border-green-600 rounded-resultBox bg-white'>
            <div className='flex flex-col justify-between'>
                <div className='flex justify-between font-main text-body1 font-normal'>
                    <span>{meetingInfo.name}</span>
                    <button onClick={onClickDeleteBtn}>
                        <FaRegTrashAlt size={32} />
                    </button>
                </div>
                <div className='flex items-center gap-4 font-main text-body1 font-normal'>
                    <span>현재 {meetingInfo.participants}명 참여</span>
                    
                </div>
                <div className='flex w-[524px] items-end justify-between'>
                    <div className='flex flex-col items-center '>
                        <div className='flex-1 shrink-0 basis-0 font-main text-body3 font-normal text-gray-800 leading-resultBox'>모임 생성일: {meetingInfo.date}</div>
                    </div>
                    <button class="flex h-12 px-8 text-white justify-center items-center gap-2.5 rounded-full bg-green-600"
                        onClick={onClickDetailBtn}>
                    자세히 보기
                    </button>
                </div>
            </div>
        </div>  
    );
};

export default MypageResultBox;
