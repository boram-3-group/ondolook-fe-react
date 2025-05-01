import { api } from '../../core/axios';

export const sendResetEmail = async ({
  username,
  callbackUrl,
}: {
  username: string;
  callbackUrl: string;
}) => {
  try {
    const res = await api.service.post('/api/v1/auth/reset-email', {
      username,
      callbackUrl,
    });
    return res && res.data;
  } catch (error) {
    throw new Error('비밀번호 재설정 메일전송에 실패');
  }
};

export const resetPassword = async ({
  verificationCode,
  username,
  newPassword,
}: {
  verificationCode: string;
  username: string;
  newPassword: string;
}) => {
  try {
    const res = await api.service.post('/api/v1/auth/reset-password', {
      verificationCode,
      username,
      newPassword,
    });
    return res && res.data;
  } catch (error) {
    throw new Error('비밀번호 재설정 실패');
  }
};
