export type LocationResponse = {
  lat: number;
  lon: number;
};

export interface RegionPayload {
  lat: number;
  lon: number;
}

export interface RegionResponse {
  id: string;
  sggnm: string;
  sidonm: string;
}

export interface OutfitPayload {
  lat: number;
  lon: number;
  eventType: number;
  gender: string;
}

export interface fileResponse {
  fileId: string;
  originalFilename: string;
  contentType: string;
  fileMetadata: string;
  size: number;
  presignedUrl: string;
  uploadedAt: Date;
}

export interface OutfitResponse {
  id: string;
  eventType: string;
  temperatureRange: string;
  fileMetadata: fileResponse[];
}

export interface Category {
  id: number;
  categoryName: string;
}

export interface CategoryResponse {
  content: Category[];
}

export interface WeatherPayload {
  lat: number;
  lon: number;
}

export interface Forecast {
  time: string;
  temperature: number;
  sky: number;
  pty: number;
  pop: number;
  icon: string;
  iconNumber: number;
  iconMessage: string;
}

export interface AirQuality {
  airQuality: number;
  message: string;
  iconFlag: boolean;
  grade: string;
}

export interface UvIndex {
  uvIndex: number;
  message: string | null;
  iconFlag: boolean;
  grade: string;
}

export interface WeatherResponse {
  forecasts: Forecast[];
  airQuality: AirQuality;
  uvIndex: UvIndex;
  weatherMessage: string;
}

export interface DayWeather {
  forecastDate: string;
  rainProbability: number;
  minTemperature: number;
  maxTemperature: number;
  weather: string;
}

export type WeekWeatherResponse = DayWeather[];
