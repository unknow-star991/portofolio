'use client'

import { useState } from 'react'

import {
  Menu,
  X,
  Moon,
  Sun,
} from 'lucide-react'

import {
  motion,
  AnimatePresence,
} from 'framer-motion'

type Props = {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

export default function MobileNavbar({
  darkMode,
  setDarkMode,
}: Props) {
  const [open, setOpen] = useState(false)

  const menus = [
    'about',
    'gallery',
    'timeline',
    'projects',
    'blog',
    'contact',
  ]

  return (
    <>
      <div className="
      fixed top-0 left-0 right-0
      z-50
      px-4 py-4
      ">
        <div className="
        flex items-center justify-between
        rounded-3xl
        border border-white/10
        bg-black/40
        backdrop-blur-2xl
        px-5 py-3
        ">
          <h1 className="
          text-lg
          font-black
          tracking-[0.2em]
          ">
            ARI
          </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
            >
              {darkMode ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </button>

            <button
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
            fixed inset-0
            z-40
            bg-black/95
            backdrop-blur-3xl
            flex flex-col
            items-center justify-center
            gap-8
            "
          >
            {menus.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() =>
                  setOpen(false)
                }
                className="
                text-3xl
                font-bold
                capitalize
                "
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}