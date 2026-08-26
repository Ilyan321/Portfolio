import re

with open('app/admin/page.tsx', 'r') as f:
    content = f.read()

welcome_tab_old = re.search(r"\{tab === 'welcome' && \((.*?)\n        \)\}", content, re.DOTALL)
if welcome_tab_old:
    welcome_tab_new = """
        {tab === 'welcome' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-2 border-b border-neutral-800 pb-8">
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
"""
    content = content.replace(welcome_tab_old.group(0), welcome_tab_new.strip() + "\n        )}")

    with open('app/admin/page.tsx', 'w') as f:
        f.write(content)
