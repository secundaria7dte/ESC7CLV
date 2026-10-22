import { Link, useSearchParams } from 'react-router-dom'
import { orientaciones } from '../data/orientaciones.js'
import PageHeader, { Filtros } from '../components/PageHeader.jsx'
import Seo from '../components/Seo.jsx'

export default function Orientaciones() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTurno = searchParams.get('turno') || 'todos'

  const handleFilterChange = (turnoId) => {
    if (turnoId === 'todos') {
      setSearchParams({})
    } else {
      setSearchParams({ turno: turnoId })
    }
  }

  const filteredOrientaciones =
    activeTurno === 'todos'
      ? orientaciones
      : orientaciones.filter((o) => o.id === activeTurno)

  return (
    <div className="min-h-screen">
      <Seo
        titulo="Orientaciones y turnos"
        descripcion="Ciclo orientado en los turnos mañana y tarde, y ESJA en el turno noche. Conocé las orientaciones de la Escuela Secundaria N.° 7."
      />
      <PageHeader
        migas={[{ label: 'Orientaciones y turnos' }]}
        eyebrow="Propuesta académica"
        titulo={
          <>
            Orientaciones y turnos con{' '}
            <span className="font-serif italic font-normal text-brand-crimson">propósito</span> pedagógico.
          </>
        }
        intro="Contamos con diferentes orientaciones y turnos para que elijas el camino que mejor se adapte a tu futuro."
      >
        <Filtros
          opciones={[
            { id: 'todos', label: 'Todos los turnos' },
            ...orientaciones.map((o) => ({ id: o.id, label: o.id === 'noche' ? `${o.turno} (ESJA)` : o.turno })),
          ]}
          activo={activeTurno}
          onCambiar={handleFilterChange}
        />
      </PageHeader>

      {/* Grid de Orientaciones */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {filteredOrientaciones.map((o) => {
            const isNight = o.id === 'noche'
            return (
              <article
                key={o.id}
                id={o.id}
                className={`rounded-[26px] flex flex-col justify-between overflow-hidden border transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                  isNight
                    ? 'bg-brand-navy text-white border-brand-navy'
                    : 'bg-white text-brand-navy border-slate-200'
                }`}
              >
                <div>
                  {/* Foto de cabecera con lazy loading */}
                  <div className="relative h-56 overflow-hidden bg-slate-900">
                    <img
                      src={o.img}
                      alt={o.title}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${
                        isNight ? 'opacity-75' : 'opacity-85'
                      }`}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        isNight
                          ? 'from-brand-navy via-brand-navy/40 to-transparent'
                          : 'from-brand-navy via-brand-navy/30 to-transparent'
                      }`}
                    />
                    
                    {/* Badge superior asegurado */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-semibold shadow-sm ${
                          isNight
                            ? 'bg-brand-crimson text-white'
                            : 'bg-brand-navy/90 backdrop-blur-md text-white border border-white/20'
                        }`}
                      >
                        {o.turno}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                      <span
                        className={`text-xs font-mono uppercase tracking-wider ${
                          isNight ? 'text-red-300' : 'text-amber-300'
                        }`}
                      >
                        {o.schedule}
                      </span>
                      <h2 className="text-2xl font-bold mt-0.5">{o.title}</h2>
                    </div>
                  </div>

                  {/* Cuerpo con materias y características */}
                  <div className="p-6 space-y-5">
                    <div>
                      <h3
                        className={`text-xs font-mono font-bold uppercase tracking-wider mb-2.5 ${
                          isNight ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        Orientaciones
                      </h3>
                      <ul className="space-y-2">
                        {o.materias.map((m) => (
                          <li
                            key={m}
                            className={`flex items-center gap-2.5 text-sm ${
                              isNight ? 'text-slate-200' : 'text-slate-700'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson flex-none" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className={`p-4 rounded-xl text-xs leading-relaxed ${
                        isNight ? 'bg-white/10 text-slate-300' : 'bg-slate-50 text-slate-600 border border-slate-100'
                      }`}
                    >
                      {o.id === 'noche'
                        ? 'ESJA: Educación Secundaria de Jóvenes y Adultos, en el turno noche.'
                        : `Ciclo Orientado de ${o.schedule}, en el ${o.turno.toLowerCase()}.`}
                    </div>
                  </div>
                </div>

                {/* Footer de tarjeta con botón a preinscripción */}
                <div className="p-6 pt-0 space-y-2.5">
                  <Link
                    to="/preinscripcion"
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                      isNight
                        ? 'bg-brand-crimson text-white hover:bg-red-700 shadow-sm'
                        : 'bg-brand-navy text-white hover:bg-brand-blue shadow-sm'
                    }`}
                  >
                    <span>Preinscripción 2027</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
