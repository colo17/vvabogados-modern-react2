import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function WhyUs(){
  const sectionRef = useScrollAnimation()
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  
  const isMainPage = location.pathname === '/'
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 980)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Mobile main page content
  if (isMobile && isMainPage) {
    return (
      <section 
        id="por-que-nosotros" 
        className="section scroll-animate-left" 
        style={{paddingTop: '80px', paddingBottom: '40px'}} 
        ref={sectionRef}
      >
        <div className="container grid cols-2">
          <div>
            <h2 className="section-title">Nosotros</h2>
            <p className="section-desc">
              Nuestro compromiso con la excelencia en la protección de la Propiedad Intelectual define cada uno de nuestros pasos. Abordamos cada desafío con determinación y pasión, convencidos de que salvaguardar los derechos intelectuales es fundamental para el triunfo de quienes dedican su creación, ingenio y esfuerzo.
            </p>
            <p style={{fontWeight: 'bold', marginTop: '24px', color: '#6441a4'}}>
              Dra. Verónica Vanrell
            </p>
          </div>
          <div className="card">
            <img src="/images/Vero Vanrell 1.jpg" alt="Dra. Verónica Vanrell" />
          </div>
        </div>
      </section>
    )
  }
  
  // Default content (desktop or other pages)
  return (
    <section 
      id="por-que-nosotros" 
      className="section scroll-animate-left" 
      style={{paddingTop: '80px', paddingBottom: '40px'}} 
      ref={sectionRef}
    >
      <div className="container grid cols-2">
        <div>
          <h2 className="section-title">¿Por qué nosotros?</h2>
          <p className="section-desc">
            Nuestro compromiso con la excelencia en la protección de la Propiedad Intelectual define cada uno de nuestros pasos. Abordamos cada desafío con determinación y pasión, convencidos de que salvaguardar los derechos intelectuales es fundamental para el triunfo de quienes dedican su creación, ingenio y esfuerzo.
          </p>
          <p className="section-desc">
            Nos especializamos en ofrecer soluciones integrales y personalizadas, adaptándonos a las necesidades específicas de cada cliente. Nuestra experiencia y dedicación nos permiten anticiparnos a los retos emergentes y garantizar una protección eficaz y eficiente de los derechos intelectuales.
          </p>
          <p className="section-desc">
            Elegirnos significa optar por un equipo comprometido con la excelencia, la innovación y la integridad en cada acción que emprendemos.
          </p>
          <p style={{fontWeight: 'bold', marginTop: '24px', color: '#6441a4'}}>
            Dra. Verónica Vanrell
          </p>
        </div>
        <div className="card">
          <img src="/images/Vero Vanrell 1.jpg" alt="Dra. Verónica Vanrell" />
        </div>
      </div>
    </section>
  )
}