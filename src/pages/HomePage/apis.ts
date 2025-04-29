import { api } from '../../core/axios';
import {
  RegionPayload,
  RegionResponse,
  OutfitPayload,
  OutfitResponse,
  CategoryResponse,
  WeatherPayload,
  WeatherResponse,
} from './type';

export const getRegion = async ({ lat, lon }: RegionPayload) => {
  const res = await api.service.get<RegionResponse>(`/api/v1/region?lat=${lat}&lon=${lon}`);
  return res && res.data;
};

export const getOutfit = async ({ lat, lon, eventType, gender }: OutfitPayload) => {
  const res = await api.service.get<OutfitResponse>(
    `/api/v1/outfit?longitude=${lon}&latitude=${lat}&event-type-id=${eventType}&gender=${gender}`
  );
  return res && res.data;
};

export const getCategory = async () => {
  const res = await api.service.get<CategoryResponse>(`/api/v1/outfit-condition/event-types`);
  return res && res.data;
};

export const getWeather = async ({ lat, lon }: WeatherPayload) => {
  const res = await api.service.get<WeatherResponse>(
    `/api/v1/weather/position?lat=${lat}&lon=${lon}`
  );
  return res && res.data;
};
