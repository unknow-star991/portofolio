export interface PersonalInfo {
  name: string
  nickname: string
  role: string
  headline: string
  bio: string
  quote: string
  email: string
  instagram: {
    handle: string
    url: string
  }
  github: {
    username: string
    url: string
  }
  location: string
  status: string
  year: string
}

export interface ProjectItem {
  id: string
  title: string
  subtitle: string
  year: string
  category: string
  desc: string
  longDesc: string
  image: string
  tech: string[]
  metrics?: string
  role?: string
  link: string
  github?: string
  featured?: boolean
  frameNumber?: string
}

export interface SkillCategory {
  title: string
  skills: string[]
}

export interface MilestoneItem {
  year: string
  badge: string
  title: string
  desc: string
  tags: string[]
}

export interface AmbientVideo {
  id: string
  title: string
  category: string
  src: string
}

export const portfolioConfig = {
  personal: {
    name: "Ari Mahendra",
    nickname: "ARI",
    role: "Creative Developer & Visual Engineer",
    headline: "Crafting bespoke digital spaces, sculpted motion, and high-performance modern web experiences.",
    bio: "Saya percaya bahwa website terbaik adalah perpaduan antara rekayasa kode yang tangguh dan kepekaan visual yang berkesan. Berfokus pada Next.js modern, koreografi animasi presisi 60fps, serta desain luxury yang memikat.",
    quote: "Di mana logika algoritma berpadu dengan keindahan visual dan ritme interaksi yang hidup.",
    email: "www.putuari123@gmail.com",
    instagram: {
      handle: "@mahennn_ly",
      url: "https://www.instagram.com/mahennn_ly/",
    },
    github: {
      username: "unknow-star991",
      url: "https://github.com/unknow-star991",
    },
    location: "Indonesia (WIB / Remote Global)",
    status: "Available for Bespoke Projects",
    year: "2026",
  } as PersonalInfo,

  metrics: [
    { label: "Core Stack", value: "Next.js 16", sub: "React 19 & TypeScript" },
    { label: "Motion Physics", value: "60.0 FPS", sub: "Framer Motion & Lenis" },
    { label: "Interactive Canvas", value: "Three.js", sub: "Spatial Experience" },
    { label: "Location", value: "Indonesia", sub: "UTC+7 / Remote Global" },
  ],

  videos: [
    {
      id: "cyber",
      title: "Cyber Grid & Hologram",
      category: "Digital World",
      src: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-graphs-31913-large.mp4",
    },
    {
      id: "space",
      title: "Cosmic Horizons",
      category: "Atmosphere",
      src: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4",
    },
    {
      id: "lights",
      title: "Abstract Laser & Light",
      category: "Kinetic Art",
      src: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-animation-42526-large.mp4",
    },
    {
      id: "studio",
      title: "Creative Technologist",
      category: "Studio Craft",
      src: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-43403-large.mp4",
    },
  ] as AmbientVideo[],

  projects: [
    {
      id: "apple-portfolio",
      title: "Apple-Inspired Portfolio",
      subtitle: "Modern Luxury Web Experience",
      year: "2026",
      category: "Interactive Web",
      desc: "Website portofolio berstandar internasional dengan bahasa desain Apple, animasi 60fps Lenis, Three.js, dan Tailwind CSS v4.",
      longDesc: "Sebuah web experience premium yang mengadopsi bahasa visual Apple Keynote dan situs Awwwards Site of the Day. Mengintegrasikan smooth scroll Lenis, Framer Motion choreography, dan arsitektur Next.js 16 App Router.",
      image: "/images/4.jpeg",
      tech: ["Next.js 16", "React 19", "Framer Motion", "Tailwind v4", "Three.js", "Lenis"],
      metrics: "60 FPS • High Fidelity",
      role: "Lead Creative Developer",
      link: "https://portfolio-apple-lovat.vercel.app",
      github: "https://github.com/unknow-star991/portofolio",
      featured: true,
    },
    {
      id: "audio-canvas",
      title: "Echoes & Audio Canvas",
      subtitle: "Tactile Sonic Synthesizer",
      year: "2025",
      category: "Creative Sound",
      desc: "Player audio interaktif dengan visualizer frekuensi dinamis dan sintesis Web Audio API tanpa dependensi eksternal.",
      longDesc: "Eksperimen audio-reaktif yang memanfaatkan Web Audio API untuk menghasilkan synthesizer organik dan efek suara kamera mekanik langsung di browser dengan latensi 0ms.",
      image: "/images/6.jpeg",
      tech: ["React", "Web Audio API", "Canvas API", "GSAP", "TypeScript"],
      metrics: "Zero-latency Audio Synthesis",
      role: "Audio-Visual Programmer",
      link: "https://portfolio-apple-lovat.vercel.app",
      github: "https://github.com/unknow-star991/portofolio",
      featured: true,
    },
    {
      id: "darkroom-archive",
      title: "The Darkroom Archive",
      subtitle: "Archival Photography Gallery",
      year: "2025",
      category: "Archival Media",
      desc: "Galeri foto digital dengan penyimpanan persisten lokal, proteksi akses studio, dan visualizer EXIF.",
      longDesc: "Eksplorasi visual analog di era modern. Foto-foto diorganisir dengan detail metadata, lightbox resolusi tinggi, serta sistem upload dan manajemen foto langsung di browser.",
      image: "/images/7.jpeg",
      tech: ["Next.js", "LocalStorage API", "Framer Motion 3D", "Tailwind CSS"],
      metrics: "Dynamic Client Storage",
      role: "Frontend Architect",
      link: "/darkroom",
      github: "https://github.com/unknow-star991/portofolio",
      featured: true,
    },
    {
      id: "motion-lab",
      title: "Cinema & Motion Lab",
      subtitle: "Kinetic 3D & Optical Physics",
      year: "2026",
      category: "Experimental Lab",
      desc: "Laboratorium animasi eksperimental dengan 3D tilt perspective, text decoder, dan optical aperture simulator.",
      longDesc: "Showcase rekayasa interaksi kreatif yang memadukan koreografi Framer Motion, filter blur optik depth-of-field kamera, dan matrix koordinat kursor mouse.",
      image: "/images/8.jpeg",
      tech: ["Next.js App Router", "Framer Motion", "CSS 3D Transforms", "TypeScript"],
      metrics: "Real-time Kinetic Matrix",
      role: "Creative Engineer",
      link: "/animations",
      github: "https://github.com/unknow-star991/portofolio",
      featured: true,
    },
  ] as ProjectItem[],

  skills: [
    {
      title: "Frontend Architecture",
      skills: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4"],
    },
    {
      title: "Motion & Interaction",
      skills: ["Framer Motion", "GSAP Animation", "Lenis 60fps Physics", "Micro-interactions"],
    },
    {
      title: "Graphics & Spatial",
      skills: ["Three.js Canvas", "Web Audio API", "Spatial UI Design", "Responsive Layouts"],
    },
    {
      title: "Ecosystem & Tools",
      skills: ["Git & GitHub", "Vercel Deployment", "Performance Optimization", "Clean Code"],
    },
  ] as SkillCategory[],

  timeline: [
    {
      year: "2022",
      badge: "FOUNDATION",
      title: "Awal Perjalanan & Eksplorasi Kode",
      desc: "Mulai mendalami fondasi pemrograman web, algoritma, serta estetika visual. Menemukan ketertarikan mendalam pada bagaimana antarmuka digital dapat membangkitkan emosi dan kenyamanan pengguna.",
      tags: ["HTML & Modern CSS", "JavaScript ES6+", "UI/UX Fundamentals"],
    },
    {
      year: "2024",
      badge: "CRAFT & MOTION",
      title: "Arsitektur Modern & Motion Design",
      desc: "Melangkah ke ranah modern framework Next.js, TypeScript, dan Tailwind CSS. Mengembangkan spesialisasi pada animasi 60fps dengan Framer Motion, GSAP, serta eksperimen grafik 3D Three.js.",
      tags: ["Next.js & React Ecosystem", "Framer Motion & GSAP", "Three.js 3D Canvas"],
    },
    {
      year: "2026",
      badge: "PRESENT & FUTURE",
      title: "Bespoke Digital Experiences",
      desc: "Membangun portofolio dan produk web berstandar internasional dengan performa tinggi, sintesis audio taktil, manajemen media modern, dan pengalaman pengguna yang halus di berbagai ukuran layar.",
      tags: ["Next.js 16 (App Router)", "High-Performance 60fps", "Bespoke Web Design"],
    },
  ] as MilestoneItem[],
}

