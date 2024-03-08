import React, {useState} from 'react';
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const ConfirmedTimeBox = (
    {confirmedMeetingData}
) => {

    const meetingInfo = {
        name: "3월 면접 스터디",
        date: "2024-03-14",
        time: "14:00",
        participants: 10,
        participantsList: ['김철수', '박영희', '이영수', '홍길동', '김성진', '박지우', '최유정', '여성찬', '윤혜원', '오승준'],
    };
    const getWeekday = (dateString) => {
        const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
        const date = new Date(year, month - 1, day);
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
        return weekdays[date.getDay()];
      };
      
      const meetingDate = meetingInfo.date;
      const [, month, day] = meetingDate.split('-');
      const weekday = getWeekday(meetingDate); // 날짜에 해당하는 요일 계산
      const formattedDate = `${month}월 ${day}일 (${weekday}) `;

       // 시작 시간 파싱
    const startTime = meetingInfo.time; // 예: "10:00"
    const [hours, minutes] = startTime.split(':').map(num => parseInt(num, 10));

    // Date 객체를 사용하여 시작 시간 설정
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0); // 현재 날짜에 시간과 분을 설정

    // 끝 시간 계산 (30분 추가)
    const endDate = new Date(startDate.getTime() + (30 * 60 * 1000)); // 30분을 밀리초로 변환하여 추가

    // 끝 시간 포맷팅
    const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
    return (
        <div className='flex flex-col w-[588px] px-8 py-6 border-2 border-green-600 rounded-resultBox bg-white'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4 font-main text-body1 font-normal'>
                    <div className="flex h-[38px] px-4 py-1 justify-center items-center gap-2 rounded bg-green-600 text-white">
                        확정
                    </div>

                    <span>{formattedDate} {meetingInfo.time ? `${startTime} - ${endTime}`: ''}</span>
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

export default ConfirmedTimeBox;
