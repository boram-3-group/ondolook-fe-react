import React, { useState, ChangeEvent } from 'react';
import { Switch } from '../../../components/common/Switch';
import SelectBox from '../../../components/common/SelectBox';

interface Option {
  value: string;
  label: string;
}

const scheduleOptions: Option[] = [
  { value: 'daily', label: '대일리' },
  { value: 'weekly', label: '위클리' },
  { value: 'monthly', label: '먼슬리' },
];

const AlramSettings = () => {
  const [isAlarmEnabled, setIsAlarmEnabled] = useState<boolean>(false);
  const [hours, setHours] = useState<string>('23');
  const [minutes, setMinutes] = useState<string>('59');
  const [selectedSchedule, setSelectedSchedule] = useState<string>('daily');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 px-5 py-8">
        <div className="flex justify-between items-center mb-8">
          <span className="text-base font-medium text-[#2D2D2D]">알림 사용</span>
          <Switch
            checked={isAlarmEnabled}
            onChange={(checked: boolean) => setIsAlarmEnabled(checked)}
          />
        </div>

        {isAlarmEnabled && (
          <>
            <div className="flex justify-between items-center mb-8">
              <span className="text-base font-medium text-[#2D2D2D]">알림 받는 시간</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={hours}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setHours(e.target.value)}
                  min="0"
                  max="23"
                  className="w-[60px] h-10 text-center border border-gray-200 rounded-lg text-base bg-[#F8F8F8]"
                />
                <span className="text-base text-[#2D2D2D]">시</span>
                <input
                  type="number"
                  value={minutes}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setMinutes(e.target.value)}
                  min="0"
                  max="59"
                  className="w-[60px] h-10 text-center border border-gray-200 rounded-lg text-base bg-[#F8F8F8]"
                />
                <span className="text-base text-[#2D2D2D]">분</span>
              </div>
            </div>

            <p className="text-sm text-[#8E8E8E] mb-8">
              오늘/오후 대신 소지품 잃어버리지 마세요 (오후 2시 → 14:00)
            </p>

            <div className="flex justify-between items-center mb-8">
              <span className="text-base font-medium text-[#2D2D2D]">일정</span>
              <div className="w-[200px]">
                <SelectBox
                  value={selectedSchedule}
                  onChange={(value: string) => setSelectedSchedule(value)}
                  options={scheduleOptions}
                />
              </div>
            </div>

            <h2 className="text-base font-medium text-[#2D2D2D] mb-4">이렇게 알림이 도착해요!</h2>
            <div className="bg-[#F8F8F8] rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-[#2D2D2D]">Ondo</span>
                <span className="text-sm text-[#8E8E8E]">9:41 AM</span>
              </div>
              <p className="text-sm leading-relaxed text-[#2D2D2D]">
                오늘은 오후 2시에 데이트가 있는 날이에요!
                <br />
                오늘 날씨와 일정에 어울리는 코디가 준비되어 있어요.
                <br />
                확인해 보세요?
              </p>
            </div>
          </>
        )}
      </div>

      <div className="px-5 pb-4">
        <button className="w-full h-14 bg-[#4D97FF] text-white text-base font-medium rounded-lg">
          변경하기
        </button>
      </div>
    </div>
  );
};

export default AlramSettings;
