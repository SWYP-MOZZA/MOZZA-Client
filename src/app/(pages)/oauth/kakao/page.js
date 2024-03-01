'use client'
import { useSearchParams } from 'next/navigation';

export default function kakaoPage(){    
    const searchParams = useSearchParams()
    const AUTHORIZATION_CODE = searchParams.get('code');
    return(
        <div>{AUTHORIZATION_CODE} - 이 코드를 백엔드한테 보내주기 </div>
        
    )
}