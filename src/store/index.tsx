import { useUserStore } from './useUserStore';
import { useSystem } from './useSystem';
import { useLocationStore } from './useLocationStore';
import useWeatherStore from './useWeatherStore';

// 스토어 생성시 앞으로 여기에도 추가해주세요! to: junsoo
export const useStore = () => {
  return {
    userStore: useUserStore(),
    systemStore: useSystem(),
    locationStore: useLocationStore(),
    weatherStore: useWeatherStore(),
  };
};
