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

const serverDatesData = {'2023-03-12': [{'time': '09:00', 'member': 9},
  {'time': '09:30', 'member': 9},
  {'time': '10:00', 'member': 9},
  {'time': '10:30', 'member': 9},
  {'time': '11:00', 'member': 9},
  {'time': '11:30', 'member': 9},
  {'time': '12:00', 'member': 9},
  {'time': '12:30', 'member': 9},
  {'time': '13:00', 'member': 9},
  {'time': '13:30', 'member': 9},
  {'time': '14:00', 'member': 9},
  {'time': '14:30', 'member': 9}],
 '2023-03-13': [{'time': '09:00', 'member': 9},
  {'time': '09:30', 'member': 9},
  {'time': '10:00', 'member': 9},
  {'time': '10:30', 'member': 9},
  {'time': '11:00', 'member': 9},
  {'time': '11:30', 'member': 9},
  {'time': '12:00', 'member': 9},
  {'time': '12:30', 'member': 9},
  {'time': '13:00', 'member': 9},
  {'time': '13:30', 'member': 9},
  {'time': '14:00', 'member': 9},
  {'time': '14:30', 'member': 9}],
 '2023-03-15': [{'time': '09:00', 'member': 9},
  {'time': '09:30', 'member': 9},
  {'time': '10:00', 'member': 9},
  {'time': '10:30', 'member': 9},
  {'time': '11:00', 'member': 9},
  {'time': '11:30', 'member': 9},
  {'time': '12:00', 'member': 9},
  {'time': '12:30', 'member': 9},
  {'time': '13:00', 'member': 9},
  {'time': '13:30', 'member': 9},
  {'time': '14:00', 'member': 9},
  {'time': '14:30', 'member': 9}],
 '2023-03-17': [{'time': '09:00', 'member': 9},
  {'time': '09:30', 'member': 9},
  {'time': '10:00', 'member': 9},
  {'time': '10:30', 'member': 9},
  {'time': '11:00', 'member': 9},
  {'time': '11:30', 'member': 9},
  {'time': '12:00', 'member': 9},
  {'time': '12:30', 'member': 9},
  {'time': '13:00', 'member': 9},
  {'time': '13:30', 'member': 9},
  {'time': '14:00', 'member': 9},
  {'time': '14:30', 'member': 9}],
 '2023-03-20': [{'time': '09:00', 'member': 9},
  {'time': '09:30', 'member': 9},
  {'time': '10:00', 'member': 9},
  {'time': '10:30', 'member': 9},
  {'time': '11:00', 'member': 9},
  {'time': '11:30', 'member': 9},
  {'time': '12:00', 'member': 9},
  {'time': '12:30', 'member': 9},
  {'time': '13:00', 'member': 9},
  {'time': '13:30', 'member': 9},
  {'time': '14:00', 'member': 9},
  {'time': '14:30', 'member': 9}],
 '2023-03-22': [{'time': '09:00', 'member': 9},
  {'time': '09:30', 'member': 9},
  {'time': '10:00', 'member': 9},
  {'time': '10:30', 'member': 9},
  {'time': '11:00', 'member': 9},
  {'time': '11:30', 'member': 9},
  {'time': '12:00', 'member': 9},
  {'time': '12:30', 'member': 9},
  {'time': '13:00', 'member': 9},
  {'time': '13:30', 'member': 9},
  {'time': '14:00', 'member': 9},
  {'time': '14:30', 'member': 9}],
 '2023-03-23': [{'time': '09:00', 'member': 9},
  {'time': '09:30', 'member': 9},
  {'time': '10:00', 'member': 9},
  {'time': '10:30', 'member': 9},
  {'time': '11:00', 'member': 9},
  {'time': '11:30', 'member': 9},
  {'time': '12:00', 'member': 9},
  {'time': '12:30', 'member': 9},
  {'time': '13:00', 'member': 9},
  {'time': '13:30', 'member': 9},
  {'time': '14:00', 'member': 9},
  {'time': '14:30', 'member': 9}],
 '2023-03-24': [{'time': '09:00', 'member': 9},
  {'time': '09:30', 'member': 9},
  {'time': '10:00', 'member': 9},
  {'time': '10:30', 'member': 9},
  {'time': '11:00', 'member': 9},
  {'time': '11:30', 'member': 9},
  {'time': '12:00', 'member': 9},
  {'time': '12:30', 'member': 9},
  {'time': '13:00', 'member': 9},
  {'time': '13:30', 'member': 9},
  {'time': '14:00', 'member': 9},
  {'time': '14:30', 'member': 9}],
 '2023-03-25': [{'time': '09:00', 'member': 9},
  {'time': '09:30', 'member': 9},
  {'time': '10:00', 'member': 9},
  {'time': '10:30', 'member': 9},
  {'time': '11:00', 'member': 9},
  {'time': '11:30', 'member': 9},
  {'time': '12:00', 'member': 9},
  {'time': '12:30', 'member': 9},
  {'time': '13:00', 'member': 9},
  {'time': '13:30', 'member': 9},
  {'time': '14:00', 'member': 9},
  {'time': '14:30', 'member': 9}],
 '2023-03-26': [{'time': '09:00', 'member': 9},
  {'time': '09:30', 'member': 9},
  {'time': '10:00', 'member': 9},
  {'time': '10:30', 'member': 9},
  {'time': '11:00', 'member': 9},
  {'time': '11:30', 'member': 9},
  {'time': '12:00', 'member': 9},
  {'time': '12:30', 'member': 9},
  {'time': '13:00', 'member': 9},
  {'time': '13:30', 'member': 9},
  {'time': '14:00', 'member': 9},
  {'time': '14:30', 'member': 9}],
 '2023-03-27': [{'time': '09:00', 'member': 9},
  {'time': '09:30', 'member': 9},
  {'time': '10:00', 'member': 9},
  {'time': '10:30', 'member': 9},
  {'time': '11:00', 'member': 9},
  {'time': '11:30', 'member': 9},
  {'time': '12:00', 'member': 9},
  {'time': '12:30', 'member': 9},
  {'time': '13:00', 'member': 9},
  {'time': '13:30', 'member': 9},
  {'time': '14:00', 'member': 9},
  {'time': '14:30', 'member': 9}],
 '2023-03-28': [{'time': '09:00', 'member': 9},
  {'time': '09:30', 'member': 9},
  {'time': '10:00', 'member': 9},
  {'time': '10:30', 'member': 9},
  {'time': '11:00', 'member': 9},
  {'time': '11:30', 'member': 9},
  {'time': '12:00', 'member': 9},
  {'time': '12:30', 'member': 9},
  {'time': '13:00', 'member': 9},
  {'time': '13:30', 'member': 9},
  {'time': '14:00', 'member': 9},
  {'time': '14:30', 'member': 9}]};

function ResultTimeTable() {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 7; // 한 페이지에 보여줄 날짜 수

    // 모든 날짜의 키들을 가져옴
    const allDates = Object.keys(serverDatesData);

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
    Object.values(serverDatesData).forEach(day => {
        day.forEach(slot => {
        if (!allTimes.includes(slot.time)) {
            allTimes.push(slot.time);
        }
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

      return (
       <div className='flex flex-col'>
            <div className='flex justify-between items-center'>
                <span className="inline-flex px-6 py-2 justify-center items-center gap-2 rounded-full bg-green-100 ml-[72px]">12명 참여</span>

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
                            <Td>
                                {time.endsWith(':00') ? `${time.split(':')[0]}시` : ''}
                            </Td>
                            {currentDateKeys.map(date => (
                                <Td key={date}>{serverDatesData[date]?.find(slot => slot.time === time)?.member || ''}</Td>
                            ))}
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