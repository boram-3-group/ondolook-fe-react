import { Button } from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../store/useUserStore';

const SignupSuccess = () => {
  const username = useUserStore(state => state.user?.username);

  const navigate = useNavigate();
  const handlemovetoLogin = () => {
    navigate('/login/form');
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[180px] mx-4">
        <img src="/signupSuccess.svg" className="width-[228px] height-[239px]" />
        <p className="text-Body2 text-primary-40">가입 완료!</p>
        <div className="text-Display mt-1">{username}님, 환영해요</div>
        <Button
          className="w-full"
          intent="primary"
          size="medium"
          type="submit"
          onClick={handlemovetoLogin}
        >
          로그인하러 가기
        </Button>
      </div>
    </>
  );
};

export default SignupSuccess;
