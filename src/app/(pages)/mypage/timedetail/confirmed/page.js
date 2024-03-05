"use client";
import ConfirmedBox from '@/app/components/result/result-time/confirmedmeetingBox';
import HoverBox from '@/app/components/result/result-time/hoverBox';
import ResultBox from '@/app/components/result/result-time/confirmed-resultBox';
import ResultTimeTable from '@/app/components/table/result-timetable';
import React,{useState} from 'react';
import { usePathname, useRouter } from 'next/navigation';

const MypageConfirmedDetail = () => {
  const router = useRouter();

  const [isHover, setIsHover] = useState(false);

  const onClickFilterBtn = () => {
    console.log('필터 버튼 클릭');
    setIsHover(!isHover);
  }
  return (
    <div>
      <div className='flex items-center justify-center m-[50px]'>
        <ConfirmedBox />
      </div>
      <div className='w-[3/4] flex justify-between'>
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
                <button className="flex w-[588px] h-[64px] px-16 justify-center items-center rounded-full bg-green-100"
                  onClick={()=> {router.back();}}>이전</button>
            </div>
          </div>
    </div>
  );
};

export default MypageConfirmedDetail;
