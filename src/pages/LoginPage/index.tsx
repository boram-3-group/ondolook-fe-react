import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useForm } from 'react-hook-form';
import { FormLayout } from '../../components/common/FormLayout';
import { useFetchLogin } from './fetches/useLogin';
import { LoginFormValues } from './type';
import { useUserStore } from '../../store/useUserStore';
import { getUserProfile } from './apis';
import { useState } from 'react';
import { getFcmToken } from '../../firebase';
import { saveFcmToken } from '../MyPage/apis';

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const { setUser, setAccessToken, setLoginType, setSocialType } = useUserStore();
  const [loginError, setLoginError] = useState('');

  const { mutate: login } = useFetchLogin();

  const onSubmit = ({ username, password }: LoginFormValues) => {
    login(
      { username, password },
      {
        onSuccess: async data => {
          const accessToken = data.access;
          setAccessToken(accessToken);
          setLoginType('email');
          setSocialType(null);
          try {
            const userInfo = await getUserProfile();
            setUser({
              ...userInfo,
            });

            // Get new FCM token and save to server
            try {
              const fcmToken = await getFcmToken();
              await saveFcmToken(fcmToken);
            } catch (error) {
              console.error('FCM 토큰 저장 실패:', error);
            }

            navigate('/home');
          } catch (err) {
            console.error('사용자 정보 요청 실패', err);
          }
        },
        onError: error => {
          setLoginError('등록되지 않은 계정입니다.');
          console.error('로그인실패', error);
        },
      }
    );
  };

  return (
    <>
      <FormLayout
        title={`안녕하세요! \n온도룩입니다.`}
        description={`회원 서비스 이용을 위해 로그인 해주세요.`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input type="text" placeholder="아이디를 입력해주세요" {...register('username')} />
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              className="mt-4"
              {...register('password')}
            />
            {loginError && <p className="text-Detail text-danger-50 mt-2">{loginError}</p>}
            <Button intent="primary" size="large" type="submit" className="mt-[42px] w-full">
              로그인 하기
            </Button>
          </div>
        </form>

        <div className="mt-8 flex justify-center items-center text-grayScale-60">
          <Button intent="navigation" onClick={() => navigate('/find-id')}>
            아이디 찾기
          </Button>
          <img src="/Rectangle.png" alt="" className="w-[1px] h-[10px] bg-grayScale-40" />
          <Button intent="navigation" onClick={() => navigate('/reset-password')}>
            비밀번호 찾기
          </Button>
          <img src="/Rectangle.png" alt="" className="w-[1px] h-[10px] bg-grayScale-40" />
          <Button intent="navigation" onClick={() => navigate('/signup')}>
            회원가입
          </Button>
        </div>
      </FormLayout>
    </>
  );
};

export default LoginPage;
