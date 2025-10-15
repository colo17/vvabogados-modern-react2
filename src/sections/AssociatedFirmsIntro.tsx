import React, { useEffect, useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function AssociatedFirmsIntro(){
  const sectionRef = useScrollAnimation()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 980)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return (
    <section 
      id="estudios-asociados-intro"
      className="section scroll-animate associated-firms-intro" 
      style={{paddingTop: isMobile ? '15px' : '40px', paddingBottom: '40px'}} 
      ref={sectionRef}
    >
      <div className="container">
        <div style={{maxWidth: '800px'}}>
          <span className="badge">Red de Colaboración</span>
          <h2 className="section-title">Estudios Asociados</h2>
          <div style={{marginTop: '28px'}}>
            <p style={{marginBottom: '18px', color: '#6b7a90', lineHeight: '1.7'}}>
              En VV ABOGADOS creemos en la fuerza de la colaboración estratégica. Trabajamos de la mano con estudios jurídicos especializados tanto a nivel nacional como internacional, formando una red sólida de profesionales comprometidos con la excelencia en Propiedad Intelectual.
            </p>
            <p style={{marginBottom: '18px', color: '#6b7a90', lineHeight: '1.7'}}>
              Nuestros estudios asociados nos permiten brindar un servicio integral y especializado, combinando conocimiento local con perspectiva global. Esta red de colaboración estratégica garantiza que nuestros clientes reciban la mejor asesoría jurídica, sin importar la complejidad o el alcance geográfico de sus necesidades.
            </p>
            <p style={{marginBottom: '18px', color: '#6b7a90', lineHeight: '1.7'}}>
              Cada uno de nuestros socios estratégicos comparte nuestros valores de profesionalismo, innovación y compromiso con resultados excepcionales. Juntos, formamos un ecosistema jurídico robusto que nos posiciona como referentes en el sector de Propiedad Intelectual.
            </p>
            <p style={{color: '#6b7a90', lineHeight: '1.7'}}>
              Conoce a continuación los estudios jurídicos que forman parte de nuestra red de colaboración, cada uno especializado en diferentes áreas que complementan y fortalecen nuestros servicios.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}