import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string | number | string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  'aria-label'?: string;
}

export const Input = ({ className = '', placeholder, 'aria-label': ariaLabel, ...props }: InputProps) => {
  return (
    <input 
      placeholder={placeholder}
      aria-label={ariaLabel || placeholder}
      className={`w-full p-4 rounded-[12px] bg-white border border-slate-200 text-slate-900 font-sans font-normal text-[16px] placeholder:text-slate-500 placeholder:font-light focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-400 transition-all duration-300 ${className}`}
      {...props}
    />
  );
};
