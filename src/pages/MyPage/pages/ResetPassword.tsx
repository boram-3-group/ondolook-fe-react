import React, { useState } from 'react';
import { Input } from '../../../components/common/Input';
import { useUserStore } from '../../../store/useUserStore';
import { useResetPassword } from '../fetches/useResetPassword';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const labelStyle =
  "text-[18px] font-semibold leading-[150%] text-[#2D2D2D] mb-2 font-pretendard font-feature-settings:['liga'_off,'clig'_off]";
const buttonStyle = (enabled: boolean, isLoading: boolean) =>
  `absolute left-1/2 bottom-5 -translate-x-1/2 w-[calc(100%-40px)] h-14 rounded-lg ${
    enabled && !isLoading ? 'bg-[#4D97FF]' : 'bg-[#D9D9D9]'
  } text-white text-base font-medium`;

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]).{8,16}$/;

const placeholderClass =
  "placeholder:text-[#8E8E8E] placeholder:font-pretendard placeholder:text-[16px] placeholder:font-medium placeholder:leading-[150%] placeholder-[font-feature-settings:'liga'_off,'clig'_off]";

const errorTextStyle = {
  color: '#EB003B',
  fontFamily: 'Pretendard',
  fontSize: 12,
  fontWeight: 400,
  lineHeight: '18px',
  fontFeatureSettings: "'liga' off, 'clig' off",
};

const ResetPassword: React.FC = () => {
  const { user } = useUserStore();
  const { mutate: resetPassword, isPending } = useResetPassword();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 에러 상태 추가
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateCurrentPassword = (value: string) => {
    if (!value) {
      setCurrentPasswordError('현재 비밀번호를 입력해주세요.');
      return false;
    }
    setCurrentPasswordError('');
    return true;
  };

  const validateNewPassword = (value: string) => {
    if (!value) {
      setNewPasswordError('새 비밀번호를 입력해주세요.');
      return false;
    }
    if (!passwordRegex.test(value)) {
      setNewPasswordError('비밀번호 형식이 올바르지 않습니다.');
      return false;
    }
    if (currentPassword === value) {
      setNewPasswordError('기존 비밀번호와 다른 비밀번호를 입력해주세요.');
      return false;
    }
    setNewPasswordError('');
    return true;
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) {
      setConfirmPasswordError('비밀번호 확인을 입력해주세요.');
      return false;
    }
    if (newPassword !== value) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const validateForm = () => {
    const isCurrentValid = validateCurrentPassword(currentPassword);
    const isNewValid = validateNewPassword(newPassword);
    const isConfirmValid = validateConfirmPassword(confirmPassword);
    return isCurrentValid && isNewValid && isConfirmValid;
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
    resetPassword(
      { userId: user.id ?? '', newPassword },
      {
        onSuccess: () => {
          toast.success('비밀번호가 성공적으로 변경되었습니다. 다시 로그인 해주세요.');
          navigate('/login', { replace: true });
        },
        onError: (error: unknown) => {
          toast.error((error as Error)?.message || '비밀번호 변경에 실패했습니다.');
        },
        onSettled: () => setIsLoading(false),
      }
    );
  };

  return (
    <div className="flex flex-col px-5 bg-white h-full">
      <div className="mt-[32px]">
        <div className={labelStyle}>현재 비밀번호</div>
        <Input
          type="password"
          value={currentPassword}
          onChange={e => {
            setCurrentPassword(e.target.value);
            validateCurrentPassword(e.target.value);
          }}
          placeholder="기본 비밀번호를 입력해 주세요"
          inputHeight="medium"
          className={placeholderClass}
        />
        <div className="mt-2 h-[18px]" style={errorTextStyle}>
          {currentPasswordError}
        </div>
      </div>
      <div className="mt-6">
        <div className={labelStyle}>새 비밀번호</div>
        <Input
          type="password"
          value={newPassword}
          onChange={e => {
            setNewPassword(e.target.value);
            validateNewPassword(e.target.value);
            if (confirmPassword) {
              validateConfirmPassword(confirmPassword);
            }
          }}
          placeholder="영문, 숫자, 특수문자 포함 8~16자"
          inputHeight="medium"
          className={placeholderClass}
        />
        <div className="mt-2 h-[18px]" style={errorTextStyle}>
          {newPasswordError}
        </div>
      </div>
      <div className="mt-6">
        <div className={labelStyle}>새 비밀번호 확인</div>
        <Input
          type="password"
          value={confirmPassword}
          onChange={e => {
            setConfirmPassword(e.target.value);
            validateConfirmPassword(e.target.value);
          }}
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          inputHeight="medium"
          className={placeholderClass}
        />
        <div className="mt-2 h-[18px]" style={errorTextStyle}>
          {confirmPasswordError}
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className={buttonStyle(isChanged(), isLoading || isPending)}
        disabled={!isChanged() || isLoading || isPending}
      >
        {'변경하기'}
      </button>
    </div>
  );
};

export default ResetPassword;
