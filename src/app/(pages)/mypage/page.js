"use client";
import React, {useState} from 'react';
import styled from 'styled-components';

export default function MyPage(){
    const [selected, setSelected] = useState('unconfirmed');

    //버튼 클릭시마다 타입을 바꿔줍니다
  const onChangeMode = (type) => {
    if (type === "unconfirmed") {
      setSelected("unconfirmed");
      console.log('selected');
    } else if (type === "confirmed") {
      setSelected("confirmed");
      console.log('selected');
    }
};
    return (
        <div className='container w-full h-full font-main flex flex-col justify-center items-center pt-[30px] pb-[180px] gap-y-6'>
        <Switch value={selected}>
            <span /> 
            <UnconfirmedBtn //상세정보 버튼
            type="button"
            value={selected}
            onClick={() => onChangeMode("confirmed")}
            >
            미확정된 모임
            </UnconfirmedBtn>
            <ConfirmedBtn //전시리뷰 버튼
            type="button"
            value={selected}
            onClick={() => onChangeMode("unconfirmed")}
            >
            확정된 모임
            </ConfirmedBtn>
        </Switch>
        </div>
    )
}

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
      value === "confirmed"
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

const ConfirmedBtn = styled(Button)`
  ${({ value }) => value === "info" && "color: #000"}
`;

const UnconfirmedBtn = styled(Button)`
  ${({ value }) => value === "review" && "color: #000;"}
`;
