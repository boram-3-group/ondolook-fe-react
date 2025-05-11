import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputClassName = cva('w-full rounded-md', {
  variants: {
    inputHeight: {
      small: 'h-[48px] px-4 py-3',
      medium: 'h-[56px] px-4 py-3',
    },
    isDisabled: {
      true: 'bg-grayScale-20 placeholder:text-[16px] text-grayScale-50 font-[500]',
      false: 'bg-grayScale-5 placeholder:text-Body1 placeholder:text-grayScale-50',
    },
  },
  defaultVariants: {
    inputHeight: 'small',
    isDisabled: false,
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputClassName> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', inputHeight, disabled = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={inputClassName({ inputHeight, isDisabled: disabled, className })}
        disabled={disabled}
        {...props}
      />
    );
  }
);
