import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import TeamModal from '../components/TeamModal'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface TeamMember {
  name: string
  role: string
  img: string
  modalImg: string
  formation: string
  jobDescription: string
  secondRole?: string
  secondJobDescription?: string
  linkedinUrl: string
}

const TEAM: TeamMember[] = [
  { 
    name: 'Dra. Verónica Vanrell', 
    role: 'Socia Directora', 
    img: '/images/Vero Vanrell 1.jpg',
    modalImg: '/images/Vero Vanrell 2.jpg',
    formation: 'Abogada egresada de la Facultad de Derecho de la Universidad de la República. Agente de marcas.',
    jobDescription: 'La pasión por lo que hago me impulsa en cada acción que emprendo. Creo firmemente que proteger la propiedad intelectual es un paso esencial hacia el éxito para aquellos que invierten su tiempo, esfuerzo y creatividad.',
    secondRole: 'Socia Directora de GP ABOGADOS',
    secondJobDescription: 'Socia directora desde el 1ro de Diciembre del 2021.',
    linkedinUrl: 'https://www.linkedin.com/in/veronica-vanrell-87863799/'
  },
  { 
    name: 'Dr. Gumer Pérez', 
    role: 'Socio', 
    img: '/images/Gumer Pérez 1.jpg',
    modalImg: '/images/Gumer Pérez 2.jpg',
    formation: 'Abogado egresado de la Facultad de Derecho de la República Oriental del Uruguay.',
    jobDescription: 'Couture decía: «Sin abogados no hay leyes, sin leyes no hay derecho, sin derecho no hay justicia y sin justicia no hay nada», el ejercicio de la abogacía es un pilar fundamental para el estado de derecho, defender los derechos de los ciudadanos y representarlos en situaciones legales de complejidad, es la forma de hacer justicia.',
    secondRole: 'Socio de GP ABOGADOS',
    secondJobDescription: 'Socio fundador desde el 1ro de Diciembre de 2021.',
    linkedinUrl: 'https://www.linkedin.com/company/vv-abogados/'
  },
  { 
    name: 'Esc. Ximena Fossati', 
    role: 'Socia', 
    img: '/images/Xime Fossati 1.jpg',
    modalImg: '/images/Xime Fossati 2.jpg',
    formation: 'Escribana egresada de la Facultad de Derecho de la República Oriental del Uruguay.',
    jobDescription: 'Desde mi rol de escribana, busco generar un espacio de escucha e intercambio personalizado con cada cliente para poder encontrar juntos la mejor solución ante un eventual problema, siempre velando por la seguridad jurídica a la hora de proteger sus intereses.',
    secondRole: 'Asociada de GP ABOGADOS',
    secondJobDescription: 'Asociada desde el 1ro de Diciembre del 2021.',
    linkedinUrl: 'https://www.linkedin.com/in/ximena-fossati-crosta-357a26a9/'
  },
  { 
    name: 'Cra. Yoanna Igoa', 
    role: 'Socia', 
    img: '/images/Yoanna Igoa 1.jpg',
    modalImg: '/images/Yoanna Igoa 2.jpg',
    formation: 'Contadora egresada de la Universidad ORT Uruguay.',
    jobDescription: 'Como contadora cuento con un enfoque único en la protección y gestión de activos intangibles. Mi objetivo es brindarte asesoramiento experto para proteger tus creaciones, innovaciones y marcas comerciales de manera eficiente y rentable.',
    secondRole: 'Asociada de GP ABOGADOS',
    secondJobDescription: 'Asociada desde el 1ro de Diciembre del 2021.',
    linkedinUrl: 'https://www.linkedin.com/in/yoanna-igoa-43b7528/'
  },
  { 
    name: 'Paolo Duce', 
    role: 'Departamento Jurídico', 
    img: '/images/Pao Duce 1.jpg',
    modalImg: '/images/Pao Duce 2.jpg',
    formation: 'Abogado egresado de la Universidad Católica del Uruguay.',
    jobDescription: 'Lo fundamental en nuestra profesión es la comunicación franca y constante con nuestros clientes, logrando generar en ellos un grado de confianza tal que puedan delegar en nuestro estudio todas sus preocupaciones en el ámbito legal.',
    linkedinUrl: 'https://www.linkedin.com/in/paolo-duce-aa8906233/'
  },
  { 
    name: 'Juan Manuel Balsas Vanrell', 
    role: 'Departamento de PI', 
    img: '/images/Juanma Balsas 1.jpg',
    modalImg: '/images/Juanma Balsas.jpg',
    formation: 'Estudiante de la Facultad de Derecho de la República Oriental del Uruguay.',
    jobDescription: 'Desempeño mi trabajo en el departamento de propiedad intelectual, incursionando a diario en nuevos desafíos adquiriendo experiencia en los aspectos emergentes de la misma, con el fin de especializar mi perfil profesional de cara al futuro.',
    linkedinUrl: 'https://www.linkedin.com/in/juan-manuel-balsas-vanrell-451965307/'
  },
  { 
    name: 'Ana Inés Gayon', 
    role: 'Consultora', 
    img: '/images/Ana Inés Gayón 1.jpg',
    modalImg: '/images/Ana Inés Gayón 2.jpg',
    formation: 'Profesional con trayectoria en compañía multinacional perteneciente al sector cosmética y belleza. Desarrollo laboral vinculado al área de marketing, involucrando responsabilidades tales como planificación de campañas, lanzamientos, organización de eventos, animaciones comerciales, etc. Formación y experiencia en Hotelería, y contacto con clientes de diversos sectores. Formación y experiencia en traductorado idioma Francés.',
    jobDescription: 'Brindamos asesoramiento legal en propiedad intelectual con un enfoque integral y estratégico. Contamos con experiencia en el sector cosmética y belleza, en áreas como marketing, lanzamientos y eventos, lo que nos permite comprender las necesidades reales de marcas y emprendedores. Sumamos formación en Hotelería y Traductorado de Francés, ofreciendo un trato cercano, profesional y con alcance internacional.',
    linkedinUrl: 'https://www.linkedin.com/in/anain%C3%A9sgay%C3%B3n/'
  },
  { 
    name: 'Martina Brovia', 
    role: 'Departamento Jurídico', 
    img: '/images/Marti Brovia 1.jpg',
    modalImg: '/images/Marti Brovia 2.jpg',
    formation: 'Estudiante de la Facultad de Derecho de la República Oriental del Uruguay.',
    jobDescription: 'Mi formación académica en Derecho me permite estar en constante aprendizaje y actualización de las normativas legales vigentes. En mi rol como procuradora, gestiono diligentemente los trámites judiciales y administrativos, asegurando que cada proceso se realice de manera eficiente y oportuna. Estoy comprometida con la excelencia y dedicada a proteger y defender los intereses de nuestros clientes, contribuyendo significativamente al éxito de nuestro estudio.',
    linkedinUrl: 'https://www.linkedin.com/in/martina-brovia-goday-966973256/'
  },
  { 
    name: 'Dra. María Laura Escudero', 
    role: 'Consultora', 
    img: '/images/Maria Laura Escudero.jpg',
    modalImg: '/images/María Laura Escudero 2.jpg',
    formation: 'Egresada de la Maestría en Derecho Empresarial de la Universidad de Montevideo (2020). En el año 2019 cursó Program on Negotiation at Harvard Law School. Integrante de la Cátedra de Derecho Internacional Privado (desde 2012, UDELAR, Salto).',
    jobDescription: 'Participa activamente en el área de Negociación a los efectos de prevenir conflictos así como en la solución de los mismos. Es Abogada litigante ante Litigios comerciales, civiles y laborales. Se destaca por su gran capacidad de negociación y efectividad en los casos que tiene a su cargo, acompañando de manera personalizada y rigurosa a sus clientes.',
    linkedinUrl: 'https://www.linkedin.com/in/mar%C3%ADalauraescudero/'
  },
  { 
    name: 'Dr. Andrés Mendive', 
    role: 'Of Counsel', 
    img: '/images/Andrés Mendive.jpg',
    modalImg: '/images/Andrés Mendive.jpg',
    formation: 'Abogado egresado de la Facultad de Derecho de la República Oriental del Uruguay.',
    jobDescription: 'Asesoramiento especializado, mentoría y formación.',
    linkedinUrl: 'https://www.linkedin.com/in/andr%C3%A9s-mendive-dubourdieu-204b8423/'
  },
  { 
    name: 'Ing. Cecilia Macias', 
    role: 'Consultora en Regulaciones', 
    img: '/images/Cecilia Macías.jpg',
    modalImg: '/images/Cecilia Macías.jpg',
    formation: 'Graduada en 2016 como química farmacéutica, he trabajado en diversas áreas de la industria farmacéutica desde 2014, incluyendo control de calidad, aseguramiento de calidad y dirección técnica. Mi experiencia incluye roles en Roemmers, Biotoscana Uruguay, y Biogenesis. Actualmente, me desempeño en el área regulatoria de un laboratorio nacional y soy especialista en Gestión de la Calidad UNIT ISO 9000. También soy directora técnica de empresas importadoras de cosméticos y consultora técnica en un proyecto.',
    jobDescription: 'Mi formación en química farmacéutica y mi experiencia en control y aseguramiento de calidad me han proporcionado habilidades precisas y un enfoque detallado que aporto al estudio jurídico en propiedad intelectual, asegurando una gestión rigurosa y eficiente de los derechos y regulaciones.',
    linkedinUrl: 'https://www.linkedin.com/company/vv-abogados/'
  },
  { 
    name: 'Valentín Gadea', 
    role: 'Departamento de Patentes', 
    img: '/images/Valentín Gadea.jpg',
    modalImg: '/images/Valentín Gadea.jpg',
    formation: 'Actualmente, estoy cursando la carrera de Biotecnología en la Universidad ORT Uruguay, donde he desarrollado un profundo interés en la innovación científica y tecnológica. Como parte de mi experiencia profesional, formo parte del equipo de un estudio jurídico especializado en propiedad intelectual, donde participo activamente en el área de patentes.',
    jobDescription: 'Mi rol implica colaborar en la gestión y aseguramiento de patentes, un proceso clave para proteger las invenciones y fomentar la innovación. Esta experiencia me ha permitido combinar mis conocimientos académicos en biotecnología con un enfoque práctico en la legislación y los procedimientos relacionados con la propiedad intelectual.',
    linkedinUrl: 'https://www.linkedin.com/company/vv-abogados/'
  },
  { 
    name: 'Sofía Biatturi', 
    role: 'Departamento de Comunicación', 
    img: '/images/Sofi Biatturi 1.jpg',
    modalImg: '/images/Sofi Biatturi 2.jpg',
    formation: 'Estudiante de Derecho en la Universidad de Montevideo.',
    jobDescription: 'Como estudiante de derecho apasionada por la comunicación, me entusiasma formar parte de este estudio jurídico especializado en propiedad intelectual, donde puedo fusionar mi amor por la ley y mi interés por la creación y protección de contenido único y creativo.',
    linkedinUrl: 'https://www.linkedin.com/in/sof%C3%ADa-biatturi-80287122a/'
  },
]

export default function Team(){
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const sectionRef = useScrollAnimation()

  const openModal = (member: TeamMember) => {
    setSelectedMember(member)
  }

  const closeModal = () => {
    setSelectedMember(null)
  }
  
  const nextTeamMember = () => {
    setCurrentTeamIndex((prev) => (prev + 1) % TEAM.length)
  }
  
  const prevTeamMember = () => {
    setCurrentTeamIndex((prev) => (prev - 1 + TEAM.length) % TEAM.length)
  }

  // Swipe handlers
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
        nextTeamMember()
      } else {
        prevTeamMember()
      }
    }
    
    setIsDragging(false)
    setDragOffset(0)
    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <section id="equipo" className="section scroll-animate" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Equipo</h2>
        <p className="section-desc">Contamos con un equipo de profesionales altamente capacitados y con una vasta experiencia tanto a nivel nacional como internacional en el ámbito de la Propiedad Intelectual. Esto, combinado con una estructura sólida, nos permite ofrecer servicios de la más alta calidad.</p>
        
        {/* Desktop Grid */}
        <div className="team-grid team-desktop">
          {TEAM.map((p) => (
            <article 
              className="team-card" 
              key={p.name}
              onClick={() => openModal(p)}
              style={{ cursor: 'pointer' }}
            >
              <img className="team-img" src={p.img} alt={p.name} />
              <div className="team-overlay">
                <h3 className="team-name">{p.name}</h3>
                <p className="team-role">{p.role}</p>
                <span className="team-logo" aria-hidden>
                  <img src="/images/Isotipo Blanco.png" alt="" width="32" height="24" />
                </span>
              </div>
            </article>
          ))}
        </div>
        
        {/* Mobile Carousel */}
        <div className="team-mobile">
          <div 
            className="mobile-carousel-wrapper swipeable-carousel"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className={`mobile-carousel-track ${isDragging ? 'dragging' : ''}`}
              style={{
                transform: `translateX(calc(${-currentTeamIndex * 100}% + ${dragOffset}px))`
              }}
            >
              {TEAM.map((member, index) => (
                <article 
                  key={index}
                  className="team-card mobile-carousel-item"
                  onClick={() => openModal(member)}
                  style={{ cursor: 'pointer' }}
                >
                  <img className="team-img" src={member.img} alt={member.name} />
                  <div className="team-overlay">
                    <h3 className="team-name">{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                    <span className="team-logo" aria-hidden>
                      <img src="/images/Isotipo Blanco.png" alt="" width="32" height="24" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
          
          <div className="mobile-carousel-dots">
            {TEAM.map((_, index) => (
              <button
                key={index}
                className={`mobile-carousel-dot ${index === currentTeamIndex ? 'active' : ''}`}
                onClick={() => setCurrentTeamIndex(index)}
                aria-label={`Ver ${TEAM[index].name}`}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedMember && createPortal(
        <TeamModal 
          member={selectedMember}
          isOpen={!!selectedMember}
          onClose={closeModal}
        />,
        document.body
      )}
    </section>
  )
}
