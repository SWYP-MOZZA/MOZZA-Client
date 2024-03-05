"use client";
import React,{ useState,useEffect } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import LongBtn from '@/app/components/common/LongBtn';
import Container from '@/app/components/common/Container';
import CustomCalendar from '@/app/components/mainPage/CustomCalender';
import UnconfirmedDateResultBox from '@/app/components/\bresult/result-date/unconfirmed-resultBox';
import HoverDateBox from '@/app/components/\bresult/result-date/hoverBox';
import ResultCalendar from '@/app/components/table/result-calendar';
const DateRegister = () => {
  const [selected, setSelected] = useState('register');
  const [isHover, setIsHover] = useState(false);

  const onClickFilterBtn = () => {
    console.log('필터 버튼 클릭');
    setIsHover(!isHover);
  }

  //버튼 클릭시마다 타입을 바꿔줍니다
  const onChangeMode = (type) => {
    if (type === "result") {
      setSelected("result");
      console.log('selected');
    } else if (type === "register") {
      setSelected("register");
      console.log('selected');
    }
};

  return (
    <div className='container w-full h-full font-main flex flex-col justify-center items-center pt-[30px] pb-[180px] gap-y-6'>
      <Switch value={selected}>
        <span /> 
        <ResultBtn //상세정보 버튼
          type="button"
          value={selected}
          onClick={() => onChangeMode("result")}
        >
          일정 결과
        </ResultBtn>
        <RegisterBtn //전시리뷰 버튼
          type="button"
          value={selected}
          onClick={() => onChangeMode("register")}
        >
          일정 등록
        </RegisterBtn>
      </Switch>
      {selected === "register" ? 
        // 일정 등록 페이지
        <div className='flex flex-col justify-center items-center'>
          <div className="w-full pt-[20px] flex flex-col justify-center items-center">
            <span className="text-subtitle1 font-midium">가능한 일정을</span>
            <span className="text-subtitle1 font-midium">클릭이나 드래그로 선택해주세요!</span>
          </div>
          <Container type={'container-basic'} style={'p-4 flex flex-col'}>
            <CustomCalendar/>
          </Container>
          <div className='m-[20px]'/>
          <LongBtn style={'primary-longBtn'} >등록하기</LongBtn>
        </div> : 
        // 일정 결과 페이지
        <div className='w-[3/4] flex justify-between'>
          <div>
                <ResultCalendar/>
            </div>
            <div className='flex flex-col gap-2.5 mt-[50px]'>
                {isHover && <HoverDateBox/>}
                <div className='flex justify-end'>
                    <button onClick={onClickFilterBtn} className="inline-flex px-6 py-2 justify-center items-center gap-2 rounded-full bg-gray-300">필터</button>
                </div>
                <UnconfirmedDateResultBox/>
                <UnconfirmedDateResultBox/>
                <UnconfirmedDateResultBox/>
                <UnconfirmedDateResultBox/>
            </div>
          </div>}
    </div>
  );
}

export default DateRegister;

const Switch = styled.div`
  position: relative;
  width: 380px;
  border-radius: 1000px;
  height: 44px;
  background-color: #F5F5F5;
  span {
    position: absolute;
    width: 188px;
    height: 40px;
    top: 2px;
    border-radius: 1000px;
    background-color: #ffffff;
    transition: all 0.6s ease-in-out;
    z-index: 1;
    ${({ value }) => //props에 따른 삼항연산자 처리
      value === "result"
        ? "transform: translateX(0px)"
        : "transform: translateX(188px)"}
  }
`;
// Button 컴포넌트 정의
const Button = styled.button`
  position: relative;
  width: 188px;
  height: 44px;
  color: #000;
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
  z-index: 2;
`;

const ResultBtn = styled(Button)`
  ${({ value }) => value === "info" && "color: #000"}
`;

const RegisterBtn = styled(Button)`
  ${({ value }) => value === "review" && "color: #000;"}
`;
