'use client'
import Calendar from 'react-calendar';
import React, { useState, useEffect,useRef  } from 'react';
import '../../styles/custom-calendar.css';
import {useDispatch, useSelector} from 'react-redux'
import { setSelectedDates } from '@/app/redux/store';


export default function CalendarDraggable({setIsCheck}){
    const [isClient, setIsClient] = useState(false)
    const [value, onChange] = useState(new Date());
    const [clickedDate, setClickedDate] = useState('');
    const [dragging, setDragging] = useState(false);
    const [startDragDate, setStartDragDate] = useState(null);
    const [endDragDate, setEndDragDate] = useState(null);

    const dispatch = useDispatch();
    const selectedDates = useSelector((state)=>state.calendar.selectedDates)
    
    const calendarRef = useRef();

    useEffect(() => {
        setIsClient(true);
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
        if (!dragging) {
          const selectedDate = formatDate(date);
          const updatedSelectedDates = [...selectedDates];
    
          if (selectedDates.includes(selectedDate)) {
            const removeIndex = selectedDates.indexOf(selectedDate);
            updatedSelectedDates.splice(removeIndex, 1);
          } else {
            updatedSelectedDates.push(selectedDate);
          }
    
          dispatch(setSelectedDates(updatedSelectedDates));
        }
      }


    const tileClassName = ({ date }) => {
       
        const currentDate = formatDate(date);
        if(selectedDates.includes(currentDate)){
            return 'react-calendar__tile--active'
        }
      };

    function handleResetBtn(){
        dispatch(setSelectedDates([]));

    }

    function setIsChecked(isCheck){
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

    function handleMouseDown(date) {
        setDragging(true);
        setStartDragDate(date);
        setEndDragDate(date);
      }
    
      function handleMouseUp() {
        setDragging(false);
        if (startDragDate && endDragDate) {
          const startDate = new Date(Math.min(startDragDate, endDragDate));
          const endDate = new Date(Math.max(startDragDate, endDragDate));
    
          const rangeDates = getDatesBetween(startDate, endDate);
    
          dispatch(setSelectedDates([...selectedDates, ...rangeDates]));
        }
    
        setStartDragDate(null);
        setEndDragDate(null);
      }
    
      function handleMouseMove(date) {
        if (dragging) {
          setEndDragDate(date);
        }
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
                        onClickDay={(e)=>handleDayClicked(e)}
                        // onChange={(value,event)=>handleOnChange(value,event)}
                        value={''}
                        onMouseDown={(e) => handleMouseDown(e)}
                        onMouseUp={() => handleMouseUp()}
                        onMouseMove={(e) => handleMouseMove(e)}
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