import { useEffect } from 'react';
import { useFCM } from '../hooks/useFCM';

export const NotificationTest = () => {
  const { token, notification } = useFCM();

  useEffect(() => {
    if (token) {
      console.log('FCM Token:', token);
    }
  }, [token]);

  useEffect(() => {
    if (notification) {
      console.log('Received Notification:', notification);
      console.log('Notification Title:', notification.notification?.title);
      console.log('Notification Body:', notification.notification?.body);
      console.log('Notification Data:', notification.data);
    }
  }, [notification]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">웹 푸시 알림 테스트</h2>
      <div className="space-y-2">
        <p>
          토큰:{' '}
          {token ? '토큰이 발급되었습니다. (콘솔에서 확인)' : '토큰이 아직 발급되지 않았습니다.'}
        </p>
        <p>
          알림: {notification ? '새로운 알림이 도착했습니다. (콘솔에서 확인)' : '알림이 없습니다.'}
        </p>
      </div>
    </div>
  );
};
