import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25 font-display font-semibold',
    secondary: 'bg-accent text-slate-900 hover:bg-accent/90 shadow-lg shadow-accent/25 font-heading font-medium',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/5 font-display font-semibold',
    ghost: 'bg-transparent text-slate-600 hover:text-primary hover:bg-primary/5 font-sans font-medium',
    white: 'bg-white text-primary hover:bg-slate-50 shadow-xl font-display font-semibold'
  };

  const sizes = {
    sm: 'px-4 py-2 text-[14px]',
    md: 'px-8 py-4 text-[16px]',
    lg: 'px-10 py-5 text-[18px]'
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`rounded-[12px] transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-xl disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props as any}
    >
      {children}
    </motion.button>
  );
};
