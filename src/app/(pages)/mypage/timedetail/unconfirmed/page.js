"use client";
import ConfirmedBox from '@/app/components/result/result-time/confirmedmeetingBox';
import HoverBox from '@/app/components/result/result-time/hoverBox';
import UnconfirmedResultBox from '@/app/components/result/result-time/unconfirmed-resultBox';
import ResultTimeTable from '@/app/components/table/result-timetable';
import React,{useState} from 'react';

const MypageConfirmedDetail = () => {
  const [isHover, setIsHover] = useState(false);

  const onClickFilterBtn = () => {
    console.log('필터 버튼 클릭');
    setIsHover(!isHover);
  }
  return (
    <div>
      <div className='w-[3/4] m-[50px] flex justify-between'>
          <div>
                <ResultTimeTable/>
            </div>
            <div className='flex flex-col gap-2.5 mt-[50px]'>
                {isHover && <HoverBox/>}
                <div className='flex justify-end'>
                    <button onClick={onClickFilterBtn} className="inline-flex px-6 py-2 justify-center items-center gap-2 rounded-full bg-gray-300">필터</button>
                </div>
                <UnconfirmedResultBox/>
                <UnconfirmedResultBox/>
                <UnconfirmedResultBox/>
                <UnconfirmedResultBox/>
            </div>
          </div>
    </div>
  );
};

export default MypageConfirmedDetail;
