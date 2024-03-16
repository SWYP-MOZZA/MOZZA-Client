import React from 'react';
import styled from 'styled-components';

const MeetConfirmed1 = (
    {
        onConfirm,
        onDecline
    }
) => {

    return (
        <Popup>
            <div className='text-subtitle2 font-normal text-gray-800 leading-relaxed'>선택하신 일정이 등록되었어요!</div>
            <div className='flex flex-col items-center text-subtitle1 font-normal text-gray-1000 mt-[10px]'>
                <span>일정이 확정되면</span> 
                <span>카카오톡 알림을 받으실래요?</span>
            </div>
            <ButtonGroup>
                <button className="bg-green-100 w-[195px] h-[64px] rounded-full px-[64px] text-main text-subtitle2" onClick={onDecline}>아니요</button>
                <button className="bg-green-600 text-white w-[195px] h-[64px] rounded-full px-[32px] text-main text-subtitle2 " onClick={onConfirm}>받을래요</button>
            </ButtonGroup>
        </Popup>
    );
};

export default MeetConfirmed1;

const Popup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    border-radius: 24px;
    width: 588px;
    height: 326px;
    background-color: #FFFEFE;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 48px; // 버튼 그룹과 위의 텍스트 사이의 간격
    gap:24px;
`;


