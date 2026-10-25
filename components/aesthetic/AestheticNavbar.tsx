'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Command, Menu, X, ArrowUpRight, Sparkles, Images, Volume2, VolumeX } from 'lucide-react'
import Link from 'next/link'
import { InstagramIcon, GithubIcon } from '@/components/cinematic/Icons'
import { portfolioConfig } from '@/data/portfolio'
import { sound } from '@/lib/audio'
import { smoothScrollTo } from '@/lib/scroll'

type Props = {
  activeSection: string
  navbarSmall: boolean
  onOpenCommand: () => void
}

export default function AestheticNavbar({
  activeSection,
  navbarSmall,
  onOpenCommand,
}: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(() => (typeof window !== 'undefined' ? sound.isSoundEnabled : false))

  const toggleSound = () => {
    const newState = !soundEnabled
    sound.isSoundEnabled = newState
    setSoundEnabled(newState)
    if (newState) {
      sound.playFocusBeep()
    }
  }

  const navItems = [
    { id: 'highlights', label: 'Highlights' },
    { id: 'projects', label: 'Works' },
    { id: 'about', label: 'About' },
    { id: 'timeline', label: 'Journey' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ]

  const handleNavClick = (id: string) => {
    sound.playClick()
    setMobileMenuOpen(false)
    smoothScrollTo(id, -80)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: navbarSmall ? 10 : 20, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 140, damping: 20 }}
        className="fixed left-1/2 -translate-x-1/2 top-0 z-50 rounded-full border border-white/15 bg-black/80 backdrop-blur-[28px] shadow-[0_15px_60px_rgba(0,0,0,0.85)] px-4 sm:px-6 py-2.5 sm:py-3 select-none flex items-center justify-between gap-3 sm:gap-6 max-w-[96vw] w-full sm:w-auto"
      >
        {/* BRAND NICKNAME */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('hero')
          }}
          className="flex items-center gap-2 group cursor-pointer pl-1"
        >
          <span className="text-sm sm:text-base font-black tracking-[0.2em] text-white group-hover:text-amber-400 transition-colors">
            {portfolioConfig.personal.nickname}
          </span>
        </a>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-1 font-mono-code text-xs">
          {navItems.map((item) => {
            const active = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                  active ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 rounded-full bg-white/15 border border-white/20"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 uppercase tracking-wider text-[11px]">
                  {item.label}
                </span>
              </button>
            )
          })}

          {/* MOTION LAB ROUTE */}
          <Link
            href="/animations"
            onClick={() => sound.playClick()}
            className="px-3 py-1.5 rounded-full text-zinc-400 hover:text-amber-300 transition-colors uppercase tracking-wider text-[11px] font-medium cursor-pointer"
          >
            Motion Lab
          </Link>

          {/* DARKROOM ALBUM ROUTE */}
          <Link
            href="/darkroom"
            onClick={() => sound.playClick()}
            className="px-3 py-1.5 rounded-full text-zinc-400 hover:text-cyan-300 transition-colors uppercase tracking-wider text-[11px] font-medium cursor-pointer"
          >
            Darkroom
          </Link>
        </nav>

        {/* RIGHT ACTIONS & SOCIALS */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* SOUND SFX TOGGLE BUTTON */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full border transition cursor-pointer ${
              soundEnabled
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'text-zinc-400 hover:text-white hover:bg-white/10 border-transparent'
            }`}
            title={soundEnabled ? 'Mute Interface SFX' : 'Enable Interactive Sound Synthesizer'}
            aria-label="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>

          {/* INSTAGRAM LINK */}
          <a
            href={portfolioConfig.personal.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="p-2 rounded-full text-zinc-400 hover:text-pink-400 hover:bg-white/10 transition cursor-pointer"
            title={`Instagram ${portfolioConfig.personal.instagram.handle}`}
          >
            <InstagramIcon size={14} />
          </a>

          {/* GITHUB LINK */}
          <a
            href={portfolioConfig.personal.github.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="p-2 rounded-full text-zinc-400 hover:text-cyan-400 hover:bg-white/10 transition cursor-pointer"
            title={`GitHub ${portfolioConfig.personal.github.username}`}
          >
            <GithubIcon size={14} />
          </a>

          {/* COMMAND PALETTE BUTTON */}
          <button
            onClick={() => {
              sound.playClick()
              onOpenCommand()
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono-code transition cursor-pointer"
            title="Command Palette (Cmd+K)"
          >
            <Command size={12} />
            <span className="hidden sm:inline text-[10px]">⌘K</span>
          </button>

          {/* MOBILE MENU TOGGLE (MOBILE ONLY) */}
          <button
            onClick={() => {
              sound.playClick()
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            className="md:hidden p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.header>

      {/* MOBILE FULLSCREEN OVERLAY MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#08080a]/98 backdrop-blur-3xl md:hidden flex flex-col justify-between pt-28 pb-10 px-6 font-mono-code overflow-y-auto"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2 pb-2 border-b border-white/10">
                <span className="text-[10px] uppercase text-zinc-500 tracking-widest">
                  Navigation
                </span>
                <button
                  onClick={toggleSound}
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
                >
                  {soundEnabled ? <Volume2 size={13} className="text-cyan-400" /> : <VolumeX size={13} />}
                  <span>SFX: {soundEnabled ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="w-full text-left px-4 py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] text-white font-medium text-base transition flex items-center justify-between cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <span className="text-zinc-600 text-xs font-mono-code">#{item.id}</span>
                  </button>
                ))}
              </div>

              <p className="text-[10px] uppercase text-zinc-500 tracking-widest pl-2 pt-2">
                Showcase &amp; Experiments
              </p>
              <div className="space-y-2">
                <Link
                  href="/animations"
                  onClick={() => {
                    sound.playClick()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] text-amber-300 font-medium text-base transition flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles size={16} />
                    Motion &amp; Physics Lab
                  </span>
                  <ArrowUpRight size={14} className="text-zinc-500" />
                </Link>

                <Link
                  href="/darkroom"
                  onClick={() => {
                    sound.playClick()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] text-cyan-300 font-medium text-base transition flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Images size={16} />
                    Darkroom Archive (35mm)
                  </span>
                  <ArrowUpRight size={14} className="text-zinc-500" />
                </Link>
              </div>
            </div>

            {/* MOBILE FOOTER SOCIALS */}
            <div className="pt-6 border-t border-white/10 space-y-3 text-xs">
              <a
                href={`mailto:${portfolioConfig.personal.email}`}
                className="text-zinc-300 hover:text-white block truncate"
              >
                {portfolioConfig.personal.email}
              </a>
              <div className="flex items-center gap-4 text-zinc-400">
                <a
                  href={portfolioConfig.personal.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 flex items-center gap-1 cursor-pointer"
                >
                  <InstagramIcon size={14} />
                  <span>Instagram</span>
                </a>
                <a
                  href={portfolioConfig.personal.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 flex items-center gap-1 cursor-pointer"
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
