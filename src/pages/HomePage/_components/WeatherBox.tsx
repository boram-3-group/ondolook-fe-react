import { Icon } from '../../../components/common/Icon';
import WeatherIcon from '../../../components/common/WeatherIcon';
import { Forecast } from '../type';

export interface currentWeatherProps {
  forecast: Forecast;
  weatherMessage: string;
  minTodayTemp: number;
  maxTodayTemp: number;
}

export const WeatherBox = ({
  forecast,
  weatherMessage,
  minTodayTemp,
  maxTodayTemp,
}: currentWeatherProps) => {
  return (
    <div className="flex px-4 py-1 rounded-xl gap-[12px] items-center bg-white">
      <div className="text-5xl font-medium leading-[150%] width-[82px]">
        {forecast.temperature}°
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between">
          <div className="flex gap-[6px]">
            <WeatherIcon
              weather={forecast.iconNumber.toString()}
              width={24}
              height={24}
              alt="맑음"
            />
            <span className="text-Body1">{forecast.iconMessage}</span>
          </div>
          <div className="flex text-Detail text-grayScale-60 ">
            <Icon className="mt-1" name="min-temparrow" width={12} height={12} alt="최저기온" />
            <div className="mr-2">{minTodayTemp}°</div>
            <Icon className="mt-1" name="max-temparrow" width={12} height={12} alt="최고기온" />
            <div className="">{maxTodayTemp}°</div>
          </div>
        </div>
        <div className="text-Body2 text-grayScale-70 mt-[10px]">{weatherMessage}</div>
      </div>
    </div>
  );
};
