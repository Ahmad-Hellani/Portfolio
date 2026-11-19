import { useState } from 'react'
import { FaCheck, FaRegCopy } from 'react-icons/fa6'
import { profile } from '../../data/profile'
import Socials from '../molecules/Socials'

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const copy = () =>
    navigator.clipboard.writeText(profile.email)
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
      .catch(() => {})
  return (
    <footer id="contact" className="mx-auto flex max-w-6xl scroll-mt-20 flex-col items-center gap-5 px-6 py-16">
      <h2 className="text-3xl font-bold">Let's work together</h2>
      <button onClick={copy} className="flex items-center gap-2 rounded-md border border-slate-700 px-4 py-2 font-mono text-sm hover:border-slate-500">
        {copied ? <FaCheck className="text-emerald-400" aria-hidden /> : <FaRegCopy aria-hidden />}
        {copied ? 'Copied!' : profile.email}
      </button>
      <Socials />
    </footer>
  )
}