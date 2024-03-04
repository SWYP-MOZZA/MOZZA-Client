import Calendar from 'react-calendar';
import React, { useState, useEffect } from 'react';
import '../../styles/custom-calendar.css';

export default function CustomCalendar({setIsCheck}){
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
        // 중복 방지 & 선택 해제 
        console.log(selectedDate)
        const updatedSelectedDates = [...selectedDates]
        if (selectedDates.includes(selectedDate)) {
            console.log(selectedDates.includes(selectedDate),'들어있다')
            const removeIndex = selectedDates.indexOf(selectedDate);
            updatedSelectedDates.splice(removeIndex,1);
            setSelectedDates(updatedSelectedDates);
            return;
            // return setSelectedDates((prev)=> {selectedDates.splice(removeIndex)})
            
        }

        // 클릭한 날짜 추가
        setSelectedDates(prevSelectedDates => {
            const newDates = [...prevSelectedDates, selectedDate];
            return [...new Set(newDates)]; // 중복 제거
        });
        
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

    function setIsChecked(isCheck){
        // const newArr = [...props.isCheck];
        // newArr[1] = isCheck;
        // props.setIsCheck(newArr);
        setIsCheck((prev)=>{
            console.log(isCheck);
            const newArr = [...prev];
            newArr[1] = isCheck;
            return newArr;
        })
    }
    useEffect(()=>{
        console.log('길이', selectedDates.length, selectedDates);
        if(selectedDates.length !== 0){
            setIsChecked(true);
        }else if(selectedDates.length === 0){
            setIsChecked(false)
        }
    },[selectedDates])
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