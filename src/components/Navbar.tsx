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

  // Close the mobile panel and let React Router handle the navigation
  const handleDirectNavigation = () => close()

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="nav-logo" onClick={handleDirectNavigation}>
          <img src="/images/Logo Horizontal Blanco.png" alt="VV Abogados" height="32" />
        </Link>

        {/* Desktop nav */}
        <nav className="nav-links nav-desktop">
          <Link className="nav-link" to="/" onClick={handleDirectNavigation}>Inicio</Link>
          <Link className="nav-link" to="/areas-de-practica" onClick={handleDirectNavigation}>Áreas</Link>
          <Link className="nav-link" to="/nosotros" onClick={handleDirectNavigation}>Nosotros</Link>
          <Link className="nav-link" to="/noticias" onClick={handleDirectNavigation}>Noticias</Link>
          <Link className="nav-link" to="/firmas-asociadas" onClick={handleDirectNavigation}>Estudios asociados</Link>
          <Link className="button" to="/contacto" onClick={handleDirectNavigation}>Contacto</Link>
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
          <Link className="nav-mobile-link" to="/" onClick={handleDirectNavigation}>Inicio</Link>
          <Link className="nav-mobile-link" to="/areas-de-practica" onClick={handleDirectNavigation}>Áreas</Link>
          <Link className="nav-mobile-link" to="/nosotros" onClick={handleDirectNavigation}>Nosotros</Link>
          <Link className="nav-mobile-link" to="/noticias" onClick={handleDirectNavigation}>Noticias</Link>
          <Link className="nav-mobile-link" to="/firmas-asociadas" onClick={handleDirectNavigation}>Estudios asociados</Link>
          <Link className="button" to="/contacto" onClick={handleDirectNavigation} style={{marginTop:10, width:'100%', justifyContent:'center'}}>Contacto</Link>
        </div>
      )}
    </header>
  )
}
