import { useState, useCallback, useEffect } from 'react';
import CategoryChip from './_components/CategoryChip';
import { RegionTab } from './_components/RegionTab';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useFetchOutfit } from './fetches/useFetchOutfit';
import { useFetchCategory } from './fetches/useFetchCategory';
import { WeatherBox } from './_components/WeatherBox';
import { Icon } from '../../components/common/Icon';
import { useLocationStore } from '../../store/useLocationStore';
import { useFetchRegion } from './fetches/useFetchRegion';
import { useFetchWeather } from './fetches/useFetchWeather';
import useWeatherStore from '../../store/useWeatherStore';
import MainCarousel from '../../components/common/MainCarousel';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function HomePage() {
  const [selectCategory, setSelectCategory] = useState('비즈니스');
  const navigate = useNavigate();
  const onSelectChip = useCallback((Category: string) => {
    setSelectCategory(Category);
  }, []);

  useGeolocation();
  const { lat, lon } = useLocationStore();
  const { isAuthCheck } = useAuth();
  const setWeather = useWeatherStore(state => state.setWeather);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      toast.success('온도룩에 오신 것을 환영합니다! 🎉');
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const shouldFetch = lat !== 0 && lon !== 0;

  const { data: Categories, isLoading: CategoriesLoading } = useFetchCategory();
  const selectCategoryData = Categories?.content.find(
    Category => Category.categoryName === selectCategory
  );
  const selectCategoryId = selectCategoryData?.id;

  const { data: RegionData, isLoading: RegionDataLoading } = useFetchRegion(
    { lat: 37.498095, lon: 127.02761 },
    {
      enabled: shouldFetch,
    }
  );

  const { data: WeatherData, isLoading: WeatherDataLoading } = useFetchWeather({
    lat: 37.498095,
    lon: 127.02761,
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

  useEffect(() => {
    if (currentForecast) {
      setWeather(currentForecast.iconMessage);
    }
  }, [currentForecast, setWeather]);

  const { data: OutfitData, isLoading: OutfitDataLoading } = useFetchOutfit({
    lat: 37.498095,
    lon: 127.02761,
    eventType: selectCategoryId,
    gender: 'MALE',
  });

  const handleToggleBookmark = () => {};

  // 임시데이터
  const fileMetadata = [
    { id: 1, imageUrl: '/sample1.jpg' },
    { id: 2, imageUrl: '/sample2.jpg' },
    { id: 3, imageUrl: '/sample3.jpg' },
  ];

  return (
    <div className="flex flex-col h-full ">
      <div className="flex mb-[20px] justify-between px-4 h-[44px] items-center">
        {RegionData && <RegionTab {...RegionData} />}
        <Icon
          name="bell"
          width={24}
          height={24}
          alt="알람"
          onClick={() => isAuthCheck(() => navigate('/my/alarm'))}
        />
      </div>
      <div className="mx-5">
        <div className="mb-[20px]">
          {WeatherData && currentForecast && maxTodayTemp && minTodayTemp && (
            <WeatherBox
              forecast={currentForecast}
              weatherMessage={WeatherData.weatherMessage}
              maxTodayTemp={maxTodayTemp}
              minTodayTemp={minTodayTemp}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-[12px] mb-5">
          {Categories?.content?.map(Category => (
            <CategoryChip
              key={Category.id}
              categoryName={Category.categoryName}
              onClick={() => isAuthCheck(() => onSelectChip(Category.categoryName))}
              isActive={selectCategory === Category.categoryName}
            />
          ))}
        </div>
      </div>
      <MainCarousel
        slides={fileMetadata.map(item => (
          <div
            key={item.id}
            className="relative w-full h-full flex flex-col justify-center items-center bg-grayScale-30 rounded-lg"
          >
            <img
              src={item.imageUrl}
              alt={item.imageUrl}
              className="w-full px-5 h-full object-contain bg-grayScale-10"
              draggable={false}
            />
            <Icon
              name="white-bookmark"
              width={48}
              height={48}
              alt="북마크"
              className="absolute top-4 right-4 z-10"
              onClick={() => isAuthCheck(() => handleToggleBookmark())}
            />
          </div>
        ))}
      />
    </div>
  );
}
