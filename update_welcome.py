import re

with open('app/admin/page.tsx', 'r') as f:
    content = f.read()

# Change default tab to welcome
content = content.replace("useState<'projects' | 'certificates' | 'profile'>('projects')", "useState<'welcome' | 'projects' | 'certificates' | 'profile'>('welcome')")

# Add Welcome tab to header nav
header_nav_old = """
        <div className="flex gap-2">
          <button onClick={() => setTab('projects')} className={`px-4 py-2 text-sm rounded ${tab === 'projects' ? 'bg-white text-black' : 'text-neutral-400'}`}>Projects</button>
"""
header_nav_new = """
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <button onClick={() => setTab('welcome')} className={`px-4 py-2 text-sm rounded ${tab === 'welcome' ? 'bg-white text-black' : 'text-neutral-400'}`}>Home</button>
          <button onClick={() => setTab('projects')} className={`px-4 py-2 text-sm rounded ${tab === 'projects' ? 'bg-white text-black' : 'text-neutral-400'}`}>Projects</button>
"""
content = content.replace(header_nav_old.strip(), header_nav_new.strip())

# Add Welcome tab content
welcome_tab = """
        {tab === 'welcome' && (
          <div className="space-y-6">
            <div className="p-8 md:p-12 rounded-2xl bg-[#1A1918] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/80 mb-4 block">
                ADMINISTRATION LAYER
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#F3EFEA] mb-2 tracking-tight">
                Welcome back, {profile?.name?.split(' ')[0] || 'Admin'}.
              </h2>
              <p className="text-sm font-sans text-[#78746D] max-w-lg mb-8">
                Your portfolio backend is online and securely authenticated. 
                Use this portal to manage your showcased work, update credentials, and tailor your digital presence.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div onClick={() => setTab('projects')} className="p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/card">
                  <div className="text-[10px] font-mono text-[#78746D] mb-1 group-hover/card:text-[#F3EFEA] transition-colors">TOTAL PROJECTS</div>
                  <div className="text-3xl font-serif text-[#F3EFEA]">{projects.length}</div>
                </div>
                <div onClick={() => setTab('certificates')} className="p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/card">
                  <div className="text-[10px] font-mono text-[#78746D] mb-1 group-hover/card:text-[#F3EFEA] transition-colors">CERTIFICATES</div>
                  <div className="text-3xl font-serif text-[#F3EFEA]">{certificates.length}</div>
                </div>
                <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors cursor-pointer group/card flex flex-col justify-center items-center">
                  <div className="text-[10px] font-mono text-emerald-400 mb-1 group-hover/card:text-emerald-300 transition-colors">SYSTEM STATUS</div>
                  <div className="text-sm font-sans text-emerald-500 font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> ONLINE
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
"""

content = content.replace("{tab === 'projects' && (", f"{welcome_tab.strip()}\n\n        {{tab === 'projects' && (")

with open('app/admin/page.tsx', 'w') as f:
    f.write(content)
