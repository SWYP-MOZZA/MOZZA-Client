import React from 'react';
import dynamic from 'next/dynamic';

const DraggableTimeTable = dynamic(() => import('../../components/timetable/draggable-timetable'), {
    ssr: false
    });


export default function Test(){
    return (
        <div>
            <DraggableTimeTable />
        </div>
    )
}