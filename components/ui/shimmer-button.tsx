'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = '#A855F7',
      shimmerSize = '0.08em',
      shimmerDuration = '3s',
      borderRadius = '100px',
      background = 'rgba(15, 23, 42, 0.9)',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            '--spread': '90deg',
            '--shimmer-color': shimmerColor,
            '--radius': borderRadius,
            '--speed': shimmerDuration,
            '--cut': shimmerSize,
            '--bg': background,
          } as React.CSSProperties
        }
        className={cn(
          'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-5 py-2.5 text-white font-medium text-xs font-mono [background:var(--bg)] [border-radius:var(--radius)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
          'border border-white/10 shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]',
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Container for the rotating shimmer gradient */}
        <div
          className="-z-30 blur-[2px] absolute inset-0 overflow-visible [container-type:size]"
        >
          <div className="absolute inset-0 h-[100cqh] animate-spin-slow [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div className="animate-spin-slow [background:conic-gradient(from_0deg,transparent_0_340deg,var(--shimmer-color)_360deg)] absolute -inset-full w-auto rotate-0" />
          </div>
        </div>

        {children}

        {/* Highlight inner border */}
        <div className="insert-0 absolute size-full rounded-[var(--radius)] px-4 py-1.5 text-xs font-medium shadow-[inset_0_-2px_6px_rgba(255,255,255,0.2)]" />
      </button>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';
