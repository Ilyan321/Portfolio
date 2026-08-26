import re

with open('components/home-view.tsx', 'r') as f:
    content = f.read()

# Replace interface ProjectItem to end of it
content = re.sub(r'interface ProjectItem \{.*?\n\}\n', '', content, flags=re.DOTALL)

# Remove ALL_PROJECTS array completely
content = re.sub(r'const ALL_PROJECTS: ProjectItem\[\] = \[.*?\n\];\n', '', content, flags=re.DOTALL)

# Add imports for types
content = content.replace("import {\n  ExternalLinkIcon,", "import type { ProjectItem, ProfileData } from '../lib/types';\n\nimport {\n  ExternalLinkIcon,")

# Update HomeView signature
content = content.replace('export function HomeView() {', 'interface HomeViewProps {\n  projects: ProjectItem[];\n  profile: ProfileData | null;\n}\n\nexport function HomeView({ projects, profile }: HomeViewProps) {')

# Update ALL_PROJECTS references
content = content.replace('ALL_PROJECTS', 'projects')

# Replace hardcoded profile data with profile.? fallbacks
content = content.replace('Ilyan Khan', "{profile?.name ?? 'Ilyan Khan'}")
content = content.replace('2nd Year Computer Systems Engineering', "{profile?.title ?? '2nd Year Computer Systems Engineering'}")
content = content.replace('ilyaankhan342@gmail.com', "{profile?.email ?? 'ilyaankhan342@gmail.com'}")
content = content.replace('Available Worldwide', "{profile?.location ?? 'Available Worldwide'}")

# Careful with links - they are in quotes.
# We will do these precisely.
content = content.replace('href="https://github.com/Ilyan321"', 'href={profile?.githubUrl ?? \'https://github.com/Ilyan321\'}')
content = content.replace('href="https://linkedin.com/in/ilyan-khan-480341359"', 'href={profile?.linkedinUrl ?? \'https://linkedin.com/in/ilyan-khan-480341359\'}')
content = content.replace('href="https://huggingface.co/Ilyankhan69"', 'href={profile?.huggingfaceUrl ?? \'https://huggingface.co/Ilyankhan69\'}')

# Fix the alt tag which has quotes
content = content.replace('alt="{profile?.name ?? \'Ilyan Khan\'}"', 'alt={profile?.name ?? \'Ilyan Khan\'}')
content = content.replace('href="mailto:{profile?.email ?? \'ilyaankhan342@gmail.com\'}"', 'href={`mailto:${profile?.email ?? \'ilyaankhan342@gmail.com\'}`}')

with open('components/home-view.tsx', 'w') as f:
    f.write(content)
