importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// API 요청에 대한 캐싱 전략
workbox.routing.registerRoute(
  ({ url }) => url.pathname.startsWith('/api'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5분
      }),
    ],
  })
);

// 정적 자원에 대한 캐싱 전략
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30일
      }),
    ],
  })
);

// 서비스 워커 설치 이벤트
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open('ondolook-cache-v1');
      await cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/favicon.svg',
        '/apple-touch-icon.png',
        '/splash-screen-iphone.png',
        '/splash-screen-ipad.png',
        '/splash-screen-ipad-pro.png',
      ]);
    })()
  );
});

// 서비스 워커 활성화 이벤트
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      // 이전 캐시 삭제
      const cacheKeys = await caches.keys();
      await Promise.all(
        cacheKeys
          .filter(key => key.startsWith('ondolook-cache-') && key !== 'ondolook-cache-v1')
          .map(key => caches.delete(key))
      );

      // 클라이언트 제어
      const clients = await self.clients.matchAll();
      clients.forEach(client => {
        client.postMessage({
          type: 'SW_ACTIVATED',
          payload: { version: 'v1' },
        });
      });
    })()
  );
});

// 오프라인 지원
self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      try {
        const response = await fetch(event.request);
        return response;
      } catch (error) {
        const cache = await caches.open('ondolook-cache-v1');
        const cachedResponse = await cache.match(event.request);
        return cachedResponse || new Response('Offline');
      }
    })()
  );
});

// 메시지 처리
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
