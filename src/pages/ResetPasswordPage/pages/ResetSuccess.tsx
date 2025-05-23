import { Navigate } from 'react-router-dom';
import { Button } from '../../../components/common/Button';
import { Icon } from '../../../components/common/Icon';
import { useNavigate } from 'react-router-dom';

const ResetSuccess = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mx-5">
        <div className="mt-[40px]">
          <Icon name="blue-check" width={36} height={36} alt="파란체크" />
        </div>
        <div className="text-Display whitespace-pre-line mt-[16px]">
          {`비밀번호가 성공적으로\n변경되었습니다.`}
        </div>
        <div className={'text-Body2 text-grayScale-60 whitespace-pre-line mt-[16px]'}>
          새로운 비밀번호로 로그인해주세요.
        </div>
        <Button
          onClick={() => navigate('/login/form')}
          className="absolute left-1/2 bottom-5 -translate-x-1/2 w-[calc(100%-40px)]"
          intent="primary"
          size="large"
          type="submit"
        >
          로그인하러가기
        </Button>
      </div>
    </>
  );
};

export default ResetSuccess;
