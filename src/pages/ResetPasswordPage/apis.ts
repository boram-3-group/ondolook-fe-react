import { api } from '../../core/axios';
import { VerifyResetMaillValue } from './type';

export const sendResetEmail = async ({ username, email }: { username: string; email: string }) => {
  try {
    const res = await api.service.post('/api/v1/auth/reset-email', {
      username,
      email,
    });
    return res && res.data;
  } catch (error) {
    throw new Error('비밀번호 재설정 메일전송에 실패');
  }
};

export const verifytToResetEmail = async ({ username, code }: VerifyResetMaillValue) => {
  try {
    const res = await api.service.post<VerifyResetMaillValue>(`/api/v1/auth/verify-code/password`, {
      username,
      code,
    });
    return res && res.data;
  } catch (error) {
    throw new Error('비밀번호 재설정 인증 실패');
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
