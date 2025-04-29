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
        description: '날씨에 맞는 나만의 코디를 온도록',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4A90E2',
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
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true,
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/ondolook\.click\/.*/i,
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
      srcDir: 'public',
      filename: 'sw.js',
      strategies: 'injectManifest',
      injectManifest: {
        injectionPoint: undefined,
      },
      injectRegister: null,
    }),
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
        sw: './public/sw.js',
      },
    },
  },
});
