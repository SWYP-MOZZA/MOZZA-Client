'use client' 

import {useState } from 'react';
import Container from '../components/common/Container';
import LongBtn from '../components/common/LongBtn';
import ShortBtn from '../components/common/ShortBtn';
import CheckNumCircle from '../components/mainPage/CheckNumCircle';
import CustomCalendar from '../components/mainPage/CustomCalender';
import TimeSelector from '../components/mainPage/TimeSelector';

export default function Home() {
    const [isCheck, setIsCheck] = useState([true,true,false]);
    return (
        <div className='container w-full h-full font-main flex flex-col justify-center items-center pt-[80px] gap-y-6'>
            <img src='svg/logoFull.svg' className='logo w-[200px] h-[88.24px]' />
            <h1 className='title text-h1 font-bold w-[575px] text-center'>
                결정하기 어려웠던 모임시간, 
                <br/>
                단 <mark className='bg-orange-200'>3단계</mark>로 결정하세요
            </h1>
        
            <Container type={'container-gray'} style={'h-[160px] p-[24px] flex justify-start items-start'}>
                <div className='subtitle-container flex gap-[16px]'>
                    <CheckNumCircle isCheck={isCheck} num={1}/>
                    <div className='text-subtitle2 font-medium text-black'>모임명을 입력해주세요.</div>
                </div>
                <div className='content-container pl-[54px] pt-[16px]'>
                    <input className='input-name w-[448px]  p-[16px]' placeholder='예)모짜모임'></input>
                </div>
            </Container>
            <Container type={'container-gray'} style={'p-4 flex flex-col'}>
                <div className='subtitle-container flex gap-[16px] flex-row'>
                    <CheckNumCircle isCheck={isCheck} num={2}/>
                    <div className='text_container flex flex-col '>
                        <div className='text-subtitle2 font-medium text-black'>날짜를 선택해주세요</div>
                        <div className='text-body3 font-normal text-black'>모임 가능한 날짜를 클릭이나 드래그로 선택해주세요</div>
                    </div>
                </div>
                <div className='content-container flex justify-center flex-col items-center'>
                    <CustomCalendar/>
                    <div>초기화</div>
                </div>
            </Container>
            <Container type={'container-gray'} style={' p-4'}>
                <div className='subtitle-container flex gap-[16px]'>
                    <CheckNumCircle isCheck={isCheck} num={3}/>
                    <div className='text_container flex flex-col '>
                        <div className='text-subtitle2 font-medium text-black'>시간을 선택해주세요</div>
                        <div className='text-body3 font-normal text-black'>선택한 시간대에서 모임 시간을 정할 수 있어요.</div>
                    </div>
                </div>
                <div className='content-container flex flex-col justify-center mx-[62px] my-8 gap-y-6'>
                    <div className='flex items-end w-[402px]  justify-start gap-3'>
                        <TimeSelector/>
                        <div>부터</div>
                        <TimeSelector/>
                        <div>까지</div>
                    </div>
                    <div className='flex justify-start items-center'>
                        <input type='checkbox' className='w-8 h-8 mr-3'/>
                        <label className='text-body2 font-normal'>날짜만 정하면 돼요!</label>
                    </div>
                    <div className='text-center'>초기화</div>
                </div>
            </Container>
            <LongBtn style={'primary-longBtn'} disabled={'disabled'} >모임만들기</LongBtn>
        </div>
    );
  }