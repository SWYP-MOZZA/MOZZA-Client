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
      
      // 시간 포맷팅 로직 수정
      let timeString = ''; // 기본값으로 빈 문자열 설정
      if (slotData.time) {
          const startTime = slotData.time;
          const [hours, minutes] = startTime.split(':').map(num => parseInt(num, 10));

          const startDate = new Date();
          startDate.setHours(hours, minutes, 0);

          const endDate = new Date(startDate.getTime() + (30 * 60 * 1000));
          const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;

          timeString = `${startTime} - ${endTime}`; // 시간 정보가 있을 때만 timeString 설정
      }

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
                    <span>{formattedDate} {timeString}</span>
                    
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
