import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getAnalytics } from 'firebase/analytics';

// Firebase 설정
const firebaseConfig = {
  apiKey: 'AIzaSyCSnuPnQSM1cvqcMONxOKRxGG_hM4oQHrA',
  authDomain: 'ondolook-1b496.firebaseapp.com',
  projectId: 'ondolook-1b496',
  storageBucket: 'ondolook-1b496.firebasestorage.app',
  messagingSenderId: '182182096530',
  appId: '1:182182096530:web:8aec9ad4f2ec337243804b',
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const analytics = getAnalytics(app);

// FCM 토큰 요청
export const requestPermissionAndGetToken = async () => {
  try {
    const status = await Notification.requestPermission();
    console.log('[Firebase] 알림 권한 상태:', status);

    if (status !== 'granted') {
      console.warn('[Firebase] 알림 권한이 거부되었습니다.');
      return null;
    }

    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log('[Firebase] 서비스 워커 등록 성공:', registration);

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_FIREBASE_VAPID_KEY!,
      serviceWorkerRegistration: registration,
    });

    console.log('[Firebase] FCM 토큰 발급 성공:', {
      tokenLength: token.length,
      tokenPreview: `${token.substring(0, 10)}...${token.substring(token.length - 10)}`,
    });

    return token;
  } catch (error) {
    console.error('[Firebase] FCM 토큰 요청 실패:', error);
    return null;
  }
};

// 포그라운드 메시지 처리
export const setupOnMessage = () => {
  onMessage(messaging, payload => {
    console.log('[Firebase] 포그라운드 메시지 수신:', {
      title: payload.notification?.title,
      body: payload.notification?.body,
      data: payload.data,
      messageId: payload.messageId,
    });
  });
};

export { messaging, analytics };
