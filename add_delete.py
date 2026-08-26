import re

with open('app/admin/page.tsx', 'r') as f:
    content = f.read()

# Add delete functions
delete_funcs = """
  async function deleteProject(id: string) {
    if (!confirm('Are you sure you want to delete this project permanently?')) return;
    setSaving(id);
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(prev => prev.filter(p => p.id !== id));
      }
    } finally {
      setSaving(null);
    }
  }

  async function deleteCert(id: string) {
    if (!confirm('Are you sure you want to delete this certificate permanently?')) return;
    setSaving(id);
    try {
      const res = await fetch(`/api/admin/certificates?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCertificates(prev => prev.filter(c => c.id !== id));
      }
    } finally {
      setSaving(null);
    }
  }
"""

content = content.replace("async function saveProfile", f"{delete_funcs}\n  async function saveProfile")

# Add delete buttons to project cards
proj_btns_old = """
                  <button onClick={() => setEditingProject({...p})} className="px-3 py-1.5 text-xs bg-white text-black rounded hover:bg-neutral-200">
                    Edit
                  </button>
"""
proj_btns_new = """
                  <button onClick={() => setEditingProject({...p})} className="px-3 py-1.5 text-xs bg-white text-black rounded hover:bg-neutral-200">
                    Edit
                  </button>
                  <button onClick={() => deleteProject(p.id)} disabled={saving === p.id} className="px-3 py-1.5 text-xs bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 disabled:opacity-50">
                    Delete
                  </button>
"""
content = content.replace(proj_btns_old.strip(), proj_btns_new.strip())

# Add delete buttons to cert cards
cert_btns_old = """
                  <button onClick={() => setEditingCert({...c})} className="px-3 py-1.5 text-xs bg-white text-black rounded hover:bg-neutral-200">
                    Edit
                  </button>
"""
cert_btns_new = """
                  <button onClick={() => setEditingCert({...c})} className="px-3 py-1.5 text-xs bg-white text-black rounded hover:bg-neutral-200">
                    Edit
                  </button>
                  <button onClick={() => deleteCert(c.id)} disabled={saving === c.id} className="px-3 py-1.5 text-xs bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 disabled:opacity-50">
                    Delete
                  </button>
"""
content = content.replace(cert_btns_old.strip(), cert_btns_new.strip())


with open('app/admin/page.tsx', 'w') as f:
    f.write(content)
