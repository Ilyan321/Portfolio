'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { ProjectRow, ProfileRow, CertificateRow } from '@/lib/types';

export default function AdminDashboard() {
  const [tab, setTab] = useState<'welcome' | 'projects' | 'certificates' | 'profile'>('welcome');
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [certificates, setCertificates] = useState<CertificateRow[]>([]);
  const [editingCert, setEditingCert] = useState<CertificateRow | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{type: 'project' | 'cert', id: string, name: string} | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isAddingCert, setIsAddingCert] = useState(false);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectRow | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
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
    }
    fetchData();
  }, [router]);

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

  async function saveProject(project: Partial<ProjectRow>) {
    setSaving(project.id || 'new');
    const isNew = !project.id;
    
    const payload = { ...project };
    if (typeof payload.architecture === 'string') {
      payload.architecture = (payload.architecture as unknown as string).split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    }
    if (typeof payload.tech_stack === 'string') {
      payload.tech_stack = (payload.tech_stack as unknown as string).split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    }

    try {
      const res = await fetch('/api/admin/projects', {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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

  async function saveCert(cert: Partial<CertificateRow>) {
    setSaving(cert.id || 'new');
    const isNew = !cert.id;
    
    const payload = { ...cert };
    if (typeof payload.skills === 'string') {
      payload.skills = (payload.skills as unknown as string).split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    }

    try {
      const res = await fetch('/api/admin/certificates', {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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

  
  async function deleteProject(id: string) {
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

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#78746D]">Loading...</div>;

  return (
    <main className="min-h-screen w-full bg-[#1A1918] lg:p-5 flex items-center justify-center font-sans-clean overflow-hidden">
      <div className="w-full max-w-6xl h-screen lg:h-[96vh] bg-[#262523] lg:rounded-[2rem] p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/[0.06] flex flex-col relative">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-[rgba(243,239,234,0.1)] gap-4 shrink-0">
          <div>
            <span className="font-mono-code text-xs font-semibold tracking-widest text-[#F3EFEA] uppercase">
              DEV / ADMIN
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 w-full sm:w-auto">
            <button onClick={() => setTab('welcome')} className={`px-4 py-1.5 text-xs font-mono-code uppercase tracking-wider rounded-full transition-all ${tab === 'welcome' ? 'bg-[#DFD5C6] text-[#1A1918]' : 'bg-[rgba(243,239,234,0.05)] text-[#78746D] hover:text-[#F3EFEA]'}`}>Home</button>
            <button onClick={() => setTab('projects')} className={`px-4 py-1.5 text-xs font-mono-code uppercase tracking-wider rounded-full transition-all ${tab === 'projects' ? 'bg-[#DFD5C6] text-[#1A1918]' : 'bg-[rgba(243,239,234,0.05)] text-[#78746D] hover:text-[#F3EFEA]'}`}>Projects</button>
            <button onClick={() => setTab('certificates')} className={`px-4 py-1.5 text-xs font-mono-code uppercase tracking-wider rounded-full transition-all ${tab === 'certificates' ? 'bg-[#DFD5C6] text-[#1A1918]' : 'bg-[rgba(243,239,234,0.05)] text-[#78746D] hover:text-[#F3EFEA]'}`}>Certificates</button>
            <button onClick={() => setTab('profile')} className={`px-4 py-1.5 text-xs font-mono-code uppercase tracking-wider rounded-full transition-all ${tab === 'profile' ? 'bg-[#DFD5C6] text-[#1A1918]' : 'bg-[rgba(243,239,234,0.05)] text-[#78746D] hover:text-[#F3EFEA]'}`}>Profile</button>
            <button onClick={() => fetch('/api/auth/logout', { method: 'POST' }).then(() => router.push('/'))} className="px-4 py-1.5 text-xs font-mono-code uppercase tracking-wider rounded-full bg-red-950/30 text-red-400 hover:bg-red-900/50 transition-all">Logout</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto mt-6 no-scrollbar">
        {tab === 'welcome' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-2 border-b border-[rgba(243,239,234,0.1)] pb-8">
              <h2 className="text-4xl sm:text-5xl font-serif-display text-[#F3EFEA] tracking-tight">
                Welcome, {profile?.name?.split(' ')[0] || 'Ilyan'}.
              </h2>
              <p className="text-sm font-sans-clean text-[#78746D] max-w-xl leading-relaxed">
                This is your private workspace. From here, you can manage the visibility of your projects, update your professional credentials, and refine your public profile details. Changes made here will instantly reflect on your live portfolio.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setTab('projects')} 
                className="group p-6 rounded-2xl bg-[#1A1918] border border-[rgba(255,255,255,0.05)] hover:border-[#78746D]/30 transition-all cursor-pointer flex flex-col justify-between min-h-[160px]"
              >
                <div>
                  <div className="text-[10px] font-mono-code text-[#78746D] uppercase tracking-widest mb-4 group-hover:text-[#F3EFEA] transition-colors">
                    Projects Overview
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-serif-display text-[#F3EFEA]">{projects.length}</span>
                    <span className="text-xs font-sans-clean text-[#78746D]">Total Items</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-mono-code pt-4 border-t border-[rgba(255,255,255,0.05)] mt-4">
                  <span className="text-emerald-500/80">{projects.filter(p => p.visible).length} Visible</span>
                  <span className="text-red-400/80">{projects.filter(p => !p.visible).length} Hidden</span>
                </div>
              </div>

              <div 
                onClick={() => setTab('certificates')} 
                className="group p-6 rounded-2xl bg-[#1A1918] border border-[rgba(255,255,255,0.05)] hover:border-[#78746D]/30 transition-all cursor-pointer flex flex-col justify-between min-h-[160px]"
              >
                <div>
                  <div className="text-[10px] font-mono-code text-[#78746D] uppercase tracking-widest mb-4 group-hover:text-[#F3EFEA] transition-colors">
                    Credentials Overview
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-serif-display text-[#F3EFEA]">{certificates.length}</span>
                    <span className="text-xs font-sans-clean text-[#78746D]">Total Items</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-mono-code pt-4 border-t border-[rgba(255,255,255,0.05)] mt-4">
                  <span className="text-emerald-500/80">{certificates.filter(c => c.visible).length} Visible</span>
                  <span className="text-red-400/80">{certificates.filter(c => !c.visible).length} Hidden</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'projects' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-[rgba(243,239,234,0.1)] gap-4">
              <div>
                <h2 className="font-serif-display text-2xl sm:text-3xl text-[#F3EFEA] tracking-tight">Projects Directory</h2>
                <p className="text-[11px] sm:text-xs font-mono-code text-[#78746D] mt-1 uppercase tracking-wider">Manage flagship engineering projects.</p>
              </div>
              <button onClick={() => {
                setIsAddingProject(true);
                setEditingProject({ name: '', subtitle: '', tag: '', category: '', sort_order: projects.length + 1, github_url: '', demo_url: '', hugging_face_url: '', elevator_pitch: '', challenge: '', architecture: [], tech_stack: [], highlights: [], visible: true } as any);
              }} className="px-4 py-2 text-sm bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded hover:bg-emerald-500/20 transition-colors">
                + Add New Project
              </button>
            </div>
            {projects.map(p => (
              <div key={p.id} className={`p-4 rounded-xl border ${p.visible ? 'border-[rgba(243,239,234,0.1)] bg-[#1A1918]' : 'border-[rgba(243,239,234,0.1)]/50 bg-[#1A1918]/30'} flex justify-between items-center`}>
                <div>
                  <h3 className="font-semibold">
                    {p.name} 
                    <span className="text-xs font-mono-code text-[#78746D] ml-2">#{p.sort_order}</span>
                    {p.visible ? (
                      <span className="text-[10px] font-mono-code tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded ml-2 uppercase">Visible</span>
                    ) : (
                      <span className="text-[10px] font-mono-code tracking-wider bg-red-500/20 text-red-400 px-2 py-1 rounded ml-2 uppercase">Hidden</span>
                    )}
                  </h3>
                  <p className="text-xs text-neutral-400">{p.subtitle}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleVisibility(p)} disabled={saving === p.id} className="px-3 py-1.5 text-xs border border-[rgba(243,239,234,0.1)] rounded hover:bg-[#1A1918] focus:border-[#DFD5C6] focus:ring-1 focus:ring-[#DFD5C6] transition-all outline-none disabled:opacity-50">
                    {p.visible ? 'Hide' : 'Show'}
                  </button>
                  <button onClick={() => setEditingProject({...p})} className="px-3 py-1.5 text-xs bg-[#DFD5C6] text-[#1A1918] font-semibold hover:bg-[#F3EFEA] rounded hover:bg-neutral-200">
                    Edit
                  </button>
                  <button onClick={() => setConfirmDelete({ type: 'project', id: p.id, name: p.name })} disabled={saving === p.id} className="px-3 py-1.5 text-xs bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 disabled:opacity-50">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        
        {tab === 'certificates' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-[rgba(243,239,234,0.1)] gap-4">
              <div>
                <h2 className="font-serif-display text-2xl sm:text-3xl text-[#F3EFEA] tracking-tight">Certificates & Credentials</h2>
                <p className="text-[11px] sm:text-xs font-mono-code text-[#78746D] mt-1 uppercase tracking-wider">Manage verified academic achievements.</p>
              </div>
              <button onClick={() => {
                setIsAddingCert(true);
                setEditingCert({ title: '', issuer: '', issue_date: '', tag: '', credential_id: '', image_path: '', sort_order: certificates.length + 1, description: '', skills: [], visible: true } as any);
              }} className="px-4 py-2 text-sm bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded hover:bg-emerald-500/20 transition-colors">
                + Add New Certificate
              </button>
            </div>
            {certificates.map(c => (
              <div key={c.id} className={`p-4 rounded-xl border ${c.visible ? 'border-[rgba(243,239,234,0.1)] bg-[#1A1918]' : 'border-[rgba(243,239,234,0.1)]/50 bg-[#1A1918]/30'} flex justify-between items-center`}>
                <div className="flex items-center gap-4">
                  {c.image_path ? (
                    <img src={c.image_path} alt={c.title} className="w-12 h-12 rounded object-cover border border-[rgba(243,239,234,0.1)]" />
                  ) : (
                    <div className="w-12 h-12 rounded border border-[rgba(243,239,234,0.1)] bg-[#1A1918] focus:border-[#DFD5C6] focus:ring-1 focus:ring-[#DFD5C6] transition-all outline-none/50 flex items-center justify-center text-[8px] text-[#78746D] font-mono-code text-center leading-tight">NO IMG</div>
                  )}
                  <div>
                    <h3 className="font-semibold">
                      {c.title} 
                      <span className="text-xs font-mono-code text-[#78746D] ml-2">#{c.sort_order}</span>
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
                  <button onClick={() => toggleCertVisibility(c)} disabled={saving === c.id} className="px-3 py-1.5 text-xs border border-[rgba(243,239,234,0.1)] rounded hover:bg-[#1A1918] focus:border-[#DFD5C6] focus:ring-1 focus:ring-[#DFD5C6] transition-all outline-none disabled:opacity-50">
                    {c.visible ? 'Hide' : 'Show'}
                  </button>
                  <button onClick={() => setEditingCert({...c})} className="px-3 py-1.5 text-xs bg-[#DFD5C6] text-[#1A1918] font-semibold hover:bg-[#F3EFEA] rounded hover:bg-neutral-200">
                    Edit
                  </button>
                  <button onClick={() => setConfirmDelete({ type: 'cert', id: c.id, name: c.title })} disabled={saving === c.id} className="px-3 py-1.5 text-xs bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 disabled:opacity-50">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'profile' && profile && (
          <div className="p-6 rounded-xl border border-[rgba(243,239,234,0.1)] bg-[#1A1918]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold">Profile Settings</h2>
              {editingProfile ? (
                <div className="flex gap-2">
                  <button onClick={() => setEditingProfile(false)} className="px-3 py-1.5 text-xs border border-[rgba(243,239,234,0.1)] rounded">Cancel</button>
                  <button onClick={() => saveProfile(profile)} disabled={saving === 'profile'} className="px-3 py-1.5 text-xs bg-[#DFD5C6] text-[#1A1918] font-semibold hover:bg-[#F3EFEA] rounded">Save</button>
                </div>
              ) : (
                <button onClick={() => setEditingProfile(true)} className="px-3 py-1.5 text-xs bg-[#DFD5C6] text-[#1A1918] font-semibold hover:bg-[#F3EFEA] rounded">Edit</button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {['name', 'title', 'email', 'whatsapp', 'location', 'github_url', 'linkedin_url', 'huggingface_url'].map(field => (
                <div key={field}>
                  <label className="block text-xs text-[#78746D] mb-1">{field}</label>
                  {editingProfile ? (
                    <input type="text" value={(profile as any)[field] || ''} onChange={e => setProfile({...profile, [field]: e.target.value})} className="w-full px-3 py-2 bg-[#1A1918] focus:border-[#DFD5C6] focus:ring-1 focus:ring-[#DFD5C6] transition-all outline-none rounded border border-[rgba(243,239,234,0.1)] text-sm" />
                  ) : (
                    <div className="text-sm">{(profile as any)[field] || '—'}</div>
                  )}
                </div>
              ))}
              <div className="col-span-2">
                <label className="block text-xs text-[#78746D] mb-1">bio</label>
                {editingProfile ? (
                  <textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} className="w-full px-3 py-2 bg-[#1A1918] focus:border-[#DFD5C6] focus:ring-1 focus:ring-[#DFD5C6] transition-all outline-none rounded border border-[rgba(243,239,234,0.1)] text-sm" rows={3} />
                ) : (
                  <div className="text-sm">{profile.bio}</div>
                )}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

      {editingProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#262523] shadow-2xl border border-[rgba(243,239,234,0.1)] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-[#262523] z-10 p-6 pb-4 border-b border-[rgba(243,239,234,0.1)]/50 mb-4">
              <h2 className="font-serif-display text-2xl tracking-tight text-[#F3EFEA]">{isAddingProject ? "Add New Project" : "Edit Project"}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 px-6 pb-6">
              {['name', 'subtitle', 'tag', 'category', 'sort_order', 'github_url', 'demo_url', 'hugging_face_url'].map(field => (
                <div key={field}>
                  <label className="block text-xs text-[#78746D] mb-1">{field}</label>
                  <input type="text" value={(editingProject as any)[field] || ''} onChange={e => setEditingProject({...editingProject, [field]: field === 'sort_order' ? parseInt(e.target.value) || 0 : e.target.value})} className="w-full px-3 py-2 bg-[#1A1918] focus:border-[#DFD5C6] focus:ring-1 focus:ring-[#DFD5C6] transition-all outline-none rounded border border-[rgba(243,239,234,0.1)] text-sm" />
                </div>
              ))}
              
              <div className="col-span-2">
                <label className="block text-xs text-[#78746D] mb-1">elevator_pitch</label>
                <textarea rows={3} value={editingProject.elevator_pitch || ''} onChange={e => setEditingProject({...editingProject, elevator_pitch: e.target.value})} className="w-full px-3 py-2 bg-[#1A1918] focus:border-[#DFD5C6] focus:ring-1 focus:ring-[#DFD5C6] transition-all outline-none rounded border border-[rgba(243,239,234,0.1)] text-sm" />
              </div>

              <div className="col-span-2">
                <label className="block text-xs text-[#78746D] mb-1">challenge</label>
                <textarea rows={2} value={editingProject.challenge || ''} onChange={e => setEditingProject({...editingProject, challenge: e.target.value})} className="w-full px-3 py-2 bg-[#1A1918] focus:border-[#DFD5C6] focus:ring-1 focus:ring-[#DFD5C6] transition-all outline-none rounded border border-[rgba(243,239,234,0.1)] text-sm" />
              </div>

              <div className="col-span-2">
                <label className="block text-xs text-[#78746D] mb-1">architecture (comma or new-line separated)</label>
                <textarea rows={3} value={Array.isArray(editingProject.architecture) ? editingProject.architecture.join('\n') : editingProject.architecture} onChange={e => setEditingProject({...editingProject, architecture: e.target.value as any})} className="w-full px-3 py-2 bg-[#1A1918] focus:border-[#DFD5C6] focus:ring-1 focus:ring-[#DFD5C6] transition-all outline-none rounded border border-[rgba(243,239,234,0.1)] text-sm" />
              </div>

              <div className="col-span-2">
                <label className="block text-xs text-[#78746D] mb-1">tech_stack (comma or new-line separated)</label>
                <textarea rows={2} value={Array.isArray(editingProject.tech_stack) ? editingProject.tech_stack.join(', ') : editingProject.tech_stack} onChange={e => setEditingProject({...editingProject, tech_stack: e.target.value as any})} className="w-full px-3 py-2 bg-[#1A1918] focus:border-[#DFD5C6] focus:ring-1 focus:ring-[#DFD5C6] transition-all outline-none rounded border border-[rgba(243,239,234,0.1)] text-sm" />
              </div>

              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <button onClick={() => { setEditingProject(null); setIsAddingProject(false); }} className="px-4 py-2 text-sm border border-[rgba(243,239,234,0.1)] rounded hover:bg-[#1A1918] focus:border-[#DFD5C6] focus:ring-1 focus:ring-[#DFD5C6] transition-all outline-none">Cancel</button>
                <button onClick={() => saveProject(editingProject)} disabled={saving === editingProject.id} className="px-4 py-2 text-sm bg-[#DFD5C6] text-[#1A1918] font-semibold hover:bg-[#F3EFEA] rounded hover:bg-neutral-200">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingCert && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#262523] shadow-2xl border border-[rgba(243,239,234,0.1)] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-[#262523] z-10 p-6 pb-4 border-b border-[rgba(243,239,234,0.1)]/50 mb-4">
              <h2 className="font-serif-display text-2xl tracking-tight text-[#F3EFEA]">{isAddingCert ? "Add New Certificate" : "Edit Certificate"}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 px-6 pb-6">
              {['title', 'issuer', 'issue_date', 'tag', 'credential_id', 'image_path', 'sort_order'].map(field => (
                <div key={field}>
                  <label className="block text-xs text-[#78746D] mb-1">{field}</label>
                  <input type="text" value={(editingCert as any)[field] || ''} onChange={e => setEditingCert({...editingCert, [field]: field === 'sort_order' ? parseInt(e.target.value) || 0 : e.target.value})} className="w-full px-3 py-2 bg-[#1A1918] focus:border-[#DFD5C6] focus:ring-1 focus:ring-[#DFD5C6] transition-all outline-none rounded border border-[rgba(243,239,234,0.1)] text-sm" />
                </div>
              ))}
              
              <div className="col-span-2">
                <label className="block text-xs text-[#78746D] mb-1">description</label>
                <textarea rows={4} value={editingCert.description || ''} onChange={e => setEditingCert({...editingCert, description: e.target.value})} className="w-full px-3 py-2 bg-[#1A1918] focus:border-[#DFD5C6] focus:ring-1 focus:ring-[#DFD5C6] transition-all outline-none rounded border border-[rgba(243,239,234,0.1)] text-sm" />
              </div>

              <div className="col-span-2">
                <label className="block text-xs text-[#78746D] mb-1">skills (comma or new-line separated)</label>
                <textarea rows={2} value={Array.isArray(editingCert.skills) ? editingCert.skills.join(', ') : editingCert.skills} onChange={e => setEditingCert({...editingCert, skills: e.target.value as any})} className="w-full px-3 py-2 bg-[#1A1918] focus:border-[#DFD5C6] focus:ring-1 focus:ring-[#DFD5C6] transition-all outline-none rounded border border-[rgba(243,239,234,0.1)] text-sm" />
              </div>

              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <button onClick={() => { setEditingCert(null); setIsAddingCert(false); }} className="px-4 py-2 text-sm border border-[rgba(243,239,234,0.1)] rounded hover:bg-[#1A1918] focus:border-[#DFD5C6] focus:ring-1 focus:ring-[#DFD5C6] transition-all outline-none">Cancel</button>
                <button onClick={() => saveCert(editingCert)} disabled={saving === editingCert.id} className="px-4 py-2 text-sm bg-[#DFD5C6] text-[#1A1918] font-semibold hover:bg-[#F3EFEA] rounded hover:bg-neutral-200">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[60] animate-in fade-in duration-200">
          <div className="bg-[#1A1918] border border-red-500/20 rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="font-serif-display text-2xl text-[#F3EFEA] tracking-tight mb-2">Confirm Deletion</h2>
            <p className="text-sm font-sans-clean text-[#78746D] mb-6 leading-relaxed">
              Are you absolutely sure you want to permanently delete <strong className="text-[#F3EFEA] font-medium">{confirmDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setConfirmDelete(null)} 
                className="px-4 py-2 text-xs font-mono-code uppercase tracking-wider text-[#78746D] hover:text-[#F3EFEA] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (confirmDelete.type === 'project') deleteProject(confirmDelete.id);
                  else deleteCert(confirmDelete.id);
                  setConfirmDelete(null);
                }} 
                className="px-4 py-2 text-xs font-mono-code uppercase tracking-wider bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

