import { useMutation } from '@tanstack/react-query';
import { SendEmailValue, VerifyEmailValue } from '../type';
import { sendEmailCode, verifyEmailCode } from '../apis';

export const useSendEmailCode = () => {
  return useMutation({
    mutationFn: (email: SendEmailValue) => sendEmailCode(email),
  });
};

export const useVerifyEmailCode = () => {
  return useMutation({
    mutationFn: (data: VerifyEmailValue) => verifyEmailCode(data),
  });
};
