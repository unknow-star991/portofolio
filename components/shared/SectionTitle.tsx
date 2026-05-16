'use client'

import { motion } from 'framer-motion'

type Props = {
  badge?: string
  title: string
  description?: string
  center?: boolean
}

export default function SectionTitle({
  badge,
  title,
  description,
  center = true,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 80,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
      className={`
      relative z-10 mb-20
      ${center ? 'text-center' : 'text-left'}
      `}
    >
      {/* BADGE */}
      {badge && (
        <p
          className="
          uppercase
          tracking-[0.5em]
          text-zinc-500
          text-xs sm:text-sm
          mb-5
          "
        >
          {badge}
        </p>
      )}

      {/* TITLE */}
      <h2
        className="
        text-4xl
        sm:text-6xl
        md:text-7xl
        font-black
        leading-tight
        bg-gradient-to-b
        from-white
        via-zinc-300
        to-zinc-600
        text-transparent
        bg-clip-text
        "
      >
        {title}
      </h2>

      {/* DESCRIPTION */}
      {description && (
        <p
          className="
          max-w-2xl
          mt-6
          text-zinc-400
          text-base sm:text-lg
          leading-relaxed
          mx-auto
          "
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}