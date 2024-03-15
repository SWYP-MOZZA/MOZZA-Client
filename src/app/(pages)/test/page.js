"use client";
import React,{useEffect,useMemo, useState}from 'react';
import dynamic from 'next/dynamic';
const RegisterDraggableCalendar = dynamic(() => import('../../components/calendar/register-draggabel-calendar'), {
    ssr: false
    });



export default function Test(){
    const RegisterDraggableCalendarMemo = React.memo(RegisterDraggableCalendar);
    const [dateSlots, setDateSlots] = useState([]);
    const [meetingData, setMeetingData] = useState(
        {
          "meetingId": 123,
          "name": "Meeting1",
          "date" : ["2023-10-20","2023-10-21","2023-10-25"],
          "startTime": "09:00",
          "endTime": "18:00",   
        }
      );

    useEffect(() => {
        console.log('dateSlots : ', dateSlots);
    }
    ,[dateSlots]);


        

    return (
        <div className='w-[3/4] flex justify-between'>
            <div>
            <RegisterDraggableCalendarMemo  meetingData={meetingData} dateSlots={dateSlots} setDateSlots={setDateSlots}/>
            </div>
        </div>
    )
}