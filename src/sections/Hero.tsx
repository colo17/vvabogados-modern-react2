import React, { useState, useEffect } from 'react'

const OFFICE_IMAGES = [
  '/images/Oficina1.jpg',
  '/images/Oficina2.jpg',
  '/images/Oficina3.jpg',
  '/images/Oficina4.jpg'
]

export default function Hero(){
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % OFFICE_IMAGES.length
      )
    }, 2500)

    return () => clearInterval(interval)
  }, [])

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
        <p key={`text-${animationKey}`} className="hero-text-animated">Nuestro compromiso con la excelencia en la protección de la Propiedad Intelectual define cada uno de nuestros pasos, abordamos cada desafío con determinación y pasión.</p>
        <div key={`cta-${animationKey}`} className="hero-cta hero-cta-animated">
          <a href="#contacto" className="button">Agendar consulta</a>
          <a href="#areas" className="button button--ghost">Áreas de práctica</a>
        </div>
      </div>
    </section>
  )
}
