import React, {useState} from 'react';
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const ConfirmedTimeBox = (
    {slotData}
) => {
    const getWeekday = (dateString) => {
        const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
        const date = new Date(year, month - 1, day);
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
        return weekdays[date.getDay()];
      };
      
      const meetingDate = slotData.confirmedDate;
      const [, month, day] = meetingDate.split('-');
      const weekday = getWeekday(meetingDate); // 날짜에 해당하는 요일 계산
      const formattedDate = `${month}월 ${day}일 (${weekday}) `;

       // slotData에서 time 값을 안전하게 접근하고, 기본값으로 공백을 사용
       const startTime = slotData?.startTime ?? "";
       const [hours, minutes] = startTime ? startTime.split(':').map(num => parseInt(num, 10)) : [null, null];
   
       let endTime = '';
   
       if (startTime) {
           // Date 객체를 사용하여 시작 시간 설정
           const startDate = new Date();
           startDate.setHours(hours, minutes, 0); // 현재 날짜에 시간과 분을 설정
       
           // 끝 시간 계산 (30분 추가)
           const endDate = new Date(startDate.getTime() + (30 * 60 * 1000)); // 30분을 밀리초로 변환하여 추가
       
           // 끝 시간 포맷팅
           endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
       }
    return (
        <div className='flex flex-col w-[588px] px-8 py-6 border-2 border-green-600 rounded-resultBox bg-white'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4 font-main text-body1 font-normal'>
                    <div className="flex h-[38px] px-4 py-1 justify-center items-center gap-2 rounded bg-green-600 text-white">
                        확정
                    </div>

                    <span>{formattedDate} (금) {slotData?.time ? `${startTime} - ${endTime}` : ''}</span>
                </div>
                <div className='flex items-center'>
                <span className='font-main text-body1 font-normal'>{slotData.confirmedAttendee.length}명</span>
                </div>
            </div>

                <div className='w-full pt-4 flex flex-wrap justify-between gap-y-2'>
                {slotData.confirmedAttendee.map((participant, index) => (
                  <div key={index} className='w-[18%] p-1 flex justify-center items-center rounded-resultName bg-gray-100'>{participant}</div>
                ))}
              </div>
                 
        </div>  
    );
};

export default ConfirmedTimeBox;
