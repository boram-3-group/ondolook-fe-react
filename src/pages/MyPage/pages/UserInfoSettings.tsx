import React, { useState } from 'react';
import SelectBox from '../../../components/common/SelectBox';

const UserInfoSettings: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState('남자');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');

  const genderOptions = ['남자', '여자'];

  const handleSubmit = () => {
    console.log({ selectedGender, birthYear, birthMonth, birthDay });
  };

  const labelStyle =
    "font-['Pretendard'] text-[18px] font-semibold leading-[150%] text-[#2D2D2D] [font-feature-settings:'liga'_off,'clig'_off] mb-2";

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
              className="w-full h-[48px] px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-center bg-[#F8F8F8]"
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
              className="w-full h-[48px] px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-center bg-[#F8F8F8]"
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
              className="w-full h-[48px] px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-center bg-[#F8F8F8]"
              maxLength={2}
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="absolute left-1/2 bottom-5 -translate-x-1/2 w-[calc(100%-40px)] h-14 rounded-lg bg-[#4D97FF] text-white text-base font-medium"
      >
        변경하기
      </button>
    </div>
  );
};

export default UserInfoSettings;
