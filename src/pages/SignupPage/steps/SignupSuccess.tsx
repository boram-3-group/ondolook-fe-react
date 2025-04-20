import signUpStore from '../../../store/SignupStore';

const SignupSuccess = () => {
  const { username } = signUpStore(state => state);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <img src="/signupSuccess.svg" className="" />
        <p className="text-Body2 text-primary-40">가입 완료!</p>
        <div>{username}님, 환영해요</div>
      </div>
    </>
  );
};

export default SignupSuccess;
