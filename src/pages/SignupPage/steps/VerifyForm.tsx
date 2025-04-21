import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { FormLayout } from '../../../components/common/FormLayout';
import { moveNextProps } from '../type';

const VerifyForm = ({ onNext }: moveNextProps) => {
  return (
    <>
      <FormLayout title={`이메일 인증을 완료해주세요.`}>
        <div className="flex flex-col gap-[16px]">
          <Input type="text" placeholder="이메일을 입력해주세요"></Input>
          <Input type="text" placeholder="인증번호 입력"></Input>
        </div>
        <div className="mt-[42px]">
          <Button className="w-full" intent="primary" size="medium" type="submit" onClick={onNext}>
            인증번호 받기
          </Button>
        </div>
        <div className="underline mt-[24px] text-LabelLink text-grayScale-50">
          인증번호가 오지 않았나요?
        </div>
      </FormLayout>
    </>
  );
};

export default VerifyForm;
