# 🏛️ Product Requirements Document (PRD)
## Anti-Gravity UI/UX Portfolio & Dynamic CMS
**Target Entity:** Ilyan Khan (`Ilyan321`) — Software Developer & AI Systems Engineer  
**Document Version:** 1.0.0-PROD  
**Author:** Lead Systems Architect & Principal Software Engineer  
**Status:** Approved for Implementation  

---

## 1. Executive Summary & Brand Positioning

### 1.1 Objective
To architect, build, and deploy an uncompromising, high-craft developer portfolio and administrative Content Management System (CMS) for **Ilyan Khan**. The platform serves as the definitive digital artifact for top-tier tech recruiters, engineering leaders, and enterprise collaborators, proving senior-level execution across Generative AI architectures (LoRA fine-tuning, RAG, multi-label NLP) and modern full-stack systems (Next.js 15, TypeScript, Supabase, Drizzle ORM).

### 1.2 The "Anti-AI-Slop" Philosophy & Visual Signature
Generic AI-generated templates ("AI slop") are characterized by superficial gimmicks: floating particle canvas clouds, purple/cyan neon saturation, laggy parallax scroll-jacking, vanity GitHub commit heatmaps, and hollow star count widgets.

This system executes the antithesis: **Studio Minimal & Precision Monolith**.
* **Typographic Hierarchy:** High-density, monospaced metadata paired with structured Swiss-style display typography.
* **Architectural Geometry:** 1px micro-gridlines, sharp structural borders (`rgba(255, 255, 255, 0.08)`), sub-pixel card bevels, and crisp dark obsidian surfaces (`#08090A`).
* **Motion Physics:** Strictly bounded Framer Motion springs (`stiffness: 300, damping: 30`, duration < 0.2s) eliminating visual latency.
* **Editorial Case Studies:** In-depth engineering breakdowns detailing problem formulation, architecture diagrams, benchmark trade-offs, and verified production links.

---

## 2. Stakeholder Profiles & Core Personas

| Persona | Primary Needs & Evaluation Criteria | Key Interface Touchpoints |
| :--- | :--- | :--- |
| **Principal Engineers & Tech Leads** | Code quality, architectural depth, system safety layers (e.g., SQL AST firewall), ML quantization trade-offs, and edge latency guarantees. | Architecture modal breakdowns, deep-dive tech stack pills, direct GitHub repository / Hugging Face links. |
| **Executive Recruiters & Hiring Managers** | Clear proof of impact, verified internship pedigree (IntelliVerse, Arch Technologies), institutional credentials (QUEST Nawabshah), and direct communication paths. | Quick-look executive elevator pitches, verifiable certificate previews, one-click PDF CV download, instant contact dispatch. |
| **Site Owner (`Ilyan321`)** | Zero-friction CMS to override project data, reorder case studies, toggle visibility, and update credentials without redeploying code. | Password-guarded `/admin` dashboard with optimistic client state updates via TanStack Query. |

---

## 3. Functional Requirements

### 3.1 Public Exhibition & Editorial Bento Grid
* **FR-PUB-01: Hero Monolith & Dynamic Status Engine**
  * Displays high-impact identity lockup: Name, verified title ("Software Developer & AI Systems Engineer"), geo-badge ("Nawabshah, Sindh, Pakistan"), and instant contact hooks.
  * Provides quick-access links to LinkedIn, GitHub, Hugging Face, and a direct download trigger for [`CV.pdf`](file:///home/ilyan/portfolio/CV.pdf).
* **FR-PUB-02: Asymmetrical Bento Grid Showcase**
  * Renders a responsive bento grid organizing curated flagship projects by impact tier:
    * **Tier 1 Primary Case Study (3x2 span):** *Schema-Aware SQL Agent* with interactive AST security visualizer preview.
    * **Tier 2 Flagship Case Studies (2x2 span):** *Hogwarts Archivist (RAG)*, *VibeGuard (DistilBERT)*, and *EduFocus Attendance Portal (React/Supabase)*.
    * **Tier 3 Engineering Capabilities (1x1 span):** *Spatial Classroom*, *School Attendance Next.js*, and *Email Spam Filter*.
* **FR-PUB-03: Editorial Project Detail Modals (Shallow Routing / RSC)**
  * Clicking any case study launches an architectural inspection modal (or dedicated route `/project/[slug]`) rendering:
    * Executive elevator pitch and AI quality grade.
    * Technical problem statement & algorithmic solution.
    * Architecture topology flow and dependencies manifest.
    * Live demo iframe/launcher + GitHub repository link.
* **FR-PUB-04: Academic & Institutional Credential Matrix**
  * Visualizes academic standing at QUEST Nawabshah with semester CGPA trajectory cards (`3.13` -> `3.05` -> `3.10 Aggregate` -> `2.96`).
  * Displays intermediate credential at IBA Public School Larkana.
* **FR-PUB-05: Verified Experience & Internship Timeline**
  * Chronological timeline of verified internships (IntelliVerse, Arch Technologies, Coretech Innovations, CodeAlpha) with role scopes and core contributions.
* **FR-PUB-06: Interactive Certificate Vault**
  * Grid rendering certified credentials (Google Cybersecurity, AI Essentials, Prompting Essentials, Agile Essentials, etc.) with local preview modals and direct Google Drive verification links.
* **FR-PUB-07: Contact Dispatch Hub**
  * Async contact form connected to Google Apps Script webhook with local validation, input sanitization, and optimistic submission states.

---

### 3.2 Secure Dynamic Administrative CMS (`/admin`)
* **FR-ADM-01: Password-Guarded Authentication**
  * Secure route `/admin/login` backed by Auth.js / NextAuth v5 utilizing bcrypt password hashing and HTTP-only JWT session cookies.
  * Automatic redirection and middleware interception for unauthenticated attempts to `/admin/*` or `/api/admin/*`.
* **FR-ADM-02: Project Override Engine**
  * Provides an administrative interface allowing the owner to:
    * Create, Edit, Reorder, and Soft-delete projects.
    * Override title, summary, elevator pitch, tech tags, GitHub URL, live demo URL, and quality grade.
    * Toggle `featured` and `published` status without modifying code or redeploying.
* **FR-ADM-03: Optimistic Mutation UX**
  * All CMS interactions utilize TanStack Query v5 with optimistic UI updates and instant cache rollback on server failure.
* **FR-ADM-04: Static Seed Fallback Mechanism**
  * If the remote Supabase database is unreachable or cold, the public interface falls back gracefully to static seed data (`Projects.md` and `Information.md`), ensuring 100.00% public uptime.

---

## 4. Non-Functional Requirements (Performance & Security)

### 4.1 Performance & Core Web Vitals
* **NFR-PERF-01 (Frame Budget):** UI animations and micro-interactions locked to a steady **60 FPS**; no frame-dropping CSS transitions or long-running layout recalculations.
* **NFR-PERF-02 (LCP):** Largest Contentful Paint under **100ms** on edge server rendering.
* **NFR-PERF-03 (CLS):** Cumulative Layout Shift strictly **0.00**; all image containers and typography slots maintain explicit bounding dimensions.
* **NFR-PERF-04 (Bundle Budget):** Initial client JavaScript payload < **85 KB** gzipped (excluding React core runtime).

### 4.2 Security Architecture (OWASP Alignment)
* **NFR-SEC-01 (Admin Guard):** Next.js Edge Middleware guarding all administrative endpoints; invalid credentials receive immediate 401/403 responses.
* **NFR-SEC-02 (SQL Injection Prevention):** Drizzle ORM parameterized SQL queries parameterized end-to-end; no raw string concatenation.
* **NFR-SEC-03 (XSS & Header Protection):** Strict Content Security Policy (CSP), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and input sanitization on all form payloads.
* **NFR-SEC-04 (Rate Limiting):** API routes rate-limited to 10 requests/minute per IP for contact and admin authentication attempts.

---

## 5. Explicit Exclusions (Out of Scope)

To maintain absolute high-craft integrity and eliminate AI-template tropes, the following are strictly prohibited:
* ❌ Continuous background canvas particle nets or physics balls.
* ❌ Laggy scroll-jacking libraries (SmoothScroll, full-page snapping).
* ❌ GitHub commit contribution heatmaps and public star/fork counter counters.
* ❌ Floating gradient orbs with over-saturated magenta/cyan color schemes.
* ❌ Heavy Three.js / WebGL 3D loader scenes that introduce mobile battery drain.
