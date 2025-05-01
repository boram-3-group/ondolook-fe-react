import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FormLayout } from '../../components/common/FormLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useSendEmailCode, useVerifyEmailCode } from '../SignupPage/fetches/useFetchEmail';
import { sendResetEmail } from './apis';
import { useSendResetEmail } from './fetches/useSendResetEmail';

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate: sendResetEmail } = useSendResetEmail();
  const [isCodeSent, setIsCodeSent] = useState(false);

  const username = watch('username');
  const callbackUrl = 'https://www.ondolook.click/reset-password/newpassword';

  const onSubmit = () => {
    sendResetEmail({ username, callbackUrl });
  };

  return (
    <>
      <FormLayout title={`아이디와 이메일을 인증해주세요.`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-[46px]">
            <div className="mb-[10px]">
              <label className="text-Body2 text-grayScale-80">아이디</label>
            </div>
            <Input type="text" placeholder="아이디를 입력해주세요" {...register('username')} />
          </div>
          <div className="mb-[10px]">
            <label className="text-Body2 text-grayScale-80">이메일</label>
          </div>
          <div className="flex flex-col gap-[16px]">
            <Input type="text" placeholder="이메일을 입력해주세요" {...register('email')}></Input>
            <Input type="text" placeholder="인증번호 입력" {...register('code')}></Input>
          </div>
          <div className="mt-[42px]">
            <Button className="w-full" intent="primary" size="large" type="submit">
              {isCodeSent ? '인증 확인' : '인증번호 받기'}
            </Button>
          </div>
          <div className="underline mt-[24px] text-LabelLink text-grayScale-50">
            인증번호가 오지 않았나요?
          </div>
        </form>
      </FormLayout>
    </>
  );
};

export default ResetPasswordPage;
