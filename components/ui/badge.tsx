import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'signal' | 'outline' | 'muted' | 'grade';
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'default',
  size = 'sm',
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-[#121417] text-[#9CA3AF] border-white/10 hover:border-white/20',
    signal: 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30 hover:border-emerald-500/50',
    outline: 'bg-transparent text-[#9CA3AF] border-white/10 hover:text-[#F3F4F6] hover:border-white/20',
    muted: 'bg-white/[0.03] text-[#6B7280] border-transparent hover:text-[#9CA3AF]',
    grade: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-semibold',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px] leading-tight',
    md: 'px-2.5 py-1 text-xs leading-normal',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-mono tracking-tight uppercase rounded-sm border transition-colors duration-150 select-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
