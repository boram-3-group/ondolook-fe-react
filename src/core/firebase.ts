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

  console.log('푸시 토큰:', token);
  return token;
};

export const setupOnMessage = () => {
  onMessage(messaging, payload => {
    console.log('포그라운드 알림:', payload);
    // alert(payload.notification?.title + '\n' + payload.notification?.body);
  });
};
