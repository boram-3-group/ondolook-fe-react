import { useMutation } from '@tanstack/react-query';
import { sendResetEmail } from '../apis';
import { SendResetMaillValue } from '../type';

export const useSendResetEmail = () => {
  return useMutation({
    mutationFn: (data: SendResetMaillValue) => sendResetEmail(data),
  });
};
