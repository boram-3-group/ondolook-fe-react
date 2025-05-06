import { AxiosError } from 'axios';
import { api } from '../../core/axios';
import { getUserDeviceId } from '../../core/helper';
import { LoginFormValues } from './type';

export const login = async ({ username, password }: LoginFormValues) => {
  const deviceId = getUserDeviceId();
  try {
    const res = await api.service.post(
      '/api/v1/auth/login',
      {
        username,
        password,
      },
      {
        headers: {
          'X-DEVICE-ID': deviceId,
        },
        withCredentials: true,
      }
    );
    return res && res.data;
  } catch (error) {
    throw new Error('로그인에 실패했습니다.');
  }
};

export const getUserProfile = async () => {
  try {
    const { data } = await api.service.get('/api/v1/auth/profile');
    return data || [];
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error('사용자 정보 조회 실패');
    }
    return [];
  }
};
