import { useEffect, useState } from 'react';
import { useFCM } from '../hooks/useFCM';
import { api } from '../core/axios';
import { useNotificationStore } from '../store/useNotificationStore';

export const NotificationTest = () => {
  const { token } = useFCM();
  const notification = useNotificationStore(state => state.notification);
  const [isVisible, setIsVisible] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sendStatus, setSendStatus] = useState<string | null>(null);

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
    <div className="absolute top-0 right-0 z-[9999]">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
      >
        {isVisible ? '알림 테스트 숨기기' : '알림 테스트 보기'}
      </button>

      {isVisible && (
        <div className="fixed top-20 right-4 w-96 bg-white p-4 rounded-lg shadow-xl z-50">
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
                    <span className="font-semibold">데이터:</span>{' '}
                    {JSON.stringify(notification.data)}
                  </p>
                </div>
              ) : (
                <p className="bg-gray-100 p-2 rounded">알림이 없습니다.</p>
              )}
            </div>
            <form
              className="space-y-2"
              onSubmit={async e => {
                e.preventDefault();
                console.log('onSubmit');
                if (!token) {
                  setSendStatus('FCM 토큰이 없습니다.');
                  return;
                }
                setSendStatus('전송 중...');
                try {
                  const res = await api.service.post('/api/v1/noti-test', {
                    title,
                    content,
                    targetToken: token,
                  });
                  if (res.status === 200) {
                    setSendStatus('알림 전송 성공!');
                  } else {
                    setSendStatus('알림 전송 실패');
                  }
                } catch {
                  setSendStatus('에러 발생');
                }
              }}
            >
              <div>
                <label className="block font-semibold mb-1">알림 제목</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">알림 내용</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors mt-2"
                disabled={!token}
              >
                테스트 알림 보내기
              </button>
              {sendStatus && <div className="mt-2 text-sm">{sendStatus}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
