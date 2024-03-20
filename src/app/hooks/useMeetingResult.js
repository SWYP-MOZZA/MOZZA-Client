import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_BASE_URL } from '../constants/BaseUrl';

export const useFetchMeetingData = (meetingId) => {
  const [meetingInfo, setMeetingInfo] = useState(null);
  const [sortedMeetingInfo, setSortedMeetingInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const response = await axios.get(`${SERVER_BASE_URL}/meeting/${meetingId}/details`);
        console.log('모임 정보:', response.data);
        
        // 상태 업데이트를 비동기적으로 받아온 데이터로 진행
        setMeetingInfo(response.data);
        
        // 데이터를 성공적으로 불러온 후에 데이터 정렬 함수 호출
        const sortedData = sortDataByRatio(response.data.data); // 변경된 부분
        setSortedMeetingInfo(sortedData); // 정렬된 데이터 상태 업데이트
        console.log('filteredResultData:', sortedData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meeting data:', error);
        setError(error);
        setLoading(false);
      }
    };

    // 데이터 정렬 함수
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
  
    fetchMeetingData();
    console.log('meetingId:', meetingId);
    console.log('meetingInfo:', meetingInfo);
    console.log('sortedMeetingInfo:', sortedMeetingInfo);
  }, [meetingId]);

  // 원본 데이터, 정렬된 데이터, 로딩 상태, 에러 상태를 리턴
  return { meetingInfo, sortedMeetingInfo, loading, error };
};
