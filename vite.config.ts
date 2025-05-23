import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      svgr({
        include: '**/*.svg',
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'favicon.svg',
          'robots.txt',
          'apple-touch-icon.png',
          'splash-screen.png',
          'splash-screen-iphone.png',
          'splash-screen-ipad.png',
          'splash-screen-ipad-pro.png',
        ],
        manifest: {
          name: 'Ondolook',
          short_name: 'Ondolook',
          description: '날씨에 맞는 나만의 코디를 온도록',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#ffffff',
          orientation: 'portrait',
          categories: ['lifestyle'],
          prefer_related_applications: false,
          icons: [
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        devOptions: {
          enabled: process.env.NODE_ENV === 'development',
          type: 'module',
        },
        injectRegister: null,
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,json,woff2}'],
          cleanupOutdatedCaches: true,
          skipWaiting: true,
          clientsClaim: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/ondolook\.click\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                networkTimeoutSeconds: 10,
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 5, // 5 minutes
                },
              },
            },
          ],
        },
      }),
      {
        name: 'generate-service-worker',
        closeBundle() {
          const firebaseConfig = {
            apiKey: process.env.VITE_APP_FIREBASE_API_KEY,
            authDomain: process.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.VITE_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.VITE_APP_FIREBASE_APP_ID,
          };

          const swContent = `
            // Firebase 설정
            const firebaseConfig = ${JSON.stringify(firebaseConfig)};

            // Firebase SDK 로드
            importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
            importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

            // Firebase 초기화
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
          `;

          fs.writeFileSync(resolve(__dirname, 'dist/firebase-messaging-sw.js'), swContent);
        },
      },
    ],
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: ['.trycloudflare.com', 'ondolook.click'],
    },
    build: {
      rollupOptions: {
        input: {
          main: './index.html',
          'firebase-messaging-sw': resolve(__dirname, 'public/firebase-messaging-sw.js'),
        },
      },
    },
    routes: [
      { src: '/api/(.*)', dest: '/api/$1' },
      { handle: 'filesystem' },
      { src: '/(.*)', dest: '/index.html' },
    ],
  };
});
