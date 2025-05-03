import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';

export const OauthCallbackPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithSocial } = useUserStore();

  useEffect(() => {
    const stateId = params.get('stateId');
    const device = params.get('provider') as 'kakao' | 'google';
    if (!stateId || !device) return;
    (async () => {
      try {
        const response = await loginWithSocial({ device });
        console.log('Login Response:', response);
        console.log('Cookies:', document.cookie);

        // 세션이 설정될 때까지 잠시 대기
        await new Promise(resolve => setTimeout(resolve, 1000));

        navigate('/signup?step=2&socialType=' + device);
      } catch (err) {
        console.error('소셜 로그인 실패', err);
        navigate('/');
      }
    })();
  }, []);

  return <div>...</div>;
};
