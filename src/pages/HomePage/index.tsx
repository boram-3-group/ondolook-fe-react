import { useState } from 'react';
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

export function HomePage() {
  const [selectCategory, setSelectCategory] = useState('daily');

  const onSelectChip = (Category: string) => {
    setSelectCategory(Category);
  };

  useGeolocation();
  const { lat, lon } = useLocationStore();
  const { data, isLoading } = useFetchOutfit({
    lat: 37.498095,
    lon: 127.02761,
    eventType: 1,
    gender: 'MALE',
  });

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
          <RegionTab></RegionTab>
          <Icon name="bell" width={24} height={24} alt="알람" />
        </div>
        {/* <div> {JSON.stringify(data)}</div> */}
        <div className="mb-[20px]">
          <WeatherBox></WeatherBox>
        </div>
        {/* {Categories?.content?.map(Category => { */}
        <div className="flex flex-wrap gap-[12px]">
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
      </div>
    </>
  );
}
