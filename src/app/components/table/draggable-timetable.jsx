"use client";
import React,{useState,useEffect} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 locale을 직접 불러옴
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isEqual from 'lodash/isEqual';


dayjs.extend(isSameOrBefore); // isSameOrBefore 플러그인 활성화
dayjs.locale('ko'); // locale을 한국어로 설정
import styled from 'styled-components';

// icon
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

function DraggableTimeTable(
  { 
    meetingData,
    timeSlots,
    setTimeSlots
     }
  ) {
    const [localTimeSlots, setLocalTimeSlots] = useState({}); // 이름 변경
    const [isDragging, setIsDragging] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState([]);
    const pageSize = 7; // 한 페이지에 보여줄 날짜 수


    useEffect(() => {
      const serverDates = [...meetingData.date].sort((a, b) => new Date(a) - new Date(b));
      const paginateDates = (dates, pageSize) => {
        const pages = [];
        for (let i = 0; i < dates.length; i += pageSize) {
          pages.push(dates.slice(i, i + pageSize));
        }
        return pages;
      };
      const startTime = parseInt(meetingData.startTime.split(':')[0], 10) * 60 + parseInt(meetingData.startTime.split(':')[1], 10);
      const endTime = parseInt(meetingData.endTime.split(':')[0], 10) * 60 + parseInt(meetingData.endTime.split(':')[1], 10);
      const slots = {};
        serverDates.forEach(day => {
          const slotCount = (endTime - startTime) / 30; // 30분 간격으로 타임슬롯 계산, 2를 곱하는 대신에 30으로 나눔
          slots[day] = Array.from({ length: slotCount }, (_, i) => {
            const timeInMinutes = startTime + i * 30; // 시작 시간에 i * 30분을 더해 각 슬롯의 시간을 계산
            const hour = Math.floor(timeInMinutes / 60);
            const minute = timeInMinutes % 60 === 0 ? '00' : '30';
            return {
              time: `${hour}:${minute}`,
              isActive: false // 초기 상태는 비활성화
            };
          });
        });
    
      setLocalTimeSlots(slots);
      console.log('타임슬롯 : ', slots);
      setPages(paginateDates(serverDates, pageSize));
    }, [meetingData]); // setLocalTimeSlots 제거, setTimeSlots 추가
 
     
    useEffect(() => {
      // localTimeSlots와 상위 컴포넌트의 timeSlots가 실제로 다른지 비교
      if (!isEqual(timeSlots, localTimeSlots)) {
          // 차이가 있을 경우, 상위 컴포넌트의 timeSlots를 업데이트
          setTimeSlots(localTimeSlots);
          console.log('localTimeSlots : ', localTimeSlots);
      }
  }, [localTimeSlots, timeSlots, setTimeSlots]);

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
        Object.entries(localTimeSlots).map(([day, slots]) => [
          day,
          slots.map(slot => ({ ...slot, isActive: false }))
        ])
      );
    
      // 업데이트된 객체로 timeSlots 상태를 설정
      setLocalTimeSlots(resetSlots);
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
        console.log(localTimeSlots);
      };

      const toggleSlot = (day, index) => {
        setLocalTimeSlots(prev => ({
          ...prev,
          [day]: prev[day].map((slot, i) => i === index ? { ...slot, isActive: !slot.isActive } : slot)
        }));
      };

      const convertTimeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      };
      
      const startTimeInMinutes = convertTimeToMinutes(meetingData.startTime);
      const endTimeInMinutes = convertTimeToMinutes(meetingData.endTime);
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="w-full pt-[20px] flex flex-row justify-center items-start">
    <TableContainer>
      <Table>
      <thead>
        <Tr>
          <Th>
            <button className=''onClick={prevPage} disabled={currentPage <= 0}>
              <AiOutlineLeft size={24} />
            </button></Th>
          {pages[currentPage]?.map(day => { // 현재 페이지에 해당하는 날짜들을 순회
            const date = dayjs(day);
            const monthDay = date.format('MM/DD'); // "월/일" 형식
            const dayOfWeek = date.format('ddd'); // "요일" 형식
            return <Th key={day}>{monthDay}<br />{dayOfWeek}</Th>;
          })}
          <Th>
            <button onClick={nextPage} disabled={currentPage >= pages.length - 1}>
              <AiOutlineRight size={24} />
              </button></Th>
        </Tr>
      </thead>
      <tbody>
  {Array.from({ length: (endTimeInMinutes - startTimeInMinutes) / 30 }, (_, index) => {
    // 정각인 경우 "9시", "10시" 등으로 표시, 30분인 경우 빈 문자열로 처리
    const isHalfHour = index % 2 !== 0;
    const timeInMinutes = startTimeInMinutes + (index * 30);
    const hour = Math.floor(timeInMinutes / 60);
    const timeLabel = isHalfHour ? '' : `${hour}시`; // 30분인 경우 빈 문자열, 아니면 "시" 추가
    return (
      <Tr key={index}>
        <Td>{timeLabel}</Td>
        {pages[currentPage]?.map(day => {
          const isActive = localTimeSlots[day][index]?.isActive; // 해당 날짜와 시간에 대한 isActive 상태
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
              <Td />
            </Tr>
            
          );
        })}
      </tbody>

      </Table>
    </TableContainer>
    
    </div>
      <button className='mt-[10px] border-b border-gray-800 text-gray-800' onClick={resetTimeSlots}>초기화</button>
    </div>
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
    height: 60px; /* 셀의 높이를 60px로 설정 */
    &:first-child,
    &:last-child {
      background-color: #fff;
      border:none;
      font-size: 16px;
    }
  `;

const Td = styled.td`
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? '#009652' : 'transparent')};
  padding: 0px;
  border: 1px solid #ddd;
  width: 100px;
  height: 30px;

  /* 시간을 나타내는 첫 번째 Td와 마지막 Td의 위아래 border 제거 */
  &:first-child,
  &:last-child {
    border-top: none;
    border-bottom: none;
    border-left: none;
    border-right: none; /* 마지막 Td에도 border 제거 추가 */
    font-size: 16px;
  }
  `;