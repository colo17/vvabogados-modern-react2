import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const OFFICE_IMAGES = [
  '/images/team1.jpg',
  '/images/team2.jpg',
  '/images/team3.jpg',
  '/images/team4.jpg',
  '/images/team5.jpg',
  '/images/team6.jpg'
]

interface HeroProps {
  showAreasButton?: boolean;
  pageTitle?: string;
  hideContactButton?: boolean;
}

export default function Hero({ showAreasButton = false, pageTitle, hideContactButton = false }: HeroProps){
  // Get starting image index based on page
  const getStartingImageIndex = (title?: string) => {
    switch (title) {
      case 'Áreas de Práctica': return 1
      case 'Nosotros': return 2
      case 'Noticias': return 3
      case 'Contacto': return 4
      case 'Firmas Asociadas': return 5
      default: return 0 // Home page starts with first image
    }
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(getStartingImageIndex(pageTitle))
  const [animationKey, setAnimationKey] = useState(0)

  // Update starting image when page changes
  useEffect(() => {
    setCurrentImageIndex(getStartingImageIndex(pageTitle))
  }, [pageTitle])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % OFFICE_IMAGES.length
      )
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  // Trigger animation on route changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1)
  }, [pageTitle])

  useEffect(() => {
    const heroElement = document.getElementById('inicio')
    if (!heroElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setAnimationKey(prev => prev + 1)
          }
        })
      },
      { 
        threshold: 0.5,
        rootMargin: '-10% 0px -10% 0px'
      }
    )

    observer.observe(heroElement)

    return () => {
      observer.unobserve(heroElement)
    }
  }, [])

  return (
    <section id="inicio" className="hero hero-animated hero-carousel">
      {/* Image Carousel Background */}
      <div className="hero-carousel-container">
        {OFFICE_IMAGES.map((image, index) => (
          <div
            key={index}
            className={`hero-carousel-slide ${
              index === currentImageIndex ? 'active' : ''
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      
      {/* Dark Overlay for better text readability */}
      <div className="hero-overlay" />
      
      {/* Content */}
      <div className="container hero-content">
        <div key={`logo-${animationKey}`} className="hero-logo hero-logo-animated">
          <img 
            src="/images/Logo Horizontal Blanco.png" 
            alt="VV Abogados" 
            className="hero-logo-desktop"
          />
          <img 
            src="/images/Logo Vertical Blanco.png" 
            alt="VV Abogados" 
            className="hero-logo-mobile"
          />
        </div>
        {pageTitle ? (
          <h1 key={`title-${animationKey}`} className="hero-text-animated" style={{fontSize: '48px', fontWeight: '800', margin: '0 0 40px', color: '#ffffff'}}>
            {pageTitle}
          </h1>
        ) : (
          <p key={`text-${animationKey}`} className="hero-text-animated">Nuestro compromiso con la excelencia en la protección de la Propiedad Intelectual define cada uno de nuestros pasos, abordamos cada desafío con determinación y pasión.</p>
        )}
        <div key={`cta-${animationKey}`} className="hero-cta hero-cta-animated">
          {!hideContactButton && (
            <Link to="/contacto" className="button">Agendar consulta</Link>
          )}
          {showAreasButton && (
            <Link to="/areas-de-practica" className="button button--ghost">Áreas de práctica</Link>
          )}
        </div>
      </div>
    </section>
  )
}
