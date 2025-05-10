import { useMutation } from '@tanstack/react-query';
import { secessionUser } from '../apis';

export const useSecessionUser = () => {
  return useMutation({
    mutationFn: ({ userId, reasonId }: { userId: string; reasonId: number }) =>
      secessionUser(userId, reasonId),
  });
};
