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

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 권한 요청 및 토큰 발급
export const requestPermissionAndGetToken = async () => {
  const status = await Notification.requestPermission();
  if (status !== 'granted') {
    // alert('푸시 권한이 거부됨');
    return;
  }

  const token = await getToken(messaging, {
    vapidKey:
      'BGPsb4h4k38AFSzw82uLy0x5HaB3L7idUwokMW0A8V-EXwCdmBkJuOsdYU-wAKEUThXAlEKUNKlPLH6jKFSbyOE',
    serviceWorkerRegistration: await navigator.serviceWorker.register('/firebase-messaging-sw.js'),
  });

  console.log('푸시 토큰:', token);
  return token; // 이걸 서버에 저장해두면 됨!
};

// 포그라운드 푸시 처리
onMessage(messaging, payload => {
  console.log('포그라운드 알림:', payload);
  alert(payload.notification?.title + '\n' + payload.notification?.body);
});
