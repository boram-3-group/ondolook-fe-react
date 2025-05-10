import { useMutation } from '@tanstack/react-query';
import { changeUserPassword } from '../apis';

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ userId, newPassword }: { userId: string; newPassword: string }) =>
      changeUserPassword(userId, newPassword),
  });
};
