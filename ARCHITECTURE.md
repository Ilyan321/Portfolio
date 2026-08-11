# 🏛️ Technical Architecture Specification
## Anti-Gravity UI/UX Portfolio & Dynamic CMS
**Target Entity:** Ilyan Khan (`Ilyan321`)  
**Document Version:** 1.0.0-PROD  
**Author:** Lead Systems Architect & Principal Software Engineer  
**Status:** Approved for Implementation  

---

## 1. System Topology & Data Plane

The system implements a modern **Next.js 15 Server-First Hybrid Architecture** combining React Server Components (RSC) for zero-client-bundle data delivery, edge route handlers for administrative mutations, and Drizzle ORM paired with Supabase PostgreSQL for persistence.

```text
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                                   CLIENT LAYER                                       │
│                                                                                      │
│  [ Public Visitor Browser ]                    [ Authenticated Admin Browser ]        │
│          │                                                  │                        │
│          │ (Fast Server HTML + RSC Payload)                 │ (Optimistic Mutations) │
│          ▼                                                  ▼                        │
│  ┌──────────────────────────────┐              ┌──────────────────────────────────┐  │
│  │ Public Bento & Case Studies  │              │ /admin Control Panel (React 19)  │  │
│  │ Framer Motion Micro-Springs  │              │ TanStack Query v5 Client Cache   │  │
│  └──────────────┬───────────────┘              └────────────────┬─────────────────┘  │
└─────────────────┼───────────────────────────────────────────────┼────────────────────┘
                  │                                               │
                  ▼                                               ▼ (HTTP-only Session Cookie)
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                           EDGE MIDDLEWARE & SECURITY GATEWAY                         │
│                                                                                      │
│  ┌────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Next.js 15 Edge Middleware (/middleware.ts)                                    │  │
│  │ • Intercepts /admin/* and /api/admin/*                                         │  │
│  │ • Validates Auth.js (NextAuth v5) Session Token & Expiration                  │  │
│  │ • Enforces Security Headers (CSP, HSTS, X-Frame-Options, XSS Protection)       │  │
│  └────────────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────┬─────────────────────────────────────────────┘
                                         │
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                              NEXT.JS 15 APP ROUTER ENGINE                            │
│                                                                                      │
│  ┌───────────────────────────────────┐    ┌───────────────────────────────────────┐  │
│  │ React Server Components (RSC)     │    │ Server Actions & API Route Handlers   │  │
│  │ • app/page.tsx (Public Showcase)  │    │ • app/actions/projects.ts (CRUD)      │  │
│  │ • app/project/[slug]/page.tsx     │    │ • app/api/auth/[...nextauth]/route.ts │  │
│  │ • Direct Data Fetch via Drizzle   │    │ • app/api/contact/route.ts            │  │
│  └─────────────────┬─────────────────┘    └───────────────────┬───────────────────┘  │
└────────────────────┼──────────────────────────────────────────┼──────────────────────┘
                     │                                          │
                     ▼                                          ▼
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                                DATA ACCESS LAYER (ORM)                               │
│                                                                                      │
│  ┌────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Drizzle ORM (@neondatabase/serverless or postgres-js via Supabase Pooler)      │  │
│  │ • db/schema/projects.ts                                                        │  │
│  │ • db/schema/tech-tags.ts                                                       │  │
│  │ • db/schema/admin-users.ts                                                     │  │
│  │ • lib/data/static-fallback.ts (Guaranteed 100% Uptime Fallback Engine)         │  │
│  └────────────────────────────────────────┬───────────────────────────────────────┘  │
└───────────────────────────────────────────┼──────────────────────────────────────────┘
                                            │
                                            ▼
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                             PERSISTENCE & INFRASTRUCTURE                             │
│                                                                                      │
│  ┌────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Supabase PostgreSQL Cluster (AWS / Vercel Edge Connected)                      │  │
│  │ • projects, tech_tags, project_tags, admin_users, system_audit_logs            │  │
│  │ • Row Level Security (RLS) & Connection Pooling on Port 6543 / 5432            │  │
│  └────────────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Directory Tree Structure (Next.js 15 App Router)

The codebase strictly adheres to modular, domain-driven organization:

```text
/home/ilyan/portfolio/
├── .env.example                       # Documented environment variables template
├── .env.local                         # Local environment secrets (Supabase, NextAuth)
├── drizzle.config.ts                  # Drizzle ORM schema & migration configuration
├── next.config.ts                     # Next.js 15 performance & security configuration
├── package.json                       # Next.js 15, React 19, Tailwind v4, Lucide dependencies
├── postcss.config.mjs                 # PostCSS plugin integration
├── tsconfig.json                      # Strict TypeScript compiler options
├── middleware.ts                      # Edge Authentication & Security Header Guard
│
├── public/                            # Static visual assets
│   ├── Avatar.png                     # Stylized circular profile avatar
│   ├── pp.jpeg                        # High-resolution founder portrait
│   ├── favicon.svg                    # Monolith brand icon
│   ├── CV.pdf                         # Official downloadable PDF resume
│   └── certificates/                  # Original certification image documents
│       ├── cybersecurity.png
│       ├── ai-essentials.png
│       ├── prompting-essentials.png
│       └── agile-essentials.png
│
├── src/
│   ├── app/                           # Next.js 15 App Router endpoints
│   │   ├── layout.tsx                 # Root layout (Fonts, Providers, Meta, Lenis)
│   │   ├── page.tsx                   # Public monolithic portfolio page (RSC)
│   │   ├── globals.css                # Tailwind CSS v4 design tokens & base utilities
│   │   │
│   │   ├── project/                   # Standalone / Modal project inspection
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Deep-dive editorial case study route
│   │   │
│   │   ├── admin/                     # Guarded CMS Control Panel
│   │   │   ├── layout.tsx             # Admin shell layout (Sidebar, Auth Status)
│   │   │   ├── page.tsx               # Redirector -> /admin/dashboard
│   │   │   ├── login/
│   │   │   │   └── page.tsx           # Secure login portal (NextAuth v5 form)
│   │   │   └── dashboard/
│   │   │       ├── page.tsx           # Main CMS dashboard & live project table
│   │   │       ├── new/
│   │   │       │   └── page.tsx       # New project authoring studio
│   │   │       └── [id]/
│   │   │           └── page.tsx       # Project edit & override workspace
│   │   │
│   │   └── api/                       # API Route Handlers
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts       # Auth.js route handler
│   │       ├── contact/
│   │       │   └── route.ts           # Contact form proxy & rate-limiting
│   │       └── admin/
│   │           └── projects/
│   │               └── route.ts       # Admin REST endpoint for client cache sync
│   │
│   ├── actions/                       # Next.js Server Actions (Mutations)
│   │   ├── auth.ts                    # Admin credential verification actions
│   │   ├── projects.ts                # Project CRUD & reorder server actions
│   │   └── contact.ts                 # Form submission & webhook triggers
│   │
│   ├── components/                    # Modular React 19 UI Components
│   │   ├── ui/                        # Low-level primitive design system components
│   │   │   ├── Button.tsx             # Precision micro-spring action button
│   │   │   ├── Card.tsx               # Obsidian glass container with 1px border
│   │   │   ├── Badge.tsx              # Monospaced status & tech badge
│   │   │   ├── Input.tsx              # Industrial text input & textarea
│   │   │   ├── Modal.tsx              # Framer Motion spring modal portal
│   │   │   └── Tooltip.tsx            # Floating micro-metric tooltip
│   │   │
│   │   ├── portfolio/                 # Public exhibition components
│   │   │   ├── HeroMonolith.tsx       # Asymmetric identity & status lockup
│   │   │   ├── BentoGrid.tsx          # Responsive 3x2, 2x2, 1x1 project layout
│   │   │   ├── ProjectCard.tsx        # High-craft interactive case study card
│   │   │   ├── CaseStudyModal.tsx     # Architectural breakdown modal
│   │   │   ├── ExperienceTimeline.tsx # Verified internship progression
│   │   │   ├── AcademicMatrix.tsx     # QUEST CGPA & university performance
│   │   │   ├── SkillsTaxonomy.tsx     # Structured technology matrix
│   │   │   ├── CertificateVault.tsx   # Verified credential preview cards
│   │   │   └── ContactSection.tsx     # Direct dispatch & social connect
│   │   │
│   │   └── admin/                     # CMS Control Panel Components
│   │       ├── AdminHeader.tsx        # Session status & logout trigger
│   │       ├── ProjectTable.tsx       # Reorderable, filterable project grid
│   │       ├── ProjectForm.tsx        # Rich editor form with live preview
│   │       └── DeleteConfirmModal.tsx # Destructive action confirmation
│   │
│   ├── db/                            # Database & ORM Layer
│   │   ├── index.ts                   # Drizzle client instantiation & connection pool
│   │   ├── schema/                    # TypeScript schema definitions
│   │   │   ├── projects.ts            # Projects & case studies table
│   │   │   ├── tech-tags.ts           # Technology tags & relationships
│   │   │   └── admin-users.ts         # CMS admin credentials
│   │   └── seed/
│   │       └── seed.ts                # Seeding script importing curated data
│   │
│   ├── lib/                           # Shared Utilities & Business Logic
│   │   ├── auth.ts                    # NextAuth v5 configuration & JWT callbacks
│   │   ├── data/
│   │   │   ├── static-projects.ts     # In-memory curated project seeds (from Projects.md)
│   │   │   └── static-profile.ts      # In-memory biographical seeds (from Information.md)
│   │   ├── utils/
│   │   │   ├── cn.ts                  # ClassName merging utility (clsx + twMerge)
│   │   │   ├── formatters.ts          # Date, score, and text sanitizers
│   │   │   └── motion.ts              # Framer Motion strict spring presets
│   │   └── query-client.ts            # TanStack Query client configuration
│   │
│   └── types/                         # TypeScript Domain Types
│       ├── project.ts                 # Project, Case Study & Tech Tag interfaces
│       ├── profile.ts                 # Bio, Education, Internship & Cert types
│       └── cms.ts                     # Form state & API response contracts
```

---

## 3. Data Flow Matrix & Fallback Resilience

The architecture guarantees **100.00% public availability** using a multi-tiered Data Access Strategy:

```text
               Public Client Request (app/page.tsx)
                                │
                                ▼
               ┌──────────────────────────────────┐
               │ Try: Query Supabase Database     │
               │ via Drizzle ORM (Pooler Timeout: │
               │ 1500ms)                          │
               └────────────────┬─────────────────┘
                                │
                 ┌──────────────┴──────────────┐
                 │ Success                     │ Connection Error / Cold Start
                 ▼                             ▼
   ┌───────────────────────────┐ ┌────────────────────────────────────┐
   │ Return Dynamic DB Records │ │ Fallback to static-projects.ts     │
   │ Sorted by display_order   │ │ (Curated 13 Projects from Markdown)│
   └─────────────┬─────────────┘ └─────────────────┬──────────────────┘
                 │                                 │
                 └────────────────┬────────────────┘
                                  │
                                  ▼
                 ┌──────────────────────────────────┐
                 │ Render React Server Component    │
                 │ with 60s ISR / On-Demand Reval   │
                 └──────────────────────────────────┘
```

### 3.1 Optimistic Administrative Updates (TanStack Query v5)
1. **User Edit in CMS:** Admin modifies project fields in `/admin/dashboard/[id]`.
2. **Optimistic UI Cache:** TanStack Query immediately applies the update to the in-memory client cache (`queryClient.setQueryData`).
3. **Server Action Invocation:** `updateProjectAction(formData)` runs on the server, updating Supabase PostgreSQL via Drizzle.
4. **On-Demand Cache Revalidation:** `revalidatePath('/')` and `revalidatePath('/project/[slug]')` purge stale RSC caches on the edge.
5. **Rollback Safety:** If the network request fails, TanStack Query reverts the client UI to previous state and displays a destructive error toast.

---

## 4. Security & Edge Authentication Guard Model

### 4.1 Middleware Enforcement (`middleware.ts`)
The edge middleware evaluates every incoming request against a zero-trust policy:

```typescript
// Architectural Guard Logic
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // 1. Guard Administrative Routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    if (!token || token.role !== 'admin') {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('callbackUrl', encodeURIComponent(req.url));
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Guard Administrative API Routes
  if (pathname.startsWith('/api/admin')) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || token.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Administrative access required' }, { status: 401 });
    }
  }

  // 3. Apply Hardened Security Headers to all responses
  const res = NextResponse.next();
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
};
```
