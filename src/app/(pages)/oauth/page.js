'use client'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React,{ Suspense,useEffect } from 'react';

export default function KakaoPage(){    
    const searchParams = useSearchParams()
    const AUTHORIZATION_CODE = searchParams.get('code');
    const clientId = '8728eb9b1a227742d8aef92354fbb090';
    const redirectUri= 'http://localhost:3000/auth'
     
    async function sendLoginInfo(){
        await axios.get('/oauth',{
            client_id: clientId,
            redirect_uri : redirectUri
        });
    }

    useEffect(()=>{
        sendLoginInfo();
    },[])
    return(
        <Suspense fallback={<div>Loading...</div>}> 

            <div>{AUTHORIZATION_CODE} - 이 코드를 백엔드한테 보내주기 </div>
        </Suspense>
        
    )
}