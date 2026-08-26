import re

with open('app/admin/page.tsx', 'r') as f:
    content = f.read()

# Fix saveProject
proj_old = """
        setIsAddingProject(false);
      }
    } finally {
"""
proj_new = """
        setIsAddingProject(false);
      } else {
        const err = await res.json();
        alert("Database Error: " + err.error);
      }
    } finally {
"""
content = content.replace(proj_old, proj_new)

# Fix saveCert
cert_old = """
        setIsAddingCert(false);
      }
    } finally {
"""
cert_new = """
        setIsAddingCert(false);
      } else {
        const err = await res.json();
        alert("Database Error: " + err.error);
      }
    } finally {
"""
content = content.replace(cert_old, cert_new)

with open('app/admin/page.tsx', 'w') as f:
    f.write(content)
