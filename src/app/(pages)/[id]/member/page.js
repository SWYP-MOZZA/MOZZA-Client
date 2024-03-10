'use client'
import Container from '@/app/components/common/Container';
import LongBtn from '@/app/components/common/LongBtn';
import { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

import { useRouter } from 'next/navigation';

export default function memberPage(){
    const [num,setNum] = useState(0);
    function handleSetNum(action) {
        setNum((prevNum) => {
            let updatedNum = prevNum;
            
            if (action === 'plus') {
                updatedNum++;
            } else if (action === 'minus' && updatedNum > 0) {
                updatedNum--;
            }

            return updatedNum;
        });
    }
    function handleBtnClick(){
        console.log('설정인원 체크 : ',num);
        //!여기서 "ableNotificaton" : true,"numberOfVoter" : 6 post 요청       
    }
    return(
        <div className='container w-full h-full font-main flex flex-col justify-center items-center pt-[120px]'>
            <Container type={'container-gray'} style={'py-[64px]'}>
                <div className='text-center text-subtitle2 font-medium mb-10'>몇 명이 등록하면<br/>알림을 보내드릴까요?</div>
                <div className='select-container flex justify-center items-center gap-x-8'>
                    <FaMinus className='w-[44px] h-[44px] stroke-gray-800 cursor-pointer' onClick={()=>handleSetNum('minus')}/>
                    <div className='w-[180px] h-[180px] bg-white p-[62px] rounded border border-gray-500 text-gray-500 flex gap-x-[2px] items-center'>
                        <div className='text-h1'>{num}</div>
                        <div className='text-subtitle2 '>명</div>
                    </div>
                    <FaPlus className='w-[44px] h-[44px] stroke-gray-800 cursor-pointer' onClick={()=>handleSetNum('plus')}/>
                </div>
            </Container>
            <div className='flex flex-col gap-y-[16px] justify-center items-center my-[64px]'>
                <LongBtn style={'primary-longBtn'} onClick={()=>handleBtnClick()}>알림받기</LongBtn>
                <div>안 받을래요</div>
            </div>
        </div>
    )
}