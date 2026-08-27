# Ilyan Khan — Systems & AI Engineer Portfolio

The official, production-grade Next.js portfolio and project showcase for Ilyan Khan. Built with a focus on brutalist UI design, mechanical luxury, and a deeply integrated full-stack PostgreSQL architecture.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase)

## 🌐 Live Website
**[https://ilyankhan.tech](https://ilyankhan.tech)**

---

## 🛠️ Architecture & Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + Framer Motion (for modal kinematics)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (for the internal Admin Portal)
- **Analytics:** Google Analytics (GA4) integrated via `@next/third-parties`
- **Deployment:** Vercel (Edge Network)

## ✨ Core Features

1. **Dynamic Bento Grid UI:** A highly responsive, Framer Motion-powered grid layout showcasing projects, credentials, and real-time GitHub analytics.
2. **Server-Side Rendered (SSR):** Optimized for SEO with custom OpenGraph metadata and a dynamically generated `sitemap.xml`.
3. **Internal Admin Portal:** A secure, password-protected backend (`/admin`) allowing real-time CRUD operations on the portfolio database without requiring code commits.
4. **Accessibility SEO Engine:** A hidden `sr-only` engine that explicitly renders all dynamically fetched project data as raw semantic HTML for optimal Google indexing.

---

## 🚀 Local Development

To run this repository locally, you will need a Supabase project and the required environment variables.

### 1. Clone the repository
```bash
git clone https://github.com/Ilyan321/Portfolio.git
cd Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_PASSWORD=your_secure_admin_password
JWT_SECRET=your_jwt_secret
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

*Designed and engineered by Ilyan Khan.*
