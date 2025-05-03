import { create } from 'zustand';

type WeatherStore = {
  weather: string;
  setWeather: (weather: string) => void;
};

const useWeatherStore = create<WeatherStore>(set => ({
  weather: '',
  setWeather: weather => set({ weather }),
}));

export default useWeatherStore;
