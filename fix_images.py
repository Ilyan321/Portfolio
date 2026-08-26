import re

# Fix Admin Page
with open('app/admin/page.tsx', 'r') as f:
    admin = f.read()

admin_old = '<img src={c.image_path} alt={c.title} className="w-12 h-12 rounded object-cover border border-neutral-800" />'
admin_new = """{c.image_path ? (
                    <img src={c.image_path} alt={c.title} className="w-12 h-12 rounded object-cover border border-neutral-800" />
                  ) : (
                    <div className="w-12 h-12 rounded border border-neutral-800 bg-neutral-800/50 flex items-center justify-center text-[8px] text-neutral-500 font-mono-code text-center leading-tight">NO IMG</div>
                  )}"""

admin = admin.replace(admin_old, admin_new.strip())
with open('app/admin/page.tsx', 'w') as f:
    f.write(admin)

# Fix Public Portfolio Page
with open('components/home-view.tsx', 'r') as f:
    home = f.read()

home_old = """
                <img
                  src={selectedCert.imagePath}
                  alt={selectedCert.title}
                  className="w-full h-auto max-h-[65vh] object-contain rounded-lg shadow-md mx-auto block"
                  loading="lazy"
                />
"""
home_new = """
                {selectedCert.imagePath ? (
                  <img
                    src={selectedCert.imagePath}
                    alt={selectedCert.title}
                    className="w-full h-auto max-h-[65vh] object-contain rounded-lg shadow-md mx-auto block"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center rounded-lg shadow-inner bg-[rgba(26,25,24,0.05)] border border-[rgba(26,25,24,0.1)] text-[#78746D] font-mono-code text-xs uppercase tracking-widest">
                    [ No Credentials Image Provided ]
                  </div>
                )}
"""
home = home.replace(home_old.strip(), home_new.strip())
with open('components/home-view.tsx', 'w') as f:
    f.write(home)

