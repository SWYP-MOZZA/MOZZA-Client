'use client'

import Container from '@/app/components/common/Container';
import LongBtn from '@/app/components/common/LongBtn';
import React from 'react';
import Router, { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { SERVER_BASE_URL } from '@/app/constants/BaseUrl';

export default function LoginPage(){
    
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=8728eb9b1a227742d8aef92354fbb090&redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_URL}/auth&response_type=code`
    
    const router = useRouter();
    const isLogin = useSelector((state)=>state.login.isLogin);

    
    async function logOut(){
        await axios.post(`${SERVER_BASE_URL}/logout`)
    }
    function handleKakaoBtnClicked(){
        router.push(`${KAKAO_AUTH_URL}`);
    }
    function handleLogoutBtn(){
        logOut();

    }
    return (
        <div className='container w-full h-full font-main flex flex-col justify-center items-center pt-[120px]'>
            {isLogin ? (<h1 className='title text-h1 font-bold w-[575px] text-center mb-[40px]'>반갑습니다!</h1>):(<h1 className='title text-h1 font-bold w-[575px] text-center mb-[40px]'>로그인하고<br/>여러분의 모임을<br/><mark className='bg-orange-200'>체계적</mark>으로 관리하세요!</h1>)}
            <div className='container-box flex flex-col gap-2'>
                <Container type={'container-gray'} style={'px-[32px] py-[16px]'}>
                    <div className='flex gap-6 text-body2 font-normal'>
                        <div>🔔</div>
                        <div>목표 인원이 채워지면 카카오톡 알림을 보내드려요</div>
                    </div>
                </Container>
                <Container type={'container-gray'} style={'px-[32px] py-[16px]'}>
                    <div className='flex gap-6 text-body2 font-normal'>
                        <div>✉️</div>
                        <div>확정된 일정을 카카오톡으로 쉽게 전달해요</div>
                    </div>
                </Container>
                <Container type={'container-gray'} style={'px-[32px] py-[16px]'}>
                    <div className='flex gap-6 text-body2 font-normal'>
                        <div>📅</div>
                        <div>머리 아플 걱정 없이 간편하게 일정을 확인해요</div>
                    </div>
                </Container>
                <Container type={'container-gray'} style={'px-[32px] py-[16px]'}>
                    <div className='flex gap-6 text-body2 font-normal'>
                        <div>🗳️</div>
                        <div>지난 일정이 저장되어 체계적인 관리가 가능해요</div>
                    </div>
                </Container>
            </div>
            <div className='mt-[64px] w-[588px] h-16 px-16 bg-yellow-400 rounded-[32px] flex justify-center items-center gap-8'>
                <img src='../svg/kakaoLogo.svg'></img>
                {isLogin ? (<div className='text-subtitle2 font-medium cursor-pointer' onClick={handleLogoutBtn}>로그아웃</div>):<div className='text-subtitle2 font-medium cursor-pointer' onClick={handleKakaoBtnClicked}>카카오로 로그인하기</div>}
                
            </div>
        </div>
    )
}