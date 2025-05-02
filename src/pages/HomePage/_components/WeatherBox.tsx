import WeatherIcon from '../../../components/common/WeatherIcon';
import { WeatherResponse } from '../type';

export const WeatherBox = ({ forecasts, airQuality, uvIndex, weatherMessage }: WeatherResponse) => {
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const hoursString = String(currentHours).padStart(2, '0');
  const currentForecast = forecasts.filter(
    forecast => forecast.time.substring(0, 2) === hoursString
  );

  const TodayTemp = forecasts.map(forecast => forecast.temperature);
  const maxTodayTemp = Math.max(...TodayTemp);
  const minTodayTemp = Math.min(...TodayTemp);

  return (
    <div className="flex px-4 py-1 border rounded-xl gap-[12px] items-center">
      <div className="text-5xl font-medium leading-[150%]">{currentForecast[0].temperature}°</div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex gap-[6px]">
            <WeatherIcon
              weather={currentForecast[0].iconNumber.toString()}
              width={24}
              height={24}
              alt="맑음"
            />
            <span className="text-Body1">{currentForecast[0].iconMessage}</span>
          </div>
          <div className="flex text-Detail text-grayScale-60 gap-[8px]">
            <div className="">{minTodayTemp}°</div>
            <div className="">{maxTodayTemp}°</div>
          </div>
        </div>
        <div className="text-Body2 text-grayScale-70 mt-[10px]">{weatherMessage}</div>
      </div>
    </div>
  );
};
