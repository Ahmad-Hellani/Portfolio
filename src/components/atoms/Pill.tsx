import type { ReactNode } from 'react'

export default function Pill({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`rounded-full border border-slate-700 px-2.5 py-0.5 font-mono text-xs ${className}`}>{children}</span>
}