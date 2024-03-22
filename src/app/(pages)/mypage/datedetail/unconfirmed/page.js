"use client";
import HoverBox from '@/app/components/result/hoverBox';
import React,{useState,useEffect} from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ResultCalendar from '@/app/components/calendar/result-calender';
import UnconfirmedResultBox from '@/app/components/result/unconfirmed-resultBox';
import ConfirmedCompleteMessage from '@/app/components/popup/confirmed-completeMessage';
import ConfirmedMessage from '@/app/components/popup/confirmed-message';
import axios from 'axios';
import { SERVER_BASE_URL } from '@/app/constants/BaseUrl';
import { useSelector } from 'react-redux';

const MypageDateUnconfirmedDetail = () => {
      // 쿼리 파라미터
        const router = useRouter();
        const searchParams = useSearchParams()
        const meetingId = searchParams.get('meetingId');
        const token = useSelector((state) => state.token.token);

        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [filteredResultData, setFilteredResultData] = useState([]);
        const [meetingInfo, setMeetingInfo] = useState(null);
          
        // 호버한 쎌 데이터
        const [hoveredInfo, setHoveredInfo] = useState({
            date:null
        });
         // 날짜와 시간대 정보를 처리할 함수
        const handleHoverChange = (date) => {
            setHoveredInfo({ date });
            console.log(date);
        };
         // hoveredInfo를 기반으로 해당하는 데이터 찾기
         const findDataForHoveredInfo = () => {
          if (!hoveredInfo || !hoveredInfo.date) {
              return null;
          }
          const formattedDate = hoveredInfo.date;
      
          // meetingInfo.data[0]를 통해 첫 번째 (그리고 유일한) 객체에 접근하고,
          // 해당 객체에서 formattedDate 키를 사용하여 데이터에 접근합니다.
          const dayDataArray = meetingInfo.data[0][formattedDate];
          if (!dayDataArray) {
              return null;
          }
      
          // 찾은 데이터와 날짜를 포함하는 객체를 반환합니다.
          return {
              date: formattedDate,
              data: dayDataArray,
          };
      };
        // hoveredInfo를 기반으로 해당하는 데이터 찾기
        const slotData = findDataForHoveredInfo();

        useEffect(() => {
            console.log('slotData : ', slotData);
            console.log('hoveredInfo.date : ', hoveredInfo.date);
        }
        ,[slotData,hoveredInfo.date]);

        useEffect(() => {
          const fetchMeetingInfo = async () => {
            try {
              const response = await axios.get(`${SERVER_BASE_URL}/meeting/${meetingId}/details`);
              console.log('모임 정보:', response.data);
              
              // 상태 업데이트를 비동기적으로 받아온 데이터로 진행
              setMeetingInfo(response.data);
              setLoading(false);
        
              // 데이터를 성공적으로 불러온 후에 데이터 정렬 함수 호출
              const sortedData = sortDataByRatio(response.data.data); // 변경된 부분
              setFilteredResultData(sortedData); // 상태 업데이트
              console.log('Sorted by ratio:', sortedData);
            } catch (error) {
              console.error('Error fetching meeting data:', error);
              setError(error);
              setLoading(false);
            }
          };
        
          // sortDataByRatio 함수 수정
          // 이 함수가 이제 인자로 데이터를 받도록 함
          const sortDataByRatio = (data) => {
            const allData = data.flatMap(item => {
              const date = Object.keys(item)[0];
              return item[date].map(entry => ({
                date,
                ...entry,
                ratio: parseFloat(entry.ratio)
              }));
            });
        
            const sortedData = allData.sort((a, b) => {
              if (isNaN(a.ratio)) return 1;
              if (isNaN(b.ratio)) return -1;
              return b.ratio - a.ratio;
            });
        
            return sortedData;
          };
        
          fetchMeetingInfo();
        }, [meetingId]);

        const onClickFilterBtn = () => {
            console.log('필터 버튼 클릭');
          }
          const onClickConfirmedBtn = () => {
            setIsConfirmedPopup(true);
            console.log('확정된 모임 버튼 클릭');
          }
     
        //확정할 약속 데이터  
        const [selectedSlot, setSelectedSlot] = useState(null);
        const handleSlotCheck = (slotData) => {
            // 이미 선택된 항목을 다시 클릭하면 선택 해제
            if (selectedSlot && selectedSlot.date === slotData.date && selectedSlot.time === slotData.time) {
            setSelectedSlot(null);
            } else {
            // 새 항목을 선택
            setSelectedSlot(slotData);
            console.log(slotData);
            }
        };

        //확정을 위한 상태 및 함수
        const [isConfirmedPopup, setIsConfirmedPopup] = useState(false);
        const [isConfirmedPopupComplete, setIsConfirmedPopupComplete] = useState(false);
        const onClickConfirmedDeleteBtn = () => {
          setIsConfirmedPopup(false);
          console.log('확정된 모임 안함 버튼 클릭');
        }
      
        const onPopupConfirmedComplete = () => {
          setIsConfirmedPopup(false);
          setIsConfirmedPopupComplete(true);
          console.log('확정된 모임 완료 버튼 클릭');
        }

        const onClickConfirmedGoBtn = (meetingId) => {
          const requestData = {
            "confirmedStartDate" : selectedSlot.date,
            "confirmedDate" : selectedSlot.date,
          }
          console.log('request:', requestData);
          try {
            console.log(requestData);
            const reponse = axios.put(`${SERVER_BASE_URL}/meeting/${meetingId}/date/confirm`, requestData,
              {
                headers: {
                  Authorization: token,
                },
              });
              console.log(reponse.data);
      
              onPopupConfirmedComplete();
      
              // 확정 후 새로고침
              window.location.reload();
            } catch (error) {
              console.error('error:', error.response ? error.response : error.message);
            }
            onPopupConfirmedComplete();
          }

          // 데이터 로딩 중일 때 로딩 인디케이터를 보여줍니다.
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error loading meeting data: {error}</div>;
          if (!meetingInfo) return <div>Meeting information is not available.</div>; // 데이터가 없을 경우를 처리
      return (        <div>
          { (isConfirmedPopup || isConfirmedPopupComplete) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        )}
          <div className='w-[3/4] m-[50px] flex justify-between'>
              <div>
                <ResultCalendar onHoverChange={handleHoverChange} dateResult={meetingInfo}/>
                </div>
                <div className='flex flex-col gap-2.5 mt-[50px]'>
                    {hoveredInfo.date && slotData && <HoverBox date={hoveredInfo.date} slotData={slotData} />}
                    <div className='flex justify-end'>
                            <button onClick={onClickFilterBtn} className="inline-flex px-6 py-2 justify-center items-center gap-2 rounded-full bg-gray-300">필터</button>
                        </div>
                        {
                        filteredResultData.map((slot, index) => (
                        <UnconfirmedResultBox 
                            key={index} 
                            slotData={slot}
                            onSlotCheck={handleSlotCheck}
                            selectedSlot={selectedSlot}
                       />
                        ))
                    }
                    </div>
                <div className='fixed bottom-[24px] left-1/2 transform -translate-x-1/2 flex gap-2 font-main font-normal text-subtitle2'>
                    <button className="flex w-[588px] h-[64px] px-16 justify-center items-center rounded-full bg-green-100"
                      onClick={()=> {router.back();}}>이전</button>
                </div>
                <div className='fixed bottom-[24px] left-1/2 transform -translate-x-1/2 flex gap-2 font-main font-normal text-subtitle2'>
                <button className="flex w-[588px] h-[64px] px-16 justify-center items-center rounded-full bg-green-600 text-white"
                  onClick={()=>onClickConfirmedBtn(meetingInfo.meetingId)}
                >확정하기</button>
                
            </div>
              </div>
              {isConfirmedPopup === true && <ConfirmedMessage selectedSlot={selectedSlot} onClickConfirmedDeleteBtn={onClickConfirmedDeleteBtn} onClickConfirmedGoBtn={onClickConfirmedGoBtn}/>}
          {isConfirmedPopupComplete === true && <ConfirmedCompleteMessage setIsConfirmedPopupComplete={setIsConfirmedPopupComplete}/>}
        </div>
              );
    };
    
    
export default MypageDateUnconfirmedDetail;
