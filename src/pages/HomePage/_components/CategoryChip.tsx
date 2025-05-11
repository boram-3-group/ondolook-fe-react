import React from 'react';

type CategoryChipProps = {
  onClick: () => void;
  categoryName: string;
  isActive: boolean;
};

const CategoryChip = ({ onClick, categoryName, isActive }: CategoryChipProps) => {
  const length = categoryName.length;

  const widthPercent = length >= 4 ? 'w-[80%]' : length === 3 ? 'w-[66%]' : 'w-[50%]';

  return (
    <button
      className={`${widthPercent} px-[12px] py-[6px] text-[16px] font-[500] rounded-[30px] whitespace-nowrap text-center
        ${isActive ? 'bg-primary-70 text-white' : 'bg-grayScale-0 text-grayScale-50'}`}
      onClick={onClick}
    >
      {categoryName}
    </button>
  );
};

export default React.memo(CategoryChip);
