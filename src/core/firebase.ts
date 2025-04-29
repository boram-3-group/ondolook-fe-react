import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY!,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN!,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID!,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID!,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID!,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermissionAndGetToken = async () => {
  const status = await Notification.requestPermission();
  if (status !== 'granted') return;

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_APP_FIREBASE_VAPID_KEY!,
    serviceWorkerRegistration: await navigator.serviceWorker.register('/firebase-messaging-sw.js'),
  });

  console.log('FCM 토큰:', token);
  console.log('FCM 토큰 길이:', token.length);
  console.log(
    'FCM 토큰 형식:',
    token.substring(0, 10) + '...' + token.substring(token.length - 10)
  );
  return token;
};

export const setupOnMessage = () => {
  onMessage(messaging, payload => {
    console.log('=== 포그라운드 메시지 수신 ===');
    console.log('메시지 전체 데이터:', payload);
    console.log('알림 제목:', payload.notification?.title);
    console.log('알림 내용:', payload.notification?.body);
    console.log('추가 데이터:', payload.data);
    console.log('메시지 ID:', payload.messageId);
    console.log('==========================');
  });
};
