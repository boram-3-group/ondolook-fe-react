export type AccountFormResponse = {
  username: string;
  password: string;
};

export type ProfileFormResponse = {
  gender: 'MALE' | 'FEMALE' | '';
  birthDate: Date | null;
  nickname: string;
};

export type moveNextProps = {
  onNext: () => void;
};

export type SignUpResponse = AccountFormResponse & ProfileFormResponse;
