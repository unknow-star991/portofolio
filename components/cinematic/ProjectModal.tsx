'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { GithubIcon } from './Icons'
import { sound } from '@/lib/audio'
import type { ProjectItem } from '@/data/portfolio'

export type { ProjectItem }

type Props = {
  project: ProjectItem | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  if (!project) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* BACKDROP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClick()
            onClose()
          }}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
        />

        {/* MODAL CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full max-w-4xl bg-[#08090d] border border-white/20 rounded-3xl overflow-hidden shadow-[0_25px_120px_rgba(0,0,0,0.95)] z-10 my-auto"
        >
          {/* TOP FILMSTRIP HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60 font-mono-code text-[11px] text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-bold tracking-widest">{project.frameNumber || `SCENE-0${project.id}`}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-200 uppercase tracking-widest">{project.title}</span>
            </div>

            <button
              onClick={() => {
                sound.playClick()
                onClose()
              }}
              className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* PROJECT STILL / IMAGE */}
          <div className="relative aspect-[21/9] sm:aspect-[2.39/1] w-full overflow-hidden bg-zinc-950">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-black/30" />
            
            {/* BADGES ON IMAGE */}
            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-mono-code uppercase tracking-widest text-amber-300 mb-1">
                  Director&apos;s Cut • {project.year}
                </p>
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                  {project.title}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 font-mono-code text-[10px] text-zinc-300">
                ASPECT 2.39:1
              </span>
            </div>
          </div>

          {/* CONTENT BODY */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* SYNOPSIS & ARCHITECTURE */}
              <div className="md:col-span-2 space-y-4">
                <h4 className="text-xs uppercase font-mono-code tracking-widest text-zinc-400">
                  Project Synopsis & Architecture
                </h4>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {project.longDesc}
                </p>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {project.desc}
                </p>
              </div>

              {/* FILM METADATA SIDEBAR */}
              <div className="space-y-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono-code">
                <div>
                  <p className="text-[10px] uppercase text-zinc-500 tracking-wider">Role</p>
                  <p className="text-zinc-200 mt-0.5">{project.role || 'Lead Creative Engineer'}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-zinc-500 tracking-wider">Performance</p>
                  <p className="text-amber-400 mt-0.5">{project.metrics || '60 FPS • High Fidelity'}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-zinc-500 tracking-wider">Timeline</p>
                  <p className="text-zinc-200 mt-0.5">Production Year {project.year}</p>
                </div>
              </div>
            </div>

            {/* TECH STACK CHIPS */}
            <div>
              <p className="text-[10px] uppercase font-mono-code tracking-widest text-zinc-500 mb-2.5">
                Technical Blueprint
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono-code"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playFocusBeep()}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:scale-105 transition shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                >
                  <ExternalLink size={15} />
                  <span>Launch Production</span>
                </a>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 text-white font-medium text-xs sm:text-sm hover:bg-white/20 transition border border-white/10"
                  >
                    <GithubIcon size={15} />
                    <span>View Repository</span>
                  </a>
                )}
              </div>

              <span className="text-[11px] font-mono-code text-zinc-500 hidden sm:inline">
                PRESS ESC TO CLOSE
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
