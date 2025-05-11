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
    // Safari 체크
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
      // Service Worker 파일 내용을 동적으로 생성
      const swContent = `
        // Firebase 설정
        const firebaseConfig = ${JSON.stringify(firebaseConfig)};

        // Firebase SDK 로드
        importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
        importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

        // Firebase 초기화
        firebase.initializeApp(firebaseConfig);

        const messaging = firebase.messaging();

        // 백그라운드 메시지 처리
        messaging.onBackgroundMessage(payload => {
          console.log('백그라운드 메시지 수신:', payload);

          const notificationTitle = payload.notification?.title || 'Ondolook';
          const notificationOptions = {
            body: payload.notification?.body,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            data: payload.data,
            actions: [
              {
                action: 'open',
                title: '앱 열기',
              },
            ],
            tag: 'ondolook-notification',
            renotify: true,
            requireInteraction: true,
          };

          self.registration.showNotification(notificationTitle, notificationOptions);
        });

        // 알림 클릭 이벤트 처리
        self.addEventListener('notificationclick', event => {
          console.log('알림 클릭:', event);
          event.notification.close();
          event.waitUntil(
            clients.matchAll({ type: 'window' }).then(clientList => {
              for (const client of clientList) {
                if (client.url === '/' && 'focus' in client) {
                  return client.focus();
                }
              }
              if (clients.openWindow) {
                return clients.openWindow('/');
              }
            })
          );
        });
      `;

      // Service Worker 파일 생성
      const blob = new Blob([swContent], { type: 'application/javascript' });
      const swUrl = URL.createObjectURL(blob);

      // Service Worker 등록
      const registration = await navigator.serviceWorker.register(swUrl, {
        type: 'module',
      });
      console.log('Safari Service Worker registered:', registration);
    }

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
