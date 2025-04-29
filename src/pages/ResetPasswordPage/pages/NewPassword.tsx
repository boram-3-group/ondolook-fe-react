import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormLayout } from '../../../components/common/FormLayout';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';

const NewPassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    navigate('/reset-password/success');
  };
  return (
    <>
      <FormLayout title={`비밀번호를 새로 설정해주세요.`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mb-[10px]">
              <label className="text-Body2 text-grayScale-80">새 비밀번호</label>
            </div>
            <Input type="text" placeholder="영문, 숫자 포함 8~16자" {...register('password')} />
            <div className="mt-[46px]">
              <label className="text-Body2 text-grayScale-80">새 비밀번호 확인</label>
            </div>
            <Input
              type="password"
              placeholder="비밀번호를 한 번 더 입력해 주세요"
              className="mt-4"
              {...register('confirmPassword')}
            />
            <Button intent="primary" size="large" type="submit" className="mt-[42px] w-full">
              비밀번호 변경
            </Button>
          </div>
        </form>
      </FormLayout>
    </>
  );
};

export default NewPassword;
