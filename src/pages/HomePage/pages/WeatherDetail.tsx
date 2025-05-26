import { useEffect } from 'react';
import { Icon } from '../../../components/common/Icon';
import WeatherIcon from '../../../components/common/WeatherIcon';
import { useLocationStore } from '../../../store/useLocationStore';
import useWeatherStore from '../../../store/useWeatherStore';
import { useFetchRegion } from '../fetches/useFetchRegion';
import { useFetchWeather, useFetchWeekWeather } from '../fetches/useFetchWeather';
import { HourlyWeather } from '../_components/HourlyWeather';

export const WeatherDetail = () => {
  const { lat, lon } = useLocationStore();
  const setWeather = useWeatherStore(state => state.setWeather);

  const { data: WeekWeatherData, isLoading: WeekWeatherDataLoading } = useFetchWeekWeather({
    lat: lat,
    lon: lon,
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

  //현재 시간 이후 기상정보 중 오늘에 해당하는 값만
  const nowToWeather = WeatherData?.forecasts.filter(forecast => {
    const forecastHour = parseInt(forecast.time.slice(0, 2), 10);
    const forecastDate = forecast.date;

    const today = new Date();
    const todayString = today.toISOString().split('T')[0].replace(/-/g, '');
    return forecastDate === todayString && forecastHour >= currentHours;
  });

  //WeekWeatherData에서 요일 반환
  function getDayOfWeek(dateNum: string) {
    const dayOfWeek = new Date(dateNum).getDay();
    const dayArray = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    return dayArray[dayOfWeek];
  }

  useEffect(() => {
    if (currentForecast) {
      setWeather(currentForecast.iconMessage);
    }
  }, [currentForecast, setWeather]);

  //미세먼지 등급
  const airGrade = {
    GOOD: '좋음',
    MODERATE: '보통',
    HIGH: '나쁨',
    VERY_HIGH: '매우 나쁨',
  } as const;

  type AirGradeKey = keyof typeof airGrade;

  //미세먼지 등급
  const uvGrade = {
    LOW: '낮음',
    MODERATE: '보통',
    HIGH: '높음',
    VERY_HIGH: '매우 높음',
    EXTREME: '위험',
  } as const;

  type uvGradeKey = keyof typeof uvGrade;

  return (
    <>
      <div className="mx-4">
        <div className="flex pt-4">
          <Icon name="location-gray" width={20} height={20} alt="위치" />
          <div className="text-Title2 text-grayScale-70">{`${RegionData?.sidonm} ${RegionData?.sggnm}`}</div>
        </div>
        <div className="rounded-xl px-6 py-5 items-center bg-white mt-3">
          {currentForecast && (
            <>
              <div className="flex text-center justify-center">
                <WeatherIcon
                  weather={currentForecast.iconNumber.toString()}
                  width={68}
                  height={58}
                  alt="맑음"
                />
                <div className="ml-1 text-[50px] text-grayScale-80 font-normal leading-[150%] width-[87px]">
                  {currentForecast.temperature}°
                </div>
              </div>
              <div className="flex mt-2 text-[13px] leading-[150%] font-normal tracking-[0] text-grayScale-50 text-center justify-center">
                <Icon className="mt-1" name="min-temparrow" width={12} height={12} alt="최저기온" />
                <div className="mr-2">최저 {minTodayTemp}°</div>
                <Icon className="mt-1" name="max-temparrow" width={12} height={12} alt="최고기온" />
                <div className="">최고 {maxTodayTemp}°</div>
              </div>
              <div className="mt-4 text-center justify-center">
                {WeatherData && (
                  <div className="text-Body1 text-grayScale-80">{WeatherData.weatherMessage}</div>
                )}
              </div>
              <div className="w-full mt-[20px] ">
                <hr className="border-t border-grayScale-30 " />
              </div>
              <div className="flex gap-[24px] mt-[20px] justify-center text-center">
                <div className="flex flex-col items-center">
                  <Icon name="uv" width={28} height={28} alt="자외선" />
                  <div className="mt-1 text-Body2 text-gray-80 ">자외선지수</div>
                  <div className="Body2 text-grayScale-50 mt-[2px]">
                    {uvGrade[WeatherData!.uvIndex.grade as uvGradeKey]}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <Icon name="air" width={28} height={28} alt="미세먼지" />
                  <div className="mt-1 text-Body2 text-gray-80">미세먼지</div>
                  <div className="Body2 text-grayScale-50 mt-[2px]">
                    {airGrade[WeatherData!.airQuality.grade as AirGradeKey]}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <Icon name="rainfall" width={28} height={28} alt="강수량" />
                  <div className="mt-1 text-Body2 text-gray-80">강수량</div>
                  <div className="Body2 text-grayScale-50 mt-[2px]">{currentForecast.pty}mm</div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="rounded-xl items-center bg-white mt-5">
          <div className="rounded-xl items-center bg-white mt-5">
            {nowToWeather && <HourlyWeather nowToWeather={nowToWeather} />}
          </div>
        </div>
        <div className="flex mt-5 mr-1">
          <Icon name="calendar" width={21} height={21} alt="달력" />
          <div className="text-Body2 text-grayScale-50">7일간의 일기예보</div>
        </div>
        <div className="rounded-xl bg-white mt-2 py-5 px-6 space-y-4">
          {WeekWeatherData &&
            WeekWeatherData.map((dayWeather, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="text-grayScale-70 text-Body1">
                  {index === 0 ? '오늘' : getDayOfWeek(dayWeather.forecastDate)}
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-1">
                    <Icon name="waterdrop" width={12} height={12} alt="물방울" />
                    <span className="text-grayScale-50 text-Body2 translate-y-[1px]">
                      {dayWeather.rainProbability}%
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <span className="text-grayScale-90 text-Body1">
                      {dayWeather.minTemperature}°
                    </span>
                    <span className="text-grayScale-90 text-Body1">
                      {dayWeather.maxTemperature}°
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
