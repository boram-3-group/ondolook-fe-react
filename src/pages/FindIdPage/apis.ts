import { AxiosError } from 'axios';
import { api } from '../../core/axios';
import { SendFindIdEmailValue, VerifyFindIdEmailValue } from './type';

export const sendFindIdEmailCode = async (email: string) => {
  try {
    const res = await api.service.post('/api/v2/auth/send-code', email, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    return res && res.data;
  } catch (error) {
    throw new Error('아이디찾기 이메일 인증코드 전송 실패');
  }
};

export const verifyFindIdEmailCode = async (code: string) => {
  try {
    const res = await api.service.post<VerifyFindIdEmailValue>(`/api/v1/auth/verify-code`, code, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    return res && res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data || '이메일 인증 실패';
      throw new Error(message);
    }
  }
};
