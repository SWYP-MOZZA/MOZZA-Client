import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format, isWithinInterval, parseISO, startOfDay, endOfDay } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { useMeetingResult } from '@/app/hooks/useMeetingResult';

// icon
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

const ResultCalendar = ({
    onHoverChange,
    dateResult
  }) => {
    const [date, setDate] = useState(new Date());
    const [lastHoveredDate, setLastHoveredDate] = useState(null);
    const [isHovering, setIsHovering] = useState(false);

    const getBackgroundColorClass = (day) => {
      const dayFormatted = format(new Date(year, month, day), 'yyyy-MM-dd');
      
      // Find the day data in the array
      const dayData = dateResult.data.find(data => data[dayFormatted]);
      
      // If day data does not exist, return default class
      if (!dayData) return 'bg-gray-300 text-gray-500';
      
      // Assuming dayData[dayFormatted] is an array and we take the first item
      const ratio = dayData[dayFormatted][0].ratio * 100; // Adjust ratio
      
      // Conditional styling based on ratio
      if (isNaN(ratio) || ratio <= 20) return 'bg-white text-gray-700';
      if (ratio <= 40) return 'bg-green-100 text-white';
      if (ratio <= 60) return 'bg-green-300 text-white';
      if (ratio <= 80) return 'bg-green-500 text-white';
      return 'bg-green-700 text-white'; // Covers >80 and 100% cases
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

    // 셀에 대한 마우스 호버 이벤트 핸들러


    const handleMouseEnter = (date) => {
      // 이미 같은 날짜에 대해 호버 처리가 되어 있다면, 추가 처리를 방지
      if (lastHoveredDate === date && isHovering) return;

      setLastHoveredDate(date); // 마지막으로 호버된 날짜 업데이트
      setIsHovering(true); // 호버 상태를 true로 설정

      onHoverChange(date); // 가져온 데이터를 상위 컴포넌트나 상태 관리 로직으로 전달
  };

  const handleMouseLeave = () => {
      setIsHovering(false); // 호버 상태 종료
      onHoverChange(null); // 호버가 종료되면 null을 전달
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
    <>
    <div className='flex justify-between items-center'>
        <span className="inline-flex px-6 py-2 justify-center items-center gap-2 rounded-full bg-green-100 ml-[72px]">
                    {dateResult.numberOfSubmit}명 참여
            </span>

    </div>
    <CalendarWrapper>
      <div className='w-[488px] flex justify-between mb-[10px]'>
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
        {calendarRows.map((week, index) => (
          <Tr key={index}>
            {week.map((day, idx) => {
              const dayFormatted = format(new Date(year, month, day), 'yyyy-MM-dd');
              return (
                <Td 
                key={idx}
                className={getBackgroundColorClass(day)}
                onMouseEnter={() => handleMouseEnter(dayFormatted)}
                onMouseLeave={handleMouseLeave}>
                  {day}
                </Td>
              );
            })}
          </Tr>
        ))}
      </tbody>
      </table>
    </CalendarWrapper>
  </>

  );

}

export default ResultCalendar;

const CalendarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px; /* 모바일 환경에 적합하도록 패딩 조정 */
    align-items: center;
    max-width: 100%;
    background: white;
    font-family: 'Spoqa Han Sans Neo', Helvetica, sans-serif;
    line-height: 1.125em;
    border-radius: 24px;
    box-shadow: 2px 4px 16px 0px rgba(0, 0, 0, 0.10);
    margin: 32px auto; /* 모바일 환경에서 좌우 마진을 자동으로 설정하여 가운데 정렬 */
    font-size: 16px; /* 글꼴 크기를 줄여서 모바일 화면에 맞게 조정 */
    font-weight: 500;
    color: #4a4a4a;

    @media (min-width: 768px) {
        padding: 24px 40px;
        margin: 32px 50px;
        font-size: 20px;
    }
`;

const Th = styled.th`
  position: relative;
  width: 36px; /* 모바일 화면에 맞게 너비 조정 */
  height: 36px; /* 모바일 화면에 맞게 높이 조정 */
  display: flex;
  line-height: 36px; /* 높이에 맞게 line-height 조정 */
  text-align: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px; /* 모바일 화면에 맞게 글꼴 크기 조정 */
  font-weight: 500;

  @media (min-width: 768px) {
      width: 48px;
      height: 48px;
      line-height: 40px;
      font-size: 20px;
  }
`;
const Tr = styled.tr`
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
`;

const Td = styled.td`
  position: relative;
  width: 36px; /* 모바일 화면에 맞게 너비 조정 */
  height: 36px; /* 모바일 화면에 맞게 높이 조정 */
  font-size: 16px; /* 모바일 화면에 맞게 글꼴 크기 조정 */
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 8px; /* 모바일 화면에 맞게 마진 조정 */
  border-radius: 0; /* 사각형 모양 유지 */
  overflow: hidden;

  @media (min-width: 768px) {
      width: 48px;
      height: 48px;
      margin: 12px;
      font-size: 20px;
  }
  ${(props) =>
    props.ratio === 100 &&
    `&::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid black;
      border-radius: 50%; /* 원 모양 */
    }`}
`;