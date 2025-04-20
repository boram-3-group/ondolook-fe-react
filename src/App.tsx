/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.scss';
import { Routes } from './pages/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppSplash } from './components/common/AppSplash';

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
    if (Notification.permission === 'granted') {
      console.log('✅ 알림 권한 있음');
      // alert('알림 권한 있음');
    } else if (Notification.permission === 'denied') {
      console.log('❌ 알림 권한 거부됨');
    } else {
      console.log('ℹ️ 권한 미요청 상태, 요청 시도...');
      const permission = await Notification.requestPermission();
      console.log('사용자 선택 결과:', permission);
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

  checkNotificationPermission();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <div className="web-side__banner">
          <div className="web-side__banner__content">
            <h1>Welcome to our OndoLook!</h1>
          </div>
        </div>
        <div className="mobile-content">
          <Routes />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
