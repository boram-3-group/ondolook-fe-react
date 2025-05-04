import React from 'react';
import { useParams } from 'react-router-dom';

const noticeDetails: Record<string, { title: string; date: string; content: string }> = {
  '1': {
    title: '[안내] 소셜 로그인 버그 수정 완료',
    date: '2025. 04. 20. 13:30',
    content: `안녕하세요, 온도룩입니다.\n\n일부 사용자분들께서 소셜 로그인(카카오/구글)이 정상적으로 작동하지 않는 문제를 겪으셨습니다.\n\n이용에 불편을 드려 정말 죄송합니다.\n\n이번 업데이트를 통해 해당 버그를 수정하여, 지금은 모든 소셜 로그인 기능을 정상적으로 이용 가능합니다.\n\n더욱 안정적인 서비스 제공을 위해 지속적으로 개선해 나가겠습니다.\n\n항상 이용해 주셔서 감사합니다.\n\n온도룩 드림`,
  },
  '2': {
    title: '[업데이트] 개인정보 열람 및 수정에 대한 안내',
    date: '2025. 04. 10. 10:00',
    content: `안녕하세요, 온도룩입니다.\n\n개인정보 열람 및 수정 기능이 추가되었습니다.\n\n마이페이지 > 회원 정보 설정에서 개인정보를 확인하고 수정하실 수 있습니다.\n\n더 나은 서비스 제공을 위해 노력하겠습니다.\n\n감사합니다.`,
  },
};

const NoticeBoardDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const notice = id ? noticeDetails[id] : null;

  if (!notice) return <div>존재하지 않는 공지입니다.</div>;

  return (
    <div className="bg-white h-full">
      <div className="px-5 pt-2">
        <div className="text-[#000] text-lg font-semibold mb-5">{notice.title}</div>
        <div className="text-[#8E8E8E] text-xs font-normal mb-5">{notice.date}</div>
        <div className="text-[#555] text-base font-medium whitespace-pre-line">
          {notice.content}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoardDetails;
