-- =============================================================================
-- Supabase Database Migration
-- Schema: projects, profile tables with RLS policies, triggers, and seed data
-- =============================================================================

-- 1. DROP existing tables and functions (IF EXISTS, CASCADE) for clean re-runs
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS profile CASCADE;

-- -----------------------------------------------------------------------------
-- 2. CREATE `projects` TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    tag TEXT NOT NULL,
    grade TEXT NOT NULL,
    category TEXT NOT NULL,
    elevator_pitch TEXT NOT NULL,
    challenge TEXT NOT NULL,
    architecture TEXT[] NOT NULL,
    tech_stack TEXT[] NOT NULL,
    github_url TEXT NOT NULL,
    demo_url TEXT,
    hugging_face_url TEXT,
    highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
    sort_order INT NOT NULL DEFAULT 0,
    visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 3. CREATE `profile` TABLE (Single-Row)
-- -----------------------------------------------------------------------------
CREATE TABLE profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL DEFAULT 'Ilyan Khan',
    title TEXT NOT NULL DEFAULT '2nd Year Computer Systems Engineering',
    bio TEXT NOT NULL,
    philosophy_quote TEXT NOT NULL,
    philosophy_principles JSONB NOT NULL DEFAULT '[]'::jsonb,
    location TEXT NOT NULL DEFAULT 'Available Worldwide',
    email TEXT NOT NULL,
    whatsapp TEXT,
    github_url TEXT NOT NULL,
    linkedin_url TEXT NOT NULL,
    huggingface_url TEXT,
    resume_url TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 4. AUTOMATIC `updated_at` TIMESTAMP TRIGGER FUNCTION
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profile_updated_at
    BEFORE UPDATE ON profile
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------
-- Enable RLS on both tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- Projects Table Policies:
-- Public (anon) can SELECT visible projects
CREATE POLICY "Allow public select on visible projects"
    ON projects
    FOR SELECT
    TO anon
    USING (visible = true);

-- Authenticated users have full access (SELECT, INSERT, UPDATE, DELETE)
CREATE POLICY "Allow authenticated full access to projects"
    ON projects
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Profile Table Policies:
-- Public (anon) can SELECT profile row (always public)
CREATE POLICY "Allow public select on profile"
    ON profile
    FOR SELECT
    TO anon
    USING (true);

-- Authenticated users have full access (SELECT, INSERT, UPDATE, DELETE)
CREATE POLICY "Allow authenticated full access to profile"
    ON profile
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- 6. SEED DATA — `projects` TABLE
-- -----------------------------------------------------------------------------
INSERT INTO projects (
    name,
    subtitle,
    tag,
    grade,
    category,
    elevator_pitch,
    challenge,
    architecture,
    tech_stack,
    github_url,
    demo_url,
    hugging_face_url,
    highlights,
    sort_order
) VALUES 
(
    'Schema-Aware SQL Agent',
    'LoRA Fine-Tuned LLaMA-3 + AST Security Guardrail',
    'AI & Security Systems',
    'Grade 9.5 / 10',
    'LLM Fine-Tuning & AST Parsers',
    'A natural language to SQL translation system built with a LoRA fine-tuned LLaMA-3-8B model trained on the Yale Spider benchmark, shielded by a deterministic Python AST parser that enforces read-only execution and prevents schema leakage.',
    'Eliminating multi-table join hallucinations while enforcing strict database integrity at the AST compilation level.',
    ARRAY['LoRA 4-bit Quantized Fine-Tuning on LLaMA-3-8B utilizing Unsloth and TRL on the Yale Spider benchmark.', 'Deterministic Python AST Security Guardrail ensuring 100% read-only SQL execution.', 'Dynamic Schema Extraction Layer injecting table structures and foreign keys into context prompts.', 'Public model weights published on Hugging Face Model Hub.'],
    ARRAY['PyTorch', 'LLaMA-3-8B', 'Unsloth', 'LoRA / PEFT', 'Transformers', 'SQLite', 'Hugging Face'],
    'https://github.com/Ilyan321/Schema-Aware-SQL-Agent',
    'https://huggingface.co/Ilyankhan69/schema-aware-sql-agent',
    'https://huggingface.co/Ilyankhan69/schema-aware-sql-agent',
    '[{"label": "Base Model", "value": "LLaMA-3-8B"}, {"label": "Fine-Tuning", "value": "LoRA (PEFT)"}, {"label": "Guardrail", "value": "AST Read-Only"}, {"label": "Benchmark", "value": "Yale Spider"}]',
    1
),
(
    'The Hogwarts Archivist',
    'Source-Attributed RAG with FAISS & Groq',
    'Retrieval & RAG Systems',
    'Grade 9.2 / 10',
    'Vector Search & RAG Architecture',
    'A high-speed conversational research engine combining LangChain vector search, FAISS Euclidean similarity indexing, and Groq LLaMA-3 inference with precise, verifiable paragraph-level source attribution.',
    'Grounding LLM responses against large document corpuses with zero hallucinations and exact paragraph citation.',
    ARRAY['Recursive text chunking with metadata binding chapter, book, and paragraph coordinates.', 'Sub-millisecond Euclidean similarity indexing via FAISS in-memory vector store.', 'Groq LLaMA-3 acceleration delivering responses at >500 tokens/second.'],
    ARRAY['Python', 'LangChain', 'FAISS', 'Groq API', 'LLaMA-3', 'Streamlit'],
    'https://github.com/Ilyan321/Hogwarts_Archivist',
    'https://huggingface.co/spaces/Ilyankhan69/Hogwarts-Archivist',
    'https://huggingface.co/spaces/Ilyankhan69/Hogwarts-Archivist',
    '[{"label": "Vector Index", "value": "FAISS Vector DB"}, {"label": "Inference", "value": ">500 tok/sec"}, {"label": "Attribution", "value": "Paragraph Exact"}, {"label": "Platform", "value": "Hugging Face Space"}]',
    2
),
(
    'VibeGuard Moderation',
    'DistilBERT Multi-Label Toxicity Classifier',
    'NLP & Safety Systems',
    'Grade 9.0 / 10',
    'Transformer NLP & Classification',
    'A real-time toxicity and harm classification model fine-tuned on DistilBERT using the Jigsaw multi-label dataset, delivering fast sub-50ms inference latency and probability radar scoring across 6 risk categories.',
    'Optimizing multi-label transformer inference latency for fast, reliable moderation workflows.',
    ARRAY['Fine-tuned DistilBERT transformer reaching 86.67% validation accuracy.', 'Optimized sub-50ms inference latency for high-throughput moderation.', 'Interactive probability radar scoring across 6 harm vectors.'],
    ARRAY['PyTorch', 'DistilBERT', 'Transformers', 'Datasets', 'Streamlit', 'Scikit-Learn'],
    'https://github.com/Ilyan321/VibeGuard',
    'https://huggingface.co/spaces/Ilyan321/vibeguard',
    'https://huggingface.co/spaces/Ilyan321/vibeguard',
    '[{"label": "Model", "value": "DistilBERT Multi-label"}, {"label": "Accuracy", "value": "86.67%"}, {"label": "Latency", "value": "< 50ms per prompt"}, {"label": "Classes", "value": "6 Toxicity Vectors"}]',
    3
),
(
    'Slasher-Vision-35mm',
    'Custom SDXL Diffusion LoRA for 35mm Retro Cinema',
    'Generative AI & Vision',
    'Grade 8.9 / 10',
    'Diffusion Models & LoRA Fine-Tuning',
    'A specialized Low-Rank Adaptation (LoRA) for Stable Diffusion XL (SDXL) designed to synthesize authentic 1980s 35mm film grain, anamorphic flare, and vintage cinematography aesthetics, stripping away generic digital smoothness.',
    'Isolating high-frequency film grain and optical distortion artifacts during training without degrading subject prompt fidelity.',
    ARRAY['Low-Rank Adaptation fine-tuned across SDXL UNet cross-attention layers.', 'Trained on curated vintage 35mm horror and thriller cinematography stills.', 'Published weights and usage triggers on Hugging Face Model Hub.'],
    ARRAY['PyTorch', 'SDXL', 'Diffusers', 'LoRA / PEFT', 'Hugging Face', 'Python'],
    'https://github.com/Ilyan321/Slasher-Vision-35mm',
    'https://huggingface.co/Ilyankhan69/slasher-vision-35mm',
    'https://huggingface.co/Ilyankhan69/slasher-vision-35mm',
    '[{"label": "Base Model", "value": "SDXL 1.0"}, {"label": "Technique", "value": "Cross-Attention LoRA"}, {"label": "Aesthetic", "value": "35mm Film Grain"}, {"label": "Platform", "value": "Hugging Face Hub"}]',
    4
),
(
    'EduFocus Attendance Portal',
    'React 18 & Supabase Real-Time Attendance SPA',
    'Full-Stack Web',
    'Grade 8.8 / 10',
    'Web Engineering & Real-Time Sync',
    'A modern Single Page Application (SPA) for real-time academic attendance tracking, built with React 18, Vite 5, Tailwind CSS 4, and Supabase PostgreSQL with real-time sync, role-based authentication, and automated classroom analytics.',
    'Providing instantaneous bi-directional roster synchronization across simultaneous teachers while maintaining offline resilient local state.',
    ARRAY['Bi-directional state sync via Supabase PostgreSQL and Row-Level Security (RLS).', 'Quick-click status toggling with instant streak metrics and analytics.', 'Responsive glassmorphic UI built with Tailwind CSS 4 and Vite 5.'],
    ARRAY['React 18', 'Vite 5', 'Tailwind CSS 4', 'Supabase', 'PostgreSQL', 'TypeScript'],
    'https://github.com/Ilyan321/attendance-app',
    'https://Ilyan321.github.io/attendance-app/',
    NULL,
    '[{"label": "Frontend", "value": "React 18 + Vite 5"}, {"label": "Database", "value": "Supabase PostgreSQL"}, {"label": "Security", "value": "Row-Level (RLS)"}, {"label": "Deploy", "value": "GitHub Pages"}]',
    5
),
(
    'Spatial Classroom',
    'Gamified Reverse-Tutor AI (Feynman Technique)',
    'AI Education & Edge',
    'Grade 8.7 / 10',
    'Conversational AI & State Machines',
    'A reverse-classroom web application testing user comprehension of complex technical concepts via the Feynman Technique — users teach a stubborn, easily confused 12-year-old AI student named Leo.',
    'Orchestrating dual-stream LLM threads concurrently to manage student cognitive state and coach the teacher in real-time.',
    ARRAY['Reverse-Tutor state machine tracking comprehension (0-100%) and patience depletion.', 'Netlify Edge Function orchestrating two simultaneous Groq LLaMA 3 threads.', 'Document grounding extracting uploaded notes and PDFs into inquiry constraints.'],
    ARRAY['JavaScript', 'Netlify Edge Functions', 'Groq LLaMA 3', 'HTML5 Canvas', 'CSS3'],
    'https://github.com/Ilyan321/spatial-classroom',
    NULL,
    NULL,
    '[{"label": "Method", "value": "Feynman Technique"}, {"label": "Backend", "value": "Netlify Edge"}, {"label": "Inference", "value": "Groq LLaMA 3"}, {"label": "Architecture", "value": "Dual-Thread Orchestration"}]',
    6
),
(
    'Spam Sentinel',
    'Multinomial Naive Bayes Email Classifier',
    'Machine Learning',
    'Grade 8.5 / 10',
    'Statistical Modeling & NLP',
    'A classical machine learning pipeline for spam detection utilizing TF-IDF vectorization and a Multinomial Naive Bayes classifier, wrapped in a lightweight Streamlit interface for direct text evaluation.',
    'Balancing precision and recall in imbalanced dataset distributions to minimize false positive filtering of critical emails.',
    ARRAY['Text preprocessing pipeline with NLTK stemming and stop-word removal.', 'TF-IDF matrix generation scaling term frequencies by inverse document frequency.', 'Multinomial Naive Bayes statistical modeling achieving 94% precision.'],
    ARRAY['Python', 'Scikit-Learn', 'NLTK', 'Pandas', 'Streamlit', 'Joblib'],
    'https://github.com/Ilyan321/email-spam-filter-model',
    'https://huggingface.co/Ilyankhan69/email-spam-filter',
    'https://huggingface.co/Ilyankhan69/email-spam-filter',
    '[{"label": "Algorithm", "value": "Naive Bayes"}, {"label": "Vectorization", "value": "TF-IDF"}, {"label": "Precision", "value": "94.2%"}, {"label": "Type", "value": "Classical ML"}]',
    7
),
(
    'Campus Track',
    'Console-Based Student Record System',
    'C++ Systems',
    'Grade 8.3 / 10',
    'Low-Level Memory & I/O',
    'A high-performance command-line student management system built purely in C++, leveraging manual memory management, pointer arithmetic, and binary file I/O for persistent, rapid record retrieval.',
    'Designing safe manual memory allocation and strict binary serialization formats without using standard library containers.',
    ARRAY['Dynamic memory allocation for variable-length student records.', 'Direct binary file serialization and deserialization for O(1) read access speeds.', 'Interactive console menu driven by a secure input validation loop.'],
    ARRAY['C++', 'Binary I/O', 'Memory Pointers', 'Standard Library (STL)', 'GCC'],
    'https://github.com/Ilyan321/school-attendance-system',
    NULL,
    NULL,
    '[{"label": "Language", "value": "C++11"}, {"label": "Persistence", "value": "Binary File I/O"}, {"label": "Memory", "value": "Manual Pointers"}, {"label": "Platform", "value": "Console / CLI"}]',
    8
),
(
    'QuickSum AI',
    'Extractive & Abstractive Content Summarizer',
    'NLP Pipelines',
    'Grade 8.1 / 10',
    'Text Processing & Transformers',
    'A dual-mode text summarization tool offering both frequency-based extractive summarization (NLTK) and transformer-based abstractive summarization (BART), designed to digest long-form articles into concise briefings.',
    'Handling variable-length text constraints across different summarization paradigms.',
    ARRAY['Extractive pipeline scoring sentences by normalized word frequency graphs.', 'Abstractive pipeline leveraging Facebook BART via Hugging Face Transformers.', 'Dynamic length constraints adjusting output ratios based on input volume.'],
    ARRAY['Python', 'Transformers', 'BART', 'NLTK', 'BeautifulSoup', 'Flask'],
    'https://github.com/Ilyan321/AI_Content_Summarizer',
    NULL,
    NULL,
    '[{"label": "Abstractive", "value": "Facebook BART"}, {"label": "Extractive", "value": "NLTK Scoring"}, {"label": "Input", "value": "URL & Raw Text"}, {"label": "Paradigm", "value": "Dual-Mode"}]',
    9
),
(
    'Atmosphere Live',
    'Real-Time Global Weather Dashboard',
    'Frontend APIs',
    'Grade 7.9 / 10',
    'Asynchronous JS & REST',
    'A sleek, responsive weather application fetching real-time global atmospheric data via the OpenWeatherMap API, featuring dynamic UI updates, 5-day forecasting, and location-based automated sensing.',
    'Managing asynchronous API race conditions and handling volatile JSON structures gracefully.',
    ARRAY['Asynchronous REST API integrations with robust error boundaries.', 'HTML5 Geolocation API integration for auto-detecting user coordinates.', 'Dynamic DOM manipulation mapping weather codes to corresponding SVG iconography.'],
    ARRAY['JavaScript (ES6)', 'REST APIs', 'OpenWeatherMap', 'HTML5', 'CSS3', 'Fetch API'],
    'https://github.com/Ilyan321/Weather_App',
    'https://huggingface.co/spaces/Ilyankhan69/WeatherApp',
    'https://huggingface.co/spaces/Ilyankhan69/WeatherApp',
    '[{"label": "Data Source", "value": "OpenWeather API"}, {"label": "Features", "value": "Geolocation"}, {"label": "Pattern", "value": "Async / Await"}, {"label": "UI", "value": "Dynamic DOM"}]',
    10
);

-- -----------------------------------------------------------------------------
-- 7. SEED DATA — `profile` TABLE (Single Row)
-- -----------------------------------------------------------------------------
INSERT INTO profile (
    name,
    title,
    bio,
    philosophy_quote,
    philosophy_principles,
    location,
    email,
    whatsapp,
    github_url,
    linkedin_url,
    huggingface_url,
    resume_url
) VALUES (
    'Ilyan Khan',
    '2nd Year Computer Systems Engineering',
    'AI Engineer and Product Manager exploring the intersection of open-source LLMs, AST security guardrails, and scalable software architecture — backed by 4 technical internships and a focus on clean, reliable code.',
    'The deepest way to understand any system is to build it from first principles. I connect foundational computer systems principles with practical AI to create fast, reliable software.',
    '[{"title": "First-Principles Exploration", "description": "Rather than relying solely on high-level APIs, I dive into fine-tuning open-source models (LoRA/PEFT), analyzing dataset representations on Hugging Face, and writing low-level C++ algorithms to master runtime execution and memory efficiency."}, {"title": "Deterministic & Useful Software", "description": "From student management systems to AST security firewalls for LLMs, I prioritize software that is fast, mathematically verifiable, and practically useful in real hands."}]',
    'Available Worldwide',
    'ilyaankhan342@gmail.com',
    '+92 321 3379342',
    'https://github.com/Ilyan321',
    'https://linkedin.com/in/ilyan-khan-480341359',
    'https://huggingface.co/Ilyankhan69',
    '/CV.pdf'
);
