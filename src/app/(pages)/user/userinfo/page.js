import Container from '@/app/components/common/Container';
import LongBtn from '@/app/components/common/LongBtn';

export default function userInfoPage(){
    return(
        <div className='container w-full h-full font-main flex flex-col justify-center items-center pt-[80px]'>
            <h1 className='text-subtitle1 font-medium mb-8'>회원정보</h1>
            <Container type={'container-gray'} style={'p-[40px] gap-y-[24px] my-[32px]'}>
                <div className='container flex gap-6'>
                    <div className='category-name flex flex-col justify-start text-body1 font-normal w-[140px] gap-y-6'>
                        <div>회원명</div>
                        <div>이메일</div>
                    </div>
                    <div className='content flex flex-col  text-subtitle2 font-medium gap-y-6'>
                        <div>박지우</div>
                        <div>dlfnadkf@kakao.com</div>
                    </div>
                </div>
            </Container>
            <LongBtn style={'primary-longBtn'}>로그아웃</LongBtn>
        </div>
    )
}