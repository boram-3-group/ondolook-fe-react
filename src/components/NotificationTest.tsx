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
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">FCM 토큰:</h3>
          <p className="break-all bg-gray-100 p-2 rounded">
            {token || '토큰이 아직 발급되지 않았습니다.'}
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">최근 알림:</h3>
          {notification ? (
            <div className="bg-gray-100 p-2 rounded">
              <p>
                <span className="font-semibold">제목:</span> {notification.notification?.title}
              </p>
              <p>
                <span className="font-semibold">내용:</span> {notification.notification?.body}
              </p>
              <p>
                <span className="font-semibold">데이터:</span> {JSON.stringify(notification.data)}
              </p>
            </div>
          ) : (
            <p className="bg-gray-100 p-2 rounded">알림이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};
