"use client";
import React,{useState,useEffect} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 locale을 직접 불러옴
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore); // isSameOrBefore 플러그인 활성화
dayjs.locale('ko'); // locale을 한국어로 설정
import styled from 'styled-components';

function DraggableTimeTable() {
    const [days, setDays] = useState([]);
    const [timeSlots, setTimeSlots] = useState({});
    const [visibleWeekStart, setVisibleWeekStart] = useState(dayjs("2023-02-26"));
    const [isDragging, setIsDragging] = useState(false);
  
    const endDate = dayjs("2023-03-17");
    const startTime = 9;
    const endTime = 16;


    useEffect(() => {
      const startDay = visibleWeekStart;
      const dayList = [];
      let dayToAdd = dayjs(startDay);
  
      // 최대 7일 또는 endDate까지의 날짜 추가
      for (let i = 0; i < 7 && dayToAdd.isSameOrBefore(endDate); i++) {
        dayList.push(dayToAdd.format('YYYY-MM-DD'));
        dayToAdd = dayToAdd.add(1, 'day');
      }
  
      setDays(dayList);
  
      const slots = {};
      dayList.forEach(day => {
        const slotCount = (endTime - startTime) * 2;
        slots[day] = Array.from({ length: slotCount }, (_, i) => {
          const hour = startTime + Math.floor(i / 2);
          const minute = i % 2 === 0 ? '00' : '30';
          return {
            time: `${hour}:${minute}`,
            isActive: false
          };
        });
      });
  
      setTimeSlots(slots);
    }, [visibleWeekStart]);
  
    const handleNextWeek = () => {
      const newStart = visibleWeekStart.add(7, 'day');
      if (newStart.isAfter(endDate)) return;
      setVisibleWeekStart(newStart);
    };
  
    const handlePrevWeek = () => {
      const newStart = visibleWeekStart.subtract(7, 'day');
      if (newStart.isBefore(dayjs("2023-02-26"))) return;
      setVisibleWeekStart(newStart);
    };
      
    

      const handleMouseDown = (e, day, index) => {
        e.preventDefault(); // 드래그 시작 시 기본 동작 방지
        setIsDragging(true);
        toggleSlot(day, index);
      };
    
      const handleMouseEnter = (day, index) => {
        if (isDragging) {
          toggleSlot(day, index);
        }
      };
    
      const handleMouseUp = () => {
        setIsDragging(false);
        console.log(timeSlots);
      };

      const toggleSlot = (day, index) => {
        setTimeSlots(prev => ({
          ...prev,
          [day]: prev[day].map((slot, i) => i === index ? { ...slot, isActive: !slot.isActive } : slot)
        }));
      };

  return (
    <>
    <button onClick={handlePrevWeek}>이전</button>
    <button onClick={handleNextWeek}>다음</button>
    <TableContainer>
    <Table>
    <thead>
      <Tr>
        <Th>시간</Th>
        {days.map(day => {
          const date = dayjs(day);
          const formattedDate = date.format('MM/DD ddd'); // "월-일, 요일" 형식으로 포맷팅
          return <Th key={day}>{formattedDate}</Th>;
        })}
      </Tr>
    </thead>
    <tbody>
      {Object.values(timeSlots)[0]?.map((slot, index) => (
        <Tr key={index}>
          <Td>{index % 2 === 0 ? `${parseInt(slot.time.split(':')[0], 10)}시` : ''}</Td>
          {days.map(day => (
            <Td
              key={`${day}-${index}`}
              isActive={timeSlots[day][index]?.isActive}
              onMouseDown={(e) => handleMouseDown(e, day, index)}
              onMouseEnter={() => handleMouseEnter(day, index)}
              onMouseUp={handleMouseUp}
            />
          ))}
        </Tr>
      ))}
    </tbody>
    </Table>
    </TableContainer>
    </>
  );
};

export default DraggableTimeTable;

const TableContainer = styled.div`
    display: flex;
    overflow-x: auto;
    margin-top: 20px;
    flex: 1;
    align-items: center;
    justify-content: center;
    `;

const Table = styled.table`
    width: 70%;
    border-collapse: collapse;
    border-spacing: 0;
    text-align: center;
    `;

const Tr = styled.tr`
    font-size: 12px;
  `;
  
const Th = styled.th`
    padding: 8px;
    border: 1px solid #ddd;
    background-color: #f2f2f2;
    width: 100px; /* 셀의 너비를 100px로 설정 */
    height: 50px; /* 셀의 높이를 50px로 설정 */
  `;

const Td = styled.td`
    cursor: pointer;
    background-color: ${({ isActive }) => (isActive ? '#009652' : 'transparent')};
    padding: 8px;
    border: 1px solid #ddd;
    width: 100px;
    height: 50px;
  `;