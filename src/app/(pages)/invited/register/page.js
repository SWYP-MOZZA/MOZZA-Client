"use client";
import React,{useState} from 'react';
import LongBtn from '@/app/components/common/LongBtn';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

const Register = () => {
    const router = useRouter();
    const params = useSearchParams();
    const meetingId = params.get('meetingId');

    const [guestState, setGuestState] = useState({
        name: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGuestState(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(guestState);
    };

    const handleLogin = async (meetingId) => {
        try {
            // 서버로 guestState 객체를 POST 방식으로 전송
            const response = await axios.post(`${SERVER_BASE_URL}/guest`, guestState);

            // 응답에서 accessToken 추출
            const { accessToken } = response.data;

            // accessToken을 로컬 스토리지에 저장
            localStorage.setItem('accessToken', accessToken);
            console.log(response.data); // 응답 로그 출력
            
            // guestState를 localStorage에 저장
            localStorage.setItem('guestState', JSON.stringify(guestState));
            // 페이지 이동
            router.push(`/invited/register/timeregister?meetingId=${meetingId}`);
        } catch (error) {
            // 오류 처리
            console.error('Login error:', error.response || error.message);
        }
        r
    };

return (
    <div className='container w-full h-full font-main flex flex-col justify-center items-center pt-[80px] pb-[180px] gap-y-6'>
        <div className="w-full pt-[20px] flex flex-col items-center">
            <span className="text-h1 font-bold">이름을 입력해주세요</span>
            <span className="text-subtitle3 font-normal">이전에 등록한 일정도 수정할 수 있어요 !</span>
        </div>
        <div className={'w-[588px] bg-gray-100 rounded-3xl font-main font-normal p-[24px] flex flex-col justify-center text-subtitle3'}>
            <div className="w-full pt-[20px] flex items-center">
                <span className='flex-none w-[120px]'>
                    <span className="font-bold">이름</span><span>(필수)</span>
                </span>
                <input className='flex-grow p-[8px] ml-[10px]'
                    placeholder='이름을 입력해주세요'
                    name="name"
                    value={guestState.name}
                    onChange={handleChange} />
            </div>
            <div className="w-full pt-[20px] flex items-center">
                <span className='flex-none w-[120px] '>
                    <span className="font-bold">비밀번호</span><span>(선택)</span>
                </span>
                <input className='flex-grow p-[8px] ml-[10px]'
                    placeholder='비밀번호를 입력해주세요'
                    type="password" // Add this line to hide the password input
                    name="password"
                    value={guestState.password}
                    onChange={handleChange} />
            </div>
        </div>
        <LongBtn style={'primary-longBtn'}
            onClick={() => handleLogin(meetingId)}>로그인</LongBtn>
        <hr className="w-full border-t border-gray-300 my-2 " /> {/* 가로선 */}
        <div className='flex flex-col justify-center items-center'>
            <span className="text-body1 font-bold">카카오로 로그인하고</span>
            <span className="text-body1 font-bold pb-[20px]">간편하고 쉽게 모임 일정을 관리해요!</span>
            <LongBtn style={'kakao-longBtn'} >
                <div className='flex justify-center items-center gap-x-2'>
                    <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.5001 0.933594C6.76763 0.933594 0.5 5.77599 0.5 11.7483C0.5 15.4626 2.92419 18.7369 6.61573 20.6845L5.06251 26.3585C4.92528 26.8598 5.49866 27.2594 5.93897 26.9689L12.7475 22.4753C13.322 22.5308 13.9059 22.5631 14.5001 22.5631C22.2319 22.5631 28.5 17.7209 28.5 11.7483C28.5 5.77599 22.2319 0.933594 14.5001 0.933594Z" fill="#070707" />
                    </svg>
                    카카오로 로그인하기
                </div>
            </LongBtn>
        </div>
    </div>
);
};

export default Register;
