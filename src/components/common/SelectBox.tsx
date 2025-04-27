import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectBoxProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

const SelectBox: React.FC<SelectBoxProps> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[48px] px-4 border border-gray-200 rounded-lg bg-[#F8F8F8] text-left flex justify-between items-center"
      >
        <span className="text-[#1D1D1D] text-base font-medium leading-[150%] [font-feature-settings:'liga'_off,'clig'_off]">
          {selectedOption?.label || '선택하세요'}
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
          {options.map((option, index) => (
            <React.Fragment key={option.value}>
              <button
                onClick={() => handleSelect(option.value)}
                className="w-full h-[48px] px-[16px] py-[12px] text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg font-['Pretendard Variable'] text-[#1D1D1D] text-base font-medium leading-[150%] [font-feature-settings:'liga'_off,'clig'_off] flex justify-between items-center"
              >
                {option.label}
                {value === option.value && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M13.3333 4L5.99996 11.3333L2.66663 8"
                      stroke="#1E90FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              {index < options.length - 1 && <div className="mx-[16px] h-[1px] bg-gray-200" />}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectBox;
