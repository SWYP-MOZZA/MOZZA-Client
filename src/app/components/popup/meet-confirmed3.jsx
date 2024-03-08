import React from 'react';
import styled from 'styled-components';

const MeetConfirmed3 = (
    {
        onConfirm
    }
) => {

    return (
        <Popup>
            <div className='flex flex-col items-center text-subtitle1 font-normal text-gray-1000 mt-[10px]'>
                <span>일정이 확정되면</span> 
                <span>카카오톡 알림을 보내드릴게요!</span>
            </div>
            <ButtonGroup>
                <button className="bg-green-100 w-[195px] h-[64px] rounded-full px-[64px] text-main text-subtitle2" onClick={onConfirm}>확인</button>
            </ButtonGroup>
        </Popup>
    );
};

export default MeetConfirmed3;

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

