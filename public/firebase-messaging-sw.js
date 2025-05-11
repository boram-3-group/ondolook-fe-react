// Firebase 설정
const firebaseConfig = {
  apiKey: 'VITE_APP_FIREBASE_API_KEY',
  authDomain: 'VITE_APP_FIREBASE_AUTH_DOMAIN',
  projectId: 'VITE_APP_FIREBASE_PROJECT_ID',
  storageBucket: 'VITE_APP_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'VITE_APP_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'VITE_APP_FIREBASE_APP_ID',
};

// Firebase SDK 로드
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Safari 체크
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

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
