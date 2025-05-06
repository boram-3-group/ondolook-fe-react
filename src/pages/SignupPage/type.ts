export type VerifyFormResponse = {
  email: string;
};

export type AgreeFormResponse = {
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
  agreedToMarketing: boolean;
  agreedToLocation: boolean;
};

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
  id?: string;
  nickname: string;
  gender: 'MALE' | 'FEMALE' | '';
  birthDate: string;
};

export type moveNextProps = {
  onNext: () => void;
};

export type VerifyEmailValue = {
  email: string;
  code: string;
};

export type SignUpResponse = Omit<AccountFormResponse, 'confirmPassword'> &
  ProfileFormResponse &
  AgreeFormResponse &
  VerifyFormResponse;
