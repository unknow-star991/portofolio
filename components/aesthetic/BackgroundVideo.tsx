'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Maximize2, X, Volume2, VolumeX, Film } from 'lucide-react'
import { portfolioConfig } from '@/data/portfolio'
import { sound } from '@/lib/audio'

type Props = {
  showControls?: boolean
}

export default function BackgroundVideo({ showControls = true }: Props) {
  const VIDEO_SCENES = portfolioConfig.videos
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showSwitcher, setShowSwitcher] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const modalVideoRef = useRef<HTMLVideoElement>(null)

  const currentScene = VIDEO_SCENES[currentSceneIndex] || VIDEO_SCENES[0]

  const togglePlay = () => {
    sound.playClick()
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play().catch(() => {})
        setIsPlaying(true)
      }
    }
  }

  const selectScene = (index: number) => {
    sound.playFocusBeep()
    setCurrentSceneIndex(index)
    setVideoError(false)
    setShowSwitcher(false)
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const openShowreel = () => {
    sound.playFocusBeep()
    setShowModal(true)
  }

  return (
    <>
      {/* BACKGROUND LOOPING VIDEO CONTAINER */}
      <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none select-none">
        {!videoError ? (
          <video
            ref={videoRef}
            key={currentScene.src}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover object-center opacity-30 contrast-125 filter saturate-150 transition-opacity duration-1000"
          >
            <source src={currentScene.src} type="video/mp4" />
          </video>
        ) : (
          /* PROCEDURAL AMBIENT CANVAS FALLBACK */
          <div className="w-full h-full bg-gradient-to-br from-indigo-950/20 via-[#08080a] to-amber-950/20 animate-pulse" />
        )}

        {/* DARK VIGNETTE & SMOOTHING GRADIENTS */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/75 to-[#08080a]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-transparent to-[#08080a]" />
      </div>

      {/* FLOATING VIDEO CONTROLLER (BOTTOM LEFT) */}
      {showControls && (
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-2">
          {/* MAIN SHOWREEL PILL BUTTON */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center rounded-full bg-black/70 backdrop-blur-2xl border border-white/15 p-1 shadow-2xl text-xs font-mono-code text-zinc-300"
          >
            {/* PLAY / PAUSE BUTTON */}
            <button
              onClick={togglePlay}
              className="p-2 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition"
              title={isPlaying ? 'Pause Ambient Video' : 'Play Ambient Video'}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} className="fill-current" />}
            </button>

            {/* CURRENT SCENE LABEL / SWITCHER TRIGGER */}
            <button
              onClick={() => {
                sound.playClick()
                setShowSwitcher(!showSwitcher)
              }}
              className="px-2.5 py-1 text-[11px] font-medium text-zinc-300 hover:text-amber-300 transition flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="truncate max-w-[130px] sm:max-w-[180px]">{currentScene.title}</span>
            </button>

            {/* EXPAND SHOWREEL MODAL */}
            <button
              onClick={openShowreel}
              className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition"
              title="Watch Fullscreen Showreel"
            >
              <Maximize2 size={13} />
            </button>
          </motion.div>

          {/* SCENE SWITCHER POPUP */}
          <AnimatePresence>
            {showSwitcher && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="absolute bottom-14 left-0 w-64 rounded-2xl bg-[#0e1015]/95 backdrop-blur-3xl border border-white/20 p-2 shadow-2xl space-y-1 font-mono-code text-xs z-50"
              >
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-zinc-500 font-bold border-b border-white/10 flex justify-between">
                  <span>Ambient Video Reel</span>
                  <span>{VIDEO_SCENES.length} Scenes</span>
                </div>
                {VIDEO_SCENES.map((scene, idx) => (
                  <button
                    key={scene.id}
                    onClick={() => selectScene(idx)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition ${
                      currentSceneIndex === idx
                        ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30 font-semibold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <p className="text-white font-medium">{scene.title}</p>
                      <p className="text-[10px] text-zinc-500">{scene.category}</p>
                    </div>
                    {currentSceneIndex === idx && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* FULLSCREEN SHOWREEL LIGHTBOX MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/95 backdrop-blur-3xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-[#090b10] border border-white/20 shadow-2xl z-10"
            >
              {/* MODAL HEADER */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between font-mono-code text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Film size={15} className="text-amber-400" />
                  <span className="text-white font-bold">{currentScene.title}</span>
                  <span className="text-zinc-600">•</span>
                  <span>{currentScene.category}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition"
                    title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* VIDEO PLAYER */}
              <div className="relative aspect-[16/9] w-full bg-black">
                <video
                  ref={modalVideoRef}
                  src={currentScene.src}
                  autoPlay
                  loop
                  muted={isMuted}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* MODAL FOOTER */}
              <div className="p-4 sm:p-6 bg-[#08090d] flex flex-wrap items-center justify-between gap-4 font-mono-code text-xs">
                <div className="flex items-center gap-2">
                  {VIDEO_SCENES.map((scene, i) => (
                    <button
                      key={scene.id}
                      onClick={() => selectScene(i)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition ${
                        currentSceneIndex === i
                          ? 'bg-amber-400 text-black font-bold'
                          : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {scene.title}
                    </button>
                  ))}
                </div>
                <span className="text-zinc-500 text-[11px] uppercase tracking-wider">
                  {portfolioConfig.personal.nickname} SHOWREEL • {portfolioConfig.personal.year}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
