import React from 'react';

type CategoryChipProps = {
  onClick: () => void;
  categoryName: string;
  isActive: boolean;
};

const CategoryChip = ({ onClick, categoryName, isActive }: CategoryChipProps) => {
  return (
    <>
      <button
        className={`flex-1 px-[12px] py-[6px] justify-center items-center rounded-[30px] text-[16px] font-[500] ${isActive ? 'bg-primary-70 text-white' : 'bg-grayScale-0 text-grayScale-50'}`}
        onClick={onClick}
      >
        {categoryName}
      </button>
    </>
  );
};

export default React.memo(CategoryChip);
