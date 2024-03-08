import React, {useState} from 'react';
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const UnconfirmedTimeResultBox = ({key,slotData,onSlotCheck,selectedSlot}) => {
    const [isOpen, setIsOpen] = useState(false);
    const isChecked = selectedSlot && selectedSlot.date === slotData.date && selectedSlot.time === slotData.time;
    const handleCheckChange = () => {
        onSlotCheck(slotData);
      };
    

    const getWeekday = (dateString) => {
        const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
        const date = new Date(year, month - 1, day);
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
        return weekdays[date.getDay()];
      };
      
      const meetingDate = slotData.date;
      const [, month, day] = meetingDate.split('-');
      const weekday = getWeekday(meetingDate); // 날짜에 해당하는 요일 계산
      const formattedDate = `${month}월 ${day}일 (${weekday}) `;
      
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
                    <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={handleCheckChange}
                        className="form-checkbox h-7 w-7 text-green-600"
                    />
                    <span>{formattedDate} {slotData.time ? `${startTime} - ${endTime}` : ''}</span>
                    
                </div>
                <div className='flex items-center'>
                <span className='font-main text-body1 font-normal'>{slotData.attendee.length}명</span>
                <button onClick={() => setIsOpen(!isOpen)} className='bg-blue-500 text-black p-2 ml-2 rounded-md'>
                    {isOpen ? <AiOutlineUp size={24}/> : <AiOutlineDown size={24} />}
                </button>
                </div>
            </div>
            {isOpen && (
                <div className='w-full pt-4 flex flex-wrap justify-between gap-y-2'>
                {slotData.attendee.map((participant, index) => (
                  <div key={index} className='w-[18%] p-1 flex justify-center items-center rounded-resultName bg-gray-100'>{participant}</div>
                ))}
              </div>
                 
            )}
        </div>  
    );
};

export default UnconfirmedTimeResultBox;
