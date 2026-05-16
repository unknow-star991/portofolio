'use client'

import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DesktopHero() {
  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* BACKGROUND */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
        className="absolute inset-0"
      >
        <img
          src="/images/bg.jpeg"
          className="w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
      </motion.div>

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 text-center px-6"
      >
        <p className="uppercase tracking-[0.5em] text-zinc-400 mb-6 text-sm">
          Creative Developer
        </p>

        <h1 className="text-[10rem] font-black leading-none bg-gradient-to-b from-white via-zinc-300 to-zinc-600 text-transparent bg-clip-text">
          ARI
        </h1>

        <p className="max-w-2xl mx-auto mt-8 text-zinc-300 text-xl leading-relaxed">
          Building cinematic digital experiences with emotion,
          memories, and futuristic design.
        </p>

        <motion.button
          whileHover={{
            scale: 1.08,
            rotate: 1,
          }}
          whileTap={{ scale: 0.95 }}
          className="
          mt-10
          px-10 py-5
          rounded-full
          bg-white text-black
          font-semibold
          shadow-[0_10px_80px_rgba(255,255,255,0.2)]
          relative overflow-hidden group
          "
        >
          <span className="relative z-10">
            Explore More
          </span>

          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
            absolute inset-0
            bg-gradient-to-r
            from-transparent
            via-white/40
            to-transparent
            "
          />
        </motion.button>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="mt-20 flex justify-center"
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  )
}