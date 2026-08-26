import re

with open('components/home-view.tsx', 'r') as f:
    content = f.read()

# Add CertificateItem to imports
content = content.replace("import type { ProjectItem, ProfileData } from '../lib/types';", "import type { ProjectItem, ProfileData, CertificateItem } from '../lib/types';")

# Remove interface CertificateItem if present
content = re.sub(r'interface CertificateItem \{.*?\n\}\n', '', content, flags=re.DOTALL)

# Remove ALL_CERTIFICATES array completely
content = re.sub(r'const ALL_CERTIFICATES: CertificateItem\[\] = \[.*?\n\];\n', '', content, flags=re.DOTALL)

# Update HomeViewProps
content = content.replace('  profile: ProfileData | null;\n}', '  profile: ProfileData | null;\n  certificates: CertificateItem[];\n}')
content = content.replace('export function HomeView({ projects, profile }: HomeViewProps) {', 'export function HomeView({ projects, profile, certificates }: HomeViewProps) {')

# Replace ALL_CERTIFICATES with certificates
content = content.replace('ALL_CERTIFICATES', 'certificates')

with open('components/home-view.tsx', 'w') as f:
    f.write(content)
