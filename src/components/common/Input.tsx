import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputClassName = cva('w-full rounded-md bg-grayScale-5 placeholder:text-Body2', {
  variants: {
    inputHeight: {
      small: 'h-[45px] px-4 py-3',
      medium: 'h-[56px] px-4 py-3',
    },
  },
  defaultVariants: {
    inputHeight: 'small',
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputClassName> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', inputHeight, ...props }, ref) => {
    return <input ref={ref} className={inputClassName({ inputHeight, className })} {...props} />;
  }
);
