import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { useForm } from 'react-hook-form';
import { AccountFormResponse, moveNextProps } from '../type';
import signUpStore from '../../../store/SignupStore';

const AccountForm = ({ onNext }: moveNextProps) => {
  const { register, handleSubmit } = useForm<AccountFormResponse>();
  const setSignupForm = signUpStore(state => state.setSignupForm);

  const onSubmit = (data: AccountFormResponse) => {
    setSignupForm(data);
    onNext();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="아이디" {...register('username')} />
        <Input type="password" placeholder="비밀번호" {...register('password')} />
        <Input type="password" placeholder="비밀번호 확인" />
        <Button intent="primary" size="medium" type="submit">
          다음
        </Button>
      </form>
    </>
  );
};

export default AccountForm;
