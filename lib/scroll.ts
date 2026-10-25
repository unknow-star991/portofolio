// Centralized smooth scroll utility coordinating with Lenis
export function smoothScrollTo(
  target: string | HTMLElement | number,
  offset: number = -80
) {
  if (typeof window === 'undefined') return

  const windowWithLenis = window as unknown as {
    __lenis?: {
      scrollTo: (
        target: string | HTMLElement | number,
        options?: { offset?: number; duration?: number; immediate?: boolean }
      ) => void
    }
  }

  if (windowWithLenis.__lenis) {
    windowWithLenis.__lenis.scrollTo(target, { offset, duration: 1.1 })
    return
  }

  // Fallback to native smooth scroll
  if (typeof target === 'string') {
    const cleanId = target.replace(/^#/, '')
    const el = document.getElementById(cleanId)
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset + offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
  } else if (target instanceof HTMLElement) {
    const top = target.getBoundingClientRect().top + window.pageYOffset + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

