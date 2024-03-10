'use client' 

import {useContext, useEffect, useState } from 'react';
import Container from '../components/common/Container';
import LongBtn from '../components/common/LongBtn';
import ShortBtn from '../components/common/ShortBtn';
import CheckNumCircle from '../components/mainPage/CheckNumCircle';
import CustomCalendar from '../components/mainPage/CustomCalender';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../styles/custom-checkbox-style.css';
import TimeSelector from '../components/mainPage/TimeSelector';
import axios from 'axios';
import { SERVER_BASE_URL } from '../constants/BaseUrl';
import { useSelector } from 'react-redux';

const queryClient = new QueryClient();

export default function Home() {
    const router = useRouter();
    const [isCheck, setIsCheck] = useState([false,false,false]);
    const [isOnClick, setIsOnClick] = useState(false);
    const [meetingName, setMeetingName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime,setEndTime] = useState('')
    const [isOnlyDate, setIsOnlyDate] = useState(false);

    const selectedDates = useSelector((state)=>state.calendar.selectedDates)



    function handleInputChange(input){
        console.log(input.target.value);
        const inputVal = input.target.value;
        if(inputVal !== ''){
            const newArr = [...isCheck];
            newArr[0]=true;
            setIsCheck(newArr);
            setMeetingName(inputVal);
        }else{
            const newArr = [...isCheck];
            newArr[0]=false;
            setIsCheck(newArr);
            setMeetingName(inputVal);
        }
    }
    useEffect(()=>{
        if(startTime!=='' && startTime !== endTime){
            const newArr = [...isCheck];
            newArr[2] = true;
            setIsCheck(newArr);
        }
    },[startTime,endTime])
    async function postMeetingInfo(data){
        const res = await axios.post(`${SERVER_BASE_URL}meeting/create`,{data});
        console.log(res);
    }
    function handleButtonClicked(){
        const submitData={
            name:meetingName,
            date:selectedDates,
            startTime:startTime,
            endTime:endTime,
            onlyDate:isOnlyDate,

        }
        console.log(submitData);

        const res = postMeetingInfo(submitData);
        console.log(res.data);

        // response로 id 받아와서 그 값을 url에 넣기 
        // const responseId = '123533sdfe34';
        // router.push(`/${responseId}/new`)
    }
    function handleCheckbox(e){
        setIsOnlyDate(e.target.checked);
    }

    return (
        <QueryClientProvider client={queryClient}>
        <div className='container w-full h-full font-main flex flex-col justify-center items-center pt-[80px] gap-y-6'>
            <img src='svg/logoFull.svg' className='logo w-[200px] h-[88.24px]' />
            <h1 className='title text-h1 font-bold w-[575px] text-center'>
                단 <mark className='bg-orange-200'>3단계</mark>로 모임 일정을
                <br/>
                빠르게 정해보세요!
            </h1>
        
            <Container type={'container-gray'} style={'h-[160px] p-[24px] flex justify-start items-start'}>
                <div className='subtitle-container flex gap-[16px]'>
                    <CheckNumCircle isCheck={isCheck} num={1}/>
                    <div className='text-subtitle2 font-medium text-black'>모임명을 입력해주세요.</div>
                </div>
                <div className='content-container pl-[54px] pt-[16px]'>
                    <input className='input-name w-[448px]  p-[16px]' placeholder='예)모짜모임' onChange={(e)=>{handleInputChange(e)}}></input>
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
                <CustomCalendar setIsCheck={setIsCheck}/>
                    
            </Container>
            <Container type={'container-gray'} style={' p-4 z-10'}>
                <div className='subtitle-container flex gap-[16px]'>
                    <CheckNumCircle isCheck={isCheck} num={3}/>
                    <div className='text_container flex flex-col '>
                        <div className='text-subtitle2 font-medium text-black'>시간을 선택해주세요</div>
                        <div className='text-body3 font-normal text-black'>선택한 시간대에서 모임 시간을 정할 수 있어요.</div>
                    </div>
                </div>
                <div className='content-container flex flex-col justify-center mx-[62px] my-8 gap-y-6'>
                    <div className='flex items-end w-[402px]  justify-start gap-3'>
                        <TimeSelector reset={isOnClick} setter={setStartTime} />
                        <div>부터</div>
                        <TimeSelector reset={isOnClick} setter={setEndTime}/>
                        <div>까지</div>
                    </div>
                    <div className='checkbox-container flex justify-start items-center'>
                        <input type='checkbox' id='onlyDate' className='check w-8 h-8 mr-3' onChange={handleCheckbox}/>
                        <label className='text-body2 font-normal cursor-pointer' htmlFor='onlyDate'>날짜만 정하면 돼요!</label>
                    </div>
                    <div className='text-center cursor-pointer underline underline-offset-4' onClick={()=>setIsOnClick(!isOnClick)}>초기화</div>
                </div>
            </Container>
            <LongBtn style={'primary-longBtn'} onClick={handleButtonClicked}>
                모임만들기
            </LongBtn>
        </div>
        </QueryClientProvider>
    );
  }