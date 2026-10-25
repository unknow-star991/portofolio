'use client'

import { motion } from 'framer-motion'
import { Download, Cpu, Sparkles } from 'lucide-react'
import { portfolioConfig } from '@/data/portfolio'
import { sound } from '@/lib/audio'

export default function AestheticAbout() {
  const { personal, skills } = portfolioConfig

  const handleDownloadCV = () => {
    sound.playFocusBeep()
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${personal.name} — ${personal.role}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #111; line-height: 1.6; max-width: 800px; margin: auto; }
              h1 { font-size: 32px; margin-bottom: 4px; }
              p.title { font-size: 16px; color: #555; margin-top: 0; }
              .contacts { font-size: 14px; color: #444; border-bottom: 1px solid #ddd; padding-bottom: 16px; margin-bottom: 24px; }
              h2 { font-size: 18px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #222; padding-bottom: 6px; margin-top: 28px; }
              ul { list-style: square; padding-left: 20px; }
              li { margin-bottom: 8px; }
            </style>
          </head>
          <body>
            <h1>${personal.name.toUpperCase()}</h1>
            <p class="title">${personal.role}</p>
            <div class="contacts">
              <strong>Email:</strong> ${personal.email} | <strong>Instagram:</strong> ${personal.instagram.handle} | <strong>GitHub:</strong> ${personal.github.username}
            </div>
            <h2>About</h2>
            <p>${personal.bio}</p>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => printWindow.print(), 250)
    }
  }

  return (
    <section id="about" className="relative max-w-7xl mx-auto px-6 py-20 sm:py-28 overflow-hidden scroll-mt-24">
      {/* SECTION HEADER */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-mono-code mb-3">
          <Sparkles size={13} />
          <span>BEHIND THE CODE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]">
          A Creative Mind With An Eye For{' '}
          <span className="font-display italic text-amber-200">Refined Detail.</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* LEFT: PROFILE PICTURE WITH AESTHETIC FRAME */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden p-2.5 bg-gradient-to-b from-white/15 via-white/5 to-transparent border border-white/15 shadow-[0_20px_80px_rgba(0,0,0,0.7)] group">
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-zinc-900">
              <img
                src="/images/profile.jpeg"
                alt={personal.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-bold text-xl sm:text-2xl">{personal.name}</p>
                <p className="text-amber-400 text-xs font-mono-code mt-0.5">
                  {personal.role}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: BIO NARRATIVE & SKILL CATEGORIES */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6 sm:space-y-8"
        >
          <div className="space-y-4 text-zinc-300 text-base sm:text-lg font-light leading-relaxed">
            <p className="text-white font-normal text-lg sm:text-xl md:text-2xl leading-snug">
              &ldquo;{personal.bio}&rdquo;
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Fokus saya berakar pada membangun web interaktif yang cepat, elegan, dan memiliki karakter unik. Dengan mengombinasikan Next.js modern, koreografi animasi Framer Motion yang presisi 60fps, serta estetika visual luxury, setiap antarmuka dirancang untuk memberikan pengalaman digital yang memikat.
            </p>
          </div>

          {/* SKILLS ARSENAL GRID (GENERATED FROM CONFIG) */}
          <div className="pt-2">
            <h3 className="text-xs font-mono-code uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
              <Cpu size={14} className="text-amber-400" />
              Technical Arsenal &amp; Disciplines
            </h3>

            <div className="grid sm:grid-cols-2 gap-3.5">
              {skills.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#0b0c12] border border-white/10 hover:border-white/20 transition-all"
                >
                  <p className="text-xs font-mono-code font-semibold text-amber-300 mb-2">
                    {cat.title}
                  </p>
                  <ul className="space-y-1.5 text-xs font-mono-code text-zinc-400">
                    {cat.skills.map((s, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <span className="text-zinc-200">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ACTION BUTTON */}
          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={handleDownloadCV}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:scale-105 active:scale-95 transition shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer"
            >
              <Download size={15} />
              <span>Download Resume / CV</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
