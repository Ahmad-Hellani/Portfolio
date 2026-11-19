import { useEffect } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router'
import Footer from './components/organisms/Footer'
import Hero from './components/organisms/Hero'
import Navbar from './components/organisms/Navbar'
import ProjectGrid from './components/organisms/ProjectGrid'
import ProjectPage from './components/pages/ProjectPage'
import Courses from './components/organisms/Courses'

function Layout() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return (
    <>
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<><Hero /><ProjectGrid /><Courses /></>} />
          <Route path="projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}