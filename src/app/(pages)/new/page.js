'use client'
import Container from '@/app/components/common/Container';
import LongBtn from '@/app/components/common/LongBtn';
import { usePathname, useRouter } from 'next/navigation';

export default function NewPage(){
    const router = useRouter();
    const pathname = usePathname()
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
        copyToClipboard(pathname);
        alert('초대 링크가 복사되었습니다.',pathname);
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
                        <div>모임 시간대</div>
                    </div>
                    <div className='content flex flex-col  text-subtitle2 font-medium gap-y-6'>
                        <div>3월 면접 스터디</div>
                        <div>2024.03.07~2024.03.14</div>
                        <div>14:00 - 20:00</div>
                    </div>
                </div>
            </Container>
            <div className='btn-container flex flex-col gap-y-4'>
                <LongBtn style={'primary-longBtn'} onClick={handleInviteBtnClick}>모임 초대하기</LongBtn>
                <LongBtn style={'secondary-longBtn'} onClick={()=>{router.push('/invited')}}>일정 등록하기</LongBtn>
                <LongBtn style={'secondary-longBtn'}>카카오 로그인하고 알림 받기</LongBtn>
            </div>
        </div>
    )
}