import React, { useState, useEffect } from 'react';
import SelectBox from '../../../components/common/SelectBox';

interface Option {
  value: string;
  label: string;
}

const genderOptions: Option[] = [
  { value: 'male', label: '남자' },
  { value: 'female', label: '여자' },
];

const UserInfoSettings: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState('male');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');

  const [initialValues, setInitialValues] = useState({
    gender: 'male',
    year: '',
    month: '',
    day: '',
  });

  // 변경 여부 확인
  const isChanged = () => {
    return (
      selectedGender !== initialValues.gender ||
      birthYear !== initialValues.year ||
      birthMonth !== initialValues.month ||
      birthDay !== initialValues.day
    );
  };

  useEffect(() => {
    setInitialValues({
      gender: selectedGender,
      year: birthYear,
      month: birthMonth,
      day: birthDay,
    });
  }, []);

  const handleSubmit = () => {
    console.log({ selectedGender, birthYear, birthMonth, birthDay });
    setInitialValues({
      gender: selectedGender,
      year: birthYear,
      month: birthMonth,
      day: birthDay,
    });
  };

  const labelStyle = 'text-[18px] font-semibold leading-[150%] text-[#2D2D2D] mb-2';

  const inputStyle =
    'w-full h-[45px] px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-left bg-[#F8F8F8] text-[14px] font-medium';

  // 버튼 스타일 동적 설정
  const buttonStyle = `absolute left-1/2 bottom-5 -translate-x-1/2 w-[calc(100%-40px)] h-14 rounded-lg ${
    isChanged() ? 'bg-[#4D97FF]' : 'bg-[#D9D9D9]'
  } text-white text-base font-medium`;

  return (
    <div className="flex flex-col px-5 bg-white min-h-screen">
      <div className="mt-10">
        <div className={labelStyle}>성별</div>
        <SelectBox value={selectedGender} onChange={setSelectedGender} options={genderOptions} />
      </div>

      <div className="mt-10">
        <div className={labelStyle}>생년월일</div>
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              value={birthYear}
              onChange={e => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                if (value.length <= 4) setBirthYear(value);
              }}
              placeholder="2000"
              className={inputStyle}
              maxLength={4}
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={birthMonth}
              onChange={e => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                if (value.length <= 2) setBirthMonth(value);
              }}
              placeholder="01"
              className={inputStyle}
              maxLength={2}
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={birthDay}
              onChange={e => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                if (value.length <= 2) setBirthDay(value);
              }}
              placeholder="01"
              className={inputStyle}
              maxLength={2}
            />
          </div>
        </div>
      </div>

      <button onClick={handleSubmit} className={buttonStyle} disabled={!isChanged()}>
        변경하기
      </button>
    </div>
  );
};

export default UserInfoSettings;
