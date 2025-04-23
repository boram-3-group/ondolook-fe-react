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

export const Header: React.FC<HeaderProps> = ({ title, align = 'center' }) => {
  const justify = align === 'center' ? 'justify-center' : 'justify-end';

  return (
    <header className={`h-[44px] px-4 flex items-center ${justify} relative border-b`}>
      <Icon name="chevron-left" />
      <span className="font-semibold text-base">{title}</span>
    </header>
  );
};
