importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging-compat.js');

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
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
