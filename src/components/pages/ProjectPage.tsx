import { Link, Navigate, useParams } from "react-router";
import { FaArrowLeft, FaGithub } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { projects } from "../../data/projects";
import Pill from "../atoms/Pill";
import Status from "../atoms/Status";

const btn =
  "inline-flex items-center gap-2 rounded-md border border-slate-700 px-3 py-1.5 text-sm hover:border-slate-500";

export default function ProjectPage() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  if (!p) return <Navigate to="/" replace />;

  return (
    <article className="mx-auto max-w-3xl space-y-10 px-6 py-16">
      <Link
        to="/#projects"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
      >
        <FaArrowLeft aria-hidden /> All projects
      </Link>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-bold">{p.title}</h1>
          <Status p={p} />
        </div>
        <p className="text-lg text-slate-300">{p.summary}</p>
        <div className="flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <Pill key={s}>{s}</Pill>
          ))}
        </div>
        <div className="flex gap-3">
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noreferrer"
              className={btn}
            >
              <FiExternalLink aria-hidden /> Live app
            </a>
          )}
          {p.repoUrl && (
            <a
              href={p.repoUrl}
              target="_blank"
              rel="noreferrer"
              className={btn}
            >
              <FaGithub aria-hidden /> Source code
            </a>
          )}
        </div>
      </header>

      {p.video && (
        <video
          src={`/projects/${p.slug}/demo.mp4`}
          controls
          muted
          playsInline
          preload="none"
          poster={p.shots ? `/projects/${p.slug}/1.webp` : undefined}
          className="w-full rounded-lg"
        />
      )}
      {p.shots > 0 ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Screenshots</h2>
          <div
            className={`grid gap-4 ${p.category === "mobile" ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2"}`}
          >
            {Array.from({ length: p.shots }, (_, i) => (
              <a
                key={i}
                href={`/projects/${p.slug}/${i + 1}.webp`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={`/projects/${p.slug}/${i + 1}.webp`}
                  alt={`${p.title} screenshot ${i + 1}`}
                  loading="lazy"
                  className="rounded-lg"
                />
              </a>
            ))}
          </div>
        </section>
      ) : (
        import.meta.env.DEV && (
          <p className="rounded-lg border border-dashed border-slate-700 p-6 text-center text-sm text-slate-500">
            Dev only: set shots / video in projects.ts and add files to
            public/projects/{p.slug}/
          </p>
        )
      )}

      {p.sections.map((s) => (
        <section key={s.title} className="space-y-3">
          <h2 className="text-xl font-semibold">{s.title}</h2>
          {s.paragraphs?.map((t) => (
            <p key={t} className="text-slate-300">
              {t}
            </p>
          ))}
          {s.items && (
            <ul className="list-disc space-y-2 pl-5 text-slate-300">
              {s.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}
