import { useEffect } from 'react';
import { Icon } from '../../../components/common/Icon';
import WeatherIcon from '../../../components/common/WeatherIcon';
import { useLocationStore } from '../../../store/useLocationStore';
import useWeatherStore from '../../../store/useWeatherStore';
import { useFetchRegion } from '../fetches/useFetchRegion';
import { useFetchWeather, useFetchWeekWeather } from '../fetches/useFetchWeather';

export const WeatherDetail = () => {
  const { lat, lon } = useLocationStore();
  const setWeather = useWeatherStore(state => state.setWeather);

  const { data: WeekWeatherData, isLoading: WeekWeatherDataLoading } = useFetchWeekWeather({
    lat: 37.498095,
    lon: 127.02761,
  });

  const shouldFetch = lat !== 0 && lon !== 0;

  const { data: RegionData, isLoading: RegionDataLoading } = useFetchRegion(
    { lat, lon },
    {
      enabled: shouldFetch,
    }
  );

  const { data: WeatherData, isLoading: WeatherDataLoading } = useFetchWeather({
    lat,
    lon,
  });

  // 현재 시간
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const hoursString = String(currentHours).padStart(2, '0');

  // 현재 시간에 해당하는 forecast
  const currentForecast = WeatherData?.forecasts.find(
    forecast => forecast.time.substring(0, 2) === hoursString
  );

  // 오늘 최저/최고 온도
  const TodayTemp = WeatherData?.forecasts.map(forecast => forecast.temperature);
  const maxTodayTemp = TodayTemp && Math.max(...TodayTemp);
  const minTodayTemp = TodayTemp && Math.min(...TodayTemp);

  //현재 시간 이후 기상정보
  const nowToWeather = WeatherData?.forecasts.filter(forecast => {
    const forecastHour = parseInt(forecast.time.slice(0, 2), 10);
    return forecastHour >= currentHours;
  });

  //WeekWeatherData에서 요일 반환
  function getDayOfWeek(yyyyMMdd: string) {
    const dayOfWeek = new Date(yyyyMMdd).getDay();
    const dayArray = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    return dayArray[dayOfWeek];
  }

  https: useEffect(() => {
    if (currentForecast) {
      setWeather(currentForecast.iconMessage);
    }
  }, [currentForecast, setWeather]);

  return (
    <>
      <div className="mx-4">
        <div className="flex pt-1">
          <Icon name="location" width={24} height={24} alt="위치" />
          <div className="text-Title1">{`${RegionData?.sidonm} ${RegionData?.sggnm}`}</div>
        </div>
        {currentForecast && (
          <>
            <div className="">
              <div className="text-[54px] font-normal leading-[150%] width-[87px]">
                {currentForecast.temperature}°
              </div>
              <WeatherIcon
                weather={currentForecast.iconNumber.toString()}
                width={58}
                height={58}
                alt="맑음"
              />
              <div className="flex text-[13px] leading-[150%] font-normal tracking-[0] text-grayScale-50">
                <Icon className="mt-1" name="min-temparrow" width={12} height={12} alt="최저기온" />
                <div className="mr-2">{minTodayTemp}°</div>
                <Icon className="mt-1" name="max-temparrow" width={12} height={12} alt="최고기온" />
                <div className="">{maxTodayTemp}°</div>
              </div>
            </div>
            <div>
              {WeatherData && (
                <div className="text-Body1 text-grayScale-70 mt-[10px]">
                  {WeatherData.weatherMessage}
                </div>
              )}
            </div>
            <div className="w-full mt-[20px]">
              <hr className="border-t border-grayScale-30" />
            </div>
            <Icon name="uv" width={28} height={28} alt="자외선" />
            <div className="mt-1 text-sm text-gray-700">자외선지수</div>
            {WeatherData && <div className="">{WeatherData.uvIndex.grade}</div>}
            <Icon name="air" width={28} height={28} alt="미세먼지" />
            <div className="">미세먼지</div>
            <div className="">{WeatherData?.airQuality.grade}</div>
            <Icon name="rainfall" width={28} height={28} alt="강수량" />
            <div className="">강수량</div>
            <div className="">{currentForecast.pty}</div>
          </>
        )}
        {nowToWeather && (
          <div className="flex">
            {nowToWeather.map((forecast, index) => (
              <>
                <div>
                  <div>
                    {index == 0
                      ? '지금'
                      : forecast.time.slice(0, 1) === '0'
                        ? forecast.time.slice(1, 2) + '시'
                        : forecast.time.slice(0, 2) + '시'}
                  </div>
                  <WeatherIcon
                    weather={forecast.iconNumber.toString()}
                    width={24}
                    height={24}
                    alt="맑음"
                  />
                  <div>{forecast.temperature}°</div>
                </div>
              </>
            ))}
          </div>
        )}
        <Icon name="calendar" width={28} height={28} alt="달력" />
        <div>10일간의 일기예보</div>
        {WeekWeatherData &&
          WeekWeatherData.map((dayWeather, index) => (
            <>
              <div>
                <div>
                  {index == 0 ? '오늘' : getDayOfWeek(dayWeather.forecastDate.replace('-', ''))}
                </div>
                <div>{dayWeather.rainProbability}</div>
                <div>{dayWeather.minTemperature}°</div>
                <div>{dayWeather.maxTemperature}°</div>
              </div>
            </>
          ))}
      </div>
    </>
  );
};
