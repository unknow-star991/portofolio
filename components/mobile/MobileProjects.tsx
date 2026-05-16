'use client'

import { motion } from 'framer-motion'

export default function MobileProjects() {
  const projects = [
    {
      title: 'ECHOES',

      desc:
        'Cinematic emotional experience website dengan futuristic interface dan immersive storytelling.',

      image: '/images/echoes.png',

      github:
        'https://unknow-star991.github.io/ECHOES/',

      live: '#',

      status: 'Available',

      type: 'real',
    },

    {
      title: 'Coming Soon',

      desc:
        'New futuristic experience is currently under development.',

      status: 'In Progress',

      type: 'coming',
    },

    {
      title: 'Coming Soon',

      desc:
        'Another cinematic digital experience will arrive soon.',

      status: 'Soon',

      type: 'coming',
    },
  ]

  return (
    <section
      id="projects"
      className="
      py-20
      px-5
      "
    >
      {/* HEADER */}
      <div className="mb-10">
        <p
          className="
          uppercase
          tracking-[0.3em]
          text-zinc-500
          text-xs
          mb-3
          "
        >
          Featured Works
        </p>

        <h2
          className="
          text-4xl
          font-black
          leading-tight
          "
        >
          Projects
        </h2>
      </div>

      {/* LIST */}
      <div className="space-y-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileTap={{
              scale: 0.98,
            }}
            className="
            overflow-hidden

            rounded-[2.2rem]

            border border-white/10

            bg-white/[0.03]

            backdrop-blur-2xl
            "
          >
            {/* REAL PROJECT */}
            {project.type === 'real' ? (
              <>
                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={project.image}
                    className="
                    w-full
                    h-[220px]
                    object-cover
                    "
                  />

                  <div
                    className="
                    absolute inset-0

                    bg-gradient-to-t
                    from-black
                    via-black/20
                    to-transparent
                    "
                  />

                  {/* STATUS */}
                  <div
                    className="
                    absolute top-4 left-4

                    px-3 py-1

                    rounded-full

                    bg-black/60
                    backdrop-blur-xl

                    border border-white/10

                    text-[11px]
                    text-white
                    "
                  >
                    {project.status}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3
                    className="
                    text-3xl
                    font-black
                    mb-3
                    "
                  >
                    {project.title}
                  </h3>

                  <p
                    className="
                    text-zinc-400
                    text-sm
                    leading-relaxed
                    "
                  >
                    {project.desc}
                  </p>

                  {/* BUTTONS */}
                  <div className="flex gap-3 mt-6">
                    <a
                      href={project.github}
                      target="_blank"
                      className="
                      flex-1

                      py-3

                      rounded-full

                      bg-white
                      text-black

                      text-sm
                      font-semibold

                      text-center
                      "
                    >
                      GitHub
                    </a>

                    <a
                      href={project.live}
                      target="_blank"
                      className="
                      flex-1

                      py-3

                      rounded-full

                      border border-white/10

                      bg-white/5

                      text-white

                      text-sm
                      font-semibold

                      text-center
                      "
                    >
                      Preview
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* COMING SOON */}
                <div
                  className="
                  relative

                  h-[240px]

                  overflow-hidden
                  "
                >
                  {/* AURORA */}
                  <motion.div
                    animate={{
                      x: [0, 60, -40, 0],
                      y: [0, -30, 30, 0],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                    }}
                    className="
                    absolute top-0 left-0

                    w-[250px]
                    h-[250px]

                    bg-cyan-500/20

                    blur-[100px]

                    rounded-full
                    "
                  />

                  <motion.div
                    animate={{
                      x: [0, -50, 40, 0],
                      y: [0, 40, -20, 0],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                    }}
                    className="
                    absolute bottom-0 right-0

                    w-[250px]
                    h-[250px]

                    bg-purple-500/20

                    blur-[100px]

                    rounded-full
                    "
                  />

                  {/* CONTENT */}
                  <div
                    className="
                    absolute inset-0

                    flex flex-col
                    items-center justify-center

                    text-center

                    px-8
                    "
                  >
                    <div
                      className="
                      px-3 py-1

                      rounded-full

                      bg-white/10

                      border border-white/10

                      text-xs

                      mb-5
                      "
                    >
                      {project.status}
                    </div>

                    <h3
                      className="
                      text-3xl
                      font-black
                      mb-4
                      "
                    >
                      {project.title}
                    </h3>

                    <p
                      className="
                      text-zinc-400
                      text-sm
                      leading-relaxed
                      "
                    >
                      {project.desc}
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}