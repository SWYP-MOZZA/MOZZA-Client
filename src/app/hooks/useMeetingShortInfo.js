import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_BASE_URL } from '../constants/BaseUrl';

export const useMeetingShortInfo = (meetingId) => {
    const [meetingShortInfo, setMeetingShortInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const bringMeetingInfo = async () => {
            try {
                // 서버로부터 모임 정보를 가져옴
                const response = await axios.get(`${SERVER_BASE_URL}/meeting/${meetingId}/short`);
                setMeetingShortInfo(response.data.Data);
                setLoading(false);
                console.log('모임 정보:', response.data);
            } catch (error) {
                console.error('error:', error.response ? error.response : error.message);
                setError(error.response ? error.response : error.message);
                setLoading(false);
            }
        };

        bringMeetingInfo();
    }, [meetingId]); // meetingId가 변경될 때마다 훅을 다시 실행

    return { meetingShortInfo, loading, error };
};
