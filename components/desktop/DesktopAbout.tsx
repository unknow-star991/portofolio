'use client'

import { motion } from 'framer-motion'

export default function DesktopAbout() {
  return (
    <section
      id="about"
      className="
      max-w-7xl
      mx-auto
      px-6
      py-40
      "
    >
      <div className="
      grid md:grid-cols-2
      gap-20
      items-center
      ">
        {/* IMAGE */}
        <motion.img
          whileHover={{
            scale: 1.03,
          }}
          src="/images/profile.jpeg"
          className="
          rounded-[3rem]
          shadow-[0_20px_120px_rgba(255,255,255,0.1)]
          border border-white/10
          "
        />

        {/* CONTENT */}
        <motion.div
          initial={{
            opacity: 0,
            x: 60,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
          }}
          viewport={{
            once: true,
          }}
        >
          <p className="
          uppercase
          tracking-[0.4em]
          text-zinc-500
          text-sm
          mb-6
          ">
            About Me
          </p>

          <h2 className="
          text-6xl
          font-black
          leading-tight
          mb-8
          ">
            A Creative Mind
            <br />
            With Beautiful
            <br />
            Memories.
          </h2>

          <p className="
          text-zinc-400
          text-xl
          leading-relaxed
          ">
            Aku adalah seseorang yang menikmati
            teknologi, visual art, music,
            cinematic experiences, dan design
            modern dengan pendekatan emosional.
          </p>
        </motion.div>
      </div>
    </section>
  )
}