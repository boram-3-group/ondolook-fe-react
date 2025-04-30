/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.scss';
import { Routes } from './pages/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppSplash } from './components/AppSplash';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { NotificationTest } from './components/NotificationTest';
import { useEffect } from 'react';

function App() {
  const queryClient = new QueryClient();

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

  const checkNotificationPermission = async () => {
    // iOS 기기 확인
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    if (Notification.permission === 'granted') {
      console.log('✅ 알림 권한 있음');
      return true;
    } else if (Notification.permission === 'denied') {
      console.log('❌ 알림 권한 거부됨');
      return false;
    } else {
      console.log('ℹ️ 권한 미요청 상태, 요청 시도...');
      try {
        // iOS에서는 사용자 상호작용 후에만 권한 요청 가능
        if (isIOS) {
          // iOS에서는 알림 권한 요청을 지연시켜 사용자 상호작용 후에 실행
          setTimeout(async () => {
            const permission = await Notification.requestPermission();
            console.log('iOS 사용자 선택 결과:', permission);
          }, 1000); // 1초 후에 권한 요청
          return false;
        } else {
          const permission = await Notification.requestPermission();
          console.log('사용자 선택 결과:', permission);
          return permission === 'granted';
        }
      } catch (error) {
        console.error('알림 권한 요청 중 오류:', error);
        return false;
      }
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
      <div className="app">
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
      </div>
    </QueryClientProvider>
  );
}

export default App;
