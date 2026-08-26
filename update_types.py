with open('lib/types.ts', 'r') as f:
    content = f.read()

types_to_add = """
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
"""

if "CertificateRow" not in content:
    content += types_to_add

with open('lib/types.ts', 'w') as f:
    f.write(content)
