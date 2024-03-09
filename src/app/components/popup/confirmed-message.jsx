import React from 'react';
import styled from 'styled-components';

const ConfirmedMessage = (
    {
        selectedSlot,
        onClickConfirmedDeleteBtn,
        onClickConfirmedGoBtn
    }
) => {
    const date = selectedSlot.date;
    const [year, month, day] = date.split('-').map(num => parseInt(num, 10));
    // Date 객체 생성
    const meetingDate = new Date(year, month - 1, day); // 월은 0부터 시작하므로 1을 빼줍니다.
    
    // locale을 'ko-KR'로 설정하여 한국어로 날짜와 요일을 포맷
    const formattedDate = meetingDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'long', // 요일 추가
    });

    // 시작 시간 파싱
    const startTime = selectedSlot.time; // 예: "10:00"
    const [hours, minutes] = startTime.split(':').map(num => parseInt(num, 10));

    // Date 객체를 사용하여 시작 시간 설정
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0); // 현재 날짜에 시간과 분을 설정

    // 끝 시간 계산 (30분 추가)
    const endDate = new Date(startDate.getTime() + (30 * 60 * 1000)); // 30분을 밀리초로 변환하여 추가

    // 끝 시간 포맷팅
    const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
    return (
        <Popup> 
            <div className='flex flex-col items-center text-subtitle1 font-normal text-gray-1000 mt-[10px]'>
                선택하신 일정으로 확정할까요?
            </div>
            <div className='text-subtitle2 font-normal text-gray-800 leading-relaxed'>확정된 일정은 수정할 수 없어요</div>
            <div className="m-[20px] inline-flex w-[500px] flex-col items-center justify-center p-8 gap-4 rounded-lg bg-gray-100 text-subtitle3">
                <div>{formattedDate}</div> {/* 수정된 부분 */}
                <div>{`${startTime} - ${endTime}`}</div> {/* 수정된 부분 */}
                <div>{selectedSlot.attendee[0]} 외 {selectedSlot.attendee.length-1}명</div>
            </div>

            <ButtonGroup>
                <button className="bg-green-100 w-[195px] h-[64px] rounded-full px-[64px] text-main text-subtitle2" onClick={onClickConfirmedDeleteBtn}>취소</button>
                <button className="bg-green-600 text-white w-[195px] h-[64px] rounded-full px-[32px] text-main text-subtitle2" onClick={onClickConfirmedGoBtn}>확인</button>
            </ButtonGroup>
        </Popup>
    );
};

export default ConfirmedMessage;

const Popup = styled.div`
    position: fixed;
    top: 50%; 
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    border-radius: 24px;
    width: 588px;
    height: 500px;
    background-color: #FFFEFE;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 48px; // 버튼 그룹과 위의 텍스트 사이의 간격
    gap:24px;
`;


