import React from 'react';
import { Icon } from './Icon';

type HeaderProps = {
  title: string;
  align?: 'center' | 'left';
  showBack?: boolean;
  showForward?: boolean;
  onForward?: () => void;
  onBack?: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  showBack,
  showForward,
  title,
  align = 'center',
}) => {
  const justify = align === 'center' ? 'justify-center' : 'justify-end';
  return (
    <header className={`h-[44px] px-4 flex items-center ${justify} relative border-b`}>
      {showBack && (
        <div className="flex-1 grid">
          <Icon className=" flex-grow-" name="chevron-left" width={24} height={24} />
        </div>
      )}
      {title && (
        <div className="flex-1">
          <span className="font-semibold text-base flex-grow-0 text-center">1111</span>
        </div>
      )}
      {showForward && (
        <div className="flex-1 grid justify-items-end">
          <Icon className="self-end" name="chevron-right" width={24} height={24} />
        </div>
      )}
    </header>
  );
};
