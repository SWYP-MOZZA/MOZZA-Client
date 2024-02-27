"use client";
import React,{useState,useEffect} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 locale을 직접 불러옴
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore); // isSameOrBefore 플러그인 활성화
dayjs.locale('ko'); // locale을 한국어로 설정
import styled from 'styled-components';

function DraggableTimeTable() {
    const [timeSlots, setTimeSlots] = useState({});
    const [isDragging, setIsDragging] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState([]);

    const startTime = 9;
    const endTime = 15;
    const pageSize = 7; // 한 페이지에 보여줄 날짜 수

    useEffect(() => {
      // 서버에서 받은 날짜들을 상태로 저장하는 부분은 생략합니다.
      // 여기서는 예시로 몇 가지 날짜를 직접 정의합니다.
      const serverDates = ["2023-03-12", "2023-03-13", "2023-03-15", "2023-03-17", "2023-03-20", "2023-03-22", "2023-03-23", "2023-03-24", "2023-03-25", "2023-03-26", "2023-03-27", "2023-03-28"];
      
      const paginateDates = (dates, pageSize) => {
        const pages = [];
        for (let i = 0; i < dates.length; i += pageSize) {
          pages.push(dates.slice(i, i + pageSize));
        }
        return pages;
      };

      const slots = {};
      serverDates.forEach(day => {
        const slotCount = (endTime - startTime) * 2; // 30분 간격으로 타임슬롯 계산
        slots[day] = Array.from({ length: slotCount }, (_, i) => {
          const hour = startTime + Math.floor(i / 2);
          const minute = i % 2 === 0 ? '00' : '30';
          return {
            time: `${hour}:${minute}`,
            isActive: false // 초기 상태는 비활성화
          };
        });
      });
    
      setTimeSlots(slots);
      console.log('타임슬롯 : ',slots);
      setPages(paginateDates(serverDates, pageSize))
    }, []); // 의존성 배열을 비워서 컴포넌트 마운트 시 한 번만 실행되도록 함
  
    // 페이지 넘김 기능
    const nextPage = () => {
      if (currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    };

    const prevPage = () => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };

      
    const resetTimeSlots = () => {
      // 새 객체를 생성하여 각 타임슬롯의 isActive를 false로 설정
      const resetSlots = Object.fromEntries(
        Object.entries(timeSlots).map(([day, slots]) => [
          day,
          slots.map(slot => ({ ...slot, isActive: false }))
        ])
      );
    
      // 업데이트된 객체로 timeSlots 상태를 설정
      setTimeSlots(resetSlots);
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
    <button onClick={prevPage} disabled={currentPage <= 0}>이전</button>
    <button onClick={nextPage} disabled={currentPage >= pages.length - 1}>다음</button>
    <button onClick={resetTimeSlots}>초기화</button>
    <TableContainer>
    <Table>
    <thead>
      <Tr>
        <Th></Th>
        {pages[currentPage]?.map(day => { // 현재 페이지에 해당하는 날짜들을 순회
          const date = dayjs(day);
          const monthDay = date.format('MM/DD'); // "월/일" 형식
          const dayOfWeek = date.format('ddd'); // "요일" 형식
          return <Th key={day}>{monthDay}<br />{dayOfWeek}</Th>;
        })}
      </Tr>
    </thead>
    {/* <tbody>
      {Object.values(timeSlots)[0]?.map((slot, index) => (
        <Tr key={index}>
          <Td>{index % 2 === 0 ? `${parseInt(slot.time.split(':')[0], 10)}시` : ''}</Td>
          {pages[currentPage]?.map(day => (
            <Td
              key={`${day}-${index}`}
              isActive={slot?.isActive ?? false} // 안전한 접근 방식
              onMouseDown={(e) => handleMouseDown(e, day, index)}
              onMouseEnter={() => handleMouseEnter(day, index)}
              onMouseUp={handleMouseUp}
            />
          ))}
        </Tr>
      ))}
    </tbody> */}
    <tbody>
      {Array.from({ length: (endTime - startTime) * 2 }, (_, index) => {
        // 정각인 경우 "9시", "10시" 등으로 표시, 30분인 경우 빈 문자열로 처리
        const isHalfHour = index % 2 !== 0;
        const hour = Math.floor(startTime + index / 2);
        const timeLabel = isHalfHour ? '' : `${hour}시`; // 30분인 경우 빈 문자열, 아니면 "시" 추가
        return (
          <Tr key={index}>
            <Td>{timeLabel}</Td>
            {pages[currentPage]?.map(day => {
              const isActive = timeSlots[day][index].isActive; // 해당 날짜와 시간에 대한 isActive 상태
              return (
                <Td
                  key={`${day}-${index}`}
                  isActive={isActive}
                  onMouseDown={(e) => handleMouseDown(e, day, index)}
                  onMouseEnter={() => handleMouseEnter(day, index)}
                  onMouseUp={handleMouseUp}
                />
              );
            })}
          </Tr>
        );
      })}
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
    height: 60px; /* 셀의 높이를 50px로 설정 */
    &:first-child {
      background-color: #fff;
      border-top: none;
      border-bottom: none;
      border-left:none;
      font-size: 16px;
      font-weight: bold;
    }
  `;

const Td = styled.td`
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? '#009652' : 'transparent')};
  padding: 0px;
  border: 1px solid #ddd;
  width: 100px;
  height: 30px;

  /* 시간을 나타내는 첫 번째 Td의 위아래 border 제거 */
  &:first-child {
    border-top: none;
    border-bottom: none;
    border-left:none;
    font-size: 16px;
    font-weight: bold;
  }
  `;