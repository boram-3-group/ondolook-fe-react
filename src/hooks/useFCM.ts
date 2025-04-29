import { useEffect, useState } from 'react';
import { getFCMToken, onMessageListener } from '../firebase';

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

export const useFCM = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<any>(null);

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
          setNotification(message);
          // 포그라운드에서 알림 표시
          if (Notification.permission === 'granted') {
            new Notification(message.notification?.title || 'Ondolook', {
              body: message.notification?.body,
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
