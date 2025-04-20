import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { FormLayout } from '../../../components/common/FormLayout';
import { moveNextProps } from '../type';

const VerifyForm = ({ onNext }: moveNextProps) => {
  return (
    <>
      <FormLayout title={`안녕하세요! \n 이메일 주소를 입력해주세요`}>
        <Input type="text" placeholder="이메일주소를 입력해주세요"></Input>
        <Input type="text" placeholder="인증번호 입력"></Input>
        <div>
          <Button intent="primary" size="medium" type="submit" onClick={onNext}>
            인증번호 받기
          </Button>
        </div>
      </FormLayout>
    </>
  );
};

export default VerifyForm;
