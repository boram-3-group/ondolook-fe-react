import React from 'react';
import { useParams } from 'react-router-dom';

const noticeDetails: Record<string, { title: string; date: string; content: string }> = {
  '1': {
    title: '[안내] 서비스 소개',
    date: '2025. 04. 20. 13:30',
    content: `안녕하세요,

'오늘 뭐입지?'가 고민인 당신을 위한 서비스 온도룩입니다.

우리는 매일 아침, 날씨 앱을 켜고 일정을 떠올리며 옷장을 뒤적입니다.
'비 올까? 너무 춥진 않을까? 데이트하는날인데 잘보여야하는데…'
시간은 부족한데, 선택은 늘 어렵죠.

온도룩은 날씨와 일정에 맞춘 '오늘의 코디'를 추천하는 서비스입니다.
당신의 하루를 가볍게 시작할 수 있도록,
오늘의 날씨와 일정을 반영한 착장을
3D 캐릭터 이미지로 직관적으로 보여드립니다.

오늘을 온도룩과 함께 빠르게 준비해보세요.
매일 아침 5분을 아껴주는 습관, 온도룩입니다!

온도룩 드림`,
  },
  '2': {
    title: '[공지] 커뮤니티 가이드라인 안내',
    date: '2025. 04. 04. 10:15',
    content: `[안내] 알림 설정 안내 공지문 (iOS / Android)

코디 추천 알림을 받고 싶으신가요?
그렇다면 아래 안내 사항을 따라보세요!

[iOS 사용자 안내]

1. 설정 앱 열기

2. [앱]으로 진입

3. 스크롤하여 [Ondolook] 선택

4. [알림] 탭 → 알림 허용 토글 ON

[Andriod 사용자 안내]

1. 설정 앱 열기

2. [앱] 또는 [애플리케이션] 선택

3. 목록에서 [Ondolook] 선택

4. [알림] 탭 → 알림 허용 ON

알림 설정을 해야 온도룩을 제대로 즐기실 수 있어요!

매일 아침 5분을 아껴주는 습관, 온도룩입니다!

온도룩 드림`,
  },
};

const NoticeBoardDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const notice = id ? noticeDetails[id] : null;

  if (!notice) return <div>존재하지 않는 공지입니다.</div>;

  return (
    <div className="bg-white h-full">
      <div className="px-5 pt-2">
        <div className="sticky top-0 bg-white pb-2">
          <div className="text-[#000] text-lg font-semibold mb-5">{notice.title}</div>
          <div className="text-[#8E8E8E] text-xs font-normal mb-5">{notice.date}</div>
        </div>
        <div className="text-[#555] text-base font-medium whitespace-pre-line overflow-y-auto max-h-[calc(100vh-180px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {notice.content}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoardDetails;
