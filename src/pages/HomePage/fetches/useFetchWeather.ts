import { useQuery } from '@tanstack/react-query';
import { WeatherPayload } from '../type';
import { getWeather } from '../apis';

export const useFetchWeather = ({ lat, lon }: WeatherPayload, options?: any) => {
  return useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: async () => await getWeather({ lat, lon }),
    enabled: options?.enabled,
  });
};
