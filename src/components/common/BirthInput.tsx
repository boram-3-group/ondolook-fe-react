import React from 'react';

interface BirthInputProps {
  value: string;
  onChange: (value: string) => void;
}

const BirthInput: React.FC<BirthInputProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');
    if (newValue.length <= 8) {
      onChange(newValue);
    }
  };

  const formatBirthDate = (value: string) => {
    if (value.length >= 4 && value.length < 6) {
      return `${value.slice(0, 4)}-${value.slice(4)}`;
    }
    if (value.length >= 6) {
      return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6)}`;
    }
    return value;
  };

  return (
    <div className="w-full mb-2.5">
      <input
        type="text"
        value={formatBirthDate(value)}
        onChange={handleChange}
        placeholder="YYYY-MM-DD"
        maxLength={10}
        className="w-full px-3 py-3 border border-gray-200 rounded-lg text-base focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default BirthInput;
