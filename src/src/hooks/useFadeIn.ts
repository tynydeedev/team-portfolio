import { useEffect, useRef } from 'react'

export function useFadeIn() {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )
    el.classList.add('fade-in')
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
