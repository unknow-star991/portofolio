'use client'

import { ChevronDown } from 'lucide-react'

import { motion } from 'framer-motion'

export default function MobileHero() {
  return (
    <section className="
    relative
    min-h-screen
    flex items-center justify-center
    px-6
    overflow-hidden
    ">
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
        className="absolute inset-0"
      >
        <img
          src="/images/bg.jpeg"
          className="
          w-full h-full
          object-cover
          opacity-30
          "
        />

        <div className="
        absolute inset-0
        bg-gradient-to-b
        from-black/20
        via-black/60
        to-black
        " />
      </motion.div>

      <div className="
      relative z-10
      text-center
      ">
        <p className="
        uppercase
        tracking-[0.4em]
        text-zinc-400
        text-xs
        mb-5
        ">
          Creative Developer
        </p>

        <h1 className="
        text-6xl
        font-black
        leading-none
        bg-gradient-to-b
        from-white
        via-zinc-300
        to-zinc-600
        text-transparent
        bg-clip-text
        ">
          ARI
        </h1>

        <p className="
        mt-6
        text-zinc-300
        text-base
        leading-relaxed
        max-w-sm
        mx-auto
        ">
          Building cinematic digital experiences.
        </p>

        <button className="
        mt-10
        px-7 py-4
        rounded-full
        bg-white text-black
        font-semibold
        ">
          Explore More
        </button>

        <motion.div
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="
          mt-16
          flex justify-center
          "
        >
          <ChevronDown size={28} />
        </motion.div>
      </div>
    </section>
  )
}