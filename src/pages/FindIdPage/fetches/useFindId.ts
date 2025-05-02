import { useMutation } from '@tanstack/react-query';
import { SendFindIdEmailValue, VerifyFindIdEmailValue } from '../type';
import { sendFindIdEmailCode, verifyFindIdEmailCode } from '../apis';

export const useSendFindIdEmailCode = () => {
  return useMutation({
    mutationFn: (email: SendFindIdEmailValue) => sendFindIdEmailCode(email),
  });
};

export const useVerifyFindIdEmailCode = () => {
  return useMutation({
    mutationFn: (code: VerifyFindIdEmailValue) => verifyFindIdEmailCode(code),
  });
};
