type CategoryChipProps = {
  onClick: () => void;
  label: string;
  isActive: boolean;
};

const CategoryChip = ({ onClick, label, isActive }: CategoryChipProps) => {
  return (
    <>
      <button
        className={`${isActive ? 'border-4 border-red-50' : 'border border-gray-400'}`}
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
};

export default CategoryChip;
