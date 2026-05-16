'use client'

import { Moon, Sun } from 'lucide-react'

import { motion } from 'framer-motion'

type DesktopNavbarProps = {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  activeSection: string
  navbarSmall: boolean
}

export default function DesktopNavbar({
  darkMode,
  setDarkMode,
  activeSection,
  navbarSmall,
}: DesktopNavbarProps) {
  const menus = [
    'about',
    'gallery',
    'timeline',
    'projects',
    'blog',
    'contact',
  ]

  return (
    <motion.nav
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        y: navbarSmall ? 10 : 24,
        opacity: 1,
        width: navbarSmall ? 760 : 920,
        paddingTop: navbarSmall ? 12 : 16,
        paddingBottom: navbarSmall ? 12 : 16,
      }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 18,
      }}
      className="
      fixed left-1/2 -translate-x-1/2
      top-0 z-50

      rounded-full

      border border-white/10
      bg-black/35

      backdrop-blur-[24px]

      shadow-[0_10px_80px_rgba(0,0,0,0.45)]

      overflow-hidden
      "
    >
      {/* GRADIENT BORDER */}
      <div
        className="
        absolute inset-0
        rounded-full
        p-[1px]

        bg-gradient-to-r
        from-white/10
        via-white/5
        to-white/10

        pointer-events-none
        "
      />

      {/* INNER */}
      <div className="relative flex items-center justify-between px-8">
        {/* LEFT */}
        <motion.div
          whileHover={{
            scale: 1.05,
          }}
          className="
          text-3xl
          font-black
          tracking-[0.25em]
          text-white
          "
        >
          ARI
        </motion.div>

        {/* CENTER MENU */}
        <div className="flex items-center gap-2">
          {menus.map((item) => {
            const active = activeSection === item

            return (
              <a
                key={item}
                href={`#${item}`}
                className="relative"
              >
                <motion.div
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className={`
                  relative
                  px-5 py-3
                  rounded-full

                  text-sm
                  font-medium
                  capitalize

                  transition-all duration-300

                  ${
                    active
                      ? 'text-black'
                      : 'text-zinc-300 hover:text-white'
                  }
                  `}
                >
                  {/* ACTIVE BACKGROUND */}
                  {active && (
                    <motion.div
                      layoutId="active-pill"
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 24,
                      }}
                      className="
                      absolute inset-0
                      rounded-full

                      bg-white

                      shadow-[0_0_30px_rgba(255,255,255,0.35)]

                      "
                    />
                  )}

                  {/* TEXT */}
                  <span className="relative z-10">
                    {item}
                  </span>
                </motion.div>
              </a>
            )
          })}
        </div>

        {/* RIGHT */}
        <motion.button
          whileHover={{
            rotate: 180,
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.92,
          }}
          onClick={() => setDarkMode(!darkMode)}
          className="
          relative

          w-11 h-11

          rounded-full

          border border-white/10

          bg-white/5

          flex items-center justify-center

          overflow-hidden
          "
        >
          {/* GLOW */}
          <div
            className="
            absolute inset-0

            bg-gradient-to-br
            from-white/10
            to-transparent
            "
          />

          <div className="relative z-10">
            {darkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </div>
        </motion.button>
      </div>
    </motion.nav>
  )
}