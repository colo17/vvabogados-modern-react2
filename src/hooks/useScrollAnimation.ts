import { useEffect, useRef, useCallback } from 'react'

export function useScrollAnimation(threshold = 0.1) {
  const elementRef = useRef<HTMLElement>(null)

  const checkElementPosition = useCallback(() => {
    const element = elementRef.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0

    if (isVisible) {
      // Element is in viewport - animate in
      element.classList.remove('animate-out')
      element.classList.add('animate-in')
    } else {
      // Element is not visible
      if (rect.top > window.innerHeight) {
        // Element is below viewport - reset to initial state
        element.classList.remove('animate-in')
        element.classList.remove('animate-out')
      } else if (rect.bottom < 0) {
        // Element is above viewport - animate out
        element.classList.remove('animate-in')
        element.classList.add('animate-out')
      }
    }
  }, [])

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(() => {
      checkElementPosition()
    })
  }, [checkElementPosition])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkElementPosition()
          ticking = false
        })
        ticking = true
      }
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0, 0.1],
      rootMargin: '100px 0px 100px 0px'
    })

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
      
      // Set initial state
      currentElement.classList.remove('animate-in')
      currentElement.classList.remove('animate-out')
      
      // Initial position check
      checkElementPosition()
    }

    // Add scroll listener for more responsive updates
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleIntersection, checkElementPosition])

  return elementRef
}