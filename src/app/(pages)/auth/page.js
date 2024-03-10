'use client'
import { SERVER_BASE_URL } from '@/app/constants/BaseUrl';
import { setIsLogin } from '@/app/redux/store';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function kakaoPage(){    
    const searchParams = useSearchParams()
    const AUTHORIZATION_CODE = searchParams.get('code');
    const clientId = '8728eb9b1a227742d8aef92354fbb090';
    const redirectUri= 'http://localhost:3000/auth'
 
    async function sendLoginInfo(){
        const dispatch = useDispatch();
        const res = await axios.get(`${SERVER_BASE_URL}oauth?code=${AUTHORIZATION_CODE}`);

        console.log('응답확인',res.data);
        const userToken = res.data.accessToken;
        const userId = res.data.userId;
        const userName = res.data.userName;
        sessionStorage.setItem("userToken", userToken);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("userName", userName);

        if(userToken){
            dispatch(setIsLogin(true));
        }
        

    }

    useEffect(() => {
        
        sendLoginInfo();
        
    }, []);
    return(
        <div>로그인 완료!</div>
        
    )
}