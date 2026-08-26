import re

with open('app/admin/page.tsx', 'r') as f:
    content = f.read()

# Fix Project Modal
project_modal_old = """
              {['name', 'subtitle', 'tag', 'grade', 'category', 'sort_order', 'github_url', 'demo_url'].map(field => (
                <div key={field}>
                  <label className="block text-xs text-neutral-500 mb-1">{field}</label>
                  <input type="text" value={(editingProject as any)[field] || ''} onChange={e => setEditingProject({...editingProject, [field]: field === 'sort_order' ? parseInt(e.target.value) || 0 : e.target.value})} className="w-full px-3 py-2 bg-neutral-800 rounded border border-neutral-700 text-sm" />
                </div>
              ))}
              <div className="col-span-2 flex justify-end gap-2 mt-4">
"""
project_modal_new = """
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
                <textarea rows={3} value={(editingProject.highlights || []).join('\\n')} onChange={e => setEditingProject({...editingProject, highlights: e.target.value.split('\\n').filter(Boolean)})} className="w-full px-3 py-2 bg-neutral-800 rounded border border-neutral-700 text-sm" />
              </div>

              <div className="col-span-2">
                <label className="block text-xs text-neutral-500 mb-1">technologies (comma separated)</label>
                <textarea rows={2} value={(editingProject.technologies || []).join(', ')} onChange={e => setEditingProject({...editingProject, technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} className="w-full px-3 py-2 bg-neutral-800 rounded border border-neutral-700 text-sm" />
              </div>

              <div className="col-span-2 flex justify-end gap-2 mt-4">
"""
content = content.replace(project_modal_old.strip(), project_modal_new.strip())

# Fix Certificate Modal
cert_modal_old = """
              {['title', 'issuer', 'issue_date', 'tag', 'credential_id', 'image_path', 'sort_order'].map(field => (
                <div key={field}>
                  <label className="block text-xs text-neutral-500 mb-1">{field}</label>
                  <input type="text" value={(editingCert as any)[field] || ''} onChange={e => setEditingCert({...editingCert, [field]: field === 'sort_order' ? parseInt(e.target.value) || 0 : e.target.value})} className="w-full px-3 py-2 bg-neutral-800 rounded border border-neutral-700 text-sm" />
                </div>
              ))}
              <div className="col-span-2 flex justify-end gap-2 mt-4">
"""
cert_modal_new = """
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
"""
content = content.replace(cert_modal_old.strip(), cert_modal_new.strip())

with open('app/admin/page.tsx', 'w') as f:
    f.write(content)
