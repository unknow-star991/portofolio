'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Volume2,
  VolumeX,
  Code2,
  Compass,
  Cpu,
  ArrowUpRight,
  Zap,
} from 'lucide-react'
import { portfolioConfig } from '@/data/portfolio'
import { sound } from '@/lib/audio'

export default function AestheticHighlights() {
  const { personal, projects, skills } = portfolioConfig
  const [soundActive, setSoundActive] = useState(() => (typeof window !== 'undefined' ? sound.isSoundEnabled : false))
  const [ambientActive, setAmbientActive] = useState(() => (typeof window !== 'undefined' ? sound.isAmbientPlaying : false))

  const toggleSound = () => {
    const newState = !soundActive
    sound.isSoundEnabled = newState
    setSoundActive(newState)
    if (newState) {
      sound.playFocusBeep()
    }
  }

  const toggleAmbientSound = () => {
    sound.isSoundEnabled = true
    setSoundActive(true)
    const playing = sound.toggleAmbient()
    setAmbientActive(playing)
    if (!playing) {
      sound.playClick()
    }
  }

  // Flatten top skills for display
  const featuredSkills = skills.flatMap((cat) => cat.skills).slice(0, 8)

  return (
    <section
      id="highlights"
      className="relative max-w-7xl mx-auto px-6 py-20 sm:py-28 overflow-hidden scroll-mt-24"
    >
      {/* SECTION HEADER */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-mono-code mb-4">
          <Sparkles size={13} />
          <span>PORTFOLIO HIGHLIGHTS & BENTO</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]">
          Engineered for <span className="font-display italic text-amber-200">Impact</span>,{' '}
          Refined by <span className="font-display italic text-cyan-200">Aesthetics.</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base md:text-lg mt-4 font-light leading-relaxed">
          Kombinasi performa komputasi modern, sintesis suara taktil di browser, dan dedikasi pada detail antarmuka kelas dunia.
        </p>
      </div>

      {/* BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* CARD 1: EDITORIAL QUOTE (Spans 2 columns on lg) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0e1017] via-[#090a0f] to-[#07080b] border border-white/10 hover:border-amber-400/30 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/[0.04] rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between font-mono-code text-xs text-zinc-500 mb-6">
              <span className="uppercase tracking-widest text-amber-400">Design Philosophy</span>
              <span>01 // MANIFESTO</span>
            </div>

            <p className="font-display italic text-xl sm:text-2xl md:text-3xl text-zinc-100 font-normal leading-relaxed">
              &ldquo;{personal.quote}&rdquo;
            </p>
          </div>

          <div className="pt-8 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono-code">
            <div>
              <p className="text-white font-bold">{personal.name}</p>
              <p className="text-zinc-500 text-[11px]">{personal.role}</p>
            </div>
            <span className="text-amber-400/80 font-mono-code text-[11px]">2022 — {personal.year}</span>
          </div>
        </motion.div>

        {/* CARD 2: TACTILE SOUND SYNTHESIZER (Interactive Audio Tool) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-6 rounded-3xl bg-[#0b0c12] border border-white/10 hover:border-cyan-400/30 transition-all duration-300 flex flex-col justify-between group shadow-xl"
        >
          <div>
            <div className="flex items-center justify-between font-mono-code text-xs text-zinc-500 mb-4">
              <span className="text-cyan-400 uppercase tracking-wider">Audio Engine</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                {soundActive ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </div>
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base">Web Audio API</h3>
                <p className="text-[11px] text-zinc-400 font-mono-code">0ms Latency Synthesizer</p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-light mt-2">
              Website ini dilengkapi efek suara analog interaktif &amp; warm tape drone tanpa dependensi eksternal.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
            <button
              onClick={toggleSound}
              className={`w-full py-2 px-3 rounded-full text-xs font-mono-code flex items-center justify-between transition cursor-pointer ${
                soundActive
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <span>UI SFX Clicks</span>
              <span className="text-[10px] font-bold">{soundActive ? 'ACTIVE' : 'MUTED'}</span>
            </button>

            <button
              onClick={toggleAmbientSound}
              className={`w-full py-2 px-3 rounded-full text-xs font-mono-code flex items-center justify-between transition cursor-pointer ${
                ambientActive
                  ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30 font-semibold'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <span>55Hz Warm Drone</span>
              <span className="text-[10px] font-bold">{ambientActive ? 'PLAYING' : 'OFF'}</span>
            </button>
          </div>
        </motion.div>

        {/* CARD 3: STATUS & LOCATION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="p-6 rounded-3xl bg-[#0b0c12] border border-white/10 hover:border-emerald-400/30 transition-all duration-300 flex flex-col justify-between group shadow-xl"
        >
          <div>
            <div className="flex items-center justify-between font-mono-code text-xs text-zinc-500 mb-4">
              <span className="text-emerald-400 uppercase tracking-wider">Availability</span>
              <Compass size={14} className="text-zinc-500" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono-code mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{personal.status}</span>
            </div>

            <h3 className="text-white font-bold text-base mt-2">{personal.location}</h3>
            <p className="text-xs text-zinc-400 font-mono-code mt-1">UTC+7 Timezone / Bilingual</p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono-code text-zinc-400">
            <span>Fast Response Rate</span>
            <span className="text-emerald-400 font-bold">&lt; 24h</span>
          </div>
        </motion.div>

        {/* CARD 4: EXPERIENCE & PRODUCTIONS STATS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 rounded-3xl bg-[#0b0c12] border border-white/10 hover:border-amber-400/30 transition-all duration-300 flex flex-col justify-between group shadow-xl"
        >
          <div>
            <div className="flex items-center justify-between font-mono-code text-xs text-zinc-500 mb-3">
              <span className="text-amber-400 uppercase tracking-wider">Metrics</span>
              <Zap size={14} className="text-amber-400" />
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">4+ <span className="text-amber-300 text-lg font-light">Years</span></p>
                <p className="text-[11px] font-mono-code text-zinc-400 uppercase tracking-wider mt-0.5">Crafting Web Systems</p>
              </div>

              <div className="pt-3 border-t border-white/5">
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">{projects.length} <span className="text-cyan-300 text-base font-light">Major</span></p>
                <p className="text-[11px] font-mono-code text-zinc-400 uppercase tracking-wider mt-0.5">Featured Productions</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono-code text-zinc-400 flex items-center justify-between">
            <span>Architecture</span>
            <span className="text-zinc-200">Next.js 16 + React 19</span>
          </div>
        </motion.div>

        {/* CARD 5: CURATED TECH RADAR (Spans 2 columns on lg) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-[#0b0c12] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-xl"
        >
          <div>
            <div className="flex items-center justify-between font-mono-code text-xs text-zinc-500 mb-4">
              <span className="text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 size={14} className="text-amber-400" />
                Featured Tech Arsenal
              </span>
              <span className="text-[11px]">8 Core Pillars</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {featuredSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] text-zinc-200 hover:text-white border border-white/10 font-mono-code text-xs transition cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Cpu size={13} className="text-cyan-400" />
              60.0 FPS Hardware-accelerated transitions
            </span>
            <a
              href="#projects"
              onClick={() => sound.playClick()}
              className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 group-hover:translate-x-1 transition cursor-pointer"
            >
              <span>See in Action</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.div>

        {/* CARD 6: QUICK LAB SHORTCUTS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-6 rounded-3xl bg-gradient-to-br from-[#0c0d14] to-[#07080c] border border-white/10 hover:border-amber-400/30 transition-all duration-300 flex flex-col justify-between group shadow-xl"
        >
          <div>
            <div className="flex items-center justify-between font-mono-code text-xs text-zinc-500 mb-3">
              <span className="text-amber-400 uppercase tracking-wider">Sub-Systems</span>
              <span className="text-[11px]">Pages</span>
            </div>

            <div className="space-y-3">
              <a
                href="/animations"
                onClick={() => sound.playClick()}
                className="block p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-amber-400/20 transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="text-white font-bold">Motion Lab</span>
                  <ArrowUpRight size={13} className="text-amber-400" />
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">3D tilt, aperture simulator &amp; kinetic physics.</p>
              </a>

              <a
                href="/darkroom"
                onClick={() => sound.playClick()}
                className="block p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-cyan-400/20 transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="text-white font-bold">Darkroom Archive</span>
                  <ArrowUpRight size={13} className="text-cyan-400" />
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">35mm photo journal with studio login.</p>
              </a>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono-code text-zinc-500">
            PRESS ⌘K FOR QUICK COMMANDS
          </div>
        </motion.div>

      </div>
    </section>
  )
}
