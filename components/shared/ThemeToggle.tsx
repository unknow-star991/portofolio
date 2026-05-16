'use client'

import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

type Props = {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

export default function ThemeToggle({
  darkMode,
  setDarkMode,
}: Props) {
  return (
    <motion.button
      whileHover={{
        rotate: 180,
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.9,
      }}
      onClick={() => setDarkMode(!darkMode)}
      className="
      relative
      p-3
      rounded-full
      border border-white/10
      bg-white/5
      backdrop-blur-2xl
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
        pointer-events-none
        "
      />

      {/* ICON */}
      <div className="relative z-10">
        {darkMode ? (
          <Sun size={18} />
        ) : (
          <Moon size={18} />
        )}
      </div>
    </motion.button>
  )
}