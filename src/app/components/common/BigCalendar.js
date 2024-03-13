import React, { Component } from 'react';
import Calendar from "react-calenpicker";

export default function MyCalendar(){
  const calendarHeadStyle= {
    fontFamily: 'Spoqa Han Sans Neo, Helvetica, sans-serif',
    height:'57px',
    border:'1px solid yellow'
  }

  const CalendarBodyCssObject={
    
  }
  const sizeOption={
    width:'488px',
    height:'489px',
    
  }
  const dateCssOption={
    border:'1px solid red',
    color:'black',
    borderRadius:'100px',
    height:'48px',
    width:'48px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  }
  const TemplateCssObject={
    fontFamily: 'Spoqa Han Sans Neo, Helvetica, sans-serif',
    fontSize: '20px',
    fontWeight: '500',
    padding: '24px 40px',
    display: 'flex',
    flexDirection:'column',
    borderRadius: '24px',
    border: '4px solid #E0E0E0'
  }
  return(
      <div className="content-container flex justify-center flex-col items-center">
        <Calendar
          sizeOption={sizeOption}
          DateCssObject={dateCssOption}
          CalendarBodyCssObject	={CalendarBodyCssObject}
          CalendarHeadCssObject={calendarHeadStyle}
          TemplateCssObject={TemplateCssObject}
        />
      </div>
  );
}

