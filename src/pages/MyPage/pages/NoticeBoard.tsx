import React from 'react';
import { useNavigate } from 'react-router-dom';

const notices = [
  {
    id: 1,
    title: '[안내] 소셜 로그인 버그 수정 완료',
    date: '2025. 04. 20. 13:30',
    isNew: true,
  },
  {
    id: 8,
    title: '[공지] 커뮤니티 가이드라인 안내',
    date: '2025. 04. 04. 10:15',
    isNew: true,
  },
  {
    id: 2,
    title: '[업데이트] 개인정보 열람 및 수정에 대한 안내',
    date: '2025. 04. 10. 10:00',
    isNew: false,
  },
  {
    id: 3,
    title: '[안내] 앱 성능 개선 업데이트 안내',
    date: '2025. 04. 09. 15:30',
    isNew: false,
  },
  {
    id: 4,
    title: '[공지] 서비스 이용약관 개정 안내',
    date: '2025. 04. 08. 11:00',
    isNew: false,
  },
  {
    id: 5,
    title: '[안내] 위치기반 서비스 개선 안내',
    date: '2025. 04. 07. 09:30',
    isNew: false,
  },

  {
    id: 9,
    title: '[안내] 알림 설정 기능 개선',
    date: '2025. 04. 03. 13:50',
    isNew: false,
  },
];

const NoticeBoard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white h-full overflow-hidden">
      <div className="h-full overflow-y-auto px-5 pt-2 pb-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
        {notices.map(notice => (
          <div
            key={notice.id}
            className="py-5 border-b border-[#F0F0F0] cursor-pointer"
            onClick={() => navigate(`/my/notice/${notice.id}`)}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#000] text-[16px] font-medium">{notice.title}</span>
              {notice.isNew && (
                <span className="bg-blue-500 text-white text-[12px] px-2 py-0.5 rounded-full">
                  new
                </span>
              )}
            </div>
            <div className="text-[#8E8E8E] text-[12px] font-normal">{notice.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
