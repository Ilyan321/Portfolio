import re

with open('app/admin/page.tsx', 'r') as f:
    content = f.read()

# Add state variables
state_old = "const [confirmDelete, setConfirmDelete] = useState<{type: 'project' | 'cert', id: string, name: string} | null>(null);"
state_new = "const [confirmDelete, setConfirmDelete] = useState<{type: 'project' | 'cert', id: string, name: string} | null>(null);\n  const [isAddingProject, setIsAddingProject] = useState(false);\n  const [isAddingCert, setIsAddingCert] = useState(false);"
content = content.replace(state_old, state_new)

# Modify saveProject to handle creating
save_proj_old = """
  async function saveProject(project: ProjectRow) {
    setSaving(project.id);
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      if (res.ok) {
        const updated = await res.json();
        setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
        setEditingProject(null);
      }
    } finally {
      setSaving(null);
    }
  }
"""
save_proj_new = """
  async function saveProject(project: Partial<ProjectRow>) {
    setSaving(project.id || 'new');
    const isNew = !project.id;
    try {
      const res = await fetch('/api/admin/projects', {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      if (res.ok) {
        const updated = await res.json();
        if (isNew) {
          setProjects(prev => [...prev, updated].sort((a, b) => a.sort_order - b.sort_order));
        } else {
          setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
        }
        setEditingProject(null);
        setIsAddingProject(false);
      }
    } finally {
      setSaving(null);
    }
  }
"""
content = content.replace(save_proj_old.strip(), save_proj_new.strip())

# Modify saveCert to handle creating
save_cert_old = """
  async function saveCert(cert: CertificateRow) {
    setSaving(cert.id);
    try {
      const res = await fetch('/api/admin/certificates', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cert),
      });
      if (res.ok) {
        const updated = await res.json();
        setCertificates(prev => prev.map(c => c.id === updated.id ? updated : c));
        setEditingCert(null);
      }
    } finally {
      setSaving(null);
    }
  }
"""
save_cert_new = """
  async function saveCert(cert: Partial<CertificateRow>) {
    setSaving(cert.id || 'new');
    const isNew = !cert.id;
    try {
      const res = await fetch('/api/admin/certificates', {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cert),
      });
      if (res.ok) {
        const updated = await res.json();
        if (isNew) {
          setCertificates(prev => [...prev, updated].sort((a, b) => a.sort_order - b.sort_order));
        } else {
          setCertificates(prev => prev.map(c => c.id === updated.id ? updated : c));
        }
        setEditingCert(null);
        setIsAddingCert(false);
      }
    } finally {
      setSaving(null);
    }
  }
"""
content = content.replace(save_cert_old.strip(), save_cert_new.strip())

# Add new buttons for Add Project / Add Cert
proj_tab_old = "{tab === 'projects' && (\n          <div className=\"space-y-4\">"
proj_tab_new = """{tab === 'projects' && (
          <div className="space-y-4">
            <div className="flex justify-end mb-4">
              <button onClick={() => {
                setIsAddingProject(true);
                setEditingProject({ name: '', subtitle: '', tag: '', category: '', sort_order: projects.length + 1, github_url: '', demo_url: '', description: '', highlights: [], technologies: [], visible: true } as any);
              }} className="px-4 py-2 text-sm bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded hover:bg-emerald-500/20 transition-colors">
                + Add New Project
              </button>
            </div>"""
content = content.replace(proj_tab_old, proj_tab_new)

cert_tab_old = "{tab === 'certificates' && (\n          <div className=\"space-y-4\">"
cert_tab_new = """{tab === 'certificates' && (
          <div className="space-y-4">
            <div className="flex justify-end mb-4">
              <button onClick={() => {
                setIsAddingCert(true);
                setEditingCert({ title: '', issuer: '', issue_date: '', tag: '', credential_id: '', image_path: '', sort_order: certificates.length + 1, description: '', skills: [], visible: true } as any);
              }} className="px-4 py-2 text-sm bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded hover:bg-emerald-500/20 transition-colors">
                + Add New Certificate
              </button>
            </div>"""
content = content.replace(cert_tab_old, cert_tab_new)


# Change Modal headers to conditional Add/Edit
content = content.replace('<h2 className="font-semibold mb-4">Edit Project</h2>', '<h2 className="font-semibold mb-4">{isAddingProject ? "Add New Project" : "Edit Project"}</h2>')
content = content.replace('<h2 className="font-semibold mb-4">Edit Certificate</h2>', '<h2 className="font-semibold mb-4">{isAddingCert ? "Add New Certificate" : "Edit Certificate"}</h2>')

# Change Modal cancel button to clear isAdding
content = content.replace('onClick={() => setEditingProject(null)}', 'onClick={() => { setEditingProject(null); setIsAddingProject(false); }}')
content = content.replace('onClick={() => setEditingCert(null)}', 'onClick={() => { setEditingCert(null); setIsAddingCert(false); }}')


with open('app/admin/page.tsx', 'w') as f:
    f.write(content)
