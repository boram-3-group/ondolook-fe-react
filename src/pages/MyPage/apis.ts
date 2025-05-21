import { api } from '../../core/axios';
import { AxiosError } from 'axios';

export interface BookmarkItem {
  id: number;
  outfitImage: {
    id: number;
    title: string;
    description: string;
    metadata: {
      presignedUrl: string;
    };
  };
}

export interface SecessionReasonItem {
  id: number;
  description: 'string';
}

export interface NotificationSettingItem {
  hour: number;
  minute: number;
  dayOfWeek: string;
  enabled: boolean;
  latitude: number;
  longitude: number;
  eventTypeId: number;
  gender: string;
}

export interface NotificationSettingDto {
  hour: number;
  minute: number;
  dayOfWeek: string;
  enabled: boolean;
  latitude?: number;
  longitude?: number;
  eventTypeId?: number;
  gender?: string;
}

export const getBookmarks = async (): Promise<BookmarkItem[]> => {
  try {
    const { data } = await api.service.get('/api/v1/bookmark');
    return data.content || [];
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error('북마크 조회에 실패했습니다.');
    }
    return [];
  }
};

export const deleteBookmark = async (outfit_image_id: string) => {
  try {
    const res = await api.service.delete(`/api/v1/bookmark/${outfit_image_id}`);
    return res && res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error('북마크 삭제에 실패했습니다.');
    }
  }
};

export const addBookmark = async (outfit_image_id: string) => {
  try {
    const res = await api.service.post(`/api/v1/bookmark/${outfit_image_id}`);
    return res && res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error('북마크 추가에 실패했습니다.');
    }
  }
};

export const secessionUser = async (userId: string, reasonId: number) => {
  try {
    const res = await api.service.delete(`/api/v1/user/${userId}/reason-id/${reasonId}`);
    return res && res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error('회원 탈퇴에 실패했습니다.');
    }
  }
};

export const changeUserPassword = async (userId: string, newPassword: string) => {
  try {
    const res = await api.service.put(`/api/v1/user/${userId}/password`, newPassword, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res && res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error('비밀번호 변경에 실패했습니다.');
    }
  }
};

export const getSecessionReason = async (): Promise<SecessionReasonItem[]> => {
  try {
    const { data } = await api.service.get('/api/v1/delete-reason');
    return data || [];
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error('탈퇴 사유 조회에 실패했습니다.');
    }
    return [];
  }
};

export const setNotificationSetting = async (dto: NotificationSettingDto) => {
  try {
    const body = {
      hour: dto.hour,
      minute: dto.minute,
      dayOfWeek: dto.dayOfWeek,
      enabled: dto.enabled,
      ...(dto.latitude && { latitude: dto.latitude }),
      ...(dto.longitude && { longitude: dto.longitude }),
      ...(dto.eventTypeId && { eventTypeId: dto.eventTypeId }),
      ...(dto.gender && { gender: dto.gender }),
    };

    const res = await api.service.post(`/api/v1/notification-setting`, body);
    return res && res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error('알림 설정 저장에 실패했습니다.');
    }
  }
};

export const deleteNotificationSetting = async () => {
  try {
    const res = await api.service.delete('/api/v1/notification-setting');
    return res && res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error('알림 설정 삭제에 실패했습니다.');
    }
  }
};

export const saveFcmToken = async (fcmToken: string) => {
  try {
    const res = await api.service.post('/api/v1/fcm-token', { fcmToken });
    return res && res.data;
  } catch (error) {
    console.error('FCM 토큰 저장 실패:', error);
  }
};
