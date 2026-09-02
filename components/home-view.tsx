'use client';

import * as React from 'react';
import { HomeModals } from "./home-modals";
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectItem, ProfileData, CertificateItem } from '../lib/types';

import {
  ExternalLinkIcon,
  GithubIcon,
  LinkedinIcon,
  FileTextIcon,
  XIcon,
  UserIcon,
} from './ui/icons';



// Curated Projects List (All Flagship Projects)

// Verified Certifications List (All 9 Verified Credentials)

interface HomeViewProps {
  projects: ProjectItem[];
  profile: ProfileData | null;
  certificates: CertificateItem[];
}

export function HomeView({ projects, profile, certificates }: HomeViewProps) {
  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(null);
  const [selectedCert, setSelectedCert] = React.useState<CertificateItem | null>(null);
  const [showDirectoryModal, setShowDirectoryModal] = React.useState<boolean>(false);
  const [directoryTab, setDirectoryTab] = React.useState<'projects' | 'certificates'>('projects');
  const [showContactModal, setShowContactModal] = React.useState<boolean>(false);
  const [showAboutModal, setShowAboutModal] = React.useState<boolean>(false);
  const [showPhilosophyModal, setShowPhilosophyModal] = React.useState<boolean>(false);
  const [showNetworkModal, setShowNetworkModal] = React.useState<boolean>(false);

  return (
    <main className="min-h-screen w-full lg:h-screen lg:max-h-screen bg-[#1A1918] p-2.5 sm:p-4 lg:p-5 flex items-center justify-center overflow-y-auto lg:overflow-hidden">
      {/* Outer Dark Frame */}
      <div className="w-full max-w-7xl min-h-screen lg:min-h-0 lg:h-full lg:max-h-[96vh] bg-[#262523] rounded-2xl sm:rounded-[2rem] px-3.5 sm:px-5 lg:px-6 pt-2 sm:pt-3 lg:pt-4 pb-3.5 sm:pb-5 lg:pb-6 shadow-2xl border border-white/[0.06] flex flex-col justify-between overflow-visible lg:overflow-hidden gap-3 sm:gap-4 lg:gap-0 my-auto">
        
        {/* =================================================================== */}
        {/* 1. TOP NAVIGATION BAR                                               */}
        {/* =================================================================== */}
        <header className="flex flex-col sm:flex-row items-center justify-between px-1 sm:px-2 pt-2 sm:pt-0 pb-2 sm:pb-1 shrink-0 gap-3 sm:gap-2">
          <div className="flex items-center justify-between w-full sm:w-auto shrink-0 px-2 sm:px-0">
            <span className="font-mono-code text-xs sm:text-sm font-semibold tracking-widest text-[#F3EFEA] uppercase">
              DEV / ILYAN
            </span>
            <a 
              href="/admin" 
              className="sm:hidden flex items-center justify-center w-7 h-7 rounded-full bg-[rgba(243,239,234,0.05)] active:bg-[rgba(243,239,234,0.12)] border border-[rgba(243,239,234,0.05)] text-[#DFD5C6] transition-all backdrop-blur-md shadow-sm active:scale-95" 
              title="Admin Portal"
            >
              <UserIcon size={13} />
            </a>
          </div>

          <nav className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 lg:gap-8 text-[11px] sm:text-xs font-sans-clean font-medium tracking-wide text-[#A39E95] py-0.5 w-full sm:w-auto">
            <button
              onClick={() => setShowAboutModal(true)}
              className="hover:text-[#F3EFEA] active:text-white transition-colors uppercase cursor-pointer whitespace-nowrap"
            >
              ABOUT
            </button>
            <button
              onClick={() => {
                setDirectoryTab('projects');
                setShowDirectoryModal(true);
              }}
              className="hover:text-[#F3EFEA] active:text-white transition-colors uppercase cursor-pointer whitespace-nowrap"
            >
              PROJECTS
            </button>
            <button
              onClick={() => {
                setDirectoryTab('certificates');
                setShowDirectoryModal(true);
              }}
              className="hover:text-[#F3EFEA] active:text-white transition-colors uppercase cursor-pointer whitespace-nowrap"
            >
              <span className="hidden sm:inline">CERTIFICATIONS</span>
              <span className="sm:hidden">CERTS</span>
            </button>
            <button
              onClick={() => setShowContactModal(true)}
              className="hover:text-[#F3EFEA] active:text-white transition-colors uppercase cursor-pointer whitespace-nowrap"
            >
              CONTACT
            </button>
            <a 
              href="/admin" 
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(243,239,234,0.05)] hover:bg-[rgba(243,239,234,0.12)] border border-[rgba(243,239,234,0.05)] hover:border-[rgba(243,239,234,0.2)] text-[#DFD5C6] hover:text-[#F3EFEA] transition-all backdrop-blur-md shadow-sm active:scale-95 group" 
              title="Admin Portal"
            >
              <div className="group-hover:rotate-12 transition-transform duration-300">
                <UserIcon size={13} />
              </div>
            </a>
          </nav>
        </header>

        {/* =================================================================== */}
        {/* 2. MAIN BENTO GRID - TOP ROW                                        */}
        {/* =================================================================== */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 flex-1 min-h-0 py-1 sm:py-2">
          
          {/* Top-Left Card: 01 / ABOUT ME */}
          <div className="w-full lg:w-[38.5%] sand-card p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden min-h-[220px] lg:min-h-0 lg:h-full gap-3 lg:gap-0">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium">
                01 / ABOUT ME
              </span>
              
              {/* Abstract 4-Point Star Geometric Vector */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#1A1918] opacity-80"
              >
                <path
                  d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Heading & Full Multi-Line Bio */}
            <div className="space-y-1.5 my-auto py-1">
              <h1 className="font-serif-display text-2xl sm:text-3xl lg:text-[2.15rem] leading-[1.12] text-[#1A1918] tracking-tight">
                Building practical AI &amp; systems from <span className="italic font-normal">first principles</span>.
              </h1>
              <p className="text-[11px] sm:text-xs font-sans-clean text-[#1A1918] leading-relaxed">
                2nd-year Computer Systems Engineering student at QUEST Nawabshah (3.10 CGPA). Exploring the intersection of open-source LLM fine-tuning, AST security guardrails, and software systems — backed by 4 technical internships and a focus on clean, reliable code.
              </p>
            </div>

            {/* Bottom Row: Location & Academics Action */}
            <div className="flex items-center justify-between pt-1.5 border-t border-[rgba(26,25,24,0.12)] text-[10px] sm:text-[11px] font-mono-code text-[#78746D]">
              <span>QUEST Nawabshah, Pakistan</span>
              <button
                onClick={() => setShowAboutModal(true)}
                className="text-[#1A1918] font-semibold hover:underline cursor-pointer"
              >
                My Academic Record &amp; Internships &rarr;
              </button>
            </div>
          </div>

          {/* Portrait Card (Exact original 24% width on desktop, responsive clear face framing on mobile) */}
          <div className="w-full lg:w-[24%] sand-card-dark border border-[#363633] p-2 sm:p-2.5 flex items-center justify-center relative overflow-hidden h-auto lg:h-full shrink-0">
            <div className="w-full h-auto lg:h-full rounded-[1.1rem] overflow-hidden relative shadow-inner bg-[#DFD5C6]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pp.jpeg"
                alt={profile?.name ?? 'Ilyan Khan'}
                className="w-full h-auto lg:h-full object-cover lg:object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-0 left-0 right-0 bg-[#2C2C2A] py-2 px-3 text-center z-10 transition-colors">
                <span className="font-serif-display text-base sm:text-lg text-[#F3EFEA] font-normal block leading-none">
                  {profile?.name ?? 'Ilyan Khan'}
                </span>
                <span className="text-[9px] font-mono-code text-[#DFD5C6] uppercase mt-1 block">
                  {profile?.title ?? 'Systems Engineering • QUEST'}
                </span>
              </div>
            </div>
          </div>

          {/* Top-Right: Pure High-Craft Editorial Showcase (Exact original 37.5% width on desktop) */}
          <div
            id="projects-card"
            className="w-full lg:w-[37.5%] sand-card p-4 sm:p-5 flex flex-col justify-between min-h-[260px] lg:min-h-0 lg:h-full gap-2 lg:gap-0"
          >
            {/* Clickable Header */}
            <div
              onClick={() => setShowDirectoryModal(true)}
              className="flex items-center justify-between pb-2 border-b border-[rgba(26,25,24,0.12)] cursor-pointer group hover:bg-[rgba(26,25,24,0.03)] -mx-1 px-1 rounded-t-lg transition-colors"
              title="Open Full Achievements Directory"
            >
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium block group-hover:text-[#1A1918] transition-colors">
                  05 / TECHNICAL WORK
                </span>
                <h3 className="font-serif-display text-xl text-[#1A1918] font-normal tracking-tight group-hover:text-emerald-900 transition-colors">
                  Projects &amp; Certifications
                </h3>
              </div>
              <span className="text-[#1A1918] group-hover:text-emerald-800 text-sm font-mono-code group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all p-1">
                ↗
              </span>
            </div>

            {/* Clean Section 1: Projects */}
            <div className="space-y-1 py-1">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium block">
                Featured Projects
              </span>

              <div className="divide-y divide-[rgba(26,25,24,0.08)]">
                {projects.length === 0 ? (
                  <div className="py-2 text-xs font-mono-code text-[#78746D]">
                    [NO PROJECTS VISIBLE]
                  </div>
                ) : (
                  projects.slice(0, 2).map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      className="w-full py-1.5 flex items-center justify-between group transition-colors cursor-pointer text-left active:bg-black/5 rounded-md px-1 -mx-1"
                    >
                      <div className="pr-2 min-w-0">
                        <span className="text-xs font-sans-clean font-semibold text-[#1A1918] group-hover:text-emerald-800 transition-colors block truncate">
                          {proj.name}
                        </span>
                        <span className="text-[10px] font-mono-code text-[#78746D] block truncate">
                          {proj.subtitle}
                        </span>
                      </div>
                      <span className="text-xs font-mono-code text-[#78746D] group-hover:translate-x-1 group-hover:text-[#1A1918] transition-all shrink-0">
                        &rarr;
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Clean Section 2: Certifications */}
            <div className="space-y-1 py-1 border-t border-[rgba(26,25,24,0.08)]">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium block">
                Verified Certifications
              </span>

              <div className="divide-y divide-[rgba(26,25,24,0.08)]">
                {certificates.length === 0 ? (
                  <div className="py-2 text-xs font-mono-code text-[#78746D]">
                    [NO CERTS VISIBLE]
                  </div>
                ) : (
                  certificates.slice(0, 2).map((cert) => (
                    <button
                      key={cert.id}
                      onClick={() => setSelectedCert(cert)}
                      className="w-full py-1.5 flex items-center justify-between group transition-colors cursor-pointer text-left active:bg-black/5 rounded-md px-1 -mx-1"
                    >
                      <div className="pr-2 min-w-0">
                        <span className="text-xs font-sans-clean font-semibold text-[#1A1918] group-hover:text-emerald-800 transition-colors block truncate">
                          {cert.title}
                        </span>
                        <span className="text-[10px] font-mono-code text-[#78746D] block truncate">
                          {cert.issuer} &bull; Verified
                        </span>
                      </div>
                      <span className="text-xs font-mono-code text-[#78746D] group-hover:translate-x-1 group-hover:text-[#1A1918] transition-all shrink-0">
                        &rarr;
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Footer with Directory Trigger */}
            <div className="pt-2 border-t border-[rgba(26,25,24,0.12)] text-[10px] font-mono-code text-[#78746D] flex justify-between items-center">
              <span>Systems Engineering &bull; Open Source</span>
              <button
                onClick={() => setShowDirectoryModal(true)}
                className="text-[#1A1918] font-semibold hover:underline cursor-pointer flex items-center gap-0.5"
              >
                <span>Full Directory</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. BOTTOM BENTO ROW                                                 */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 shrink-0">
          
          {/* Philosophy Card (Bottom-Left, 5 cols) */}
          <div className="md:col-span-5 sand-card p-3.5 sm:p-4 flex flex-col justify-between space-y-2 sm:space-y-1.5 min-h-[110px]">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium">
                  02 / HOW I LEARN &amp; BUILD
                </span>
                <span className="text-[10px] font-mono-code text-[#78746D]">FIRST PRINCIPLES</span>
              </div>
              <p className="text-[11px] sm:text-xs font-sans-clean text-[#1A1918] leading-relaxed">
                I believe engineering is best mastered by building from scratch. I bridge foundational computer systems theory with practical AI — writing clean, tested code that turns academic concepts into reliable software.
              </p>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-[rgba(26,25,24,0.12)] text-[10px] sm:text-[11px] font-mono-code text-[#78746D]">
              <span>Hands-on Code &bull; Practical AI</span>
              <button
                onClick={() => setShowPhilosophyModal(true)}
                className="text-[#1A1918] font-semibold hover:underline cursor-pointer"
              >
                Learning Philosophy &rarr;
              </button>
            </div>
          </div>

          {/* Contact Card (Bottom-Center, 4 cols) */}
          <div
            onClick={() => setShowContactModal(true)}
            className="md:col-span-4 sand-card-dark p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer hover:bg-[#363633] active:scale-[0.99] transition-all group min-h-[110px]"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#A39E95] font-medium">
                03 / CONNECT &amp; COLLABORATE
              </span>
              <span className="text-sm text-[#F3EFEA] font-mono-code group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </div>

            <div className="py-1">
              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#F3EFEA] font-normal leading-tight">
                Get in touch
              </h3>
            </div>

            <div className="text-[10px] sm:text-[11px] font-mono-code text-emerald-400 font-medium">
              {profile?.email ?? 'ilyaankhan342@gmail.com'}
            </div>
          </div>

          {/* Social Links Pill (Bottom-Right, 3 cols) */}
          <div
            onClick={() => setShowNetworkModal(true)}
            className="md:col-span-3 sand-card p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer hover:bg-[#DDD4C5] active:scale-[0.99] transition-all group min-h-[110px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium">
                04 / PROFILES &amp; RESUME
              </span>
              <span className="text-xs font-mono-code text-[#78746D] group-hover:text-[#1A1918] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                ↗
              </span>
            </div>

            <div className="flex flex-col gap-1 py-1">
              <a
                href={profile?.githubUrl ?? 'https://github.com/Ilyan321'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[11px] sm:text-xs font-sans-clean font-semibold tracking-wider text-[#1A1918] hover:text-emerald-800 transition-colors uppercase flex items-center justify-between py-0.5"
              >
                <span>GITHUB</span>
                <span className="text-xs font-mono-code text-[#78746D]">↗</span>
              </a>
              <a
                href={profile?.linkedinUrl ?? 'https://linkedin.com/in/ilyan-khan-480341359'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[11px] sm:text-xs font-sans-clean font-semibold tracking-wider text-[#1A1918] hover:text-emerald-800 transition-colors uppercase flex items-center justify-between py-0.5"
              >
                <span>LINKEDIN</span>
                <span className="text-xs font-mono-code text-[#78746D]">↗</span>
              </a>
              <a
                href="/CV.pdf"
                download
                onClick={(e) => e.stopPropagation()}
                className="text-[11px] sm:text-xs font-sans-clean font-semibold tracking-wider text-[#1A1918] hover:text-emerald-800 transition-colors uppercase flex items-center justify-between py-0.5"
              >
                <span>RESUME (PDF)</span>
                <span className="text-xs font-mono-code text-[#78746D]">↓</span>
              </a>
            </div>

            <div className="text-[9px] font-mono-code text-[#78746D] pt-1 border-t border-[rgba(26,25,24,0.12)] flex items-center justify-between">
              <span>&copy; 2026 ILYAN KHAN</span>
              <span className="text-[10px] font-sans-clean font-semibold text-[#1A1918] group-hover:underline">
                View All &rarr;
              </span>
            </div>
          </div>

        </div>

      </div>

      <HomeModals 
        projects={projects}
        profile={profile}
        certificates={certificates}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        selectedCert={selectedCert}
        setSelectedCert={setSelectedCert}
        showDirectoryModal={showDirectoryModal}
        setShowDirectoryModal={setShowDirectoryModal}
        directoryTab={directoryTab}
        setDirectoryTab={setDirectoryTab}
        showContactModal={showContactModal}
        setShowContactModal={setShowContactModal}
        showAboutModal={showAboutModal}
        setShowAboutModal={setShowAboutModal}
        showPhilosophyModal={showPhilosophyModal}
        setShowPhilosophyModal={setShowPhilosophyModal}
        showNetworkModal={showNetworkModal}
        setShowNetworkModal={setShowNetworkModal}
      />
      {/* =================================================================== */}
      {/* ✦ SEO & ACCESSIBILITY ENGINE (Screen-Reader Only)                   */}
      {/* =================================================================== */}
      <div className="sr-only" aria-hidden="false">
        <h1>Ilyan Khan - Systems &amp; AI Engineer Portfolio</h1>
        <section>
          <h2>About Me</h2>
          <p>{profile?.bio}</p>
          <p>Email: {profile?.email}</p>
          <p>Title: {profile?.title}</p>
        </section>
        
        <section>
          <h2>Engineering Projects &amp; Case Studies</h2>
          {projects.map(p => (
            <article key={p.id}>
              <h3>{p.name}</h3>
              <p>{p.subtitle}</p>
              <p>{p.elevatorPitch}</p>
              <p>Challenge: {p.challenge}</p>
              <h4>Tech Stack:</h4>
              <ul>
                {p.techStack?.map((tech, i) => <li key={i}>{tech}</li>)}
              </ul>
              <h4>Architecture:</h4>
              <ul>
                {p.architecture?.map((arc, i) => <li key={i}>{arc}</li>)}
              </ul>
            </article>
          ))}
        </section>

        <section>
          <h2>Certifications &amp; Credentials</h2>
          {certificates.map(c => (
            <article key={c.id}>
              <h3>{c.title}</h3>
              <p>Issuer: {c.issuer}</p>
              <p>Description: {c.description}</p>
              <h4>Skills Acquired:</h4>
              <ul>
                {c.skills?.map((skill, i) => <li key={i}>{skill}</li>)}
              </ul>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
