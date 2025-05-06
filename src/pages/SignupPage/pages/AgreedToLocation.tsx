import { AgreeLayout } from '../_components/AgreeLayout';

export const AgreedToLocation = () => {
  const termsOfLocationData = {
    title: '위치기반서비스 이용약관',
    subTitle: '부칙 (2025.05.01)',
    description: '본 동의서는 2025년 5월 1일부터 적용됩니다.',
    Articles: [
      {
        articleTitle: '제 1조 (목적)',
        articleText:
          '본 동의서는 회원(이하 “이용자”)이 온도룩(이하 “회사”)이 제공하는 위치기반서비스(이하 “서비스”)를 이용함에 있어, 회사가 이용자의 위치정보를 수집·이용하는 것에 대한 사항을 규정합니다.',
      },
      {
        articleTitle: '제 2조 (위치기반서비스의 내용)',
        articleText: `회사는 이용자의 스마트폰 또는 단말기로부터 수집된 위치정보를 활용하여 다음과 같은 서비스를 제공합니다:
            1. 현재 위기 기반 날씨 정보 제공
            2. 위치별 기온, 미세먼지, 자외선 수치에 따른 코디 추천
            3. 위치기반 알림 전송(예: “오늘 오후 비 예보, 우산 챙기세요”)
            4. 기타 위치정보를 활용한 개인 맞춤 콘텐츠 제공`,
      },
      {
        articleTitle: '제 3조 (위치정보의 수집·이용 항목 및 방법)',
        articleText: `1. 수집 항목: GPS, Wi-Fi, 셀룰러 신호 등을 활용한 단말기 위치정보
            2. 수집 방법: 이용자의 단말기에서 위치정보 접근을 허용한 경우에 한해, 앱 실행 시 또는 알림 예약 시 자동 수집
            3. 보유 기간: 실시간 처리 후 즉시 폐기. 단, 분석 목적의 익명 정보는 별도 동의 시 보관 가능`,
      },
      {
        articleTitle: '제 4조 (개인위치정보의 이용목적)',
        articleText: `회사는 다음의 목적 범위 내에서만 이용자의 위치정보를 활용합니다.
            • 날씨 기반 코디 추천 제공
            • 위치기반 알림 전송 및 개인화 콘텐츠 제공
            • 통계 목적의 비식별 위치 패턴 분석 (개인 식별 불가)`,
      },
      {
        articleTitle: '제 5조 (제3자 제공 및 외부 이전)',
        articleText: `회사는 개인위치정보를 제3자에게 제공하지 않습니다. 단, 아래의 경우 예외로 합니다.
            • 이용자가 사전에 동의한 경우
            • 수사기관의 적법한 요청 등 법령에 따른 경우`,
      },
      {
        articleTitle: '제 6조 (서비스의 변경 및 중단)',
        articleText: `1. 이용자는 언제든지 앱 내 설정 메뉴를 통해 위치정보 제공에 대한 동의를 철회할 수 있습니다.
            2. 철회 시, 위치기반 추천 및 알림 등 관련 기능은 즉시 중단되며, 수집된 정보는 법령에 따라 파기합니다.`,
      },
      {
        articleTitle: '제 7조 (저작권 및 콘텐츠 이용)',
        articleText: `회사는 위치정보의 보호 및 민원 처리를 위해 아래와 같이 책임자를 지정합니다.
            • 이름: 정태화
            • 소속: 온도룩 기획파트`,
      },
      {
        articleTitle: '제 8조 (이용 제한 및 해지)',
        articleText: `1. 본 동의서는 앱 설치 또는 회원가입 시 명시적으로 고지되며, 사용자가 직접 체크하여 동의한 경우에만 유효합니다.
        2. 회사는 동의 이력을 서비스 이용 기간 동안 안전하게 보관합니다.`,
      },
    ],
  };
  return (
    <AgreeLayout
      title={termsOfLocationData.title}
      subTitle={termsOfLocationData.subTitle}
      description={termsOfLocationData.description}
      Articles={termsOfLocationData.Articles}
    />
  );
};
