'use client'
import Container from '@/app/components/common/Container';
import LongBtn from '@/app/components/common/LongBtn';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_BASE_URL } from '@/app/constants/BaseUrl';

export default function UserInfoPage(){
    const [userId, setUserId] = useState('');
    const [userName, setUserName]= useState('');
    const [userEmail, setUserEmail]= useState('');
    async function getUserInfo(){
        const userId = sessionStorage.getItem('userId');
        if(userId){
            setUserId('userId');
            console.log(userId);
        }
        const res = await axios.get(`${SERVER_BASE_URL}/user/${userId}`);
        console.log(res.data);
        setUserName(res.data.name);
        setUserEmail(res.data.email);
    }

    useEffect(()=>{
        getUserInfo();
    },[])
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
                        <div>{userName}</div>
                        <div>{userEmail}</div>
                    </div>
                </div>
            </Container>
            <LongBtn style={'primary-longBtn'}>로그아웃</LongBtn>
        </div>
    )
}