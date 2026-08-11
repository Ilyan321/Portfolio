# 🏛️ UI/UX Engineering & Design Tokens
## Anti-Gravity Design System: Studio Minimal & Precision Monolith
**Target Entity:** Ilyan Khan (`Ilyan321`)  
**Document Version:** 1.0.0-PROD  
**Author:** Lead Systems Architect & Principal Software Engineer  
**Status:** Approved for Implementation  

---

## 1. Color Architecture & Token Taxonomy

The visual identity is anchored on an **Industrial Obsidian & Emerald Signal** palette. It eschews generic high-saturation AI gradients in favor of subtle, high-contrast structural depths.

| Token Name | Hex / CSS Value | Description & Application |
| :--- | :--- | :--- |
| `--canvas-base` | `#08090A` | Deep obsidian foundation; zero light pollution. |
| `--canvas-subtle` | `#0D0F12` | Secondary section canvas and background layer separation. |
| `--surface-card` | `rgba(18, 20, 23, 0.70)` | Frosted monolithic card surface with `backdrop-filter: blur(12px)`. |
| `--surface-hover` | `rgba(28, 32, 38, 0.85)` | Interactive surface state on hover. |
| `--border-subtle` | `rgba(255, 255, 255, 0.08)` | 1px structural micro-gridlines and container perimeter borders. |
| `--border-hover` | `rgba(255, 255, 255, 0.20)` | Highlighted border state during pointer hover. |
| `--border-accent` | `rgba(16, 185, 129, 0.35)` | Emerald structural highlight on active/focused elements. |
| `--text-primary` | `#F3F4F6` | High-contrast clean off-white for titles, headers, and key copy. |
| `--text-muted` | `#9CA3AF` | Neutral slate for descriptive body text and architectural annotations. |
| `--text-dim` | `#6B7280` | Low-emphasis monospaced metadata and micro-labels. |
| `--signal-emerald` | `#10B981` | Vibrant primary signal (active status, live links, high grades). |
| `--signal-emerald-dark` | `#059669` | Muted signal gradient baseline and border accents. |
| `--signal-amber` | `#F59E0B` | Secondary warning signal (e.g. experimental feature tag). |
| `--signal-rose` | `#F43F5E` | Destructive admin action signal (delete, error state). |

---

## 2. Typography Rules & Scale

The design system pairs a contemporary Swiss-inspired sans-serif for editorial clarity with a high-density monospaced font for technical precision.

### 2.1 Font Families
* **Primary Display Sans:** `Geist Sans`, `Plus Jakarta Sans`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
* **Technical Monospace:** `Geist Mono`, `JetBrains Mono`, `Fira Code`, `monospace`

### 2.2 Typographic Hierarchy Scale

| Role | Font Family | Size | Weight | Tracking / Leading |
| :--- | :--- | :--- | :--- | :--- |
| **Monolith Title (H1)** | Primary Sans | `clamp(2.5rem, 5vw, 4.5rem)` | `700 (Bold)` | `-0.04em / 1.05` |
| **Section Header (H2)** | Primary Sans | `clamp(1.75rem, 3vw, 2.5rem)` | `600 (SemiBold)` | `-0.03em / 1.15` |
| **Card Header (H3)** | Primary Sans | `1.35rem (21.6px)` | `600 (SemiBold)` | `-0.02em / 1.25` |
| **Subheader (H4)** | Primary Sans | `1.10rem (17.6px)` | `500 (Medium)` | `-0.01em / 1.30` |
| **Editorial Body Text** | Primary Sans | `0.95rem (15.2px)` | `400 (Regular)` | `0.00em / 1.60` |
| **Technical Label (Mono)**| Tech Mono | `0.80rem (12.8px)` | `500 (Medium)` | `+0.05em / 1.20` |
| **Micro Tag (Mono)** | Tech Mono | `0.72rem (11.5px)` | `600 (SemiBold)` | `+0.08em / 1.00` |

---

## 3. Motion Physics Spec (Framer Motion)

Motion is strictly bounded to physical spring mechanics to ensure absolute responsiveness without perceptual delay.

### 3.1 Strict Physics Presets

```typescript
// src/lib/utils/motion.ts
import type { Transition, Variants } from 'framer-motion';

// Primary Instantaneous Spring (No float, no overshoot)
export const FAST_SPRING: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

// Subtle Content Reveal Stagger
export const CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

export const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: FAST_SPRING,
  },
};

// Card Hover Elevation Physics
export const CARD_HOVER_MOTION = {
  whileHover: { y: -3, transition: FAST_SPRING },
  whileTap: { scale: 0.995, transition: FAST_SPRING },
};
```

---

## 4. Bento Grid Architectural Wireframe

The public showcase is rendered as a responsive **12-column Bento Grid** providing intentional asymmetrical visual rhythm.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              PUBLIC BENTO GRID ARCHITECTURE                            │
├────────────────────────────────────────────────────────┬───────────────────────────────┤
│                                                        │                               │
│  TIER 1 PRIMARY FLAGSHIP CASE STUDY                    │  TIER 2 FLAGSHIP CASE STUDY   │
│  [ Schema-Aware SQL Agent ]                           │  [ The Hogwarts Archivist ]   │
│                                                        │                               │
│  • 12-col Desktop: span 8 (Width) x 2 (Height)         │  • 12-col Desktop: span 4 x 2 │
│  • Features: Live AST Security Parser Interactive      │  • Features: RAG Flow Diagram │
│    Visualizer + Yale Spider Benchmark Matrix           │    + Paragraph Citation Demo  │
│                                                        │                               │
├───────────────────────────────┬────────────────────────┴───────┬───────────────────────┤
│                               │                                │                       │
│  TIER 2 FLAGSHIP CASE STUDY   │  TIER 2 FULL-STACK APP         │  LIVE BIO / STATUS    │
│  [ VibeGuard ]                │  [ EduFocus Attendance Portal ]│  [ Engineering Bio ]  │
│                               │                                │                       │
│  • 12-col Desktop: span 4 x 2 │  • 12-col Desktop: span 4 x 2  │  • 12-col Desktop:    │
│  • Multi-label Risk Gauges    │  • Supabase Real-Time Sync     │    span 4 x 2         │
│    (DistilBERT 86.67% Acc)    │    + React 18 / Tailwind v4    │  • QUEST 3.10 CGPA    │
│                               │                                │    + 4 Internships    │
├───────────────────────────────┼────────────────────────────────┼───────────────────────┤
│                               │                                │                       │
│  CAPABILITY 1x1               │  CAPABILITY 1x1                │  CAPABILITY 1x1       │
│  [ Spatial Classroom ]        │  [ School Attendance System ]  │  [ Email Spam Filter ]│
│                               │                                │                       │
│  • span 4 x 1                 │  • span 4 x 1                  │  • span 4 x 1         │
│  • Netlify Edge Groq Stream   │  • Next.js 15 App Router       │  • DistilBERT 99.05%  │
│                               │                                │                       │
└───────────────────────────────┴────────────────────────────────┴───────────────────────┘
```
