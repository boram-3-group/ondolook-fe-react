import { useEffect, useState } from 'react';
import { getFCMToken, onMessageListener } from '../firebase';
import { isSafari } from '../core/constants';
import { useSystem } from '../store/useSystem';
// 타입스크립트 타입 체크 해제

interface FirebaseMessage {
  notification?: {
    title?: string;
    body?: string;
  };
  data?: Record<string, string>;
}

const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

export const useFCM = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<FirebaseMessage | null>(null);
  const { isPWA, isIOS } = useSystem();

  useEffect(() => {
    const requestPermission = async () => {
      try {
        // iOS PWA에서는 FCM 토큰 요청 시도
        if (isIOS && isStandalone) {
          console.log('iOS PWA에서 FCM 토큰 요청 시도');
          try {
            const token = await getFCMToken();
            if (token) {
              setToken(token);
              console.log('iOS PWA FCM 토큰:', token);
            }
          } catch (error) {
            console.error('iOS PWA FCM 토큰 요청 실패:', error);
          }
          return;
        }

        // 일반 사파리에서는 FCM 토큰 요청하지 않음
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
        // iOS PWA에서는 메시지 리스너 설정
        if (isIOS && isStandalone) {
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
          return;
        }

        // 일반 사파리에서는 메시지 리스너 설정하지 않음
        if (isIOS) {
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
