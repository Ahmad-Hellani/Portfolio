import type { Project } from '../../types'
import Pill from './Pill'

export default function Status({ p }: { p: Project }) {
  const done = p.progress === 100
  return (
    <Pill className={done ? 'border-emerald-500/50 text-emerald-400' : 'border-amber-500/50 text-amber-400'}>
      {p.liveUrl ? 'Live' : done ? 'Complete' : `In progress · ${p.progress}%`}
    </Pill>
  )
}