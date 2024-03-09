import React from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/navigation';

const ConfirmedCompleteMessage = (
    {
        meetingId,
        setIsConfirmedPopupComplete
    }
) => {
    const router = useRouter();

    const onClickShareBtn = () => {
        console.log('share');
        setIsConfirmedPopupComplete(false);
        router.push('/mypage');
    }

    return (
        <Popup>
            <div className='text-subtitle1 font-medium'>일정이 확정되었습니다 !</div>
            <ButtonGroup>
                <StyledButton className="bg-yellow-400 w-[393px] h-[64px] rounded-full px-[64px] flex items-center justify-center gap-2 text-main text-subtitle2 font-normal" 
                onClick={onClickShareBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0001 0.933594C6.26763 0.933594 0 5.77599 0 11.7483C0 15.4626 2.42419 18.7369 6.11573 20.6845L4.56251 26.3585C4.42528 26.8598 4.99866 27.2594 5.43897 26.9689L12.2475 22.4753C12.822 22.5308 13.4059 22.5631 14.0001 22.5631C21.7319 22.5631 28 17.7209 28 11.7483C28 5.77599 21.7319 0.933594 14.0001 0.933594Z" fill="#070707"/>
                    </svg>
                    카카오톡으로 공유하기
                </StyledButton>
                <StyledDeclineButton className="text-body3 border-b border-gray-800 text-gray-800"
                    onClick={()=>{
                        router.push('/mypage');
                    }}>
                공유 안할래요
                </StyledDeclineButton>    
            </ButtonGroup>
        </Popup>
    );
};

export default ConfirmedCompleteMessage;

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
