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
      }
    );
    return res && res.data;
  } catch (error) {
    throw new Error('로그인에 실패했습니다.');
  }
};
