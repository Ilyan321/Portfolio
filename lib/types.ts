export interface ProjectRow {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  category: string;
  elevator_pitch: string;
  challenge: string;
  architecture: string[];
  tech_stack: string[];
  github_url: string;
  demo_url: string | null;
  hugging_face_url: string | null;
  highlights: { label: string; value: string }[];
  sort_order: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfileRow {
  id: string;
  name: string;
  title: string;
  bio: string;
  philosophy_quote: string;
  philosophy_principles: { title: string; description: string }[];
  location: string;
  email: string;
  whatsapp: string | null;
  github_url: string;
  linkedin_url: string;
  huggingface_url: string | null;
  resume_url: string | null;
  updated_at: string;
}

// Frontend representations mapping to the DB schema
export interface ProjectItem {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
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

export interface ProfileData {
  id: string;
  name: string;
  title: string;
  bio: string;
  philosophyQuote: string;
  philosophyPrinciples: { title: string; description: string }[];
  location: string;
  email: string;
  whatsapp?: string;
  githubUrl: string;
  linkedinUrl: string;
  huggingfaceUrl?: string;
  resumeUrl?: string;
}

export function toProjectItem(row: ProjectRow): ProjectItem {
  return {
    id: row.id,
    name: row.name,
    subtitle: row.subtitle,
    tag: row.tag,
    category: row.category,
    elevatorPitch: row.elevator_pitch,
    challenge: row.challenge,
    architecture: row.architecture,
    techStack: row.tech_stack,
    githubUrl: row.github_url,
    demoUrl: row.demo_url || undefined,
    huggingFaceUrl: row.hugging_face_url || undefined,
    highlights: row.highlights,
  };
}

export function toProfileData(row: ProfileRow): ProfileData {
  return {
    id: row.id,
    name: row.name,
    title: row.title,
    bio: row.bio,
    philosophyQuote: row.philosophy_quote,
    philosophyPrinciples: row.philosophy_principles,
    location: row.location,
    email: row.email,
    whatsapp: row.whatsapp || undefined,
    githubUrl: row.github_url,
    linkedinUrl: row.linkedin_url,
    huggingfaceUrl: row.huggingface_url || undefined,
    resumeUrl: row.resume_url || undefined,
  };
}

export interface CertificateRow {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  tag: string;
  credential_id: string | null;
  image_path: string;
  pdf_path: string | null;
  description: string;
  skills: string[];
  sort_order: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface CertificateItem {
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

export function toCertificateItem(row: CertificateRow): CertificateItem {
  return {
    id: row.id,
    title: row.title,
    issuer: row.issuer,
    issueDate: row.issue_date,
    tag: row.tag,
    credentialId: row.credential_id || undefined,
    imagePath: row.image_path,
    pdfPath: row.pdf_path || undefined,
    description: row.description,
    skills: row.skills,
  };
}
