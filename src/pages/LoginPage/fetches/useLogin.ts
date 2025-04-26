import { useMutation } from '@tanstack/react-query';
import { LoginProps } from '../type';
import { login } from '../apis';

export const useFetchLogin = () => {
  return useMutation({
    mutationFn: (data: LoginProps) => login(data),
  });
};
