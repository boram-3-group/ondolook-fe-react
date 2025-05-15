import React, { useState, ChangeEvent, useEffect } from 'react';
import { Switch } from '../../../components/common/Switch';
import SelectBox from '../../../components/common/SelectBox';
import { Icon } from '../../../components/common/Icon';
import {
  getAlarmSettings,
  saveAlarmSettings,
  updateSystemStorageNotificationPermission,
  requestNotificationPermission,
  checkNotificationPermission,
} from '../../../core/helper';
import toast from 'react-hot-toast';
import { useSetAlram } from '../fetches/useFetchAlram';
import { useLocationStore } from '../../../store/useLocationStore';
import { useUserStore } from '../../../store/useUserStore';
import { useFetchCategory } from '../../HomePage/fetches/useFetchCategory';
import { trackAlarmSetting } from '../../../utils/analytics';

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

  // Add initial state tracking
  const [initialState, setInitialState] = useState({
    isAlarmEnabled: false,
    hours: '23',
    minutes: '59',
    selectedSchedule: 'daily',
  });

  const { mutate: setAlram } = useSetAlram();
  const { lat, lon } = useLocationStore();
  const user = useUserStore(state => state.user);
  const { data: Categories } = useFetchCategory();

  // eventTypeId 매핑
  const selectCategoryData = Categories?.content.find(
    cat => cat.categoryName.toLowerCase() === selectedSchedule.toLowerCase()
  );
  const eventTypeId = selectCategoryData?.id || 1;
  const gender = user?.gender || 'MALE';

  useEffect(() => {
    const settings = getAlarmSettings();
    const hasPermission = checkNotificationPermission();

    // If alarm is enabled but no permission, disable it
    if (settings.isAlarmEnabled && !hasPermission) {
      setIsAlarmEnabled(false);
      setHasChanges(true);
    } else {
      setIsAlarmEnabled(settings.isAlarmEnabled);
    }

    setHours(settings.hours);
    setMinutes(settings.minutes);
    setSelectedSchedule(settings.selectedSchedule);

    // Set initial state
    setInitialState({
      isAlarmEnabled: settings.isAlarmEnabled,
      hours: settings.hours,
      minutes: settings.minutes,
      selectedSchedule: settings.selectedSchedule,
    });
  }, []);

  // Add effect to check for changes
  useEffect(() => {
    const currentState = {
      isAlarmEnabled,
      hours,
      minutes,
      selectedSchedule,
    };

    const hasStateChanged = JSON.stringify(currentState) !== JSON.stringify(initialState);
    setHasChanges(hasStateChanged);
  }, [isAlarmEnabled, hours, minutes, selectedSchedule, initialState]);

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

  const handleAlarmToggle = async (checked: boolean) => {
    if (checked) {
      const isGranted = await requestNotificationPermission();
      if (!isGranted) {
        toast.error('알림 권한이 필요합니다. 브라우저 설정에서 알림을 허용해주세요.', {
          position: 'top-center',
          duration: 3000,
        });
        return;
      }
    }

    setIsAlarmEnabled(checked);
    setHasChanges(true);
  };

  const handleSave = () => {
    const settings = {
      isAlarmEnabled,
      hours,
      minutes,
      selectedSchedule,
    };
    saveAlarmSettings(settings);
    updateSystemStorageNotificationPermission(isAlarmEnabled);

    setAlram({
      hour: Number(hours),
      minute: Number(minutes),
      dayOfWeek: 'EVERYDAY',
      enabled: isAlarmEnabled,
      latitude: lat,
      longitude: lon,
      eventTypeId,
      gender,
    });

    // Update initial state after saving
    setInitialState(settings);
    setHasChanges(false);
    const userId = JSON.parse(localStorage.getItem('user-storage') || '{}')?.state?.user?.id;

    trackAlarmSetting({
      userId: userId,
      is_enabled: true,
      set_time: String(hours) + ':' + String(minutes),
    });
    toast.success('알림 설정이 저장되었습니다.', {
      position: 'top-center',
      duration: 2000,
    });
  };

  return (
    <div className="flex h-full flex-col min-h-full bg-white">
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
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className={`w-full h-14 text-white text-base font-medium rounded-lg ${
            hasChanges ? 'bg-[#4D97FF]' : 'bg-[#E5E5E5]'
          }`}
        >
          변경하기
        </button>
      </div>
    </div>
  );
};

export default AlramSettings;
