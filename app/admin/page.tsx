'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { ProjectRow, ProfileRow, CertificateRow } from '@/lib/types';

export default function AdminDashboard() {
  const [tab, setTab] = useState<'welcome' | 'projects' | 'certificates' | 'profile'>('welcome');
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [certificates, setCertificates] = useState<CertificateRow[]>([]);
  const [editingCert, setEditingCert] = useState<CertificateRow | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectRow | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [projRes, certRes, profRes] = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/certificates'),
        fetch('/api/admin/profile'),
      ]);

      if (projRes.status === 401 || profRes.status === 401) {
        router.push('/admin/login');
        return;
      }

      setProjects(await projRes.json());
      setCertificates(await certRes.json());
      setProfile(await profRes.json());
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function toggleVisibility(project: ProjectRow) {
    setSaving(project.id);
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: project.id, visible: !project.visible }),
      });
      if (res.ok) {
        setProjects(prev => prev.map(p => p.id === project.id ? { ...p, visible: !p.visible } : p));
      }
    } finally {
      setSaving(null);
    }
  }

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

  async function saveProfile(prof: ProfileRow) {
    setSaving('profile');
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prof),
      });
      if (res.ok) {
        setProfile(await res.json());
        setEditingProfile(false);
      }
    } finally {
      setSaving(null);
    }
  }

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-neutral-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-neutral-800 px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold">Portfolio Admin</h1>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <button onClick={() => setTab('welcome')} className={`px-4 py-2 text-sm rounded ${tab === 'welcome' ? 'bg-white text-black' : 'text-neutral-400'}`}>Home</button>
          <button onClick={() => setTab('projects')} className={`px-4 py-2 text-sm rounded ${tab === 'projects' ? 'bg-white text-black' : 'text-neutral-400'}`}>Projects</button>
          <button onClick={() => setTab('certificates')} className={`px-4 py-2 text-sm rounded ${tab === 'certificates' ? 'bg-white text-black' : 'text-neutral-400'}`}>Certificates</button>
          <button onClick={() => setTab('profile')} className={`px-4 py-2 text-sm rounded ${tab === 'profile' ? 'bg-white text-black' : 'text-neutral-400'}`}>Profile</button>
          <button onClick={() => fetch('/api/auth/logout', { method: 'POST' }).then(() => router.push('/'))} className="px-4 py-2 text-sm text-red-400">Logout</button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        {tab === 'welcome' && (
          <div className="space-y-6">
            <div className="p-8 md:p-12 rounded-2xl bg-[#1A1918] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <span className="text-[10px] font-mono-code uppercase tracking-widest text-emerald-400/80 mb-4 block">
                ADMINISTRATION LAYER
              </span>
              <h2 className="text-3xl md:text-5xl font-serif-display text-[#F3EFEA] mb-2 tracking-tight">
                Welcome back, {profile?.name?.split(' ')[0] || 'Admin'}.
              </h2>
              <p className="text-sm font-sans-clean text-[#78746D] max-w-lg mb-8">
                Your portfolio backend is online and securely authenticated. 
                Use this portal to manage your showcased work, update credentials, and tailor your digital presence.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div onClick={() => setTab('projects')} className="p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/card">
                  <div className="text-[10px] font-mono-code text-[#78746D] mb-1 group-hover/card:text-[#F3EFEA] transition-colors">TOTAL PROJECTS</div>
                  <div className="text-3xl font-serif-display text-[#F3EFEA]">{projects.length}</div>
                </div>
                <div onClick={() => setTab('certificates')} className="p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/card">
                  <div className="text-[10px] font-mono-code text-[#78746D] mb-1 group-hover/card:text-[#F3EFEA] transition-colors">CERTIFICATES</div>
                  <div className="text-3xl font-serif-display text-[#F3EFEA]">{certificates.length}</div>
                </div>
                <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors cursor-pointer group/card flex flex-col justify-center items-center">
                  <div className="text-[10px] font-mono-code text-emerald-400 mb-1 group-hover/card:text-emerald-300 transition-colors">SYSTEM STATUS</div>
                  <div className="text-sm font-sans-clean text-emerald-500 font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> ONLINE
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'projects' && (
          <div className="space-y-4">
            {projects.map(p => (
              <div key={p.id} className={`p-4 rounded-xl border ${p.visible ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-800/50 bg-neutral-900/30'} flex justify-between items-center`}>
                <div>
                  <h3 className="font-semibold">
                    {p.name} 
                    <span className="text-xs font-mono-code text-neutral-500 ml-2">#{p.sort_order}</span>
                    {p.visible ? (
                      <span className="text-[10px] font-mono-code tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded ml-2 uppercase">Visible</span>
                    ) : (
                      <span className="text-[10px] font-mono-code tracking-wider bg-red-500/20 text-red-400 px-2 py-1 rounded ml-2 uppercase">Hidden</span>
                    )}
                  </h3>
                  <p className="text-xs text-neutral-400">{p.subtitle}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleVisibility(p)} disabled={saving === p.id} className="px-3 py-1.5 text-xs border border-neutral-700 rounded hover:bg-neutral-800 disabled:opacity-50">
                    {p.visible ? 'Hide' : 'Show'}
                  </button>
                  <button onClick={() => setEditingProject({...p})} className="px-3 py-1.5 text-xs bg-white text-black rounded hover:bg-neutral-200">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        
        {tab === 'certificates' && (
          <div className="space-y-4">
            {certificates.map(c => (
              <div key={c.id} className={`p-4 rounded-xl border ${c.visible ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-800/50 bg-neutral-900/30'} flex justify-between items-center`}>
                <div className="flex items-center gap-4">
                  <img src={c.image_path} alt={c.title} className="w-12 h-12 rounded object-cover border border-neutral-800" />
                  <div>
                    <h3 className="font-semibold">
                      {c.title} 
                      <span className="text-xs font-mono-code text-neutral-500 ml-2">#{c.sort_order}</span>
                      {c.visible ? (
                        <span className="text-[10px] font-mono-code tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded ml-2 uppercase">Visible</span>
                      ) : (
                        <span className="text-[10px] font-mono-code tracking-wider bg-red-500/20 text-red-400 px-2 py-1 rounded ml-2 uppercase">Hidden</span>
                      )}
                    </h3>
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

        {tab === 'profile' && profile && (
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold">Profile Settings</h2>
              {editingProfile ? (
                <div className="flex gap-2">
                  <button onClick={() => setEditingProfile(false)} className="px-3 py-1.5 text-xs border border-neutral-700 rounded">Cancel</button>
                  <button onClick={() => saveProfile(profile)} disabled={saving === 'profile'} className="px-3 py-1.5 text-xs bg-white text-black rounded">Save</button>
                </div>
              ) : (
                <button onClick={() => setEditingProfile(true)} className="px-3 py-1.5 text-xs bg-white text-black rounded">Edit</button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {['name', 'title', 'email', 'whatsapp', 'location', 'github_url', 'linkedin_url', 'huggingface_url'].map(field => (
                <div key={field}>
                  <label className="block text-xs text-neutral-500 mb-1">{field}</label>
                  {editingProfile ? (
                    <input type="text" value={(profile as any)[field] || ''} onChange={e => setProfile({...profile, [field]: e.target.value})} className="w-full px-3 py-2 bg-neutral-800 rounded border border-neutral-700 text-sm" />
                  ) : (
                    <div className="text-sm">{(profile as any)[field] || '—'}</div>
                  )}
                </div>
              ))}
              <div className="col-span-2">
                <label className="block text-xs text-neutral-500 mb-1">bio</label>
                {editingProfile ? (
                  <textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} className="w-full px-3 py-2 bg-neutral-800 rounded border border-neutral-700 text-sm" rows={3} />
                ) : (
                  <div className="text-sm">{profile.bio}</div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {editingProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-neutral-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="font-semibold mb-4">Edit Project</h2>
            <div className="grid grid-cols-2 gap-4">
              {['name', 'subtitle', 'tag', 'grade', 'category', 'sort_order', 'github_url', 'demo_url'].map(field => (
                <div key={field}>
                  <label className="block text-xs text-neutral-500 mb-1">{field}</label>
                  <input type="text" value={(editingProject as any)[field] || ''} onChange={e => setEditingProject({...editingProject, [field]: field === 'sort_order' ? parseInt(e.target.value) || 0 : e.target.value})} className="w-full px-3 py-2 bg-neutral-800 rounded border border-neutral-700 text-sm" />
                </div>
              ))}
              
              <div className="col-span-2">
                <label className="block text-xs text-neutral-500 mb-1">description</label>
                <textarea rows={4} value={editingProject.description || ''} onChange={e => setEditingProject({...editingProject, description: e.target.value})} className="w-full px-3 py-2 bg-neutral-800 rounded border border-neutral-700 text-sm" />
              </div>
              
              <div className="col-span-2">
                <label className="block text-xs text-neutral-500 mb-1">highlights (one per line)</label>
                <textarea rows={3} value={(editingProject.highlights || []).join('\n')} onChange={e => setEditingProject({...editingProject, highlights: e.target.value.split('\n').filter(Boolean)})} className="w-full px-3 py-2 bg-neutral-800 rounded border border-neutral-700 text-sm" />
              </div>

              <div className="col-span-2">
                <label className="block text-xs text-neutral-500 mb-1">technologies (comma separated)</label>
                <textarea rows={2} value={(editingProject.technologies || []).join(', ')} onChange={e => setEditingProject({...editingProject, technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} className="w-full px-3 py-2 bg-neutral-800 rounded border border-neutral-700 text-sm" />
              </div>

              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <button onClick={() => setEditingProject(null)} className="px-4 py-2 text-sm border border-neutral-700 rounded hover:bg-neutral-800">Cancel</button>
                <button onClick={() => saveProject(editingProject)} disabled={saving === editingProject.id} className="px-4 py-2 text-sm bg-white text-black rounded hover:bg-neutral-200">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

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
              
              <div className="col-span-2">
                <label className="block text-xs text-neutral-500 mb-1">description</label>
                <textarea rows={4} value={editingCert.description || ''} onChange={e => setEditingCert({...editingCert, description: e.target.value})} className="w-full px-3 py-2 bg-neutral-800 rounded border border-neutral-700 text-sm" />
              </div>

              <div className="col-span-2">
                <label className="block text-xs text-neutral-500 mb-1">skills (comma separated)</label>
                <textarea rows={2} value={(editingCert.skills || []).join(', ')} onChange={e => setEditingCert({...editingCert, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} className="w-full px-3 py-2 bg-neutral-800 rounded border border-neutral-700 text-sm" />
              </div>

              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <button onClick={() => setEditingCert(null)} className="px-4 py-2 text-sm border border-neutral-700 rounded hover:bg-neutral-800">Cancel</button>
                <button onClick={() => saveCert(editingCert)} disabled={saving === editingCert.id} className="px-4 py-2 text-sm bg-white text-black rounded hover:bg-neutral-200">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
