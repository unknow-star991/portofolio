'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, ArrowUpRight, Sparkles, Filter } from 'lucide-react'
import ProjectModal from '@/components/cinematic/ProjectModal'
import { portfolioConfig, type ProjectItem } from '@/data/portfolio'
import { sound } from '@/lib/audio'

export default function AestheticProjects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const { projects } = portfolioConfig

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)))
    return ['All', ...cats]
  }, [projects])

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects
    return projects.filter((p) => p.category === activeCategory)
  }, [projects, activeCategory])

  const openProject = (p: ProjectItem) => {
    sound.playFocusBeep()
    setSelectedProject(p)
  }

  const handleCategoryChange = (cat: string) => {
    sound.playClick()
    setActiveCategory(cat)
  }

  return (
    <section id="projects" className="relative max-w-7xl mx-auto px-6 py-20 sm:py-28 overflow-hidden scroll-mt-24">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-mono-code mb-3">
            <Sparkles size={13} />
            <span>SELECTED REPERTOIRE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]">
            Featured <span className="font-display italic text-amber-200">Productions.</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 font-light leading-relaxed">
            Koleksi karya digital yang mengedepankan rekayasa kode presisi, kepekaan desain modern, dan interaksi yang hidup.
          </p>
        </div>

        {/* CATEGORY FILTER CHIPS */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/10 self-start md:self-auto font-mono-code text-xs">
          <span className="px-2.5 py-1 text-zinc-500 hidden sm:flex items-center gap-1 text-[11px]">
            <Filter size={11} />
            <span>Filter:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-xl transition text-[11px] cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-400 text-black font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2X2 RESPONSIVE MODERN GRID */}
      <motion.div layout className="grid md:grid-cols-2 gap-6 sm:gap-8">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative bg-[#0b0c12] border border-white/10 hover:border-amber-400/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_70px_rgba(245,199,108,0.06)]"
            >
              {/* CARD TOP BAR */}
              <div className="px-6 py-3.5 border-b border-white/10 flex items-center justify-between font-mono-code text-xs text-zinc-400 bg-black/40">
                <span className="text-amber-400 font-bold">{project.category}</span>
                <span className="text-zinc-500 uppercase tracking-wider">{project.year}</span>
              </div>

              {/* IMAGE PREVIEW WITH ZOOM EFFECT */}
              <div
                onClick={() => openProject(project)}
                className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-zinc-950"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 filter contrast-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c12] via-transparent to-transparent opacity-80" />

                {/* OVERLAY ACTION PILL ON HOVER */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                  <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase font-mono-code shadow-2xl scale-95 group-hover:scale-100 transition-transform">
                    <Eye size={14} />
                    <span>Inspect Project</span>
                  </span>
                </div>
              </div>

              {/* CARD CONTENT */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <p className="text-xs font-mono-code uppercase tracking-widest text-amber-400/90 mb-1.5">
                    {project.subtitle}
                  </p>
                  <h3
                    onClick={() => openProject(project)}
                    className="text-2xl sm:text-3xl font-black text-white tracking-tight cursor-pointer group-hover:text-amber-200 transition-colors"
                  >
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-3 line-clamp-2 font-light leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                {/* TECH TAGS & ACTIONS */}
                <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-white/[0.04] text-[11px] font-mono-code text-zinc-300 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 rounded-full bg-white/[0.02] text-[10px] font-mono-code text-zinc-500">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openProject(project)}
                      className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
                      title="Quick View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white text-zinc-200 hover:text-black font-medium text-xs transition cursor-pointer"
                    >
                      <span>Demo</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* LIGHTBOX MODAL */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
