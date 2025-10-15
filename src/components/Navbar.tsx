import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface NavbarProps {
  scrolled: boolean;
}

export default function Navbar({ scrolled }: NavbarProps){
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(v => !v)
  const close = () => setOpen(false)

  const handleLinkClick = () => {
    close()
  }

  const handleDirectNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    close()
    
    // Prevent default navigation
    e.preventDefault()
    
    const href = e.currentTarget.href
    const path = new URL(href).pathname
    
    console.log('Direct navigation to:', path)
    
    // Force scroll to top BEFORE navigation
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    console.log('Pre-navigation scroll, scrollY:', window.scrollY)
    
    // Navigate using window.location which will cause a full page reload
    setTimeout(() => {
      window.location.href = href
    }, 10)
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="/" className="nav-logo" onClick={handleDirectNavigation}>
          <img src="/images/Logo Horizontal Blanco.png" alt="VV Abogados" height="32" />
        </a>

        {/* Desktop nav */}
        <nav className="nav-links nav-desktop">
          <a className="nav-link" href="/" onClick={handleDirectNavigation}>Inicio</a>
          <a className="nav-link" href="/areas-de-practica" onClick={handleDirectNavigation}>Áreas</a>
          <a className="nav-link" href="/nosotros" onClick={handleDirectNavigation}>Nosotros</a>
          <a className="nav-link" href="/noticias" onClick={handleDirectNavigation}>Noticias</a>
          <a className="nav-link" href="/firmas-asociadas" onClick={handleDirectNavigation}>Estudios asociados</a>
          <a className="button" href="/contacto" onClick={handleDirectNavigation}>Contacto</a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`nav-hamburger ${open ? "is-open" : ""}`}
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={toggle}
        >
          <span/>
          <span/>
          <span/>
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="nav-mobile-panel container">
          <a className="nav-mobile-link" href="/" onClick={handleDirectNavigation}>Inicio</a>
          <a className="nav-mobile-link" href="/areas-de-practica" onClick={handleDirectNavigation}>Áreas</a>
          <a className="nav-mobile-link" href="/nosotros" onClick={handleDirectNavigation}>Nosotros</a>
          <a className="nav-mobile-link" href="/noticias" onClick={handleDirectNavigation}>Noticias</a>
          <a className="nav-mobile-link" href="/firmas-asociadas" onClick={handleDirectNavigation}>Estudios asociados</a>
          <a className="button" href="/contacto" onClick={handleDirectNavigation} style={{marginTop:10, width:'100%', justifyContent:'center'}}>Contacto</a>
        </div>
      )}
    </header>
  )
}
