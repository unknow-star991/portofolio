'use client'

import { useEffect, useState } from 'react'

import Lenis from 'lenis'

import {
  motion,
  useScroll,
  useSpring,
} from 'framer-motion'

import { Music2 } from 'lucide-react'

import DesktopNavbar from './DesktopNavbar'
import DesktopHero from './DesktopHero'
import DesktopGallery from './DesktopGallery'
import DesktopProjects from './DesktopProjects'
import DesktopAbout from './DesktopAbout'
import DesktopTimeline from './DesktopTimeline'
import DesktopBlog from './DesktopBlog'
import DesktopContact from './DesktopContact'

import AIAssistant from '@/components/AIAssistant'

export default function DesktopLayout() {
  /* STATES */
  const [darkMode, setDarkMode] = useState(true)

  const [uploadedImage, setUploadedImage] =
    useState<string | null>(null)

  const [navbarSmall, setNavbarSmall] =
    useState(false)

  const [activeSection, setActiveSection] =
    useState('about')

  const [showSpotify, setShowSpotify] =
    useState(false)

  const [loading, setLoading] = useState(true)

  /* GALLERY */
  const gallery = [
    '/images/4.jpeg',
    '/images/6.jpeg',
    '/images/8.jpeg',
    '/images/7.jpeg',
    '/images/45.jpeg',
  ]

  /* SCROLL PROGRESS */
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
  })

  /* SMOOTH SCROLL */
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  /* ACTIVE SECTION */
 useEffect(() => {
  const sections = [
    'about',
    'gallery',
    'timeline',
    'projects',
    'blog',
    'contact',
  ]

  const handleScroll = () => {
    const scrollPosition =
      window.scrollY + window.innerHeight / 3

    sections.forEach((id) => {
      const section =
        document.getElementById(id)

      if (!section) return

      const top = section.offsetTop
      const bottom = top + section.offsetHeight

      if (
        scrollPosition >= top &&
        scrollPosition < bottom
      ) {
        setActiveSection(id)
      }
    })
  }

  window.addEventListener(
    'scroll',
    handleScroll
  )

  handleScroll()

  return () => {
    window.removeEventListener(
      'scroll',
      handleScroll
    )
  }
}, [])

  /* NAVBAR RESIZE */
  useEffect(() => {
    const handleScroll = () => {
      setNavbarSmall(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      )
    }
  }, [])

  /* LOADING */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  /* CURSOR GLOW */
  useEffect(() => {
    const glow = document.createElement('div')

    glow.style.width = '350px'
    glow.style.height = '350px'
    glow.style.position = 'fixed'
    glow.style.borderRadius = '999px'
    glow.style.pointerEvents = 'none'

    glow.style.background = darkMode
      ? 'rgba(255,255,255,0.08)'
      : 'rgba(0,0,0,0.08)'

    glow.style.filter = 'blur(120px)'
    glow.style.zIndex = '9999'

    document.body.appendChild(glow)

    const move = (e: MouseEvent) => {
      glow.style.left = e.clientX - 175 + 'px'
      glow.style.top = e.clientY - 175 + 'px'
    }

    window.addEventListener('mousemove', move)

    return () => {
      window.removeEventListener(
        'mousemove',
        move
      )

      glow.remove()
    }
  }, [darkMode])

  /* LOADING SCREEN */
  if (loading) {
    return (
      <div className="
      h-screen
      bg-black
      flex flex-col
      items-center justify-center
      overflow-hidden
      ">
        <motion.div
          initial={{
            scale: 0.7,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="text-center"
        >
          <h1 className="
          text-9xl
          font-black
          text-white
          mb-8
          tracking-tight
          ">
            ARI
          </h1>

          <motion.div
            animate={{
              width: ['0%', '100%'],
            }}
            transition={{
              duration: 2,
            }}
            className="
            h-1
            bg-white
            rounded-full
            "
          />
        </motion.div>
      </div>
    )
  }

  return (
    <>
      {/* FLOATING BACKGROUND */}
      <div className="
      fixed inset-0
      -z-20
      overflow-hidden
      pointer-events-none
      ">
        <motion.div
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
          className="
          absolute top-20 left-20
          w-[500px] h-[500px]
          bg-cyan-500/10
          rounded-full
          blur-[160px]
          "
        />

        <motion.div
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 80, -60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
          }}
          className="
          absolute bottom-20 right-20
          w-[600px] h-[600px]
          bg-purple-500/10
          rounded-full
          blur-[200px]
          "
        />
      </div>

      {/* MAIN */}
      <main
        className={`${
          darkMode
            ? 'bg-black text-white'
            : 'bg-white text-black'
        } transition-all duration-700 overflow-hidden`}
      >
        {/* AURORA */}
        <div className="
        fixed inset-0
        -z-10
        overflow-hidden
        ">
          <div className="
          absolute top-0 left-1/3
          w-[700px] h-[700px]
          bg-purple-500
          opacity-20
          blur-[200px]
          animate-pulse
          rounded-full
          " />

          <div className="
          absolute bottom-0 right-1/3
          w-[600px] h-[600px]
          bg-blue-500
          opacity-20
          blur-[200px]
          animate-pulse
          rounded-full
          " />
        </div>

        {/* SCROLL PROGRESS */}
        <motion.div
          style={{ scaleX }}
          className="
          fixed top-0 left-0 right-0
          h-[3px]
          origin-left
          z-[999]
          bg-gradient-to-r
          from-white
          via-zinc-400
          to-white
          "
        />

        {/* NAVBAR */}
        <DesktopNavbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          activeSection={activeSection}
          navbarSmall={navbarSmall}
        />

        {/* SPOTIFY */}
        <div className="
        fixed bottom-4 right-4
        z-50
        ">
          <button
            onClick={() =>
              setShowSpotify(!showSpotify)
            }
            className="
            mb-3 ml-auto
            flex items-center gap-2
            px-4 py-3
            rounded-full
            bg-black/70
            backdrop-blur-2xl
            border border-white/10
            text-white
            "
          >
            <Music2 size={18} />

            {showSpotify
              ? 'Hide Music'
              : 'Open Music'}
          </button>

          {showSpotify && (
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              className="
              w-[350px]
              rounded-[2rem]
              overflow-hidden
              border border-white/10
              bg-black/40
              backdrop-blur-2xl
              "
            >
              <div className="
              p-4
              border-b border-white/10
              ">
                <p className="
                text-white
                font-semibold
                ">
                  ARI Playlist
                </p>

                <p className="
                text-zinc-400
                text-sm
                ">
                  Music & Memories ✨
                </p>
              </div>

              <iframe
                src="https://open.spotify.com/embed/playlist/6caRQrbCGVw2K5JzgwsFhN"
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </motion.div>
          )}
        </div>

        {/* SECTIONS */}
       <DesktopHero />

<DesktopAbout />

<DesktopTimeline />

<DesktopGallery
  gallery={gallery}
  uploadedImage={uploadedImage}
  setUploadedImage={setUploadedImage}
/>

<DesktopProjects />

<DesktopBlog />

<DesktopContact />

        {/* FOOTER */}
        <footer
          className="
        border-t border-white/10
        py-10 px-6
        text-center
        text-zinc-500
        "
        >
          <div className="
          flex items-center justify-center
          gap-3 mb-4
          ">
            <Music2 size={18} />

            <p>Music & Memories</p>
          </div>

          <p>
            © 2026 by ARI — Apple Inspired
            Website.
          </p>
        </footer>
      </main>

      <AIAssistant />
    </>
  )
}