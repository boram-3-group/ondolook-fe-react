import { FormLayout } from '../../../components/common/FormLayout';
import { Button } from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const FindIdSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <FormLayout title={`회원님의 아이디는\n 다음과 같습니다.`}>
        <div className="px-[118px] py-[38px] rounded-xl bg-grayScale-5 items-center text-center text-Body1">
          ondolook2025
        </div>
        <div className="mt-4">
          <Button
            className="w-full"
            intent="primary"
            size="large"
            type="submit"
            onClick={() => navigate('/login/form')}
          >
            로그인하러가기
          </Button>
        </div>
      </FormLayout>
    </>
  );
};

export default FindIdSuccess;
