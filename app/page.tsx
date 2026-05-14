'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import AIAssistant from '@/components/AIAssistant'

import {
  Moon,
  Sun,
  Music2,
  Camera,
  Mail,
  Phone,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'

export default function ApplePortfolioWebsite() {
  const [darkMode, setDarkMode] = useState(true)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [musicFile, setMusicFile] = useState<string | null>(null)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  /* SMOOTH SCROLL */
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  /* LOADING */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  /* CURSOR GLOW */
  useEffect(() => {
    const glow = document.createElement('div')

    glow.style.width = '350px'
    glow.style.height = '350px'
    glow.style.position = 'fixed'
    glow.style.borderRadius = '999px'
    glow.style.pointerEvents = 'none'
    glow.style.background = darkMode
      ? 'rgba(255,255,255,0.08)'
      : 'rgba(0,0,0,0.08)'

    glow.style.filter = 'blur(120px)'
    glow.style.zIndex = '9999'

    document.body.appendChild(glow)

    const move = (e: MouseEvent) => {
      glow.style.left = e.clientX - 175 + 'px'
      glow.style.top = e.clientY - 175 + 'px'
    }

    window.addEventListener('mousemove', move)

    return () => {
      window.removeEventListener('mousemove', move)
      glow.remove()
    }
  }, [darkMode])

  const gallery = [
    '/images/4.jpeg',
    '/images/6.jpeg',
    '/images/8.jpeg',
    '/images/7.jpeg',
    '/images/45.jpeg',
  ]

  if (loading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tight">
            ARI
          </h1>

          <motion.div
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: 2 }}
            className="h-1 bg-white rounded-full"
          />
        </motion.div>
      </div>
    )
  }

  return (
    <>
      {/* FLOATING BACKGROUND */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
          className="absolute top-20 left-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px]"
        />

        <motion.div
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 80, -60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
          }}
          className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[200px]"
        />
      </div>

      <main
        className={`${
          darkMode ? 'bg-black text-white' : 'bg-white text-black'
        } transition-all duration-700 overflow-hidden`}
      >
        {/* AURORA BACKGROUND */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-purple-500 opacity-20 blur-[200px] animate-pulse rounded-full" />

          <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-blue-500 opacity-20 blur-[200px] animate-pulse rounded-full" />
        </div>

        {/* SPOTIFY PLAYER */}
<div className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 w-auto sm:w-[350px] rounded-[2rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_10px_80px_rgba(0,0,0,0.5)]">
  
  <div className="p-4 border-b border-white/10">
    <p className="text-white font-semibold">
      ARI Playlist
    </p>

    <p className="text-zinc-400 text-sm">
      Music & Memories ✨
    </p>
  </div>

  <iframe
    src="https://open.spotify.com/embed/playlist/5YhjEIWz3B8QGIeJFrV9wN?utm_source=generator"
    width="100%"
    height="352"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
    className="rounded-b-[2rem]"
  />
</div>

        {/* NAVBAR */}
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-full px-8 py-4 flex items-center justify-between shadow-[0_10px_80px_rgba(0,0,0,0.5)]">
            <h1 className="font-black text-xl tracking-wide">
              ARI
            </h1>

            <div className="hidden lg:flex gap-8 text-sm">
              <a href="#about">About</a>
              <a href="#gallery">Gallery</a>
              <a href="#timeline">Timeline</a>
              <a href="#blog">Blog</a>
              <a href="#contact">Contact</a>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full border border-white/10 backdrop-blur-xl"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section className="relative h-screen overflow-hidden flex items-center justify-center">
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

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 text-center px-6"
          >
            <p className="uppercase tracking-[0.5em] text-zinc-400 mb-6 text-sm">
              Creative Developer
            </p>

            <h1 className="text-7xl md:text-[10rem] font-black leading-none bg-gradient-to-b from-white via-zinc-300 to-zinc-600 text-transparent bg-clip-text">
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
              className="mt-10 px-10 py-5 rounded-full bg-white text-black font-semibold shadow-[0_10px_80px_rgba(255,255,255,0.2)] relative overflow-hidden group"
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
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </motion.button>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-20 flex justify-center"
            >
              <ChevronDown size={32} />
            </motion.div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="max-w-7xl mx-auto px-6 py-40"
        >
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.img
              whileHover={{ scale: 1.03 }}
              src="/images/profile.jpeg"
              className="rounded-[3rem] shadow-[0_20px_120px_rgba(255,255,255,0.1)] border border-white/10"
            />

            <div>
              <p className="uppercase tracking-[0.4em] text-zinc-500 text-sm mb-6">
                About Me
              </p>

              <h2 className="text-6xl font-black leading-tight mb-8">
                A Creative Mind
                <br />
                With Beautiful
                <br />
                Memories.
              </h2>

              <p className="text-zinc-400 text-xl leading-relaxed">
                Aku adalah seseorang yang menikmati teknologi,
                visual art, music, dan cinematic experiences.
              </p>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section
          id="timeline"
          className="max-w-5xl mx-auto px-6 py-32"
        >
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black">
              Life Timeline
            </h2>
          </div>

          <div className="space-y-16">
            {[
              {
                year: '2022',
                title: 'Awal Perjalanan',
              },
              {
                year: '2024',
                title: 'Momen Terindah',
              },
              {
                year: '2026',
                title: 'Dream Future',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="border-l border-white/20 pl-8"
              >
                <p className="text-zinc-500">
                  {item.year}
                </p>

                <h3 className="text-4xl font-semibold mt-3">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        <section
          id="gallery"
          className="max-w-7xl mx-auto px-6 py-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-7xl font-black mb-5 bg-gradient-to-b from-white to-zinc-500 text-transparent bg-clip-text">
              Gallery
            </h2>

            <p className="text-zinc-400 text-lg">
              Simpan semua kenangan terbaikmu.
            </p>
          </div>

          {/* UPLOAD IMAGE */}
          <div className="mb-12 flex justify-center">
            <label className="cursor-pointer px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition shadow-[0_10px_40px_rgba(255,255,255,0.3)]">
              Upload Foto

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]

                  if (file) {
                    setUploadedImage(URL.createObjectURL(file))
                  }
                }}
              />
            </label>
          </div>

          {/* PREVIEW */}
          {uploadedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-16"
            >
              <img
                src={uploadedImage}
                className="w-full max-h-[700px] object-cover rounded-[3rem] shadow-[0_20px_100px_rgba(255,255,255,0.15)] border border-white/10"
              />
            </motion.div>
          )}

          {/* GALLERY GRID */}
          <div className="grid md:grid-cols-3 gap-8 perspective-[2000px]">
            {gallery.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{
                  rotateY: 10,
                  rotateX: -5,
                  scale: 1.03,
                }}
                transition={{ duration: 0.4 }}
                className="relative rounded-[2rem] overflow-hidden group"
              >
                <img
                  src={img}
                  className="w-full h-[500px] object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition" />

                <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition">
                  <h3 className="text-3xl font-bold">
                    Beautiful Moment
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
<section
  id="projects"
  className="relative max-w-7xl mx-auto px-6 py-40 overflow-hidden"
>
  {/* BACKGROUND GLOW */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500 blur-[180px] rounded-full" />

    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500 blur-[180px] rounded-full" />
  </div>

  {/* TITLE */}
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="relative z-10 text-center mb-24"
  >
    <p className="uppercase tracking-[0.5em] text-zinc-500 text-sm mb-6">
      My Works
    </p>

    <h2 className="text-4xl sm:text-6xl md:text-8xl font-black bg-gradient-to-b from-white via-zinc-300 to-zinc-600 text-transparent bg-clip-text">
      Featured Projects.
    </h2>

    <p className="max-w-2xl mx-auto mt-8 text-zinc-400 text-xl leading-relaxed">
      Kumpulan project yang pernah aku buat dengan
      fokus pada design, experience, dan teknologi modern.
    </p>
  </motion.div>

  {/* PROJECT GRID */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 relative z-10">

    {[
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
    ].map((project, index) => (
      <motion.a
        key={index}
        href={project.link}
        target="_blank"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        whileHover={{
          y: -10,
          scale: 1.02,
        }}
        className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl"
      >
        {/* IMAGE */}
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            className="w-full h-[350px] object-cover group-hover:scale-110 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="p-10">
          <p className="text-zinc-500 text-sm mb-4">
            {project.tech}
          </p>

          <h3 className="text-4xl font-bold mb-5">
            {project.title}
          </h3>

          <p className="text-zinc-400 leading-relaxed text-lg">
            {project.desc}
          </p>

          <motion.div
            whileHover={{ x: 10 }}
            className="mt-8 inline-flex items-center gap-3 text-white font-medium"
          >
            View Project →
          </motion.div>
        </div>

        {/* GLOW */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      </motion.a>
    ))}
  </div>
</section>

        {/* BLOG */}
        <section
          id="blog"
          className="relative max-w-7xl mx-auto px-6 py-40 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-500 blur-[180px] rounded-full" />

            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500 blur-[180px] rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative z-10 text-center"
          >
            <p className="uppercase tracking-[0.5em] text-zinc-500 text-sm mb-6">
              Future Stories
            </p>

            <h2 className="text-6xl md:text-8xl font-black leading-tight bg-gradient-to-b from-white via-zinc-300 to-zinc-600 text-transparent bg-clip-text">
              Coming Soon.
            </h2>

            <p className="max-w-2xl mx-auto mt-8 text-zinc-400 text-xl leading-relaxed">
              Sebuah tempat untuk cerita perjalanan hidup,
              pengalaman, karya, dan semua momen yang akan datang.
            </p>

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="mt-16 inline-flex items-center gap-4 px-8 py-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_10px_80px_rgba(255,255,255,0.08)]"
            >
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />

              <p className="text-zinc-300 font-medium">
                Blog System Under Development
              </p>
            </motion.div>
          </motion.div>

          <div className="mt-24 grid md:grid-cols-3 gap-8 relative z-10">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                whileHover={{
                  y: -15,
                  scale: 1.02,
                }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-10"
              >
                <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-white/20 to-transparent" />

                <div className="relative z-10">
                  <p className="text-zinc-500 text-sm mb-4">
                    Future Update 0{item}
                  </p>

                  <h3 className="text-3xl font-bold mb-6">
                    New Story Loading...
                  </h3>

                  <p className="text-zinc-400 leading-relaxed mb-8">
                    Konten baru akan segera hadir dengan pengalaman visual
                    yang lebih cinematic dan interaktif.
                  </p>

                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      animate={{
                        width: ['0%', '100%', '0%'],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                      }}
                      className="h-full bg-gradient-to-r from-white to-zinc-500"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="max-w-5xl mx-auto px-6 py-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[3rem] p-12 text-center"
          >
            <h2 className="text-5xl font-bold mb-6">
              Let’s Connect
            </h2>

            <p className="text-zinc-400 text-lg mb-12">
              Jika ingin mengenal lebih dekat atau bekerja sama.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6">

  {/* INSTAGRAM */}
  <motion.a
    whileHover={{
      scale: 1.05,
      y: -5,
    }}
    href="https://www.instagram.com/mahennn_ly/#"
    target="_blank"
    className="flex items-center gap-3 px-6 py-4 rounded-full bg-white text-black font-medium shadow-[0_10px_50px_rgba(255,255,255,0.2)]"
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
    href="mailto:www.putuari123@gmail.com"
    className="flex items-center gap-3 px-6 py-4 rounded-full border border-white/20 hover:bg-white/10 transition"
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
    href="https://wa.me/6285261653172"
    target="_blank"
    className="flex items-center gap-3 px-6 py-4 rounded-full border border-green-500/30 bg-green-500/10 hover:bg-green-500/20 transition"
  >
    <Phone size={20} />
    WhatsApp
  </motion.a>

</div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 py-10 px-6 text-center text-zinc-500">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music2 size={18} />
            <p>Music & Memories</p>
          </div>

          <p>
            © 2026 by ARI — Apple Inspired Website.
          </p>
        </footer>
      </main>
      <AIAssistant />
    </>
  )
}