type CategoryChipProps = {
  onClick: () => void;
  categoryName: string;
  isActive: boolean;
};

const CategoryChip = ({ onClick, categoryName, isActive }: CategoryChipProps) => {
  return (
    <>
      <button
        className={`${isActive ? 'border-4 border-red-50' : 'border border-gray-400'}`}
        onClick={onClick}
      >
        {categoryName}
      </button>
    </>
  );
};

export default CategoryChip;
