import React, { useState } from 'react';

// 현재 월의 날짜들을 생성하는 함수
function getDaysInMonth(year, month) {
  const date = new Date(year, month, 1);
  const days = [];

  while (date.getMonth() === month) {
    days.push(new Date(date).toISOString().split('T')[0]); // YYYY-MM-DD 형식
    date.setDate(date.getDate() + 1);
  }

  return days;
}

function PlanCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDates, setSelectedDates] = useState([]);

  const days = getDaysInMonth(currentYear, currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
    }
  };

  const toggleDateSelection = (date) => {
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  return (
    <div>
      <button onClick={handlePrevMonth}>이전 달</button>
      <span>{`${currentYear}년 ${currentMonth + 1}월`}</span>
      <button onClick={handleNextMonth}>다음 달</button>
      <div>
        {days.map((day) => (
          <div
            key={day}
            onClick={() => toggleDateSelection(day)}
            style={{
              textDecoration: selectedDates.includes(day) ? 'underline' : 'none',
            }}
          >
            {day.split('-')[2]} {/* 날짜만 표시 */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlanCalendar;
