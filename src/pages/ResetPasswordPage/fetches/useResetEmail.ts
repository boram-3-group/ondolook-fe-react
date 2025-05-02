import { useMutation } from '@tanstack/react-query';
import { sendResetEmail, verifytToResetEmail } from '../apis';
import { SendResetMaillValue, VerifyResetMaillValue } from '../type';

export const useSendResetEmail = () => {
  return useMutation({
    mutationFn: (data: SendResetMaillValue) => sendResetEmail(data),
  });
};

export const useVerifytToResetEmail = () => {
  return useMutation({
    mutationFn: (data: VerifyResetMaillValue) => verifytToResetEmail(data),
  });
};
