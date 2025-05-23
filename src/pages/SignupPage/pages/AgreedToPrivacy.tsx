import { AgreeLayout } from '../_components/AgreeLayout';

const privacyPolicyData = {
  title: '온도룩 개인정보 처리 방침',
  subTitle: '시행일자: 2025년 4월 10일',
  description:
    '온도룩(이하 “회사”)은 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관계 법령을 준수하며, 회원의 개인정보를 보호하기 위해 다음과 같은 방침을 수립합니다.',
  Articles: [
    {
      articleTitle: '1. 수집하는 개인정보 항목 및 수집 방법',
      articleText: `1) 수집 항목
- 필수 항목:
  • 소셜 로그인 정보 (이메일, 프로필 이름(ID), 고유 식별자)
  • 성별, 생년월일 (맞춤형 코디 추천용)
  • 위치정보 (날씨 기반 추천 제공용)
- 선택 항목:
  • 캘린더 일정 (사용자가 연동 시, 추후 진행 예정)
  • 선호 스타일 및 알림 설정`,
    },
    {
      articleTitle: '2. 개인정보의 이용 목적',
      articleText:
        '회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.\n- 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산\n- 회원 관리 등',
    },
    {
      articleTitle: '3. 개인정보의 보유 및 이용 기간',
      articleText: `- 회원 탈퇴 시 즉시 파기
  - 단, 관계 법령에 따라 일정 기간 보관이 필요한 경우에는 해당 기간 동안 안전하게 보관 후 파기 (예: 전자상거래법, 통신비밀보호법 등)
  - 소셜 로그인 정보는 해당 플랫폼 정책에 따름`,
    },
    {
      articleTitle: '4. 개인정보 제3자 제공',
      articleText: `- 회사는 원칙적으로 사용자의 개인정보를 외부에 제공하지 않습니다.
  - 단, 사용자 동의를 받은 경우 또는 법령에 의거하거나 수사기관의 요청이 있는 경우에 한해 제공할 수 있습니다.`,
    },
    {
      articleTitle: '5. 개인정보 처리 위탁',
      articleText: `- 현재 회사는 개인정보 처리를 외부에 위탁하지 않습니다.
  - 향후 위탁 시, 위탁 대상 및 내용을 이용자에게 사전 고지하고 동의를 받습니다.`,
    },
    {
      articleTitle: '6. 이용자의 권리 및 행사 방법',
      articleText: `- 회원은 언제든지 자신의 개인정보를 조회하거나 수정할 수 있습니다.
  - 앱 내 [마이페이지]를 통해 직접 수정하거나, 탈퇴 요청이 가능합니다.
  - 개인정보 삭제를 원할 경우, 이메일(jyh6314@naver.com)로 요청할 수 있습니다.`,
    },
    {
      articleTitle: '7. 개인정보의 파기 절차 및 방법',
      articleText: `- 탈퇴하거나 수집 목적이 달성된 경우, 관련 데이터를 즉시 파기합니다.
  - 전자적 파일 형태: 복구 불가능한 기술적 방법으로 안전하게 삭제
  - 출력물 등은 분쇄 또는 소각 방식으로 폐기`,
    },
    {
      articleTitle: '8. 자동 수집 장치의 설치·운영 및 거부',
      articleText: `- 회사는 사용자 경험 개선을 위해 앱 사용 로그(접속 시간, 기기정보 등)를 수집할 수 있습니다.
  - 개인 식별 목적은 아니며, 사용자는 모바일 OS 설정을 통해 위치정보, 푸시 알림 등을 거부할 수 있습니다.`,
    },
    {
      articleTitle: '9. 개인정보 보호책임자 안내',
      articleText: `- 회사는 회원의 개인정보 관련 문의를 신속하고 성실하게 처리합니다.
  - 개인정보 보호책임자: 온도룩 개인정보보호 담당자(조윤환)
  - 이메일: jyh6314@naver.com`,
    },
    {
      articleTitle: '10. 고지의 의무',
      articleText: `- 본 개인정보처리방침이 변경될 경우, 변경사항을 앱 초기화면 또는 알림을 통해 공지합니다.
  - 중요한 변경사항의 경우, 사전 동의를 별도로 받을 수 있습니다.`,
    },
  ],
};

export const AgreedToPrivacy = () => {
  return (
    <AgreeLayout
      title={privacyPolicyData.title}
      subTitle={privacyPolicyData.subTitle}
      description={privacyPolicyData.description}
      Articles={privacyPolicyData.Articles}
    />
  );
};
