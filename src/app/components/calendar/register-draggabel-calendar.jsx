import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format, isWithinInterval, parseISO, startOfDay, endOfDay } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import isEqual from 'lodash/isEqual';

// icon
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

const RegisterDraggableCalendar = (
    {
        meetingData,
        dateSlots,
        setDateSlots
    }
) => {
  
    const [date, setDate] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const year = date.getFullYear();
    const month = date.getMonth();
    //! main 화면에서 사용할 state
    // Helper function to format date to 'yyyy-MM-dd'
    const formatDate = (date) => format(date, 'yyyy-MM-dd');

    // Check if a date is allowed based on meetingData
    const isDateAllowed = (formattedDate) => {
        return meetingData.date.includes(formattedDate);
    };

    const onSelectDate = (day) => {
      const formattedDate = formatDate(new Date(year, month, day));
      if (!isDateAllowed(formattedDate)) return;

      setSelectedDates((prevDates) => {
          if (prevDates.includes(formattedDate)) {
              return prevDates.filter((date) => date !== formattedDate);
          } else {
              return [...prevDates, formattedDate];
          }
      });
  };
  
    const onMouseDown = (day, event) => {
      const formattedDate = formatDate(new Date(year, month, day));
      if (!isDateAllowed(formattedDate)) return;
      
      event.preventDefault();
      setIsDragging(true);
      onSelectDate(day);
  };

    const onMouseEnter = (day, event) => {
        if (!isDragging || day === '') return; // 드래그 중이 아니라면 무시
        
        event.preventDefault();
        onSelectDate(day);
    };

    const onMouseUp = () => {
        setIsDragging(false); // 드래그 종료
        console.log('selectedDates : ', selectedDates);
    };
        

    useEffect(() => {
      // selectedDates가 변경되었을 때만 dateSlots 업데이트 실행
      if (!isEqual(dateSlots, selectedDates)) {
        setDateSlots(selectedDates);
      }
    }, [selectedDates]); // dateSlots를 의존성 배열에서 제거
    
  
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
        <div> {year}년 {month+1}월</div>
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
      {calendarRows.map((week, weekIdx) => (
        <Tr key={weekIdx}>
          {week.map((day, dayIdx) => {
            // day가 비어있지 않은 경우에만 날짜 포맷을 생성
            const formattedDate = day !== '' ? formatDate(new Date(year, month, day)) : '';
            const isAllowed = day !== '' && meetingData.date.includes(formattedDate); // 선택 가능 여부 확인
            const isSelected = day !== '' && selectedDates.includes(formattedDate); // 선택 상태 여부 확인

            return (
              <Td
                key={dayIdx}
                isAllowed={isAllowed}
                isSelected={isSelected}
                // 마우스 이벤트 핸들러에서는 day가 비어있지 않고, 선택 가능한 경우에만 이벤트 핸들러를 할당
                onMouseDown={isAllowed ? (event) => onMouseDown(day, event) : undefined}
                onMouseEnter={isAllowed ? (event) => onMouseEnter(day, event) : undefined}
                onMouseUp={isAllowed ? onMouseUp : undefined}
              >
                {day}
              </Td>
            );
          })}
        </Tr>
      ))}

    </tbody>

    </table>
    <ResetButton onClick={resetSelectedDates}>초기화</ResetButton>
    </CalendarWrapper>
  );

}

export default RegisterDraggableCalendar;


// const CalendarWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     max-width: 100%;
//     background: white;
//     font-family: 'Spoqa Han Sans Neo', Helvetica, sans-serif;
//     line-height: 1.125em;
//     padding:24px 40px;
//     border-radius: 24px;
//     box-shadow: 2px 4px 16px 0px rgba(0, 0, 0, 0.10);
//     margin: 32px 50px;
//     font-size: 20px;
//     font-weight: 500;
//     color: #4a4a4a;
// `;

const CalendarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    background: white;
    font-family: 'Spoqa Han Sans Neo', Helvetica, sans-serif;
    line-height: 1.125em;
    padding: 24px;
    border-radius: 24px;
    box-shadow: 2px 4px 16px 0px rgba(0, 0, 0, 0.10);
    margin: 32px auto; /* 가운데 정렬을 위해 변경 */
    font-size: 16px; /* 모바일 기기에 맞는 기본 글꼴 크기 조정 */
    font-weight: 500;
    color: #4a4a4a;

    @media (min-width: 768px) {
        padding: 24px 40px;
        margin: 32px 50px;
        font-size: 20px;
    }
`;

// const Th = styled.th`
//     padding: 10px 0;
//     text-align: center;
// `;
const Th = styled.th`
    padding: 8px 0; /* 모바일 환경에 맞게 조정 */
    text-align: center;
    @media (min-width: 768px) {
        padding: 10px 0;
    }
`;
// const Tr = styled.tr`
//     display: flex;
//     justify-content: space-between;
//     padding: 0 20px;
// `;

const Tr = styled.tr`
    display: flex;
    justify-content: space-between;
    padding: 0 10px; /* 모바일 환경에 맞게 조정 */
    @media (min-width: 768px) {
        padding: 0 20px;
    }
`;

// const Td = styled.td`
//   position: relative;
//   width: 40px;
//   height: 40px;
//   line-height: 40px;
//   text-align: center;
//   cursor: pointer;
//   border-radius: 50%; /* 원형 표시를 위해 */
  
//   /* 호버 시 원형 배경색 적용 */
//   &:hover {
//     background-color: rgba(0, 128, 0, 0.1); /* green-100 같은 효과 */
//   }

//   /* 선택된 날짜에 대한 스타일 */
//   &.selected {
//     background-color: #00BC67; /* TailwindCSS의 green-500 */
//     color: white;
//   }
// `;

const Td = styled.td`
    width: 30px; /* 모바일 환경에 맞게 조정 */
    height: 30px; /* 모바일 환경에 맞게 조정 */
    line-height: 30px; /* 모바일 환경에 맞게 조정 */
    @media (min-width: 768px) {
        width: 40px;
        height: 40px;
        line-height: 40px;
    }
    text-align: center;
    cursor: pointer;
    border-radius: 50%; /* 원형 표시를 위해 */

    //   /* 호버 시 원형 배경색 적용 */
  &:hover {
    background-color: rgba(0, 128, 0, 0.1); /* green-100 같은 효과 */
  }

  /* 선택된 날짜에 대한 스타일 */
  &.selected {
    background-color: #00BC67; /* TailwindCSS의 green-500 */
    color: white;
  }
`;
// onSelectDate, onMouseDown, onMouseEnter, onMouseUp 함수 내에서
// className에 'selected' 클래스를 조건부로 추가


// const ResetButton = styled.button`
//     width: 100px;
//     margin-top: 10px;
//     border-bottom: 1px solid #000;
//     color: #000;
// `;
const ResetButton = styled.button`
    width: 80px; /* 모바일 환경에 맞게 조정 */
    margin-top: 10px;
    border-bottom: 1px solid #000;
    color: #000;
    @media (min-width: 768px) {
        width: 100px;
    }
`;