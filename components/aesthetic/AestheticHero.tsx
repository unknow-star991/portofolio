'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDown,
  Mail,
  Copy,
  Check,
  Download,
  ExternalLink,
} from 'lucide-react'
import { InstagramIcon, GithubIcon } from '@/components/cinematic/Icons'
import { portfolioConfig } from '@/data/portfolio'
import { sound } from '@/lib/audio'
import { smoothScrollTo } from '@/lib/scroll'

type Props = {
  onOpenCommand: () => void
}

export default function AestheticHero({ onOpenCommand }: Props) {
  const [copied, setCopied] = useState(false)
  const { personal, metrics } = portfolioConfig

  const handleCopyEmail = () => {
    sound.playFocusBeep()
    navigator.clipboard.writeText(personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const scrollTo = (id: string) => {
    sound.playClick()
    smoothScrollTo(id, -80)
  }

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
            <h2>Summary</h2>
            <p>${personal.bio}</p>
            <h2>Technical Skills</h2>
            <ul>
              ${portfolioConfig.skills
                .map((cat) => `<li><strong>${cat.title}:</strong> ${cat.skills.join(', ')}</li>`)
                .join('')}
            </ul>
            <h2>Featured Productions</h2>
            <ul>
              ${portfolioConfig.projects
                .map((proj) => `<li><strong>${proj.title} (${proj.year}):</strong> ${proj.desc}</li>`)
                .join('')}
            </ul>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => printWindow.print(), 250)
    }
  }

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-24 sm:pt-28 pb-16 px-6 max-w-7xl mx-auto scroll-mt-24">
      {/* TOP PILL BADGE */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl text-xs font-mono-code text-zinc-300 self-start mb-6 sm:mb-8"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-zinc-200">{personal.status.toUpperCase()}</span>
        <span className="text-zinc-600 hidden sm:inline">•</span>
        <span className="text-amber-400 hidden sm:inline">{personal.year} EDITION</span>
      </motion.div>

      {/* EDITORIAL HERO HEADLINE WITH TYPESETTER ENHANCEMENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15 }}
        className="max-w-5xl"
      >
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95] text-white break-words">
          Ari <span className="font-display italic font-normal text-amber-200">Mahendra.</span>
        </h1>

        <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-light text-zinc-300 mt-5 sm:mt-6 max-w-3xl leading-relaxed text-balance">
          {personal.headline}
        </p>
      </motion.div>

      {/* CONNECTED ACCOUNTS & SOCIAL PILLS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35 }}
        className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3 font-mono-code text-xs"
      >
        {/* EMAIL WITH ONE-CLICK COPY */}
        <button
          onClick={handleCopyEmail}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 hover:text-white border border-white/10 transition group cursor-pointer"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Mail size={14} className="text-amber-400" />}
          <span className="truncate max-w-[200px] sm:max-w-none">{copied ? 'Copied to Clipboard!' : personal.email}</span>
          <Copy size={12} className="text-zinc-500 group-hover:text-zinc-300" />
        </button>

        {/* INSTAGRAM */}
        <a
          href={personal.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 hover:text-white border border-white/10 transition group cursor-pointer"
        >
          <InstagramIcon size={14} className="text-pink-400" />
          <span>{personal.instagram.handle}</span>
          <ExternalLink size={12} className="text-zinc-500 group-hover:text-zinc-300" />
        </a>

        {/* GITHUB */}
        <a
          href={personal.github.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 hover:text-white border border-white/10 transition group cursor-pointer"
        >
          <GithubIcon size={14} className="text-cyan-400" />
          <span>{personal.github.username}</span>
          <ExternalLink size={12} className="text-zinc-500 group-hover:text-zinc-300" />
        </a>
      </motion.div>

      {/* PRIMARY CTA ACTIONS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
      >
        {/* VIEW PROJECTS */}
        <button
          onClick={() => scrollTo('projects')}
          className="flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:scale-105 active:scale-95 transition shadow-[0_0_40px_rgba(255,255,255,0.25)] cursor-pointer"
        >
          <span>Explore Works</span>
          <ArrowDown size={15} />
        </button>

        {/* DOWNLOAD CV */}
        <button
          onClick={handleDownloadCV}
          className="flex items-center gap-2 px-5 py-3.5 sm:px-6 sm:py-4 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-medium text-xs sm:text-sm border border-white/10 transition cursor-pointer"
        >
          <Download size={15} className="text-zinc-400" />
          <span>Download CV</span>
        </button>

        {/* COMMAND PALETTE SHORTCUT */}
        <button
          onClick={() => {
            sound.playClick()
            onOpenCommand()
          }}
          className="hidden sm:flex items-center gap-2 px-4 py-3.5 sm:px-5 sm:py-4 rounded-full bg-black/60 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 font-mono-code text-xs border border-white/10 transition cursor-pointer"
        >
          <span>Command Palette</span>
          <kbd className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-zinc-300">⌘K</kbd>
        </button>
      </motion.div>

      {/* METRIC HIGHLIGHT CARDS (GENERATED FROM CONFIG) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 font-mono-code"
      >
        {metrics.map((item, idx) => (
          <div key={idx} className="p-3 sm:p-0 rounded-2xl bg-white/[0.02] sm:bg-transparent">
            <p className="text-[10px] sm:text-[11px] uppercase text-zinc-500 tracking-wider">{item.label}</p>
            <p className="text-lg sm:text-2xl font-bold text-white mt-0.5 sm:mt-1">{item.value}</p>
            <p className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">{item.sub}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
