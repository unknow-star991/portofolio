'use client'

import { motion } from 'framer-motion'

export default function DesktopProjects() {
  const projects = [
    {
      title: 'Apple Portfolio',
      desc: 'Website portfolio cinematic dengan Apple inspired UI dan smooth animation.',
      image: '/images/4.jpeg',
      tech: 'Next.js • Framer Motion • Tailwind',
      link: 'https://portfolio-apple-lovat.vercel.app',
    },

    {
      title: 'Music Experience',
      desc: 'Interactive music player dengan visual aesthetic modern.',
      image: '/images/6.jpeg',
      tech: 'React • Audio API • Motion',
      link: '#',
    },

    {
      title: 'Gallery Memories',
      desc: 'Gallery cinematic dengan upload image dan hover 3D effect.',
      image: '/images/7.jpeg',
      tech: 'Next.js • Tailwind • Animation',
      link: '#',
    },

    {
      title: 'Future AI App',
      desc: 'Konsep AI modern dengan futuristic interface.',
      image: '/images/8.jpeg',
      tech: 'OpenAI • React • Vercel',
      link: '#',
    },
  ]

  return (
    <section
      id="projects"
      className="
      relative
      max-w-7xl
      mx-auto
      px-6
      py-40
      overflow-hidden
      "
    >
      {/* GLOW */}
      <div className="absolute inset-0 opacity-20">
        <div className="
        absolute top-0 right-0
        w-[500px] h-[500px]
        bg-cyan-500
        blur-[180px]
        rounded-full
        " />

        <div className="
        absolute bottom-0 left-0
        w-[500px] h-[500px]
        bg-purple-500
        blur-[180px]
        rounded-full
        " />
      </div>

      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-24"
      >
        <p className="
        uppercase
        tracking-[0.5em]
        text-zinc-500
        text-sm
        mb-6
        ">
          My Works
        </p>

        <h2 className="
        text-8xl
        font-black
        bg-gradient-to-b
        from-white
        via-zinc-300
        to-zinc-600
        text-transparent
        bg-clip-text
        ">
          Featured Projects.
        </h2>

        <p className="
        max-w-2xl
        mx-auto
        mt-8
        text-zinc-400
        text-xl
        leading-relaxed
        ">
          Kumpulan project yang pernah aku buat dengan
          fokus pada design, experience, dan teknologi modern.
        </p>
      </motion.div>

      {/* GRID */}
      <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      gap-10
      relative z-10
      ">
        {projects.map((project, index) => (
          <motion.a
            key={index}
            href={project.link}
            target="_blank"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
            }}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            className="
            group
            relative
            overflow-hidden
            rounded-[2.5rem]
            border border-white/10
            bg-white/5
            backdrop-blur-2xl
            "
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                className="
                w-full
                h-[350px]
                object-cover
                group-hover:scale-110
                transition duration-700
                "
              />

              <div className="
              absolute inset-0
              bg-gradient-to-t
              from-black
              via-black/20
              to-transparent
              " />
            </div>

            {/* CONTENT */}
            <div className="p-10">
              <p className="text-zinc-500 text-sm mb-4">
                {project.tech}
              </p>

              <h3 className="text-4xl font-bold mb-5">
                {project.title}
              </h3>

              <p className="
              text-zinc-400
              leading-relaxed
              text-lg
              ">
                {project.desc}
              </p>

              <motion.div
                whileHover={{ x: 10 }}
                className="
                mt-8
                inline-flex
                items-center
                gap-3
                text-white
                font-medium
                "
              >
                View Project →
              </motion.div>
            </div>

            {/* HOVER GLOW */}
            <div className="
            absolute inset-0
            opacity-0
            group-hover:opacity-100
            transition duration-700
            bg-gradient-to-br
            from-white/10
            to-transparent
            pointer-events-none
            " />
          </motion.a>
        ))}
      </div>
    </section>
  )
}