import { Link, useSearchParams } from 'react-router-dom'
import { orientaciones } from '../data/orientaciones.js'

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
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header Institucional */}
      <section className="bg-grid-pattern border-b border-slate-200 pt-12 pb-14 sm:pt-16 sm:pb-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-brand-crimson font-mono text-xs font-semibold uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-crimson animate-pulse" />
            <span>Propuesta Académica Oficial</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-navy max-w-2xl leading-[1.12]">
            Orientaciones y turnos con{' '}
            <span className="font-serif italic font-normal text-brand-crimson">propósito</span> pedagógico.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Contamos con diferentes orientaciones y turnos para que elijas el camino que mejor se adapte a tu futuro.
          </p>

          {/* Filtro rápido por turno con íconos vectoriales limpios */}
          <div className="flex flex-wrap items-center gap-2 pt-8">
            <button
              type="button"
              onClick={() => handleFilterChange('todos')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTurno === 'todos'
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-brand-navy border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Todos los turnos
            </button>

            <button
              type="button"
              onClick={() => handleFilterChange('manana')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTurno === 'manana'
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-brand-navy border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
              <span>Turno Mañana</span>
            </button>

            <button
              type="button"
              onClick={() => handleFilterChange('tarde')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTurno === 'tarde'
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-brand-navy border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                <path d="M12 9a4 4 0 0 0-4 4c0 .8.2 1.6.7 2.2" />
                <path d="M17.5 19H9a5 5 0 0 1-5-5 5 5 0 0 1 4.5-4.95A6 6 0 0 1 20 13a4.5 4.5 0 0 1-2.5 4.18" />
                <path d="M12 3v3M18.36 5.64l-2.12 2.12M21 12h-3" />
              </svg>
              <span>Turno Tarde</span>
            </button>

            <button
              type="button"
              onClick={() => handleFilterChange('noche')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTurno === 'noche'
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-brand-navy border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
              <span>Turno Noche (ESJA)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid de Orientaciones */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
