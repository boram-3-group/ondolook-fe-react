import { useState } from 'react';
import CategoryChip from './_components/CategoryChip';
import Nav from '../../components/Layout/Nav';
import { Categories } from '../../core/constants';

// interface HomePageProps {}

export function HomePage() {
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
    </>
  );
}
