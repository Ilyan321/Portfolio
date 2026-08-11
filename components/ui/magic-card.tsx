'use client';

import * as React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientColor?: string;
  gradientSize?: number;
  gradientOpacity?: number;
  enableBorderBeam?: boolean;
}

export function MagicCard({
  className,
  children,
  gradientColor = '#A855F7',
  gradientSize = 300,
  gradientOpacity = 0.15,
  enableBorderBeam = false,
  ...props
}: MagicCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-6',
        'transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]',
        className
      )}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}25, transparent 80%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Optional Border Beam */}
      {enableBorderBeam && (
        <div className="border-beam" aria-hidden="true" />
      )}

      {/* Content Slot */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
