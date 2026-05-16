'use client'

import { useEffect, useState } from 'react'

import Lenis from 'lenis'

import {
  motion,
  useScroll,
  useSpring,
} from 'framer-motion'

import { Music2 } from 'lucide-react'

import MobileNavbar from './MobileNavbar'
import MobileHero from './MobileHero'
import MobileGallery from './MobileGallery'
import MobileProjects from './MobileProjects'

import AIAssistant from '@/components/AIAssistant'

export default function MobileLayout() {
  /* STATES */
  const [darkMode, setDarkMode] =
    useState(true)

  const [showSpotify, setShowSpotify] =
    useState(false)

  const [loading, setLoading] =
    useState(true)

  /* GALLERY */
  const gallery = [
    '/images/4.jpeg',
    '/images/6.jpeg',
    '/images/7.jpeg',
    '/images/8.jpeg',
    '/images/45.jpeg',
  ]

  /* LENIS */
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

  /* LOADING */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  /* SCROLL */
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
  })

  /* LOADING SCREEN */
  if (loading) {
    return (
      <div
        className="
        h-screen
        bg-black
        flex items-center justify-center
        overflow-hidden
        "
      >
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
          <h1
            className="
            text-7xl
            font-black
            text-white
            tracking-[0.2em]
            "
          >
            ARI
          </h1>

          <motion.div
            animate={{
              width: ['0%', '100%'],
            }}
            transition={{
              duration: 1.5,
            }}
            className="
            h-1
            bg-white
            rounded-full
            mt-6
            "
          />
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <main
        className={`${
          darkMode
            ? 'bg-black text-white'
            : 'bg-white text-black'
        } transition-all duration-700 overflow-hidden`}
      >
        {/* BACKGROUND */}
        <div
          className="
          fixed inset-0
          -z-20
          overflow-hidden
          pointer-events-none
          "
        >
          <motion.div
            animate={{
              x: [0, 40, -40, 0],
              y: [0, -20, 20, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
            }}
            className="
            absolute top-10 left-0
            w-[300px] h-[300px]
            bg-cyan-500/10
            blur-[120px]
            rounded-full
            "
          />

          <motion.div
            animate={{
              x: [0, -40, 40, 0],
              y: [0, 30, -20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
            }}
            className="
            absolute bottom-0 right-0
            w-[320px] h-[320px]
            bg-purple-500/10
            blur-[140px]
            rounded-full
            "
          />
        </div>

        {/* PROGRESS */}
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
        <MobileNavbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* HERO */}
        <MobileHero />

        {/* GALLERY */}
        <MobileGallery gallery={gallery} />

        {/* PROJECTS */}
        <MobileProjects />

        {/* SPOTIFY */}
        <div
          className="
          fixed bottom-5 right-5
          z-50
          "
        >
          {/* BUTTON */}
          <button
            onClick={() =>
              setShowSpotify(!showSpotify)
            }
            className="
            flex items-center gap-2

            px-4 py-3

            rounded-full

            bg-black/70
            backdrop-blur-2xl

            border border-white/10

            text-white

            shadow-[0_10px_40px_rgba(0,0,0,0.4)]
            "
          >
            <Music2 size={18} />

            {showSpotify
              ? 'Close'
              : 'Music'}
          </button>

          {/* PLAYER */}
          {showSpotify && (
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              className="
              mt-3

              w-[280px]

              rounded-[2rem]

              overflow-hidden

              border border-white/10

              bg-black/40

              backdrop-blur-2xl

              shadow-[0_20px_80px_rgba(0,0,0,0.45)]
              "
            >
              {/* HEADER */}
              <div
                className="
                p-4
                border-b border-white/10
                "
              >
                <p
                  className="
                  text-sm
                  font-semibold
                  "
                >
                  ARI Playlist
                </p>

                <p
                  className="
                  text-zinc-500
                  text-xs
                  mt-1
                  "
                >
                  Music & Memories
                </p>
              </div>

              {/* IFRAME */}
              <iframe
                src="https://open.spotify.com/embed/playlist/6caRQrbCGVw2K5JzgwsFhN"
                width="100%"
                height="152"
                loading="lazy"
              />
            </motion.div>
          )}
        </div>

        {/* FOOTER */}
        <footer
          className="
          py-14
          text-center
          text-zinc-500
          "
        >
          <p>
            © 2026 ARI Portfolio
          </p>
        </footer>
      </main>

      {/* AI ASSISTANT */}
      <AIAssistant />
    </>
  )
}