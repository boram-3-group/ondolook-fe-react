import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useForm } from 'react-hook-form';
import { FormLayout } from '../../components/common/FormLayout';

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: unknown) => {
    console.log('로그인', data);
  };

  return (
    <>
      <FormLayout
        title={`안녕하세요. \n온도룩입니다.`}
        description={`회원 서비스 이용을 위해 로그인 해주세요.`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input type="text" placeholder="아이디를 입력해주세요" {...register('usernamee')} />
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register('password')}
            />
          </div>
          <Button intent="primary" size="medium" type="submit">
            로그인하기
          </Button>
        </form>

        <div className="flex items-center">
          <Button intent="link" onClick={() => navigate('/signup')}>
            아이디 찾기
          </Button>
          <div>
            <img src="/Rectangle.png" alt="" className="" />
          </div>
          <Button intent="link" onClick={() => navigate('/signup')}>
            비밀번호 찾기
          </Button>
          <div>
            <img src="/Rectangle.png" alt="" className="" />
          </div>
          <Button intent="link" onClick={() => navigate('/signup')}>
            회원가입
          </Button>
        </div>
      </FormLayout>
    </>
  );
};

export default LoginPage;
