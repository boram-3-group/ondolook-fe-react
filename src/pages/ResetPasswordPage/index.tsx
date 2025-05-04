import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FormLayout } from '../../components/common/FormLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useSendResetEmail, useVerifytToResetEmail } from './fetches/useResetEmail';
import { verifytToResetEmail } from './apis';
import { Timer } from '../../components/common/Timer';

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate: sendResetEmail } = useSendResetEmail();
  const { mutate: verifytToResetEmail } = useVerifytToResetEmail();
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isTimerStart, setIsTimerStart] = useState(false);
  const navigate = useNavigate();

  const username = watch('username');
  const email = watch('email');
  const code = watch('code');
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const onSubmit = () => {
    if (!isCodeSent) {
      sendResetEmail(
        { username, email },
        {
          onSuccess: () => {
            setIsCodeSent(true);
            setIsTimerStart(true);
          },
        }
      );
    } else {
      verifytToResetEmail(
        { username, code },
        {
          onSuccess: () => {
            navigate('/reset-password/newpassword', {
              state: { username, code },
            });
          },
        }
      );
    }
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
            <div className="relative">
              <Input
                type="text"
                placeholder="인증번호 입력"
                {...register('code')}
                className="pr-4"
                disabled={!isCodeSent}
              />
              {isTimerStart && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Timer />
                </div>
              )}
            </div>
          </div>
          <div className="mt-[42px]">
            <Button
              className="w-full"
              intent={isEmailValid ? 'primary' : 'disabled'}
              size="large"
              type="submit"
              disabled={!isEmailValid}
            >
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
