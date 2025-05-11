/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.scss';
import { Routes } from './pages/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppSplash } from './components/AppSplash';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { NotificationTest } from './components/NotificationTest';
import { useEffect, useState } from 'react';
import { NotificationPermissionModal } from './components/NotificationPermissionModal';
import { useSystem } from './store/useSystem';
import { isSafari } from './core/constants';
import { updateSafeAreaInsets } from './utils/browser';
import { useUserStore } from './store/useUserStore';
import { toast, Toaster } from 'react-hot-toast';
import ModalProvider from './core/modalProvider';
import { modalManager } from './core/modal.tsx';
import { useFCM } from './hooks/useFCM';

function App() {
  const queryClient = new QueryClient();
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showGeolocationModal, setShowGeolocationModal] = useState(false);
  const { checkLogin } = useUserStore();
  useFCM();

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

  const requestNotificationPermission = async (): Promise<void> => {
    console.log('requestNotificationPermission');
    try {
      const permission = await Notification.requestPermission();
      console.log('시스템 알림 권한 요청 결과:', permission);
      setNotificationPermission(permission);
    } catch (error) {
      console.error('알림 권한 요청 중 오류:', error);
    }
  };

  const checkNotificationPermission = async () => {
    const savedPermission = localStorage.getItem('notification-permission');
    const currentPermission = savedPermission || Notification.permission;

    if (currentPermission === 'denied' || currentPermission === 'granted') {
      if (currentPermission === 'granted') {
        console.log('✅ 시스템 알림 권한 있음');
      }
      return currentPermission === 'granted';
    }

    console.log('ℹ️ 권한 미요청 상태');

    // PWA에서만 알림 권한 요청
    if (isPWA) {
      setShowNotificationModal(true);
    }

    return false;
  };

  const requestGeolocationPermission = async (): Promise<void> => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      console.log('위치 정보:', position.coords);
      setCurrentLocation(position.coords);
      setGeolocationPermission('granted');
      localStorage.setItem('geolocation-permission', 'granted');
    } catch (error) {
      console.error('위치 권한 거부 또는 오류:', error);
      setGeolocationPermission('denied');
      localStorage.setItem('geolocation-permission', 'denied');
    }
  };

  const checkGeolocationPermission = async () => {
    const savedPermission = localStorage.getItem('geolocation-permission');
    const currentPermission = savedPermission || 'prompt';

    if (currentPermission === 'denied' || currentPermission === 'granted') {
      if (currentPermission === 'granted') {
        console.log('✅ 위치 권한 있음');
        // 위치 정보 다시 가져오기
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          setCurrentLocation(position.coords);
        } catch (error) {
          console.error('위치 정보 가져오기 실패:', error);
        }
      }
      return currentPermission === 'granted';
    }

    console.log('ℹ️ 위치 권한 미요청 상태');

    if (!isPC) {
      setShowGeolocationModal(true);
    }

    return false;
  };

  useEffect(() => {
    setTimeout(async () => {
      const isLoggedIn = await checkLogin();
      if (!isLoggedIn) {
        const notificationGranted = await checkNotificationPermission();
        if (notificationGranted) {
          await checkGeolocationPermission();
        }
      }
    }, 0);

    // cleanup
    return () => {
      window.removeEventListener('resize', updateSafeAreaInsets);
      window.removeEventListener('orientationchange', updateSafeAreaInsets);
    };
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
          {/* <ModalProvider> */}
          <Routes />
          {/* </ModalProvider> */}
          <AppSplash duration={2000} />
          <Toaster
            position="top-center"
            containerStyle={{
              position: 'fixed',
              top: 'calc(env(safe-area-inset-top) + 20px)',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: '428px',
              zIndex: 9999,
              pointerEvents: 'none',
            }}
            toastOptions={{
              style: {
                background: '#4D97FF',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '8px 12px',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '24px',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(77, 151, 255, 0.3)',
                maxWidth: 'calc(100% - 32px)',
                margin: '0 auto',
                pointerEvents: 'auto',
              },
              iconTheme: {
                primary: '#FFFFFF',
                secondary: '#4D97FF',
              },
            }}
          />
          {/* <NotificationTest /> */}
        </div>
        <NotificationPermissionModal
          isOpen={showNotificationModal}
          onClose={() => setShowNotificationModal(false)}
          onRequestPermission={requestNotificationPermission}
        />
        <NotificationPermissionModal
          isOpen={showGeolocationModal}
          onClose={() => setShowGeolocationModal(false)}
          onRequestPermission={requestGeolocationPermission}
          title="위치 권한 요청"
          description="Ondolook에서 정확한 날씨 정보를 제공받으시려면 위치 권한이 필요합니다. 위치 정보를 통해 더 정확한 날씨 정보를 받아보세요!"
        />
      </div>
    </QueryClientProvider>
  );
}

export default App;
