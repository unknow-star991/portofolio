'use client'

import { motion } from 'framer-motion'

export default function DesktopBlog() {
  return (
    <section
      id="blog"
      className="
      relative
      max-w-7xl
      mx-auto
      px-6
      py-40
      overflow-hidden
      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 opacity-20">
        <div className="
        absolute top-0 left-1/4
        w-[500px] h-[500px]
        bg-pink-500
        blur-[180px]
        rounded-full
        " />

        <div className="
        absolute bottom-0 right-1/4
        w-[400px] h-[400px]
        bg-cyan-500
        blur-[180px]
        rounded-full
        " />
      </div>

      {/* TITLE */}
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
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
        relative z-10
        text-center
        "
      >
        <p className="
        uppercase
        tracking-[0.5em]
        text-zinc-500
        text-sm
        mb-6
        ">
          Future Stories
        </p>

        <h2 className="
        text-8xl
        font-black
        leading-tight
        bg-gradient-to-b
        from-white
        via-zinc-300
        to-zinc-600
        text-transparent
        bg-clip-text
        ">
          Coming Soon.
        </h2>

        <p className="
        max-w-2xl
        mx-auto
        mt-8
        text-zinc-400
        text-xl
        leading-relaxed
        ">
          Sebuah tempat untuk cerita
          perjalanan hidup, pengalaman,
          karya, dan semua momen yang
          akan datang.
        </p>
      </motion.div>

      {/* CARDS */}
      <div className="
      mt-24
      grid md:grid-cols-3
      gap-8
      relative z-10
      ">
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            whileHover={{
              y: -15,
              scale: 1.02,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
            relative
            overflow-hidden
            rounded-[2rem]
            border border-white/10
            bg-white/5
            backdrop-blur-2xl
            p-10
            "
          >
            <div className="
            absolute inset-0
            opacity-20
            bg-linear-to-br
            from-white/20
            to-transparent
            " />

            <div className="relative z-10">
              <p className="
              text-zinc-500
              text-sm
              mb-4
              ">
                Future Update 0{item}
              </p>

              <h3 className="
              text-3xl
              font-bold
              mb-6
              ">
                New Story Loading...
              </h3>

              <p className="
              text-zinc-400
              leading-relaxed
              mb-8
              ">
                Konten baru akan segera hadir
                dengan pengalaman visual yang
                lebih cinematic dan interaktif.
              </p>

              <div className="
              w-full h-2
              bg-white/10
              rounded-full
              overflow-hidden
              ">
                <motion.div
                  animate={{
                    width: [
                      '0%',
                      '100%',
                      '0%',
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="
                  h-full
                  bg-gradient-to-r
                  from-white
                  to-zinc-500
                  "
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}