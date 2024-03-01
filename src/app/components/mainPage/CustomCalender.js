import Calendar from 'react-calendar';
import React, { useState, useEffect } from 'react';
import '../../styles/custom-calendar.css';

export default function CustomCalendar(){
    const [isClient, setIsClient] = useState(false)
    const [value, onChange] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState([])
    const [clickedDate, setClickedDate] = useState('');
    useEffect(() => {
        setIsClient(true);
      }, []);



    function handleDayClicked(date){
        const formattedDate = date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });         
        const selectedDate = formattedDate.split('. ').join('-').replace(/\.$/, '')

        //중복 방지 & 선택해제 
        if(selectedDates.includes(selectedDate)){
            const indexToRemove = selectedDates.indexOf(selectedDate);
            return selectedDates.splice(indexToRemove,1);
            
        }

        //클릭한 날짜 추가
        setSelectedDates(prevSelectedDates => [...new Set([...prevSelectedDates, selectedDate])]);
        
    }
    const tileClassName = ({ date }) => {
        const formattedDate = date.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        const currentDate = formattedDate.split('. ').join('-').replace(/\.$/, '');
    
        return selectedDates.includes(currentDate) ? 'react-calendar__tile--active' : '';
      };

    function handleResetBtn(){
        setSelectedDates([]);

    }
    return (
        <div>
            { isClient? (
                <div  className='content-container flex justify-center flex-col items-center'>
                    <Calendar
                        locale='ko' 
                        onClickDay={(e)=>handleDayClicked(e)}
                        value={''}
                        next2Label={null}
                        prev2Label={null}
                        tileClassName={tileClassName}
                        formatDay={(locale, date) =>
                            date.toLocaleString('en', { day: 'numeric' })
                        }
                        />
                    
                    <div className='cursor-pointer underline underline-offset-4' onClick={handleResetBtn}>초기화</div>
                </div>
            ):''}

        </div>
    )
}