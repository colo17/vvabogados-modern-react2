import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Contact(){
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const sectionRef = useScrollAnimation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_email: 'veronicavanrell@vvabogados.com.uy'
        },
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      )
      
      alert('¡Mensaje enviado exitosamente! Te responderemos a la brevedad.')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Error al enviar el mensaje. Por favor, intenta nuevamente o contactanos directamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contacto" className="section scroll-animate-up" ref={sectionRef}>
      <div className="container grid cols-2">
        <div>
          <span className="badge">Contacto</span>
          <h2 className="section-title">Contáctanos</h2>
          <p className="section-desc">Ponte en contacto con nosotros, envianos un email y responderemos a la brevedad</p>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <label className="label">Nombre</label>
                <input 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input" 
                  placeholder="Tu nombre" 
                  required
                />
                <label className="label" style={{marginTop:12}}>Email</label>
                <input 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input" 
                  placeholder="tu@email.com" 
                  required
                />
                <label className="label" style={{marginTop:12}}>Teléfono</label>
                <input 
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input" 
                  placeholder="(+598) 99 123 456" 
                />
                <label className="label" style={{marginTop:12}}>Mensaje</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input" 
                  placeholder="Contanos brevemente tu consulta" 
                  required
                />
                <div style={{marginTop:14}}>
                  <button className="button" type="submit" disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="card">
          <img src="/images/Estudio.png" alt="VV Abogados" />
          <div className="card-body">
            <h3 style={{marginTop:0}}>Datos de contacto</h3>
            <p style={{marginBottom:8,color:'#6b7a90'}}>veronicavanrell@vvabogados.com.uy</p>
            <p style={{marginBottom:8,color:'#6b7a90'}}>Tel: (+598) 2603 0997 / (+598) 94 519 555</p>
            <p style={{marginBottom:8,color:'#6b7a90'}}>Edificio Corporate – Miraflores 1445 – Of. 203, Montevideo, Carrasco.</p>
            <div style={{display:'flex', gap:'12px', flexWrap:'wrap'}}>
              <a className="button" href="mailto:veronicavanrell@vvabogados.com.uy">Escribir por email</a>
              <a className="button button--whatsapp" href="https://wa.me/59894519555" target="_blank" rel="noopener noreferrer">Mandar WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
