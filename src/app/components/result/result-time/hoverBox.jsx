import React, {useState} from 'react';

const HoverTimeBox = ({date,slotData}) => {
    const [, month, day] = date.split('-');
    const formattedDate = `${month}월 ${day}일`;

    // 시작 시간 파싱
    const startTime = slotData.time; // 예: "10:00"
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
                    <span>{formattedDate} (금) {slotData.time ? `${startTime} - ${endTime}` : ''}</span>
                    
                </div>
                <div className='flex items-center'>
                <span className='font-main text-body1 font-normal'>{slotData.attendee.length}명</span>
                </div>
            </div>

                <div className='w-full pt-4 flex flex-wrap justify-between gap-y-2'>
                {slotData.attendee.map((participant, index) => (
                  <div key={index} className='w-[18%] p-1 flex justify-center items-center rounded-resultName bg-gray-100'>{participant}</div>
                ))}
              </div>
                 
        </div>  
    );
};

export default HoverTimeBox;
