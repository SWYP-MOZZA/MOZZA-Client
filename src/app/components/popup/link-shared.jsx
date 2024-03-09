import React from 'react';
import styled from 'styled-components';

const LinkShared = (
    {
        onConfirm,
        onDecline
    }
) => {

    return (
        <Popup>
            <div className='text-subtitle2 font-normal text-gray-800 leading-relaxed'>선택하신 일정이 등록되었어요!</div>
                <div>링크가 복사되었어요!</div>
            <ButtonGroup>
                <button className="bg-green-600 text-white w-[195px] h-[64px] rounded-full px-[32px] text-main text-subtitle2 " onClick={onConfirm}>받을래요</button>
            </ButtonGroup>
        </Popup>
    );
};

export default LinkShared;

const Popup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    border-radius: 16px;
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


