# Ahmad Hellani | Portfolio

Personal portfolio of Ahmad Hellani, a full-stack web and Flutter developer. It showcases web, mobile and desktop projects with screenshots, demo videos and detailed case studies, plus education and certificates.

Some projects are private, so each one has its own detail page with images, videos and an architecture write-up. A GitHub link appears only on open-source projects.

## Tech stack

- React + TypeScript, built with Vite
- Tailwind CSS v4
- React Router
- react-icons
- Deployed on Vercel

There is no backend. All content is static and lives in typed data files.

## Getting started

```bash
yarn install
yarn dev        # start the dev server
yarn build      # type-check and build for production
yarn preview    # preview the production build
```

## Project structure

```
src/
  components/
    atoms/        Pill, Status
    molecules/    ProjectCard, Socials
    organisms/    Navbar, Hero, ProjectGrid, Courses, Footer
    pages/        ProjectPage
  data/
    profile.ts    name, bio, email and social links
    projects.ts   all projects and their detail sections
    courses.ts    education and certificates
  types.ts
public/
  me.webp         profile photo
  projects/<slug>/
    1.webp, 2.webp, ...   screenshots (1.webp is the card cover)
    demo.mp4              optional demo video
```

## Adding a project

1. Add one object to the array in `src/data/projects.ts`.
2. Put its media in `public/projects/<slug>/`:
   - screenshots named `1.webp`, `2.webp`, and so on
   - an optional `demo.mp4`
3. Set `shots` to the number of screenshots, and `video: true` if there is a video.
4. For open-source projects only, add `repoUrl`. The GitHub icon appears automatically.

The card, the category filter and the detail page at `/projects/<slug>` are generated from that one object.

## Media guidelines

- Use WebP for images.
- Keep each video under about 5 MB, or host longer demos on YouTube and embed them.
- Never commit source code, keys or secrets from private projects. Only screenshots and videos belong in this repository.

## Deployment

The repository is connected to Vercel, which deploys on every push to the main branch. `vercel.json` rewrites all routes to `index.html`, so direct links such as `/projects/mizan` work.

## Notes

- The React Compiler is enabled through the Vite template.
- To upgrade linting, see the typescript-eslint docs on type-aware rules.