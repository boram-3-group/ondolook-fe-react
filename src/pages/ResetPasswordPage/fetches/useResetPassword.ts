import { useMutation } from '@tanstack/react-query';
import { ResetPasswordValue } from '../type';
import { resetPassword } from '../apis';

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordValue) => resetPassword(data),
  });
};
