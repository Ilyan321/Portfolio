import streamlit as st

st.set_page_config(
    page_title="Ilyan Khan - Portfolio",
    page_icon="favicon.svg",
    layout="wide",
    initial_sidebar_state="expanded"
)

PORTFOLIO_DATA = {
    "name": "Ilyan Khan",
    "title": "Software Engineer | Python/C++ Developer | Web Developer",
    "hero_subtitle": "Building digital experiences with code and creativity.",
    
    "about": (
        "Hi, I'm Ilyan! I'm a passionate developer currently studying Computer Systems Engineering @ QUEST. "
        "I have a strong foundation in Python(OOP), C++(OOP,DSA), and web development(HTML,CSS). "
        "Currently, I'm focused on building accessible, human-centered products at Arch Technologies."
    ),
    
    "socials": {
        "LinkedIn": "https://linkedin.com/in/ilyan-khan-480341359",
        "GitHub": "https://github.com/Ilyan321",
        "Email": "ilyankhan332@gmail.com"
    },
    "skills": [
        "Python", "C++", "DSA","OOP","HTML/CSS","Git","Github","Linux"
    ],
    "projects": [
        {
            "title": "Student Expence Tracker",
            "description": "A real-time Python & Streamlit expense tracker designed for university students to manage daily budgets and visualize spending habits.",
            "tech_stack": ["Python","Streamlit","Pandas","Numpy"],
            "link": "https://github.com/Ilyan321/Student_Expense_Tracker"
        },
        {
            "title": "Hospital Management System",
            "description": "This is console based application for a hospital management system that adds patients, treats patients according their medical urgency and keeps the record of each patient even if the patient is discarged and you can also find each patient with the search function.",
            "tech_stack": ["C++","DSA","OOP","Git","Github"],
            "link": "https://github.com/Ilyan321/HospitalManagementSystem"
        },
        {
            "title": "Smart Campus Management System",
            "description": "This Project is console based application focusing on Smart Campus Management System. It consists of systems like Student Management System, Teacher Management System, Library Management System and Attendance Management System.",
            "tech_stack": ["C++","DSA","OOP","Git","Github"],
            "link": "https://github.com/Ilyan321/SmartCampusManagementSystem"
        }
    ],
    "experience": [
        {
            "role": "Software Engineer Intern",
            "company": "Arch Technologies",
            "date": "Jan 2026 - Present",
            "desc": "Working on building Real-World C++ programs."
        },
        {
            "role": "Software Engineer Intern",
            "company": "Coretech Innovations",
            "date": "Dec 2025 - Jan 2026",
            "desc": "Worked on learning and building Real world Mobile applications with Kotlin on Android Studio."
        }
    ]
}

# -----------------------------------------------------------------------------
# 3. CUSTOM CSS (DARK MODE STYLING)
# -----------------------------------------------------------------------------
def local_css():
    st.markdown("""
    <style>
    /* General Dark Theme Settings */
    .stApp {
        background-color: #0f172a;
        color: #e2e8f0;
    }
    
    /* Hide default Streamlit header/footer */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    
    /* Typography */
    h1, h2, h3, h4 {
        font-family: 'Helvetica Neue', sans-serif;
        font-weight: 700;
        color: #f8fafc;
    }
    
    /* Hero Section */
    .hero-text {
        font-size: 3.5rem !important;
        font-weight: 800 !important;
        margin-bottom: 0.5rem;
        background: -webkit-linear-gradient(45deg, #38bdf8, #818cf8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    /* Custom Cards */
    .card {
        background-color: #1e293b;
        padding: 25px;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        margin-bottom: 25px;
        border: 1px solid #334155;
        transition: transform 0.2s;
    }
    
    .card:hover {
        transform: translateY(-2px);
        border-color: #38bdf8;
    }
    
    /* Skill Tags */
    .skill-tag {
        display: inline-block;
        padding: 8px 16px;
        background-color: #1e293b;
        color: #38bdf8;
        border-radius: 25px;
        font-size: 0.9rem;
        font-weight: 600;
        margin-right: 10px;
        margin-bottom: 10px;
        border: 1px solid #334155;
    }
    
    /* Section Headers */
    .section-header {
        margin-top: 4rem;
        margin-bottom: 2rem;
        font-size: 2rem;
        font-weight: 700;
        color: #f8fafc;
    }
    
    /* Social Buttons */
    .social-btn {
        text-decoration: none;
        color: #94a3b8;
        font-weight: 600;
        margin-right: 25px;
        font-size: 1.1rem;
        transition: all 0.3s;
        border-bottom: 2px solid transparent;
    }
    .social-btn:hover {
        color: #38bdf8;
        border-bottom: 2px solid #38bdf8;
    }
    
    /* Project Links */
    .project-link {
        color: #38bdf8;
        font-weight: bold;
        text-decoration: none;
    }
    .project-link:hover {
        text-decoration: underline;
    }

    /* Streamlit Overrides for Dark Mode */
    .stMarkdown p {
        color: #cbd5e1;
        font-size: 1.1rem;
        line-height: 1.7;
    }
    
    /* Expander fix */
    .streamlit-expanderHeader {
        background-color: #1e293b !important;
        color: #f8fafc !important;
    }
    </style>
    """, unsafe_allow_html=True)

# -----------------------------------------------------------------------------
# 4. UI COMPONENTS
# -----------------------------------------------------------------------------

def render_header():
    col1, col2 = st.columns([3, 1])
    with col1:
        st.markdown(f"<h1 class='hero-text'>{PORTFOLIO_DATA['name']}</h1>", unsafe_allow_html=True)
        st.markdown(f"<h3 style='color: #94a3b8; margin-top: -10px;'>{PORTFOLIO_DATA['title']}</h3>", unsafe_allow_html=True)
        st.markdown(f"<p style='font-size: 1.2rem; color: #cbd5e1; margin-top: 15px;'>{PORTFOLIO_DATA['hero_subtitle']}</p>", unsafe_allow_html=True)
        
        # Social Links
        links_html = "".join([f"<a href='{url}' target='_blank' class='social-btn'>{name}</a>" 
                              for name, url in PORTFOLIO_DATA['socials'].items()])
        st.markdown(links_html, unsafe_allow_html=True)
        
    with col2:
        # Placeholder for Profile Image
        st.image("pp.jpeg", width=200)

def render_about():
    st.markdown("<div class='section-header'>About Me</div>", unsafe_allow_html=True)
    # Fixed: Added .strip() to remove extra whitespace
    about_text = PORTFOLIO_DATA['about'].strip()
    st.markdown(f"<div class='card'>{about_text}</div>", unsafe_allow_html=True)

def render_skills():
    st.markdown("<div class='section-header'>Skills & Technologies</div>", unsafe_allow_html=True)
    
    skills_html = "".join([f"<span class='skill-tag'>{skill}</span>" 
                           for skill in PORTFOLIO_DATA['skills']])
    st.markdown(f"<div>{skills_html}</div>", unsafe_allow_html=True)

def render_experience():
    st.markdown("<div class='section-header'>Experience</div>", unsafe_allow_html=True)
    
    for exp in PORTFOLIO_DATA['experience']:
        st.markdown(f"""
        <div class='card'>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="margin:0; color: #f8fafc;">{exp['role']}</h4>
                <span style="background: #334155; padding: 4px 12px; border-radius: 12px; font-size: 0.85rem; color: #38bdf8;">{exp['date']}</span>
            </div>
            <p style="margin: 5px 0 15px 0; color: #94a3b8; font-weight: 600;">{exp['company']}</p>
            <p style="color: #cbd5e1;">{exp['desc']}</p>
        </div>
        """, unsafe_allow_html=True)

def render_projects():
    st.markdown("<div class='section-header'>Projects</div>", unsafe_allow_html=True)
    
    # Create a grid layout (2 columns)
    cols = st.columns(2)
    
    for i, project in enumerate(PORTFOLIO_DATA['projects']):
        # Alternate columns
        with cols[i % 2]:
            st.markdown(f"""
            <div class='card'>
                <h4 style="margin-top:0; font-size: 1.4rem;">{project['title']}</h4>
                <p style="color: #cbd5e1;">{project['description']}</p>
                <div style="margin-top: 20px; margin-bottom: 15px;">
                    {''.join([f"<span class='skill-tag' style='font-size:0.8rem; padding:5px 10px;'>{t}</span>" for t in project['tech_stack']])}
                </div>
                <a href="{project['link']}" target="_blank" class="project-link">View Project →</a>
            </div>
            """, unsafe_allow_html=True)

def render_contact():
    st.markdown("<div class='section-header'>Get In Touch</div>", unsafe_allow_html=True)
    st.markdown("""
    <div class='card' style="text-align: center; padding: 40px;">
        <h3 style="margin-bottom: 15px;">Let's Work Together</h3>
        <p style="font-size: 1.1rem;">I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
        <a href="mailto:ilyankhan332@gmail.com" style="
            background: linear-gradient(90deg, #38bdf8, #818cf8); 
            color: #0f172a; 
            padding: 14px 30px; 
            border-radius: 30px; 
            text-decoration: none; 
            font-weight: bold;
            display: inline-block;
            margin-top: 20px;
            font-size: 1.1rem;
        ">Say Hello 👋</a>
    </div>
    """, unsafe_allow_html=True)

# -----------------------------------------------------------------------------
# 5. MAIN APP LAYOUT
# -----------------------------------------------------------------------------
# -----------------------------------------------------------------------------
# 5. MAIN APP LAYOUT
# -----------------------------------------------------------------------------
def main():
    local_css()
    
    # Center the content properly
    st.markdown("""
    <div style="display: flex; justify-content: center;">
        <div style="width: 100%; max-width: 900px;">
    """, unsafe_allow_html=True)
    
    render_header()
    render_about()
    render_skills()
    render_experience()
    render_projects()
    render_contact()
    
    st.markdown("</div></div>", unsafe_allow_html=True)
            
    # Footer
    st.markdown("---")
    st.markdown(f"<div style='text-align: center; color: #475569; padding: 20px;'>© {2024} {PORTFOLIO_DATA['name']}. Built with Streamlit.</div>", unsafe_allow_html=True)

if __name__ == "__main__":
    main()