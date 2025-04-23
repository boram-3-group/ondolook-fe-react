import { useState } from 'react';
import CategoryChip from './_components/CategoryChip';
import Nav from '../../components/Layout/Nav';
import { RegionTab } from './_components/RegionTab';
import { useGeolocation } from '../../hooks/useGeolocation';
import LocationStore from '../../store/LocationStore';
import { useFetchOutfit } from './fetches/useFetchOutfit';
import { useFetchCategory } from './fetches/useFetchCategory';

export function HomePage() {
  const [selectCategory, setSelectCategory] = useState('daily');

  const onSelectChip = (Category: string) => {
    setSelectCategory(Category);
  };

  useGeolocation();
  const { lat, lon } = LocationStore();
  const { data, isLoading } = useFetchOutfit({
    lat: 37.498095,
    lon: 127.02761,
    eventType: 1,
    gender: 'MALE',
  });

  const { data: Categories, isLoading: CategoriesLoading } = useFetchCategory();

  return (
    <>
      Home
      <RegionTab></RegionTab>
      <div>{JSON.stringify(isLoading)}</div>
      <div> {JSON.stringify(data)}</div>
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
      <div>
        <Nav></Nav>
      </div>
    </>
  );
}
