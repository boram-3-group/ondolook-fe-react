import { useState } from 'react';
import CategoryChip from './_components/CategoryChip';
import { RegionTab } from './_components/RegionTab';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useFetchOutfit } from './fetches/useFetchOutfit';
import { useFetchCategory } from './fetches/useFetchCategory';
import { WeatherBox } from './_components/WeatherBox';
import { Icon } from '../../components/common/Icon';
import useLocationStore from '../../store/useLocationStore';

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

  const { data: Categories, isLoading: CategoriesLoading } = useFetchCategory();

  return (
    <>
      <div className="mx-5">
        <div className="mb-[20px] mt-[38px]">
          <RegionTab></RegionTab>
        </div>
        <div> {JSON.stringify(data)}</div>
        <div className="mb-[20px]">
          <WeatherBox></WeatherBox>
        </div>
        {Categories?.content?.map(Category => {
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
      <Icon name="home" width={28} height={28} alt="홈" />
      <Icon name="mypage" width={28} height={28} alt="마이페이지" />
    </>
  );
}
