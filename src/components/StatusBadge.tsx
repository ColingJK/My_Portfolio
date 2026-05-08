interface StatusBadgeProps {
  status: 'online' | 'offline' | 'maintenance' | 'open' | 'remediated' | 'accepted_risk' | 'false_positive' | 'active' | 'expired' | 'in_progress' | 'running' | 'completed' | 'failed';
}

const statusConfig: Record<string, { dot: string; text: string; bg: string }> = {
  online: { dot: 'bg-emerald-400', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  offline: { dot: 'bg-red-400', text: 'text-red-400', bg: 'bg-red-500/10' },
  maintenance: { dot: 'bg-yellow-400', text: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  open: { dot: 'bg-red-400', text: 'text-red-400', bg: 'bg-red-500/10' },
  remediated: { dot: 'bg-emerald-400', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  accepted_risk: { dot: 'bg-yellow-400', text: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  false_positive: { dot: 'bg-gray-400', text: 'text-gray-400', bg: 'bg-gray-500/10' },
  active: { dot: 'bg-emerald-400', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  expired: { dot: 'bg-red-400', text: 'text-red-400', bg: 'bg-red-500/10' },
  in_progress: { dot: 'bg-cyan-400', text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  running: { dot: 'bg-cyan-400', text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  completed: { dot: 'bg-emerald-400', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  failed: { dot: 'bg-red-400', text: 'text-red-400', bg: 'bg-red-500/10' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.offline;
  const label = status.replace(/_/g, ' ');

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono ${config.text} ${config.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
      {label}
    </span>
  );
}
