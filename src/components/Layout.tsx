import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Hero from '../sections/Hero'
import Footer from '../sections/Footer'

const Layout: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()


  
  // Show areas button only on the home page
  const isHomePage = location.pathname === '/'
  
  // Hide contact button on contact page
  const isContactPage = location.pathname === '/contacto'
  
  // Get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/areas-de-practica':
        return 'Áreas de Práctica'
      case '/nosotros':
        return 'Nosotros'
      case '/noticias':
        return 'Noticias'
      case '/contacto':
        return 'Contacto'
      case '/firmas-asociadas':
        return 'Firmas Asociadas'
      default:
        return undefined // Home page - no title, show original text
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Navbar scrolled={scrolled} />
      <Hero showAreasButton={isHomePage} pageTitle={getPageTitle()} hideContactButton={isContactPage} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout