import React, { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const AREAS = [
  {
    title: 'Registro de Marcas y Patentes',
    desc: 'Ambos registros aseguran que los derechos de propiedad intelectual sean reconocidos y protegidos legalmente, fortaleciendo la posición en el mercado y facilitando la defensa contra infracciones.',
    icon: 'M5 12h14M12 5v14'
  },
  {
    title: 'Derechos de Autor',
    desc: 'El servicio de protección del derecho de autor se encarga de resguardar las creaciones originales de una persona, como obras literarias, artísticas, musicales o científicas, contra el uso no autorizado.',
    icon: 'M4 8h16M4 16h10'
  },
  {
    title: 'Registro de Marca en Aduana',
    desc: 'Al registrar una marca en aduana, se facilita la vigilancia y el control sobre productos importados y exportados, garantizando que solo los productos genuinos sean comercializados, y se ayuda a prevenir la entrada de falsificaciones al mercado.',
    icon: 'M12 2l3 7h7l-5.5 4 2.1 7L12 16 5.4 20 7.5 13 2 9h7z'
  },
  {
    title: 'Auditoría de Activos de PI',
    desc: 'El servicio de auditoría o due diligence sobre activos de propiedad intelectual evalúa y verifica el estado, valor y legalidad de los activos intangibles de una empresa, como marcas, patentes, derechos de autor y secretos comerciales.',
    icon: 'M3 12h18M3 8h12M3 16h8'
  },
  {
    title: 'Registro de Nombres de Dominio',
    desc: 'El servicio de registro de nombres de dominio facilita la adquisición y administración de direcciones web para una empresa o individuo.',
    icon: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z'
  },
  {
    title: 'Protección de Variedades Vegetales',
    desc: 'El servicio de protección de variedades vegetales asegura los derechos exclusivos sobre nuevas variedades de plantas, protegiendo las innovaciones en la agricultura y horticultura.',
    icon: 'M12 2v20M2 12h20M7 7l10 10M17 7L7 17'
  },
  {
    title: 'Redacción de Contratos',
    desc: 'El servicio de redacción de contratos se encarga de crear documentos legales que formalizan acuerdos entre partes y regulan sus derechos y obligaciones.',
    icon: 'M4 4h16v16H4z M8 8h8M8 12h8M8 16h6'
  },
  {
    title: 'Asesoría Contenciosa en PI',
    desc: 'El servicio de asesoramiento en materia contenciosa para la protección de los derechos de propiedad intelectual ofrece apoyo legal especializado en la resolución de disputas relacionadas con activos intangibles.',
    icon: 'M5 12l5 5L19 7'
  },
  {
    title: 'Combate a la Falsificación y Piratería',
    desc: 'El servicio de combate a la falsificación y piratería se enfoca en proteger los activos de propiedad intelectual de una empresa contra la producción y distribución ilegal de productos falsificados o pirateados.',
    icon: 'M2 12h20M12 2v20'
  },
  {
    title: 'Fashion Law',
    desc: 'Este servicio se centra en proteger la propiedad intelectual en la industria de la moda, como marcas y diseños, y en la redacción de contratos para acuerdos de licencia y distribución. También aborda los derechos laborales para asegurar condiciones justas para los trabajadores y gestiona los aspectos legales de la exportación e importación, garantizando el cumplimiento de normativas y la protección contra falsificaciones.',
    icon: 'M6 20l6-16 6 16M8 14h8'
  },
]

function Icon({ d }:{ d:string }){
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c6a15b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d}/>
    </svg>
  )
}

export default function PracticeAreas(){
  const sectionRef = useScrollAnimation()
  const [currentAreaIndex, setCurrentAreaIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  
  const nextArea = () => {
    setCurrentAreaIndex((prev) => (prev + 1) % AREAS.length)
  }
  
  const prevArea = () => {
    setCurrentAreaIndex((prev) => (prev - 1 + AREAS.length) % AREAS.length)
  }

  const truncateText = (text: string, maxLength: number = 180) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setTouchEnd(null)
    setIsDragging(true)
    setDragOffset(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || !isDragging) return
    
    const currentTouch = e.targetTouches[0].clientX
    const diff = currentTouch - touchStart
    setTouchEnd(currentTouch)
    setDragOffset(diff)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || !isDragging) {
      setIsDragging(false)
      setDragOffset(0)
      return
    }
    
    const distance = touchStart - touchEnd
    const threshold = 50

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        nextArea()
      } else {
        prevArea()
      }
    }
    
    setIsDragging(false)
    setDragOffset(0)
    setTouchStart(null)
    setTouchEnd(null)
  }
  
  return (
    <section id="areas" className="section scroll-animate-right" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Áreas de práctica</h2>
        <p className="section-desc">Servicios prestados en Uruguay y mediante una red de corresponsales en el exterior.</p>
        
        {/* Desktop Grid */}
        <div className="grid cols-3 areas-desktop">
          {AREAS.map((a, index) => {
            const PracticeAreaCard = () => {
              const cardRef = useScrollAnimation()
              
              return (
                <article 
                  className={`card scroll-animate-up`} 
                  key={a.title} 
                  ref={cardRef}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card-body">
                    <div style={{display:'flex',alignItems:'center',gap:12, marginBottom:10}}>
                      <div style={{width:36,height:36,background:'var(--primary)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                          <path d={a.icon}/>
                        </svg>
                      </div>
                      <h3 style={{margin:0,fontSize:18,fontWeight:700,color:'var(--text)'}}>{a.title}</h3>
                    </div>
                    <p style={{margin:0,color:'var(--muted)',lineHeight:1.6}}>{a.desc}</p>
                  </div>
                </article>
              )
            }
            
            return <PracticeAreaCard key={a.title} />
          })}
        </div>
        
        {/* Mobile Carousel */}
        <div className="areas-mobile">
          <div 
            className="mobile-carousel-wrapper swipeable-carousel"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className={`mobile-carousel-track ${isDragging ? 'dragging' : ''}`}
              style={{
                transform: `translateX(calc(${-currentAreaIndex * 100}% + ${dragOffset}px))`
              }}
            >
              {AREAS.map((area, index) => (
                <article key={index} className="card mobile-carousel-item practice-area-mobile-card">
                  <div className="card-body">
                    <div className="practice-area-mobile-header">
                      <div className="practice-area-mobile-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                          <path d={area.icon}/>
                        </svg>
                      </div>
                      <h3 className="practice-area-mobile-title">
                        {area.title}
                      </h3>
                    </div>
                    <p className="practice-area-mobile-desc">
                      {truncateText(area.desc)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          
          <div className="mobile-carousel-dots">
            {AREAS.map((_, index) => (
              <button
                key={index}
                className={`mobile-carousel-dot ${index === currentAreaIndex ? 'active' : ''}`}
                onClick={() => setCurrentAreaIndex(index)}
                aria-label={`Ir al área ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
