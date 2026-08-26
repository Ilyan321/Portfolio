'use client';

import * as React from 'react';
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
          <div className="w-full lg:w-[24%] sand-card-dark border border-[#363633] p-2 sm:p-2.5 flex items-center justify-center relative overflow-hidden h-80 sm:h-96 lg:h-full shrink-0">
            <div className="w-full h-full rounded-[1.1rem] overflow-hidden relative shadow-inner bg-[#DFD5C6]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pp.jpeg"
                alt={profile?.name ?? 'Ilyan Khan'}
                className="w-full h-full object-cover object-[center_28%] scale-[1.25] lg:scale-100 lg:object-top hover:scale-[1.3] lg:hover:scale-105 transition-transform duration-700"
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

      {/* =================================================================== */}
      {/* ✦ DUAL-TAB DIRECTORY MODAL (PROJECTS & CERTIFICATIONS)              */}
      {/* =================================================================== */}
      <AnimatePresence>
        {showDirectoryModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDirectoryModal(false)}
              className="fixed inset-0 bg-[#1A1918]/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragDirectionLock
              dragSnapToOrigin
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.75 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setShowDirectoryModal(false);
                }
              }}
              className="relative w-full max-w-3xl sand-card p-5 sm:p-7 lg:p-8 space-y-4 sm:space-y-5 shadow-2xl z-10 max-h-[88vh] sm:max-h-[90vh] overflow-y-auto border border-[#1A1918]/20 rounded-t-[1.75rem] rounded-b-none sm:rounded-[1.75rem] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              {/* Mobile Drag Indicator & Touch Area */}
              <div className="w-full flex justify-center pt-0 pb-3 -mt-2 sm:hidden cursor-grab active:cursor-grabbing touch-none select-none">
                <div className="w-12 h-1.5 rounded-full bg-[#1A1918]/25" />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowDirectoryModal(false)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 text-[#78746D] hover:text-[#1A1918] rounded-full bg-[rgba(26,25,24,0.06)] hover:bg-[rgba(26,25,24,0.12)] transition-colors cursor-pointer"
                aria-label="Close Directory"
              >
                <XIcon size={18} />
              </button>

              <div className="pr-8">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium">
                  05 / ACADEMIC &amp; TECHNICAL DIRECTORY
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl text-[#1A1918] font-normal tracking-tight">
                  Projects &amp; Verified Certifications
                </h2>
                <p className="text-xs font-sans-clean text-[#78746D] mt-0.5">
                  Select any project or certificate to inspect full architectural details &amp; credentials.
                </p>
              </div>

              {/* 2-Section Tab Switcher */}
              <div className="flex items-center gap-1.5 sm:gap-2 p-1 rounded-xl bg-[#DFD5C6] border border-[rgba(26,25,24,0.1)]">
                <button
                  onClick={() => setDirectoryTab('projects')}
                  className={`flex-1 py-2 px-2.5 sm:px-3 rounded-lg text-[11px] sm:text-xs font-mono-code font-semibold transition-all cursor-pointer truncate ${
                    directoryTab === 'projects'
                      ? 'bg-[#1A1918] text-[#F3EFEA] shadow'
                      : 'text-[#78746D] hover:text-[#1A1918]'
                  }`}
                >
                  Flagship Projects ({projects.length})
                </button>
                <button
                  onClick={() => setDirectoryTab('certificates')}
                  className={`flex-1 py-2 px-2.5 sm:px-3 rounded-lg text-[11px] sm:text-xs font-mono-code font-semibold transition-all cursor-pointer truncate ${
                    directoryTab === 'certificates'
                      ? 'bg-[#1A1918] text-[#F3EFEA] shadow'
                      : 'text-[#78746D] hover:text-[#1A1918]'
                  }`}
                >
                  Verified Credentials ({certificates.length})
                </button>
              </div>

              {/* Tab 1: Full Projects List */}
              {directoryTab === 'projects' && (
                <div className="space-y-2.5">
                  {projects.length === 0 ? (
                    <div className="p-8 text-center flex flex-col items-center justify-center gap-2 border border-dashed border-[#78746D]/30 rounded-xl bg-[#DFD5C6]/50">
                      <span className="text-sm font-mono-code text-[#78746D] tracking-widest uppercase">No Projects Found</span>
                      <span className="text-xs font-sans-clean text-[#78746D]">There are currently no visible projects in the database.</span>
                    </div>
                  ) : (
                    projects.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      className="p-3.5 sm:p-4 rounded-xl bg-[#DFD5C6] border border-[rgba(26,25,24,0.1)] hover:border-[#1A1918] transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-sans-clean font-bold text-[#1A1918] group-hover:text-emerald-800 transition-colors">
                            {proj.name}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono-code text-[#78746D]">
                          {proj.subtitle}
                        </p>
                      </div>
                      <span className="text-xs font-mono-code text-[#78746D] group-hover:text-[#1A1918] group-hover:translate-x-1 transition-all self-end sm:self-center">
                        Inspect Case Study &rarr;
                      </span>
                    </div>
                  ))
                  )}
                </div>
              )}

              {/* Tab 2: Full Certifications List */}
              {directoryTab === 'certificates' && (
                <div className="space-y-2.5">
                  {certificates.length === 0 ? (
                    <div className="p-8 text-center flex flex-col items-center justify-center gap-2 border border-dashed border-[#78746D]/30 rounded-xl bg-[#DFD5C6]/50">
                      <span className="text-sm font-mono-code text-[#78746D] tracking-widest uppercase">No Certs Found</span>
                      <span className="text-xs font-sans-clean text-[#78746D]">There are currently no visible certificates in the database.</span>
                    </div>
                  ) : (
                    certificates.map((cert) => (
                      <div
                        key={cert.id}
                        onClick={() => setSelectedCert(cert)}
                        className="p-3.5 sm:p-4 rounded-xl bg-[#DFD5C6] border border-[rgba(26,25,24,0.1)] hover:border-[#1A1918] transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-sans-clean font-bold text-[#1A1918] group-hover:text-emerald-800 transition-colors">
                              {cert.title}
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-code bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300">
                              {cert.tag}
                            </span>
                          </div>
                          <p className="text-[11px] font-mono-code text-[#78746D]">
                            {cert.issuer} &bull; {cert.issueDate}
                          </p>
                        </div>
                        <span className="text-xs font-mono-code text-[#78746D] group-hover:text-[#1A1918] group-hover:translate-x-1 transition-all self-end sm:self-center">
                          View Credential &rarr;
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* ✦ CERTIFICATION DETAIL MODAL (FULL CREDENTIAL + CERTIFICATE IMAGE)  */}
      {/* =================================================================== */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-[#1A1918]/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragDirectionLock
              dragSnapToOrigin
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.75 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setSelectedCert(null);
                }
              }}
              className="relative w-full max-w-2xl sand-card p-5 sm:p-7 lg:p-8 space-y-4 sm:space-y-5 shadow-2xl z-10 max-h-[88vh] sm:max-h-[90vh] overflow-y-auto border border-[#1A1918]/20 rounded-t-[1.75rem] rounded-b-none sm:rounded-[1.75rem] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              {/* Mobile Drag Indicator & Touch Area */}
              <div className="w-full flex justify-center pt-0 pb-3 -mt-2 sm:hidden cursor-grab active:cursor-grabbing touch-none select-none">
                <div className="w-12 h-1.5 rounded-full bg-[#1A1918]/25" />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 text-[#78746D] hover:text-[#1A1918] rounded-full bg-[rgba(26,25,24,0.06)] hover:bg-[rgba(26,25,24,0.12)] transition-colors cursor-pointer"
                aria-label="Close Credential Drawer"
              >
                <XIcon size={18} />
              </button>

              <div className="space-y-1 pr-8">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-[#1A1918] text-[#F3EFEA] uppercase font-medium">
                    {selectedCert.tag}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-emerald-800 text-white font-semibold">
                    Verified
                  </span>
                </div>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#1A1918] tracking-tight">
                  {selectedCert.title}
                </h2>
                <p className="text-xs font-sans-clean text-[#78746D]">
                  Issued by {selectedCert.issuer} &bull; {selectedCert.issueDate}
                </p>
              </div>

              {/* Certificate Image or Document Preview (Full View, Never Cropped) */}
              <div className="w-full rounded-xl overflow-hidden border border-[rgba(26,25,24,0.15)] bg-[#1A1918]/5 p-1 sm:p-2 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
              </div>

              {/* Description & Competencies */}
              <div className="space-y-3 text-xs font-sans-clean text-[#1A1918]">
                <p className="leading-relaxed text-[#1A1918] whitespace-pre-wrap break-words">
                  {selectedCert.description}
                </p>

                <div className="space-y-1.5">
                  <h4 className="font-mono-code text-[11px] text-[#78746D] uppercase font-semibold">
                    Key Competencies Mastered
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCert.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono-code bg-[#DFD5C6] text-[#1A1918] border border-[rgba(26,25,24,0.1)] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-[rgba(26,25,24,0.12)] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono-code text-[#78746D]">
                    Credential ID: {selectedCert.credentialId || 'GCC-VERIFIED'}
                  </span>
                  {selectedCert.pdfPath && (
                    <a
                      href={selectedCert.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono-code font-semibold text-emerald-900 hover:underline flex items-center gap-0.5"
                    >
                      <span>Official PDF</span>
                      <ExternalLinkIcon size={10} />
                    </a>
                  )}
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="text-xs font-mono-code text-[#1A1918] font-semibold hover:underline cursor-pointer"
                >
                  Back to Directory &rarr;
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* ✦ PROJECT DETAIL DRAWER / MODAL (FULL CASE STUDY)                   */}
      {/* =================================================================== */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-[#1A1918]/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragDirectionLock
              dragSnapToOrigin
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.75 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setSelectedProject(null);
                }
              }}
              className="relative w-full max-w-3xl sand-card p-5 sm:p-7 lg:p-8 space-y-4 sm:space-y-5 shadow-2xl z-10 max-h-[88vh] sm:max-h-[90vh] overflow-y-auto border border-[#1A1918]/20 rounded-t-[1.75rem] rounded-b-none sm:rounded-[1.75rem] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              {/* Mobile Drag Indicator & Touch Area */}
              <div className="w-full flex justify-center pt-0 pb-3 -mt-2 sm:hidden cursor-grab active:cursor-grabbing touch-none select-none">
                <div className="w-12 h-1.5 rounded-full bg-[#1A1918]/25" />
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 text-[#78746D] hover:text-[#1A1918] rounded-full bg-[rgba(26,25,24,0.06)] hover:bg-[rgba(26,25,24,0.12)] transition-colors cursor-pointer"
                aria-label="Close Project Drawer"
              >
                <XIcon size={18} />
              </button>

              <div className="space-y-1.5 pr-8">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-[#1A1918] text-[#F3EFEA] uppercase font-medium">
                    {selectedProject.category}
                  </span>
                </div>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#1A1918] tracking-tight">
                  {selectedProject.name}
                </h2>
                <p className="text-xs font-sans-clean text-[#78746D] leading-relaxed">
                  {selectedProject.subtitle}
                </p>
                <div className="mt-3 text-xs font-sans-clean text-[#1A1918] leading-relaxed whitespace-pre-wrap break-words">
                  {selectedProject.elevatorPitch}
                </div>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {selectedProject.highlights.map((h, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-[#DFD5C6] border border-[rgba(26,25,24,0.08)]">
                    <span className="text-[9px] font-mono-code text-[#78746D] block uppercase">{h.label}</span>
                    <span className="text-xs font-sans-clean font-bold text-[#1A1918]">{h.value}</span>
                  </div>
                ))}
              </div>

              {/* Technical Breakdown */}
              <div className="space-y-3.5 text-xs font-sans-clean text-[#1A1918]">
                <div className="space-y-1">
                  <h4 className="font-mono-code text-[11px] text-[#78746D] uppercase tracking-wider font-semibold">
                    1. Problem Formulation &amp; Challenge
                  </h4>
                  <p className="text-[#1A1918] leading-relaxed pl-3 border-l-2 border-[#1A1918] whitespace-pre-wrap break-words">
                    {selectedProject.challenge}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-mono-code text-[11px] text-[#78746D] uppercase tracking-wider font-semibold">
                    2. Core Architectural Engineering
                  </h4>
                  <ul className="space-y-1 pl-3 border-l-2 border-[#1A1918] text-[#1A1918]">
                    {selectedProject.architecture.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-800 font-mono-code font-bold">&bull;</span>
                        <span className="whitespace-pre-wrap break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-mono-code text-[11px] text-[#78746D] uppercase tracking-wider font-semibold">
                    3. Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono-code bg-[#DFD5C6] text-[#1A1918] border border-[rgba(26,25,24,0.12)] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[rgba(26,25,24,0.12)]">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono-code border border-[#1A1918] text-[#1A1918] hover:bg-[#1A1918] hover:text-[#F3EFEA] transition-colors"
                >
                  <GithubIcon size={13} />
                  <span>Inspect Source Code</span>
                </a>

                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono-code bg-[#1A1918] text-[#F3EFEA] font-semibold hover:bg-black transition-colors"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLinkIcon size={12} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* ✦ HOW I BUILD & PHILOSOPHY DRAWER / MODAL ✦                         */}
      {/* =================================================================== */}
      <AnimatePresence>
        {showPhilosophyModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPhilosophyModal(false)}
              className="fixed inset-0 bg-[#1A1918]/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragDirectionLock
              dragSnapToOrigin
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.75 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setShowPhilosophyModal(false);
                }
              }}
              className="relative w-full max-w-2xl sand-card p-5 sm:p-7 lg:p-8 space-y-4 sm:space-y-5 shadow-2xl z-10 border border-[#1A1918]/20 max-h-[88vh] sm:max-h-[90vh] overflow-y-auto rounded-t-[1.75rem] rounded-b-none sm:rounded-[1.75rem] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              {/* Mobile Drag Indicator & Touch Area */}
              <div className="w-full flex justify-center pt-0 pb-3 -mt-2 sm:hidden cursor-grab active:cursor-grabbing touch-none select-none">
                <div className="w-12 h-1.5 rounded-full bg-[#1A1918]/25" />
              </div>

              <button
                onClick={() => setShowPhilosophyModal(false)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 text-[#78746D] hover:text-[#1A1918] rounded-full bg-[rgba(26,25,24,0.06)] hover:bg-[rgba(26,25,24,0.12)] transition-colors cursor-pointer"
                aria-label="Close Modal"
              >
                <XIcon size={18} />
              </button>

              <div className="space-y-1 pr-8">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium">
                  02 / ENGINEERING MINDSET
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl text-[#1A1918] font-normal tracking-tight">
                  How I Learn &amp; Build
                </h2>
                <p className="text-xs font-sans-clean text-[#78746D]">
                  Undergraduate Systems Engineering &bull; QUEST Nawabshah
                </p>
              </div>

              {/* Core Builder Quote Box */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#DFD5C6] border border-[rgba(26,25,24,0.1)]">
                <p className="font-serif-display text-base sm:text-xl text-[#1A1918] italic leading-snug">
                  &ldquo;The deepest way to understand any system is to build it from first principles. I connect foundational computer systems principles with practical AI to create fast, reliable software.&rdquo;
                </p>
                <span className="text-[10px] font-mono-code text-[#78746D] block mt-2">
                  — {profile?.name ?? 'Ilyan Khan'}, {profile?.title ?? '2nd Year Computer Systems Engineering'}
                </span>
              </div>

              {/* Core Principles Breakdown */}
              <div className="space-y-2.5 sm:space-y-3 text-xs font-sans-clean text-[#1A1918]">
                <div className="p-3 rounded-lg bg-[rgba(26,25,24,0.04)] border border-[rgba(26,25,24,0.08)]">
                  <strong className="font-mono-code text-[11px] uppercase text-[#1A1918] block mb-1">
                    1. First-Principles Exploration
                  </strong>
                  <p className="text-[#78746D] leading-relaxed">
                    Rather than relying solely on high-level APIs, I dive into fine-tuning open-source models (LoRA/PEFT), analyzing dataset representations on Hugging Face, and writing low-level C++ algorithms to master runtime execution and memory efficiency.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[rgba(26,25,24,0.04)] border border-[rgba(26,25,24,0.08)]">
                  <strong className="font-mono-code text-[11px] uppercase text-[#1A1918] block mb-1">
                    2. Deterministic &amp; Useful Software
                  </strong>
                  <p className="text-[#78746D] leading-relaxed">
                    From student management systems to AST security firewalls for LLMs, I prioritize software that is fast, mathematically verifiable, and practically useful in real hands.
                  </p>
                </div>
              </div>

              {/* Footer Link */}
              <div className="pt-3 border-t border-[rgba(26,25,24,0.12)]">
                <a
                  href={profile?.githubUrl ?? 'https://github.com/Ilyan321'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono-code bg-[#1A1918] text-[#F3EFEA] font-semibold hover:bg-black transition-colors"
                >
                  <GithubIcon size={13} />
                  <span>Inspect All Repositories on GitHub ↗</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* ✦ NETWORK MODAL (WARM SAND / LIGHT THEME)                           */}
      {/* =================================================================== */}
      <AnimatePresence>
        {showNetworkModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNetworkModal(false)}
              className="fixed inset-0 bg-[#1A1918]/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragDirectionLock
              dragSnapToOrigin
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.75 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setShowNetworkModal(false);
                }
              }}
              className="relative w-full max-w-md sand-card p-5 sm:p-7 space-y-4 sm:space-y-5 shadow-2xl z-10 border border-[#1A1918]/20 max-h-[88vh] sm:max-h-[90vh] overflow-y-auto rounded-t-[1.75rem] rounded-b-none sm:rounded-[1.75rem] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              {/* Mobile Drag Indicator & Touch Area */}
              <div className="w-full flex justify-center pt-0 pb-3 -mt-2 sm:hidden cursor-grab active:cursor-grabbing touch-none select-none">
                <div className="w-12 h-1.5 rounded-full bg-[#1A1918]/25" />
              </div>

              <button
                onClick={() => setShowNetworkModal(false)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 text-[#78746D] hover:text-[#1A1918] rounded-full bg-[rgba(26,25,24,0.06)] hover:bg-[rgba(26,25,24,0.12)] transition-colors cursor-pointer"
                aria-label="Close Network Modal"
              >
                <XIcon size={18} />
              </button>

              <div className="space-y-1 pr-8">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D] font-medium">
                  04 / GLOBAL NETWORK
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl text-[#1A1918] font-normal tracking-tight">
                  Find me online.
                </h2>
                <p className="text-xs font-sans-clean text-[#78746D]">
                  Open-source code, research models &amp; professional profiles.
                </p>
              </div>

              <div className="space-y-2.5 font-mono-code text-xs">
                <a
                  href={profile?.githubUrl ?? 'https://github.com/Ilyan321'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#DFD5C6] border border-[rgba(26,25,24,0.1)] text-[#1A1918] hover:border-[#1A1918] hover:bg-[#D5CBB9] active:bg-[#CFC3B0] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon size={15} />
                    <span className="font-sans-clean font-semibold text-xs">GitHub Profile</span>
                  </div>
                  <span className="text-[11px] text-[#78746D] group-hover:text-[#1A1918] flex items-center gap-1">
                    <span>@Ilyan321</span>
                    <span>↗</span>
                  </span>
                </a>

                <a
                  href={profile?.linkedinUrl ?? 'https://linkedin.com/in/ilyan-khan-480341359'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#DFD5C6] border border-[rgba(26,25,24,0.1)] text-[#1A1918] hover:border-[#1A1918] hover:bg-[#D5CBB9] active:bg-[#CFC3B0] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon size={15} />
                    <span className="font-sans-clean font-semibold text-xs">LinkedIn Network</span>
                  </div>
                  <span className="text-[11px] text-[#78746D] group-hover:text-[#1A1918] flex items-center gap-1">
                    <span>Connect</span>
                    <span>↗</span>
                  </span>
                </a>

                <a
                  href={profile?.huggingfaceUrl ?? 'https://huggingface.co/Ilyankhan69'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#DFD5C6] border border-[rgba(26,25,24,0.1)] text-[#1A1918] hover:border-[#1A1918] hover:bg-[#D5CBB9] active:bg-[#CFC3B0] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">🤗</span>
                    <span className="font-sans-clean font-semibold text-xs">Hugging Face Hub</span>
                  </div>
                  <span className="text-[11px] text-[#78746D] group-hover:text-[#1A1918] flex items-center gap-1">
                    <span>@Ilyankhan69</span>
                    <span>↗</span>
                  </span>
                </a>

                <a
                  href="/CV.pdf"
                  download
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#1A1918] text-[#F3EFEA] hover:bg-black active:bg-neutral-900 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <FileTextIcon size={15} />
                    <span className="font-sans-clean font-semibold text-xs">Download Resume (PDF)</span>
                  </div>
                  <span className="text-xs text-[#DFD5C6] group-hover:translate-y-0.5 transition-transform">
                    ↓
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* ✦ CONTACT DRAWER / MODAL ✦                                          */}
      {/* =================================================================== */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
              className="fixed inset-0 bg-[#1A1918]/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragDirectionLock
              dragSnapToOrigin
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.75 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setShowContactModal(false);
                }
              }}
              className="relative w-full max-w-md sand-card-dark p-5 sm:p-7 space-y-4 sm:space-y-5 shadow-2xl z-10 border border-white/10 rounded-t-[1.75rem] rounded-b-none sm:rounded-[1.75rem] max-h-[88vh] sm:max-h-[90vh] overflow-y-auto pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              {/* Mobile Drag Indicator & Touch Area */}
              <div className="w-full flex justify-center pt-0 pb-3 -mt-2 sm:hidden cursor-grab active:cursor-grabbing touch-none select-none">
                <div className="w-12 h-1.5 rounded-full bg-white/30" />
              </div>

              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 text-[#A39E95] hover:text-white rounded-full bg-white/[0.05] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <XIcon size={18} />
              </button>

              <div className="pr-8">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#A39E95]">
                  DIRECT CONTACT
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl text-[#F3EFEA] font-normal mt-1">
                  Let&apos;s connect.
                </h2>
                <p className="text-xs font-sans-clean text-[#A39E95] mt-0.5">
                  Open for software engineering internships, AI research initiatives, and technical collaborations.
                </p>
              </div>

              <div className="space-y-2.5 font-mono-code text-xs">
                <a
                  href={`mailto:${profile?.email ?? 'ilyaankhan342@gmail.com'}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#262523] border border-white/10 text-[#F3EFEA] hover:border-emerald-400 active:bg-[#1f1e1c] transition-colors"
                >
                  <span className="text-[#A39E95]">Email:</span>
                  <span className="text-emerald-400 font-semibold truncate pl-2">{profile?.email ?? 'ilyaankhan342@gmail.com'}</span>
                </a>

                <a
                  href="https://wa.me/923213379342"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#262523] border border-white/10 text-[#F3EFEA] hover:border-cyan-400 active:bg-[#1f1e1c] transition-colors"
                >
                  <span className="text-[#A39E95]">WhatsApp:</span>
                  <span className="text-cyan-400 font-semibold">+92 321 3379342</span>
                </a>

                <a
                  href="/CV.pdf"
                  download
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#262523] border border-white/10 text-[#F3EFEA] hover:border-purple-400 active:bg-[#1f1e1c] transition-colors"
                >
                  <span className="text-[#A39E95]">Official CV:</span>
                  <span className="text-purple-300 font-semibold">Download PDF ↓</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* ✦ ABOUT & ACADEMICS DRAWER / MODAL ✦                                */}
      {/* =================================================================== */}
      <AnimatePresence>
        {showAboutModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAboutModal(false)}
              className="fixed inset-0 bg-[#1A1918]/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragDirectionLock
              dragSnapToOrigin
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.75 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setShowAboutModal(false);
                }
              }}
              className="relative w-full max-w-2xl sand-card p-5 sm:p-7 space-y-4 sm:space-y-5 shadow-2xl z-10 border border-[#1A1918]/20 max-h-[88vh] sm:max-h-[90vh] overflow-y-auto rounded-t-[1.75rem] rounded-b-none sm:rounded-[1.75rem] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              {/* Mobile Drag Indicator & Touch Area */}
              <div className="w-full flex justify-center pt-0 pb-3 -mt-2 sm:hidden cursor-grab active:cursor-grabbing touch-none select-none">
                <div className="w-12 h-1.5 rounded-full bg-[#1A1918]/25" />
              </div>

              <button
                onClick={() => setShowAboutModal(false)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 text-[#78746D] hover:text-[#1A1918] rounded-full bg-[rgba(26,25,24,0.06)] hover:bg-[rgba(26,25,24,0.12)] transition-colors cursor-pointer"
              >
                <XIcon size={18} />
              </button>

              <div className="pr-8">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#78746D]">
                  ACADEMIC &amp; CAREER PROFILE
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl text-[#1A1918] font-normal mt-1">
                  About {profile?.name ?? 'Ilyan Khan'}
                </h2>
                <p className="text-xs font-sans-clean text-[#78746D] mt-0.5 leading-relaxed">
                  Undergraduate Computer Systems Engineer at QUEST Nawabshah, Sindh, Pakistan.
                </p>
              </div>

              {/* Semester CGPA Breakdown */}
              <div className="space-y-2.5">
                <h4 className="font-mono-code text-[11px] text-[#78746D] uppercase font-semibold">
                  QUEST Nawabshah Academic Transcript
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-lg bg-[#DFD5C6] border border-[rgba(26,25,24,0.08)]">
                    <span className="text-[9px] font-mono-code text-[#78746D] block">1ST SEMESTER</span>
                    <span className="text-sm font-bold font-sans-clean text-[#1A1918]">3.13 / 4.00</span>
                    <span className="text-[10px] font-mono-code text-[#78746D] block">78.25%</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#DFD5C6] border border-[rgba(26,25,24,0.08)]">
                    <span className="text-[9px] font-mono-code text-[#78746D] block">2ND SEMESTER</span>
                    <span className="text-sm font-bold font-sans-clean text-[#1A1918]">3.05 / 4.00</span>
                    <span className="text-[10px] font-mono-code text-[#78746D] block">76.25%</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#1A1918] text-[#F3EFEA]">
                    <span className="text-[9px] font-mono-code text-[#A39E95] block">1ST YEAR AGGREGATE</span>
                    <span className="text-sm font-bold font-sans-clean text-white">3.10 / 4.00</span>
                    <span className="text-[10px] font-mono-code text-emerald-400 block">77.50% Official</span>
                  </div>
                </div>
              </div>

              {/* 4 Internships */}
              <div className="space-y-2 pt-1">
                <h4 className="font-mono-code text-[11px] text-[#78746D] uppercase font-semibold">
                  4 Industry Internships
                </h4>
                <div className="divide-y divide-[rgba(26,25,24,0.12)] text-xs font-sans-clean">
                  <div className="py-2 flex justify-between items-center">
                    <div>
                      <strong className="font-semibold text-[#1A1918] block text-xs">IntelliVerse</strong>
                      <span className="text-[11px] text-[#78746D]">Python GenAI Developer Intern</span>
                    </div>
                    <span className="font-mono-code text-[10px] text-[#78746D]">Mar – May 2026</span>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <div>
                      <strong className="font-semibold text-[#1A1918] block text-xs">Arch Technologies</strong>
                      <span className="text-[11px] text-[#78746D]">Software Engineer Intern (C++)</span>
                    </div>
                    <span className="font-mono-code text-[10px] text-[#78746D]">Jan – Feb 2026</span>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <div>
                      <strong className="font-semibold text-[#1A1918] block text-xs">Coretech Innovations</strong>
                      <span className="text-[11px] text-[#78746D]">Software Engineer Intern</span>
                    </div>
                    <span className="font-mono-code text-[10px] text-[#78746D]">Dec 2025 – Jan 2026</span>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <div>
                      <strong className="font-semibold text-[#1A1918] block text-xs">CodeAlpha</strong>
                      <span className="text-[11px] text-[#78746D]">Software Engineer Intern</span>
                    </div>
                    <span className="font-mono-code text-[10px] text-[#78746D]">Dec 2025</span>
                  </div>
                </div>
              </div>

              {/* CV Download CTA */}
              <div className="pt-2">
                <a
                  href="/CV.pdf"
                  download
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-[#1A1918] text-[#F3EFEA] hover:bg-black active:bg-neutral-900 transition-colors group text-xs font-mono-code"
                >
                  <div className="flex items-center gap-2">
                    <FileTextIcon size={14} />
                    <span className="font-sans-clean font-semibold">Download Full Official Resume (PDF)</span>
                  </div>
                  <span className="text-[#DFD5C6] group-hover:translate-y-0.5 transition-transform">↓</span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
