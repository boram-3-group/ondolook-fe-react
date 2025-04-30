/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.scss';
import { Routes } from './pages/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppSplash } from './components/AppSplash';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { NotificationTest } from './components/NotificationTest';
import { useEffect, useState } from 'react';
import { NotificationPermissionModal } from './components/NotificationPermissionModal';
import { getFCMToken } from './firebase';

interface WindowWithMSStream extends Window {
  MSStream?: unknown;
}

function App() {
  const queryClient = new QueryClient();
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as WindowWithMSStream).MSStream;
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  function requestGeolocationPermission() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          console.log('위치 정보:', position.coords);
          resolve(position.coords);
        },
        error => {
          console.error('위치 권한 거부 또는 오류:', error);
          reject(error);
        }
      );
    });
  }

  const requestNotificationPermission = async (): Promise<void> => {
    try {
      const permission = await Notification.requestPermission();
      console.log('알림 권한 요청 결과:', permission);

      if (permission === 'granted' && !isSafari) {
        try {
          const token = await getFCMToken();
          console.log('Firebase 토큰:', token);
        } catch (error) {
          console.error('Firebase 토큰 요청 중 오류:', error);
        }
      }
    } catch (error) {
      console.error('알림 권한 요청 중 오류:', error);
    }
  };

  const checkNotificationPermission = async () => {
    if (Notification.permission === 'granted') {
      console.log('✅ 알림 권한 있음');
      if (!isSafari) {
        try {
          const token = await getFCMToken();
          console.log('Firebase 토큰:', token);
        } catch (error) {
          console.error('Firebase 토큰 요청 중 오류:', error);
        }
      }
      return true;
    } else if (Notification.permission === 'denied') {
      console.log('❌ 알림 권한 거부됨');
      return false;
    } else {
      console.log('ℹ️ 권한 미요청 상태');
      // 모든 브라우저에서 모달을 통해 권한 요청
      setShowNotificationModal(true);
      return false;
    }
  };

  async function initGeolocation() {
    try {
      const coords = (await requestGeolocationPermission()) as GeolocationCoordinates;
      alert(`위도: ${coords.latitude}, 경도: ${coords.longitude}`);
    } catch (err) {
      alert('위치 정보를 사용할 수 없습니다.');
    }
  }

  // 앱 시작 시 알림 권한 확인
  useEffect(() => {
    checkNotificationPermission();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`app ${isIOS ? 'ios-safe-area' : ''}`}>
        <div className="web-side__banner">
          <div className="web-side__banner__content">
            <h1>Welcome to our OndoLook!</h1>
          </div>
        </div>
        <div className="mobile-content">
          <AppSplash duration={2000}>
            <Routes />
          </AppSplash>
          <PWAInstallPrompt />
          <NotificationTest />
        </div>
        <NotificationPermissionModal
          isOpen={showNotificationModal}
          onClose={() => setShowNotificationModal(false)}
          onRequestPermission={requestNotificationPermission}
        />
      </div>
    </QueryClientProvider>
  );
}

export default App;
