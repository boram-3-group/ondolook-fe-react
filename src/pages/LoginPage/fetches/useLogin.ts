import { useMutation } from '@tanstack/react-query';
import { LoginFormValues } from '../type';
import { login } from '../apis';

export const useFetchLogin = () => {
  return useMutation({
    mutationFn: (data: LoginFormValues) => login(data),
  });
};
