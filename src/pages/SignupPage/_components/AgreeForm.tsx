import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CheckBox } from '../../../components/common/CheckBox';
import { Button } from '../../../components/common/Button';
import ReactDOM from 'react-dom';
import { useUserStore } from '../../../store/useUserStore';
import { moveNextProps } from '../type';

export const AgreeForm = ({ onNext }: moveNextProps) => {
  const [AgreedList, setAgreedList] = useState<string[]>([]);
  const navigate = useNavigate();
  const setSignupForm = useUserStore(state => state.setSignupForm);

  const agreeList = [
    { id: 'agreedToTerms', prefix: '(필수)', label: '서비스 이용약관 동의', link: true },
    { id: 'agreedToPrivacy', prefix: '(필수)', label: '개인정보 수집 및 이용 동의', link: true },
    { id: 'agreedToLocation', prefix: '(필수)', label: '위치기반서비스 이용약관', link: true },
    { id: 'agreedToMarketing', prefix: '(선택)', label: '마케팅 수신 동의' },
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
  const isRequiredChecked =
    AgreedList.includes('agreedToTerms') &&
    AgreedList.includes('agreedToPrivacy') &&
    AgreedList.includes('agreedToLocation');

  const onAllCheck = () => {
    if (isAllChecked) {
      setAgreedList([]);
    } else {
      setAgreedList(allIds);
    }
  };

  const handleSubmitAgree = () => {
    setSignupForm({
      agreedToTerms: AgreedList.includes('agreedToTerms'),
      agreedToPrivacy: AgreedList.includes('agreedToPrivacy'),
      agreedToLocation: AgreedList.includes('agreedToLocation'),
      agreedToMarketing: AgreedList.includes('agreedToMarketing'),
    });
    onNext();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full  max-w-[428px] mx-5 bg-white rounded-t-2xl p-5">
        <div>
          <CheckBox label="모두 동의합니다." checked={isAllChecked} onChange={onAllCheck} />
        </div>

        <div className="w-full mt-5">
          <hr className="border-t border-grayScale-30" />
        </div>

        <div className="flex flex-col gap-[16px] mt-[20px]">
          {agreeList.map(agreeItem => (
            <CheckBox
              key={agreeItem.id}
              label={agreeItem.label}
              checked={AgreedList.includes(agreeItem.id)}
              onChange={() => onSingleCheck(agreeItem.id)}
              link={agreeItem.link}
              prefix={agreeItem.prefix}
              onClick={() => navigate(`/signup/${agreeItem.id}`)}
            />
          ))}
        </div>

        <div className="mt-[32px]">
          <Button
            className="w-full"
            intent={isRequiredChecked ? 'primary' : 'disabled'}
            size="large"
            type="submit"
            onClick={handleSubmitAgree}
          >
            동의하고 가입하기
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};
