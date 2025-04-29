// 서비스 워커 설치
self.addEventListener('install', event => {
  self.skipWaiting();
});

// 서비스 워커 활성화
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// 기본 fetch 이벤트
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
