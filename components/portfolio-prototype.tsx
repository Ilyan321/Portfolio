'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagicCard } from './ui/magic-card';
import { ShimmerButton } from './ui/shimmer-button';
import { BorderBeam } from './ui/border-beam';
import { Badge } from './ui/badge';
import {
  TerminalIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  CpuIcon,
  ExternalLinkIcon,
  GithubIcon,
  LinkedinIcon,
  FileTextIcon,
  LockIcon,
  XIcon,
  SparklesIcon,
} from './ui/icons';

interface CaseStudy {
  id: string;
  title: string;
  headline: string;
  grade: string;
  category: string;
  accentColor: string;
  elevatorPitch: string;
  challenge: string;
  architecture: string[];
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  huggingFaceUrl?: string;
  highlights: { label: string; value: string }[];
}

const ALL_PROJECTS: CaseStudy[] = [
  {
    id: 'sql-agent',
    title: 'Schema-Aware SQL Agent',
    headline: 'Production-grade NLP-to-SQL autonomous pipeline with LoRA fine-tuning and AST security firewall.',
    grade: '9.5 / 10',
    category: 'LLM Fine-Tuning & AST Security',
    accentColor: '#A855F7',
    elevatorPitch:
      'A production-grade NLP-to-SQL autonomous pipeline powered by a LoRA fine-tuned LLaMA-3-8B model trained on the Yale Spider benchmark, shielded by a multi-layer deterministic Python AST security firewall that blocks destructive queries (DROP/DELETE/ALTER) and eliminates schema leakage.',
    challenge:
      'Standard LLM text-to-SQL solutions suffer from hallucinations on complex multi-table joins and present critical vulnerability vectors (destructive mutation injections and database schema exfiltration).',
    architecture: [
      'LoRA 4-bit Quantized Fine-Tuning on LLaMA-3-8B utilizing Unsloth and TRL on the Yale Spider benchmark.',
      'Deterministic Python AST Security Firewall parsing abstract syntax trees to guarantee read-only execution.',
      'Dynamic Schema Extraction Layer dynamically injecting table structures, foreign keys, and indexes into context prompts.',
      'Hosted Inference Model deployed with public weights on the Hugging Face Model Hub.',
    ],
    techStack: ['PyTorch', 'LLaMA-3-8B', 'Unsloth', 'LoRA / PEFT', 'Transformers', 'SQLite', 'Hugging Face Hub'],
    githubUrl: 'https://github.com/Ilyan321/Schema-Aware-SQL-Agent',
    demoUrl: 'https://huggingface.co/Ilyankhan69/schema-aware-sql-agent',
    huggingFaceUrl: 'https://huggingface.co/Ilyankhan69/schema-aware-sql-agent',
    highlights: [
      { label: 'Base Model', value: 'LLaMA-3-8B (LoRA)' },
      { label: 'Benchmark', value: 'Yale Spider' },
      { label: 'Security Layer', value: '100% AST Read-Only' },
      { label: 'Quality Grade', value: '9.5 / 10' },
    ],
  },
  {
    id: 'hogwarts-archivist',
    title: 'The Hogwarts Archivist',
    headline: 'Source-attributed RAG chatbot powered by FAISS, LangChain, and Groq LLaMA 3.',
    grade: '9.2 / 10',
    category: 'Generative AI & RAG',
    accentColor: '#00F0FF',
    elevatorPitch:
      'An enterprise-grade Retrieval-Augmented Generation (RAG) conversational intelligence system for complex literary corpuses, combining LangChain vector search, FAISS similarity indexing, and Groq LLaMA 3 high-speed inference with verifiable, paragraph-level source attribution.',
    challenge:
      'LLMs generate convincing hallucinations when queried on nuanced lore without grounded retrieval context and chapter-exact provenance.',
    architecture: [
      'Recursive text chunking with metadata binding chapter, book, and paragraph coordinates.',
      'High-dimensional FAISS vector database providing sub-millisecond Euclidean similarity searches.',
      'Groq LLaMA-3 cloud acceleration processing at over 500 tokens/second for instantaneous responses.',
      'Themed conversational memory interface with expandable source citation accordions.',
    ],
    techStack: ['Python', 'LangChain', 'FAISS', 'Groq API', 'LLaMA-3', 'Streamlit', 'Hugging Face Embeddings'],
    githubUrl: 'https://github.com/Ilyan321/Hogwarts_Archivist',
    demoUrl: 'https://huggingface.co/spaces/Ilyankhan69/Hogwarts-Archivist',
    huggingFaceUrl: 'https://huggingface.co/spaces/Ilyankhan69/Hogwarts-Archivist',
    highlights: [
      { label: 'Vector Store', value: 'FAISS In-Memory' },
      { label: 'Inference Speed', value: '>500 tok/sec' },
      { label: 'Attribution', value: 'Paragraph Exact' },
      { label: 'Quality Grade', value: '9.2 / 10' },
    ],
  },
  {
    id: 'vibeguard',
    title: 'VibeGuard Content Moderation',
    headline: 'Real-time multi-label toxicity detection engine using fine-tuned DistilBERT.',
    grade: '9.0 / 10',
    category: 'Trust & Safety NLP',
    accentColor: '#F43F5E',
    elevatorPitch:
      'An AI-driven real-time toxicity and harm detection engine powered by a fine-tuned DistilBERT transformer model trained on the Jigsaw multi-label dataset, delivering instant multi-category risk probability scoring, confidence metrics, and profanity filtering.',
    challenge:
      'Moderating high-velocity live chat requires sub-50ms latency across nuanced multi-label harm vectors without heavy compute overhead.',
    architecture: [
      'Fine-tuned DistilBERT transformer achieving 86.67% accuracy across 6 toxicity labels.',
      'Sub-50ms CPU/GPU inference latency optimized for streaming websocket moderation.',
      'Interactive risk visualization with dynamic confidence gauges and custom severity thresholds.',
    ],
    techStack: ['PyTorch', 'DistilBERT', 'Transformers', 'Datasets', 'Streamlit', 'Scikit-Learn'],
    githubUrl: 'https://github.com/Ilyan321/VibeGuard',
    demoUrl: 'https://huggingface.co/spaces/Ilyankhan69/VibeGuard',
    huggingFaceUrl: 'https://huggingface.co/spaces/Ilyankhan69/VibeGuard',
    highlights: [
      { label: 'Model', value: 'DistilBERT Multi-label' },
      { label: 'Accuracy', value: '86.67% Validation' },
      { label: 'Latency', value: '< 50ms per prompt' },
      { label: 'Quality Grade', value: '9.0 / 10' },
    ],
  },
  {
    id: 'spatial-classroom',
    title: 'Spatial Classroom (Reverse Tutor)',
    headline: 'Gamified Feynman Technique learning app where you teach a stubborn AI student.',
    grade: '8.6 / 10',
    category: 'EduTech & Edge Streaming',
    accentColor: '#10B981',
    elevatorPitch:
      'A gamified "Reverse Classroom" application implementing the Feynman Technique where users test their comprehension by teaching a 12-year-old AI student named Leo whose emotional state machine reacts in real time.',
    challenge:
      'Most educational AI apps lecture to the student. Spatial Classroom flips the paradigm by challenging the user to break down complex jargon until the AI student understands.',
    architecture: [
      'Reverse-tutor state machine tracking comprehension (0-100%) and patience levels.',
      'Dual-stream Netlify Edge Functions routing student responses and hidden Teacher Co-Pilot tips.',
      'Frosted glass spatial workspace with adaptive dark/light ambient lighting.',
    ],
    techStack: ['JavaScript (ES6+)', 'Netlify Edge', 'Groq LLaMA-3', 'HTML5 Canvas', 'CSS Glassmorphism'],
    githubUrl: 'https://github.com/Ilyan321/spatial-classroom',
    highlights: [
      { label: 'Paradigm', value: 'Feynman Technique' },
      { label: 'Engine', value: 'Groq Edge Stream' },
      { label: 'State Engine', value: 'Reaction Machine' },
      { label: 'Quality Grade', value: '8.6 / 10' },
    ],
  },
  {
    id: 'edufocus',
    title: 'EduFocus Attendance Portal',
    headline: 'Real-time full-stack academic attendance Single Page Application with Supabase.',
    grade: '8.8 / 10',
    category: 'Full-Stack React & Cloud DB',
    accentColor: '#38BDF8',
    elevatorPitch:
      'A modern, enterprise-grade Single Page Application (SPA) for real-time academic attendance tracking, built with React 18, Vite, Tailwind CSS 4, and Supabase PostgreSQL with real-time sync, role-based authentication, and automated classroom analytics.',
    challenge:
      'Eliminating manual paper rosters with a secure, sub-second classroom sync interface supporting offline resiliency.',
    architecture: [
      'Supabase PostgreSQL database with Row-Level Security (RLS) policies.',
      'Optimistic batch attendance recording with instant visual status toggles.',
      'Dynamic statistical aggregations computing attendance percentages and streak trends.',
    ],
    techStack: ['React 18', 'Vite 5', 'Tailwind CSS 4', 'Supabase (PostgreSQL)', 'React Router DOM'],
    githubUrl: 'https://github.com/Ilyan321/attendance-app',
    demoUrl: 'https://Ilyan321.github.io/attendance-app/',
    highlights: [
      { label: 'Stack', value: 'React 18 + Supabase' },
      { label: 'Auth', value: 'Role-Based RLS' },
      { label: 'Sync', value: 'Real-time Bi-directional' },
      { label: 'Quality Grade', value: '8.8 / 10' },
    ],
  },
  {
    id: 'school-attendance',
    title: 'Next.js 15 School Management System',
    headline: 'Enterprise school administration platform with React Server Components & TypeScript.',
    grade: '8.5 / 10',
    category: 'Next.js 15 App Architecture',
    accentColor: '#818CF8',
    elevatorPitch:
      'A scalable school administration platform engineered with Next.js 15 App Router, TypeScript, and Tailwind CSS, featuring institutional schedule orchestration and role-differentiated dashboards.',
    challenge:
      'Structuring clean multi-role dashboard architecture for administrators, teachers, and students with strict TypeScript validation.',
    architecture: [
      'Next.js 15 App Router architecture with React Server Components for optimal hydration.',
      'Strict TypeScript interfaces for class enrollments, schedules, and daily attendance logs.',
      'Role-differentiated layouts with tabular data filters.',
    ],
    techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'PostgreSQL / Supabase'],
    githubUrl: 'https://github.com/Ilyan321/school-attendance-system',
    highlights: [
      { label: 'Framework', value: 'Next.js 15 App Router' },
      { label: 'Typing', value: 'Strict TypeScript' },
      { label: 'Performance', value: 'RSC Zero-JS' },
      { label: 'Quality Grade', value: '8.5 / 10' },
    ],
  },
];

export function PortfolioPrototype() {
  const [selectedCaseStudy, setSelectedCaseStudy] = React.useState<CaseStudy | null>(null);
  const [selectedCertImage, setSelectedCertImage] = React.useState<string | null>(null);
  const [activeCategory, setActiveCategory] = React.useState<string>('all');

  // Interactive Reverse Tutor / Feynman Simulator State
  const [feynmanTopic, setFeynmanTopic] = React.useState<number>(0);
  const [feynmanProgress, setFeynmanProgress] = React.useState<number>(95);
  const [feynmanFeedback, setFeynmanFeedback] = React.useState<string>(
    '💡 Leo: "EUREKA! You freeze the giant 8B LLaMA weights and only train small low-rank adapter matrices! That cuts VRAM usage by 80%!"'
  );

  const feynmanTopics = [
    {
      title: 'LoRA 4-bit Quantization',
      action: 'Explain low-rank adaptation',
      progress: 95,
      dialogue: '💡 Leo: "EUREKA! You freeze the giant 8B LLaMA weights and only train small low-rank adapter matrices! That cuts VRAM usage by 80%!"',
    },
    {
      title: 'FAISS Vector RAG Search',
      action: 'Explain chunk embeddings',
      progress: 90,
      dialogue: '📚 Leo: "Aha! Instead of letting the LLM guess and hallucinate, FAISS searches indexed book chunks and quotes exact paragraphs!"',
    },
    {
      title: 'Deterministic AST Security',
      action: 'Explain SQL AST tree parser',
      progress: 100,
      dialogue: '🛡️ Leo: "Understood! The Python AST parser breaks the SQL query into syntax nodes and blocks DROP or DELETE before it touches SQLite!"',
    },
    {
      title: 'DistilBERT Multi-label NLP',
      action: 'Explain toxicity classification',
      progress: 88,
      dialogue: '⚡ Leo: "Got it! DistilBERT outputs probability scores across 6 hazard classes simultaneously in under 50ms!"',
    },
  ];

  // Interactive AST Security Playground State
  const [activeQueryIndex, setActiveQueryIndex] = React.useState<number>(0);
  const sampleQueries = [
    {
      sql: 'SELECT student_name, gpa, semester FROM student_records WHERE gpa >= 3.0 ORDER BY gpa DESC;',
      status: 'APPROVED',
      message: 'PASSED: Read-Only AST Validation • Sub-millisecond Execution (0.84ms)',
      type: 'valid',
    },
    {
      sql: 'DROP TABLE student_records;',
      status: 'BLOCKED',
      message: 'AST SECURITY VIOLATION: Destructive statement [DROP] detected and prevented',
      type: 'blocked',
    },
    {
      sql: "UPDATE grades SET score = 4.0 WHERE student_id = '24CSE01';",
      status: 'BLOCKED',
      message: 'SECURITY INTERCEPTION: Mutation query [UPDATE] violates Read-Only execution rule',
      type: 'blocked',
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-[#F8FAFC] selection:bg-purple-500 selection:text-white relative overflow-hidden">
      {/* Dynamic Aurora & Perspective Cyber Grid Background */}
      <div className="fixed inset-0 aurora-bg pointer-events-none opacity-80" />
      <div className="fixed inset-0 retro-grid pointer-events-none opacity-40" />

      {/* Ambient Floating Glow Spheres */}
      <div className="fixed top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="fixed top-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-cyan-500/15 blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="fixed bottom-10 left-1/3 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[140px] pointer-events-none" />

      {/* Floating Header Bar */}
      <header className="sticky top-4 z-40 max-w-6xl mx-auto px-4">
        <div className="rounded-full border border-white/10 bg-slate-950/75 backdrop-blur-xl px-5 h-14 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 rounded-full overflow-hidden border border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Avatar.png" alt="Ilyan Khan" className="h-full w-full object-cover" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-white tracking-wider">
                ILYAN KHAN
              </span>
              <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-1.5 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                QUEST CSE &bull; AI Lab Engineer
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-[#94A3B8]">
            <a href="#lab" className="hover:text-cyan-400 transition-colors">Lab Simulator</a>
            <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
            <a href="#academics" className="hover:text-emerald-400 transition-colors">Academics</a>
            <a href="#internships" className="hover:text-amber-400 transition-colors">Internships</a>
            <a href="#certs" className="hover:text-rose-400 transition-colors">Certifications</a>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="/CV.pdf"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 hover:bg-purple-900/60 hover:border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all font-semibold"
            >
              <FileTextIcon size={13} />
              <span>Resume</span>
            </a>
            <a
              href="https://github.com/Ilyan321"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#94A3B8] hover:text-white rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
            >
              <GithubIcon size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* ======================================================================= */}
      {/* ✦ HERO SECTION — CYBER ACADEMIA & MAGIC UI GLOW ✦                      */}
      {/* ======================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 pt-16 pb-12 sm:pt-20 sm:pb-16 text-center space-y-6">
        {/* Holographic Campus Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 text-xs font-mono shadow-[0_0_20px_rgba(168,85,247,0.25)]">
          <SparklesIcon size={14} className="text-cyan-400 animate-spin-slow" />
          <span>QUEST Nawabshah &bull; 2nd Year CSE &bull; AI Lab Mode</span>
        </div>

        {/* Hero Title with Magic Gradient Text */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Architecting <span className="gradient-text-academic glow-text-violet">Generative AI</span> &amp; High-Performance Systems.
        </h1>

        <p className="text-[#94A3B8] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
          Computer Systems Engineering student at QUEST Nawabshah. Specialized in LoRA 4-bit fine-tuning on LLaMA-3, source-attributed RAG indexing with FAISS, and high-craft React &amp; Next.js platforms.
        </p>

        {/* Call to Actions with Magic Shimmer Button */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a href="#lab">
            <ShimmerButton shimmerColor="#00F0FF" className="font-semibold text-xs px-6 py-3">
              ⚡ Explore Live AI Lab
            </ShimmerButton>
          </a>

          <a
            href="https://wa.me/923213379342"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs font-mono rounded-full border border-white/10 bg-slate-900/60 text-white hover:border-emerald-500/40 hover:text-emerald-300 transition-all shadow-[0_0_15px_rgba(0,0,0,0.4)]"
          >
            💬 WhatsApp: +92 321 3379342
          </a>

          <a
            href="mailto:ilyaankhan342@gmail.com"
            className="px-5 py-2.5 text-xs font-mono rounded-full border border-white/10 bg-slate-900/60 text-white hover:border-purple-500/40 hover:text-purple-300 transition-all shadow-[0_0_15px_rgba(0,0,0,0.4)]"
          >
            ✉️ Email: ilyaankhan342@gmail.com
          </a>
        </div>

        {/* Floating Stat Capsules */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6">
          <div className="p-3.5 rounded-xl border border-white/10 bg-slate-950/60 backdrop-blur-md text-center shadow-lg">
            <span className="text-2xl font-bold font-mono text-cyan-400 glow-text-cyan block">3.10</span>
            <span className="text-[11px] text-[#94A3B8] font-mono">CGPA Aggregate</span>
          </div>
          <div className="p-3.5 rounded-xl border border-white/10 bg-slate-950/60 backdrop-blur-md text-center shadow-lg">
            <span className="text-2xl font-bold font-mono text-purple-400 glow-text-violet block">13+</span>
            <span className="text-[11px] text-[#94A3B8] font-mono">Curated AI Repos</span>
          </div>
          <div className="p-3.5 rounded-xl border border-white/10 bg-slate-950/60 backdrop-blur-md text-center shadow-lg">
            <span className="text-2xl font-bold font-mono text-emerald-400 glow-text-emerald block">4</span>
            <span className="text-[11px] text-[#94A3B8] font-mono">Internships</span>
          </div>
          <div className="p-3.5 rounded-xl border border-white/10 bg-slate-950/60 backdrop-blur-md text-center shadow-lg">
            <span className="text-2xl font-bold font-mono text-amber-400 block">5+</span>
            <span className="text-[11px] text-[#94A3B8] font-mono">Google Certs</span>
          </div>
        </div>
      </section>

      {/* ======================================================================= */}
      {/* ✦ INTERACTIVE FEYNMAN LAB — SPATIAL CLASSROOM SIMULATOR ✦              */}
      {/* ======================================================================= */}
      <section id="lab" className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <MagicCard
          gradientColor="#00F0FF"
          enableBorderBeam={true}
          className="relative overflow-hidden border border-cyan-500/30 bg-slate-950/70 p-6 sm:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase font-semibold">
                  Interactive EduTech Lab
                </span>
                <span className="text-xs text-purple-400 font-mono">&bull; Feynman Reverse Classroom</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Teach &quot;Leo&quot; — The 12-Year-Old AI Student
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                Select a concept below. Leo evaluates your explanation and calculates his real-time comprehension score!
              </p>
            </div>

            {/* Comprehension Meter Box */}
            <div className="shrink-0 bg-slate-900/90 p-3.5 rounded-xl border border-white/10 font-mono text-xs w-full md:w-56 space-y-2">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[#94A3B8]">Comprehension:</span>
                <span className="text-cyan-400 font-bold text-sm">{feynmanProgress}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                  animate={{ width: `${feynmanProgress}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              </div>
            </div>
          </div>

          {/* Topic Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
            {feynmanTopics.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setFeynmanTopic(idx);
                  setFeynmanProgress(topic.progress);
                  setFeynmanFeedback(topic.dialogue);
                }}
                className={`p-3 rounded-lg text-left text-xs font-mono transition-all border ${
                  feynmanTopic === idx
                    ? 'bg-cyan-950/50 border-cyan-400 text-white font-semibold shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                    : 'bg-white/[0.02] border-white/5 text-[#94A3B8] hover:text-white hover:border-white/20'
                }`}
              >
                <span className="text-[10px] text-cyan-400 block uppercase">Topic 0{idx + 1}</span>
                <span className="font-semibold block text-white">{topic.title}</span>
                <span className="text-[11px] text-[#64748B] block mt-0.5">&rarr; {topic.action}</span>
              </button>
            ))}
          </div>

          {/* Real-time Student Reaction Bubble */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 font-mono text-xs text-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
            <span className="leading-relaxed text-cyan-200">{feynmanFeedback}</span>
            <span className="shrink-0 text-[11px] px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold self-start sm:self-auto">
              Feynman Approved &bull; 100% Grounded
            </span>
          </div>
        </MagicCard>
      </section>

      {/* ======================================================================= */}
      {/* ✦ FLAGSHIP AI PROJECTS GRID (MAGIC CARDS & SPOTLIGHT) ✦                 */}
      {/* ======================================================================= */}
      <section id="projects" className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-1">
              01 &bull; Flagship Systems
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Curated Research &amp; Engineering Artifacts
            </h2>
          </div>

          <span className="text-xs font-mono text-[#94A3B8]">
            Click any case study to inspect technical architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ALL_PROJECTS.map((project, idx) => (
            <MagicCard
              key={project.id}
              gradientColor={project.accentColor}
              enableBorderBeam={idx === 0}
              className="flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase font-semibold">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                    {project.grade}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed mt-1 line-clamp-2">
                    {project.headline}
                  </p>
                </div>

                {/* Specific Live Widget for Project 0 (Schema-Aware SQL Agent) */}
                {idx === 0 && (
                  <div className="rounded-lg border border-white/10 bg-black/70 p-3 font-mono text-xs space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-[#64748B]">
                      <div className="flex items-center gap-1.5 text-purple-400">
                        <TerminalIcon size={12} />
                        <span>AST Security Firewall Diagnostic</span>
                      </div>
                      <span className="text-emerald-400 font-semibold">0.84ms Latency</span>
                    </div>

                    <div className="flex gap-1.5 pt-1">
                      {sampleQueries.map((q, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => setActiveQueryIndex(qIdx)}
                          className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
                            activeQueryIndex === qIdx
                              ? 'bg-purple-500/30 text-purple-200 border border-purple-400 font-semibold'
                              : 'bg-white/5 text-[#94A3B8] hover:text-white'
                          }`}
                        >
                          Query {qIdx + 1}
                        </button>
                      ))}
                    </div>

                    <div className="bg-slate-950 p-2 rounded text-[10px] text-white break-all border border-white/5">
                      <span className="text-purple-400 font-bold">&gt;&nbsp;</span>
                      {sampleQueries[activeQueryIndex].sql}
                    </div>

                    <div
                      className={`p-1.5 rounded text-[10px] flex items-center gap-1.5 border ${
                        sampleQueries[activeQueryIndex].type === 'valid'
                          ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                          : 'bg-rose-950/40 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      <ShieldCheckIcon size={12} />
                      <span>{sampleQueries[activeQueryIndex].message}</span>
                    </div>
                  </div>
                )}

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.techStack.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-[#CBD5E1] border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <button
                  onClick={() => setSelectedCaseStudy(project)}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
                >
                  <span>Inspect Architecture</span>
                  <ExternalLinkIcon size={12} />
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#94A3B8] hover:text-white flex items-center gap-1 font-mono"
                  >
                    <GithubIcon size={13} />
                    <span>Repo</span>
                  </a>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-mono font-semibold"
                    >
                      <span>Live Demo</span>
                      <ExternalLinkIcon size={12} />
                    </a>
                  )}
                </div>
              </div>
            </MagicCard>
          ))}
        </div>
      </section>

      {/* ======================================================================= */}
      {/* ✦ ACADEMIC TRANSCRIPT & CGPA MATRIX ✦                                  */}
      {/* ======================================================================= */}
      <section id="academics" className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <div className="border-b border-white/10 pb-4 mb-6">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">
            02 &bull; University Transcript
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Academic Performance &amp; Engineering Standing
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MagicCard gradientColor="#10B981" className="p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#94A3B8]">1ST SEMESTER</span>
              <span className="text-emerald-400 font-bold text-sm">3.13 / 4.00</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: '78.25%' }} />
            </div>
            <p className="text-[11px] text-[#94A3B8] font-mono">78.25% &bull; Foundations of Programming</p>
          </MagicCard>

          <MagicCard gradientColor="#00F0FF" className="p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#94A3B8]">2ND SEMESTER</span>
              <span className="text-cyan-400 font-bold text-sm">3.05 / 4.00</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: '76.25%' }} />
            </div>
            <p className="text-[11px] text-[#94A3B8] font-mono">76.25% &bull; OOP in C++ &amp; Circuits</p>
          </MagicCard>

          <MagicCard gradientColor="#A855F7" enableBorderBeam={true} className="p-5 space-y-3 border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.2)]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-purple-300 font-bold">1ST YEAR AGGREGATE</span>
              <span className="text-purple-300 font-extrabold text-sm">3.10 / 4.00</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" style={{ width: '77.5%' }} />
            </div>
            <p className="text-[11px] text-purple-200 font-mono">77.50% &bull; Official QUEST Annual Score</p>
          </MagicCard>

          <MagicCard gradientColor="#10B981" className="p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#94A3B8]">3RD SEMESTER</span>
              <span className="text-emerald-400 font-bold text-sm">2.96 / 4.00</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: '74%' }} />
            </div>
            <p className="text-[11px] text-[#94A3B8] font-mono">74.00% &bull; Data Structures &amp; Algorithms</p>
          </MagicCard>
        </div>
      </section>

      {/* ======================================================================= */}
      {/* ✦ 4 VERIFIED INTERNSHIPS PROGRESSION ✦                                 */}
      {/* ======================================================================= */}
      <section id="internships" className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <div className="border-b border-white/10 pb-4 mb-6">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
            03 &bull; Industry Pedigree
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Professional Internships &amp; Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MagicCard gradientColor="#A855F7" className="p-5 space-y-2.5">
            <span className="text-[10px] font-mono text-purple-400 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-500/30">
              MAR 2026 – MAY 2026
            </span>
            <h4 className="font-bold text-white text-base">IntelliVerse</h4>
            <p className="text-xs text-purple-300 font-mono">Python Developer Intern (Remote)</p>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Engineered Python-based solutions focusing on Generative AI applications and LLM agent orchestration.
            </p>
          </MagicCard>

          <MagicCard gradientColor="#00F0FF" className="p-5 space-y-2.5">
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
              JAN 2026 – FEB 2026
            </span>
            <h4 className="font-bold text-white text-base">Arch Technologies</h4>
            <p className="text-xs text-cyan-300 font-mono">Software Engineer Intern (C++)</p>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Applied C++ and OOP clean coding principles for high-performance memory and algorithmic logic.
            </p>
          </MagicCard>

          <MagicCard gradientColor="#818CF8" className="p-5 space-y-2.5">
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-500/30">
              DEC 2025 – JAN 2026
            </span>
            <h4 className="font-bold text-white text-base">Coretech Innovations</h4>
            <p className="text-xs text-indigo-300 font-mono">Software Engineer Intern</p>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Technical development across frontend interfaces, component refactoring, and software tasks.
            </p>
          </MagicCard>

          <MagicCard gradientColor="#F59E0B" className="p-5 space-y-2.5">
            <span className="text-[10px] font-mono text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/30">
              DEC 2025
            </span>
            <h4 className="font-bold text-white text-base">CodeAlpha</h4>
            <p className="text-xs text-amber-300 font-mono">Software Engineer Intern</p>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Completed intensive software engineering program focused on practical code development and milestones.
            </p>
          </MagicCard>
        </div>
      </section>

      {/* ======================================================================= */}
      {/* ✦ GOOGLE & INDUSTRY CERTIFICATIONS VAULT ✦                             */}
      {/* ======================================================================= */}
      <section id="certs" className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <div className="border-b border-white/10 pb-4 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono text-rose-400 uppercase tracking-widest block mb-1">
              04 &bull; Verified Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Google &amp; Technical Certifications
            </h2>
          </div>
          <span className="text-xs font-mono text-[#94A3B8]">Click any certificate thumbnail to zoom</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Google Cybersecurity',
              issuer: 'Google / Coursera',
              date: 'Sep 2025',
              image: '/certificates/cybersecurity.png',
              verifyUrl: 'https://drive.google.com/file/d/19oRIFsq52sf1E6EYALTfTEGQ4WsAu8tK/view?usp=drive_link',
            },
            {
              title: 'Google AI Essentials',
              issuer: 'Google / Coursera',
              date: 'Oct 2025',
              image: '/certificates/ai-essentials.png',
              verifyUrl: 'https://drive.google.com/file/d/1DDLSK4b8PX8s54bAS-Awu11Z5RP3L4jE/view?usp=drive_link',
            },
            {
              title: 'Prompt Engineering',
              issuer: 'Google / Coursera',
              date: 'Oct 2025',
              image: '/certificates/prompting-essentials.png',
              verifyUrl: 'https://drive.google.com/file/d/1SoEZQ3hi13_7L1ha8jCs4fHQE3rSCOWt/view?usp=drive_link',
            },
            {
              title: 'Google Agile Essentials',
              issuer: 'Google / Coursera',
              date: 'Oct 2025',
              image: '/certificates/agile-essentials.png',
              verifyUrl: 'https://drive.google.com/file/d/1CKSBtnqjuiB-nTeGbCmubA0fYrPMI8If/view?usp=drive_link',
            },
          ].map((cert, idx) => (
            <MagicCard key={idx} gradientColor="#A855F7" className="p-4 flex flex-col justify-between space-y-3">
              <div
                className="relative aspect-[4/3] bg-black/60 rounded-lg overflow-hidden cursor-pointer border border-white/10"
                onClick={() => setSelectedCertImage(cert.image)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-2.5 py-1 text-[10px] font-mono bg-purple-500 text-white font-bold rounded shadow">
                    Zoom Image
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-white text-sm hover:text-cyan-300 transition-colors">
                  {cert.title}
                </h4>
                <p className="text-[11px] text-[#94A3B8] font-mono">{cert.issuer} &bull; {cert.date}</p>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 font-semibold pt-1"
                >
                  <span>Verify on Drive</span>
                  <ExternalLinkIcon size={12} />
                </a>
              </div>
            </MagicCard>
          ))}
        </div>
      </section>

      {/* ======================================================================= */}
      {/* ✦ FOOTER DISPATCH ✦                                                    */}
      {/* ======================================================================= */}
      <footer className="relative z-10 border-t border-white/10 bg-[#030712]/95 mt-16 py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-white text-lg font-mono">Ilyan Khan &bull; AI Systems Engineer</h3>
            <p className="text-xs text-[#94A3B8] font-mono">
              QUEST Nawabshah &bull; Open for AI engineering internships &amp; high-impact collaborations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:ilyaankhan342@gmail.com"
              className="px-5 py-2.5 text-xs font-mono rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-bold hover:opacity-90 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              Get In Touch &rarr;
            </a>
            <a
              href="https://wa.me/923213379342"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-xs font-mono rounded-full border border-white/10 bg-slate-900 text-white hover:border-white/30 transition-all"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {/* ======================================================================= */}
      {/* ✦ ARCHITECTURAL CASE STUDY MODAL PORTAL ✦                              */}
      {/* ======================================================================= */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCaseStudy(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-3xl rounded-2xl bg-slate-950 border border-purple-500/40 p-6 sm:p-8 space-y-6 shadow-[0_0_50px_rgba(168,85,247,0.25)] z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-4 right-4 p-2 text-[#94A3B8] hover:text-white rounded-full bg-white/[0.05] border border-white/10 transition-colors"
                aria-label="Close Case Study"
              >
                <XIcon size={16} />
              </button>

              <div className="space-y-2 pr-8">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase font-semibold">
                    {selectedCaseStudy.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                    {selectedCaseStudy.grade}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {selectedCaseStudy.title}
                </h2>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {selectedCaseStudy.headline}
                </p>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {selectedCaseStudy.highlights.map((h, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                    <span className="text-[10px] font-mono text-[#64748B] block uppercase">{h.label}</span>
                    <span className="text-xs font-mono text-cyan-400 font-bold">{h.value}</span>
                  </div>
                ))}
              </div>

              {/* Architectural Breakdown */}
              <div className="space-y-4 text-xs sm:text-sm text-[#E2E8F0]">
                <div className="space-y-1.5">
                  <h4 className="font-mono text-xs text-purple-400 uppercase tracking-wider font-semibold">
                    1. Problem Formulation &amp; Challenge
                  </h4>
                  <p className="text-[#94A3B8] leading-relaxed pl-3 border-l border-purple-500/40">
                    {selectedCaseStudy.challenge}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-mono text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                    2. Core Architectural Engineering
                  </h4>
                  <ul className="space-y-1.5 pl-3 border-l border-cyan-500/40 text-[#94A3B8]">
                    {selectedCaseStudy.architecture.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-mono font-bold">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-mono text-xs text-emerald-400 uppercase tracking-wider font-semibold">
                    3. Detected Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCaseStudy.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded text-xs font-mono bg-white/[0.04] text-[#E2E8F0] border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                <a
                  href={selectedCaseStudy.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono border border-white/10 bg-white/[0.04] text-white hover:border-white/30 transition-colors"
                >
                  <GithubIcon size={14} />
                  <span>Inspect Source Code</span>
                </a>

                {selectedCaseStudy.demoUrl && (
                  <a
                    href={selectedCaseStudy.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-mono bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-bold hover:opacity-90 transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLinkIcon size={13} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================================= */}
      {/* ✦ CERTIFICATE ZOOM MODAL ✦                                             */}
      {/* ======================================================================= */}
      <AnimatePresence>
        {selectedCertImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertImage(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-2xl w-full rounded-2xl overflow-hidden border border-purple-500/40 z-10 shadow-2xl p-2 bg-slate-950"
            >
              <button
                onClick={() => setSelectedCertImage(null)}
                className="absolute top-4 right-4 p-2 text-white bg-black/70 rounded-full hover:bg-black transition-colors z-20"
              >
                <XIcon size={16} />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedCertImage} alt="Certificate" className="w-full h-auto rounded-xl" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
