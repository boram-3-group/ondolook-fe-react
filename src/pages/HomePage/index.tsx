import { useState, useCallback } from 'react';
import CategoryChip from './_components/CategoryChip';
import { RegionTab } from './_components/RegionTab';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useFetchOutfit } from './fetches/useFetchOutfit';
import { useFetchCategory } from './fetches/useFetchCategory';
import { WeatherBox } from './_components/WeatherBox';
import { Icon } from '../../components/common/Icon';
import useLocationStore from '../../store/useLocationStore';
import { Categories } from '../../core/constants';
import Carousel from '../../components/common/Carousel';
import { useFetchRegion } from './fetches/useFetchRegion';
import { useFetchWeather } from './fetches/useFetchWeather';

export function HomePage() {
  const [selectCategory, setSelectCategory] = useState('daily');

  const onSelectChip = useCallback((Category: string) => {
    setSelectCategory(Category);
  }, []);

  useGeolocation();
  const { lat, lon } = useLocationStore();
  // const { lat, lon } = useGeolocation();
  const shouldFetch = lat !== 0 && lon !== 0;

  // const { data: RegionData, isLoading: RegionDataLoading } = useFetchRegion(
  //   { lat: 37.498095, lon: 127.02761 },
  //   { enabled: shouldFetch }
  // );

  // const { data: WeatherData, isLoading: WeatherDataLoading } = useFetchWeather({
  //   lat: 37.498095,
  //   lon: 127.02761,
  // });

  // const { data: OutfitData, isLoading: OutfitDataLoading } = useFetchOutfit({
  //   lat: 37.498095,
  //   lon: 127.02761,
  //   eventType: 1,
  //   gender: 'MALE',
  // });

  console.log('home render');

  //임시데이터
  const fileMetadata = [
    { id: 1, imageUrl: '/sample1.jpg' },
    { id: 2, imageUrl: '/sample2.jpg' },
    { id: 3, imageUrl: '/sample3.jpg' },
  ];

  // const { data: Categories, isLoading: CategoriesLoading } = useFetchCategory();

  return (
    <>
      <div className="mx-5">
        <div className="flex mb-[20px] mt-[38px] justify-between">
          {/* {RegionData && <RegionTab {...RegionData} />} */}
          <Icon name="bell" width={24} height={24} alt="알람" />
        </div>
        {/* <div className="mb-[20px]">{WeatherData && <WeatherBox {...WeatherData} />}</div> */}
        {/* {Categories?.content?.map(Category => { */}
        <div className="flex flex-wrap gap-[12px] mb-5">
          {Categories.map(Category => {
            return (
              <CategoryChip
                key={Category.id}
                categoryName={Category.categoryName}
                onClick={() => onSelectChip(Category.categoryName)}
                isActive={selectCategory === Category.categoryName}
              />
            );
          })}
        </div>
        <Carousel
          slides={fileMetadata.map(item => (
            <div
              key={item.id}
              className="relative w-full h-[458px] justify-center flex flex-col items-center mb-8 bg-grayScale-20"
            >
              <img
                src={item.imageUrl}
                alt={item.imageUrl}
                className="w-full h-[431px] mt-5 pb-5 px-[19px] object-contain bg-grayScale-10"
                draggable={false}
              />
              <Icon
                name="white-bookmark"
                width={48}
                height={48}
                alt="북마크"
                className="absolute top-4 right-4 z-10"
              />
            </div>
          ))}
        />
        <div className="flex absolute bottom-[21px]">
          <Icon name="home" width={28} height={28} className="ml-9" alt="홈" />
          <Icon name="mypage" width={28} height={28} className="mr-9" alt="마이페이지" />
        </div>
      </div>
    </>
  );
}
