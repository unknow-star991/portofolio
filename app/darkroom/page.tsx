'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Film,
  Camera,
  Upload,
  Lock,
  Unlock,
  Trash2,
  X,
  ZoomIn,
  ArrowLeft,
  Plus,
  KeyRound,
  ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'
import {
  AlbumPhoto,
  getAlbumPhotos,
  addPhotoToAlbum,
  deletePhotoFromAlbum,
  isDirectorLoggedIn,
  loginDirector,
  logoutDirector,
} from '@/lib/albumStore'
import { sound } from '@/lib/audio'

export default function DarkroomPage() {
  const [photos, setPhotos] = useState<AlbumPhoto[]>(() => getAlbumPhotos())
  const [isAuth, setIsAuth] = useState<boolean>(() => isDirectorLoggedIn())
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedPhoto, setSelectedPhoto] = useState<AlbumPhoto | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)

  // Upload Form State
  const [newTitle, setNewTitle] = useState('')
  const [newFilmStock, setNewFilmStock] = useState('KODAK PORTRA 400')
  const [newCategory, setNewCategory] = useState('Cinema Stills')
  const [newLocation, setNewLocation] = useState('Studio A')
  const [newYear, setNewYear] = useState('2026')
  const [newAperture] = useState('f/1.8 • 1/250s')
  const [newIso] = useState('ISO 400')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    const handleUpdate = () => {
      setPhotos(getAlbumPhotos())
      setIsAuth(isDirectorLoggedIn())
    }

    window.addEventListener('ari_album_updated', handleUpdate)
    window.addEventListener('ari_auth_updated', handleUpdate)

    return () => {
      window.removeEventListener('ari_album_updated', handleUpdate)
      window.removeEventListener('ari_auth_updated', handleUpdate)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    sound.playClick()
    const success = loginDirector(passcode)
    if (success) {
      sound.playFocusBeep()
      setIsAuth(true)
      setShowLoginModal(false)
      setPasscode('')
      setLoginError('')
    } else {
      setLoginError('Incorrect passcode. Hint: ari2026')
    }
  }

  const handleLogout = () => {
    sound.playClick()
    logoutDirector()
    setIsAuth(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      sound.playFocusBeep()
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault()
    if (!previewUrl || !newTitle.trim()) return

    sound.playFocusBeep()
    addPhotoToAlbum({
      url: previewUrl,
      title: newTitle.trim(),
      filmStock: newFilmStock,
      category: newCategory,
      location: newLocation,
      year: newYear,
      aperture: newAperture,
      iso: newIso,
    })

    setShowUploadModal(false)
    setPreviewUrl(null)
    setNewTitle('')
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Delete this photo from the album?')) {
      sound.playClick()
      deletePhotoFromAlbum(id)
    }
  }

  const categories = ['All', 'Cinema Stills', 'Portraits', 'Film Noir', 'Architecture']

  const filteredPhotos =
    activeCategory === 'All'
      ? photos
      : photos.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase())

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 font-sans selection:bg-amber-400 selection:text-black">
      {/* SUBTLE GRAIN OVERLAY */}
      <div className="subtle-grain" />

      {/* TOP HEADER NAVIGATION */}
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

          {/* BRAND SLATE */}
          <div className="flex items-center gap-2">
            <Film size={16} className="text-amber-400" />
            <h1 className="text-sm font-bold tracking-wider font-mono-code uppercase">
              Darkroom Archive <span className="text-zinc-500 font-normal">• 35mm Album</span>
            </h1>
          </div>

          {/* DIRECTOR LOGIN / STUDIO ACCESS */}
          <div>
            {isAuth ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playFocusBeep()
                    setShowUploadModal(true)
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 text-black font-semibold text-xs hover:bg-amber-300 transition shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                >
                  <Plus size={14} />
                  <span>Add Photo</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 text-xs font-mono-code transition"
                  title="Logout Director"
                >
                  <Unlock size={13} className="text-emerald-400" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  sound.playClick()
                  setShowLoginModal(true)
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white border border-white/15 text-xs font-mono-code transition"
              >
                <Lock size={13} className="text-amber-400" />
                <span>Director Access</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN HERO INTRO */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono-code text-amber-400 mb-3">
              <Camera size={13} />
              <span>ARCHIVAL PHOTOGRAPHY LAB</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              The Photographic <span className="font-cinematic italic text-amber-200">Negatives.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-xl font-light">
              Koleksi lembaran film analog 35mm, eksplorasi pencahayaan noir, dan memori visual yang terkurasi.
            </p>
          </div>

          {/* CATEGORY FILTERS */}
          <div className="flex flex-wrap gap-1.5 font-mono-code text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick()
                  setActiveCategory(cat)
                }}
                className={`px-3.5 py-1.5 rounded-full transition ${
                  activeCategory === cat
                    ? 'bg-white text-black font-semibold'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* STATUS BAR IF AUTHENTICATED */}
        {isAuth && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs font-mono-code text-amber-300">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} />
              <span>DIRECTOR STUDIO ACTIVE — You can add, manage, and delete photos.</span>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="underline hover:text-white font-bold"
            >
              + Upload New Negative
            </button>
          </div>
        )}
      </div>

      {/* PHOTO GRID */}
      <main className="max-w-7xl mx-auto px-6 pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              onClick={() => {
                sound.playClick()
                setSelectedPhoto(photo)
              }}
              className="group relative bg-[#090b10] border border-white/10 hover:border-amber-400/40 rounded-3xl p-4 sm:p-5 cursor-pointer transition-all duration-300 shadow-[0_15px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between"
            >
              {/* TOP SLIDE SPROCKET */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] font-mono-code text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">FRAME #{String(index + 1).padStart(2, '0')}</span>
                  <span>•</span>
                  <span>{photo.filmStock}</span>
                </div>
                {isAuth && (
                  <button
                    onClick={(e) => handleDelete(photo.id, e)}
                    className="p-1 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/20 transition"
                    title="Delete Photo"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>

              {/* IMAGE CONTAINER */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 my-3">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 filter contrast-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-3 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20">
                    <ZoomIn size={18} />
                  </span>
                </div>
              </div>

              {/* CAPTION & METADATA */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[11px] font-mono-code text-zinc-400">
                  <span className="text-white font-medium truncate">{photo.title}</span>
                  <span className="text-amber-400/80">{photo.year}</span>
                </div>

                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono-code text-zinc-500">
                  <span>{photo.location}</span>
                  <span>{photo.aperture}</span>
                  <span>{photo.iso}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* FULLSCREEN LIGHTBOX MODAL */}
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

              <div className="p-3 bg-[#0d0e14] border border-white/20 rounded-2xl shadow-2xl overflow-hidden max-h-[75vh]">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="max-h-[70vh] w-auto object-contain rounded-lg"
                />
              </div>

              <div className="mt-4 px-6 py-2.5 rounded-full bg-black/70 border border-white/10 text-xs font-mono-code text-zinc-300 flex flex-wrap items-center justify-center gap-4">
                <span className="text-amber-400 font-bold">{selectedPhoto.title}</span>
                <span>•</span>
                <span>{selectedPhoto.filmStock}</span>
                <span>•</span>
                <span>{selectedPhoto.location}</span>
                <span>•</span>
                <span>{selectedPhoto.aperture}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DIRECTOR LOGIN MODAL */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#090b10] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <KeyRound size={16} className="text-amber-400" />
                  <h3 className="font-bold text-sm text-white font-mono-code">Director Studio Login</h3>
                </div>
                <button onClick={() => setShowLoginModal(false)} className="text-zinc-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-2">
                    Enter Passcode
                  </label>
                  <input
                    autoFocus
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Hint: ari2026"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 text-sm font-mono-code"
                  />
                  {loginError && <p className="text-xs text-red-400 mt-2 font-mono-code">{loginError}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono-code uppercase tracking-wider transition shadow-lg"
                >
                  Unlock Director Studio
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* UPLOAD PHOTO MODAL (DIRECTOR ONLY) */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUploadModal(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-[#090b10] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Upload size={16} className="text-amber-400" />
                  <h3 className="font-bold text-sm text-white font-mono-code">Develop New Photo</h3>
                </div>
                <button onClick={() => setShowUploadModal(false)} className="text-zinc-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleAddPhoto} className="mt-6 space-y-4 font-mono-code text-xs">
                {/* PHOTO UPLOAD / PREVIEW */}
                <div>
                  <label className="block text-zinc-400 mb-2 uppercase tracking-wider">Select Image File</label>
                  <label className="flex flex-col items-center justify-center h-44 rounded-2xl border-2 border-dashed border-white/20 hover:border-amber-400/50 bg-white/[0.02] cursor-pointer overflow-hidden transition">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <Upload size={24} className="mx-auto text-zinc-400 mb-2" />
                        <span className="text-zinc-300 font-medium">Click to select photo</span>
                        <p className="text-[10px] text-zinc-500 mt-1">JPEG, PNG, WEBP (Saved locally)</p>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>

                {/* TITLE */}
                <div>
                  <label className="block text-zinc-400 mb-1 uppercase tracking-wider">Photo Title / Caption</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Midnight Horizon"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* FILM STOCK */}
                  <div>
                    <label className="block text-zinc-400 mb-1 uppercase tracking-wider">Film Stock</label>
                    <select
                      value={newFilmStock}
                      onChange={(e) => setNewFilmStock(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="KODAK PORTRA 400">KODAK PORTRA 400</option>
                      <option value="KODAK TRI-X 400">KODAK TRI-X 400</option>
                      <option value="KODAK VISION3 500T">KODAK VISION3 500T</option>
                      <option value="ILFORD HP5 PLUS 400">ILFORD HP5 PLUS 400</option>
                      <option value="CINESTILL 800T">CINESTILL 800T</option>
                      <option value="FUJIFILM PROVIA 100F">FUJIFILM PROVIA 100F</option>
                    </select>
                  </div>

                  {/* CATEGORY */}
                  <div>
                    <label className="block text-zinc-400 mb-1 uppercase tracking-wider">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Cinema Stills">Cinema Stills</option>
                      <option value="Portraits">Portraits</option>
                      <option value="Film Noir">Film Noir</option>
                      <option value="Architecture">Architecture</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* LOCATION */}
                  <div>
                    <label className="block text-zinc-400 mb-1 uppercase tracking-wider">Location</label>
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* YEAR */}
                  <div>
                    <label className="block text-zinc-400 mb-1 uppercase tracking-wider">Year</label>
                    <input
                      type="text"
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!previewUrl || !newTitle.trim()}
                    className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-30 text-black font-bold shadow-lg"
                  >
                    Save to Archive
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

