import React from 'react';
import { Icon } from './Icon';
import { useNavigate, useLocation } from 'react-router-dom';

type HeaderProps = {
  title?: string;
  align?: 'center' | 'left';
  isShowBack?: boolean;
  isShowForward?: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  align = 'center',
  isShowBack,
  isShowForward,
}) => {
  const hasButtons = isShowBack || isShowForward;
  const justify = hasButtons
    ? 'justify-between'
    : align === 'center'
      ? 'justify-center'
      : 'justify-start';
  const titleAlign = hasButtons ? 'text-center' : align === 'center' ? 'text-center' : 'text-left';
  const navigate = useNavigate();
  const location = useLocation();

  const canGoBack = window.history.length > 1 && location.key !== 'default';
  const canGoForward = window.history.length > 1 && location.key !== 'default';

  const onBack = () => {
    navigate(-1);
  };

  const onForward = () => {
    navigate(1);
  };

  return (
    <header className={`h-[44px] px-4 flex items-center ${justify} relative`}>
      <div className="flex-1 grid" onClick={onBack}>
        {isShowBack && canGoBack && (
          <Icon className="flex-grow-" name="chevron-left" width={24} height={24} />
        )}
      </div>
      {title && (
        <div className={`flex-1 ${titleAlign}`}>
          <span className={`font-semibold text-base text-[20px] font-bold`}>{title}</span>
        </div>
      )}
      <div className="flex-1 grid justify-items-end" onClick={onForward}>
        {isShowForward && canGoForward && (
          <Icon className="self-end" name="chevron-right" width={24} height={24} />
        )}
      </div>
    </header>
  );
};
