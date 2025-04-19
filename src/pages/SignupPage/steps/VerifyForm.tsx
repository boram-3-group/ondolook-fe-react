import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { FormLayout } from '../_components/FormLayout';
import { moveNextProps } from '../type';

const VerifyForm = ({ onNext }: moveNextProps) => {
  return (
    <>
      <FormLayout title={`휴대폰정보를 입력해주세요`}>
        <Input type="text" placeholder="-없이 입력해주세요."></Input>
        <Input type="text" placeholder="번호"></Input>
        <Button intent="primary" size="medium" type="submit" onClick={onNext}>
          인증번호 받기
        </Button>
      </FormLayout>
    </>
  );
};

export default VerifyForm;
