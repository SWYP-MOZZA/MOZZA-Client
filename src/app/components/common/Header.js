'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
export default function Header(){
    // const [isLogin, setIsLogin] = useState(false);
    const [name,setName] = useState('');

    const isLogin = useSelector((state)=>state.login.isLogin);
    useEffect(()=>{
        const userToken = sessionStorage.getItem('userToken');
        const userName = sessionStorage.getItem('userName');
        if(userToken){
            setName(userName);
        }

    })
    return (
        <div className='navbar flex justify-between items-center fixed w-full h-[80px] top-0 left-0 shadow-sm px-[22.5rem] bg-white font-main text-subtitle3 z-50'>
            <Link href='/' className='navbar_logo'>
                <img src='/svg/smallLogo.svg' alt='이미지_설명' />
            </Link>
            <div className='navbar_list flex gap-32 items-center'>
                <Link href='/' className='navbar_list-item'>새 모임 만들기</Link>
                <Link href='/mypage' className='navbar_list-item'>내 모임</Link>
            </div>
            <div className='login w-[210px] h-12 px-8 bg-green-100 rounded-3xl justify-center items-center gap-2.5 inline-flex'>
                <Link href='/user/login' className='navbar_list-item'>{isLogin ?  `${name}님`:`로그인/회원가입` }</Link>
            </div>
        </div>
        
    );
}