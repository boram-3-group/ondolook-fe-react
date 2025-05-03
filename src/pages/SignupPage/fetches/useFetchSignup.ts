import { useMutation } from '@tanstack/react-query';
import { SignUpResponse } from '../type';
import { signup, updateUserInfo } from '../apis';
import { User } from '../../../store/useUserStore';

export const useFetchSignup = () => {
  return useMutation({
    mutationFn: (data: SignUpResponse) => signup(data),
  });
};

export const useFetchUpdateUserInfo = () => {
  return useMutation({
    mutationFn: (data: SignUpResponse) => updateUserInfo(data),
  });
};
