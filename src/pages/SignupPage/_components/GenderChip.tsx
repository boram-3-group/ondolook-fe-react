type GenderChipProps = {
  onClick: () => void;
  label: string;
  value: string;
  isActive: boolean;
};

const GenderChip = ({ onClick, label, value, isActive }: GenderChipProps) => {
  return (
    <button
      type="button"
      className={`px-4 py-3 text-Body2 items-center rounded-lg bg-grayScale-5 ${isActive ? 'border border-grayScale-50' : ''}`}
      onClick={onClick}
      key={value}
    >
      {label}
    </button>
  );
};

export default GenderChip;
