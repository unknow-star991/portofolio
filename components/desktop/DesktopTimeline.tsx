'use client'

import { motion } from 'framer-motion'

export default function DesktopTimeline() {
  const timeline = [
    {
      year: '2022',
      title: 'Awal Perjalanan',
      desc: 'Mulai mengenal dunia design dan coding.',
    },

    {
      year: '2024',
      title: 'Momen Terindah',
      desc: 'Membuat banyak karya visual dan cinematic.',
    },

    {
      year: '2026',
      title: 'Dream Future',
      desc: 'Membangun masa depan digital yang kreatif.',
    },
  ]

  return (
    <section
      id="timeline"
      className="
      max-w-5xl
      mx-auto
      px-6
      py-32
      "
    >
      {/* TITLE */}
      <div className="text-center mb-20">
        <h2 className="
        text-6xl
        font-black
        ">
          Life Timeline
        </h2>
      </div>

      {/* TIMELINE */}
      <div className="space-y-16">
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
            }}
            viewport={{
              once: true,
            }}
            className="
            border-l border-white/20
            pl-8
            "
          >
            <p className="
            text-zinc-500
            text-sm
            ">
              {item.year}
            </p>

            <h3 className="
            text-4xl
            font-semibold
            mt-3
            mb-4
            ">
              {item.title}
            </h3>

            <p className="
            text-zinc-400
            leading-relaxed
            ">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}