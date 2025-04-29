import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { registerServiceWorker } from './utils/serviceWorker';
import './index.css';
import { requestPermissionAndGetToken } from './core/firebase.ts';

requestPermissionAndGetToken();

// 서비스 워커 등록
if (process.env.NODE_ENV === 'production') {
  registerServiceWorker();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
