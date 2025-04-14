import { create } from 'zustand';
import { SignUpResponse } from '../pages/SignupPage/type';

type signupStore = SignUpResponse & {
  setSignupForm: (data: Partial<SignUpResponse>) => void;
};

const signUpStore = create<signupStore>(set => ({
  username: '',
  password: '',
  gender: '',
  birthDate: null,
  nickname: '',
  setSignupForm: data => set(state => ({ ...state, ...data })),
}));

export default signUpStore;
