import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 웹 푸시 토큰을 가져오는 함수
export const getFCMToken = async (): Promise<string> => {
  try {
    const swRegistration = await navigator.serviceWorker.getRegistration();
    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: swRegistration,
    });

    if (currentToken) {
      // Get environment information
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      const isPWA =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      // pwa에서만 토큰 저장
      if (isPWA) {
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
            const errorData = await response.json();
            console.error('Failed to save token to Notion:', errorData);
            throw new Error(errorData.details || 'Failed to save token');
          }

          const data = await response.json();
          console.log('Token saved successfully:', data);
        } catch (error) {
          console.error('Error saving token to Notion:', error);
          // 토큰 저장 실패는 FCM 토큰 발급에 영향을 주지 않도록 함
        }
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
