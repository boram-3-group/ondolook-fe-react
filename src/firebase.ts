import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyCSnuPnQSM1cvqcMONxOKRxGG_hM4oQHrA',
  authDomain: 'ondolook-1b496.firebaseapp.com',
  projectId: 'ondolook-1b496',
  storageBucket: 'ondolook-1b496.firebasestorage.app',
  messagingSenderId: '182182096530',
  appId: '1:182182096530:web:8aec9ad4f2ec337243804b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 웹 푸시 토큰을 가져오는 함수
export const getFCMToken = async (): Promise<string> => {
  try {
    // Safari 체크
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
      // Safari에서는 서비스 워커 등록이 필요
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('Safari Service Worker registered:', registration);
    }

    const currentToken = await getToken(messaging, {
      vapidKey:
        'BGPsb4h4k38AFSzw82uLy0x5HaB3L7idUwokMW0A8V-EXwCdmBkJuOsdYU-wAKEUThXAlEKUNKlPLH6jKFSbyOE',
      serviceWorkerRegistration: await navigator.serviceWorker.getRegistration(),
    });

    if (currentToken) {
      console.log('FCM Token obtained successfully:', currentToken);
      return currentToken;
    } else {
      console.log('FCM 토큰을 가져올 수 없습니다. 알림 권한을 확인하세요.');
      throw new Error('FCM 토큰을 가져올 수 없습니다.');
    }
  } catch (error) {
    console.error('FCM 토큰 가져오기 실패:', error);
    throw error;
  }
};

// 포그라운드 메시지 처리
export const onMessageListener = () =>
  new Promise(resolve => {
    onMessage(messaging, payload => {
      console.log('포그라운드 메시지 수신:', payload);
      resolve(payload);
    });
  });
