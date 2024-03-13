"use client";
import React,{useState}from 'react';
import dynamic from 'next/dynamic';
import ResultBox from '../../components/result/result-time/unconfirmed-resultBox';
import HoverBox from '../../components/result/result-time/hoverBox';
import MypageResultBox from '@/app/components/mypage/mypage-resultBox';

const ResultTimeTable = dynamic(() => import('../../components/table/result-timetable'), {
    ssr: false
    });
const DraggableTimeTable = dynamic(() => import('../../components/table/draggable-timetable'), {
    ssr: false
    });

const RegisterDraggableCalendar = dynamic(() => import('../../components/calendar/register-draggabel-calendar'), {
    ssr: false
    });




export default function Test(){
    const DraggableTimeTableMemo = React.memo(DraggableTimeTable);
    const RegisterDraggableCalendarMemo = React.memo(RegisterDraggableCalendar);
    const [isHover, setIsHover] = useState(false);
    const meetingData = {
        date: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05', '2022-01-06', '2022-01-07'],
        startTime: '09:00',
        endTime: '18:00',
    };
    const [timeSlots, setTimeSlots] = useState({});


    return (
        <div className='w-[3/4] flex justify-between'>
            <RegisterDraggableCalendarMemo year={2024} month={3}/>
        </div>
    )
}