import React, { useRef, useState, useEffect } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const FIRMS = [
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

export default function AssociatedFirms(){
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const sectionRef = useScrollAnimation();

  const calcIndex = () => {
    if (!scrollRef.current) return 0;
    const { scrollLeft, clientWidth } = scrollRef.current;
    return Math.round(scrollLeft / Math.max(clientWidth, 1));
  };

  const onScroll = () => setIndex(calcIndex());

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToIndex = (i:number) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollTo({ left: i * clientWidth, behavior: 'smooth' });
  };

  const scroll = (direction:'left'|'right') => {
    const next = Math.min(FIRMS.length - 1, Math.max(0, index + (direction === 'left' ? -1 : 1)));
    scrollToIndex(next);
  };

  const atStart = index <= 0;
  const atEnd = index >= FIRMS.length - 1;

  return (
    <section id="estudios-asociados" className="section scroll-animate-right" style={{paddingTop:0,paddingBottom:0,position:'relative'}} ref={sectionRef}>
      {!atStart && (
        <button className="assoc-arrow left" onClick={()=>scroll('left')} aria-label="Anterior">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}
      <div className="assoc-wrapper" ref={scrollRef}>
        {FIRMS.map((f) => (
          <section className="assoc-panel" key={f.name}>
            <div className="assoc-image" style={{backgroundImage:`url(${f.img})`}} aria-hidden />
            <div className="assoc-content container">
              <span className="badge">Estudios asociados</span>
              <h2 className="assoc-title">{f.name}</h2>
              <p className="assoc-desc">{f.blurb}</p>
              <a className="button" href={f.url} target="_blank" rel="noreferrer">Conocer más</a>
            </div>
          </section>
        ))}
      </div>
      {!atEnd && (
        <button className="assoc-arrow right" onClick={()=>scroll('right')} aria-label="Siguiente">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      )}

      <div className="assoc-dots">
        {FIRMS.map((_, i) => (
          <button
            key={i}
            className={`assoc-dot ${index === i ? 'is-active' : ''}`}
            aria-label={`Ir al panel ${i+1}`}
            onClick={() => scrollToIndex(i)}
          />
        ))}
      </div>
    </section>
  )
}
