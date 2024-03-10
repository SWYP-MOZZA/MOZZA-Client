'use client'
import Calendar from 'react-calendar';
import React, { useState, useEffect } from 'react';
import '../../styles/custom-calendar.css';
import {useDispatch, useSelector} from 'react-redux'
import { setSelectedDates } from '@/app/redux/store';

export default function CustomCalendar({setIsCheck}){
    const [isClient, setIsClient] = useState(false)
    const [value, onChange] = useState(new Date());


    //const [selectedDates, setSelectedDates] = useState([])
    const [clickedDate, setClickedDate] = useState('');

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

    function handleDayClicked(date) {
        const selectedDate = formatDate(date);
        const updatedSelectedDates = [...selectedDates];
      
        // 이미 선택된 날짜인 경우 선택 해제
        if (selectedDates.includes(selectedDate)) {
          const removeIndex = selectedDates.indexOf(selectedDate);
          updatedSelectedDates.splice(removeIndex, 1);
        } else {
          // 클릭한 날짜 추가
          updatedSelectedDates.push(selectedDate);
        }
      
        dispatch(setSelectedDates(updatedSelectedDates));
      }
    const tileClassName = ({ date }) => {
       
        const currentDate = formatDate(date);
        if(selectedDates.includes(currentDate)){
            return 'react-calendar__tile--active'
        }
        // return selectedDates.includes(currentDate) ? 'react-calendar__tile--active' : '';

        
      };

    //   const tileClassName = ({ date }) => {
    //     const currentDate = formatDate(date);
    //     const isActive = selectedDates.includes(currentDate);
      
    //     return isActive ? 'react-calendar__tile--active' : '';
    //   };

    function handleResetBtn(){
        dispatch(setSelectedDates([]));

    }

    function setIsChecked(isCheck){
        // const newArr = [...props.isCheck];
        // newArr[1] = isCheck;
        // props.setIsCheck(newArr);
        setIsCheck((prev)=>{
            // console.log(isCheck);
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

    },[selectedDates])

    // function handleOnChange(value,event){
    //     console.log('value',value);
    //     const [start, end] = value;
    //     const formattedStart = formatDate(start)
    //     const formattedEnd = formatDate(end)

    //     const rangeDates = getDatesBetween(formattedStart, formattedEnd);
    //     setSelectedDates((prevSelectedDates) => {
    //     const newDates = [...prevSelectedDates, ...rangeDates];
    //     return [...new Set(newDates)]; // 중복 제거
    //     });

    // }
    // function getDatesBetween(start, end) {
    //     const startDate = new Date(start);
    //     const endDate = new Date(end);
    //     const dates = [];
    //     let currentDate = startDate;
      
    //     while (currentDate <= endDate) {
    //       dates.push(formatDate(currentDate));
    //       currentDate.setDate(currentDate.getDate() + 1);
    //     }
    //     return dates;
    //   }
    
    return (
        <div>
            { isClient? (
                <div  className='content-container flex justify-center flex-col items-center'>
                    <Calendar
                        locale='ko' 
                        onClickDay={(e)=>handleDayClicked(e)}
                        // onChange={(value,event)=>handleOnChange(value,event)}
                        value={''}
                        next2Label={null}
                        prev2Label={null}
                        tileClassName={tileClassName}
                        formatDay={(locale, date) =>
                            date.toLocaleString('en', { day: 'numeric' })
                        }
                        // selectRange={true}                    
                        />
                    
                    <div className='cursor-pointer underline underline-offset-4' onClick={handleResetBtn}>초기화</div>
                </div>
            ):''}

        </div>
    )
}