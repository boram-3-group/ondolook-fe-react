importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');
console.log('firebase-messaging-sw.js loaded');
firebase.initializeApp({
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
});

const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage(payload => {
  console.log('=== 백그라운드 메시지 수신 ===');
  console.log('메시지 전체 데이터:', payload);
  console.log('알림 제목:', payload.notification?.title);
  console.log('알림 내용:', payload.notification?.body);
  console.log('추가 데이터:', payload.data);
  console.log('메시지 ID:', payload.messageId);
  console.log('발송 시간:', payload.sentTime);
  console.log('==========================');

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png',
    badge: '/badge.png',
    data: payload.data,
    actions: [
      {
        action: 'open',
        title: '열기',
      },
    ],
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 이벤트 처리
self.addEventListener('notificationclick', event => {
  console.log('=== 알림 클릭 이벤트 ===');
  console.log('클릭된 알림:', event.notification);
  console.log('액션:', event.action);
  console.log('추가 데이터:', event.notification.data);
  console.log('========================');

  event.notification.close();

  if (event.action === 'open') {
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
  }
});
