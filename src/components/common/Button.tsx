import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  "items-center justify-center rounded-md",  //공통속성
  {
  variants: {
    intent: {
      primary: "bg-black text-white hover:bg-gray-900",
      secondary: "bg-gray-500 text-white hover:bg-gray-600",
      link: "text-primary underline hover:text-primary/80 p-0 h-auto",
    },
    size: {
      small: "text-sm py-1 px-2",
      medium: "text-base py-2 px-4",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium"
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  children: React.ReactNode;
}

export const Button = ({
  className = "",
  intent,
  size,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
     className={button({ intent, size, className })}
      {...props}
    >
      {children}
    </button>
  );
};
