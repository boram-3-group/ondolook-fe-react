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
import { useSystem } from './store/useSystem';
import { saveTokenToNotion } from './core/notion';
import { isSafari } from './core/constants';
import { RouterGuardProvider } from './pages/RouterGuardProvider';

function App() {
  const queryClient = new QueryClient();
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const {
    isPWA,
    isIOS,
    isPC,
    isMobile,
    notificationPermission,
    setNotificationPermission,
    setFcmToken,
    setCurrentLocation,
    setGeolocationPermission,
  } = useSystem();

  const handleTokenAndSave = async () => {
    console.log('handleTokenAndSave');
    try {
      const token = await getFCMToken();
      // notion 토큰

      saveTokenToNotion(token, {
        isIOS,
        isSafari,
        isPWA,
      });

      setFcmToken(token);
    } catch (error) {
      console.error('Firebase 토큰 요청 중 오류:', error);
    }
  };

  const requestNotificationPermission = async (): Promise<void> => {
    console.log('requestNotificationPermission');
    try {
      const permission = await Notification.requestPermission();
      console.log('시스템 알림 권한 요청 결과:', permission);
      setNotificationPermission(permission);

      if (permission === 'granted') {
        await handleTokenAndSave();
      }
    } catch (error) {
      console.error('알림 권한 요청 중 오류:', error);
    }
  };

  const checkNotificationPermission = async () => {
    if (notificationPermission === 'granted') {
      console.log('✅ 시스템 알림 권한 있음');
      await handleTokenAndSave();
      return true;
    }

    if (notificationPermission === 'denied') {
      console.log('❌ 알림 권한 거부됨');
      return false;
    }

    console.log('ℹ️ 권한 미요청 상태');

    if (!isPC) {
      setShowNotificationModal(true);
    }

    return false;
  };

  function requestGeolocationPermission() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          console.log('위치 정보:', position.coords);
          setCurrentLocation(position.coords);
          resolve(position.coords);
        },
        error => {
          console.error('위치 권한 거부 또는 오류:', error);
          reject(error);
        }
      );
    });
  }

  async function initGeolocation() {
    try {
      const coords = (await requestGeolocationPermission()) as GeolocationCoordinates;
      setGeolocationPermission('granted');
      alert(`위도: ${coords.latitude}, 경도: ${coords.longitude}`);
    } catch (err) {
      setGeolocationPermission('denied');
      alert('위치 정보를 사용할 수 없습니다.');
    }
  }

  useEffect(() => {
    console.log('PWA', isPWA);
    console.log('PC', isPC);
    console.log('Mobile', isMobile);
    console.log('IOS', isIOS);

    checkNotificationPermission();
    requestGeolocationPermission();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <div className="web-side__banner">
          <div className="web-side__banner__content">
            <img className="web-side__logo" src="/service-logo@x3.png" alt="oservice-logo.png" />
            <div className="web-side__banner__content__info">
              <img src="/web-title-banner@x3.png" alt="web-title-banner.png" />
            </div>
          </div>
        </div>
        <div className="mobile-content">
          {/* <AppSplash duration={2000}>
            <Routes />
            <NotificationTest />
          </AppSplash>
          <PWAInstallPrompt /> */}
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
