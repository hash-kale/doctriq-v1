import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'slate';
  className?: string;
}

export const Badge = ({ 
  children, 
  variant = 'primary', 
  className = '' 
}: BadgeProps) => {
  const variants = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent-dark',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    error: 'bg-error text-white',
    slate: 'bg-slate-100 text-slate-600'
  };

  return (
    <span className={`inline-flex items-center px-[12px] py-[4px] rounded-[8px] microcopy uppercase tracking-widest transition-all hover:scale-105 cursor-default ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
