import { useQuery } from '@tanstack/react-query';
import { getWeather } from '../apis';
import { WeatherResponse, WeatherPayload } from '../apis';

// 관심사분리
// 데이터 fetch / parse
export const useFetchWeather = ({ format }: WeatherPayload) => {
  return useQuery({
    queryKey: ['weather', format],
    queryFn: async () => filterData(await getWeather({ format })),
  });
};

// 데이터 필요시 가공
const filterData = (data: WeatherResponse) => {
  return {
    current_condition: data.current_condition,
    nearest_area: data.nearest_area,
    request: data.request,
    weather: data.weather,
  };
};
