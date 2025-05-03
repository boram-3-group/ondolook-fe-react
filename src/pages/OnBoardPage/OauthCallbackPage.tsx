import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';

export const OauthCallbackPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithSocial, setUser } = useUserStore();

  useEffect(() => {
    const stateId = params.get('stateId');
    const device = params.get('provider') as 'kakao' | 'google';
    if (!stateId || !device) return;
    (async () => {
      try {
        const response = await loginWithSocial({ device });

        if (response.status === 200) {
          const { profile } = response.data;
          setUser(profile);
          if (profile.gender && profile.birthDate && profile.nickname) {
            navigate('/home');
            console.log('소셜 로그인 성공');
            return;
          }
        }

        await new Promise(resolve => setTimeout(resolve, 200));
        navigate('/signup?step=2&socialType=' + device);
      } catch (err) {
        console.error('소셜 로그인 실패', err);
        navigate('/');
      }
    })();
  }, []);

  return <div>...</div>;
};
