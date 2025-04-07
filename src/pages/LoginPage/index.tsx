import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log('로그인', data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input type="text" placeholder="아이디를 입력하세요" {...register('userId')} />
          <Input type="password" placeholder="비밀번호를 입력하세요" {...register('password')} />
        </div>
        <Button intent="primary" size="medium" type="submit">
          로그인
        </Button>
      </form>

      <div>
        <Button intent="secondary" size="medium" onClick={() => alert('구글로그인')}>
          구글로그인
        </Button>

        <Button intent="link" onClick={() => navigate('/signup')}>
          회원가입
        </Button>
      </div>
    </>
  );
};

export default LoginPage;
