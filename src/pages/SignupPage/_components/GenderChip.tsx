type GenderChipProps = {
  onClick: () => void;
  label: string;
  value: string;
  isActive: boolean;
};

const GenderChip = ({ onClick, label, value, isActive }: GenderChipProps) => {
  return (
    <>
      <button
        type="button"
        key={value}
        className={`${isActive ? 'border-4 border-red-50' : 'border border-gray-400'}`}
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
};

export default GenderChip;
