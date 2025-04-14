import { useState } from 'react';
import CategoryChip from './_components/CategoryChip';
import { useFetchWeather } from './fetches/useFetchWeather';
import Nav from '../../components/Layout/Nav';
import { Categories } from '../../core/constants';

// interface HomePageProps {}

export function HomePage() {
  const { data, isLoading } = useFetchWeather({ format: 'j1' });
  const [selectCategory, setSelectCategory] = useState('daily');

  const onSelectChip = (Category: string) => {
    setSelectCategory(Category);
  };

  return (
    <>
      Home
      {Categories.map(Category => {
        return (
          <CategoryChip
            key={Category.value}
            label={Category.label}
            onClick={() => onSelectChip(Category.value)}
            isActive={selectCategory === Category.value}
          />
        );
      })}
      <div>
        <Nav></Nav>
      </div>
      <div>{JSON.stringify(isLoading)}</div>
      <div> {JSON.stringify(data)}</div>
    </>
  );
}
