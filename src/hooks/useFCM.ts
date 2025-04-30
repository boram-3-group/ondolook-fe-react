import { useEffect, useState } from 'react';
import { getFCMToken, onMessageListener } from '../firebase';
// 타입스크립트 타입 체크 해제

interface FirebaseMessage {
  notification?: {
    title?: string;
    body?: string;
  };
  data?: Record<string, string>;
}

interface WindowWithMSStream extends Window {
  MSStream?: unknown;
}

const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as WindowWithMSStream).MSStream;

export const useFCM = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<FirebaseMessage | null>(null);

  useEffect(() => {
    const requestPermission = async () => {
      try {
        if (isIOS) {
          console.log('iOS 기기에서는 웹 푸시 알림을 지원하지 않습니다.');
          return;
        }

        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getFCMToken();
          setToken(token);
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };

    requestPermission();
  }, []);

  useEffect(() => {
    const setupMessageListener = async () => {
      try {
        if (isIOS) {
          // iOS에서는 로컬 알림을 사용
          return;
        }

        const message = await onMessageListener();
        if (message) {
          const firebaseMessage = message as FirebaseMessage;
          setNotification(firebaseMessage);
          // 포그라운드에서 알림 표시
          if (Notification.permission === 'granted') {
            new Notification(firebaseMessage.notification?.title || 'Ondolook', {
              body: firebaseMessage.notification?.body,
              icon: '/favicon.ico',
            });
          }
        }
      } catch (error) {
        console.error('Error setting up message listener:', error);
      }
    };

    setupMessageListener();
  }, []);

  return { token, notification };
};
