import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const NEWS = [
  { title: 'Guía rápida para registrar tu marca en Uruguay', date: '2025-08-12', url: 'https://vvabogados.com.uy/' },
  { title: 'Cómo proteger software y obras digitales: mitos y realidades', date: '2025-07-01', url: 'https://vvabogados.com.uy/' },
  { title: 'Medidas en frontera y observancia aduanera', date: '2025-06-05', url: 'https://vvabogados.com.uy/' },
  { title: 'Innovaciones y tendencias en propiedad intelectual 2025', date: '2025-09-10', url: 'https://vvabogados.com.uy/' },
]

const TESTIMONIALS = [
  {
    quote: 'Excelente trato y orientación clara en cada etapa del proceso de registro.',
    name: 'Cliente del sector tech',
    loc: 'Montevideo, UY'
  },
  {
    quote: 'Nos guiaron con plazos y costos de forma transparente. Resultado impecable.',
    name: 'Emprendimiento de e‑commerce',
    loc: 'Canelones, UY'
  },
  {
    quote: 'Equipo muy profesional y ágil. Recomendamos su servicio de marcas.',
    name: 'Estudio de diseño',
    loc: 'Punta del Este, UY'
  }
]

export default function TestimonialsNews(){
  const sectionRef = useScrollAnimation()
  
  return (
    <section id="noticias" className="section scroll-animate" style={{paddingTop:0}} ref={sectionRef}>
      <div className="container grid cols-2">
        <div>
          <span className="badge">Testimonios</span>
          <h2 className="section-title">Casos de Éxito</h2>
          <div className="grid">
            {TESTIMONIALS.map((t, i) => (
              <div className="card" key={i}>
                <div className="card-body">
                  <p style={{fontSize:18, marginTop:0}}>
                    “{t.quote}”
                  </p>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{width:40,height:40,borderRadius:999,background:'#e8eef6'}}/>
                    <div>
                      <div style={{fontWeight:700}}>{t.name}</div>
                      <div style={{color:'#6b7a90',fontSize:14}}>{t.loc}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="badge">Noticias</span>
          <h2 className="section-title">Actualidad</h2>
          <div className="grid">
            {NEWS.map(n => (
              <a className="card--clickable" href={n.url} key={n.title} target="_blank" rel="noreferrer">
                <div className="card-body">
                  <div style={{fontSize:14,color:'#6b7a90'}}>{new Date(n.date).toLocaleDateString('es-UY')}</div>
                  <h3 style={{margin:'6px 0 0'}}>{n.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
