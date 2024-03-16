"use client";
import React,{useState,useEffect} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 locale을 직접 불러옴
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore); // isSameOrBefore 플러그인 활성화
dayjs.locale('ko'); // locale을 한국어로 설정
import styled from 'styled-components';

// icon
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

function ResultTimeTable(
    { onHoverChange,resultData }
    ) {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 7; // 한 페이지에 보여줄 날짜 수

    const serverDatesData = resultData.data;
    // 모든 날짜의 키들을 가져옴
    const allDates = serverDatesData.flatMap(obj => Object.keys(obj));

    // 총 페이지 수 계산
    const totalPages = Math.ceil(allDates.length / pageSize);

    // 페이징 처리된 날짜 배열
    const pages = [];
    for (let i = 0; i < allDates.length; i += pageSize) {
        pages.push(allDates.slice(i, i + pageSize));
    }

    // 현재 페이지의 날짜들
    const currentDateKeys = pages[currentPage] || [];

    // 모든 시간대를 찾아내는 로직
    let allTimes = [];
    serverDatesData.forEach(dayObject => {
    Object.values(dayObject).forEach(slots => {
        slots.forEach(slot => {
        if (!allTimes.includes(slot.time)) {
            allTimes.push(slot.time);
        }
        });
    });
    });
    allTimes = allTimes.sort(); // 시간대 정렬


    // 페이지 이동 함수
    const nextPage = () => {
        setCurrentPage(current => Math.min(current + 1, pages.length - 1));
    };

    const prevPage = () => {
        setCurrentPage(current => Math.max(current - 1, 0));
    };

    // 셀에 대한 마우스 호버 이벤트 핸들러
    const handleMouseEnter = (date, time) => {
        onHoverChange(date, time); // 부모 컴포넌트에 날짜와 시간대 전달
        console.log(date, time);
    };

    const handleMouseLeave = () => {
        onHoverChange(null, null); // 호버가 종료되면 null을 전달
    };

    // 배경색을 결정하는 함수
    // 배경색 적용을 위한 함수 수정
    // 주의: 실제 CSS 배경색 적용을 위해 className 대신 style 객체를 사용
    const getBackgroundColorStyle = (member) => {
        const percentage = (member / resultData.numberOfSubmit) * 100;
        let color;
        if (percentage <= 20) color = '#FFFFFF'; // white
        else if (percentage <= 40) color = '#CCF2E1'; // green-100
        else if (percentage <= 60) color = '#66D19E'; // green-300
        else if (percentage <= 80) color = '#32B67A'; // green-500
        else color = '#008248'; // green-700

        return { backgroundColor: color };
    };
      return (
       <div className='flex flex-col'>
            <div className='flex justify-between items-center'>
                <span className="inline-flex px-6 py-2 justify-center items-center gap-2 rounded-full bg-green-100 ml-[72px]">{resultData.numberOfSubmit}명 참여</span>

                <span className='mr-[72px]'>{currentPage + 1}/{totalPages}</span>
            </div>
            <div className="w-full flex flex-row justify-center items-start">
                <TableContainer>
                    <Table>
                        <thead>
                        <Tr>
                            
                            <Th>
                            <button className=''onClick={prevPage} disabled={currentPage <= 0}>
                                <AiOutlineLeft size={24} />
                                </button>
                            </Th>
                            {currentDateKeys.map(day => {
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
                        {allTimes.map((time, index) => (
                        <Tr key={index}>
                            <Td>{time.endsWith(':00') ? `${time.split(':')[0]}시` : ''}</Td>
                            {currentDateKeys.map(date => {
                                let slot;
                                serverDatesData.forEach(obj => {
                                    if(obj[date]) { // 날짜에 해당하는 객체를 찾습니다.
                                        slot = obj[date].find(slotItem => slotItem.time === time);
                                    }
                                });
                                const style = getBackgroundColorStyle(slot ? slot.attendee.length : 0); // 스타일 적용
                                return (
                                    <Td 
                                    key={`${date}-${time}`} 
                                    onMouseEnter={() => handleMouseEnter(date, time)}
                                    onMouseLeave={handleMouseLeave}
                                    style={style}>
                                        {slot ? slot.attendee.length : ''}
                                    </Td>
                                );
                            })}
                            <Td />
                        </Tr>
                        ))}
                        </tbody>

                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default ResultTimeTable;

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
    width: 72px;
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
  width: 72px;
  height: 60px;

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