import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormLayout } from '../../../components/common/FormLayout';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';
import { useResetPassword } from '../fetches/useResetPassword';
import { useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const NewPassword = () => {
  const schema = z
    .object({
      password: z
        .string()
        .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
        .max(14, { message: '비밀번호는 최대 14자까지 가능합니다.' })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]).{8,14}$/, {
          message: '비밀번호 형식이 올바르지 않습니다.',
        }),
      confirmPassword: z.string().min(1, '비밀번호 확인은 필수입니다.'),
    })
    .refine(data => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: '비밀번호가 일치하지 않습니다.',
    });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { mutate: resetPassword } = useResetPassword();

  const newPassword = watch('password');
  const location = useLocation();
  const username = location.state?.username;
  const verificationCode = location.state?.code;

  const onSubmit = () => {
    resetPassword(
      { verificationCode, username, newPassword },
      {
        onSuccess: () => {
          navigate('/reset-password/success');
        },
      }
    );
  };
  return (
    <>
      <FormLayout title={`비밀번호를 새로 설정해주세요.`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col gap-2 mt-[20px]">
              <label className="text-Body2 text-grayScale-80">새 비밀번호</label>
              <Input type="text" placeholder="영문, 숫자 포함 8~16자" {...register('password')} />
              {errors.password ? (
                <p className="text-Detail text-danger-50">{errors.password.message}</p>
              ) : (
                watch('password') && (
                  <p className="text-Detail text-primary-50">사용 가능한 비밀번호입니다.</p>
                )
              )}
            </div>
            <div className="flex flex-col gap-2 mt-[20px] mb-[42px]">
              <label className="text-Body2 text-grayScale-80">새 비밀번호 확인</label>
              <Input
                type="password"
                placeholder="비밀번호를 한 번 더 입력해 주세요"
                className="mt-4"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword ? (
                <p className="text-Detail text-danger-50">{errors.confirmPassword.message}</p>
              ) : (
                watch('confirmPassword') && (
                  <p className="text-Detail text-primary-50">비밀번호가 일치합니다.</p>
                )
              )}
            </div>
            <Button
              className="w-full"
              intent={isValid ? 'primary' : 'disabled'}
              size="large"
              type="submit"
              disabled={!isValid}
            >
              비밀번호 변경
            </Button>
          </div>
        </form>
      </FormLayout>
    </>
  );
};

export default NewPassword;
