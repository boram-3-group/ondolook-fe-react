import { useState, useEffect } from 'react';

interface NotificationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestPermission: () => Promise<void>;
}

export const NotificationPermissionModal = ({
  isOpen,
  onClose,
  onRequestPermission,
}: NotificationPermissionModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      console.log('MCP Token:', localStorage.getItem('mcpToken'));
      console.log('Notification Message:', 'Modal opened');
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    try {
      setIsRequesting(true);
      console.log('MCP Token:', localStorage.getItem('mcpToken'));
      console.log('Notification Message:', 'Requesting permission');
      await onRequestPermission();
    } catch (error) {
      console.error('알림 권한 요청 중 오류:', error);
      console.log('MCP Token:', localStorage.getItem('mcpToken'));
      console.log('Notification Message:', 'Permission request failed');
    } finally {
      setIsRequesting(false);
      setIsVisible(false);
      onClose();
    }
  };

  const handleCancel = () => {
    console.log('MCP Token:', localStorage.getItem('mcpToken'));
    console.log('Notification Message:', 'Modal closed by user');
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-xl font-bold mb-4">알림 권한 요청</h2>
        <p className="mb-6">
          Ondolook에서 중요한 소식과 업데이트를 받아보시려면 알림 권한이 필요합니다. 알림을 통해
          최신 정보를 놓치지 마세요!
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            disabled={isRequesting}
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={isRequesting}
          >
            {isRequesting ? '요청 중...' : '확인'}
          </button>
        </div>
      </div>
    </div>
  );
};
