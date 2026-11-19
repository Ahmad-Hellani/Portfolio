import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { profile } from '../../data/profile'

const items = [
  { Icon: FaGithub, label: 'GitHub', href: profile.github },
  { Icon: FaLinkedin, label: 'LinkedIn', href: profile.linkedin },
]

export default function Socials() {
  return (
    <div className="flex gap-4 text-2xl text-slate-300">
      {items.map(({ Icon, label, href }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="hover:text-white"><Icon /></a>
      ))}
    </div>
  )
}