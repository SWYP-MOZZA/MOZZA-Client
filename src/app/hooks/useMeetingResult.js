import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_BASE_URL } from '../constants/BaseUrl';


const useFetchMeetingData = (token,meetingId) => {
  const [meetingInfo, setMeetingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const response = await axios.get(`${SERVER_BASE_URL}/meeting/${meetingId}/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMeetingInfo(response.data.Data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meeting data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchMeetingData();
  }, [meetingId]);

  return { meetingInfo, loading, error };
};
