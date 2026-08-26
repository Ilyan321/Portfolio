import re

with open('app/admin/page.tsx', 'r') as f:
    content = f.read()

# Add CertificateRow import
content = content.replace("import type { ProjectRow, ProfileRow } from '@/lib/types';", "import type { ProjectRow, ProfileRow, CertificateRow } from '@/lib/types';")

# Add state
content = content.replace("const [tab, setTab] = useState<'projects' | 'profile'>('projects');", "const [tab, setTab] = useState<'projects' | 'certificates' | 'profile'>('projects');")
content = content.replace("const [projects, setProjects] = useState<ProjectRow[]>([]);", "const [projects, setProjects] = useState<ProjectRow[]>([]);\n  const [certificates, setCertificates] = useState<CertificateRow[]>([]);\n  const [editingCert, setEditingCert] = useState<CertificateRow | null>(null);")

# Update fetch
content = content.replace("fetch('/api/admin/projects'),", "fetch('/api/admin/projects'),\n        fetch('/api/admin/certificates'),")
content = content.replace("const [projRes, profRes] = await Promise.all([", "const [projRes, certRes, profRes] = await Promise.all([")
content = content.replace("setProjects(await projRes.json());", "setProjects(await projRes.json());\n      setCertificates(await certRes.json());")

# Add toggleCertVisibility and saveCert functions
cert_funcs = """
  async function toggleCertVisibility(cert: CertificateRow) {
    setSaving(cert.id);
    try {
      const res = await fetch('/api/admin/certificates', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cert.id, visible: !cert.visible }),
      });
      if (res.ok) {
        setCertificates(prev => prev.map(c => c.id === cert.id ? { ...c, visible: !c.visible } : c));
      }
    } finally {
      setSaving(null);
    }
  }

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
content = content.replace("async function saveProfile", f"{cert_funcs}\n  async function saveProfile")

# Add Certificates tab button
content = content.replace("<button onClick={() => setTab('projects')}", "<button onClick={() => setTab('projects')}")
content = content.replace("<button onClick={() => setTab('profile')}", "<button onClick={() => setTab('certificates')} className={`px-4 py-2 text-sm rounded ${tab === 'certificates' ? 'bg-white text-black' : 'text-neutral-400'}`}>Certificates</button>\n          <button onClick={() => setTab('profile')}")

# Add Certificates tab content
certs_tab = """
        {tab === 'certificates' && (
          <div className="space-y-4">
            {certificates.map(c => (
              <div key={c.id} className={`p-4 rounded-xl border ${c.visible ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-800/50 bg-neutral-900/30'} flex justify-between items-center`}>
                <div className="flex items-center gap-4">
                  <img src={c.image_path} alt={c.title} className="w-12 h-12 rounded object-cover border border-neutral-800" />
                  <div>
                    <h3 className="font-semibold">{c.title} <span className="text-xs font-mono text-neutral-500 ml-2">#{c.sort_order}</span> {!c.visible && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded ml-2">HIDDEN</span>}</h3>
                    <p className="text-xs text-neutral-400">{c.issuer} &bull; {c.issue_date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleCertVisibility(c)} disabled={saving === c.id} className="px-3 py-1.5 text-xs border border-neutral-700 rounded hover:bg-neutral-800 disabled:opacity-50">
                    {c.visible ? 'Hide' : 'Show'}
                  </button>
                  <button onClick={() => setEditingCert({...c})} className="px-3 py-1.5 text-xs bg-white text-black rounded hover:bg-neutral-200">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
"""
content = content.replace("{tab === 'profile' && profile && (", f"{certs_tab}\n        {{tab === 'profile' && profile && (")

# Add Certificates Edit Modal
cert_modal = """
      {editingCert && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111] border border-neutral-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="font-semibold mb-4">Edit Certificate</h2>
            <div className="grid grid-cols-2 gap-4">
              {['title', 'issuer', 'issue_date', 'tag', 'credential_id', 'image_path', 'sort_order'].map(field => (
                <div key={field}>
                  <label className="block text-xs text-neutral-500 mb-1">{field}</label>
                  <input type="text" value={(editingCert as any)[field] || ''} onChange={e => setEditingCert({...editingCert, [field]: field === 'sort_order' ? parseInt(e.target.value) || 0 : e.target.value})} className="w-full px-3 py-2 bg-neutral-800 rounded border border-neutral-700 text-sm" />
                </div>
              ))}
              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <button onClick={() => setEditingCert(null)} className="px-4 py-2 text-sm border border-neutral-700 rounded hover:bg-neutral-800">Cancel</button>
                <button onClick={() => saveCert(editingCert)} disabled={saving === editingCert.id} className="px-4 py-2 text-sm bg-white text-black rounded hover:bg-neutral-200">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
"""
content = content.replace("    </div>\n  );\n}", f"{cert_modal}    </div>\n  );\n}}")

with open('app/admin/page.tsx', 'w') as f:
    f.write(content)
