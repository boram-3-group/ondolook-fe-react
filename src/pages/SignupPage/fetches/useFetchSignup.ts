import { useMutation } from '@tanstack/react-query';
import { SignUpResponse } from '../type';
import { signup } from '../apis';

export const useFetchSignup = () => {
  return useMutation({
    mutationFn: (data: SignUpResponse) => signup(data),
  });
};
