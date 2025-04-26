import React from 'react';
import { Icon } from './Icon';

type HeaderProps = {
  title?: string;
  align?: 'center' | 'left';
  onForward?: () => void;
  onBack?: () => void;
};

export const Header: React.FC<HeaderProps> = ({ title, align = 'center', onBack, onForward }) => {
  const justify = align === 'center' ? 'justify-center' : 'justify-end';
  const isTitleCenter = !!onBack || !!onForward ? 'flex items-center justify-center' : '';
  return (
    <header className={`h-[44px] px-4 flex items-center ${justify} relative border-b`}>
      {!!onBack && (
        <div className="flex-1 grid" onClick={onBack}>
          <Icon className=" flex-grow-" name="chevron-left" width={24} height={24} />
        </div>
      )}
      {title && (
        <div className={`flex-1 ${isTitleCenter}`}>
          <span
            className={`font-semibold text-base flex-grow-0 text-[20px] font-bold ${isTitleCenter}`}
          >
            {title}
          </span>
        </div>
      )}
      {!!onForward && (
        <div className="flex-1 grid justify-items-end" onClick={onForward}>
          <Icon className="self-end" name="chevron-right" width={24} height={24} />
        </div>
      )}
    </header>
  );
};
