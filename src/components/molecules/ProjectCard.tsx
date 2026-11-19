import { Link } from 'react-router'
import { FaArrowRight, FaGithub } from 'react-icons/fa6'
import { FiExternalLink } from 'react-icons/fi'
import type { Project } from '../../types'
import Pill from '../atoms/Pill'
import Status from '../atoms/Status'

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      {p.shots > 0
        ? <img src={`/projects/${p.slug}/1.webp`} alt={`${p.title} screenshot`} loading="lazy" className="aspect-video w-full object-cover" />
        : <div className="aspect-video bg-slate-800" />}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="mr-auto text-lg font-semibold">{p.title}</h3>
          <Status p={p} />
        </div>
        <p className="text-sm text-slate-300">{p.summary}</p>
        <div className="flex flex-wrap gap-2">{p.stack.map(s => <Pill key={s}>{s}</Pill>)}</div>
        <div className="mt-auto flex items-center gap-4 pt-2 text-xl text-slate-300">
          {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" aria-label="Live app" className="hover:text-white"><FiExternalLink /></a>}
          {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noreferrer" aria-label="GitHub repo" className="hover:text-white"><FaGithub /></a>}
          <Link to={`/projects/${p.slug}`} className="ml-auto flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300">
            More <FaArrowRight aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  )
}