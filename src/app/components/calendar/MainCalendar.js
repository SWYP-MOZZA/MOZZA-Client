import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format, isWithinInterval, parseISO, startOfDay, endOfDay } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
// icon
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';

const MainCalendar = () => {
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
    <CalendarWrapper>
        <div className='w-full flex justify-between mb-[10px]'>
        <button onClick={prevMonth}>
            <AiOutlineLeft size={24} />
        </button>
        <div> {year}년 {month}월</div>
        <button onClick={nextMonth}>
            <AiOutlineRight size={24} />
        </button>
        </div>
        <hr />
    <table>
      <thead>
        <Tr>
          <Th>일</Th>
          <Th>월</Th>
          <Th>화</Th>
          <Th>수</Th>
          <Th>목</Th>
          <Th>금</Th>
          <Th>토</Th>
        </Tr>
      </thead>
      <tbody>
      {calendarRows.map((week, index) => (
            <Tr key={index}>
                {week.map((day, idx) => (
                <Td key={idx}
                    onMouseDown={day !== '' ? (event) => onMouseDown(day, event) : undefined}
                    onMouseEnter={day !== '' ? (event) => onMouseEnter(day, event) : undefined}
                    onMouseUp={day !== '' ? onMouseUp : undefined}
                    className={`${day !== '' ? 'valid ' : ''}${selectedDates.includes(format(new Date(year, month, day), 'yyyy-MM-dd')) ? 'selected' : ''}`}>
                    {day}
                </Td>
                ))}
            </Tr>
            ))}
    </tbody>

    </table>
    <ResetButton onClick={resetSelectedDates}>초기화</ResetButton>
    </CalendarWrapper>
  );

}

export default RegisterDraggableCalendar;

const CalendarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    background: white;
    font-family: 'Spoqa Han Sans Neo', Helvetica, sans-serif;
    line-height: 1.125em;
    padding:24px 40px;
    border-radius: 24px;
    box-shadow: 2px 4px 16px 0px rgba(0, 0, 0, 0.10);
    margin: 32px 50px;
    font-size: 20px;
    font-weight: 500;
    color: #4a4a4a;
`;

const Th = styled.th`
    padding: 10px 0;
    text-align: center;
`;
const Tr = styled.tr`
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
`;

const Td = styled.td`
  position: relative;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  border-radius: 50%; /* 원형 표시를 위해 */
  
  /* 호버 시 원형 배경색 적용 */
  &:hover {
    background-color: rgba(0, 128, 0, 0.1); /* green-100 같은 효과 */
  }

  /* 선택된 날짜에 대한 스타일 */
  &.selected {
    background-color: #48BB78; /* TailwindCSS의 green-500 */
    color: white;
  }
`;

// onSelectDate, onMouseDown, onMouseEnter, onMouseUp 함수 내에서
// className에 'selected' 클래스를 조건부로 추가


const ResetButton = styled.button`
    width: 100px;
    margin-top: 10px;
    border-bottom: 1px solid #000;
    color: #000;
`;