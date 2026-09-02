
'use client';
import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectItem, ProfileData, CertificateItem } from '../lib/types';
import { ExternalLinkIcon, GithubIcon, LinkedinIcon, FileTextIcon, XIcon } from './ui/icons';

interface HomeModalsProps {
  projects: ProjectItem[];
  profile: ProfileData | null;
  certificates: CertificateItem[];
  selectedProject: ProjectItem | null;
  setSelectedProject: (p: ProjectItem | null) => void;
  selectedCert: CertificateItem | null;
  setSelectedCert: (c: CertificateItem | null) => void;
  showDirectoryModal: boolean;
  setShowDirectoryModal: (b: boolean) => void;
  directoryTab: 'projects' | 'certificates';
  setDirectoryTab: (t: 'projects' | 'certificates') => void;
  showContactModal: boolean;
  setShowContactModal: (b: boolean) => void;
  showAboutModal: boolean;
  setShowAboutModal: (b: boolean) => void;
  showPhilosophyModal: boolean;
  setShowPhilosophyModal: (b: boolean) => void;
  showNetworkModal: boolean;
  setShowNetworkModal: (b: boolean) => void;
}

export function HomeModals({
  projects, profile, certificates,
  selectedProject, setSelectedProject,
  selectedCert, setSelectedCert,
  showDirectoryModal, setShowDirectoryModal,
  directoryTab, setDirectoryTab,
  showContactModal, setShowContactModal,
  showAboutModal, setShowAboutModal,
  showPhilosophyModal, setShowPhilosophyModal,
  showNetworkModal, setShowNetworkModal
}: HomeModalsProps) {

  const [sqlQuery, setSqlQuery] = React.useState("SELECT * FROM users;");
  const [astResult, setAstResult] = React.useState<{status: 'idle' | 'safe' | 'danger', message: string}>({status: 'idle', message: 'Ready to parse.'});
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const [copiedPhone, setCopiedPhone] = React.useState(false);
  const [projectFilter, setProjectFilter] = React.useState<'All' | 'AI/ML' | 'Systems & Backend' | 'Full Stack'>('All');


  const filteredProjects = projects.filter(p => {
    if (projectFilter === 'All') return true;
    if (projectFilter === 'AI/ML') return p.tag.includes('AI') || p.tag.includes('Machine Learning') || p.tag.includes('NLP') || p.category.includes('AI') || p.category.includes('ML');
    if (projectFilter === 'Systems & Backend') return p.tag.includes('System') || p.tag.includes('C++') || p.category.includes('Memory') || p.category.includes('Backend');
    if (projectFilter === 'Full Stack') return p.tag.includes('Full-Stack') || p.tag.includes('Frontend') || p.tag.includes('Web');
    return true;
  });

  const handleCheckSQL = (query: string) => {
    setSqlQuery(query);
    if (!query.trim()) {
      setAstResult({status: 'idle', message: 'Ready to parse.'});
      return;
    }
    const upper = query.toUpperCase();
    if (upper.includes('DROP') || upper.includes('DELETE') || upper.includes('UPDATE') || upper.includes('INSERT') || upper.includes('ALTER')) {
      setAstResult({status: 'danger', message: 'AST Parser Blocked: Mutation operation detected.'});
    } else if (upper.includes('SELECT')) {
      setAstResult({status: 'safe', message: 'AST Parser Allowed: Read-only query verified.'});
    } else {
      setAstResult({status: 'idle', message: 'Unknown query type.'});
    }
  }

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  }
  return (
    <>
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
                  {filteredProjects.length === 0 ? (
                    <div className="p-8 text-center flex flex-col items-center justify-center gap-2 border border-dashed border-[#78746D]/30 rounded-xl bg-[#DFD5C6]/50">
                      <span className="text-sm font-mono-code text-[#78746D] tracking-widest uppercase">No Projects Found</span>
                      <span className="text-xs font-sans-clean text-[#78746D]">There are currently no visible projects in the database.</span>
                    </div>
                  ) : (
                    filteredProjects.map((proj) => (
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
                  <Image width={800} height={600}
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
                <button
                  onClick={() => handleCopy(profile?.email ?? 'ilyaankhan342@gmail.com', 'email')}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#262523] border border-white/10 text-[#F3EFEA] hover:border-emerald-400 active:bg-[#1f1e1c] transition-all cursor-pointer relative overflow-hidden"
                >
                  <span className="text-[#A39E95]">Email:</span>
                  <span className="text-emerald-400 font-semibold truncate pl-2">
                    {copiedEmail ? 'Copied to clipboard!' : (profile?.email ?? 'ilyaankhan342@gmail.com')}
                  </span>
                </button>

                <button
                  onClick={() => handleCopy('+92 321 3379342', 'phone')}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#262523] border border-white/10 text-[#F3EFEA] hover:border-cyan-400 active:bg-[#1f1e1c] transition-all cursor-pointer"
                >
                  <span className="text-[#A39E95]">WhatsApp:</span>
                  <span className="text-cyan-400 font-semibold">
                    {copiedPhone ? 'Copied to clipboard!' : '+92 321 3379342'}
                  </span>
                </button>

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

    </>
  );
}
