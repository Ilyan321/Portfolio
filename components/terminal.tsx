'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { ProjectItem, CertificateItem } from '../lib/types';

interface TerminalProps {
  projects: ProjectItem[];
  certificates: CertificateItem[];
}

export function Terminal({ projects, certificates }: TerminalProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [history, setHistory] = React.useState<{type: 'in' | 'out', text: string}[]>([
    { type: 'out', text: 'IlyanOS v1.0.0' },
    { type: 'out', text: 'Type "help" for a list of commands.' }
  ]);
  const [input, setInput] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setHistory(prev => [...prev, { type: 'in', text: `guest@ilyan:~$ ${cmd}` }]);

    let output = '';
    switch (trimmed) {
      case 'help':
        output = 'Available commands: projects, certs, whoami, clear, hire, admin, exit';
        break;
      case 'projects':
        output = projects.map(p => `- ${p.name} (${p.category})`).join('\n');
        break;
      case 'certs':
        output = certificates.map(c => `- ${c.title}`).join('\n');
        break;
      case 'whoami':
        output = 'You are a highly esteemed engineering manager / recruiter evaluating Ilyan Khan for a role.';
        break;
      case 'hire':
        output = 'Great choice. Initiating contact sequence... (Press ESC to close and go to Contact section)';
        break;
      case 'admin':
        output = 'Redirecting to secure portal...';
        setTimeout(() => router.push('/admin'), 1000);
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        setIsOpen(false);
        setInput('');
        return;
      default:
        output = `command not found: ${cmd}`;
    }

    setHistory(prev => [...prev, { type: 'out', text: output }]);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-[90vw] sm:w-[500px] h-[300px] bg-[#1A1918] border border-white/20 rounded-lg shadow-2xl z-[100] flex flex-col font-mono-code text-sm overflow-hidden backdrop-blur-xl"
        >
          {/* Terminal Header */}
          <div className="bg-[#262523] px-4 py-2 border-b border-white/10 flex items-center justify-between cursor-move shrink-0">
            <span className="text-[#A39E95] text-xs">guest@ilyan: ~</span>
            <button onClick={() => setIsOpen(false)} className="text-[#A39E95] hover:text-white transition-colors" aria-label="Close terminal">
              ✕
            </button>
          </div>

          {/* Terminal Body */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-1 text-[#F3EFEA]" onClick={() => inputRef.current?.focus()}>
            {history.map((line, i) => (
              <div key={i} className={line.type === 'in' ? 'text-emerald-400' : 'text-[#A39E95] whitespace-pre-wrap'}>
                {line.text}
              </div>
            ))}
            <div className="flex items-center text-emerald-400 mt-2">
              <span className="mr-2">guest@ilyan:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleCommand(input);
                }}
                className="flex-1 bg-transparent outline-none border-none text-[#F3EFEA] font-mono-code"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
