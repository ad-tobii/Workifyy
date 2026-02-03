import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import useJobStore from '../../../../store/useJobStore'

const JobImages = () => {
  const job = useJobStore(state => state.job)
  console.log('this is ', job.images)

  return (
    <div>
      {' '}
      <div className="hidden sm:block">
        <JobImagesLarge images={job.images} />
      </div>
      <div className="sm:hidden">
        <JobImagesSmall images={job.images} />
      </div>
    </div>
  )
}

const JobImagesSmall = ({ images = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative w-full overflow-hidden lg:hidden ">
      {/* 1. Viewport with rounded corners and a subtle inner shadow */}
      <div className="overflow-hidden shadow-inner" ref={emblaRef}>
        <div className="-ml-4 flex">
          {images.map((src, index) => (
            <div key={index} className="relative aspect-[4/3] min-w-0 flex-[0_0_100%] pl-4">
              <img
                src={src}
                className="h-full w-full rounded-2xl object-cover"
                alt={`Job view ${index + 1}`}
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Floating Page Counter (Glassmorphism look) */}
      <div className="absolute bottom-4 right-4 rounded-2xl bg-black/40  px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-white backdrop-blur-md">
        {selectedIndex + 1} / {images.length}
      </div>

      {/* 4. Animated Dot Indicators (The Airbnb Look) */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`rounded-full bg-white transition-all duration-300 ${
              index === selectedIndex
                ? 'h-1.5 w-4 opacity-100'
                : 'h-1.5 w-1.5 opacity-40 hover:opacity-70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

const JobImagesLarge = ({ images = [] }) => {
  const count = images.length
  if (count === 0) return null

  // 1 IMAGE
  if (count === 1) {
    return (
      <div className="h-[300px]">
        <img src={images[0]} className="h-full w-full rounded-2xl object-cover" />
      </div>
    )
  }

  // 2 IMAGES
  if (count === 2) {
    return (
      <div className="grid h-[300px] min-h-0 grid-cols-2 gap-2">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            className={`h-full min-h-0 w-full object-cover ${
              i === 0 ? 'rounded-l-2xl' : 'rounded-r-2xl'
            }`}
          />
        ))}
      </div>
    )
  }

  // 3–5 IMAGES
  const [main, ...rest] = images

  return (
    <div className="grid h-[300px] min-h-0 grid-cols-2 gap-2">
      {/* LEFT */}
      <img src={main} className="h-full min-h-0 w-full rounded-l-2xl object-cover" />

      {/* RIGHT */}
      <div className="grid h-full min-h-0 grid-cols-2 grid-rows-2 gap-2">
        {rest.slice(0, 4).map((src, i) => {
          const isTopRight = i === 1
          const isBottomRight = i === 3

          return (
            <img
              key={i}
              src={src}
              className={`h-full min-h-0 w-full object-cover ${
                isTopRight ? 'rounded-tr-2xl' : ''
              } ${isBottomRight ? 'rounded-br-2xl' : ''}`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default JobImages
