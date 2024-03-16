import axios from 'axios';
import { SERVER_BASE_URL } from '../constants/BaseUrl';

// sendRequest 함수는 요청의 성공 여부와 데이터(또는 오류)를 반환합니다.
// /meeting/${meetingId}/submit
export const sendRequest = async (token, meetingId, data) => {
    try {
      const response = await axios.post(`${SERVER_BASE_URL}/meeting/${meetingId}/submit`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Request sent successfully', response.data);
      // 성공 시, 응답 데이터를 반환합니다.
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error sending request:', error);
      // 실패 시, 오류를 반환합니다.
      return { success: false, error: error };
    }
};


// API 호출용 유틸리티 함수 수정
// ${SERVER_BASE_URL}/guest
export const handleLoginFn = async (guestState) => {
  try {
    const response = await axios.post(`${SERVER_BASE_URL}/guest`, guestState);
    const accessToken = response.data.AccessToken;
    console.log(accessToken); // 응답 로그 출력
    // 로그인 성공 정보와 accessToken 반환
    return { success: true, accessToken, guestState };
  } catch (error) {
    console.error('Login error:', error.response || error.message);
    return { success: false, error: error };
  }
};