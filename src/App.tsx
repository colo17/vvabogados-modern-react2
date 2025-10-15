import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { theme } from './theme'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PracticeAreasPage from './pages/PracticeAreasPage'
import AboutPage from './pages/AboutPage'
import NewsPage from './pages/NewsPage'
import ContactPage from './pages/ContactPage'
import AssociatedFirmsPage from './pages/AssociatedFirmsPage'

function ScrollToTop() {
  const { pathname } = useLocation()

  React.useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    const html = document.documentElement
    
    // Add CSS class to override scroll padding
    html.classList.add('no-scroll-padding')
    
    let scrollAttempts = 0
    const maxAttempts = 30

    const forceScrollToTop = () => {
      scrollAttempts++
      
      // Force scroll with all methods
      window.scrollTo(0, 0)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      html.scrollTop = 0
      document.body.scrollTop = 0
      
      // Check if we actually scrolled to top
      const currentScroll = window.scrollY || html.scrollTop
      console.log(`Route change scroll attempt ${scrollAttempts}, scrollY: ${currentScroll}`)
      
      // If we're not at the top and haven't exceeded max attempts, try again
      if (currentScroll > 0 && scrollAttempts < maxAttempts) {
        setTimeout(forceScrollToTop, 16) // ~60fps
      } else {
        console.log(`Scroll complete! Final scrollY: ${currentScroll}`)
        // Remove the CSS class after a delay to restore normal scroll behavior
        setTimeout(() => {
          html.classList.remove('no-scroll-padding')
        }, 1000)
      }
    }

    // Start immediately
    forceScrollToTop()
    
  }, [pathname])

  return null
}

export default function App(){
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="areas-de-practica" element={<PracticeAreasPage />} />
          <Route path="nosotros" element={<AboutPage />} />
          <Route path="noticias" element={<NewsPage />} />
          <Route path="contacto" element={<ContactPage />} />
          <Route path="firmas-asociadas" element={<AssociatedFirmsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
