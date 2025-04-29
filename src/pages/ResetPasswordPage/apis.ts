import { api } from '../../core/axios';

export const login = async ({
  username,
  email,
  callbackUrl,
  verificationCode,
}: {
  username: string;
  email: string;
  callbackUrl: string;
  verificationCode: string;
}) => {
  try {
    const res = await api.service.post('/api/v1/auth/reset-email', {
      username,
      email,
      callbackUrl,
      verificationCode,
    });
    return res && res.data;
  } catch (error) {
    throw new Error('로그인에 실패했습니다.');
  }
};
