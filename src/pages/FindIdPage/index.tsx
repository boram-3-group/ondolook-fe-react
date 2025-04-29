import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FormLayout } from '../../components/common/FormLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useSendEmailCode, useVerifyEmailCode } from '../SignupPage/fetches/useFetchEmail';

const FindIdPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { mutate: sendEmailCode } = useSendEmailCode();
  const { mutate: verifyEmailCode } = useVerifyEmailCode();
  const [isCodeSent, setIsCodeSent] = useState(false);

  const email = watch('email');
  const code = watch('code');

  const onSubmit = () => {
    if (!isCodeSent) {
      //   sendEmailCode(email, {
      //     onSuccess: () => setIsCodeSent(true),
      //   });
      setIsCodeSent(true);
    } else {
      //   verifyEmailCode(
      //     { email, code },
      //     {
      //       onSuccess: () => navigate('/find-id/success'),
      //     }
      //   );
      navigate('/find-id/success');
    }
  };

  return (
    <>
      <FormLayout title={`이메일 확인 후\n 인증번호를 입력해주세요.`}>
        <form onSubmit={handleSubmit(onSubmit)}>
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

export default FindIdPage;
