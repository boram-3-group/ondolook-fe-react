import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../core/axios';
import { getUserDeviceId } from '../core/helper';
import { SignUpResponse } from '../pages/SignupPage/type';
import { AxiosResponse } from 'axios';

export interface User {
  userId: string;
  username: string;
  password: string;
  gender: string;
  birthDate: string;
  loginType: string;
  email: string;
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
  agreedToMarketing: boolean;
  nickname: string;
}

export interface UserStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  isLoggedIn: () => boolean;
  logout: () => Promise<void>;
  oauthRedirect: (provider: 'kakao' | 'google') => void;
  loginWithSocial: (payload: { device: 'kakao' | 'google' }) => Promise<AxiosResponse>;
  setSignupForm: (data: Partial<SignUpResponse>) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,

      setUser: user => set({ user }),
      isLoggedIn: () => !!get().user,
      logout: async () => {
        try {
          await api.service.post('/auth/logout', null, {
            withCredentials: true,
          });
          set({ user: null });
        } catch (err: unknown) {
          console.error('로그아웃 실패:', err);
        }
      },

      setSignupForm: data =>
        set(state => ({
          user: {
            ...state.user,
            ...data,
          } as User,
        })),

      oauthRedirect: provider => {
        const deviceId = getUserDeviceId();
        const currentDomain = window.location.origin;
        const callbackUrl = encodeURIComponent(
          `${currentDomain}/login/oauth-callback?stateId=${deviceId}&provider=${provider}`
        );
        window.location.href = `${
          import.meta.env.VITE_APP_API_BASE_URL
        }/oauth/oidc/${provider}?callbackUrl=${callbackUrl}`;
      },

      loginWithSocial: async ({ device }) => {
        try {
          set({ loading: true, error: null });
          const deviceId = getUserDeviceId();
          const response = await api.service.post(`/oauth/issue/${deviceId}`, null, {
            headers: { 'X-DEVICE-ID': device },
            withCredentials: true,
          });
          console.log('Login Response:', response);
          console.log('Cookies:', document.cookie);
          return response;
        } catch (err: unknown) {
          set({ error: '소셜 로그인 실패 ' + err });
          throw err;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'user-storage',
      partialize: state => ({
        user: state.user,
      }),
    }
  )
);
