'use client'

type Props = {
  gallery: string[]
}

export default function MobileGallery({
  gallery,
}: Props) {
  return (
    <section
      id="gallery"
      className="
      py-24
      overflow-hidden
      "
    >
      <div className="px-6 mb-10">
        <h2 className="
        text-5xl
        font-black
        ">
          Gallery
        </h2>
      </div>

      <div className="
      flex gap-5
      overflow-x-auto
      px-6
      ">
        {gallery.map((img, index) => (
          <div
            key={index}
            className="
            min-w-[85%]
            rounded-[2rem]
            overflow-hidden
            "
          >
            <img
              src={img}
              className="
              w-full
              h-[500px]
              object-cover
              "
            />
          </div>
        ))}
      </div>
    </section>
  )
}