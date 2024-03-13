import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format, isWithinInterval, parseISO, startOfDay, endOfDay } from 'date-fns';
import 'react-calendar/dist/Calendar.css';

const RegisterDraggableCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(null);

    const onSelectDate = (day) => {
        // 유효하지 않은 날짜인 경우 함수 실행 중단
        if (day === '') return;
    
        const formattedDate = format(new Date(year, month, day), 'yyyy-MM-dd');
        if (selectedDates.includes(formattedDate)) {
            setSelectedDates(selectedDates.filter(date => date !== formattedDate));
        } else {
            setSelectedDates([...selectedDates, formattedDate]);
        }
    };
    
    const onMouseDown = (day, event) => {
        // 유효하지 않은 날짜인 경우 이벤트 처리 중단
        if (day === '') return;
    
        event.preventDefault();
        setIsDragging(true);
        onSelectDate(day);
    };
    
    const onMouseEnter = (day, event) => {
        // 드래깅 중이 아니거나 유효하지 않은 날짜인 경우 이벤트 처리 중단
        if (!isDragging || day === '') return;
    
        event.preventDefault();
        onSelectDate(day);
    };
    

    const onMouseUp = () => {
        setIsDragging(false);
        console.log('selectedDates : ', selectedDates);
    };



    const year = date.getFullYear();
    // JavaScript의 getMonth()는 0부터 시작하기 때문에, 화면에 표시할 때는 +1을 해줍니다.
    const month = date.getMonth();
  
    // 이전 달로 이동하는 함수
    const prevMonth = () => {
      setDate(new Date(year, month - 1, 1));
    };
  
    // 다음 달로 이동하는 함수
    const nextMonth = () => {
      setDate(new Date(year, month + 1, 1));
    };


const resetSelectedDates = () => {
      // 업데이트된 객체로 resetdDates 상태를 설정
      setSelectedDates([]);
    };
    
  // 해당 월의 첫 날과 마지막 날
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // 첫 날의 요일 (0:일요일, 1:월요일, ..., 6:토요일)
  const startDayOfWeek = firstDayOfMonth.getDay();

  // 해당 월의 총 일수
  const daysInMonth = lastDayOfMonth.getDate();

  // 달력에 표시될 주의 배열 생성
  const calendarRows = [];

  // 첫 주의 시작 위치 계산
  let day = 1 - startDayOfWeek;

  // 6주간 반복하여 주를 생성 (대부분의 달력은 최대 6주로 구성됨)
  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++, day++) {
      week.push(
        day > 0 && day <= daysInMonth ? day : ''
      );
    }
    calendarRows.push(week);
  }

  return (
    <div className='flex flex-col items-center justify-center'>
        <div> {year}년 {month}월</div>
    <table>
      <thead>
        <tr>
          <th>
            <button onClick={prevMonth}>이전</button>
          </th>
          <th>일</th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
          <th>
            <button onClick={nextMonth}>다음 달</button>
          </th>
        </tr>
      </thead>
      <tbody>
                    {calendarRows.map((week, index) => (
                        <tr key={index}>
                            <td></td>
                            {week.map((day, idx) => (
                                <td key={idx}
                                    onMouseDown={(event) => onMouseDown(day, event)}
                                    onMouseEnter={(event) => onMouseEnter(day, event)}
                                    onMouseUp={onMouseUp}
                                    className={`cursor-pointer ${selectedDates.includes(format(new Date(year, month, day), 'yyyy-MM-dd')) ? 'bg-green-500' : 'bg-white'}`}>
                                    {day}
                                </td>
                            ))}
                            <td></td>
                        </tr>
                    ))}
                </tbody>

    </table>
    <button className='mt-[10px] border-b border-gray-800 text-gray-800' onClick={resetSelectedDates}>초기화</button>
    </div>
  );

}

export default RegisterDraggableCalendar;
