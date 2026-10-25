'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { portfolioConfig } from '@/data/portfolio'

export default function AestheticTimeline() {
  const { timeline } = portfolioConfig

  return (
    <section id="timeline" className="relative max-w-5xl mx-auto px-6 py-20 sm:py-28 overflow-hidden scroll-mt-24">
      {/* SECTION HEADER */}
      <div className="max-w-2xl mb-14 sm:mb-16 text-center mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-mono-code mb-3">
          <Sparkles size={13} />
          <span>CAREER ROADMAP</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]">
          Experience &amp; <span className="font-display italic text-amber-200">Milestones.</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-3 font-light">
          Rekam jejak pertumbuhan, pembelajaran teknologi modern, dan dedikasi pada rekayasa antarmuka kreatif.
        </p>
      </div>

      {/* ROADMAP TREE */}
      <div className="relative border-l border-white/15 ml-4 sm:ml-10 pl-6 sm:pl-10 space-y-8 sm:space-y-10">
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group"
          >
            {/* PIN NODE */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#050608] border-2 border-amber-400 group-hover:scale-125 transition-transform flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>

            {/* CARD */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#0b0c12] border border-white/10 group-hover:border-white/20 transition-all duration-300 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10 text-xs font-mono-code">
                <span className="text-amber-400 font-bold tracking-wider">{item.year}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/10 text-[10px] uppercase font-semibold">
                  {item.badge}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-3 group-hover:text-amber-200 transition-colors">
                {item.title}
              </h3>

              <p className="text-zinc-400 text-xs sm:text-sm mt-2.5 leading-relaxed font-light">
                {item.desc}
              </p>

              <div className="mt-5 pt-3.5 border-t border-white/5 flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono-code text-zinc-400"
                  >
                    <CheckCircle2 size={12} className="text-amber-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
