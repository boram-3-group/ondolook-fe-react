export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      // Firebase 메시지 이벤트 리스너 추가
      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data && event.data.type === 'FIREBASE_MESSAGE') {
          console.log('Firebase 푸시 알림 수신:', event.data.payload);
          // 여기에 추가적인 알림 처리 로직을 추가할 수 있습니다
        }
      });

      // 서비스 워커 업데이트 확인
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // 새 버전이 설치되면 자동으로 업데이트
              newWorker.postMessage({ type: 'SKIP_WAITING' });
              window.location.reload();
            }
          });
        }
      });

      // 오프라인 상태 감지
      window.addEventListener('online', () => {
        console.log('온라인 상태입니다.');
      });

      window.addEventListener('offline', () => {
        console.log('오프라인 상태입니다.');
      });

      return registration;
    } catch (error) {
      console.error('Service Worker 등록 실패:', error);
      return null;
    }
  }
  return null;
};

export const unregisterServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      console.log('Service Worker 등록 해제됨');
    } catch (error) {
      console.error('Service Worker 등록 해제 실패:', error);
    }
  }
};
