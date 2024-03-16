import React from 'react';
import styled from 'styled-components';

const MeetDelete = (
    {
        onClickDelete,
        onClickNo
    }
) => {

    return (
        <Popup>
            <div className='flex flex-col items-center text-subtitle1 font-normal text-gray-1000 mt-[10px]'>
                선택하신 모임을 삭제할까요?
            </div>
            <div className='text-subtitle2 font-normal text-gray-800 leading-relaxed'>삭제된 모임은 복구가 불가능해요.</div>
            
            <ButtonGroup>
                <button className="bg-green-100 w-[195px] h-[64px] rounded-full px-[64px] text-main text-subtitle2" onClick={onClickNo}>취소</button>
                <button className="bg-green-600 text-white w-[195px] h-[64px] rounded-full px-[64px] text-main text-subtitle2" onClick={onClickDelete}>삭제</button>
            </ButtonGroup>
        </Popup>
    );
};

export default MeetDelete;

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


