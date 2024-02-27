import LongBtn from '../components/common/LongBtn';
import ShortBtn from '../components/common/ShortBtn';
import React from 'react';
import dynamic from 'next/dynamic';

// 클라이언트 사이드에서만 렌더링되는 컴포넌트를 동적으로 임포트합니다.
const DraggableTimeTable = dynamic(() => import('../components/timetable/draggable-timetable'), {
  ssr: false, // 서버 사이드 렌더링을 비활성화합니다.
});

export default function Home() {
    return (
        <>
            <h1>메인페이지입니다</h1>
            <LongBtn style={'primary-longBtn'} disabled={'disabled'}>롱버튼입니다.</LongBtn>
            <LongBtn style={'secondary-longBtn'}>롱버튼입니다.</LongBtn>
            <ShortBtn style={'primary-shortBtn'}>숏버튼</ShortBtn>
            <ShortBtn style={'secondary-shortBtn'}>숏버튼</ShortBtn>
            <DraggableTimeTable />
        </>
    );
  }