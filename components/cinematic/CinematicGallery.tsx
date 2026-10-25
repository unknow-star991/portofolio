'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, ZoomIn, Camera, ArrowRight, Lock } from 'lucide-react'
import Link from 'next/link'
import { AlbumPhoto, getAlbumPhotos, addPhotoToAlbum } from '@/lib/albumStore'
import { sound } from '@/lib/audio'

type Props = {
  gallery?: string[]
  uploadedImage?: string | null
  setUploadedImage?: (val: string | null) => void
}

export default function CinematicGallery({}: Props) {
  const [photos, setPhotos] = useState<AlbumPhoto[]>(() => getAlbumPhotos())
  const [selectedPhoto, setSelectedPhoto] = useState<AlbumPhoto | null>(null)

  useEffect(() => {
    const handleUpdate = () => {
      setPhotos(getAlbumPhotos())
    }

    window.addEventListener('ari_album_updated', handleUpdate)
    return () => window.removeEventListener('ari_album_updated', handleUpdate)
  }, [])

  const openPhoto = (p: AlbumPhoto) => {
    sound.playClick()
    setSelectedPhoto(p)
  }

  const handleQuickUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      sound.playFocusBeep()
      const reader = new FileReader()
      reader.onloadend = () => {
        addPhotoToAlbum({
          url: reader.result as string,
          title: file.name.replace(/\.[^/.]+$/, ''),
          filmStock: 'KODAK PORTRA 400',
          category: 'Cinema Stills',
          location: 'Live Studio',
          year: '2026',
          aperture: 'f/1.8 • 1/250s',
          iso: 'ISO 400',
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <section id="gallery" className="relative max-w-7xl mx-auto px-6 py-20 sm:py-28 overflow-hidden scroll-mt-24">
      {/* SECTION HEADER */}
      <div className="mb-20 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono-code text-amber-400 mb-4">
          <Camera size={13} />
          <span>SCENE 05 // THE DARKROOM CONTACT SHEET</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight">
              Cinematic <span className="bg-gradient-to-r from-amber-200 via-white to-amber-300 bg-clip-text text-transparent font-cinematic italic">Stills.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-xl">
              Lembaran kontak 35mm dari momen, estetika visual, dan kenangan berharga yang diabadikan.
            </p>
          </div>

          {/* ACTION BUTTONS: QUICK DEVELOP & SEPARATE ALBUM STUDIO */}
          <div className="flex flex-wrap items-center gap-3">
            <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:scale-105 active:scale-95 transition shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <Upload size={14} />
              <span>Quick Upload</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleQuickUpload} />
            </label>

            <Link
              href="/darkroom"
              onClick={() => sound.playFocusBeep()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-zinc-200 hover:text-white font-medium text-xs sm:text-sm border border-white/15 transition group"
            >
              <Lock size={13} className="text-amber-400" />
              <span>Manage Album & Login</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* CONTACT SHEET GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {photos.slice(0, 6).map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            onClick={() => openPhoto(photo)}
            className="group relative bg-[#0a0c12] border border-white/10 hover:border-amber-400/40 rounded-3xl p-4 sm:p-5 cursor-pointer transition-all duration-500 shadow-[0_15px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between"
          >
            {/* FILM TOP METADATA */}
            <div className="flex items-center justify-between pb-3 text-[10px] font-mono-code text-zinc-500">
              <span className="text-amber-400 font-bold">FRAME #{String(index + 1).padStart(2, '0')}</span>
              <span className="uppercase tracking-wider">{photo.filmStock}</span>
            </div>

            {/* PHOTO STILL */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 my-2">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

              {/* HOVER ZOOM ICON */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="p-3 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                  <ZoomIn size={18} />
                </span>
              </div>
            </div>

            {/* FILM BOTTOM METADATA */}
            <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono-code text-zinc-400">
              <span className="truncate pr-2 font-medium text-white">{photo.title}</span>
              <span className="text-zinc-500">{photo.aperture}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* VIEW FULL ARCHIVE BANNER */}
      <div className="mt-14 text-center">
        <Link
          href="/darkroom"
          onClick={() => sound.playClick()}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-mono-code text-zinc-300 hover:text-white transition group"
        >
          <span>Explore All Negatives in Darkroom Archive ({photos.length} Stills)</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-3xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl max-h-[90vh] z-10 flex flex-col items-center"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 p-2 text-zinc-400 hover:text-white transition"
              >
                <X size={24} />
              </button>

              <div className="p-3 bg-[#0d0e14] border border-white/20 rounded-2xl shadow-2xl overflow-hidden max-h-[80vh]">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="max-h-[75vh] w-auto object-contain rounded-lg"
                />
              </div>

              <div className="mt-4 px-6 py-2.5 rounded-full bg-black/70 border border-white/10 text-xs font-mono-code text-zinc-300 flex items-center gap-4">
                <span className="text-amber-400 font-bold">{selectedPhoto.title}</span>
                <span>•</span>
                <span>{selectedPhoto.filmStock}</span>
                <span>•</span>
                <span className="text-zinc-500">CLICK ANYWHERE TO CLOSE</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
