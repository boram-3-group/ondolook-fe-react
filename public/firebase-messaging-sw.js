importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');
console.log('firebase-messaging-sw.js loaded');
firebase.initializeApp({
  apiKey: 'AIzaSyCSnuPnQSM1cvqcMONxOKRxGG_hM4oQHrA',
  authDomain: 'ondolook-1b496.firebaseapp.com',
  projectId: 'ondolook-1b496',
  storageBucket: 'ondolook-1b496.firebasestorage.app',
  messagingSenderId: '182182096530',
  appId: '1:182182096530:web:8aec9ad4f2ec337243804b',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log('백그라운드 메시지:', payload);
  alert('백그라운드 메시지:', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/icon.png',
  });
});
