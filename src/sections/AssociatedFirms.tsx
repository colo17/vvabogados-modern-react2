import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface Firm {
  name: string
  url: string
  img: string
  blurb: string
}

const FIRMS: Firm[] = [
  {
    name: 'LegalMind',
    url: 'https://www.legalmind.com.uy',
    img: '/images/legalmind.webp',
    blurb: 'Fundada por la Dra. María Laura Escudero. Asesoramiento en Derecho Empresarial, Civil, Comercial, Laboral e Internacional. Acompañan a compañías de diversos tamaños con enfoque preventivo y de cumplimiento.'
  },
  {
    name: 'Cauce Consultores',
    url: 'https://www.cauceconsultores.uy',
    img: '/images/cauceconsultores.jpg',
    blurb: 'Dirigido por el Dr. Álvaro Martín da Silva Falcón. Experiencia en litigios, arbitraje y asesoramiento empresarial, incluyendo justicia deportiva (AUF). Trabajo coordinado con equipos internos para resultados efectivos.'
  },
  {
    name: 'Pérez del Castillo',
    url: 'https://www.perezdelcastillo.com',
    img: '/images/perezdelcastillo.webp',
    blurb: 'Dirigido por el Dr. Federico Pérez del Castillo. Especial foco en inversiones, compraventa de empresas (M&A), real estate y asesoramiento sucesorio, combinando visión estratégica y solución práctica de conflictos.'
  },
]

function AssociatedFirmCard({ firm }: { firm: Firm }) {
  const cardRef = useScrollAnimation()

  return (
    <article className="assoc-card scroll-animate-right" ref={cardRef}>
      <div className="assoc-card-image" style={{ backgroundImage: `url(${firm.img})` }} aria-hidden />
      <div className="assoc-card-content">
        <span className="badge badge--tight">Estudios asociados</span>
        <h2 className="assoc-title">{firm.name}</h2>
        <p className="assoc-desc">{firm.blurb}</p>
        <a className="button button--tight" href={firm.url} target="_blank" rel="noreferrer">
          Conocer más
        </a>
      </div>
    </article>
  )
}

export default function AssociatedFirms(){
  const sectionRef = useScrollAnimation();

  return (
    <section
      id="estudios-asociados"
      className="section scroll-animate-right"
      style={{ paddingTop: '80px', paddingBottom: '60px', position: 'relative' }}
      ref={sectionRef}
    >
      <div className="container assoc-list">
        {FIRMS.map((firm) => (
          <AssociatedFirmCard firm={firm} key={firm.name} />
        ))}
      </div>
    </section>
  )
}
