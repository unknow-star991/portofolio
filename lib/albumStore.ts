'use client'

export type AlbumPhoto = {
  id: string
  url: string
  title: string
  filmStock: string
  iso: string
  aperture: string
  year: string
  location: string
  category: string
  dateAdded: number
}

export const DEFAULT_PHOTOS: AlbumPhoto[] = [
  {
    id: 'photo-1',
    url: '/images/4.jpeg',
    title: 'Neon Echoes in Widescreen',
    filmStock: 'KODAK VISION3 500T',
    iso: 'ISO 500',
    aperture: 'f/1.4 • 1/48s',
    year: '2026',
    location: 'Cyber Shibuya',
    category: 'Cinema Stills',
    dateAdded: 1,
  },
  {
    id: 'photo-2',
    url: '/images/6.jpeg',
    title: 'Sonic Reflections & Frequencies',
    filmStock: 'KODAK PORTRA 400',
    iso: 'ISO 400',
    aperture: 'f/2.0 • 1/120s',
    year: '2025',
    location: 'Sound Stage A',
    category: 'Portraits',
    dateAdded: 2,
  },
  {
    id: 'photo-3',
    url: '/images/7.jpeg',
    title: 'Analog Solitude',
    filmStock: 'ILFORD HP5 PLUS 400',
    iso: 'ISO 800',
    aperture: 'f/1.8 • 1/250s',
    year: '2025',
    location: 'The Darkroom',
    category: 'Film Noir',
    dateAdded: 3,
  },
  {
    id: 'photo-4',
    url: '/images/8.jpeg',
    title: 'Synthetic Horizons',
    filmStock: 'FUJIFILM PROVIA 100F',
    iso: 'ISO 100',
    aperture: 'f/2.8 • 1/500s',
    year: '2026',
    location: 'Digital Frontier',
    category: 'Architecture',
    dateAdded: 4,
  },
  {
    id: 'photo-5',
    url: '/images/45.jpeg',
    title: 'Subtle Geometry',
    filmStock: 'KODAK TRI-X 400',
    iso: 'ISO 400',
    aperture: 'f/2.0 • 1/60s',
    year: '2025',
    location: 'Jakarta Studio',
    category: 'Portraits',
    dateAdded: 5,
  },
  {
    id: 'photo-6',
    url: '/images/galery 1.jpeg',
    title: 'Cinematic Shadows',
    filmStock: 'PANAVISION 35MM RAW',
    iso: 'ISO 800',
    aperture: 'f/1.4 • 1/48s',
    year: '2026',
    location: 'Metropolis',
    category: 'Cinema Stills',
    dateAdded: 6,
  },
]

const STORAGE_KEY = 'ari_cinematic_album_photos'
const AUTH_KEY = 'ari_director_authenticated'

export function getAlbumPhotos(): AlbumPhoto[] {
  if (typeof window === 'undefined') return DEFAULT_PHOTOS
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PHOTOS
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PHOTOS
  } catch {
    return DEFAULT_PHOTOS
  }
}

export function saveAlbumPhotos(photos: AlbumPhoto[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos))
    window.dispatchEvent(new Event('ari_album_updated'))
  } catch (e) {
    console.error('Failed to save photos to localStorage', e)
  }
}

export function addPhotoToAlbum(photo: Omit<AlbumPhoto, 'id' | 'dateAdded'>): AlbumPhoto {
  const photos = getAlbumPhotos()
  const newPhoto: AlbumPhoto = {
    ...photo,
    id: 'photo-' + Date.now(),
    dateAdded: Date.now(),
  }
  const updated = [newPhoto, ...photos]
  saveAlbumPhotos(updated)
  return newPhoto
}

export function deletePhotoFromAlbum(id: string) {
  const photos = getAlbumPhotos()
  const updated = photos.filter((p) => p.id !== id)
  saveAlbumPhotos(updated)
}

export function isDirectorLoggedIn(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(AUTH_KEY) === 'true'
}

export function loginDirector(passcode: string): boolean {
  // Director passcode: 'ari2026' or 'director'
  if (passcode.trim().toLowerCase() === 'ari2026' || passcode.trim().toLowerCase() === 'director') {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, 'true')
      window.dispatchEvent(new Event('ari_auth_updated'))
    }
    return true
  }
  return false
}

export function logoutDirector() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY)
    window.dispatchEvent(new Event('ari_auth_updated'))
  }
}

