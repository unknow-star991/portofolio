'use client'

import {
  Camera,
  Mail,
  Phone,
} from 'lucide-react'

import { motion } from 'framer-motion'

export default function DesktopContact() {
  return (
    <section
      id="contact"
      className="
      max-w-5xl
      mx-auto
      px-6
      py-32
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
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
        className="
        bg-white/5
        border border-white/10
        backdrop-blur-2xl
        rounded-[3rem]
        p-12
        text-center
        "
      >
        <h2 className="
        text-5xl
        font-bold
        mb-6
        ">
          Let’s Connect
        </h2>

        <p className="
        text-zinc-400
        text-lg
        mb-12
        ">
          Jika ingin mengenal lebih dekat
          atau bekerja sama.
        </p>

        {/* BUTTONS */}
        <div className="
        flex flex-wrap
        justify-center
        gap-6
        ">
          {/* INSTAGRAM */}
          <motion.a
            whileHover={{
              scale: 1.05,
              y: -5,
            }}
            href="https://www.instagram.com/"
            target="_blank"
            className="
            flex items-center gap-3
            px-6 py-4
            rounded-full
            bg-white text-black
            font-medium
            shadow-[0_10px_50px_rgba(255,255,255,0.2)]
            "
          >
            <Camera size={20} />

            Instagram
          </motion.a>

          {/* EMAIL */}
          <motion.a
            whileHover={{
              scale: 1.05,
              y: -5,
            }}
            href="mailto:example@gmail.com"
            className="
            flex items-center gap-3
            px-6 py-4
            rounded-full
            border border-white/20
            hover:bg-white/10
            transition
            "
          >
            <Mail size={20} />

            Email
          </motion.a>

          {/* WHATSAPP */}
          <motion.a
            whileHover={{
              scale: 1.05,
              y: -5,
            }}
            href="https://wa.me/628123456789"
            target="_blank"
            className="
            flex items-center gap-3
            px-6 py-4
            rounded-full
            border border-green-500/30
            bg-green-500/10
            hover:bg-green-500/20
            transition
            "
          >
            <Phone size={20} />

            WhatsApp
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}