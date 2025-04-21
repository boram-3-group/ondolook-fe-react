import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const button = cva(
  'flex items-center justify-center', // 기본 공통 스타일 (height는 제외)
  {
    variants: {
      intent: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        outline: 'bg-white text-gray-500 border border-gray-300 hover:bg-gray-100',
        link: 'text-Detail text-primary hover:text-primary/80 p-0 h-auto',
      },
      size: {
        large: 'px-4 text-sm',
        medium: 'px-4 py-2 text-sm',
        small: 'px-3 py-1 text-xs',
      },
      side: {
        left: 'rounded-l-lg',
        right: 'rounded-r-lg',
        full: 'rounded-lg',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
      side: 'full',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  children: React.ReactNode;
}

export const Button = ({
  className,
  intent,
  size,
  side,
  style,
  children,
  ...props
}: ButtonProps) => {
  const heightBySize: Record<string, string> = {
    large: '48px',
    medium: '40px',
    small: '32px',
  };

  return (
    <button
      className={button({ intent, size, side, className })}
      style={{ height: heightBySize[size || 'medium'], ...style }}
      {...props}
    >
      {children}
    </button>
  );
};
