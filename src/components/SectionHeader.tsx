import { Terminal } from 'lucide-react';

interface SectionHeaderProps {
  id: string;
  command: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ id, command, title, subtitle }: SectionHeaderProps) {
  return (
    <div id={id} className="mb-12 scroll-mt-20">
      <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm mb-2">
        <Terminal className="w-4 h-4" />
        <span>{command}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{title}</h2>
      {subtitle && <p className="mt-2 text-gray-400 max-w-2xl">{subtitle}</p>}
      <div className="mt-4 h-px bg-gradient-to-r from-cyan-500/50 via-cyan-500/20 to-transparent" />
    </div>
  );
}
