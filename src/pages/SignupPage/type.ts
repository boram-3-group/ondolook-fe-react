export type AccountFormResponse = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type ProfileFormFields = {
  gender: 'MALE' | 'FEMALE' | '';
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  nickname: string;
};

export type ProfileFormResponse = {
  nickname: string;
  gender: 'MALE' | 'FEMALE' | '';
  birthDate: Date | null;
};

export type moveNextProps = {
  onNext: () => void;
};

export type SendEmailValue = {
  email: string;
};

export type VerifyEmailValue = {
  email: string;
  code: string;
};

export type SignUpResponse = Omit<AccountFormResponse, 'confirmPassword'> & ProfileFormResponse;
