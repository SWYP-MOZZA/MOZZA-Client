import axios from 'axios';

export const fetchMeetingData = async ({ queryKey }) => {
  // queryKey 배열에서 meetingId 추출
  const [, meetingId] = queryKey;
  
  // 로컬 스토리지에서 토큰 가져오기
  const token = localStorage.getItem('token');

  // axios 요청에 Authorization 헤더 추가
  const { data } = await axios.get(`${SERVER_BASE_URL}/meetings/${meetingId}/details`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
