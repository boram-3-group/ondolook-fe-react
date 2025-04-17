import { Button } from '../../../components/common/Button';
import { moveNextProps } from '../type';

const VerifyForm = ({ onNext }: moveNextProps) => {
  return (
    <>
      <h1>verify</h1>
      <Button intent="primary" size="medium" type="submit" onClick={onNext}>
        확인
      </Button>
    </>
  );
};

export default VerifyForm;
