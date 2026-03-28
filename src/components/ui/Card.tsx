import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'dark' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'md'
}: CardProps) => {
  const variants = {
    default: 'bg-white shadow-card',
    glass: 'bg-white/80 backdrop-blur-md border border-white/20 shadow-xl',
    dark: 'bg-slate-900 text-white border border-slate-800',
    outline: 'bg-transparent border border-slate-200'
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6', // 24px
    lg: 'p-12'
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`rounded-[16px] transition-all duration-300 hover:shadow-2xl ${variants[variant]} ${paddings[padding]} ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  key?: React.Key;
}

export const FeatureCard = ({ icon, title, description, className = '' }: FeatureCardProps) => (
  <Card className={`${className}`}>
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6"
    >
      {icon}
    </motion.div>
    <h3 className="mb-3">{title}</h3>
    <p className="card-desc text-slate-500 leading-relaxed">{description}</p>
  </Card>
);
