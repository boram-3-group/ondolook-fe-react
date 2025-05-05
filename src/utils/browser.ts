export const isInAppBrowser = (): boolean => {
  const ua = navigator.userAgent || navigator.vendor;

  // 카카오 인앱브라우저 체크
  if (/KAKAOTALK/i.test(ua)) {
    console.log('카카오 인앱브라우저 감지');
    return true;
  }

  // 기타 인앱브라우저 체크
  if (/NAVER/i.test(ua) || /Line/i.test(ua) || /FBAN/i.test(ua) || /FBAV/i.test(ua)) {
    return true;
  }

  return false;
};

// 카카오 인앱브라우저 전용 함수
export const isKakaoInAppBrowser = (): boolean => {
  const ua = navigator.userAgent || navigator.vendor;
  return /KAKAOTALK/i.test(ua);
};

// safe-area 관련 유틸리티 함수
export const updateSafeAreaInsets = () => {
  const root = document.querySelector('.mobile-content') as HTMLElement;
  if (!root) return;
  const style = getComputedStyle(root);

  // iOS safe-area-inset-* 값 가져오기
  const safeAreaInsetTop = style.getPropertyValue('--safe-area-inset-top');

  // CSS 변수 설정
  root.style.setProperty('--safe-area-inset-top', safeAreaInsetTop || '0px');
};

// safe-area 이벤트 리스너 등록
export const setupSafeAreaListener = () => {
  // 초기 safe-area 값 설정
  updateSafeAreaInsets();

  // 화면 회전이나 크기 변경 시 safe-area 값 업데이트
  window.addEventListener('resize', updateSafeAreaInsets);
  window.addEventListener('orientationchange', updateSafeAreaInsets);
};
