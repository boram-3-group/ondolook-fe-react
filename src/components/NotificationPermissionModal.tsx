import { useState, useEffect } from 'react';

interface NotificationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestPermission: () => Promise<void>;
  title?: string;
  description?: string;
}

export const NotificationPermissionModal = ({
  isOpen,
  onClose,
  onRequestPermission,
  title = '알림 권한 요청',
  description = 'Ondolook에서 중요한 소식과 업데이트를 받아보시려면 알림 권한이 필요합니다. 알림을 통해 최신 정보를 놓치지 마세요!',
}: NotificationPermissionModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    try {
      setIsRequesting(true);
      onRequestPermission();
    } catch (error) {
      console.error('권한 요청 중 오류:', error);
    } finally {
      setIsRequesting(false);
      setIsVisible(false);
      onClose();
    }
  };

  const handleCancel = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{description}</p>
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
            {'확인'}
          </button>
        </div>
      </div>
    </div>
  );
};
