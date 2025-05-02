export type SendResetMaillValue = {
  username: string;
  email: string;
};

export type VerifyResetMaillValue = {
  username: string;
  code: string;
};

export type ResetPasswordValue = {
  verificationCode: string | null;
  username: string | null;
  newPassword: string;
};
