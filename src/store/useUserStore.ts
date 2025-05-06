import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import { api } from '../core/axios';
import { getUserDeviceId } from '../core/helper';
import { SignUpResponse } from '../pages/SignupPage/type';
import { AxiosResponse } from 'axios';
import { login } from '../pages/LoginPage/apis';

export interface User {
  id?: string;
  username: string;
  password: string;
  gender?: string;
  birthDate?: string;
  loginType?: string;
  email?: string;
  agreedToTerms?: boolean;
  agreedToPrivacy?: boolean;
  agreedToMarketing?: boolean;
  agreedToLocation?: boolean;
  nickname?: string;
  deviceId?: string;
}

type LoginType = 'social' | 'email' | null;
type SocialType = 'kakao' | 'google' | null;

export interface UserStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  deviceId: string | null;
  loginType: LoginType;
  socialType: SocialType;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setDeviceId: (id: string | null) => void;
  setLoginType: (type: LoginType) => void;
  setSocialType: (type: SocialType) => void;
  isLoggedIn: () => boolean;
  logout: () => Promise<void>;
  oauthRedirect: (provider: 'kakao' | 'google') => void;
  loginWithSocial: (payload: { device: 'kakao' | 'google' }) => Promise<AxiosResponse>;
  loginWithForm: (payload: { username: string; password: string }) => Promise<{ access: string }>;
  setSignupForm: (data: Partial<SignUpResponse>) => void;
  checkLogin: () => Promise<boolean>;
}

type PersistedUserStore = {
  user: User | null;
  accessToken: string | null;
  deviceId: string | null;
  loginType: LoginType;
  socialType: SocialType;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      accessToken: null,
      deviceId: null,
      loginType: null,
      socialType: null,

      setUser: user => {
        console.log('user', user);
        set({ user });
      },
      setAccessToken: token => set({ accessToken: token }),
      setDeviceId: id => set({ deviceId: id }),
      setLoginType: type => set({ loginType: type }),
      setSocialType: type => set({ socialType: type }),
      isLoggedIn: () =>
        !!get().user && !!get().accessToken && (!!get().deviceId || get().loginType === 'email'),
      logout: async () => {
        try {
          set({ user: null, accessToken: null, deviceId: null, loginType: null });
          localStorage.clear();
          sessionStorage.clear();
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
        set({ deviceId, loginType: 'social' });
        const currentDomain = window.location.origin;
        const callbackUrl = encodeURIComponent(
          `${currentDomain}/login/oauth-callback?stateId=${deviceId}&provider=${provider}`
        );
        window.location.href = `${
          import.meta.env.VITE_APP_API_BASE_URL
        }/oauth/oidc/${provider}?callbackUrl=${callbackUrl}`;
      },

      loginWithSocial: async ({ device }: { device: 'kakao' | 'google' }) => {
        try {
          set({ socialType: device });
          set({ loading: true, error: null });
          const deviceId = get().deviceId || getUserDeviceId();
          const response = await api.service.post(`/oauth/issue/${deviceId}`, null, {
            headers: { 'X-DEVICE-ID': device },
            withCredentials: true,
          });
          return response;
        } catch (err: unknown) {
          set({ error: '소셜 로그인 실패 ' + err });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      loginWithForm: async ({ username, password }) => {
        try {
          set({ loading: true, error: null });
          const response = await login({ username, password });
          return response;
        } finally {
          set({ loading: false });
        }
      },

      checkLogin: async () => {
        try {
          const { loginType } = get();

          if (loginType === 'social') {
            const response = await get().loginWithSocial({
              device: get().socialType as 'kakao' | 'google',
            });

            if (response.status === 200) {
              const { profile, access } = response.data;
              set({ user: profile, accessToken: access });
              return true;
            }
          } else if (loginType === 'email') {
            // 이메일 로그인 체크
            const username = get().user?.username;
            const password = get().user?.password;

            if (!username || !password) return false;

            const response = await get().loginWithForm({
              username,
              password,
            });

            if (response.access) {
              const { access } = response;
              get().setAccessToken(access);
              get().setLoginType('email');
              get().setUser({
                username,
                password,
              });
              return true;
            }
          }
          return false;
        } catch (err) {
          console.error('로그인 체크 실패:', err);
          return false;
        }
      },
    }),
    {
      name: 'user-storage',
      storage: {
        getItem: name => {
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: name => {
          localStorage.removeItem(name);
        },
      } as PersistStorage<PersistedUserStore>,
      partialize: state => ({
        user: state.user,
        accessToken: state.accessToken,
        deviceId: state.deviceId,
        loginType: state.loginType,
        socialType: state.socialType,
      }),
    }
  )
);
