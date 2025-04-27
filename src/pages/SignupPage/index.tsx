import { useFunnel } from '../../hooks/useFunnel';
import AccountForm from './steps/AccountForm';
import ProfileForm from './steps/ProfileForm';
import VerifyForm from './steps/VerifyForm';
import SignupSuccess from './steps/SignupSuccess';
import { steps } from '../../core/constants';
import { useSearchParams } from 'react-router-dom';

const SignupPage = () => {
  const [params] = useSearchParams();
  const step = params.get('step');
  const { Funnel, moveNext } = useFunnel(steps, Number(step));

  return (
    <>
      <Funnel>
        <Funnel.Step name="인증">
          <VerifyForm onNext={moveNext}></VerifyForm>
        </Funnel.Step>
        <Funnel.Step name="계정입력">
          <AccountForm onNext={moveNext}></AccountForm>
        </Funnel.Step>
        <Funnel.Step name="프로필입력">
          <ProfileForm onNext={moveNext}></ProfileForm>
        </Funnel.Step>
        <Funnel.Step name="가입완료">
          <SignupSuccess></SignupSuccess>
        </Funnel.Step>
      </Funnel>
    </>
  );
};

export default SignupPage;
