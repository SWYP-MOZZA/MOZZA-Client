import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_BASE_URL } from '../constants/BaseUrl';
// // SERVER_BASE_URL과 token은 실제 사용하는 값으로 대체해야 합니다.
// const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6InNwcmluZzEiLCJpYXQiOjE3MTA1MjQ5ODksImV4cCI6MTcxMDUyNTU4OX0.0DmojLBQMtQskgqKIo0M9eYX4JtJifEvI5hbLKE-krZk2CcOviHim4aBhvsSg6TLd-RCGgvpZnTnuHzVLsuleg'

export const useMeetingInfonData = (token,meetingId) => {
    const [meetingInfo, setMeetingInfo] = useState(null);
    const [meetingData, setMeetingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      //일정 등록에 필요한 정보
      const bringMeetingData = async () => {
        try {
          const response = await axios.get(`${SERVER_BASE_URL}/meeting/${meetingId}/choice`);
          setMeetingData(response.data.Data); // 결과를 직접 상태에 설정
        } catch (error) {
          console.error('Error fetching meeting choice data:', error);
          setError(error);
        }
      };
      //일정 결과에 필요한 정보
      const bringMeetingInfo = async () => {
        try {
          const response = await axios.get(`${SERVER_BASE_URL}/meeting/${meetingId}/details`,
          {
            headers: {
              Authorization: `${token}`,
            },
          });
          setMeetingInfo(response.data.Data);
        } catch (error) {
          console.error('Error fetching meeting details data:', error);
          setError(error);
        }
      };
  
      const fetchData = async () => {
        setLoading(true);
        await Promise.all([bringMeetingInfo(), bringMeetingData()]);
        setLoading(false);
      };
  
      fetchData();
      console.log('meetingInfo:', meetingInfo);
    }, [meetingId]);
  
    return { meetingInfo, meetingData, loading, error };
  };
  