import React from 'react'
import WhyUs from '../sections/WhyUs'
import PracticeAreas from '../sections/PracticeAreas'
import About from '../sections/About'
import Team from '../sections/Team'
import TestimonialsNews from '../sections/TestimonialsNews'
import Contact from '../sections/Contact'
import AssociatedFirms from '../sections/AssociatedFirms'

const HomePage: React.FC = () => {
  return (
    <>
      <WhyUs />
      <PracticeAreas />
      <About />
      <Team />
      <TestimonialsNews />
      <Contact />
      <AssociatedFirms />
    </>
  )
}

export default HomePage