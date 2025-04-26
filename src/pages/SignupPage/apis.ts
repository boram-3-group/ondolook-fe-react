import { api } from '../../core/axios';
import { SendEmailValue, SignUpResponse, VerifyEmailValue } from './type';

export const signup = async ({
  username,
  password,
  nickname,
  gender,
  birthDate,
}: SignUpResponse) => {
  try {
    const res = await api.service.post<SignUpResponse>('/api/v1/user', {
      username,
      password,
      nickname,
      gender,
      birthDate,
    });
    return res && res.data;
  } catch (error) {
    throw new Error('회원가입에 실패했습니다.');
  }
};

export const checkDuplicateUsername = async (username: string | undefined) => {
  try {
    const res = await api.service.get(`/api/v1/user/username/${username}`);
    return res && res.data;
  } catch (error) {
    throw new Error('username 중복조회 실패');
  }
};

export const sendEmailCode = async (email: SendEmailValue) => {
  try {
    const res = await api.service.post<SendEmailValue>(`/api/v1/auth/send-code?email=${email}`);
    return res && res.data;
  } catch (error) {
    throw new Error('이메일 인증코드 전송 실패');
  }
};

export const verifyEmailCode = async ({ email, code }: VerifyEmailValue) => {
  console.log('{ email, code', email, code);
  try {
    const res = await api.service.post<VerifyEmailValue>(
      `/api/v1/auth/verify-code?email=${email}&code=${code}`
    );
    return res && res.data;
  } catch (error) {
    throw new Error('이메일 인증 실패');
  }
};
