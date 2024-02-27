import Calendar from 'react-calendar';
import React, { useState, useEffect } from 'react';
import '../../styles/custom-calendar.css';

export default function CustomCalendar(){
    const [isClient, setIsClient] = useState(false)
    const [value, onChange] = useState(new Date());
    useEffect(() => {
        setIsClient(true);
      }, []);
    return (
        <div>
            { isClient? (
                <Calendar
                    locale='ko' 
                    onChange={onChange} 
                    value={value}
                    next2Label={null}
                    prev2Label={null}
                    formatDay={(locale, date) =>
                        date.toLocaleString('en', { day: 'numeric' })
                      }
                     />
            ):''}

        </div>
    )
}