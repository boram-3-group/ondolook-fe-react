import React from 'react';

type HeaderProps = {
  title: string;
  align?: 'center' | 'right';
  showBack?: boolean;
  onBack?: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  align = 'center',
  showBack = false,
  onBack,
}) => {
  const justify = align === 'center' ? 'justify-center' : 'justify-end';

  return (
    <header className={`h-[44px] px-4 flex items-center ${justify} relative border-b`}>
      {showBack && (
        <button onClick={onBack} className="absolute left-4">
          &lt;
        </button>
      )}
      <span className="font-semibold text-base">{title}</span>
    </header>
  );
};
