import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

/**
 * Generic dynamic, touch-draggable carousel with autoplay, arrows and dots.
 * `items` + `renderItem(item, index)` keep it reusable across pages.
 */
export default function Carousel({
  items,
  renderItem,
  options = {},
  autoPlay = 4500,
  slideClassName = 'min-w-0 flex-[0_0_84%] sm:flex-[0_0_55%] lg:flex-[0_0_32%]',
  gapClassName = 'gap-4 sm:gap-5',
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', ...options })
  const [selected, setSelected] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const timerRef = useRef(null)
  const pausedRef = useRef(false)

  const onSelect = useCallback((api) => {
    setSelected(api.selectedScrollSnap())
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi || !autoPlay) return
    const tick = () => {
      if (!pausedRef.current) emblaApi.scrollNext()
    }
    timerRef.current = setInterval(tick, autoPlay)
    return () => clearInterval(timerRef.current)
  }, [emblaApi, autoPlay])

  return (
    <div
      className="relative"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onTouchStart={() => (pausedRef.current = true)}
      onTouchEnd={() => (pausedRef.current = false)}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className={`flex ${gapClassName}`}>
          {items.map((item, i) => (
            <div className={slideClassName} key={item.id ?? i}>
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Anterior"
        onClick={() => emblaApi && emblaApi.scrollPrev()}
        disabled={!canPrev}
        className="glass absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-105 disabled:opacity-0 sm:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Siguiente"
        onClick={() => emblaApi && emblaApi.scrollNext()}
        disabled={!canNext}
        className="glass absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-105 disabled:opacity-0 sm:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="mt-5 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir a la imagen ${i + 1}`}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === selected ? 'w-6 bg-blue' : 'w-2 bg-blue-bg hover:bg-blue/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
