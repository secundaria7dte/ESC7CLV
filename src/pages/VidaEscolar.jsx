import { useEffect, useState } from 'react'
import { galeria, categoriasGaleria } from '../data/galeria.js'
import PageHeader, { Filtros } from '../components/PageHeader.jsx'
import Seo from '../components/Seo.jsx'

export default function VidaEscolar() {
  const [filtro, setFiltro] = useState('Todas')
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null)

  useEffect(() => {
    if (!fotoSeleccionada) return
    const onKey = (e) => e.key === 'Escape' && setFotoSeleccionada(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [fotoSeleccionada])

  const categorias = ['Todas', ...Object.keys(categoriasGaleria)]

  const fotosFiltradas = galeria.filter((g) => {
    if (filtro === 'Todas') return true
    return g.cat === filtro
  })

  return (
    <div className="min-h-screen">
      <Seo
        titulo="Vida escolar"
        descripcion="Jornadas deportivas, charlas y momentos de convivencia de la comunidad de la Escuela Secundaria N.° 7."
      />
      <PageHeader
        migas={[{ label: 'Vida escolar' }]}
        eyebrow="Archivo visual"
        titulo={
          <>
            La vida cotidiana de nuestra{' '}
            <span className="font-serif italic font-normal text-brand-crimson">comunidad</span> escolar.
          </>
        }
        intro="Jornadas deportivas, charlas y momentos de convivencia: imágenes de estudiantes y docentes de la Escuela N.° 7."
      >
        <Filtros
          opciones={categorias.map((c) => ({ id: c, label: c }))}
          activo={filtro}
          onCambiar={setFiltro}
        />
      </PageHeader>

      {/* Bento Grid Fotográfico */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-5 auto-rows-[150px] sm:auto-rows-[290px]">
          {fotosFiltradas.map((g, i) => {
            const meta = categoriasGaleria[g.cat]
            
            // Asignación de spans asimétricos tipo Bento
            const isWide = i % 5 === 0 || i % 5 === 3
            const colSpanClass = isWide ? 'col-span-2 lg:col-span-8' : 'lg:col-span-4'

            return (
              <div
                key={g.id}
                onClick={() => setFotoSeleccionada(g)}
                className={`${colSpanClass} relative group rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm cursor-pointer`}
              >
                <img
                  src={g.img}
                  alt={g.label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/20 to-transparent" />
                
                {/* Pie de foto con botón de zoom vectorial */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-end justify-between text-white z-10">
                  <div className="pr-3">
                    <span className={`inline-block px-3 py-1 rounded-lg text-white text-xs font-bold tracking-wide shadow-sm border border-white/15 ${meta.tag}`}>
                      {meta.label}
                    </span>
                  </div>

                  {/* Botón de zoom con ícono SVG sin emojis */}
                  <div className="hidden sm:flex w-9 h-9 rounded-lg bg-slate-950/60 backdrop-blur-md border border-white/15 text-white items-center justify-center group-hover:bg-brand-crimson transition-colors flex-none shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Modal / Lightbox de visualización ampliada */}
      {fotoSeleccionada && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setFotoSeleccionada(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-brand-navy rounded-2xl overflow-hidden border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de cierre vectorial */}
            <button
              type="button"
              onClick={() => setFotoSeleccionada(null)}
              aria-label="Cerrar vista"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-brand-crimson transition-colors border border-white/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="max-h-[75vh] bg-black flex items-center justify-center">
              <img
                src={fotoSeleccionada.img}
                alt={fotoSeleccionada.label}
                decoding="async"
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>
            <div className="p-5 flex items-center justify-between text-white bg-brand-navy">
              <div>
                <span className="text-xs font-mono text-brand-crimson uppercase tracking-wider block">
                  Vida escolar
                </span>
                <h3 className="text-lg font-bold mt-0.5">{fotoSeleccionada.label}</h3>
              </div>
              <button
                type="button"
                onClick={() => setFotoSeleccionada(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              >
                Cerrar vista
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
