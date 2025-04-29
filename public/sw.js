importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

// 캐시 이름에 버전 추가
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `ondolook-cache-${CACHE_VERSION}`;

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
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
      // 새로운 서비스 워커를 즉시 활성화
      await self.skipWaiting();
    })()
  );
});

// 활성화 시 이전 캐시 삭제
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      // 이전 캐시 모두 삭제
      const cacheKeys = await caches.keys();
      await Promise.all(
        cacheKeys
          .filter(key => key.startsWith('ondolook-cache-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );

      // 새로운 서비스 워커가 페이지 제어를 즉시 시작
      await clients.claim();

      // 모든 클라이언트에 업데이트 알림
      const clientList = await clients.matchAll();
      clientList.forEach(client => {
        client.postMessage({
          type: 'CACHE_UPDATED',
          version: CACHE_VERSION,
        });
      });
    })()
  );
});

// API 요청에 대한 캐싱 전략
workbox.routing.registerRoute(
  ({ url }) => url.pathname.startsWith('/api'),
  new workbox.strategies.NetworkFirst({
    cacheName: `api-${CACHE_NAME}`,
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
    cacheName: `images-${CACHE_NAME}`,
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

// 오프라인 지원
self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      try {
        // 네트워크 우선 시도
        const response = await fetch(event.request);
        return response;
      } catch (error) {
        // 네트워크 실패시 캐시 사용
        const cache = await caches.open(CACHE_NAME);
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
