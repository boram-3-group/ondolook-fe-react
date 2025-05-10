import React, { useState } from 'react';
import { Input } from '../../../components/common/Input';
import { useUserStore } from '../../../store/useUserStore';
import { useFetchUpdateUserInfo } from '../../../pages/SignupPage/fetches/useFetchSignup';
import toast from 'react-hot-toast';

const labelStyle =
  "text-[18px] font-semibold leading-[150%] text-[#2D2D2D] mb-2 font-pretendard font-feature-settings:['liga'_off,'clig'_off]";
const buttonStyle = (enabled: boolean, isLoading: boolean) =>
  `absolute left-1/2 bottom-5 -translate-x-1/2 w-[calc(100%-40px)] h-14 rounded-lg ${
    enabled && !isLoading ? 'bg-[#4D97FF]' : 'bg-[#D9D9D9]'
  } text-white text-base font-medium`;

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{};:'",.<>/?\\|`~]).{8,16}$/;

const ResetPassword: React.FC = () => {
  const { user, setUser } = useUserStore();
  const { mutate: updateUserInfo } = useFetchUpdateUserInfo();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('모든 항목을 입력해주세요.');
      return false;
    }
    if (!passwordRegex.test(newPassword)) {
      toast.error('비밀번호는 영문, 숫자, 특수문자 포함 8~16자여야 합니다.');
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.error('새 비밀번호가 일치하지 않습니다.');
      return false;
    }
    if (currentPassword === newPassword) {
      toast.error('기존 비밀번호와 다른 비밀번호를 입력해주세요.');
      return false;
    }
    return true;
  };

  const isChanged = () =>
    !!currentPassword &&
    !!newPassword &&
    !!confirmPassword &&
    passwordRegex.test(newPassword) &&
    newPassword === confirmPassword &&
    currentPassword !== newPassword;

  const handleSubmit = async () => {
    if (!user) {
      toast.error('사용자 정보를 찾을 수 없습니다.');
      return;
    }
    if (!validateForm()) return;
    setIsLoading(true);
    const updatedUser = {
      ...user,
      password: newPassword,
      nickname: user.nickname || '',
      gender: user.gender === 'MALE' || user.gender === 'FEMALE' ? user.gender : '',
    };
    updateUserInfo(updatedUser, {
      onSuccess: () => {
        setUser({ ...user, password: newPassword });
        toast.success('비밀번호가 성공적으로 변경되었습니다.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      },
      onError: (error: unknown) => {
        toast.error((error as Error)?.message || '비밀번호 변경에 실패했습니다.');
      },
      onSettled: () => setIsLoading(false),
    });
  };

  return (
    <div className="flex flex-col px-5 bg-white h-full">
      <div className="mt-10">
        <div className={labelStyle}>현재 비밀번호</div>
        <Input
          type="password"
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
          placeholder="기본 비밀번호를 입력해 주세요"
          inputHeight="medium"
        />
      </div>
      <div className="mt-10">
        <div className={labelStyle}>새 비밀번호</div>
        <Input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          placeholder="영문, 숫자, 특수문자 포함 8~16자"
          inputHeight="medium"
        />
      </div>
      <div className="mt-10">
        <div className={labelStyle}>새 비밀번호 확인</div>
        <Input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          inputHeight="medium"
        />
      </div>
      <button
        onClick={handleSubmit}
        className={buttonStyle(isChanged(), isLoading)}
        disabled={!isChanged() || isLoading}
      >
        {isLoading ? '변경 중...' : '변경하기'}
      </button>
    </div>
  );
};

export default ResetPassword;
