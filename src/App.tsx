import React, { useEffect, useState } from 'react'
import { theme } from './theme'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import PracticeAreas from './sections/PracticeAreas'
import About from './sections/About'
import Team from './sections/Team'
import TestimonialsNews from './sections/TestimonialsNews'
import Contact from './sections/Contact'
import AssociatedFirms from './sections/AssociatedFirms'
import Footer from './sections/Footer'

export default function App(){
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <>
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <PracticeAreas />
        <About />
        <Team />
        <TestimonialsNews />
        <Contact />
        <AssociatedFirms />
      </main>
      <Footer />
    </>
  )
}
