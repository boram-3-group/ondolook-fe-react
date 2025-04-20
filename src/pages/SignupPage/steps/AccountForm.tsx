import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { useForm } from 'react-hook-form';
import { AccountFormResponse, moveNextProps } from '../type';
import signUpStore from '../../../store/SignupStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormLayout } from '../../../components/common/FormLayout';

const AccountForm = ({ onNext }: moveNextProps) => {
  const schema = z
    .object({
      username: z
        .string()
        .min(1, { message: '아이디는 필수값입니다.' })
        .min(6, { message: '아이디는 최소 6자 이상이어야 합니다.' })
        .max(12, { message: '아이디는 최대 12자까지 가능합니다.' })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,12}$/,
          '영문 대소문자와 숫자를 포함한 6~12자의 아이디를 입력해주세요.'
        ),
      password: z
        .string()
        .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
        .max(14, { message: '비밀번호는 최대 14자까지 가능합니다.' })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]).{8,14}$/, {
          message: '영문, 숫자, 특수문자를 모두 포함한 8~14자의 비밀번호를 입력해주세요.',
        }),
      confirmPassword: z.string().min(1, '비밀번호 확인은 필수입니다.'),
    })
    .refine(data => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: '비밀번호가 일치하지 않습니다.',
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<AccountFormResponse>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const setSignupForm = signUpStore(state => state.setSignupForm);

  const onSubmit = (data: AccountFormResponse) => {
    const { confirmPassword, ...AccountFormdata } = data;
    setSignupForm(AccountFormdata);
    onNext();
  };

  return (
    <>
      <FormLayout title={`아이디와 비밀번호를 \n 입력해주세요`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="">
              <label className="text-Body2">아이디</label>
            </div>
            <Input
              type="text"
              placeholder="영문 대소문자와 숫자를 포함한 6~12자"
              {...register('username')}
            />
            {errors.username ? (
              <p className="text-Detail text-danger-50">{errors.username.message}</p>
            ) : (
              watch('username') && (
                <p className="text-Detail text-primary-40">사용 가능한 아이디입니다.</p>
              )
            )}
          </div>
          <div>
            <div className="">
              <label className="text-Body2">비밀번호</label>
            </div>
            <Input type="password" placeholder="영문, 숫자 포함 8~16자" {...register('password')} />
            {errors.password ? (
              <p className="text-Detail text-danger-50">{errors.password.message}</p>
            ) : (
              watch('password') && (
                <p className="text-Detail text-primary-40">사용 가능한 비밀번호입니다.</p>
              )
            )}
          </div>
          <div>
            <div className="">
              <label className="text-Body2">비밀번호 확인</label>
            </div>
            <Input
              type="password"
              placeholder="비밀번호를 한번 더 입력해 주세요"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword ? (
              <p className="text-Detail text-danger-50">{errors.confirmPassword.message}</p>
            ) : (
              watch('confirmPassword') && (
                <p className="text-Detail text-primary-40">비밀번호가 일치합니다.</p>
              )
            )}
          </div>
          <Button intent="primary" size="medium" type="submit">
            다음
          </Button>
        </form>
      </FormLayout>
    </>
  );
};

export default AccountForm;
