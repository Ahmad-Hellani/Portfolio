import { useState } from 'react'
import { projects } from '../../data/projects'
import ProjectCard from '../molecules/ProjectCard'

const filters = ['all', 'web', 'mobile', 'desktop'] as const

export default function ProjectGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>('all')
  const shown = projects.filter(p => active === 'all' || p.category === active)
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16">
      <h2 className="mb-8 text-3xl font-bold">Projects</h2>
      <div className="grid gap-8 md:grid-cols-[11rem_1fr]">
        <div className="flex gap-2 overflow-x-auto md:flex-col">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={`rounded-lg border bg-slate-900 px-4 py-2.5 text-left text-sm font-medium capitalize ${active === f ? 'border-emerald-500 text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {shown.map(p => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </div>
    </section>
  )
}