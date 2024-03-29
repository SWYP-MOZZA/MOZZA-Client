"use client";
import React,{useState} from 'react';
import LongBtn from '@/app/components/common/LongBtn';
import { useSearchParams, useRouter } from 'next/navigation';
import { handleLoginFn } from '@/app/utils/apiFn';
import { useMeetingShortInfo } from '@/app/hooks/useMeetingShortInfo';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../../redux/store';

const Register = () => {
    const dispatch = useDispatch();
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
    const {meetingShortInfo,isOnlyDate, loading, error} = useMeetingShortInfo(meetingId);

    const onLogin = async (guestState) => {
        const { success, accessToken, error } = await handleLoginFn(guestState);
    
        if (success) {
            dispatch(setToken(accessToken));
            console.log('Login success:', accessToken);
            if (meetingShortInfo.startTime ==="00:00" && meetingShortInfo.endTime === "00:00") {
                router.push(`/invited/register/dateregister?meetingId=${meetingId}`);
            }
            else {
            // 로그인 성공 후 페이지 이동
            router.push(`/invited/register/timeregister?meetingId=${meetingId}`);
            }
            } else {
            // 오류 처리 로직, 예: 상태 업데이트를 통한 에러 메시지 표시
            console.error('Login failed:', error);
            }
        };

    //! 로그인 여부 확인 
    const isLogin = useSelector((state)=>state.login.isLogin);
    
    //! 카카오 로그인 페이지 이동 및 현재주소 저장  
    function handleKakaoBtnClick(){
        sessionStorage.setItem('currentLink',`${window.location.href}`);
        console.log(window.location.href);
        if(isLogin){
            alert('이미 로그인 된 사용자입니다');
        }else{
            router.push('/user/login')
        }
    }


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
            onClick={() => onLogin(guestState,meetingId)}>로그인</LongBtn>
        <hr className="w-full border-t border-gray-300 my-2 " /> {/* 가로선 */}
        <div className='flex flex-col justify-center items-center'>
            <span className="text-body1 font-bold">카카오로 로그인하고</span>
            <span className="text-body1 font-bold pb-[20px]">간편하고 쉽게 모임 일정을 관리해요!</span>
            <LongBtn style={'kakao-longBtn'} >
                <div className='flex justify-center items-center gap-x-2'onClick={handleKakaoBtnClick} >
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
