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
  align = 'center',
  isShowBack,
  isShowForward,
}) => {
  const justify = align === 'center' ? 'justify-center' : 'justify-end';
  const isTitleCenter = isShowBack || !!isShowForward ? 'flex items-center justify-center' : '';
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  const onForward = () => {
    navigate(1);
  };

  return (
    <header className={`h-[44px] px-4 flex items-center ${justify} relative border-b`}>
      {!!isShowBack && (
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
      {!!isShowForward && (
        <div className="flex-1 grid justify-items-end" onClick={onForward}>
          <Icon className="self-end" name="chevron-right" width={24} height={24} />
        </div>
      )}
    </header>
  );
};
