'use client'
import Container from '@/app/components/common/Container';
import LongBtn from '@/app/components/common/LongBtn';

export default function ExpirationPage(){
    return(
        <div className='container w-full h-full font-main flex flex-col justify-center items-center pt-[154px]'>
            <Container type={'container-gray'} style={'px-[80px] py-[40px] flex flex-col justify-center items-center my-[60px]'}>
                <div className='flex flex-col justify-center items-center gap-y-[40px]'>
                    <img src='../svg/sadEmoji.svg' className='w-[160px] h-[160px]'/>
                    <div className='text-subtitle1 font-medium'>링크가 만료되었어요</div>
                    <div className='text-body2 font-normal'>새로운 모임을 만들어보세요!</div>
                </div>
            </Container>
            <LongBtn style={'primary-longBtn'}>모임 만들기</LongBtn>
        </div>
    )
}