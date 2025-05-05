import { useFetchWeekWeather } from '../fetches/useFetchWeather';

export const WeatherDetail = () => {
  const { data: WeekWeatherData, isLoading: WeatherDataLoading } = useFetchWeekWeather({
    lat: 37.498095,
    lon: 127.02761,
  });

  console.log('WeekWeatherData', WeekWeatherData);
  return <></>;
};
