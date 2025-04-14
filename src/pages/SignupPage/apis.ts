import { api } from '../../core/axios';
import { SignUpResponse } from './type';

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
