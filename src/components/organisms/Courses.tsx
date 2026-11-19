import { FiExternalLink } from 'react-icons/fi'
import { courses, education } from '../../data/courses'
import type { Course } from '../../types'

const card = 'flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900 p-5'

function CourseCard({ c }: { c: Course }) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-emerald-400">{c.title}</h3>
        <span className="flex shrink-0 items-center gap-1.5 text-sm text-slate-400">
          {c.provider}
          {c.url && <FiExternalLink aria-hidden />}
        </span>
      </div>
      <p className="text-sm text-slate-300">{c.learned}</p>
      <p className="mt-auto font-mono text-xs text-slate-400">{c.year}</p>
    </>
  )
  return c.url
    ? <a href={c.url} target="_blank" rel="noreferrer" className={`${card} transition hover:border-emerald-500/60`}>{body}</a>
    : <article className={card}>{body}</article>
}

export default function Courses() {
  return (
    <section id="courses" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16">
      <h2 className="mb-8 text-3xl font-bold">Education & Certificates</h2>
      <div className="mb-6 grid gap-6 sm:grid-cols-2">
        {education.map(e => (
          <article key={e.degree} className={card}>
            <h3 className="font-semibold text-emerald-400">{e.degree}</h3>
            <p className="text-sm text-slate-300">{e.school}</p>
            <p className="mt-auto font-mono text-xs text-slate-400">{e.note}</p>
          </article>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map(c => <CourseCard key={c.title} c={c} />)}
      </div>
    </section>
  )
}