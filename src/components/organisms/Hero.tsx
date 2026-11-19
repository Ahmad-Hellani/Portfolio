import { profile } from '../../data/profile'
import Socials from '../molecules/Socials'

export default function Hero() {
  return (
    <section id="about" className="mx-auto flex max-w-6xl scroll-mt-20 flex-col-reverse items-center gap-10 px-6 py-20 md:flex-row">
      <div className="flex-1 space-y-5">
        <p className="font-mono text-sm text-emerald-400">Hi, I'm {profile.name}</p>
        <h1 className="text-4xl font-bold md:text-5xl">{profile.title}</h1>
        <p className="max-w-xl text-slate-300">{profile.bio}</p>
        <Socials />
        <a href="#projects" className="inline-block rounded-md bg-emerald-500 px-4 py-2 font-medium text-slate-950 hover:bg-emerald-400">View projects</a>
      </div>
      <img src="/me.webp" alt={profile.name} className="size-56 rounded-full object-cover ring-2 ring-emerald-500/60 md:size-72" />
    </section>
  )
}