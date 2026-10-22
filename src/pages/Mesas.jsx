import { Link } from 'react-router-dom'
import { institucion } from '../data/institucion.js'
import { mesaActual, estadoMesa, etiquetaEstado } from '../data/mesas.js'
import Seo from '../components/Seo.jsx'

const estadoColor = {
  proxima: 'bg-amber-500',
  inscripcion: 'bg-emerald-500',
  cerrada: 'bg-brand-crimson',
  finalizada: 'bg-slate-500',
}

function Icono({ tipo }) {
  const common = { className: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 1.75 }
  if (tipo === 'quienes') {
    return (
      <svg {...common}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
  if (tipo === 'inscripcion') {
    return (
      <svg {...common}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

export default function Mesas() {
  const mesa = mesaActual
  const estado = estadoMesa(mesa)
  const vigente = estado && estado !== 'finalizada'

  return (
    <div className="min-h-screen">
      <Seo
        titulo="Mesas de examen"
        descripcion={vigente ? `Inscripción a ${mesa.titulo} ${mesa.periodo}: del ${mesa.inscripcion.desdeTexto} al ${mesa.inscripcion.hastaTexto}.` : 'Convocatorias a mesas de examen de la Escuela Secundaria N.° 7.'}
      />
      <section className="bg-grid-pattern border-b border-slate-200 pt-8 pb-10 sm:pt-14 sm:pb-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Ruta de navegación" className="mb-5 flex items-center gap-1.5 text-[13px] text-slate-500">
            <Link to="/" className="hover:text-brand-navy">Inicio</Link>
            <span>/</span>
            <span className="text-brand-navy font-semibold">Mesas de examen</span>
          </nav>

          {vigente ? (
            <>
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white ${estadoColor[estado]}`}>
                  {estado === 'inscripcion' && <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />}
                  {etiquetaEstado[estado]}
                </span>
                <span className="rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                  {mesa.periodo}
                </span>
              </div>
              <h1 className="text-[32px] sm:text-5xl font-extrabold tracking-tight text-brand-navy max-w-3xl leading-[1.12]">
                Inscripción a{' '}
                <span className="font-serif italic font-normal text-brand-crimson">{mesa.titulo}</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                La Rectoría de la {institucion.nombreCompleto} convoca a Mesa de Examen a los estudiantes que hayan finalizado el Nivel Secundario con espacios curriculares
                pendientes de aprobación.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-[32px] sm:text-5xl font-extrabold tracking-tight text-brand-navy max-w-3xl leading-[1.12]">
                Mesas de <span className="font-serif italic font-normal text-brand-crimson">examen</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Por el momento no hay una convocatoria abierta. Cuando se publique la próxima mesa, vas a encontrar
                aquí las fechas de inscripción y de examen.
              </p>
            </>
          )}
        </div>
      </section>

      {vigente && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-4 sm:space-y-5">
          {/* Fechas clave */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="reveal rounded-2xl bg-brand-navy text-white p-6 sm:p-7">
              <div className="flex items-center gap-3 text-[#FF8A7A]">
                <Icono tipo="inscripcion" />
                <span className="text-xs font-bold uppercase tracking-widest">Inscripción</span>
              </div>
              <p className="mt-4 text-2xl sm:text-3xl font-extrabold leading-tight">
                Del {mesa.inscripcion.desdeTexto} al {mesa.inscripcion.hastaTexto}
              </p>
              <p className="mt-2 text-sm text-slate-300">En la {mesa.inscripcion.lugar}.</p>
            </div>

            <div style={{ '--reveal-delay': '90ms' }} className="reveal rounded-2xl bg-white border border-slate-200 p-6 sm:p-7">
              <div className="flex items-center gap-3 text-brand-royal">
                <Icono tipo="examen" />
                <span className="text-xs font-bold uppercase tracking-widest">Mesas de examen</span>
              </div>
              <p className="mt-4 text-2xl sm:text-3xl font-extrabold leading-tight text-brand-navy">
                Semana {mesa.examenes.texto}
              </p>
              <Link to="/calendario" className="mt-2 inline-block text-sm font-semibold text-brand-royal hover:underline">Ver en el calendario</Link>
            </div>
          </div>

          {/* Horarios */}
          <div className="reveal rounded-2xl bg-white border border-slate-200 p-6 sm:p-7">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Horarios de inscripción en Secretaría
            </span>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mesa.inscripcion.horarios.map((h) => (
                <div key={h.turno} className="rounded-xl bg-brand-sky px-4 py-3">
                  <span className="block text-xs font-semibold text-brand-royal">{h.turno}</span>
                  <span className="block mt-0.5 font-mono text-lg font-bold text-brand-navy">{h.texto}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Destinatarios */}
          <div className="reveal rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-brand-sky text-brand-royal flex items-center justify-center flex-none">
              <Icono tipo="quienes" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">¿Quiénes pueden inscribirse?</span>
              <p className="mt-1.5 text-base text-slate-700 leading-relaxed">{mesa.destinatarios}</p>
            </div>
          </div>

          {/* Acciones */}
          <div className="reveal flex flex-col sm:flex-row gap-3 pt-2">
            {mesa.afiche && (
              <a
                href={encodeURI(`/${mesa.afiche}`)}
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-crimson px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Descargar afiche
              </a>
            )}
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-brand-navy hover:bg-slate-50 transition-colors"
            >
              ¿Dudas? Contactá a la escuela
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
