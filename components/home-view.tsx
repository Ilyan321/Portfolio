'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLinkIcon,
  GithubIcon,
  LinkedinIcon,
  FileTextIcon,
  XIcon,
} from './ui/icons';

interface ProjectItem {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  grade: string;
  category: string;
  elevatorPitch: string;
  challenge: string;
  architecture: string[];
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  huggingFaceUrl?: string;
  highlights: { label: string; value: string }[];
}

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  tag: string;
  credentialId?: string;
  imagePath: string;
  pdfPath?: string;
  description: string;
  skills: string[];
}

// Curated Projects List (All Flagship Projects)
const ALL_PROJECTS: ProjectItem[] = [
  {
    id: 'sql-agent',
    name: 'Schema-Aware SQL Agent',
    subtitle: 'LoRA Fine-Tuned LLaMA-3 + AST Security Guardrail',
    tag: 'AI & Security Systems',
    grade: 'Grade 9.5 / 10',
    category: 'LLM Fine-Tuning & AST Parsers',
    elevatorPitch:
      'A natural language to SQL translation system built with a LoRA fine-tuned LLaMA-3-8B model trained on the Yale Spider benchmark, shielded by a deterministic Python AST parser that enforces read-only execution and prevents schema leakage.',
    challenge:
      'Eliminating multi-table join hallucinations while enforcing strict database integrity at the AST compilation level.',
    architecture: [
      'LoRA 4-bit Quantized Fine-Tuning on LLaMA-3-8B utilizing Unsloth and TRL on the Yale Spider benchmark.',
      'Deterministic Python AST Security Guardrail ensuring 100% read-only SQL execution.',
      'Dynamic Schema Extraction Layer injecting table structures and foreign keys into context prompts.',
      'Public model weights published on Hugging Face Model Hub.',
    ],
    techStack: ['PyTorch', 'LLaMA-3-8B', 'Unsloth', 'LoRA / PEFT', 'Transformers', 'SQLite', 'Hugging Face'],
    githubUrl: 'https://github.com/Ilyan321/Schema-Aware-SQL-Agent',
    demoUrl: 'https://huggingface.co/Ilyankhan69/schema-aware-sql-agent',
    huggingFaceUrl: 'https://huggingface.co/Ilyankhan69/schema-aware-sql-agent',
    highlights: [
      { label: 'Base Model', value: 'LLaMA-3-8B' },
      { label: 'Fine-Tuning', value: 'LoRA (PEFT)' },
      { label: 'Guardrail', value: 'AST Read-Only' },
      { label: 'Benchmark', value: 'Yale Spider' },
    ],
  },
  {
    id: 'hogwarts-archivist',
    name: 'The Hogwarts Archivist',
    subtitle: 'Source-Attributed RAG with FAISS & Groq',
    tag: 'Retrieval & RAG Systems',
    grade: 'Grade 9.2 / 10',
    category: 'Vector Search & RAG Architecture',
    elevatorPitch:
      'A high-speed conversational research engine combining LangChain vector search, FAISS Euclidean similarity indexing, and Groq LLaMA-3 inference with precise, verifiable paragraph-level source attribution.',
    challenge:
      'Grounding LLM responses against large document corpuses with zero hallucinations and exact paragraph citation.',
    architecture: [
      'Recursive text chunking with metadata binding chapter, book, and paragraph coordinates.',
      'Sub-millisecond Euclidean similarity indexing via FAISS in-memory vector store.',
      'Groq LLaMA-3 acceleration delivering responses at >500 tokens/second.',
    ],
    techStack: ['Python', 'LangChain', 'FAISS', 'Groq API', 'LLaMA-3', 'Streamlit'],
    githubUrl: 'https://github.com/Ilyan321/Hogwarts_Archivist',
    demoUrl: 'https://huggingface.co/spaces/Ilyankhan69/Hogwarts-Archivist',
    huggingFaceUrl: 'https://huggingface.co/spaces/Ilyankhan69/Hogwarts-Archivist',
    highlights: [
      { label: 'Vector Index', value: 'FAISS Vector DB' },
      { label: 'Inference', value: '>500 tok/sec' },
      { label: 'Attribution', value: 'Paragraph Exact' },
      { label: 'Platform', value: 'Hugging Face Space' },
    ],
  },
  {
    id: 'vibeguard',
    name: 'VibeGuard Moderation',
    subtitle: 'DistilBERT Multi-Label Toxicity Classifier',
    tag: 'NLP & Safety Systems',
    grade: 'Grade 9.0 / 10',
    category: 'Transformer NLP & Classification',
    elevatorPitch:
      'A real-time toxicity and harm classification model fine-tuned on DistilBERT using the Jigsaw multi-label dataset, delivering fast sub-50ms inference latency and probability radar scoring across 6 risk categories.',
    challenge:
      'Optimizing multi-label transformer inference latency for fast, reliable moderation workflows.',
    architecture: [
      'Fine-tuned DistilBERT transformer reaching 86.67% validation accuracy.',
      'Optimized sub-50ms inference latency for high-throughput moderation.',
      'Interactive probability radar scoring across 6 harm vectors.',
    ],
    techStack: ['PyTorch', 'DistilBERT', 'Transformers', 'Datasets', 'Streamlit', 'Scikit-Learn'],
    githubUrl: 'https://github.com/Ilyan321/VibeGuard',
    demoUrl: 'https://huggingface.co/spaces/Ilyan321/vibeguard',
    huggingFaceUrl: 'https://huggingface.co/spaces/Ilyan321/vibeguard',
    highlights: [
      { label: 'Model', value: 'DistilBERT Multi-label' },
      { label: 'Accuracy', value: '86.67%' },
      { label: 'Latency', value: '< 50ms per prompt' },
      { label: 'Classes', value: '6 Toxicity Vectors' },
    ],
  },
  {
    id: 'slasher-vision',
    name: 'Slasher-Vision-35mm',
    subtitle: 'Custom SDXL Diffusion LoRA for 35mm Retro Cinema',
    tag: 'Generative AI & Vision',
    grade: 'Grade 8.9 / 10',
    category: 'Diffusion Models & LoRA Fine-Tuning',
    elevatorPitch:
      'A specialized Low-Rank Adaptation (LoRA) for Stable Diffusion XL (SDXL) designed to synthesize authentic 1980s 35mm film grain, anamorphic flare, and vintage cinematography aesthetics, stripping away generic digital smoothness.',
    challenge:
      'Isolating high-frequency film grain and optical distortion artifacts during training without degrading subject prompt fidelity.',
    architecture: [
      'Low-Rank Adaptation fine-tuned across SDXL UNet cross-attention layers.',
      'Trained on curated vintage 35mm horror and thriller cinematography stills.',
      'Published weights and usage triggers on Hugging Face Model Hub.',
    ],
    techStack: ['PyTorch', 'SDXL', 'Diffusers', 'LoRA / PEFT', 'Hugging Face', 'Python'],
    githubUrl: 'https://github.com/Ilyan321/Slasher-Vision-35mm',
    demoUrl: 'https://huggingface.co/Ilyankhan69/slasher-vision-35mm',
    huggingFaceUrl: 'https://huggingface.co/Ilyankhan69/slasher-vision-35mm',
    highlights: [
      { label: 'Base Model', value: 'SDXL 1.0' },
      { label: 'Technique', value: 'Cross-Attention LoRA' },
      { label: 'Aesthetic', value: '35mm Film Grain' },
      { label: 'Platform', value: 'Hugging Face Hub' },
    ],
  },
  {
    id: 'edufocus',
    name: 'EduFocus Attendance Portal',
    subtitle: 'React 18 & Supabase Real-Time Attendance SPA',
    tag: 'Full-Stack Web',
    grade: 'Grade 8.8 / 10',
    category: 'Web Engineering & Real-Time Sync',
    elevatorPitch:
      'A modern Single Page Application (SPA) for real-time academic attendance tracking, built with React 18, Vite 5, Tailwind CSS 4, and Supabase PostgreSQL with real-time sync, role-based authentication, and automated classroom analytics.',
    challenge:
      'Providing instantaneous bi-directional roster synchronization across simultaneous teachers while maintaining offline resilient local state.',
    architecture: [
      'Bi-directional state sync via Supabase PostgreSQL and Row-Level Security (RLS).',
      'Quick-click status toggling with instant streak metrics and analytics.',
      'Responsive glassmorphic UI built with Tailwind CSS 4 and Vite 5.',
    ],
    techStack: ['React 18', 'Vite 5', 'Tailwind CSS 4', 'Supabase', 'PostgreSQL', 'TypeScript'],
    githubUrl: 'https://github.com/Ilyan321/attendance-app',
    demoUrl: 'https://Ilyan321.github.io/attendance-app/',
    highlights: [
      { label: 'Frontend', value: 'React 18 + Vite 5' },
      { label: 'Database', value: 'Supabase PostgreSQL' },
      { label: 'Security', value: 'Row-Level (RLS)' },
      { label: 'Deploy', value: 'GitHub Pages' },
    ],
  },
  {
    id: 'spatial-classroom',
    name: 'Spatial Classroom',
    subtitle: 'Gamified Reverse-Tutor AI (Feynman Technique)',
    tag: 'AI Education & Edge',
    grade: 'Grade 8.7 / 10',
    category: 'Conversational AI & State Machines',
    elevatorPitch:
      'A reverse-classroom web application testing user comprehension of complex technical concepts via the Feynman Technique — users teach a stubborn, easily confused 12-year-old AI student named Leo.',
    challenge:
      'Orchestrating dual-stream LLM threads concurrently to manage student cognitive state and coach the teacher in real-time.',
    architecture: [
      'Reverse-Tutor state machine tracking comprehension (0-100%) and patience depletion.',
      'Netlify Edge Function orchestrating two simultaneous Groq LLaMA 3 threads.',
      'Document grounding extracting uploaded notes and PDFs into inquiry constraints.',
    ],
    techStack: ['JavaScript', 'Netlify Edge Functions', 'Groq LLaMA 3', 'HTML5 Canvas', 'CSS3'],
    githubUrl: 'https://github.com/Ilyan321/spatial-classroom',
    highlights: [
      { label: 'Method', value: 'Feynman Technique' },
      { label: 'Backend', value: 'Netlify Edge' },
      { label: 'Inference', value: 'Groq LLaMA 3' },
      { label: 'State', value: 'Cognitive Engine' },
    ],
  },
  {
    id: 'email-spam-filter',
    name: 'Email Spam Filter (DistilBERT)',
    subtitle: '99.05% Accuracy Transformer Classifier on Enron',
    tag: 'NLP & Security',
    grade: 'Grade 8.5 / 10',
    category: 'Transformer Fine-Tuning & Evaluation',
    elevatorPitch:
      'An end-to-end NLP classification pipeline fine-tuning DistilBERT on the Enron email dataset, delivering 99.05% test accuracy with hosted zero-code browser inference on Hugging Face.',
    challenge:
      'Minimizing false positives on business-critical communications while maintaining sub-millisecond evaluation speed.',
    architecture: [
      'Fine-tuned DistilBERT transformer reaching 99.05% test accuracy and 99.06% F1-score.',
      'Mixed-precision fp16 cloud training on dual Kaggle T4 GPUs with early stopping.',
      'Public model card with interactive Hugging Face API widget.',
    ],
    techStack: ['PyTorch', 'DistilBERT', 'Transformers', 'Datasets', 'Hugging Face', 'Python'],
    githubUrl: 'https://github.com/Ilyan321/email-spam-filter-model',
    demoUrl: 'https://huggingface.co/Ilyankhan69/email-spam-filter',
    huggingFaceUrl: 'https://huggingface.co/Ilyankhan69/email-spam-filter',
    highlights: [
      { label: 'Model', value: 'DistilBERT' },
      { label: 'Accuracy', value: '99.05%' },
      { label: 'F1 Score', value: '99.06%' },
      { label: 'Dataset', value: 'Enron Spam' },
    ],
  },
  {
    id: 'school-attendance',
    name: 'School Attendance System',
    subtitle: 'Next.js 15 App Router & Strict TypeScript Platform',
    tag: 'Full-Stack Web',
    grade: 'Grade 8.4 / 10',
    category: 'Modern Web Architecture',
    elevatorPitch:
      'A scalable school administration platform engineered with Next.js 15 App Router, TypeScript, and Tailwind CSS, featuring institutional schedule orchestration, multi-class attendance logs, and PRD-driven modular architecture.',
    challenge:
      'Structuring scalable multi-tenant administrative schemas with end-to-end type safety and Server Component rendering.',
    architecture: [
      'Next.js 15 App Router with React Server Components (RSC) and server actions.',
      'Strict TypeScript type definitions covering session roles, class models, and schemas.',
      'Role-differentiated dashboards for institution administrators, faculty, and students.',
    ],
    techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'PostgreSQL', 'ESLint'],
    githubUrl: 'https://github.com/Ilyan321/school-attendance-system',
    highlights: [
      { label: 'Framework', value: 'Next.js 15 (RSC)' },
      { label: 'Language', value: 'TypeScript 5' },
      { label: 'Styling', value: 'Tailwind CSS 4' },
      { label: 'Architecture', value: 'Server Actions' },
    ],
  },
  {
    id: 'ai-summarizer',
    name: 'AI Content Summarizer & Translator',
    subtitle: 'Groq LLaMA 3.1 Scraping & Polyglot Engine',
    tag: 'GenAI Utilities',
    grade: 'Grade 8.2 / 10',
    category: 'Web Scraping & Polyglot Translation',
    elevatorPitch:
      'An automated web content ingestion and synthesis platform that scrapes live article URLs, generates structured summaries using Groq LLaMA 3.1, and translates outputs into 7 global languages.',
    challenge:
      'Cleaning messy DOM boilerplates and navigation trees to extract pure article text before LLM context ingestion.',
    architecture: [
      'BeautifulSoup4 web scraper removing HTML boilerplate, navbars, and advertisements.',
      'Tunable summary brevity engine powered by Groq LLaMA 3.1 8B inference.',
      '7-language instant translation (Spanish, French, German, Chinese, Arabic, Urdu, Japanese).',
    ],
    techStack: ['Python', 'Streamlit', 'Groq API', 'LLaMA-3.1', 'BeautifulSoup4', 'Requests'],
    githubUrl: 'https://github.com/Ilyan321/AI_Content_Summarizer',
    highlights: [
      { label: 'Scraper', value: 'BeautifulSoup4' },
      { label: 'LLM', value: 'Groq LLaMA 3.1' },
      { label: 'Languages', value: '7 Global Languages' },
      { label: 'UI', value: 'Streamlit' },
    ],
  },
  {
    id: 'weather-ai',
    name: 'Weather AI & Style Advisor',
    subtitle: 'OpenWeatherMap + Groq LLaMA 3.3 Context Advisor',
    tag: 'Applied GenAI',
    grade: 'Grade 8.0 / 10',
    category: 'API Integration & Reasoning',
    elevatorPitch:
      'A real-time meteorological intelligence utility that combines live OpenWeatherMap sensory data with Groq LLaMA 3.3 reasoning to generate personalized, climate-adaptive outfit recommendations and outdoor activity guidance.',
    challenge:
      'Translating numeric meteorological variables into practical fabric, layering, and lifestyle suggestions in real time.',
    architecture: [
      'Live meteorological data ingestion (temperature, precipitation, humidity, UV index).',
      'Context-aware style advice generated via Groq LLaMA 3.3 inference.',
      'Live hosted deployment on Hugging Face Spaces.',
    ],
    techStack: ['Python', 'Streamlit', 'Groq API', 'LLaMA-3.3', 'OpenWeatherMap API'],
    githubUrl: 'https://github.com/Ilyan321/Weather_App',
    demoUrl: 'https://huggingface.co/spaces/Ilyankhan69/WeatherApp',
    huggingFaceUrl: 'https://huggingface.co/spaces/Ilyankhan69/WeatherApp',
    highlights: [
      { label: 'API', value: 'OpenWeather REST' },
      { label: 'Reasoning', value: 'Groq LLaMA 3.3' },
      { label: 'Latency', value: '< 1 second' },
      { label: 'Platform', value: 'Hugging Face Space' },
    ],
  },
];

// Verified Certifications List (All 9 Verified Credentials)
const ALL_CERTIFICATES: CertificateItem[] = [
  {
    id: 'cybersecurity',
    title: 'Google Cybersecurity Professional',
    issuer: 'Google Career Certificates',
    issueDate: '2025 – 2026',
    tag: 'Security & Systems',
    credentialId: 'GCC-SEC-892401',
    imagePath: '/certificates/cybersecurity.png',
    description:
      'Comprehensive professional certification covering security operations, Python automation for defensive operations, Linux CLI, SIEM tools, packet sniffing with Wireshark, and incident response frameworks.',
    skills: ['Linux OS', 'Python Automation', 'SIEM / Splunk', 'Network Security', 'Wireshark', 'NIST Framework'],
  },
  {
    id: 'ai-essentials',
    title: 'Google AI Essentials',
    issuer: 'Google',
    issueDate: '2025',
    tag: 'Artificial Intelligence',
    credentialId: 'GCC-AI-104928',
    imagePath: '/certificates/ai-essentials.png',
    description:
      'Foundational mastery of modern generative AI workflows, large language model architectures, automated workflow design, and ethical AI evaluation principles.',
    skills: ['Generative AI', 'LLM Workflow Design', 'Ethical AI', 'Model Evaluation', 'Productivity AI'],
  },
  {
    id: 'prompting-essentials',
    title: 'Google Prompting Essentials',
    issuer: 'Google',
    issueDate: '2025',
    tag: 'Prompt Engineering',
    credentialId: 'GCC-PRM-382914',
    imagePath: '/certificates/prompting-essentials.png',
    description:
      'Advanced prompt engineering techniques covering chain-of-thought, few-shot conditioning, structured schema enforcement, and iterative context refinement for enterprise LLMs.',
    skills: ['Chain-of-Thought', 'Few-Shot Conditioning', 'System Prompts', 'Context Optimization', 'Schema Guardrails'],
  },
  {
    id: 'agile-essentials',
    title: 'Agile with Atlassian Jira',
    issuer: 'Atlassian',
    issueDate: '2025',
    tag: 'Software Engineering',
    credentialId: 'ATL-AGL-552910',
    imagePath: '/certificates/agile-essentials.png',
    description:
      'Industry qualification in Agile project management, sprint backlogs, Kanban execution, story point estimation, and production software lifecycle delivery with Jira.',
    skills: ['Scrum Framework', 'Sprint Planning', 'Kanban Boards', 'Jira Software', 'Agile Delivery'],
  },
  {
    id: 'claude-code-action',
    title: 'Claude Code in Action',
    issuer: 'Anthropic Education',
    issueDate: 'July 2026',
    tag: 'Agentic Coding & CLI',
    credentialId: 'ANTH-CCA-2026',
    imagePath: '/certificates/claude-code-in-action-1.png',
    pdfPath: '/certificates/claude-code-in-action.pdf',
    description:
      'Official Anthropic certification in deploying agentic command-line developer workflows, terminal autonomy, multi-file code editing, tool execution, and automated testing loops with Claude Code.',
    skills: ['Claude Code CLI', 'Agentic Workflows', 'Terminal Automation', 'Context Engineering', 'Codebase Refactoring'],
  },
  {
    id: 'claude-code-101',
    title: 'Claude Code 101',
    issuer: 'Anthropic Education',
    issueDate: 'July 2026',
    tag: 'Agentic Engineering',
    credentialId: 'ANTH-CC-101',
    imagePath: '/certificates/claude-code-101-1.png',
    pdfPath: '/certificates/claude-code-101.pdf',
    description:
      'Foundational mastery of the Claude Code command-line tool, configuration management, project permissions, cost control, subagent orchestration, and prompt customization.',
    skills: ['Claude Code Setup', 'Subagent Management', 'Shell Integration', 'Tool Permissions', 'Developer Experience'],
  },
  {
    id: 'ai-fluency',
    title: 'AI Fluency: Framework & Foundations',
    issuer: 'Anthropic / UCC / HEA',
    issueDate: '2026',
    tag: 'Frontier AI & Reasoning',
    credentialId: 'ANTH-AIF-2026',
    imagePath: '/certificates/ai-fluency-1.png',
    pdfPath: '/certificates/AI Fluency.pdf',
    description:
      'Professional qualification in frontier Large Language Model fluency, multi-step chain-of-thought reasoning, agentic workflow architecture, and enterprise AI evaluation.',
    skills: ['Frontier LLMs', 'Applied Reasoning', 'Agentic Workflows', 'Model Evaluation', 'AI Strategy'],
  },
  {
    id: 'claude-101',
    title: 'Claude 101 Mastery',
    issuer: 'Anthropic Education',
    issueDate: '2026',
    tag: 'Applied AI & Tool Use',
    credentialId: 'ANTH-CLD-101',
    imagePath: '/certificates/claude-101-1.png',
    pdfPath: '/certificates/Claude 101.pdf',
    description:
      'Specialized qualification in Anthropic Claude architecture, advanced system prompt design, structured tool use / function calling, and context window optimization.',
    skills: ['Claude Architecture', 'System Prompts', 'Structured Tool Use', 'Context Engineering', 'API Integration'],
  },
  {
    id: 'genai-mastermind',
    title: 'Generative AI Mastermind',
    issuer: 'Outskill',
    issueDate: '2026',
    tag: 'GenAI Mastermind',
    credentialId: 'OUTSKILL-GAI-2026',
    imagePath: '/certificates/internship-cert-1.png',
    pdfPath: '/certificates/internship-cert.pdf',
    description:
      'Comprehensive executive masterclass on state-of-the-art Generative AI systems, multimodal LLM pipelines, autonomous agents, and enterprise AI workflow automation.',
    skills: ['Generative AI', 'Agentic Pipelines', 'Prompt Architecture', 'Automation Workflows', 'Multimodal AI'],
  },
];

export function HomeView() {
  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(null);
  const [selectedCert, setSelectedCert] = React.useState<CertificateItem | null>(null);
  const [showDirectoryModal, setShowDirectoryModal] = React.useState<boolean>(false);
  const [directoryTab, setDirectoryTab] = React.useState<'projects' | 'certificates'>('projects');
  const [showContactModal, setShowContactModal] = React.useState<boolean>(false);
  const [showAboutModal, setShowAboutModal] = React.useState<boolean>(false);
  const [showPhilosophyModal, setShowPhilosophyModal] = React.useState<boolean>(false);
  const [showNetworkModal, setShowNetworkModal] = React.useState<boolean>(false);

  return (
    <main className="min-h-screen w-full lg:h-screen lg:max-h-screen bg-[#1A1918] p-2.5 sm:p-4 lg:p-5 flex items-center justify-center overflow-y-auto lg:overflow-hidden">
      {/* Outer Dark Frame */}
      <div className="w-full max-w-7xl min-h-screen lg:min-h-0 lg:h-full lg:max-h-[96vh] bg-[#262523] rounded-2xl sm:rounded-[2rem] p-3.5 sm:p-5 lg:p-6 shadow-2xl border border-white/[0.06] flex flex-col justify-between overflow-visible lg:overflow-hidden gap-3 sm:gap-4 lg:gap-0 my-auto">
        
        {/* =================================================================== */}
        {/* 1. TOP NAVIGATION BAR                                               */}
        {/* =================================================================== */}
        <header className="flex items-center justify-between px-1 sm:px-2 py-1 shrink-0 gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono-code text-xs sm:text-sm font-semibold tracking-widest text-[#F3EFEA] uppercase">
              DEV / ILYAN
            </span>
          </div>

          <nav className="flex items-center gap-3 sm:gap-6 lg:gap-8 text-[11px] sm:text-xs font-sans-clean font-medium tracking-wide text-[#A39E95] overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => setShowAboutModal(true)}
              className="hover:text-[#F3EFEA] active:text-white transition-colors uppercase cursor-pointer whitespace-nowrap"
            >
              ABOUT
            </button>
            <button
              onClick={() => {
                setDirectoryTab('projects');
                setShowDirectoryModal(true);
              }}
              className="hover:text-[#F3EFEA] active:text-white transition-colors uppercase cursor-pointer whitespace-nowrap"
            >
              PROJECTS
            </button>
            <button
              onClick={() => {
                setDirectoryTab('certificates');
                setShowDirectoryModal(true);
              }}
              className="hover:text-[#F3EFEA] active:text-white transition-colors uppercase cursor-pointer whitespace-nowrap"
            >
              <span className="hidden sm:inline">CERTIFICATIONS</span>
              <span className="sm:hidden">CERTS</span>
            </button>
            <button
              onClick={() => setShowContactModal(true)}
              className="hover:text-[#F3EFEA] active:text-white transition-colors uppercase cursor-pointer whitespace-nowrap"
            >
              CONTACT
            </button>
          </nav>
        </header>

        {/* =================================================================== */}
        {/* 2. MAIN BENTO GRID - TOP ROW                                        */}
        {/* =================================================================== */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 flex-1 min-h-0 py-1 sm:py-2">
          
          {/* Top-Left Card: 01 / ABOUT ME */}
          <div className="w-full lg:w-[38.5%] sand-card p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden min-h-[220px] lg:min-h-0 lg:h-full gap-3 lg:gap-0">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium">
                01 / ABOUT ME
              </span>
              
              {/* Abstract 4-Point Star Geometric Vector */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#1A1918] opacity-80"
              >
                <path
                  d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Heading & Full Multi-Line Bio */}
            <div className="space-y-1.5 my-auto py-1">
              <h1 className="font-serif-display text-2xl sm:text-3xl lg:text-[2.15rem] leading-[1.12] text-[#1A1918] tracking-tight">
                Building practical AI &amp; systems from <span className="italic font-normal">first principles</span>.
              </h1>
              <p className="text-[11px] sm:text-xs font-sans-clean text-[#1A1918] leading-relaxed">
                2nd-year Computer Systems Engineering student at QUEST Nawabshah (3.10 CGPA). Exploring the intersection of open-source LLM fine-tuning, AST security guardrails, and software systems — backed by 4 technical internships and a focus on clean, reliable code.
              </p>
            </div>

            {/* Bottom Row: Location & Academics Action */}
            <div className="flex items-center justify-between pt-1.5 border-t border-[rgba(26,25,24,0.12)] text-[10px] sm:text-[11px] font-mono-code text-[#78746D]">
              <span>QUEST Nawabshah, Pakistan</span>
              <button
                onClick={() => setShowAboutModal(true)}
                className="text-[#1A1918] font-semibold hover:underline cursor-pointer"
              >
                My Academic Record &amp; Internships &rarr;
              </button>
            </div>
          </div>

          {/* Portrait Card (Exact original 24% width on desktop, responsive clear face framing on mobile) */}
          <div className="w-full lg:w-[24%] sand-card p-2 sm:p-2.5 flex items-center justify-center relative overflow-hidden h-80 sm:h-96 lg:h-full shrink-0">
            <div className="w-full h-full rounded-[1.1rem] overflow-hidden relative shadow-inner bg-[#DFD5C6]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pp.jpeg"
                alt="Ilyan Khan"
                className="w-full h-full object-cover object-[center_28%] scale-[1.25] lg:scale-100 lg:object-top hover:scale-[1.3] lg:hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/65 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-3 right-3 text-[#F3EFEA] font-sans-clean">
                <span className="font-serif-display text-base sm:text-lg lg:text-base font-normal block leading-tight">
                  Ilyan Khan
                </span>
                <span className="text-[9px] font-mono-code text-[#DFD5C6] uppercase">
                  Systems Engineering &bull; QUEST
                </span>
              </div>
            </div>
          </div>

          {/* Top-Right: Pure High-Craft Editorial Showcase (Exact original 37.5% width on desktop) */}
          <div
            id="projects-card"
            className="w-full lg:w-[37.5%] sand-card p-4 sm:p-5 flex flex-col justify-between min-h-[260px] lg:min-h-0 lg:h-full gap-2 lg:gap-0"
          >
            {/* Clickable Header */}
            <div
              onClick={() => setShowDirectoryModal(true)}
              className="flex items-center justify-between pb-2 border-b border-[rgba(26,25,24,0.12)] cursor-pointer group hover:bg-[rgba(26,25,24,0.03)] -mx-1 px-1 rounded-t-lg transition-colors"
              title="Open Full Achievements Directory"
            >
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium block group-hover:text-[#1A1918] transition-colors">
                  05 / TECHNICAL WORK
                </span>
                <h3 className="font-serif-display text-xl text-[#1A1918] font-normal tracking-tight group-hover:text-emerald-900 transition-colors">
                  Projects &amp; Certifications
                </h3>
              </div>
              <span className="text-[#1A1918] group-hover:text-emerald-800 text-sm font-mono-code group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all p-1">
                ↗
              </span>
            </div>

            {/* Clean Section 1: Projects */}
            <div className="space-y-1 py-1">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium block">
                Featured Projects
              </span>

              <div className="divide-y divide-[rgba(26,25,24,0.08)]">
                {/* Project 1 */}
                <button
                  onClick={() => setSelectedProject(ALL_PROJECTS[0])}
                  className="w-full py-1.5 flex items-center justify-between group transition-colors cursor-pointer text-left active:bg-black/5 rounded-md px-1 -mx-1"
                >
                  <div className="pr-2 min-w-0">
                    <span className="text-xs font-sans-clean font-semibold text-[#1A1918] group-hover:text-emerald-800 transition-colors block truncate">
                      {ALL_PROJECTS[0].name}
                    </span>
                    <span className="text-[10px] font-mono-code text-[#78746D] block truncate">
                      {ALL_PROJECTS[0].subtitle}
                    </span>
                  </div>
                  <span className="text-xs font-mono-code text-[#78746D] group-hover:translate-x-1 group-hover:text-[#1A1918] transition-all shrink-0">
                    &rarr;
                  </span>
                </button>

                {/* Project 2 */}
                <button
                  onClick={() => setSelectedProject(ALL_PROJECTS[1])}
                  className="w-full py-1.5 flex items-center justify-between group transition-colors cursor-pointer text-left active:bg-black/5 rounded-md px-1 -mx-1"
                >
                  <div className="pr-2 min-w-0">
                    <span className="text-xs font-sans-clean font-semibold text-[#1A1918] group-hover:text-emerald-800 transition-colors block truncate">
                      {ALL_PROJECTS[1].name}
                    </span>
                    <span className="text-[10px] font-mono-code text-[#78746D] block truncate">
                      {ALL_PROJECTS[1].subtitle}
                    </span>
                  </div>
                  <span className="text-xs font-mono-code text-[#78746D] group-hover:translate-x-1 group-hover:text-[#1A1918] transition-all shrink-0">
                    &rarr;
                  </span>
                </button>
              </div>
            </div>

            {/* Clean Section 2: Certifications */}
            <div className="space-y-1 py-1 border-t border-[rgba(26,25,24,0.08)]">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium block">
                Verified Certifications
              </span>

              <div className="divide-y divide-[rgba(26,25,24,0.08)]">
                {/* Cert 1 */}
                <button
                  onClick={() => setSelectedCert(ALL_CERTIFICATES[0])}
                  className="w-full py-1.5 flex items-center justify-between group transition-colors cursor-pointer text-left active:bg-black/5 rounded-md px-1 -mx-1"
                >
                  <div className="pr-2 min-w-0">
                    <span className="text-xs font-sans-clean font-semibold text-[#1A1918] group-hover:text-emerald-800 transition-colors block truncate">
                      {ALL_CERTIFICATES[0].title}
                    </span>
                    <span className="text-[10px] font-mono-code text-[#78746D] block truncate">
                      {ALL_CERTIFICATES[0].issuer} &bull; Verified
                    </span>
                  </div>
                  <span className="text-xs font-mono-code text-[#78746D] group-hover:translate-x-1 group-hover:text-[#1A1918] transition-all shrink-0">
                    &rarr;
                  </span>
                </button>

                {/* Cert 2 */}
                <button
                  onClick={() => setSelectedCert(ALL_CERTIFICATES[1])}
                  className="w-full py-1.5 flex items-center justify-between group transition-colors cursor-pointer text-left active:bg-black/5 rounded-md px-1 -mx-1"
                >
                  <div className="pr-2 min-w-0">
                    <span className="text-xs font-sans-clean font-semibold text-[#1A1918] group-hover:text-emerald-800 transition-colors block truncate">
                      {ALL_CERTIFICATES[1].title}
                    </span>
                    <span className="text-[10px] font-mono-code text-[#78746D] block truncate">
                      {ALL_CERTIFICATES[1].issuer} &bull; Generative AI
                    </span>
                  </div>
                  <span className="text-xs font-mono-code text-[#78746D] group-hover:translate-x-1 group-hover:text-[#1A1918] transition-all shrink-0">
                    &rarr;
                  </span>
                </button>
              </div>
            </div>

            {/* Footer with Directory Trigger */}
            <div className="pt-2 border-t border-[rgba(26,25,24,0.12)] text-[10px] font-mono-code text-[#78746D] flex justify-between items-center">
              <span>Systems Engineering &bull; Open Source</span>
              <button
                onClick={() => setShowDirectoryModal(true)}
                className="text-[#1A1918] font-semibold hover:underline cursor-pointer flex items-center gap-0.5"
              >
                <span>Full Directory</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. BOTTOM BENTO ROW                                                 */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 shrink-0">
          
          {/* Philosophy Card (Bottom-Left, 5 cols) */}
          <div className="md:col-span-5 sand-card p-3.5 sm:p-4 flex flex-col justify-between space-y-2 sm:space-y-1.5 min-h-[110px]">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium">
                  02 / HOW I LEARN &amp; BUILD
                </span>
                <span className="text-[10px] font-mono-code text-[#78746D]">FIRST PRINCIPLES</span>
              </div>
              <p className="text-[11px] sm:text-xs font-sans-clean text-[#1A1918] leading-relaxed">
                I believe engineering is best mastered by building from scratch. I bridge foundational computer systems theory with practical AI — writing clean, tested code that turns academic concepts into reliable software.
              </p>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-[rgba(26,25,24,0.12)] text-[10px] sm:text-[11px] font-mono-code text-[#78746D]">
              <span>Hands-on Code &bull; Practical AI</span>
              <button
                onClick={() => setShowPhilosophyModal(true)}
                className="text-[#1A1918] font-semibold hover:underline cursor-pointer"
              >
                Learning Philosophy &rarr;
              </button>
            </div>
          </div>

          {/* Contact Card (Bottom-Center, 4 cols) */}
          <div
            onClick={() => setShowContactModal(true)}
            className="md:col-span-4 sand-card-dark p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer hover:bg-[#363633] active:scale-[0.99] transition-all group min-h-[110px]"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#A39E95] font-medium">
                03 / CONNECT &amp; COLLABORATE
              </span>
              <span className="text-sm text-[#F3EFEA] font-mono-code group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </div>

            <div className="py-1">
              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#F3EFEA] font-normal leading-tight">
                Get in touch
              </h3>
            </div>

            <div className="text-[10px] sm:text-[11px] font-mono-code text-emerald-400 font-medium">
              ilyaankhan342@gmail.com
            </div>
          </div>

          {/* Social Links Pill (Bottom-Right, 3 cols) */}
          <div
            onClick={() => setShowNetworkModal(true)}
            className="md:col-span-3 sand-card p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer hover:bg-[#DDD4C5] active:scale-[0.99] transition-all group min-h-[110px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium">
                04 / PROFILES &amp; RESUME
              </span>
              <span className="text-xs font-mono-code text-[#78746D] group-hover:text-[#1A1918] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                ↗
              </span>
            </div>

            <div className="flex flex-col gap-1 py-1">
              <a
                href="https://github.com/Ilyan321"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[11px] sm:text-xs font-sans-clean font-semibold tracking-wider text-[#1A1918] hover:text-emerald-800 transition-colors uppercase flex items-center justify-between py-0.5"
              >
                <span>GITHUB</span>
                <span className="text-xs font-mono-code text-[#78746D]">↗</span>
              </a>
              <a
                href="https://linkedin.com/in/ilyan-khan-480341359"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[11px] sm:text-xs font-sans-clean font-semibold tracking-wider text-[#1A1918] hover:text-emerald-800 transition-colors uppercase flex items-center justify-between py-0.5"
              >
                <span>LINKEDIN</span>
                <span className="text-xs font-mono-code text-[#78746D]">↗</span>
              </a>
              <a
                href="/CV.pdf"
                download
                onClick={(e) => e.stopPropagation()}
                className="text-[11px] sm:text-xs font-sans-clean font-semibold tracking-wider text-[#1A1918] hover:text-emerald-800 transition-colors uppercase flex items-center justify-between py-0.5"
              >
                <span>RESUME (PDF)</span>
                <span className="text-xs font-mono-code text-[#78746D]">↓</span>
              </a>
            </div>

            <div className="text-[9px] font-mono-code text-[#78746D] pt-1 border-t border-[rgba(26,25,24,0.12)] flex items-center justify-between">
              <span>&copy; 2026 ILYAN KHAN</span>
              <span className="text-[10px] font-sans-clean font-semibold text-[#1A1918] group-hover:underline">
                View All &rarr;
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* =================================================================== */}
      {/* ✦ DUAL-TAB DIRECTORY MODAL (PROJECTS & CERTIFICATIONS)              */}
      {/* =================================================================== */}
      <AnimatePresence>
        {showDirectoryModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDirectoryModal(false)}
              className="fixed inset-0 bg-[#1A1918]/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragDirectionLock
              dragSnapToOrigin
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.75 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setShowDirectoryModal(false);
                }
              }}
              className="relative w-full max-w-3xl sand-card p-5 sm:p-7 lg:p-8 space-y-4 sm:space-y-5 shadow-2xl z-10 max-h-[88vh] sm:max-h-[90vh] overflow-y-auto border border-[#1A1918]/20 rounded-t-[1.75rem] rounded-b-none sm:rounded-[1.75rem] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              {/* Mobile Drag Indicator & Touch Area */}
              <div className="w-full flex justify-center pt-0 pb-3 -mt-2 sm:hidden cursor-grab active:cursor-grabbing touch-none select-none">
                <div className="w-12 h-1.5 rounded-full bg-[#1A1918]/25" />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowDirectoryModal(false)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 text-[#78746D] hover:text-[#1A1918] rounded-full bg-[rgba(26,25,24,0.06)] hover:bg-[rgba(26,25,24,0.12)] transition-colors cursor-pointer"
                aria-label="Close Directory"
              >
                <XIcon size={18} />
              </button>

              <div className="pr-8">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium">
                  05 / ACADEMIC &amp; TECHNICAL DIRECTORY
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl text-[#1A1918] font-normal tracking-tight">
                  Projects &amp; Verified Certifications
                </h2>
                <p className="text-xs font-sans-clean text-[#78746D] mt-0.5">
                  Select any project or certificate to inspect full architectural details &amp; credentials.
                </p>
              </div>

              {/* 2-Section Tab Switcher */}
              <div className="flex items-center gap-1.5 sm:gap-2 p-1 rounded-xl bg-[#DFD5C6] border border-[rgba(26,25,24,0.1)]">
                <button
                  onClick={() => setDirectoryTab('projects')}
                  className={`flex-1 py-2 px-2.5 sm:px-3 rounded-lg text-[11px] sm:text-xs font-mono-code font-semibold transition-all cursor-pointer truncate ${
                    directoryTab === 'projects'
                      ? 'bg-[#1A1918] text-[#F3EFEA] shadow'
                      : 'text-[#78746D] hover:text-[#1A1918]'
                  }`}
                >
                  Flagship Projects ({ALL_PROJECTS.length})
                </button>
                <button
                  onClick={() => setDirectoryTab('certificates')}
                  className={`flex-1 py-2 px-2.5 sm:px-3 rounded-lg text-[11px] sm:text-xs font-mono-code font-semibold transition-all cursor-pointer truncate ${
                    directoryTab === 'certificates'
                      ? 'bg-[#1A1918] text-[#F3EFEA] shadow'
                      : 'text-[#78746D] hover:text-[#1A1918]'
                  }`}
                >
                  Verified Credentials ({ALL_CERTIFICATES.length})
                </button>
              </div>

              {/* Tab 1: Full Projects List */}
              {directoryTab === 'projects' && (
                <div className="space-y-2.5">
                  {ALL_PROJECTS.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      className="p-3.5 sm:p-4 rounded-xl bg-[#DFD5C6] border border-[rgba(26,25,24,0.1)] hover:border-[#1A1918] transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-sans-clean font-bold text-[#1A1918] group-hover:text-emerald-800 transition-colors">
                            {proj.name}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-code bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300">
                            {proj.grade}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono-code text-[#78746D]">
                          {proj.subtitle}
                        </p>
                      </div>
                      <span className="text-xs font-mono-code text-[#78746D] group-hover:text-[#1A1918] group-hover:translate-x-1 transition-all self-end sm:self-center">
                        Inspect Case Study &rarr;
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Full Certifications List */}
              {directoryTab === 'certificates' && (
                <div className="space-y-2.5">
                  {ALL_CERTIFICATES.map((cert) => (
                    <div
                      key={cert.id}
                      onClick={() => setSelectedCert(cert)}
                      className="p-3.5 sm:p-4 rounded-xl bg-[#DFD5C6] border border-[rgba(26,25,24,0.1)] hover:border-[#1A1918] transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-sans-clean font-bold text-[#1A1918] group-hover:text-emerald-800 transition-colors">
                            {cert.title}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-code bg-[#1A1918] text-[#F3EFEA]">
                            {cert.tag}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono-code text-[#78746D]">
                          {cert.issuer} &bull; {cert.issueDate}
                        </p>
                      </div>
                      <span className="text-xs font-mono-code text-[#78746D] group-hover:text-[#1A1918] group-hover:translate-x-1 transition-all self-end sm:self-center">
                        View Credential &rarr;
                      </span>
                    </div>
                  ))}
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* ✦ CERTIFICATION DETAIL MODAL (FULL CREDENTIAL + CERTIFICATE IMAGE)  */}
      {/* =================================================================== */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-[#1A1918]/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragDirectionLock
              dragSnapToOrigin
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.75 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setSelectedCert(null);
                }
              }}
              className="relative w-full max-w-2xl sand-card p-5 sm:p-7 lg:p-8 space-y-4 sm:space-y-5 shadow-2xl z-10 max-h-[88vh] sm:max-h-[90vh] overflow-y-auto border border-[#1A1918]/20 rounded-t-[1.75rem] rounded-b-none sm:rounded-[1.75rem] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              {/* Mobile Drag Indicator & Touch Area */}
              <div className="w-full flex justify-center pt-0 pb-3 -mt-2 sm:hidden cursor-grab active:cursor-grabbing touch-none select-none">
                <div className="w-12 h-1.5 rounded-full bg-[#1A1918]/25" />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 text-[#78746D] hover:text-[#1A1918] rounded-full bg-[rgba(26,25,24,0.06)] hover:bg-[rgba(26,25,24,0.12)] transition-colors cursor-pointer"
                aria-label="Close Credential Drawer"
              >
                <XIcon size={18} />
              </button>

              <div className="space-y-1 pr-8">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-[#1A1918] text-[#F3EFEA] uppercase font-medium">
                    {selectedCert.tag}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-emerald-800 text-white font-semibold">
                    Verified
                  </span>
                </div>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#1A1918] tracking-tight">
                  {selectedCert.title}
                </h2>
                <p className="text-xs font-sans-clean text-[#78746D]">
                  Issued by {selectedCert.issuer} &bull; {selectedCert.issueDate}
                </p>
              </div>

              {/* Certificate Image or Document Preview (Full View, Never Cropped) */}
              <div className="w-full rounded-xl overflow-hidden border border-[rgba(26,25,24,0.15)] bg-[#1A1918]/5 p-1 sm:p-2 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedCert.imagePath}
                  alt={selectedCert.title}
                  className="w-full h-auto max-h-[65vh] object-contain rounded-lg shadow-md mx-auto block"
                  loading="lazy"
                />
              </div>

              {/* Description & Competencies */}
              <div className="space-y-3 text-xs font-sans-clean text-[#1A1918]">
                <p className="leading-relaxed text-[#1A1918]">
                  {selectedCert.description}
                </p>

                <div className="space-y-1.5">
                  <h4 className="font-mono-code text-[11px] text-[#78746D] uppercase font-semibold">
                    Key Competencies Mastered
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCert.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono-code bg-[#DFD5C6] text-[#1A1918] border border-[rgba(26,25,24,0.1)] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-[rgba(26,25,24,0.12)] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono-code text-[#78746D]">
                    Credential ID: {selectedCert.credentialId || 'GCC-VERIFIED'}
                  </span>
                  {selectedCert.pdfPath && (
                    <a
                      href={selectedCert.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono-code font-semibold text-emerald-900 hover:underline flex items-center gap-0.5"
                    >
                      <span>Official PDF</span>
                      <ExternalLinkIcon size={10} />
                    </a>
                  )}
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="text-xs font-mono-code text-[#1A1918] font-semibold hover:underline cursor-pointer"
                >
                  Back to Directory &rarr;
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* ✦ PROJECT DETAIL DRAWER / MODAL (FULL CASE STUDY)                   */}
      {/* =================================================================== */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-[#1A1918]/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragDirectionLock
              dragSnapToOrigin
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.75 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setSelectedProject(null);
                }
              }}
              className="relative w-full max-w-3xl sand-card p-5 sm:p-7 lg:p-8 space-y-4 sm:space-y-5 shadow-2xl z-10 max-h-[88vh] sm:max-h-[90vh] overflow-y-auto border border-[#1A1918]/20 rounded-t-[1.75rem] rounded-b-none sm:rounded-[1.75rem] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              {/* Mobile Drag Indicator & Touch Area */}
              <div className="w-full flex justify-center pt-0 pb-3 -mt-2 sm:hidden cursor-grab active:cursor-grabbing touch-none select-none">
                <div className="w-12 h-1.5 rounded-full bg-[#1A1918]/25" />
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 text-[#78746D] hover:text-[#1A1918] rounded-full bg-[rgba(26,25,24,0.06)] hover:bg-[rgba(26,25,24,0.12)] transition-colors cursor-pointer"
                aria-label="Close Project Drawer"
              >
                <XIcon size={18} />
              </button>

              <div className="space-y-1.5 pr-8">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-[#1A1918] text-[#F3EFEA] uppercase font-medium">
                    {selectedProject.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-emerald-800 text-white font-semibold">
                    {selectedProject.grade}
                  </span>
                </div>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#1A1918] tracking-tight">
                  {selectedProject.name}
                </h2>
                <p className="text-xs font-sans-clean text-[#78746D] leading-relaxed">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {selectedProject.highlights.map((h, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-[#DFD5C6] border border-[rgba(26,25,24,0.08)]">
                    <span className="text-[9px] font-mono-code text-[#78746D] block uppercase">{h.label}</span>
                    <span className="text-xs font-sans-clean font-bold text-[#1A1918]">{h.value}</span>
                  </div>
                ))}
              </div>

              {/* Technical Breakdown */}
              <div className="space-y-3.5 text-xs font-sans-clean text-[#1A1918]">
                <div className="space-y-1">
                  <h4 className="font-mono-code text-[11px] text-[#78746D] uppercase tracking-wider font-semibold">
                    1. Problem Formulation &amp; Challenge
                  </h4>
                  <p className="text-[#1A1918] leading-relaxed pl-3 border-l-2 border-[#1A1918]">
                    {selectedProject.challenge}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-mono-code text-[11px] text-[#78746D] uppercase tracking-wider font-semibold">
                    2. Core Architectural Engineering
                  </h4>
                  <ul className="space-y-1 pl-3 border-l-2 border-[#1A1918] text-[#1A1918]">
                    {selectedProject.architecture.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-800 font-mono-code font-bold">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-mono-code text-[11px] text-[#78746D] uppercase tracking-wider font-semibold">
                    3. Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono-code bg-[#DFD5C6] text-[#1A1918] border border-[rgba(26,25,24,0.12)] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[rgba(26,25,24,0.12)]">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono-code border border-[#1A1918] text-[#1A1918] hover:bg-[#1A1918] hover:text-[#F3EFEA] transition-colors"
                >
                  <GithubIcon size={13} />
                  <span>Inspect Source Code</span>
                </a>

                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono-code bg-[#1A1918] text-[#F3EFEA] font-semibold hover:bg-black transition-colors"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLinkIcon size={12} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* ✦ HOW I BUILD & PHILOSOPHY DRAWER / MODAL ✦                         */}
      {/* =================================================================== */}
      <AnimatePresence>
        {showPhilosophyModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPhilosophyModal(false)}
              className="fixed inset-0 bg-[#1A1918]/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragDirectionLock
              dragSnapToOrigin
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.75 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setShowPhilosophyModal(false);
                }
              }}
              className="relative w-full max-w-2xl sand-card p-5 sm:p-7 lg:p-8 space-y-4 sm:space-y-5 shadow-2xl z-10 border border-[#1A1918]/20 max-h-[88vh] sm:max-h-[90vh] overflow-y-auto rounded-t-[1.75rem] rounded-b-none sm:rounded-[1.75rem] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              {/* Mobile Drag Indicator & Touch Area */}
              <div className="w-full flex justify-center pt-0 pb-3 -mt-2 sm:hidden cursor-grab active:cursor-grabbing touch-none select-none">
                <div className="w-12 h-1.5 rounded-full bg-[#1A1918]/25" />
              </div>

              <button
                onClick={() => setShowPhilosophyModal(false)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 text-[#78746D] hover:text-[#1A1918] rounded-full bg-[rgba(26,25,24,0.06)] hover:bg-[rgba(26,25,24,0.12)] transition-colors cursor-pointer"
                aria-label="Close Modal"
              >
                <XIcon size={18} />
              </button>

              <div className="space-y-1 pr-8">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium">
                  02 / ENGINEERING MINDSET
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl text-[#1A1918] font-normal tracking-tight">
                  How I Learn &amp; Build
                </h2>
                <p className="text-xs font-sans-clean text-[#78746D]">
                  Undergraduate Systems Engineering &bull; QUEST Nawabshah
                </p>
              </div>

              {/* Core Builder Quote Box */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#DFD5C6] border border-[rgba(26,25,24,0.1)]">
                <p className="font-serif-display text-base sm:text-xl text-[#1A1918] italic leading-snug">
                  &ldquo;The deepest way to understand any system is to build it from first principles. I connect foundational computer systems principles with practical AI to create fast, reliable software.&rdquo;
                </p>
                <span className="text-[10px] font-mono-code text-[#78746D] block mt-2">
                  — Ilyan Khan, 2nd Year Computer Systems Engineering
                </span>
              </div>

              {/* Core Principles Breakdown */}
              <div className="space-y-2.5 sm:space-y-3 text-xs font-sans-clean text-[#1A1918]">
                <div className="p-3 rounded-lg bg-[rgba(26,25,24,0.04)] border border-[rgba(26,25,24,0.08)]">
                  <strong className="font-mono-code text-[11px] uppercase text-[#1A1918] block mb-1">
                    1. First-Principles Exploration
                  </strong>
                  <p className="text-[#78746D] leading-relaxed">
                    Rather than relying solely on high-level APIs, I dive into fine-tuning open-source models (LoRA/PEFT), analyzing dataset representations on Hugging Face, and writing low-level C++ algorithms to master runtime execution and memory efficiency.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[rgba(26,25,24,0.04)] border border-[rgba(26,25,24,0.08)]">
                  <strong className="font-mono-code text-[11px] uppercase text-[#1A1918] block mb-1">
                    2. Deterministic &amp; Useful Software
                  </strong>
                  <p className="text-[#78746D] leading-relaxed">
                    From student management systems to AST security firewalls for LLMs, I prioritize software that is fast, mathematically verifiable, and practically useful in real hands.
                  </p>
                </div>
              </div>

              {/* Footer Link */}
              <div className="pt-3 border-t border-[rgba(26,25,24,0.12)]">
                <a
                  href="https://github.com/Ilyan321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono-code bg-[#1A1918] text-[#F3EFEA] font-semibold hover:bg-black transition-colors"
                >
                  <GithubIcon size={13} />
                  <span>Inspect All Repositories on GitHub ↗</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* ✦ NETWORK MODAL (WARM SAND / LIGHT THEME)                           */}
      {/* =================================================================== */}
      <AnimatePresence>
        {showNetworkModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNetworkModal(false)}
              className="fixed inset-0 bg-[#1A1918]/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragDirectionLock
              dragSnapToOrigin
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.75 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setShowNetworkModal(false);
                }
              }}
              className="relative w-full max-w-md sand-card p-5 sm:p-7 space-y-4 sm:space-y-5 shadow-2xl z-10 border border-[#1A1918]/20 max-h-[88vh] sm:max-h-[90vh] overflow-y-auto rounded-t-[1.75rem] rounded-b-none sm:rounded-[1.75rem] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              {/* Mobile Drag Indicator & Touch Area */}
              <div className="w-full flex justify-center pt-0 pb-3 -mt-2 sm:hidden cursor-grab active:cursor-grabbing touch-none select-none">
                <div className="w-12 h-1.5 rounded-full bg-[#1A1918]/25" />
              </div>

              <button
                onClick={() => setShowNetworkModal(false)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 text-[#78746D] hover:text-[#1A1918] rounded-full bg-[rgba(26,25,24,0.06)] hover:bg-[rgba(26,25,24,0.12)] transition-colors cursor-pointer"
                aria-label="Close Network Modal"
              >
                <XIcon size={18} />
              </button>

              <div className="space-y-1 pr-8">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium">
                  04 / GLOBAL NETWORK
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl text-[#1A1918] font-normal tracking-tight">
                  Find me online.
                </h2>
                <p className="text-xs font-sans-clean text-[#78746D]">
                  Open-source code, research models &amp; professional profiles.
                </p>
              </div>

              <div className="space-y-2.5 font-mono-code text-xs">
                <a
                  href="https://github.com/Ilyan321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#DFD5C6] border border-[rgba(26,25,24,0.1)] text-[#1A1918] hover:border-[#1A1918] hover:bg-[#D5CBB9] active:bg-[#CFC3B0] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon size={15} />
                    <span className="font-sans-clean font-semibold text-xs">GitHub Profile</span>
                  </div>
                  <span className="text-[11px] text-[#78746D] group-hover:text-[#1A1918] flex items-center gap-1">
                    <span>@Ilyan321</span>
                    <span>↗</span>
                  </span>
                </a>

                <a
                  href="https://linkedin.com/in/ilyan-khan-480341359"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#DFD5C6] border border-[rgba(26,25,24,0.1)] text-[#1A1918] hover:border-[#1A1918] hover:bg-[#D5CBB9] active:bg-[#CFC3B0] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon size={15} />
                    <span className="font-sans-clean font-semibold text-xs">LinkedIn Network</span>
                  </div>
                  <span className="text-[11px] text-[#78746D] group-hover:text-[#1A1918] flex items-center gap-1">
                    <span>Connect</span>
                    <span>↗</span>
                  </span>
                </a>

                <a
                  href="https://huggingface.co/Ilyankhan69"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#DFD5C6] border border-[rgba(26,25,24,0.1)] text-[#1A1918] hover:border-[#1A1918] hover:bg-[#D5CBB9] active:bg-[#CFC3B0] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">🤗</span>
                    <span className="font-sans-clean font-semibold text-xs">Hugging Face Hub</span>
                  </div>
                  <span className="text-[11px] text-[#78746D] group-hover:text-[#1A1918] flex items-center gap-1">
                    <span>@Ilyankhan69</span>
                    <span>↗</span>
                  </span>
                </a>

                <a
                  href="/CV.pdf"
                  download
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#1A1918] text-[#F3EFEA] hover:bg-black active:bg-neutral-900 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <FileTextIcon size={15} />
                    <span className="font-sans-clean font-semibold text-xs">Download Resume (PDF)</span>
                  </div>
                  <span className="text-xs text-[#DFD5C6] group-hover:translate-y-0.5 transition-transform">
                    ↓
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* ✦ CONTACT DRAWER / MODAL ✦                                          */}
      {/* =================================================================== */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
              className="fixed inset-0 bg-[#1A1918]/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragDirectionLock
              dragSnapToOrigin
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.75 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setShowContactModal(false);
                }
              }}
              className="relative w-full max-w-md sand-card-dark p-5 sm:p-7 space-y-4 sm:space-y-5 shadow-2xl z-10 border border-white/10 rounded-t-[1.75rem] rounded-b-none sm:rounded-[1.75rem] max-h-[88vh] sm:max-h-[90vh] overflow-y-auto pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              {/* Mobile Drag Indicator & Touch Area */}
              <div className="w-full flex justify-center pt-0 pb-3 -mt-2 sm:hidden cursor-grab active:cursor-grabbing touch-none select-none">
                <div className="w-12 h-1.5 rounded-full bg-white/30" />
              </div>

              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 text-[#A39E95] hover:text-white rounded-full bg-white/[0.05] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <XIcon size={18} />
              </button>

              <div className="pr-8">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#A39E95]">
                  DIRECT CONTACT
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl text-[#F3EFEA] font-normal mt-1">
                  Let&apos;s connect.
                </h2>
                <p className="text-xs font-sans-clean text-[#A39E95] mt-0.5">
                  Open for software engineering internships, AI research initiatives, and technical collaborations.
                </p>
              </div>

              <div className="space-y-2.5 font-mono-code text-xs">
                <a
                  href="mailto:ilyaankhan342@gmail.com"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#262523] border border-white/10 text-[#F3EFEA] hover:border-emerald-400 active:bg-[#1f1e1c] transition-colors"
                >
                  <span className="text-[#A39E95]">Email:</span>
                  <span className="text-emerald-400 font-semibold truncate pl-2">ilyaankhan342@gmail.com</span>
                </a>

                <a
                  href="https://wa.me/923213379342"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#262523] border border-white/10 text-[#F3EFEA] hover:border-cyan-400 active:bg-[#1f1e1c] transition-colors"
                >
                  <span className="text-[#A39E95]">WhatsApp:</span>
                  <span className="text-cyan-400 font-semibold">+92 321 3379342</span>
                </a>

                <a
                  href="/CV.pdf"
                  download
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#262523] border border-white/10 text-[#F3EFEA] hover:border-purple-400 active:bg-[#1f1e1c] transition-colors"
                >
                  <span className="text-[#A39E95]">Official CV:</span>
                  <span className="text-purple-300 font-semibold">Download PDF ↓</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* ✦ ABOUT & ACADEMICS DRAWER / MODAL ✦                                */}
      {/* =================================================================== */}
      <AnimatePresence>
        {showAboutModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAboutModal(false)}
              className="fixed inset-0 bg-[#1A1918]/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragDirectionLock
              dragSnapToOrigin
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.75 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setShowAboutModal(false);
                }
              }}
              className="relative w-full max-w-2xl sand-card p-5 sm:p-7 space-y-4 sm:space-y-5 shadow-2xl z-10 border border-[#1A1918]/20 max-h-[88vh] sm:max-h-[90vh] overflow-y-auto rounded-t-[1.75rem] rounded-b-none sm:rounded-[1.75rem] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              {/* Mobile Drag Indicator & Touch Area */}
              <div className="w-full flex justify-center pt-0 pb-3 -mt-2 sm:hidden cursor-grab active:cursor-grabbing touch-none select-none">
                <div className="w-12 h-1.5 rounded-full bg-[#1A1918]/25" />
              </div>

              <button
                onClick={() => setShowAboutModal(false)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 text-[#78746D] hover:text-[#1A1918] rounded-full bg-[rgba(26,25,24,0.06)] hover:bg-[rgba(26,25,24,0.12)] transition-colors cursor-pointer"
              >
                <XIcon size={18} />
              </button>

              <div className="pr-8">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D]">
                  ACADEMIC &amp; CAREER PROFILE
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl text-[#1A1918] font-normal mt-1">
                  About Ilyan Khan
                </h2>
                <p className="text-xs font-sans-clean text-[#78746D] mt-0.5 leading-relaxed">
                  Undergraduate Computer Systems Engineer at QUEST Nawabshah, Sindh, Pakistan.
                </p>
              </div>

              {/* Semester CGPA Breakdown */}
              <div className="space-y-2.5">
                <h4 className="font-mono-code text-[11px] text-[#78746D] uppercase font-semibold">
                  QUEST Nawabshah Academic Transcript
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-lg bg-[#DFD5C6] border border-[rgba(26,25,24,0.08)]">
                    <span className="text-[9px] font-mono-code text-[#78746D] block">1ST SEMESTER</span>
                    <span className="text-sm font-bold font-sans-clean text-[#1A1918]">3.13 / 4.00</span>
                    <span className="text-[10px] font-mono-code text-[#78746D] block">78.25%</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#DFD5C6] border border-[rgba(26,25,24,0.08)]">
                    <span className="text-[9px] font-mono-code text-[#78746D] block">2ND SEMESTER</span>
                    <span className="text-sm font-bold font-sans-clean text-[#1A1918]">3.05 / 4.00</span>
                    <span className="text-[10px] font-mono-code text-[#78746D] block">76.25%</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#1A1918] text-[#F3EFEA]">
                    <span className="text-[9px] font-mono-code text-[#A39E95] block">1ST YEAR AGGREGATE</span>
                    <span className="text-sm font-bold font-sans-clean text-white">3.10 / 4.00</span>
                    <span className="text-[10px] font-mono-code text-emerald-400 block">77.50% Official</span>
                  </div>
                </div>
              </div>

              {/* 4 Internships */}
              <div className="space-y-2 pt-1">
                <h4 className="font-mono-code text-[11px] text-[#78746D] uppercase font-semibold">
                  4 Industry Internships
                </h4>
                <div className="divide-y divide-[rgba(26,25,24,0.12)] text-xs font-sans-clean">
                  <div className="py-2 flex justify-between items-center">
                    <div>
                      <strong className="font-semibold text-[#1A1918] block text-xs">IntelliVerse</strong>
                      <span className="text-[11px] text-[#78746D]">Python GenAI Developer Intern</span>
                    </div>
                    <span className="font-mono-code text-[10px] text-[#78746D]">Mar – May 2026</span>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <div>
                      <strong className="font-semibold text-[#1A1918] block text-xs">Arch Technologies</strong>
                      <span className="text-[11px] text-[#78746D]">Software Engineer Intern (C++)</span>
                    </div>
                    <span className="font-mono-code text-[10px] text-[#78746D]">Jan – Feb 2026</span>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <div>
                      <strong className="font-semibold text-[#1A1918] block text-xs">Coretech Innovations</strong>
                      <span className="text-[11px] text-[#78746D]">Software Engineer Intern</span>
                    </div>
                    <span className="font-mono-code text-[10px] text-[#78746D]">Dec 2025 – Jan 2026</span>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <div>
                      <strong className="font-semibold text-[#1A1918] block text-xs">CodeAlpha</strong>
                      <span className="text-[11px] text-[#78746D]">Software Engineer Intern</span>
                    </div>
                    <span className="font-mono-code text-[10px] text-[#78746D]">Dec 2025</span>
                  </div>
                </div>
              </div>

              {/* CV Download CTA */}
              <div className="pt-2">
                <a
                  href="/CV.pdf"
                  download
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-[#1A1918] text-[#F3EFEA] hover:bg-black active:bg-neutral-900 transition-colors group text-xs font-mono-code"
                >
                  <div className="flex items-center gap-2">
                    <FileTextIcon size={14} />
                    <span className="font-sans-clean font-semibold">Download Full Official Resume (PDF)</span>
                  </div>
                  <span className="text-[#DFD5C6] group-hover:translate-y-0.5 transition-transform">↓</span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
