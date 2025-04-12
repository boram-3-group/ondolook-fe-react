import { useState } from 'react';

type SelectItem = {
  label: string;
  value: string;
};

type SelectBoxProps = {
  selectItems: SelectItem[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const SelectBox = ({ selectItems, placeholder, onChange, value }: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectItem = (selectItem: string) => {
    onChange(selectItem);
    setIsOpen(false);
  };

  const selectedLabel = selectItems.find(item => item.value === value)?.label || placeholder;

  return (
    <>
      <div onClick={() => setIsOpen(prev => !prev)}>{selectedLabel}</div>
      {isOpen &&
        selectItems.map(selectItem => (
          <div onClick={() => handleSelectItem(selectItem.value)}>{selectItem.label}</div>
        ))}
    </>
  );
};
