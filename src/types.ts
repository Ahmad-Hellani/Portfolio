export interface Section {
  title: string
  paragraphs?: string[]
  items?: string[]
}

export interface Project {
  slug: string
  title: string
  category: 'web' | 'mobile' | 'desktop'
  progress: number // 100 = complete
  summary: string
  stack: string[]
  shots: number
  video?: boolean
  liveUrl?: string
  repoUrl?: string // set only for open-source projects
  sections: Section[]
}

export interface Course {
  title: string
  provider: string
  year: number
  learned: string
  url?: string // certificate link; makes the whole card clickable
}

export interface Education {
  degree: string
  school: string
  note: string
}