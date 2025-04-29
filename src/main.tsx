import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { registerServiceWorker } from './utils/serviceWorker';
import './index.css';
import { requestPermissionAndGetToken } from './core/firebase.ts';

// 서비스 워커 등록
if (process.env.NODE_ENV === 'production') {
  registerServiceWorker().then(() => {
    // 서비스 워커 등록 후 Firebase 토큰 요청
    requestPermissionAndGetToken();
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
