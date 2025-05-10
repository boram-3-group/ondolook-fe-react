import React, { useState, useEffect } from 'react';
import SelectBox from '../../../components/common/SelectBox';
import { Input } from '../../../components/common/Input';
import { useUserStore } from '../../../store/useUserStore';
import { SignUpResponse } from '../../../pages/SignupPage/type';
import { useFetchUpdateUserInfo } from '../../../pages/SignupPage/fetches/useFetchSignup';
import toast from 'react-hot-toast';

interface Option {
  value: string;
  label: string;
}

const genderOptions: Option[] = [
  { value: 'MALE', label: '남자' },
  { value: 'FEMALE', label: '여자' },
];

const UserInfoSettings: React.FC = () => {
  const { user, setUser } = useUserStore();
  const { mutate: updateUserInfo } = useFetchUpdateUserInfo();
  const [selectedGender, setSelectedGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [initialValues, setInitialValues] = useState({
    gender: 'MALE' as 'MALE' | 'FEMALE',
    year: '',
    month: '',
    day: '',
  });

  // 변경 여부 확인
  // useEffect(() => {
  //   isChanged();
  // }, [initialValues]);

  const isChanged = () => {
    return (
      selectedGender !== initialValues.gender ||
      birthYear !== initialValues.year ||
      birthMonth !== initialValues.month ||
      birthDay !== initialValues.day
    );
  };

  useEffect(() => {
    if (user) {
      console.log('user');
      const userGender = (user.gender as 'MALE' | 'FEMALE') || 'MALE';
      setSelectedGender(userGender);
      if (user.birthDate) {
        const [year, month, day] = user.birthDate.split('-');
        setBirthYear(year);
        setBirthMonth(month);
        setBirthDay(day);
      }
      setInitialValues({
        gender: userGender,
        year: user.birthDate ? user.birthDate.split('-')[0] : '',
        month: user.birthDate ? user.birthDate.split('-')[1] : '',
        day: user.birthDate ? user.birthDate.split('-')[2] : '',
      });
    }
  }, [user]);

  const validateForm = () => {
    if (!birthYear || !birthMonth || !birthDay) {
      toast.error('생년월일을 모두 입력해주세요.');
      return false;
    }

    const year = parseInt(birthYear);
    const month = parseInt(birthMonth);
    const day = parseInt(birthDay);

    if (year < 1900 || year > new Date().getFullYear()) {
      toast.error('올바른 연도를 입력해주세요.');
      return false;
    }

    if (month < 1 || month > 12) {
      toast.error('올바른 월을 입력해주세요.');
      return false;
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      toast.error('올바른 일을 입력해주세요.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      setIsLoading(true);

      if (!user) {
        toast.error('사용자 정보를 찾을 수 없습니다.');
        return;
      }

      const formattedBirthDate = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;

      const updatedUser: SignUpResponse = {
        id: user.id,
        username: user.username,
        password: user.password,
        nickname: user.nickname || '',
        gender: selectedGender,
        birthDate: formattedBirthDate,
        email: user.email || '',
        agreedToTerms: user.agreedToTerms || false,
        agreedToPrivacy: user.agreedToPrivacy || false,
        agreedToLocation: user.agreedToLocation || false,
        agreedToMarketing: user.agreedToMarketing || false,
      };

      updateUserInfo(updatedUser, {
        onSuccess: response => {
          if (response) {
            setInitialValues({
              gender: selectedGender,
              year: birthYear,
              month: birthMonth,
              day: birthDay,
            });
            setUser({
              ...user,
              gender: selectedGender,
              birthDate: formattedBirthDate,
            });
            toast.success('회원 정보가 성공적으로 업데이트되었습니다.');
          }
        },
        onError: error => {
          console.error('Error updating user info:', error);
          toast.error('회원 정보 업데이트에 실패했습니다.');
        },
      });
    } catch (err) {
      console.error('Error:', err);
      toast.error('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const labelStyle = 'text-[18px] font-semibold leading-[150%] text-[#2D2D2D] mb-2';
  const buttonStyle = `absolute left-1/2 bottom-5 -translate-x-1/2 w-[calc(100%-40px)] h-14 rounded-lg ${
    isChanged() ? 'bg-[#4D97FF]' : 'bg-[#D9D9D9]'
  } text-white text-base font-medium`;

  return (
    <div className="flex flex-col px-5 bg-white h-full">
      <div className="mt-10">
        <div className={labelStyle}>성별</div>
        <SelectBox
          value={selectedGender}
          onChange={(value: string) => setSelectedGender(value as 'MALE' | 'FEMALE')}
          options={genderOptions}
        />
      </div>

      <div className="mt-10">
        <div className={labelStyle}>생년월일</div>
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              value={birthYear}
              onChange={e => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                if (value.length <= 4) setBirthYear(value);
              }}
              placeholder="2000"
              maxLength={4}
            />
          </div>
          <div className="flex-1">
            <Input
              value={birthMonth}
              onChange={e => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                if (value.length <= 2) setBirthMonth(value);
              }}
              placeholder="01"
              maxLength={2}
            />
          </div>
          <div className="flex-1">
            <Input
              value={birthDay}
              onChange={e => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                if (value.length <= 2) setBirthDay(value);
              }}
              placeholder="01"
              maxLength={2}
            />
          </div>
        </div>
      </div>

      <button onClick={handleSubmit} className={buttonStyle} disabled={!isChanged() || isLoading}>
        {isLoading ? '저장 중...' : '변경하기'}
      </button>
    </div>
  );
};

export default UserInfoSettings;
