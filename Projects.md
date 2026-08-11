# Engineering Project Catalog & Quality Audit

**Target Profile:** `Ilyan321` (Ilyan Khan)  
**Total Repositories Audited:** 41  
**Audit Perspective:** Senior Frontend Engineer & Technical Recruiter  
**Curation Standard:** Portfolio Worthy (Grade 7.0 – 10.0) vs. Omit/Archive (Grade 1.0 – 6.9)

---

## 🌟 Portfolio Worthy Projects (Approved for Showcase)

The following repositories exhibit notable engineering logic, modern tech stacks (React, Next.js, TypeScript, PyTorch, LoRA fine-tuning, RAG, Groq LLMs, Supabase), structured documentation, and real deployment links or Hugging Face spaces.

---

# 1. Schema-Aware SQL Agent
**AI Quality Grade:** 9.5 / 10  
**Elevator Pitch:** A production-grade Natural Language to SQL autonomous pipeline powered by a LoRA fine-tuned LLaMA-3-8B model trained on the Yale Spider benchmark, shielded by a multi-layer deterministic Python AST security firewall that blocks destructive queries (DROP/DELETE/ALTER) and eliminates schema leakage.  
**Tech Stack:** PyTorch, LLaMA-3-8B, Unsloth, LoRA/PEFT, Hugging Face Transformers, TRL, BitsAndBytes, Python, SQLite, Hugging Face Hub  
**Key Features:**
- **LoRA Fine-Tuned LLaMA-3-8B:** Trained on the complex Yale Spider benchmark with 4-bit quantization, achieving high execution accuracy on nested queries and multi-table joins.
- **Deterministic AST Security Layer:** Custom Python security parser validating SQL Abstract Syntax Trees to guarantee zero destructive mutations (`DROP`, `DELETE`, `UPDATE`, `ALTER`, `TRUNCATE`) and whitelist table access.
- **Dynamic Schema Extraction:** Automatically inspects database metadata, indexes, and foreign key relations to inject grounded context into prompt templates without manual schema definitions.
- **Hosted Model & Diagnostics:** Publicly deployed model weights on Hugging Face Hub with structured execution metrics and error diagnostic pipelines.  
**Links:** [GitHub Repository](https://github.com/Ilyan321/Schema-Aware-SQL-Agent) | [Hugging Face Model & Demo](https://huggingface.co/Ilyankhan69/schema-aware-sql-agent)

---

# 2. Hogwarts Archivist (Source-Attributed RAG Chatbot)
**AI Quality Grade:** 9.2 / 10  
**Elevator Pitch:** An enterprise-grade Retrieval-Augmented Generation (RAG) conversational intelligence system for complex literary corpuses, combining LangChain vector search, FAISS similarity indexing, and Groq LLaMA 3 high-speed inference with verifiable, paragraph-level source attribution.  
**Tech Stack:** Python, LangChain, FAISS, Hugging Face Embeddings (`all-MiniLM-L6-v2`), Groq API (LLaMA-3-70B/8B), Streamlit, PyPDF  
**Key Features:**
- **Verifiable Source Attribution:** Generates grounded answers accompanied by exact chapter, book, and paragraph citation accordions to eliminate hallucination.
- **High-Dimensional FAISS Vector Database:** Implements cosine and Euclidean similarity indexing on recursively chunked text for sub-millisecond retrieval latency.
- **Ultra-Fast LLM Inference:** Powered by Groq cloud processing LLaMA-3 at over 500 tokens/second for instantaneous user interactions.
- **Conversational Memory & Streamlit UI:** Themed interactive chat interface featuring contextual conversation history, response latency telemetry, and chunk inspectors.  
**Links:** [GitHub Repository](https://github.com/Ilyan321/Hogwarts_Archivist) | [Hugging Face Live Space](https://huggingface.co/spaces/Ilyankhan69/Hogwarts-Archivist)

---

# 3. VibeGuard (Real-Time Content Moderation Engine)
**AI Quality Grade:** 9.0 / 10  
**Elevator Pitch:** An AI-driven real-time toxicity and harm detection engine powered by a fine-tuned DistilBERT transformer model trained on the Jigsaw multi-label dataset, delivering instant multi-category risk probability scoring, confidence metrics, and profanity filtering.  
**Tech Stack:** Python, PyTorch, Hugging Face Transformers (`distilbert-base-uncased`), Datasets, Streamlit, Scikit-Learn  
**Key Features:**
- **Fine-Tuned DistilBERT Classifier:** Specialized multi-label transformer achieving 86.67% validation accuracy across 6 toxicity labels (`toxic`, `severe_toxic`, `obscene`, `threat`, `insult`, `identity_hate`).
- **Sub-50ms CPU/GPU Inference:** Lightweight transformer footprint optimized for zero-lag streaming moderation in live chatrooms and comments.
- **Interactive Risk Visualizer:** Streamlit web application with custom HTML/CSS dynamic confidence gauges, color-coded severity badges, and raw probability breakdowns.
- **Modular Pipeline Architecture:** Clean separation of model loading, text tokenization, inference scoring, and UI presentation with threshold customization.  
**Links:** [GitHub Repository](https://github.com/Ilyan321/VibeGuard) | [Hugging Face Live Space](https://huggingface.co/spaces/Ilyankhan69/VibeGuard)

---

# 4. EduFocus Attendance Portal (React & Supabase Full-Stack SPA)
**AI Quality Grade:** 8.8 / 10  
**Elevator Pitch:** A modern, enterprise-grade Single Page Application (SPA) for real-time academic attendance tracking, built with React 18, Vite, Tailwind CSS 4, and Supabase PostgreSQL with real-time sync, role-based authentication, and automated classroom analytics.  
**Tech Stack:** React 18, Vite 5, Tailwind CSS 4, Supabase (PostgreSQL + Auth), React Router DOM, PostCSS  
**Key Features:**
- **Real-Time Supabase Cloud Sync:** Instant bi-directional database updates powered by Supabase PostgreSQL and Row-Level Security (RLS).
- **Fast Daily Attendance Flow:** Quick-click status toggling (`Present`, `Absent`, `Late`, `Excused`) with batch-saving and instant streak calculations.
- **Analytics & Export Engine:** Interactive class metrics computing attendance percentages, absence trends, and printable/exportable roster summaries.
- **Modern Glassmorphic UI:** Designed with Tailwind CSS 4, featuring dark mode support, micro-animations, and mobile-first responsive layouts.  
**Links:** [GitHub Repository](https://github.com/Ilyan321/attendance-app) | [Live Web App](https://Ilyan321.github.io/attendance-app/)

---

# 5. Spatial Classroom (Gamified Reverse-Tutor AI Platform)
**AI Quality Grade:** 8.6 / 10  
**Elevator Pitch:** An innovative "Reverse Classroom" application implementing the Feynman Technique where users test their mastery of complex topics by teaching a stubborn, easily confused 12-year-old AI student named Leo, featuring real-time state machines and Netlify Edge Functions.  
**Tech Stack:** JavaScript (ES6+), Netlify Edge Functions, Groq API (LLaMA 3), HTML5 Canvas, Vanilla CSS Glassmorphism  
**Key Features:**
- **Reverse-Tutor State Machine:** Real-time conversational loop tracking student comprehension (0-100%), patience depletion, and emotional reactions (`eureka`, `confused`, `bored`).
- **Dual-Stream Edge Engine:** Netlify Edge Function orchestrating two distinct LLM threads simultaneously: the interactive student persona and a hidden Teacher Co-Pilot coach.
- **Dynamic Context Grounding:** Extracts text from uploaded study materials (PDFs/notes) into browser state to constrain the AI's inquiry boundaries.
- **Spatial UI & Fluid Transitions:** Frosted glass desktop environment featuring dynamic ambient dimming and responsive light/dark themes.  
**Links:** [GitHub Repository](https://github.com/Ilyan321/spatial-classroom)

---

# 6. School Attendance Management System (Next.js 15 & TypeScript)
**AI Quality Grade:** 8.5 / 10  
**Elevator Pitch:** A scalable school administration platform engineered with the Next.js 15 App Router, TypeScript, and Tailwind CSS, featuring institutional schedule orchestration, multi-class attendance logs, and PRD-driven modular architecture.  
**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, PostgreSQL / Supabase, ESLint  
**Key Features:**
- **Next.js 15 App Router:** Built with React Server Components (RSC) and server actions for optimal hydration and lightning-fast page transitions.
- **Strict TypeScript Architecture:** End-to-end type safety covering user session roles, class models, attendance schemas, and API response contracts.
- **Role-Differentiated Dashboards:** Distinct layouts for institution administrators, faculty instructors, and students with breadcrumb navigation and tabular data grids.
- **PRD-Driven Specification:** Complete technical PRD and Claude/Agent instructions for continuous feature expansion and team collaboration.  
**Links:** [GitHub Repository](https://github.com/Ilyan321/school-attendance-system)

---

# 7. AI Content Summarizer & Polyglot Translator
**AI Quality Grade:** 8.0 / 10  
**Elevator Pitch:** An automated article ingestion and multi-lingual synthesis platform that scrapes long-form web content, generates structured multi-perspective summaries via Groq LLaMA 3, and translates outputs into 7 global languages with adjustable brevity controls.  
**Tech Stack:** Python, Streamlit, Groq API (LLaMA 3), BeautifulSoup4, Requests, Python-Dotenv  
**Key Features:**
- **Automated Web Article Ingestion:** Scrapes live web URLs, removing boilerplate HTML headers, navbars, and advertisements to extract pure article text.
- **Tunable AI Synthesis:** Configurable summarization engine supporting custom sentence-length sliders, key bullet extracts, and executive briefs.
- **7-Language Instant Translation:** Integrated translation pipeline preserving context and technical terminology across Spanish, French, German, Chinese, Arabic, Urdu, and Japanese.
- **User-Centric Streamlit UI:** One-click copy-to-clipboard, text export, and robust input validation for rate-limiting and invalid URLs.  
**Links:** [GitHub Repository](https://github.com/Ilyan321/AI_Content_Summarizer)

---

# 8. Weather AI & Contextual Style Advisor
**AI Quality Grade:** 7.8 / 10  
**Elevator Pitch:** A real-time meteorological intelligence utility that combines live OpenWeatherMap sensory data with Groq LLaMA 3.3 reasoning to generate personalized, climate-adaptive outfit recommendations and outdoor activity guidance.  
**Tech Stack:** Python, Streamlit, Groq API (LLaMA 3.3), OpenWeatherMap REST API, Requests  
**Key Features:**
- **Live Meteorological Ingestion:** Fetches real-time temperature, precipitation, humidity, wind velocity, and UV index for any global city.
- **Context-Aware Style Advice:** LLaMA 3.3 synthesizes current weather parameters into practical clothing recommendations (fabrics, layering, accessories).
- **Graceful Error Handling:** Comprehensive fallback boundaries for missing API keys, invalid city inputs, and network timeouts.
- **Live Hosted Deployment:** Deployed and actively hosted on Hugging Face Spaces for instant browser testing.  
**Links:** [GitHub Repository](https://github.com/Ilyan321/Weather_App) | [Hugging Face Live Space](https://huggingface.co/spaces/Ilyankhan69/WeatherApp)

---

# 9. Email Spam Filter (DistilBERT Transformer Pipeline)
**AI Quality Grade:** 7.7 / 10  
**Elevator Pitch:** An end-to-end NLP classification pipeline fine-tuning a DistilBERT transformer on the Enron email dataset, delivering 99.05% test accuracy with hosted zero-code browser inference on Hugging Face.  
**Tech Stack:** Python, PyTorch, Hugging Face Transformers (`distilbert-base-uncased`), Datasets, Evaluate, Kaggle Dual T4 GPUs  
**Key Features:**
- **99.05% Benchmark Accuracy:** Achieved 99.06% F1-score with low validation loss (0.0872) on the Enron Spam benchmark.
- **Mixed-Precision Cloud Training:** Trained on dual T4 GPUs using fp16 mixed precision, learning rate scheduling, and early stopping.
- **Hosted Inference Widget:** Model weights published on Hugging Face Hub with interactive online testing widget and API inference endpoints.
- **Drop-In Integration:** Includes minimal Python inference scripts using `transformers.pipeline` for integration into existing email backends.  
**Links:** [GitHub Repository](https://github.com/Ilyan321/email-spam-filter-model) | [Hugging Face Model & Demo](https://huggingface.co/Ilyankhan69/email-spam-filter)

---

# 10. WhatsApp Web Clone & Webhook Backend
**AI Quality Grade:** 7.5 / 10  
**Elevator Pitch:** A responsive messaging interface and webhook receiver powered by a Python FastAPI backend deployed serverlessly on Vercel, featuring real-time webhook payload routing and WhatsApp Web UI reproduction.  
**Tech Stack:** Python, FastAPI, Uvicorn, Vercel Serverless Functions, Requests, Python-Dotenv, HTML5/CSS3, JavaScript  
**Key Features:**
- **FastAPI Asynchronous Backend:** High-performance async endpoints for instant webhook payload capture and message dispatching.
- **Vercel Serverless Deployment:** Cloud-native architecture utilizing `vercel.json` rewrite routing for zero-server maintenance.
- **WhatsApp Web Layout:** Responsive client UI replicating conversation sidebar, message bubbles, timestamps, and input controls.
- **Secure Webhook Verification:** Token validation layer preventing unauthorized endpoint triggering.  
**Links:** [GitHub Repository](https://github.com/Ilyan321/whatsapp-clone) | [Live Vercel Deployment](https://whatsapp-clone-sigma-wheat.vercel.app)

---

# 11. LuxeStay Hotel Management System
**AI Quality Grade:** 7.2 / 10  
**Elevator Pitch:** A Streamlit-powered hotel operations and reservation platform built with Python and Pandas, featuring guest lifecycle management (check-in/check-out), live room status matrices, and automated billing calculation.  
**Tech Stack:** Python, Streamlit, Pandas, NumPy, CSV Data Store  
**Key Features:**
- **Room Status Matrix:** Visual matrix tracking room status (`Available`, `Occupied`, `Cleaning`, `Maintenance`) across multiple room categories.
- **Guest Lifecycle Management:** Complete guest registration, ID verification, stay duration calculation, and automated invoicing.
- **Multi-Filter Guest Directory:** Search and filter records by guest name, room number, contact, or check-in dates.
- **Persistent Data Pipeline:** Automatic state persistence and CSV data synchronization.  
**Links:** [GitHub Repository](https://github.com/Ilyan321/Hotel-Management-System)

---

# 12. Student Expense & Budget Tracker
**AI Quality Grade:** 7.0 / 10  
**Elevator Pitch:** A real-time personal budgeting and finance visualization dashboard designed for university students, built with Python, Streamlit, and Altair charts for interactive expenditure analytics and spending threshold alerts.  
**Tech Stack:** Python, Streamlit, Altair Charts, Pandas, CSV File Store  
**Key Features:**
- **Expense Logging Workflow:** Fast transaction entry with date stamping, category tagging (Food, Rent, Books, Travel), and payment methods.
- **Interactive Visual Analytics:** Altair bar charts and donut graphs providing categorical spending breakdowns and monthly trends.
- **Budget Warning Triggers:** Threshold indicators warning students when specific category budgets exceed predefined limits.
- **Persistent Data Store:** Automatic ledger backup to local CSV with instant reactive UI recalculations.  
**Links:** [GitHub Repository](https://github.com/Ilyan321/Student_Expense_Tracker)

---

# 13. MusicBot 2.0 (Audio Retrieval & Lyrics Streaming Engine)
**AI Quality Grade:** 7.0 / 10  
**Elevator Pitch:** A containerized audio retrieval and media streaming application combining Flask, `yt-dlp`, and synchronized lyrics APIs with a modern web player interface and Docker deployment configurations.  
**Tech Stack:** Python, Flask, yt-dlp, Docker, JavaScript, HTML5/CSS3  
**Key Features:**
- **Audio Extraction Engine:** Fast audio stream extraction utilizing `yt-dlp` with bitrate optimization.
- **Synchronized Lyrics Retrieval:** Live lyrics matching with song metadata for karaoke-style visual accompaniment.
- **Dockerized Architecture:** Production-ready multi-stage `Dockerfile` for seamless deployment across containerized cloud environments.
- **Frontend Player UI:** Sleek web audio player interface with volume controls, track progress scrubbing, and playlist queuing.  
**Links:** [GitHub Repository](https://github.com/Ilyan321/MusicBot2.0)

---

## 📁 Omit / Archive Repositories (Grade 1.0 – 6.9)

The following repositories were reviewed and categorized as **Omit / Archive** for the developer portfolio showcase. While valuable as academic coursework, internship task milestones, or prototypes, they do not meet the standard for a senior-tier developer portfolio.

| Repository | Grade | Category / Reason for Omission |
| :--- | :---: | :--- |
| `Arch_Internship_Month_1` | 5.8 | **C++ Internship Milestone**: Basic console tasks (Dice simulator, array-based task manager). |
| `Arch_Internship_Month_2` | 5.8 | **C++ Internship Milestone**: Basic console tasks continuing C++ internship practice. |
| `SmartCampusManagementSystem` | 5.5 | **Academic Coursework**: 1st/2nd year C++ console application without graphical UI. |
| `HospitalManagementSystem` | 5.5 | **Academic Coursework**: C++ console menu system for patient queues. |
| `HostelManagementSystem` | 5.5 | **Academic Coursework**: C++ console menu system with text-based room allocation. |
| `LibraryManagementSystem` | 5.5 | **Academic Coursework**: C++ OOP console system for book issue/returns. |
| `ZooManagementSystem` | 5.5 | **Academic Coursework**: C++ OOP inheritance demonstration in console. |
| `DataStructuresandAlgorithms` | 4.5 | **Academic Coursework**: University DSA lab exercises (Stacks, Queues, Linked Lists). |
| `assistant` | 6.0 | **Prototype Script**: Python desktop utility / app launcher script. |
| `AI_Study_App` | 6.0 | **Prototype**: Early multi-folder study app experiment. |
| `Email-Agent` | 6.0 | **Prototype**: Gmail triage script utilizing Groq and Google Auth. |
| `Profile_Info_Fetcher` | 5.5 | **Utility Script**: Python profile scraper for Pinterest and GitHub. |
| `Slasher-Vision-35mm` | 5.0 | **Notebook Experiment**: Single Jupyter notebook experiment. |
| `flyrank-ml-internship` | 6.2 | **Internship Repository**: Repository for ML internship task assignments. |
| `Nawabshah-Festival-Posture` | 5.5 | **Static Landing Page**: Basic HTML/CSS local event landing page. |
| `IlyanKhan-Portfolio` | 5.0 | **Legacy Portfolio**: Static HTML/CSS portfolio superseded by this modern React build. |
| `Responsive-image-gallery` | 3.5 | **Beginner Project**: Basic static HTML/CSS image grid. |
| `calculatorbyilyan` | 2.5 | **Beginner Project**: Basic HTML/CSS/JS calculator. |
| `Calculator` | 2.5 | **Beginner Project**: Single-file Python calculator. |
| `Python-Learning` | 3.5 | **Coursework & Labs**: Weekly university Python assignments and homework files. |
| `Python-Libraries` | 3.5 | **Learning Exercises**: NumPy, Pandas, Scikit-Learn practice notebooks. |
| `antigravity-skills` | 4.0 | **Automation Utility**: Shell script sync for AI Agent Skills. |
| `Ilyan321` | 4.0 | **GitHub Profile Config**: Special repository for GitHub profile README. |
| `ai.robots.txt` | 2.0 | **External Fork**: Fork of public robots.txt list without custom engineering. |
| `MatterOfChoice` | 2.0 | **External Fork**: Fork of Android repository. |
| `Email_Whatsapp_Automation` | 1.5 | **Empty / Stub**: Empty repository containing only a LICENSE file. |
| `Portfolio` | 1.0 | **Empty / Stub**: Empty placeholder repository. |
| `MusicBot` | 4.5 | **Superseded**: Older iteration superseded by `MusicBot2.0`. |
