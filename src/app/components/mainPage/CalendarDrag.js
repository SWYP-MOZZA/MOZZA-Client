'use client'
import Calendar from 'react-calendar';
import React, { useState, useEffect } from 'react';
import '../../styles/custom-calendar.css';
import {useDispatch, useSelector} from 'react-redux'
import { setSelectedDates } from '@/app/redux/store';

export default function CalendarDrag({setIsCheck}){
    const [isClient, setIsClient] = useState(false)
    const dispatch = useDispatch();
    const selectedDates = useSelector((state)=>state.calendar.selectedDates)
    useEffect(() => {
        setIsClient(true);
        console.log(selectedDates);
      }, []);


    function formatDate(date){
        const formattedDate = date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });         
        const selectedDate = formattedDate.split('. ').join('-').replace(/\.$/, '');
        return selectedDate;
    }

    
    const tileClassName = ({ date }) => {
    const currentDate = formatDate(date);
    const isActive = selectedDates.includes(currentDate);
    
    return isActive ? 'react-calendar__tile--active' : '';
    };
    function handleResetBtn(){
        dispatch(setSelectedDates([]));

    }

    function setIsChecked(isCheck){
        setIsCheck((prev)=>{
            const newArr = [...prev];
            newArr[1] = isCheck;
            return newArr;
        })
    }
    useEffect(()=>{
        if(selectedDates.length !== 0){
            setIsChecked(true);
        }else if(selectedDates.length === 0){
            setIsChecked(false)
        }

        console.log('선택된 날짜', selectedDates);

    },[selectedDates])

    function handleOnChange(value, event) {
        const [start, end] = value;
        const formattedStart = formatDate(start);
        const formattedEnd = formatDate(end);
        
        const rangeDates = getDatesBetween(formattedStart, formattedEnd);
      
        // Set을 이용하여 중복된 날짜를 제거하고 새로운 배열 생성
        const updatedSelectedDates = Array.from(new Set([...selectedDates, ...rangeDates]));
      
        dispatch(setSelectedDates(updatedSelectedDates));
      }
      


      function getDatesBetween(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const dates = [];
        let currentDate = startDate;
      
        while (currentDate <= endDate) {
          dates.push(formatDate(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
      }
    
    return (
        <div>
            { isClient? (
                <div  className='content-container flex justify-center flex-col items-center'>
                    <Calendar
                        locale='ko' 
                        onChange={(value,event)=>handleOnChange(value,event)}
                        value={''}
                        next2Label={null}
                        prev2Label={null}
                        tileClassName={tileClassName}
                        formatDay={(locale, date) =>
                            date.toLocaleString('en', { day: 'numeric' })
                        }
                        selectRange={true}                    
                        />
                    
                    <div className='cursor-pointer underline underline-offset-4' onClick={handleResetBtn}>초기화</div>
                </div>
            ):''}

        </div>
    )
}