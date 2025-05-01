export type SendResetMaillValue = {
  username: string;
  callbackUrl: string;
};

export type ResetPasswordValue = {
  verificationCode: string | null;
  username: string | null;
  newPassword: string;
};
