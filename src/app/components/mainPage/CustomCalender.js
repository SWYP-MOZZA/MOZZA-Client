import Calendar from 'react-calendar';
import React, { useState, useEffect } from 'react';
import '../../styles/custom-calendar.css';

export default function CustomCalendar(){
    const [selectedDates, setSelectedDates] = useState([]);
    const [isClient, setIsClient] = useState(false)
    const [value, onChange] = useState(new Date());
    
    //날짜 선택 핸들러
    const handleDateClick = (value) => {
        // 날짜 클릭 로직
        const dateString = value.toISOString().split('T')[0]; // 날짜를 문자열로 변환
        if (selectedDates.includes(dateString)) {
          // 이미 선택된 날짜라면 제거
          setSelectedDates(selectedDates.filter(date => date !== dateString));
        } else {
          // 새로운 날짜라면 추가
          setSelectedDates([...selectedDates, dateString]);
          console.log(selectedDates);
        }
      };

    // 타일에 적용할 클래스 이름을 결정하는 함수
    const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      // 선택된 날짜에 대한 스타일 적용
      let dateString = date.toISOString().split('T')[0];
      return selectedDates.includes(dateString) ? 'selected' : null;
    }
  };
      
    useEffect(() => {
        setIsClient(true);
      }, []);
    return (
        <div>
            { isClient? (
                <Calendar
                locale="ko" 
                onClickDay={handleDateClick}
                value={selectedDates}
                tileClassName={tileClassName}
                next2Label={null}
                prev2Label={null}
                formatDay={(locale, date) => date.getDate()}

              />
            ):''}

        </div>
    )
}