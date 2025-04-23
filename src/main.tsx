import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { registerSW } from 'virtual:pwa-register';
import { requestPermissionAndGetToken } from './core/firebase.ts';

requestPermissionAndGetToken();

registerSW({
  onNeedRefresh() {
    console.log('업데이트 필요!');
  },
  onOfflineReady() {
    console.log('오프라인에서도 사용 가능!');
  },
});
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
