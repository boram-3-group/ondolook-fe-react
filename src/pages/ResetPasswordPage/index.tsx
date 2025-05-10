import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FormLayout } from '../../components/common/FormLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useSendResetEmail, useVerifytToResetEmail } from './fetches/useResetEmail';
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
  const [verifyError, setVerifyError] = useState('');
  const [sendEmailError, setSendEmailError] = useState('');
  const [timerKey, setTimerKey] = useState(0); // Timer 재시작용
  const [isExpired, setIsExpired] = useState(false);
  const navigate = useNavigate();

  const username = watch('username');
  const email = watch('email');
  const code = watch('code');
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  useEffect(() => {
    setSendEmailError('');
    setVerifyError('');
  }, [email, code]);

  const onSubmit = () => {
    if (!isCodeSent) {
      sendResetEmail(
        { username, email },
        {
          onSuccess: () => {
            setIsCodeSent(true);
            setIsTimerStart(true);
          },
          onError: error => {
            setSendEmailError('등록되지 않은 계정입니다');
            console.error('로그인실패', error);
          },
        }
      );
    } else if (isExpired) {
      // 타이머 만료 후 재전송
      sendResetEmail(
        { username, email },
        {
          onSuccess: () => {
            setSendEmailError('');
            setTimerKey(prev => prev + 1);
            setIsExpired(false);
          },
          onError: error => {
            setSendEmailError('등록되지 않은 계정입니다.');
            console.error('재전송 실패', error);
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
          onError: (error: any) => {
            setVerifyError(error.message);
          },
        }
      );
    }
  };

  const getButtonLabel = () => {
    if (isCodeSent && isExpired) return '재전송';
    if (isCodeSent) return '인증 확인';
    return '인증번호 받기';
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
            {sendEmailError && <p className="text-Detail text-danger-50">{sendEmailError}</p>}
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
                  <Timer key={timerKey} onExpire={() => setIsExpired(true)} />
                </div>
              )}
              {verifyError && <p className="text-Detail text-danger-50 mt-2">{verifyError}</p>}
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
              {getButtonLabel()}
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
