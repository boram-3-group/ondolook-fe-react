import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { FormLayout } from '../../../components/common/FormLayout';
import { moveNextProps } from '../type';
import { useSendEmailCode, useVerifyEmailCode } from '../fetches/useFetchEmail';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AgreeForm } from '../_components/AgreeForm';
import { useUserStore } from '../../../store/useUserStore';
import { Timer } from '../../../components/common/Timer';

const VerifyForm = ({ onNext }: moveNextProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate: sendEmailCode } = useSendEmailCode();
  const { mutate: verifyEmailCode } = useVerifyEmailCode();
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isAgreeFormOpen, setIsAgreeFormOpen] = useState(false);
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [Error, setError] = useState('');
  const email = watch('email');
  const code = watch('code');
  const setSignupForm = useUserStore(state => state.setSignupForm);

  const onSubmit = () => {
    if (!isCodeSent) {
      sendEmailCode(email, {
        onSuccess: () => {
          setIsCodeSent(true);
          setIsTimerStart(true);
        },
        onError: () => {},
      });
    } else {
      verifyEmailCode(
        { email, code },
        {
          onSuccess: () => {
            setSignupForm({ email });
            setIsAgreeFormOpen(true);
            onNext();
          },
          onError: error => {
            const message = error.name;
            console.log(message);
          },
        }
      );
    }
  };

  return (
    <>
      <FormLayout title={`이메일 인증을 완료해주세요.`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[16px]">
            <Input type="text" placeholder="이메일을 입력해주세요" {...register('email')}></Input>

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
      {isAgreeFormOpen && <AgreeForm onNext={onNext} />}
    </>
  );
};

export default VerifyForm;
