import { useEffect, useState } from 'react';
import { getFCMToken, onMessageListener } from '../firebase';

export const useFCM = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<any>(null);

  useEffect(() => {
    const requestPermission = async () => {
      try {
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
        const message = await onMessageListener();
        if (message) {
          setNotification(message);
        }
      } catch (error) {
        console.error('Error setting up message listener:', error);
      }
    };

    setupMessageListener();
  }, []);

  return { token, notification };
};
