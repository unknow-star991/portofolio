'use client'

import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import {
  Film,
  Sparkles,
  ArrowLeft,
  Sliders,
  RefreshCw,
  Zap,
  Activity,
} from 'lucide-react'
import Link from 'next/link'
import { sound } from '@/lib/audio'

export default function AnimationsPage() {
  // 1. Text Scramble Simulator
  const [scrambleText, setScrambleText] = useState('CINEMATIC CHOREOGRAPHY')
  const [isScrambling, setIsScrambling] = useState(false)

  const phrases = [
    'CINEMATIC CHOREOGRAPHY',
    'TACTILE 60FPS EXPERIENCE',
    '35MM ANAMORPHIC DEPTH',
    'PHYSICS-BASED TRANSITIONS',
    'SPATIAL WEB ARCHITECTURE',
  ]

  const triggerScramble = () => {
    if (isScrambling) return
    setIsScrambling(true)
    sound.playFocusBeep()

    const targetPhrase = phrases[(phrases.indexOf(scrambleText) + 1) % phrases.length]
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'
    let iteration = 0

    const interval = setInterval(() => {
      sound.playClick(600 + iteration * 20)
      setScrambleText(
        targetPhrase
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return targetPhrase[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      if (iteration >= targetPhrase.length) {
        clearInterval(interval)
        setIsScrambling(false)
      }
      iteration += 1 / 2
    }, 30)
  }

  // 2. Interactive Aperture Simulator
  const [fStop, setFStop] = useState(1.4)

  // 3. 3D Tilt Card Motion Values
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [25, -25])
  const rotateY = useTransform(x, [-100, 100], [-25, 25])

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 font-sans selection:bg-amber-400 selection:text-black">
      {/* SUBTLE GRAIN */}
      <div className="subtle-grain" />

      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 bg-[#08080a]/85 backdrop-blur-2xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 text-zinc-400 hover:text-white text-xs font-mono-code transition group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Portfolio</span>
          </Link>

          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-amber-400" />
            <h1 className="text-sm font-bold tracking-wider font-mono-code uppercase">
              Cinema Lab <span className="text-zinc-500 font-normal">• Motion & Physics</span>
            </h1>
          </div>

          <Link
            href="/darkroom"
            onClick={() => sound.playClick()}
            className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono-code transition"
          >
            Darkroom Archive →
          </Link>
        </div>
      </header>

      {/* HERO INTRO */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono-code text-amber-400 mb-4">
          <Activity size={13} />
          <span>EXPERIMENTAL LABORATORY • 60 FPS</span>
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight">
          Motion & Kinetic <span className="font-cinematic italic text-amber-200">Physics.</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-4 max-w-2xl font-light">
          Eksplorasi interaktif bagaimana Framer Motion, CSS 3D Transforms, Web Audio, dan optik kamera disatukan untuk membangun pengalaman digital yang dinamis.
        </p>
      </div>

      {/* INTERACTIVE EXPERIMENTS GRID */}
      <main className="max-w-7xl mx-auto px-6 pb-32 space-y-16">
        {/* EXPERIMENT 1: 3D KINETIC GYROSCOPE & TEXT SCRAMBLER */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* TEXT SCRAMBLER DECODER */}
          <div className="p-8 rounded-3xl bg-[#090b10] border border-white/15 flex flex-col justify-between shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono-code text-zinc-500">
                <span className="text-amber-400 font-bold">LAB 01 // TEXT DECODER</span>
                <span>ASCII SHIFT CHOREOGRAPHY</span>
              </div>

              <div className="my-12 text-center">
                <p className="text-[11px] font-mono-code uppercase tracking-[0.4em] text-zinc-500 mb-3">
                  Decoded Signal Output
                </p>
                <h3 className="text-2xl sm:text-4xl font-mono-code font-bold text-white tracking-wider h-16 flex items-center justify-center">
                  {scrambleText}
                </h3>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono-code text-zinc-500">Click to re-scramble</span>
              <button
                onClick={triggerScramble}
                disabled={isScrambling}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs font-mono-code uppercase tracking-wider hover:scale-105 active:scale-95 disabled:opacity-50 transition shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                <RefreshCw size={14} className={isScrambling ? 'animate-spin' : ''} />
                <span>Transmit Signal</span>
              </button>
            </div>
          </div>

          {/* 3D PERSPECTIVE TILT CARD */}
          <div
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              x.set(e.clientX - rect.left - rect.width / 2)
              y.set(e.clientY - rect.top - rect.height / 2)
            }}
            onMouseLeave={() => {
              x.set(0)
              y.set(0)
            }}
            className="p-8 rounded-3xl bg-[#090b10] border border-white/15 flex flex-col justify-between shadow-[0_20px_80px_rgba(0,0,0,0.6)] [perspective:1200px]"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono-code text-zinc-500">
              <span className="text-cyan-400 font-bold">LAB 02 // 3D TILT PHYSICS</span>
              <span>DYNAMIC SPECULAR PERSPECTIVE</span>
            </div>

            <div className="my-8 flex justify-center items-center">
              <motion.div
                style={{ rotateX, rotateY }}
                className="relative w-64 h-40 sm:w-80 sm:h-48 rounded-2xl bg-gradient-to-br from-white/10 to-black border border-white/20 p-6 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              >
                <div className="flex justify-between items-center text-xs font-mono-code">
                  <span className="text-amber-400 font-bold">35MM TILT ENGINE</span>
                  <Film size={16} className="text-zinc-400" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white tracking-wide">ARI CINEMA CARD</p>
                  <p className="text-xs text-zinc-400 font-mono-code">Reactive Spring Coordinate System</p>
                </div>
                <div className="flex justify-between text-[10px] font-mono-code text-zinc-500">
                  <span>60 FPS SMOOTH</span>
                  <span>GYRO ACTIVE</span>
                </div>
              </motion.div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs font-mono-code text-zinc-500 flex justify-between items-center">
              <span>Hover anywhere in this module</span>
              <span className="text-amber-400">3D Matrix Active</span>
            </div>
          </div>
        </div>

        {/* EXPERIMENT 2: OPTICAL APERTURE & DEPTH-OF-FIELD SIMULATOR */}
        <div className="p-8 rounded-3xl bg-[#090b10] border border-white/15 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2 text-xs font-mono-code text-zinc-500">
            <span className="text-amber-400 font-bold">LAB 03 // OPTICAL APERTURE & DEPTH OF FIELD</span>
            <span>REAL-TIME BOKEH BLUR ENGINE</span>
          </div>

          <div className="mt-8 grid md:grid-cols-12 gap-8 items-center">
            {/* CONTROLS */}
            <div className="md:col-span-5 space-y-6 font-mono-code">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider block mb-2">
                  Select Lens Aperture (f-stop)
                </span>
                <div className="flex items-center gap-3">
                  <Sliders size={18} className="text-amber-400" />
                  <input
                    type="range"
                    min="1.2"
                    max="16"
                    step="0.2"
                    value={fStop}
                    onChange={(e) => {
                      sound.playClick()
                      setFStop(parseFloat(e.target.value))
                    }}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <span className="text-lg font-bold text-white min-w-[50px]">f/{fStop}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs text-zinc-400">
                <p className="flex justify-between">
                  <span>Depth of Field:</span>
                  <span className="text-white font-bold">
                    {fStop <= 2.8 ? 'Shallow (Cinematic Bokeh)' : 'Deep (High Sharpness)'}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>Optical Bokeh Blur:</span>
                  <span className="text-amber-400">
                    {Math.max(0, (16 - fStop) * 0.8).toFixed(1)}px
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>Light Ingress:</span>
                  <span className="text-cyan-400 font-bold">
                    {fStop <= 2.0 ? 'T1.5 Maximum Exposure' : 'Stopped Down'}
                  </span>
                </p>
              </div>

              <div className="flex gap-2">
                {[1.4, 2.8, 5.6, 11, 16].map((stop) => (
                  <button
                    key={stop}
                    onClick={() => {
                      sound.playFocusBeep()
                      setFStop(stop)
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono-code transition ${
                      fStop === stop
                        ? 'bg-amber-400 text-black font-bold'
                        : 'bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    f/{stop}
                  </button>
                ))}
              </div>
            </div>

            {/* LIVE SIMULATION VIEWER */}
            <div className="md:col-span-7 relative aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-white/20">
              <img
                src="/images/6.jpeg"
                alt="Aperture Still"
                style={{
                  filter: `blur(${Math.max(0, (16 - fStop) * 0.4)}px) contrast(${100 + (16 - fStop) * 1.5}%)`,
                  transition: 'filter 0.2s ease-out',
                }}
                className="w-full h-full object-cover"
              />

              {/* OVERLAY RETICLE */}
              <div className="absolute inset-0 pointer-events-none border border-white/20 m-4 rounded-xl flex flex-col justify-between p-4 font-mono-code text-[11px] text-white">
                <div className="flex justify-between">
                  <span>FOCUS LOCK [●]</span>
                  <span className="text-amber-400 font-bold">LENS 35MM f/{fStop}</span>
                </div>
                <div className="self-center w-8 h-8 border border-amber-400/80 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-amber-400 rounded-full" />
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>24 FPS SHUTTER 1/48</span>
                  <span>OPTICAL APERTURE SIMULATOR</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EXPERIMENT 3: KINETIC ORBIT & WEB AUDIO VISUALIZER */}
        <div className="p-8 rounded-3xl bg-[#090b10] border border-white/15 flex flex-col md:flex-row justify-between items-center gap-8 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
          <div className="space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs font-mono-code text-cyan-400 border border-white/10">
              <Zap size={13} />
              <span>LAB 04 // AUDIO-REACTIVE EQUALIZER</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Tactile Feedback & Synthetic Waves
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed font-light">
              Website ini mensintesis frekuensi audio menggunakan Web Audio API tanpa membutuhkan file suara eksternal, memberikan latensi 0ms dan ukuran bundle aplikasi yang tetap sangat ringan.
            </p>
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  sound.isSoundEnabled = true
                  sound.playFocusBeep()
                }}
                className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs font-mono-code uppercase tracking-wider hover:scale-105 active:scale-95 transition"
              >
                Trigger Camera Shutter
              </button>
              <button
                onClick={() => {
                  sound.isSoundEnabled = true
                  sound.toggleAmbient()
                }}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs font-mono-code uppercase tracking-wider border border-white/15 transition"
              >
                Toggle Ambient Drone
              </button>
            </div>
          </div>

          {/* EQUALIZER BARS GRAPHIC */}
          <div className="flex items-end gap-2 h-36 p-6 rounded-2xl bg-black/60 border border-white/10 min-w-[260px] justify-center">
            {[40, 75, 55, 90, 65, 80, 45, 95, 70, 60, 85, 50].map((h, i) => (
              <motion.div
                key={i}
                animate={{
                  height: [`${h * 0.4}%`, `${h}%`, `${h * 0.6}%`],
                }}
                transition={{
                  duration: 0.8 + (i % 4) * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-2.5 rounded-full bg-gradient-to-t from-cyan-500 via-amber-400 to-white"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

