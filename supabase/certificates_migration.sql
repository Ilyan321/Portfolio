-- -----------------------------------------------------------------------------
-- CREATE `certificates` TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    tag TEXT NOT NULL,
    credential_id TEXT,
    image_path TEXT NOT NULL,
    pdf_path TEXT,
    description TEXT NOT NULL,
    skills TEXT[] NOT NULL DEFAULT '{}',
    sort_order INT NOT NULL DEFAULT 0,
    visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER update_certificates_updated_at
    BEFORE UPDATE ON certificates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on visible certificates"
    ON certificates
    FOR SELECT
    TO anon
    USING (visible = true);

CREATE POLICY "Allow authenticated full access to certificates"
    ON certificates
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- SEED DATA — `certificates` TABLE
-- -----------------------------------------------------------------------------
INSERT INTO certificates (title, issuer, issue_date, tag, credential_id, image_path, description, skills, sort_order) VALUES
('Google Cybersecurity Professional', 'Google Career Certificates', '2025 – 2026', 'Security & Systems', 'GCC-SEC-892401', '/certificates/cybersecurity.png', 'Comprehensive professional certification covering security operations, Python automation for defensive operations, Linux CLI, SIEM tools, packet sniffing with Wireshark, and incident response frameworks.', ARRAY['Linux OS', 'Python Automation', 'SIEM / Splunk', 'Network Security', 'Wireshark', 'NIST Framework'], 1),
('Google AI Essentials', 'Google', '2025', 'Artificial Intelligence', 'GCC-AI-104928', '/certificates/ai-essentials.png', 'Foundational mastery of modern generative AI workflows, large language model architectures, automated workflow design, and ethical AI evaluation principles.', ARRAY['Generative AI', 'LLM Workflow Design', 'Ethical AI', 'Model Evaluation', 'Productivity AI'], 2),
('Google Prompting Essentials', 'Google', '2025', 'Artificial Intelligence', 'GCC-PR-902381', '/certificates/prompting-essentials.png', 'Advanced certification focusing on structured prompt engineering, zero-shot and few-shot reasoning techniques, context window optimization, and prompt-chaining across varied foundational models.', ARRAY['Prompt Engineering', 'Few-Shot Reasoning', 'Context Optimization', 'Prompt Chaining', 'LLM Interaction'], 3),
('IBM Back-End Development', 'IBM', '2025 – 2026', 'Software Engineering', 'IBM-BE-394821', '/certificates/ibm-backend.png', 'Rigorous back-end engineering program covering microservices architecture, Python Django/Flask frameworks, containerization with Docker and Kubernetes, and highly available RESTful API design.', ARRAY['Python', 'Django', 'Flask', 'Microservices', 'Docker', 'Kubernetes', 'REST APIs'], 4),
('Meta Back-End Developer', 'Meta', '2025 – 2026', 'Software Engineering', 'META-BE-774912', '/certificates/meta-backend.png', 'Comprehensive full-stack exposure emphasizing Meta-standard backend practices, version control with Git, database modeling with PostgreSQL, and building scalable web server APIs with Python.', ARRAY['Python', 'PostgreSQL', 'API Development', 'Git / GitHub', 'System Architecture'], 5),
('Google IT Support Professional', 'Google Career Certificates', '2024', 'IT & Systems', 'GCC-IT-109283', '/certificates/google-it.png', 'Extensive foundation in computer networking protocols (TCP/IP, DNS, DHCP), operating system administration across Windows and Linux, active directory management, and hardware troubleshooting.', ARRAY['Computer Networking', 'OS Administration', 'Hardware Troubleshooting', 'System Infrastructure'], 6),
('Agile Project Management', 'Google', '2024', 'Project Management', 'GCC-AG-498102', '/certificates/agile-management.png', 'Certification in modern Agile methodologies focusing on Scrum frameworks, sprint planning, velocity tracking, backlog refinement, and cross-functional team leadership.', ARRAY['Scrum Framework', 'Sprint Planning', 'Agile Methodology', 'Team Leadership', 'Velocity Tracking'], 7),
('Python for Data Science & AI', 'IBM', '2024', 'Data Science', 'IBM-PY-684910', '/certificates/python-data-science.png', 'Specialized track in Python programming emphasizing data structures, pandas, NumPy manipulation, and foundational AI modeling using scikit-learn and matplotlib data visualization.', ARRAY['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib', 'Data Wrangling'], 8),
('Foundations of User Experience (UX)', 'Google', '2024', 'Design & UX', 'GCC-UX-394821', '/certificates/google-ux.png', 'Core principles of user-centered design, wireframing, heuristic evaluation, and conducting user research to build intuitive, accessible digital interfaces.', ARRAY['User Research', 'Wireframing', 'Heuristic Evaluation', 'Figma', 'Prototyping'], 9);
