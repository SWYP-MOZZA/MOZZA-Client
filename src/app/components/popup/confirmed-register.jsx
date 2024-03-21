import React from 'react';
import styled from 'styled-components'; 

const ConfirmedRegisterMessage = (
    {
        onConfrim
    }
) => {
    return (
        <Popup>
            <div className='text-subtitle1 font-medium'>일정이 등록 되었습니다!</div>
            <ButtonGroup>
                <button className="bg-green-600 text-white w-[195px] h-[64px] rounded-full px-[32px] text-main text-subtitle2 " onClick={onConfrim}>
                    확인
                </button>
            </ButtonGroup>
        </Popup>
    );
};

export default ConfirmedRegisterMessage;

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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 48px; // 버튼 그룹과 위의 텍스트 사이의 간격
    gap:24px;
`;

const StyledButton = styled.button`
    background-color: #FEE500;
    width: 393px;
    height: 64px;
    border-radius: 32px;
    padding: 0 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px; // SVG와 텍스트 사이의 간격
    font-size: 24px; // 
    font-weight: normal; // 
    color: #000; // 
    border: none;
    cursor: pointer;
`;

const StyledDeclineButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    color: #424242; // 
    border-bottom: 1px solid #424242; // 하단 테두리 적용
    font-size: 16px; // 
    cursor: pointer;
`;
