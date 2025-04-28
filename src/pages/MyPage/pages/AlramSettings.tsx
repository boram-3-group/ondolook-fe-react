import React, { useState, ChangeEvent } from 'react';
import { Switch } from '../../../components/common/Switch';
import SelectBox from '../../../components/common/SelectBox';
import { Icon } from '../../../components/common/Icon';
interface Option {
  value: string;
  label: string;
}

const scheduleOptions: Option[] = [
  { value: 'daily', label: '데일리' },
  { value: 'business', label: '비즈니스' },
  { value: 'date', label: '데이트' },
  { value: 'activity', label: '엑티비티' },
];

const AlramSettings = () => {
  const [isAlarmEnabled, setIsAlarmEnabled] = useState<boolean>(false);
  const [hours, setHours] = useState<string>('23');
  const [minutes, setMinutes] = useState<string>('59');
  const [selectedSchedule, setSelectedSchedule] = useState<string>('daily');
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 23)) {
      setHours(value);
      setHasChanges(true);
    }
  };

  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 59)) {
      setMinutes(value);
      setHasChanges(true);
    }
  };

  const handleScheduleChange = (value: string) => {
    setSelectedSchedule(value);
    setHasChanges(true);
  };

  const handleAlarmToggle = (checked: boolean) => {
    setIsAlarmEnabled(checked);
    setHasChanges(true);
  };

  const handleSave = () => {
    // TODO: Implement save logic
    setHasChanges(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 px-5 py-8">
        <div className="flex justify-between items-center mb-8">
          <span className="text-[18px] font-semibold text-[#000] leading-[150%] font-['Pretendard']">
            알림 사용
          </span>
          <Switch checked={isAlarmEnabled} onChange={handleAlarmToggle} />
        </div>
        <div className="h-[1px] bg-[#F0F0F0] my-5"></div>

        {isAlarmEnabled && (
          <>
            <div>
              <span className="text-[18px] font-semibold text-[#000] leading-[150%] font-['Pretendard'] block mb-2">
                알림 받는 시간
              </span>

              <div className="flex justify-between items-center gap-2">
                <div className="flex justify-between items-center flex-1 ">
                  <div className="bg-[#F8F8F8] rounded-lg px-4 h-[45px] relative flex-1 flex items-center border border-transparent focus-within:border-[#4D97FF]">
                    <input
                      type="text"
                      value={hours}
                      onChange={handleHoursChange}
                      placeholder="23"
                      className="w-full text-right border-none bg-transparent text-base focus:outline-none placeholder:text-[#8E8E8E] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[150%] placeholder:font-['Pretendard_Variable'] placeholder:text-right"
                    />
                  </div>
                  <span className="ml-1 right-4 text-base text-[#2D2D2D]">시</span>
                </div>
                <div className="flex justify-between items-center flex-1 ">
                  <div className="bg-[#F8F8F8] rounded-lg px-4 h-[45px] relative flex-1 flex items-center border border-transparent focus-within:border-[#4D97FF]">
                    <input
                      type="text"
                      value={minutes}
                      onChange={handleMinutesChange}
                      placeholder="59"
                      className="w-full text-right border-none bg-transparent text-base focus:outline-none placeholder:text-[#8E8E8E] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[150%] placeholder:font-['Pretendard_Variable'] placeholder:text-right"
                    />
                  </div>
                  <span className="ml-1 right-4 text-base text-[#2D2D2D]">분</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-[10px]">
              <Icon name="alert-circle" stroke="#8E8E8E" width={16} height={16}></Icon>
              <p className="text-[12px] font-normal text-[#8E8E8E] leading-[150%] ">
                오전/오후 대신 숫자로 입력해 주세요 (오후 2시 → 14:00)
              </p>
            </div>

            <div className="h-[1px] bg-[#F0F0F0] my-5"></div>

            <div className="flex justify-between w-full flex-col">
              <div className="text-[18px] font-semibold text-[#000] leading-[150%] font-['Pretendard'] mb-[10px]">
                일정
              </div>
              <div className="w-full">
                <SelectBox
                  value={selectedSchedule}
                  onChange={handleScheduleChange}
                  options={scheduleOptions}
                />
              </div>
            </div>

            <div className="h-[1px] bg-[#F0F0F0] my-5"></div>

            <h2 className="text-[18px] font-semibold text-[#000] mb-4">이렇게 알림이 도착해요!</h2>
            <div className="flex flex-row px-[14px] pt-[14px] pb-[12px] gap-[10px] self-stretch rounded-[24px] bg-[#A6A6A6]/30">
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center font-semibold text-black rounded-[10px] bg-white w-[38px] h-[38px]">
                  <Icon
                    name="ondo-logo-small"
                    stroke="#000"
                    width={32}
                    className="text-center"
                  ></Icon>
                </div>
              </div>
              <div className="w-full">
                <span className="flex flex-row gap-[10px] items-center justify-between">
                  <p className="text-[#000] font-['Pretendard_Variable'] text-[14px] font-medium leading-[150%] font-feature-settings: 'liga' off, 'clig' off">
                    😎 오늘의 코디: 하늘색 원피스
                  </p>
                  <span className="text-sm text-[#8E8E8E]">9:41 AM</span>
                </span>
                <p className="text-sm leading-relaxed">
                  오늘은 오후 2시에 데이트가 있는 날이에요!
                  <br />
                  오늘 날씨와 일정에 어울리는 코디가 준비되어 있어요.
                  <br />
                  확인해 보세요?
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="px-5 pb-4 absolute bottom-0 left-0 right-0">
        {hasChanges && (
          <button
            onClick={handleSave}
            className="w-full h-14 bg-[#4D97FF] text-white text-base font-medium rounded-lg"
          >
            변경하기
          </button>
        )}
      </div>
    </div>
  );
};

export default AlramSettings;
