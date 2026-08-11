'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3 gap-4 w-full auto-rows-[minmax(180px,auto)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface BentoCardProps extends Omit<HTMLMotionProps<'div'>, 'title'> {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2 | 3;
  headerAction?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function BentoCard({
  colSpan = 1,
  rowSpan = 1,
  headerAction,
  title,
  subtitle,
  badge,
  children,
  className,
  ...props
}: BentoCardProps) {
  const colSpanClasses = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
  };

  const rowSpanClasses = {
    1: 'row-span-1',
    2: 'row-span-2',
    3: 'row-span-3',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.008 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-white/10 bg-[#121417]/60 backdrop-blur-md p-5 flex flex-col justify-between',
        'hover:border-emerald-500/30 hover:shadow-[0_12px_36px_-4px_rgba(0,0,0,0.7),0_0_20px_-4px_rgba(16,185,129,0.15)] transition-colors duration-200',
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        className
      )}
      {...props}
    >
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />

      {/* Header section */}
      {(badge || headerAction || title || subtitle) && (
        <div className="space-y-2 mb-3 relative z-10">
          <div className="flex items-center justify-between gap-2">
            {badge && <div>{badge}</div>}
            {headerAction && <div>{headerAction}</div>}
          </div>

          {title && (
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {title}
            </h3>
          )}

          {subtitle && (
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Main Content Body */}
      <div className="relative z-10 flex-1">{children}</div>
    </motion.div>
  );
}
