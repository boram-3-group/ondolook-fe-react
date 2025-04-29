import { Icon } from '../../../components/common/Icon';
import { useGeolocation } from '../../../hooks/useGeolocation';
import useLocationStore from '../../../store/useLocationStore';
import { useFetchWeather } from '../fetches/useFetchWeather';

export const WeatherBox = () => {
  useGeolocation();
  const { lat, lon } = useLocationStore();

  const shouldFetch = lat !== 0 && lon !== 0;
  // console.log('weather render!');
  // const { data, isLoading } = useFetchWeather({ lat: 37.498095, lon: 127.02761 });

  return (
    <div className="flex px-4 py-1 border rounded-xl gap-[12px] items-center">
      {/* <div> {JSON.stringify(data)}</div> */}
      <div className="text-5xl font-medium leading-[150%]">22°</div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex gap-[6px]">
            <Icon name="clear-sun" width={24} height={24} alt="맑음" />
            <span className="text-Body1">맑음</span>
          </div>
          <div className="flex text-Detail text-grayScale-60 gap-[8px]">
            <div className="">↓6°</div>
            <div className="">↑30°</div>
          </div>
        </div>
        <div className="text-Body2 text-grayScale-70 mt-[10px]">
          오후 6시부터 비 예보, 우산 필요!
        </div>
      </div>
    </div>
  );
};
