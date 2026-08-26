import re

with open('app/admin/page.tsx', 'r') as f:
    content = f.read()

# Add confirmDelete state
state_old = "const [editingCert, setEditingCert] = useState<CertificateRow | null>(null);"
state_new = "const [editingCert, setEditingCert] = useState<CertificateRow | null>(null);\n  const [confirmDelete, setConfirmDelete] = useState<{type: 'project' | 'cert', id: string, name: string} | null>(null);"
content = content.replace(state_old, state_new)

# Update deleteProject
delete_project_old = """
  async function deleteProject(id: string) {
    if (!confirm('Are you sure you want to delete this project permanently?')) return;
    setSaving(id);
"""
delete_project_new = """
  async function deleteProject(id: string) {
    setSaving(id);
"""
content = content.replace(delete_project_old.strip(), delete_project_new.strip())

# Update deleteCert
delete_cert_old = """
  async function deleteCert(id: string) {
    if (!confirm('Are you sure you want to delete this certificate permanently?')) return;
    setSaving(id);
"""
delete_cert_new = """
  async function deleteCert(id: string) {
    setSaving(id);
"""
content = content.replace(delete_cert_old.strip(), delete_cert_new.strip())

# Update Delete buttons to trigger modal instead of function directly
btn_proj_old = "onClick={() => deleteProject(p.id)}"
btn_proj_new = "onClick={() => setConfirmDelete({ type: 'project', id: p.id, name: p.name })}"
content = content.replace(btn_proj_old, btn_proj_new)

btn_cert_old = "onClick={() => deleteCert(c.id)}"
btn_cert_new = "onClick={() => setConfirmDelete({ type: 'cert', id: c.id, name: c.title })}"
content = content.replace(btn_cert_old, btn_cert_new)

# Add Confirmation Modal JSX at the end, right before the last closing div
confirm_modal = """
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
"""
content = content.replace("    </div>\n  );\n}", f"{confirm_modal}    </div>\n  );\n}}")

with open('app/admin/page.tsx', 'w') as f:
    f.write(content)
