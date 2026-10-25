'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Copy,
  Check,
  X,
  Code2,
  User,
  Clock,
  Images,
  Send,
  Sparkles,
} from 'lucide-react'
import { InstagramIcon, GithubIcon } from './Icons'
import { portfolioConfig } from '@/data/portfolio'
import { sound } from '@/lib/audio'
import { smoothScrollTo } from '@/lib/scroll'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function CommandPalette({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(false)
  const { personal } = portfolioConfig

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) {
          onClose()
        } else {
          sound.playClick()
          sound.playFocusBeep()
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const scrollTo = (id: string) => {
    sound.playClick()
    onClose()
    smoothScrollTo(id, -80)
  }

  const handleCopyEmail = () => {
    sound.playFocusBeep()
    navigator.clipboard.writeText(personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sections = [
    { id: 'hero', name: 'Hero / Introduction', icon: User, shortcut: '1' },
    { id: 'highlights', name: 'Portfolio Bento & Highlights', icon: Sparkles, shortcut: '2' },
    { id: 'projects', name: 'Selected Works (Projects)', icon: Code2, shortcut: '3' },
    { id: 'about', name: 'About & Philosophy', icon: User, shortcut: '4' },
    { id: 'timeline', name: 'Experience & Milestones', icon: Clock, shortcut: '5' },
    { id: 'gallery', name: 'Visual Gallery', icon: Images, shortcut: '6' },
    { id: 'contact', name: 'Get In Touch (Contact)', icon: Send, shortcut: '7' },
  ]

  const actions = [
    {
      name: 'Copy Email Address',
      desc: personal.email,
      icon: copied ? Check : Copy,
      action: handleCopyEmail,
    },
    {
      name: 'Open Instagram Profile',
      desc: personal.instagram.handle,
      icon: InstagramIcon,
      action: () => {
        sound.playClick()
        window.open(personal.instagram.url, '_blank')
        onClose()
      },
    },
    {
      name: 'Open GitHub Profile',
      desc: `github.com/${personal.github.username}`,
      icon: GithubIcon,
      action: () => {
        sound.playClick()
        window.open(personal.github.url, '_blank')
        onClose()
      },
    },
    {
      name: 'Open Darkroom Archive',
      desc: '35mm Photo album & photo manager (/darkroom)',
      icon: Images,
      action: () => {
        sound.playFocusBeep()
        window.location.assign('/darkroom')
      },
    },
    {
      name: 'Open Motion & Physics Lab',
      desc: 'Kinetic 3D physics & aperture simulator (/animations)',
      icon: Sparkles,
      action: () => {
        sound.playFocusBeep()
        window.location.assign('/animations')
      },
    },
  ]

  const filteredSections = sections.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  )
  const filteredActions = actions.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.desc.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* PALETTE WINDOW */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#090b10] border border-white/15 rounded-2xl shadow-[0_25px_100px_rgba(0,0,0,0.9)] overflow-hidden z-10"
          >
            {/* SEARCH INPUT */}
            <div className="relative flex items-center px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
              <Search className="text-zinc-400 mr-3" size={18} />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a section, link, or search..."
                className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none text-sm font-sans"
              />
              <button
                onClick={onClose}
                className="text-zinc-500 hover:text-white p-1 rounded-md transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* RESULTS LIST */}
            <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4 font-sans text-sm">
              {/* SECTIONS */}
              {filteredSections.length > 0 && (
                <div>
                  <p className="px-3 text-[10px] uppercase font-mono-code tracking-widest text-zinc-500 mb-2">
                    Jump to Section
                  </p>
                  <div className="space-y-1">
                    {filteredSections.map((sec) => {
                      const Icon = sec.icon
                      return (
                        <button
                          key={sec.id}
                          onClick={() => scrollTo(sec.id)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-zinc-300 hover:text-white hover:bg-white/10 transition group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 group-hover:text-amber-400 transition">
                              <Icon size={14} />
                            </div>
                            <span className="font-medium text-xs sm:text-sm">{sec.name}</span>
                          </div>
                          <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/5 text-zinc-500 group-hover:text-zinc-300 border border-white/5">
                            Jump
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* QUICK ACTIONS */}
              {filteredActions.length > 0 && (
                <div>
                  <p className="px-3 text-[10px] uppercase font-mono-code tracking-widest text-zinc-500 mb-2">
                    Accounts & Tools
                  </p>
                  <div className="space-y-1">
                    {filteredActions.map((action, i) => {
                      const Icon = action.icon
                      return (
                        <button
                          key={i}
                          onClick={action.action}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-zinc-300 hover:text-white hover:bg-white/10 transition group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 group-hover:text-amber-400 transition">
                              <Icon size={14} />
                            </div>
                            <div>
                              <p className="font-medium text-xs sm:text-sm text-zinc-200 group-hover:text-white">
                                {action.name}
                              </p>
                              <p className="text-[11px] text-zinc-500">{action.desc}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/5 text-zinc-500 group-hover:text-zinc-300 border border-white/5">
                            Open
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* PALETTE FOOTER */}
            <div className="px-4 py-2.5 bg-black/60 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500 font-mono-code">
              <span>Use ESC to close</span>
              <span>ARI MAHENDRA PORTFOLIO</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
