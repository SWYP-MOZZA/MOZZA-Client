import LongBtn from '../components/common/LongBtn';
import ShortBtn from '../components/common/ShortBtn';
import React from 'react';
import dynamic from 'next/dynamic';



export default function Home() {
    return (
        <>
            <h1>메인페이지입니다</h1>
            <LongBtn style={'primary-longBtn'} disabled={'disabled'}>롱버튼입니다.</LongBtn>
            <LongBtn style={'secondary-longBtn'}>롱버튼입니다.</LongBtn>
            <ShortBtn style={'primary-shortBtn'}>숏버튼</ShortBtn>
            <ShortBtn style={'secondary-shortBtn'}>숏버튼</ShortBtn>
        </>
    );
  }