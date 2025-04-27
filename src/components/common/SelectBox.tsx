import React, { useState } from 'react';

interface SelectBoxProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const SelectBox: React.FC<SelectBoxProps> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[48px] px-4 border border-gray-200 rounded-lg bg-[#F8F8F8] text-left flex justify-between items-center"
      >
        <span className="font-['Pretendard Variable'] text-[#1D1D1D] text-base font-medium leading-[150%] [font-feature-settings:'liga'_off,'clig'_off]">
          {value}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {options.map(option => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="w-full h-[48px] px-[16px] py-[12px] text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg font-['Pretendard Variable'] text-[#1D1D1D] text-base font-medium leading-[150%] [font-feature-settings:'liga'_off,'clig'_off]"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectBox;
