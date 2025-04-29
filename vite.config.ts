import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
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
        description: 'Ondolook',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4A90E2',
        orientation: 'portrait',
        categories: ['business', 'lifestyle', 'real estate'],
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
          {
            src: '/pwa-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        screenshots: [
          {
            src: '/screenshot1.png',
            sizes: '1280x720',
            type: 'image/png',
            label: 'Ondolook 메인 화면',
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true,
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/ondolook\.link\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'ondolook-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: process.env.NODE_ENV === 'development',
        type: 'module',
        navigateFallback: 'index.html',
      },
      // 서비스 워커 파일 설정
      srcDir: 'public',
      filename: 'sw.js',
      strategies: 'injectManifest',
      injectManifest: {
        injectionPoint: undefined,
      },
      // 인앱 브라우저에서는 서비스 워커를 등록하지 않음
      registerSW: true,
      injectRegister: 'inline',
      minify: true,
      disable: false,
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['.trycloudflare.com', 'ondolook.link'],
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        sw: './public/sw.js',
      },
    },
  },
});
