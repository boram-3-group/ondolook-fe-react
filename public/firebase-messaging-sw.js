importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyD5QJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQ',
  authDomain: 'ondolook.firebaseapp.com',
  projectId: 'ondolook',
  storageBucket: 'ondolook.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abcdefghijklmnopqrstuv',
  measurementId: 'G-ABCDEFGHIJ',
};

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
