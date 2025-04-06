import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const inputClassName = cva(
    "rounded-md border",
    {
      variants: {
        inputHeight: {
          small: "h-[40px] text-sm",
          medium: "h-[56px] text-base",
        },
      },
      defaultVariants: {
        inputHeight: "medium",
      },
    }
  );
  

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputClassName> {
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", inputHeight, ...props }, ref) => {
      return (
        <input
          ref={ref}
          className={inputClassName({ inputHeight, className })}
          {...props}
        />
      );
    }
  );

