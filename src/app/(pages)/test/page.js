"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const DraggableTimeTable = dynamic(() => import('../../components/table/draggable-timetable'), {
    ssr: false
    });

const ResultTable = dynamic(() => import('../../components/table/result-table'), {
    ssr: false

});

const PlanCalendar = dynamic(() => import('../../components/result/planCalender'), {
    ssr: false
});


export default function Test(){
    return (
        <div>
            <PlanCalendar />
        </div>
    )
}