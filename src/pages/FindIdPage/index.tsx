import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FormLayout } from '../../components/common/FormLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useSendFindIdEmailCode, useVerifyFindIdEmailCode } from './fetches/useFindId';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Timer } from '../../components/common/Timer';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일은 필수값입니다.' })
    .email({ message: '유효한 이메일 형식을 입력해주세요.' }),
  code: z.string(),
});

const FindIdPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const { mutate: sendFindIdEmailCode } = useSendFindIdEmailCode();
  const { mutate: verifyFindIdEmailCode } = useVerifyFindIdEmailCode();

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [sendEmailError, setSendEmailError] = useState('');
  const [timerKey, setTimerKey] = useState(0); // Timer 재시작용
  const [isExpired, setIsExpired] = useState(false);

  const email = watch('email');
  const code = watch('code');
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  useEffect(() => {
    setSendEmailError('');
    setVerifyError('');
  }, [email, code]);

  const getButtonLabel = () => {
    if (isCodeSent && isExpired) return '인증번호 다시 받기';
    if (isCodeSent) return '인증 확인';
    return '인증번호 받기';
  };

  const onSubmit = () => {
    if (!isCodeSent) {
      // 최초 이메일 전송
      sendFindIdEmailCode(email, {
        onSuccess: () => {
          setIsCodeSent(true);
          setIsTimerStart(true);
          setSendEmailError('');
          setTimerKey(prev => prev + 1);
          setIsExpired(false);
        },
        onError: error => {
          setSendEmailError('등록되지 않은 계정입니다.');
          console.error('이메일 전송 실패', error);
        },
      });
    } else if (isExpired) {
      // 타이머 만료 후 재전송
      sendFindIdEmailCode(email, {
        onSuccess: () => {
          setSendEmailError('');
          setTimerKey(prev => prev + 1);
          setIsExpired(false);
        },
        onError: error => {
          setSendEmailError('등록되지 않은 계정입니다.');
          console.error('재전송 실패', error);
        },
      });
    } else {
      // 인증번호 확인
      verifyFindIdEmailCode(code, {
        onSuccess: data => {
          navigate('/find-id/success', {
            state: {
              username: data,
            },
          });
        },
        onError: (error: any) => {
          setVerifyError(error.message);
        },
      });
    }
  };

  return (
    <FormLayout title={`이메일 확인 후\n 인증번호를 입력해주세요.`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[16px] mt-[42px]">
          <Input type="text" placeholder="이메일을 입력해주세요" {...register('email')} />
          <p className="text-Detail text-danger-50">{errors.email?.message || sendEmailError}</p>
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
            {verifyError && <p className="text-Detail text-danger-50">{verifyError}</p>}
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
  );
};

export default FindIdPage;
