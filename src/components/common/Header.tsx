import React from 'react';
import { Icon } from './Icon';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  title?: string;
  align?: 'center' | 'left';
  isShowBack?: boolean;
  isShowForward?: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  align = 'left',
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

  const onBack = () => {
    navigate(-1);
  };

  const onForward = () => {
    navigate(1);
  };

  return (
    <header className={`h-[44px] px-4 flex items-center ${justify} relative`}>
      {hasButtons && (
        <div className="flex-1 grid" onClick={onBack}>
          {isShowBack && <Icon className="flex-grow" name="chevron-left" width={24} height={24} />}
        </div>
      )}
      {title && (
        <div className={`flex-1 ${titleAlign}`}>
          <span className="text-[#1D1D1D] font-['Pretendard'] text-[20px] font-bold leading-[150%] tracking-[0.2px]">
            {title}
          </span>
        </div>
      )}
      {hasButtons && (
        <div className="flex-1 grid justify-items-end" onClick={onForward}>
          {isShowForward && (
            <Icon className="self-end" name="chevron-right" width={24} height={24} />
          )}
        </div>
      )}
    </header>
  );
};
