import { useEffect, useState } from 'react';
import { useNotificationStore } from '../../store/useNotificationStore';
import { useFCM } from '../../hooks/useFCM';
import { Icon } from './Icon';

export const AlarmPopup = () => {
  const { token } = useFCM();
  const notification = useNotificationStore(state => state.notification);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (token) {
      console.log('FCM Token:', token);
    }
  }, [token]);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!notification || !isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-[90%] max-w-md">
      <div className="flex flex-row px-[14px] pt-[14px] pb-[12px] gap-[10px] self-stretch rounded-[24px] bg-[#F3F3F3]">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center font-semibold text-black rounded-[10px] bg-white w-[38px] h-[38px]">
            <Icon name="ondo-logo-small" stroke="#000" width={32} className="text-center"></Icon>
          </div>
        </div>
        <div className="w-full">
          <span className="flex flex-row gap-[10px] items-center justify-between">
            <p className="text-[#000] font-['Pretendard_Variable'] text-[14px] font-medium leading-[150%] font-feature-settings: 'liga' off, 'clig' off">
              😎 {notification.notification?.title}
            </p>
            <span className="text-sm text-[#8E8E8E]"></span>
          </span>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {notification.notification?.body}
          </p>
        </div>
      </div>
    </div>
  );
};
