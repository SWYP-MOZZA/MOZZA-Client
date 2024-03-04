"use client";
import React,{useState}from 'react';
import dynamic from 'next/dynamic';
import ResultBox from '../../components/result/resultBox';
import HoverBox from '../../components/result/hoverBox';
import MypageResultBox from '@/app/components/mypage/mypage-resultBox';

const ResultTimeTable = dynamic(() => import('../../components/table/result-timetable'), {
    ssr: false
    });



export default function Test(){
    const [isHover, setIsHover] = useState(false);

    const onClickFilterBtn = () => {
        console.log('필터 버튼 클릭');
        setIsHover(!isHover);
    }

    return (
        <div className='w-[3/4] flex justify-between'>
            <MypageResultBox/>
        </div>
    )
}