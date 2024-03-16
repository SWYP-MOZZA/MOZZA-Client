'use client'
import Container from '@/app/components/common/Container';
import LongBtn from '@/app/components/common/LongBtn';
import { SERVER_BASE_URL } from '@/app/constants/BaseUrl';
import axios from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function NewPage(){
    const router = useRouter();
    const pathname = usePathname()
    // const {id} = router.query;
    // const [meetingId, setMeetingId] = useState('');
    const params = useSearchParams();
    const id = params.get('meetingId');

    useEffect(()=>{
        // const id = sessionStorage.getItem('meetingId');
        // setMeetingId(id);
        getMeetingInfo(id)
        console.log('현재 주소',pathname);

    },[])
    
    const [meetingInfo, setMeetingInfo] = useState(null);
    const [isOnlyDate, setIsOnlyDate] = useState(false);
    async function getMeetingInfo(id){
        try {
            const res = await axios.get(`${SERVER_BASE_URL}/meeting/${id}/short`);
            console.log(res.data.Data);
            const meetingName = res.data.Data.name;
            const startDate = res.data.Data.startDate;
            const endDate = res.data.Data.endDate;
            const startTime = res.data.Data.startTime;
            const endTime = res.data.Data.endTime;

            if(startTime === endTime){
                setIsOnlyDate(true);
            }

            const meetingInfo = {
                meetingName:meetingName,
                date: [startDate,endDate],
                time: [startTime,endTime],
            }
            setMeetingInfo(meetingInfo);
            

            console.log(meetingName, startDate, endDate, startTime, endTime);
        } catch (error) {
            console.error('Error fetching meeting info:', error);
        }
    }

    
    function copyToClipboard(text) {
        // 텍스트를 복사하기 위해 임시 textarea 엘리먼트를 생성합니다.
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        
        // textarea를 선택하여 복사합니다.
        textarea.select();
        document.execCommand('copy');
      
        // 임시 textarea 엘리먼트를 제거합니다.
        document.body.removeChild(textarea);
      }

    function handleInviteBtnClick(){
        console.log(pathname);
        const invitedLink = `${window.location.origin}/new?meetingId=${id}`;
        copyToClipboard(invitedLink);
        alert('초대 링크가 복사되었습니다.',invitedLink);
    }

    const isLogin = useSelector((state)=>state.login.isLogin);
    
    function handleKakaoBtnClick(){
        sessionStorage.setItem('currentLink',`${window.location.href}`);
        if(isLogin){
            alert('이미 로그인 된 사용자입니다');
        }else{
            router.push('/user/login')
        }
    }

    if (!meetingInfo) {
        return <div>Loading...</div>; // 데이터를 가져오는 동안 로딩 상태 표시
    }
    
    return(
        <div className='container w-full h-full font-main flex flex-col justify-center items-center pt-[80px] gap-y-6'>
            <div className='text-container text-center'>
                <h1 className='title text-h1 font-bold text-center'>모임 만들기 완료!</h1>
                <div className='subtitle text-body2 font-normal'>모임에 친구를 초대하고 함께 일정을 정해요</div>
            </div>
            <Container type={'container-gray'} style={'p-10 items-center justify-center my-16'}>
                <div className='container flex gap-6'>
                    <div className='category-name flex flex-col justify-start text-body1 font-normal w-[140px] gap-y-6'>
                        <div>모임명</div>
                        <div>모임 날짜</div>
                        {isOnlyDate? '' :(<div>모임 시간대</div>)}
                    </div>
                    <div className='content flex flex-col  text-subtitle2 font-medium gap-y-6'>
                        <div>{meetingInfo.meetingName}</div>
                        <div>{meetingInfo.date[0]}~{meetingInfo.date[1]}</div>
                        {isOnlyDate? '': (<div>{meetingInfo.time[0]} -{meetingInfo.time[1]}</div>)}
                    </div>
                </div>
            </Container>
            <div className='btn-container flex flex-col gap-y-4'>
                <LongBtn style={'primary-longBtn'} onClick={handleInviteBtnClick}>모임 초대하기</LongBtn>
                <LongBtn style={'secondary-longBtn'} onClick={()=>{router.push(`/invited?meetingId=${id}`)}}>일정 등록하기</LongBtn>
                <LongBtn style={'secondary-longBtn'} onClick={handleKakaoBtnClick}>카카오 로그인하고 알림 받기</LongBtn>
            </div>
        </div>
    )
}