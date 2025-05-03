import { api } from '../../core/axios';
import { SignUpResponse, VerifyEmailValue } from './type';
import { User } from '../../store/useUserStore';

export const signup = async ({
  username,
  password,
  nickname,
  gender,
  birthDate,
  email,
  agreedToTerms,
  agreedToPrivacy,
  agreedToMarketing,
}: SignUpResponse) => {
  try {
    const res = await api.service.post<SignUpResponse>('/api/v1/user', {
      username,
      password,
      nickname,
      gender,
      birthDate,
      email,
      agreedToTerms,
      agreedToPrivacy,
      agreedToMarketing,
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

export const sendEmailCode = async (email: string) => {
  try {
    const res = await api.service.post(`/api/v1/user/email/send-mail`, email, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    return res && res.data;
  } catch (error) {
    throw new Error('이메일 인증코드 전송 실패');
  }
};

export const verifyEmailCode = async ({ email, code }: VerifyEmailValue) => {
  try {
    const res = await api.service.post<VerifyEmailValue>(`/api/v1/user/email/verify`, {
      email,
      code,
    });
    return res && res.data;
  } catch (error) {
    throw new Error('이메일 인증 실패');
  }
};

export const updateUserInfo = async (user: SignUpResponse) => {
  try {
    const res = await api.service.put<User>(`/api/v1/user/${user.username}`, user, {
      withCredentials: true,
    });
    return res && res.data;
  } catch (error) {
    throw new Error('사용자 정보 업데이트 실패');
  }
};
