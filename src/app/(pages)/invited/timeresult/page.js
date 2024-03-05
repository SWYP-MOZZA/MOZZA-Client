"use client";
import React,{useState} from 'react';
import ResultBox from '@/app/components/result/result-time/confirmed-resultBox';
import HoverBox from '@/app/components/result/result-time/hoverBox';
import ResultTimeTable from '@/app/components/table/result-timetable';
import { usePathname, useRouter } from 'next/navigation';

const ResultPage = () => {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);
  const onClickFilterBtn = () => {
    console.log('필터 버튼 클릭');
    setIsHover(!isHover);
  }

  const onClickBackBtn = () => {
    console.log('이전 버튼 클릭');
    router.back();
  }

  const onClickRegisterBtn = () => {
    console.log('등록하기 버튼 클릭');
    router.push('/invited/register/timeregister');
  }
  return (
      <div className='m-[50px] w-[3/4] flex justify-between'>
          <div>
                <ResultTimeTable/>
            </div>
            <div className='flex flex-col gap-2.5 mt-[50px]'>
                {isHover && <HoverBox/>}
                <div className='flex justify-end'>
                    <button onClick={onClickFilterBtn} className="inline-flex px-6 py-2 justify-center items-center gap-2 rounded-full bg-gray-300">필터</button>
                </div>
                <ResultBox/>
                <ResultBox/>
                <ResultBox/>
                <ResultBox/>
            </div>
            <div className='fixed bottom-[24px] left-1/2 transform -translate-x-1/2 flex gap-2 font-main font-normal text-subtitle2'>
                <button className="flex w-[282px] h-[64px] px-16 justify-center items-center rounded-full bg-green-100"
                  onClick={onClickBackBtn}
                >이전</button>
                <button className="flex w-[282px] h-[64px] px-16 justify-center items-center rounded-full bg-green-600 text-white"
                  onClick={onClickRegisterBtn}
                >등록하기</button>
            </div>
          </div>
  );
};

export default ResultPage;
