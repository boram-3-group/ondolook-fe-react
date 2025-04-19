import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { useForm, Controller } from 'react-hook-form';
import { moveNextProps, ProfileFormFields, ProfileFormResponse } from '../type';
import signUpStore from '../../../store/SignupStore';
import { useFetchSignup } from '../fetches/useFetchSignup';
import GenderChip from '../_components/GenderChip';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const ProfileForm = ({ onNext }: moveNextProps) => {
  const schema = z.object({
    nickname: z
      .string()
      .min(1, { message: '닉네임은 필수값입니다.' })
      .max(7, { message: '아이디는 최대 7자까지 가능합니다.' })
      .regex(
        /^(?:[a-zA-Z]{1,7}|[가-힣]{1,7}|[a-zA-Z]{1,7}[가-힣]{1,7}|[가-힣]{1,7}[a-zA-Z]{1,7})$/,
        '영문 또는 한글을 포함한 1~7자의 닉네임을 입력해주세요. 띄어쓰기는 불가능합니다.'
      )
      .regex(/^\S*$/, '닉네임에 띄어쓰기는 포함될 수 없습니다.'),
    gender: z.enum(['MALE', 'FEMALE', '']),
    birthYear: z.string().min(1, { message: '생년월일은 필수값입니다..' }),
    birthMonth: z.string().min(1, { message: '생년월일은 필수값입니다.' }),
    birthDay: z.string().min(1, { message: '생년월일은 필수값입니다.' }),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileFormFields>({
    resolver: zodResolver(schema),
  });
  const { username, password, setSignupForm } = signUpStore(state => state);
  const { mutate: signUp } = useFetchSignup();
  const genderList = [
    { label: '여성', value: 'FEMALE' },
    { label: '남성', value: 'MALE' },
  ];

  const onSubmit = (data: ProfileFormFields) => {
    const { birthYear, birthMonth, birthDay, ...rest } = data;

    const birthDateStr = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;
    const birthDate = new Date(birthDateStr);

    const profileData: ProfileFormResponse = {
      ...rest,
      birthDate,
    };

    const signUpData = {
      username,
      password,
      ...profileData,
    };

    console.log('회원가입data', signUpData);
    signUp(signUpData, {
      onSuccess: () => {
        setSignupForm(data);
        onNext();
      },
      onError: error => {
        console.error('회원가입 실패:', error);
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input type="text" placeholder="닉네임" {...register('nickname')} />
          {errors.nickname && <p>{errors.nickname.message}</p>}
        </div>
        <Controller
          name="gender"
          control={control}
          defaultValue="MALE"
          render={({ field }) => (
            <div>
              {genderList.map(gender => (
                <GenderChip
                  key={gender.value}
                  value={gender.value}
                  label={gender.label}
                  isActive={field.value === gender.value}
                  onClick={() => field.onChange(gender.value)}
                />
              ))}
            </div>
          )}
        />
        <div>
          <Input type="text" placeholder="YYYY" {...register('birthYear')}></Input>
          <Input type="text" placeholder="MM" {...register('birthMonth')}></Input>
          <Input type="text" placeholder="DD" {...register('birthDay')}></Input>
        </div>
        <Button intent="primary" size="medium" type="submit">
          회원가입
        </Button>
      </form>
    </>
  );
};

export default ProfileForm;
