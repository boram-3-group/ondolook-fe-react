import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';

export const OauthCallbackPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithSocial, setUser, setAccessToken } = useUserStore();

  useEffect(() => {
    const stateId = params.get('stateId');
    const device = params.get('provider') as 'kakao' | 'google';
    if (!stateId || !device) return;
    (async () => {
      try {
        const response = await loginWithSocial({ device });

        if (response.status === 200) {
          const { profile, access } = response.data;
          setUser(profile);
          setAccessToken(access);

          if (profile.gender && profile.birthDate && profile.nickname) {
            navigate('/home');
            return;
          }
        }

        await new Promise(resolve => setTimeout(resolve, 500));
        navigate('/signup?step=2&socialType=' + device);
      } catch (err) {
        console.error('소셜 로그인 실패', err);
        navigate('/');
      }
    })();
  }, []);

  return <div>...</div>;
};
