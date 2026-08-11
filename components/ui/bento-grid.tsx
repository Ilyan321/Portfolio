import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BentoGrid({ className, children, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)] max-w-7xl mx-auto w-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface BentoCardProps extends HTMLMotionProps<'div'> {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2 | 3;
  headerAction?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  showGlow?: boolean;
}

export const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  (
    {
      className,
      colSpan = 1,
      rowSpan = 1,
      headerAction,
      title,
      subtitle,
      badge,
      showGlow = true,
      children,
      ...props
    },
    ref
  ) => {
    const colSpanClasses = {
      1: 'col-span-1',
      2: 'col-span-1 md:col-span-2',
      3: 'col-span-1 md:col-span-3',
    };

    const rowSpanClasses = {
      1: 'row-span-1',
      2: 'row-span-1 md:row-span-2',
      3: 'row-span-1 md:row-span-3',
    };

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.008,
          transition: { type: 'spring', stiffness: 300, damping: 30 },
        }}
        whileTap={{
          scale: 0.995,
          transition: { type: 'spring', stiffness: 300, damping: 30 },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'group relative overflow-hidden rounded-md p-5 md:p-6',
          'glass-panel bg-[#121417]/60 backdrop-blur-md border border-white/[0.08]',
          'hover:border-emerald-500/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]',
          'flex flex-col justify-between transition-colors duration-200',
          colSpanClasses[colSpan],
          rowSpanClasses[rowSpan],
          className
        )}
        {...props}
      >
        {/* Subtle Radial Micro-Grid Hover Glow */}
        {showGlow && (
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.06), transparent 40%)',
            }}
            aria-hidden="true"
          />
        )}

        {/* Structural 1px Corner Accents (Studio Minimal) */}
        <div className="pointer-events-none absolute top-0 left-0 h-2 w-2 border-t border-l border-white/20 transition-colors group-hover:border-emerald-500/50" />
        <div className="pointer-events-none absolute top-0 right-0 h-2 w-2 border-t border-r border-white/20 transition-colors group-hover:border-emerald-500/50" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/20 transition-colors group-hover:border-emerald-500/50" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-white/20 transition-colors group-hover:border-emerald-500/50" />

        {/* Card Header (if title or badge provided) */}
        {(title || badge || headerAction) && (
          <div className="relative z-10 flex items-start justify-between gap-3 mb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {badge}
                {title && (
                  <h3 className="font-semibold text-base md:text-lg tracking-tight text-[#F3F4F6] group-hover:text-white transition-colors">
                    {title}
                  </h3>
                )}
              </div>
              {subtitle && (
                <p className="text-xs md:text-sm text-[#9CA3AF] leading-relaxed line-clamp-2">
                  {subtitle}
                </p>
              )}
            </div>
            {headerAction && <div className="shrink-0">{headerAction}</div>}
          </div>
        )}

        {/* Main Card Content Slot */}
        <div className="relative z-10 flex-1 flex flex-col justify-between">
          {children}
        </div>
      </motion.div>
    );
  }
);

BentoCard.displayName = 'BentoCard';
