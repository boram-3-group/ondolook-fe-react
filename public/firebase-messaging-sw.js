importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyCSnuPnQSM1cvqcMONxOKRxGG_hM4oQHrA',
  authDomain: 'ondolook-1b496.firebaseapp.com',
  projectId: 'ondolook-1b496',
  storageBucket: 'ondolook-1b496.firebasestorage.app',
  messagingSenderId: '182182096530',
  appId: '1:182182096530:web:8aec9ad4f2ec337243804b',
};

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
    // Safari에서 알림이 제대로 표시되도록 추가 옵션
    tag: 'ondolook-notification',
    renotify: true,
    requireInteraction: true,
  };

  // 알림 표시
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 이벤트 처리
self.addEventListener('notificationclick', event => {
  console.log('알림 클릭:', event);

  event.notification.close();

  // 알림 클릭 시 앱 열기
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
