'use client'

import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

import AestheticNavbar from '@/components/aesthetic/AestheticNavbar'
import AestheticHero from '@/components/aesthetic/AestheticHero'
import AestheticHighlights from '@/components/aesthetic/AestheticHighlights'
import AestheticProjects from '@/components/aesthetic/AestheticProjects'
import AestheticAbout from '@/components/aesthetic/AestheticAbout'
import AestheticTimeline from '@/components/aesthetic/AestheticTimeline'
import CinematicGallery from '@/components/cinematic/CinematicGallery'
import AestheticContact from '@/components/aesthetic/AestheticContact'
import BackgroundVideo from '@/components/aesthetic/BackgroundVideo'
import CommandPalette from '@/components/cinematic/CommandPalette'

import { portfolioConfig } from '@/data/portfolio'
import { smoothScrollTo } from '@/lib/scroll'
import { sound } from '@/lib/audio'

export default function DesktopLayout() {
  const [navbarSmall, setNavbarSmall] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [loading, setLoading] = useState(true)
  const [commandOpen, setCommandOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  /* SCROLL PROGRESS */
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
  })

  /* LENIS SMOOTH SCROLL WITH PROPER RAF CLEANUP */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
      infinite: false,
    })

    // Store globally for smoothScrollTo helper
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      delete (window as unknown as { __lenis?: Lenis }).__lenis
    }
  }, [])

  /* ACTIVE SECTION OBSERVER */
  useEffect(() => {
    const sections = ['hero', 'highlights', 'projects', 'about', 'timeline', 'gallery', 'contact']

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      sections.forEach((id) => {
        const section = document.getElementById(id)
        if (!section) return

        const top = section.offsetTop
        const bottom = top + section.offsetHeight

        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection(id)
        }
      })

      setNavbarSmall(window.scrollY > 50)
      setShowBackToTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* MINIMAL REFINED INTRO SCREEN */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 750)

    return () => clearTimeout(timer)
  }, [])

  /* MOUSE SPOTLIGHT AMBIENT GLOW (DESKTOP FINE POINTER ONLY) */
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    const glow = document.createElement('div')
    glow.style.width = '420px'
    glow.style.height = '420px'
    glow.style.position = 'fixed'
    glow.style.borderRadius = '999px'
    glow.style.pointerEvents = 'none'
    glow.style.background =
      'radial-gradient(circle, rgba(245,199,108,0.05) 0%, rgba(56,189,248,0.025) 50%, transparent 70%)'
    glow.style.filter = 'blur(75px)'
    glow.style.zIndex = '9985'

    document.body.appendChild(glow)

    const move = (e: MouseEvent) => {
      glow.style.left = e.clientX - 210 + 'px'
      glow.style.top = e.clientY - 210 + 'px'
    }

    window.addEventListener('mousemove', move)

    return () => {
      window.removeEventListener('mousemove', move)
      glow.remove()
    }
  }, [])

  /* INTRO LOADING SCREEN */
  if (loading) {
    return (
      <div className="h-screen bg-[#050608] flex flex-col items-center justify-center overflow-hidden font-mono-code">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center px-4"
        >
          <span className="text-amber-400 text-[10px] tracking-[0.4em] uppercase block mb-3">
            {portfolioConfig.personal.year} BESPOKE PORTFOLIO
          </span>
          <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight mb-3">
            {portfolioConfig.personal.nickname}
          </h1>
          <p className="text-zinc-500 text-xs uppercase tracking-[0.25em] mb-6">
            {portfolioConfig.personal.role}
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="h-[2px] bg-gradient-to-r from-amber-400 via-white to-cyan-400 rounded-full mx-auto"
          />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#050608] text-zinc-100 selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {/* SUBTLE GRAIN TEXTURE */}
      <div className="subtle-grain" />

      {/* AMBIENT MOVING VIDEO REEL BACKGROUND */}
      <BackgroundVideo showControls={true} />

      {/* TOP SCROLL PROGRESS BAR */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9999] bg-gradient-to-r from-amber-400 via-white to-cyan-400"
      />

      {/* FLOATING NAVBAR */}
      <AestheticNavbar
        activeSection={activeSection}
        navbarSmall={navbarSmall}
        onOpenCommand={() => setCommandOpen(true)}
      />

      {/* COMMAND PALETTE */}
      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
      />

      {/* COMPACT MAIN FLOW */}
      <main className="relative z-10 overflow-hidden">
        {/* HERO */}
        <AestheticHero onOpenCommand={() => setCommandOpen(true)} />

        {/* SECTION DIVIDER */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* BENTO HIGHLIGHTS */}
        <AestheticHighlights />

        {/* SECTION DIVIDER */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* PROJECTS */}
        <AestheticProjects />

        {/* SECTION DIVIDER */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* ABOUT & SKILLS */}
        <AestheticAbout />

        {/* SECTION DIVIDER */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* TIMELINE */}
        <AestheticTimeline />

        {/* PHOTO GALLERY */}
        <CinematicGallery />

        {/* CONTACT & FOOTER */}
        <AestheticContact />
      </main>

      {/* FLOATING QUICK SCROLL-TO-TOP BUTTON */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => {
            sound.playClick()
            smoothScrollTo(0)
          }}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-black/70 hover:bg-black/90 text-zinc-300 hover:text-white border border-white/15 backdrop-blur-xl shadow-2xl transition-all cursor-pointer group"
          title="Scroll to Top"
          aria-label="Scroll to top of page"
        >
          <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </div>
  )
}
