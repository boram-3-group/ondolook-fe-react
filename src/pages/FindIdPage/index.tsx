import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FormLayout } from '../../components/common/FormLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useSendFindIdEmailCode, useVerifyFindIdEmailCode } from './fetches/useFindId';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Timer } from '../../components/common/Timer';

const FindIdPage = () => {
  const schema = z.object({
    email: z
      .string()
      .min(1, { message: '이메일은 필수값입니다.' })
      .email({ message: '유효한 이메일 형식을 입력해주세요.' }),
    code: z
      .string()
      .min(1, { message: '인증번호는 필수값입니다.' })
      .length(6, { message: '6자리 인증번호를 입력해주세요.' }),
  });
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

  const email = watch('email');
  const code = watch('code');

  const onSubmit = () => {
    if (!isCodeSent) {
      sendFindIdEmailCode(email, {
        onSuccess: () => {
          setIsCodeSent(true);
          setIsTimerStart(true);
        },
      });
      setIsCodeSent(true);
    } else {
      verifyFindIdEmailCode(code, {
        onSuccess: data => {
          navigate('/find-id/success', {
            state: {
              username: data,
            },
          });
        },
      });
    }
  };

  return (
    <>
      <FormLayout title={`이메일 확인 후\n 인증번호를 입력해주세요.`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[16px] mt-[42px]">
            <Input type="text" placeholder="이메일을 입력해주세요" {...register('email')}></Input>
            {errors.email && <p className="text-Detail text-danger-50">{errors.email.message}</p>}
            <div className="relative">
              <Input
                type="text"
                placeholder="인증번호 입력"
                {...register('code')}
                className="pr-4"
              />
              {isTimerStart && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Timer />
                </div>
              )}
            </div>
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
