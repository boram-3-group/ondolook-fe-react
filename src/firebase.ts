import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useSystem } from './store/useSystem';

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
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('Safari Service Worker registered:', registration);
    }

    const swRegistration = await navigator.serviceWorker.getRegistration();
    const currentToken = await getToken(messaging, {
      vapidKey:
        'BGPsb4h4k38AFSzw82uLy0x5HaB3L7idUwokMW0A8V-EXwCdmBkJuOsdYU-wAKEUThXAlEKUNKlPLH6jKFSbyOE',
      serviceWorkerRegistration: swRegistration,
    });

    if (currentToken) {
      // Get environment information
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      const isPWA =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;

      // Save token to Notion via Vercel Function
      try {
        const response = await fetch('/api/save-fcm-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: currentToken,
            environment: {
              isIOS,
              isSafari,
              isPWA,
            },
          }),
        });

        if (!response.ok) {
          console.error('Failed to save token to Notion');
        }
      } catch (error) {
        console.error('Error saving token to Notion:', error);
      }

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
