import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { useForm, Controller } from 'react-hook-form';
import { moveNextProps, ProfileFormResponse } from '../type';
import signUpStore from '../../../store/SignupStore';
import { SelectBox } from '../../../components/common/SelectBox';
import { useFetchSignup } from '../fetches/useFetchSignup';

const ProfileForm = ({ onNext }: moveNextProps) => {
  const { register, handleSubmit, control } = useForm<ProfileFormResponse>();
  const { username, password, setSignupForm } = signUpStore(state => state);
  const { mutate: signUp } = useFetchSignup();

  const onSubmit = (data: ProfileFormResponse) => {
    const signUpData = {
      username,
      password,
      ...data,
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
        <Input type="text" placeholder="닉네임" {...register('nickname')} />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <SelectBox
              selectItems={[
                { label: '여성', value: 'FEMALE' },
                { label: '남성', value: 'MALE' },
              ]}
              placeholder="성별 선택"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Input type="date" placeholder="생년월일" {...register('birthDate')} />
        <Button intent="primary" size="medium" type="submit">
          회원가입
        </Button>
      </form>
    </>
  );
};

export default ProfileForm;
