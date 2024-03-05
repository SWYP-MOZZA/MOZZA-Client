import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일

const ResultCalendar = ({ participantsData, totalParticipants }) => {
  // 이 예시에서는 사용하지 않지만, 서버 데이터를 상태로 관리하고 useEffect 내에서 업데이트할 수 있습니다.
  const [data, setData] = useState(serverData);
  
  // 타일의 클래스 이름을 결정하는 함수
  const tileClassName = ({ date, view }) => {
    if (view === 'month') { // 월 뷰일 때만 스타일 적용
      const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
      const availableCount = data[dayKey];
      const totalParticipants = 10; // 총 참가자 수
      const percentage = availableCount ? (availableCount / totalParticipants) * 100 : 0;

      // 퍼센테이지에 따라 다른 배경색 클래스 반환
      if (percentage === 100) return 'bg-green-100';
      else if (percentage > 80) return 'bg-green-700';
      else if (percentage > 60) return 'bg-green-500';
      else if (percentage > 40) return 'bg-green-300';
      else if (percentage > 20) return 'bg-green-100';
      else return 'bg-white';
    }
  };

  return (
    <div>
      <Calendar
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default ResultCalendar;
