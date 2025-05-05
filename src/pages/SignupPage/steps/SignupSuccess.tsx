import { Button } from '../../../components/common/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUserStore } from '../../../store/useUserStore';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

const SignupSuccess = () => {
  const [params] = useSearchParams();
  const socialType = params.get('socialType');

  const nickname = useUserStore(state => state.user?.nickname);

  const navigate = useNavigate();
  const handlemovetoLogin = () => {
    if (socialType) {
      navigate('/home');
    } else {
      navigate('/login/form');
    }
  };

  useEffect(() => {
    toast.success(`${nickname}님, 환영합니다! 🎉`);
  }, [nickname]);

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[180px] mx-4">
        <img src="/signupSuccess.svg" className="width-[228px] height-[239px]" />
        <div className="text-Body2 text-primary-40">가입 완료!</div>
        <div className="text-Display">{nickname}님, 환영해요</div>
        <Button
          intent="primary"
          size="large"
          className="absolute left-1/2 bottom-5 -translate-x-1/2 w-[calc(100%-40px)]"
          type="submit"
          onClick={handlemovetoLogin}
        >
          {socialType ? '온도룩 시작하기' : '로그인하러 가기'}
        </Button>
      </div>
    </>
  );
};

export default SignupSuccess;
