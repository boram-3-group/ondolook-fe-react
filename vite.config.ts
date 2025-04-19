import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt', // 서비스 워커 자동 갱신
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      // devOptions: {
      //   enabled: true, // ✅ dev 서버에서도 PWA 작동하도록 설정
      // },
      manifest: {
        name: 'Ondolook',
        short_name: 'Ondolook',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4A90E2',
        icons: [
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    host: '0.0.0.0', // 외부 접속 허용
    port: 5173,
    allowedHosts: ['.trycloudflare.com', ''], // Cloudflare Tunnel을 통한 접속 허용
  },
});
