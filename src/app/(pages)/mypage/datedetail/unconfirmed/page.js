"use client";
import HoverBox from '@/app/components/result/hoverBox';
import React,{useState,useEffect,useMemo} from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ResultCalendar from '@/app/components/calendar/result-calender';
import UnconfirmedResultBox from '@/app/components/result/unconfirmed-resultBox';
import ConfirmedCompleteMessage from '@/app/components/popup/confirmed-completeMessage';
import ConfirmedMessage from '@/app/components/popup/confirmed-message';
const MypageDateUnconfirmedDetail = () => {
        const ResultCalendarMemo = useMemo(() => ResultCalendar, []);
      // 쿼리 파라미터
        const router = useRouter();
        const searchParams = useSearchParams()
        const meetingId = searchParams.get('meetingId');

        const [filteredResultData, setFilteredResultData] = useState([]);
        const [meetingInfo, setMeetingInfo] = useState({
            "numberOfSubmit" : 6,
            "data": {
              "2024-03-12": [
                {
                  "attendee": ["박지우", "최유정", "오승준"],
                  "ratio": 0.5
                }
              ],
              "2024-03-13": [
                {
                  "attendee": ["박지우", "최유정", "오승준"],
                  "ratio": 0.9
                }
              ],
              "2024-03-14": [
                {
                  "attendee": ["박지우", "최유정", "오승준","오승준","오승준","오승준"],
                  "ratio": 1.0
                }
              ]
            }
          });
        
          
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
            // dateSlots.data 객체에서 hoveredInfo.date에 해당하는 키로 직접 접근
            const formattedDate = hoveredInfo.date;
            const dayData = meetingInfo.data[formattedDate];
            if (!dayData) {
                return null;
            }
            // dayData에 날짜 정보를 추가하여 반환
            return {
                date: formattedDate, // 형식이 조정된 날짜
                data: dayData, // 해당 날짜의 데이터
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
            // meetingInfo.data를 기반으로 날짜 정보를 포함하는 새로운 배열 생성 및 정렬
            const sortDataByRatio = (meetingInfo) => {
                // meetingInfo.data의 각 항목에 대해 날짜 정보를 추가하고 하나의 배열로 결합
                const combinedData = Object.entries(meetingInfo.data).flatMap(([date, attendees]) => 
                    attendees.map(attendee => ({ 
                        date, 
                        ...attendee 
                    }))
                );
        
                // combinedData를 ratio에 따라 정렬
                const sortedData = combinedData.sort((a, b) => b.ratio - a.ratio);
        
                return sortedData;
            };
        
            // 정렬된 데이터를 filteredResultData 상태에 저장
            const filteredResultData = sortDataByRatio(meetingInfo);
            setFilteredResultData(filteredResultData);
            console.log('Sorted by ratio:', filteredResultData);
        }, [meetingInfo]); // meetingInfo가 변경될 때마다 정렬 로직 실행

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
            "meeting id" : meetingInfo.meetingId,
            "createdAt" : meetingInfo.createdAt,
            "numberOfSubmit" : meetingInfo.numberOfSubmit,
            "confirmedDate" : selectedSlot.date,
            "confirmedTime" : {"startTime" : selectedSlot.time , "endTime" :"10:00" },
            "confirmedAttendee" : selectedSlot.attendee
          }
          console.log('request:', requestData);
          // try {
          //   console.log(requestData);
          //   const reponse = axios.put(`${SERVER_BASE_URL}/meeting/${meetingId}/confirm`, {
          //     data: requestData,
          //     }, {
          //       headers: {
          //         Authorization: `Bearer ${localStorage.getItem('token')}`,
          //       },
          //     });
          //     console.log(reponse.data);
      
          //     onPopupConfirmedComplete();
      
          //     // 확정 후 새로고침
          //     window.location.reload();
          //   } catch (error) {
          //     console.error('error:', error.response ? error.response : error.message);
          //   }
            onPopupConfirmedComplete();
          }
      return (
        <div>
          { (isConfirmedPopup || isConfirmedPopupComplete) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        )}
          <div className='w-[3/4] m-[50px] flex justify-between'>
              <div>
                <ResultCalendarMemo onHoverChange={handleHoverChange} dateResult={meetingInfo}/>
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
