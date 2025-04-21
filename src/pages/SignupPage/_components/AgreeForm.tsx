import { useState } from 'react';
import { CheckBox } from '../../../components/common/CheckBox';
import { Button } from '../../../components/common/Button';

export const AgreeForm = () => {
  const [AgreedList, setAgreedList] = useState<string[]>([]);
  const agreeList = [
    { id: 'terms1', label: '(필수) 서비스 이용약관 동의', link: true },
    { id: 'terms2', label: '(필수) 개인정보 수집 및 이용 동의', link: true },
    { id: 'terms3', label: '(선택) 마케팅 수신 동의' },
  ];

  const onSingleCheck = (id: string) => {
    if (AgreedList.includes(id)) {
      const updatedList = AgreedList.filter(item => item !== id);
      setAgreedList(updatedList);
    } else {
      setAgreedList(prev => [...prev, id]);
    }
  };

  const allIds = agreeList.map(item => item.id);
  const isAllChecked = AgreedList.length === agreeList.length;

  const onAllCheck = () => {
    if (isAllChecked) {
      setAgreedList([]);
    } else {
      setAgreedList(allIds);
    }
  };

  const handleSubmitAgree = () => {
    console.log('AgreedList', AgreedList);
  };

  return (
    <>
      <div>
        <CheckBox label="모두 동의합니다." checked={isAllChecked} onChange={onAllCheck}></CheckBox>
        {agreeList.map(agreeItem => (
          <CheckBox
            label={agreeItem.label}
            checked={AgreedList.includes(agreeItem.id)}
            onChange={() => onSingleCheck(agreeItem.id)}
            link={agreeItem.link}
          ></CheckBox>
        ))}
        <Button intent="primary" size="medium" type="submit" onClick={handleSubmitAgree}>
          동의하고 가입하기
        </Button>
      </div>
    </>
  );
};
