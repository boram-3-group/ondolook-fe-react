import { api } from '../../core/axios';

export interface WeatherPayload {
  format: string;
}

export interface WeatherResponse {
  current_condition: unknown[];
  nearest_area: unknown[];
  request: unknown[];
  weather: unknown[];
}

export const getWeather = async ({ format }: WeatherPayload) => {
  const res = await api.service.get<WeatherResponse>('/Seoul', { format });
  return res && res.data;
};
