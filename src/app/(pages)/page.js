'use client';

import { useContext, useEffect, useState, Suspense } from 'react';
import Container from '../components/common/Container';
import LongBtn from '../components/common/LongBtn';
import CheckNumCircle from '../components/mainPage/CheckNumCircle';
import { useRouter } from 'next/navigation';
import '../styles/custom-checkbox-style.css';
import TimeSelector from '../components/mainPage/TimeSelector';
import axios from 'axios';
import { SERVER_BASE_URL } from '../constants/BaseUrl';
import MainCalendar from '../components/calendar/MainCalendar';
import { useSelector } from 'react-redux';

export default function Home() {
    const router = useRouter();
    const [isCheck, setIsCheck] = useState([false, false, false]);
    const [isOnClick, setIsOnClick] = useState(false);
    const [meetingName, setMeetingName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isOnlyDate, setIsOnlyDate] = useState(false);

    const isLogin = useSelector((state) => state.login.isLogin);

    function handleInputChange(input) {
        console.log(input.target.value);
        const inputVal = input.target.value;
        if (inputVal !== '') {
            const newArr = [...isCheck];
            newArr[0] = true;
            setIsCheck(newArr);
            setMeetingName(inputVal);
        } else {
            const newArr = [...isCheck];
            newArr[0] = false;
            setIsCheck(newArr);
            setMeetingName(inputVal);
        }
    }
    useEffect(() => {
        if (startTime !== '' && startTime !== endTime && isOnlyDate == false) {
            const newArr = [...isCheck];
            newArr[2] = true;
            setIsCheck(newArr);
        } else if (startTime == endTime) {
            if (isOnlyDate) {
                const newArr = [...isCheck];
                newArr[2] = true;
                setIsCheck(newArr);
                return;
            }
            const newArr = [...isCheck];
            newArr[2] = false;
            setIsCheck(newArr);
        }
    }, [startTime, endTime, isOnlyDate]);
    //날짜만 선택 체크박스 클릭시 3->초록색 체크로 변경
    // useEffect(() => {
    //     const newArr = [...isCheck];
    //     newArr[2] = isOnlyDate;
    //     setIsCheck(newArr);
    // }, [isOnlyDate]);

    const postMeetingInfo = async (data) => {
        let res = '';
        //!로그인 여부 확인
        if (isLogin) {
            // 세션 스토리지에서 사용자 토큰 가져오기
            const userToken = sessionStorage.getItem('userToken');
            // 헤더에 토큰 추가
            const config = {
                headers: {
                    Authorization: `${userToken}`,
                },
            };

            res = await axios.post(`${SERVER_BASE_URL}/meeting/create`, data, config);
        } else {
            res = await axios.post(`${SERVER_BASE_URL}/meeting/create`, data);
        }
        const meetingId = res.data.meetingId;
        router.push(`/new?meetingId=${meetingId}`);
        sessionStorage.setItem('meetingId', meetingId);
    };
    const [dateSlots, setDateSlots] = useState({});

    useEffect(() => {
        console.log('dateSlots:', dateSlots);
        if (dateSlots.length !== 0) {
            const newArr = [...isCheck];
            newArr[1] = true;
            setIsCheck(newArr);
        } else if (dateSlots.length === 0) {
            const newArr = [...isCheck];
            newArr[1] = false;
            setIsCheck(newArr);
        }
    }, [dateSlots]);

    function handleButtonClicked() {
        // const submitData={
        //     name:meetingName,
        //     date:dateSlots,
        //     startTime:startTime,
        //     endTime:endTime,
        //     onlyDate:isOnlyDate,
        // }
        const submitData = {
            name: meetingName,
            date: dateSlots,
            startTime: startTime,
            endTime: endTime,
            onlyDate: isOnlyDate,
        };

        console.log(submitData);

        postMeetingInfo(submitData);
    }

    function handleCheckbox(e) {
        setIsOnlyDate(e.target.checked);
    }

    return (
        <div className="container w-full h-full font-main flex flex-col justify-center items-center pt-[80px] gap-y-6 pb-[80px] sm:w-screen sm:gap-y-4 sm:pt-[40px] sm:pb-[40px]">
            <img src="svg/logoFull.svg" className="logo md:w-[200px] md:h-[88.24px] sm:w-[100px]" />
            <h1 className="title text-h1 font-bold md:w-[575px] text-center sm:w-[287px] sm:text-[16px]">
                단 <mark className="bg-orange-200">3단계</mark>로 모임 일정을
                <br />
                빠르게 정해보세요!
            </h1>

            <Container
                type={'container-gray'}
                style={'md:h-[160px] md:p-[24px] sm:p-[12px] flex justify-start items-start'}
            >
                <div className="subtitle-container flex gap-[16px]">
                    <CheckNumCircle isCheck={isCheck} num={1} />
                    <div className="md:text-subtitle2 font-medium text-black sm:text-sm_subtitle2">
                        모임명을 입력해주세요.
                    </div>
                </div>
                <div className="content-container md:pl-[54px] md:pt-[16px] sm:pl-0 sm:pt-2">
                    <input
                        className="input-name md:w-[448px] md:p-[16px] sm:p-[8px] sm:w-[224px]"
                        placeholder="예)모짜모임"
                        onChange={(e) => {
                            handleInputChange(e);
                        }}
                    ></input>
                </div>
            </Container>
            <Container type={'container-gray'} style={'p-4 flex flex-col'}>
                <div className="subtitle-container flex gap-[16px] flex-row">
                    <CheckNumCircle isCheck={isCheck} num={2} />
                    <div className="text_container flex flex-col ">
                        <div className="md:text-subtitle2 md:font-medium text-black sm:text-sm_subtitle2">
                            날짜를 선택해주세요
                        </div>
                        <div className="md:text-body3 font-normal text-black sm:text-sm_body3">
                            모임 가능한 날짜를 클릭이나 드래그로 선택해주세요
                        </div>
                    </div>
                </div>
                <MainCalendar dateSlot={dateSlots} setDateSlots={setDateSlots} />
            </Container>
            <Container type={'container-gray'} style={' p-4 z-10'}>
                <div className="subtitle-container flex gap-[16px]">
                    <CheckNumCircle isCheck={isCheck} num={3} />
                    <div className="text_container flex flex-col ">
                        <div className="md:text-subtitle2 font-medium text-black sm:text-sm_subtitle2">
                            시간을 선택해주세요
                        </div>
                        <div className="md:text-body3 font-normal text-black sm:text-sm_body3">
                            선택한 시간대에서 모임 시간을 정할 수 있어요.
                        </div>
                    </div>
                </div>
                <div className="content-container flex flex-col justify-center md:mx-[62px] sm:mx-[31px] md:my-8 sm:my-4 md:gap-y-6 sm:gap-y-3">
                    <div className="flex items-end md:w-[402px] sm:w-[200px] sm:gap-2 justify-start md:gap-3 md:text-body3 sm:text-sm_body3">
                        <TimeSelector reset={isOnClick} setter={setStartTime} />
                        <div>부터</div>
                        <TimeSelector reset={isOnClick} setter={setEndTime} />
                        <div>까지</div>
                    </div>
                    <div className="checkbox-container flex justify-start items-center">
                        <input type="checkbox" id="onlyDate" className="check mr-3" onChange={handleCheckbox} />
                        <label className="md:text-body2 sm:text-sm_body2 font-normal cursor-pointer" htmlFor="onlyDate">
                            날짜만 정하면 돼요!
                        </label>
                    </div>
                    <div
                        className="md:text-body2 text-center cursor-pointer underline underline-offset-4 sm:text-sm_body2"
                        onClick={() => setIsOnClick(!isOnClick)}
                    >
                        초기화
                    </div>
                </div>
            </Container>
            <LongBtn style={'primary-longBtn'} onClick={handleButtonClicked}>
                모임만들기
            </LongBtn>
        </div>
    );
}
