"use client"
import { SERVER_BASE_URL } from '@/app/constants/BaseUrl';
import { setIsLogin ,setToken} from '@/app/redux/store';
import axios from 'axios';
import { useRouter,useSearchParams } from 'next/navigation';
import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';

export default function KakaoPage(){    
    const searchParams = useSearchParams()
    const AUTHORIZATION_CODE = searchParams.get('code');
    const dispatch = useDispatch();
 
    const router = useRouter();
    async function sendLoginInfo(){
        const res = await axios.get(`${SERVER_BASE_URL}/oauth?code=${AUTHORIZATION_CODE}`);

        console.log('응답확인',res.data);
        const userToken = res.data.accessToken;
        const userId = res.data.userId;
        const userName = res.data.userName;
        sessionStorage.setItem("userToken", userToken);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("userName", userName);

        if(userToken !==null || userToken !== undefined){
            dispatch(setIsLogin(true));
            dispatch(setToken(userToken));

            const prevLink = sessionStorage.getItem('currentLink');
            if(prevLink){
                router.push(prevLink);
            }else{
                router.push('/mypage');
            }
        }
    }
    const [hasBeenCalled, setHasBeenCalled] = useState(false);

useEffect(() => {
    if (!hasBeenCalled && AUTHORIZATION_CODE) {
        sendLoginInfo();
        setHasBeenCalled(true);
    }
}, [AUTHORIZATION_CODE]);
    return(
        // <Suspense fallback={<div>Loading...</div>}> 
            <div>로그인중입니다.</div>
        // </Suspense>
    )
}