import type { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: number;
  description?: string;
}

/** A single DaisyUI "stat" tile showing an icon, title and formatted value. */
export default function StatCard({ icon, title, value, description }: StatCardProps) {
  return (
    <div className="stats w-full rounded-2xl border border-slate-700/70 bg-slate-800/70 shadow-[0_12px_30px_rgba(2,6,23,0.35)] backdrop-blur-sm">
      <div className="stat">
        <div className="stat-figure text-emerald-400">{icon}</div>
        <div className="stat-title text-slate-300">{title}</div>
        <div className="stat-value text-slate-100">{value.toLocaleString()}</div>
        {description && <div className="stat-desc text-slate-400">{description}</div>}
      </div>
    </div>
  );
}
