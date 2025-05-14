import { useMutation } from '@tanstack/react-query';
import { setNotificationSetting, NotificationSettingDto, deleteNotificationSetting } from '../apis';

export const useSetAlram = () => {
  return useMutation({
    mutationFn: (dto: NotificationSettingDto) => setNotificationSetting(dto),
  });
};

export const useDeleteAlram = () => {
  return useMutation({
    mutationFn: deleteNotificationSetting,
  });
};
