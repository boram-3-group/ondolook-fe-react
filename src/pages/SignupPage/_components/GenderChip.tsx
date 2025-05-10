type GenderChipProps = {
  onClick: () => void;
  label: string;
  value: string;
  isActive: boolean;
  className: string;
};

const GenderChip = ({ onClick, label, value, isActive, className }: GenderChipProps) => {
  return (
    <button
      type="button"
      className={`px-4 py-3 text-Body2 text-grayScale-60 items-center rounded-lg bg-grayScale-5 ${isActive ? 'border-[2px] border-grayScale-50' : ''} ${className}`} // className을 버튼에 추가
      onClick={onClick}
      key={value}
    >
      {label}
    </button>
  );
};

export default GenderChip;
