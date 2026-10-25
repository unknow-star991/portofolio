'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Copy, Check, ArrowUpRight, ArrowUp, Sparkles } from 'lucide-react'
import { InstagramIcon, GithubIcon } from '@/components/cinematic/Icons'
import { portfolioConfig } from '@/data/portfolio'
import { sound } from '@/lib/audio'
import { smoothScrollTo } from '@/lib/scroll'

export default function AestheticContact() {
  const [copied, setCopied] = useState(false)
  const { personal } = portfolioConfig

  const handleCopyEmail = () => {
    sound.playFocusBeep()
    navigator.clipboard.writeText(personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const scrollToTop = () => {
    sound.playClick()
    smoothScrollTo(0)
  }

  return (
    <section id="contact" className="relative max-w-7xl mx-auto px-6 pt-20 sm:pt-28 pb-16 overflow-hidden scroll-mt-24">
      {/* SECTION HEADER */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-mono-code mb-3">
          <Sparkles size={13} />
          <span>CONNECT & COLLABORATE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]">
          Let’s Build Something{' '}
          <span className="font-display italic text-amber-200">Exceptional.</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base md:text-lg mt-3 font-light leading-relaxed">
          Punya ide proyek baru, ingin mendesain website interaktif berstandar internasional, atau sekadar ingin berdiskusi seputar rekayasa kreatif? Hubungi saya kapan saja.
        </p>
      </div>

      {/* 3 HIGH-IMPACT CONTACT CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* 1. DIRECT EMAIL CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-8 rounded-3xl bg-[#0b0c12] border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Mail size={22} />
            </div>
            <p className="text-xs font-mono-code uppercase text-zinc-500 tracking-wider">Direct Inbox</p>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mt-1 break-all">
              {personal.email}
            </h3>
            <p className="text-xs text-zinc-400 mt-2 font-light">
              Tanggapan biasanya dalam 24 jam untuk proyek baru.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition cursor-pointer"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy Email'}</span>
            </button>
            <a
              href={`mailto:${personal.email}`}
              onClick={() => sound.playClick()}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition cursor-pointer"
              title="Open Mail Client"
            >
              <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>

        {/* 2. INSTAGRAM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-6 sm:p-8 rounded-3xl bg-[#0b0c12] border border-white/10 hover:border-pink-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
              <InstagramIcon size={22} />
            </div>
            <p className="text-xs font-mono-code uppercase text-zinc-500 tracking-wider">Social / Visual</p>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {personal.instagram.handle}
            </h3>
            <p className="text-xs text-zinc-400 mt-2 font-light">
              Ikuti update visual, behind-the-scenes desain, dan cerita harian.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10">
            <a
              href={personal.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-white/10 hover:bg-pink-500 hover:text-white text-zinc-200 font-semibold text-xs border border-white/10 transition cursor-pointer"
            >
              <span>Follow {personal.instagram.handle}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>

        {/* 3. GITHUB CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 sm:p-8 rounded-3xl bg-[#0b0c12] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              <GithubIcon size={22} />
            </div>
            <p className="text-xs font-mono-code uppercase text-zinc-500 tracking-wider">Source Code &amp; Repos</p>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {personal.github.username}
            </h3>
            <p className="text-xs text-zinc-400 mt-2 font-light">
              Eksplorasi kode open-source, eksperimen Three.js, dan repositori proyek.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10">
            <a
              href={personal.github.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-white/10 hover:bg-cyan-500 hover:text-black text-zinc-200 font-semibold text-xs border border-white/10 transition cursor-pointer"
            >
              <span>View GitHub Profile</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* FOOTER STRIP */}
      <footer className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-code text-xs text-zinc-500">
        <div>
          <p>© {personal.year} {personal.name}. Crafted with Next.js 16 &amp; Precision Motion.</p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={`mailto:${personal.email}`}
            className="hover:text-white transition cursor-pointer"
          >
            Email
          </a>
          <a
            href={personal.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition cursor-pointer"
          >
            Instagram
          </a>
          <a
            href={portfolioConfig.personal.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition cursor-pointer"
          >
            GitHub
          </a>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </footer>
    </section>
  )
}
