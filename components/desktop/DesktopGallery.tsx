'use client'

import { motion } from 'framer-motion'

type Props = {
  gallery: string[]
  uploadedImage: string | null
  setUploadedImage: (value: string | null) => void
}

export default function DesktopGallery({
  gallery,
  uploadedImage,
  setUploadedImage,
}: Props) {
  return (
    <section
      id="gallery"
      className="max-w-7xl mx-auto px-6 py-32"
    >
      {/* TITLE */}
      <div className="text-center mb-16">
        <h2 className="
        text-7xl
        font-black
        mb-5
        bg-gradient-to-b
        from-white
        to-zinc-500
        text-transparent
        bg-clip-text
        ">
          Gallery
        </h2>

        <p className="text-zinc-400 text-lg">
          Simpan semua kenangan terbaikmu.
        </p>
      </div>

      {/* UPLOAD */}
      <div className="mb-12 flex justify-center">
        <label className="
        cursor-pointer
        px-8 py-4
        rounded-full
        bg-white text-black
        font-semibold
        hover:scale-105
        transition
        shadow-[0_10px_40px_rgba(255,255,255,0.3)]
        ">
          Upload Foto

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]

              if (file) {
                setUploadedImage(
                  URL.createObjectURL(file)
                )
              }
            }}
          />
        </label>
      </div>

      {/* PREVIEW */}
      {uploadedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-16"
        >
          <img
            src={uploadedImage}
            className="
            w-full
            max-h-[700px]
            object-cover
            rounded-[3rem]
            shadow-[0_20px_100px_rgba(255,255,255,0.15)]
            border border-white/10
            "
          />
        </motion.div>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8 perspective-[2000px]">
        {gallery.map((img, index) => (
          <motion.div
            key={index}
            whileHover={{
              rotateY: 10,
              rotateX: -5,
              scale: 1.03,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
            relative
            rounded-[2rem]
            overflow-hidden
            group
            "
          >
            <img
              src={img}
              className="
              w-full
              h-[500px]
              object-cover
              group-hover:scale-110
              transition duration-700
              "
            />

            <div className="
            absolute inset-0
            bg-gradient-to-t
            from-black/80
            to-transparent
            opacity-0
            group-hover:opacity-100
            transition
            " />

            <div className="
            absolute bottom-8 left-8
            opacity-0
            group-hover:opacity-100
            transition
            ">
              <h3 className="text-3xl font-bold">
                Beautiful Moment
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}