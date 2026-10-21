import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { fotos } from '../data/fotos.js'
import { preinscripcion } from '../data/institucion.js'
import { mesaActual, estadoMesa } from '../data/mesas.js'

const avisos = [
  `Preinscripciones abiertas · 1.° Año · Ciclo Lectivo ${preinscripcion.cicloLectivo}`,
  `Presentación hasta el ${preinscripcion.fechaLimiteTexto}`,
  `Atención de ${preinscripcion.horario}`,
  'Traé la documentación completa',
  'Ver requisitos →',
]

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/orientaciones', label: 'Orientaciones y Turnos' },
  { to: '/vida-escolar', label: 'Vida Escolar' },
  { to: '/preinscripcion', label: 'Preinscripción 2027' },
  { to: '/mesas', label: 'Mesas' },
  { to: '/contacto', label: 'Contacto' },
]

// One-line summary of the current exam call, or null when there is nothing to announce.
function avisoMesa() {
  const estado = estadoMesa()
  if (!estado || estado === 'finalizada') return null
  const { inscripcion, examenes } = mesaActual
  if (estado === 'proxima') return { destacado: 'Mesa de Examen', texto: `Inscripción desde el ${inscripcion.desdeTexto}` }
  if (estado === 'inscripcion') return { destacado: 'Inscripción abierta a Mesa de Examen', texto: `Hasta el ${inscripcion.hastaTexto} en Secretaría` }
  return { destacado: 'Mesa de Examen', texto: `Semana ${examenes.texto}` }
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const mesa = avisoMesa()

  return (
    <>
      {/* AVISO FIJO: mesa de examen vigente */}
      {mesa && (
        <Link
          to="/mesas"
          className="group block bg-brand-navy text-white text-[13px] hover:bg-brand-blue transition-colors"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-x-2.5 gap-y-0.5 flex-wrap text-center">
            <span className="inline-flex items-center gap-2 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A7A] animate-pulse" />
              {mesa.destacado}
            </span>
            <span className="text-slate-300">{mesa.texto}</span>
            <span className="font-semibold underline underline-offset-4 decoration-white/40 group-hover:decoration-white">
              Ver info
            </span>
          </div>
        </Link>
      )}

      {/* BARRA DE NOVEDADES: preinscripción 2027 */}
      <Link
        to="/preinscripcion"
        className="group block bg-gradient-to-r from-brand-crimson via-[#E8452F] to-brand-royal text-white text-[13px] font-semibold overflow-hidden"
      >
        <div className="relative flex h-9 items-center">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={k === 1}>
                {avisos.map((a) => (
                  <span key={a} className="flex items-center gap-2.5 whitespace-nowrap">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                    {a}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Link>

      {/* NAVBAR FLOTANTE CON GLASSMORPHISM */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_24px_rgba(10,22,40,0.08)] border-b border-slate-200/90'
            : 'bg-white/95 backdrop-blur-sm border-b border-slate-200/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Identidad Institucional: Escudo oficial */}
          <Link to="/" className="flex items-center gap-3.5 group min-w-0">
            <div className="relative flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm p-1 overflow-hidden group-hover:border-brand-navy transition-colors">
              <img
                src={fotos.logo}
                alt="Escudo oficial Escuela Secundaria N.° 7"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="truncate">
              <span className="block text-[15px] font-extrabold tracking-tight text-brand-navy leading-none">
                Escuela Secundaria N.° 7
              </span>
              <span className="block text-xs font-medium text-slate-500 mt-1">
                &ldquo;Carlos Lorenzo Vergara&rdquo;
              </span>
            </div>
          </Link>

          {/* Navegación tipo Pill */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/70">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `px-2.5 xl:px-3.5 py-1.5 rounded-full text-[13px] xl:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-brand-navy shadow-sm'
                      : 'text-slate-600 hover:text-brand-navy hover:bg-white/50'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA Principal */}
          <div className="flex items-center gap-3">
            <Link
              to="/preinscripcion"
              className="btn-shine hidden sm:inline-flex lg:hidden xl:inline-flex relative items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-crimson text-white text-sm font-semibold hover:bg-red-700 active:scale-[0.98] transition-all shadow-[0_8px_20px_-6px_rgba(217,38,50,0.6)]"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Preinscribirme</span>
            </Link>

            {/* Mobile toggle button */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-brand-navy lg:hidden hover:bg-slate-100 transition-colors"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-[2px] w-full rounded-full bg-current transition-all duration-300 ${
                    open ? 'top-[7px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-[2px] w-full rounded-full bg-current transition-opacity duration-200 ${
                    open ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] h-[2px] w-full rounded-full bg-current transition-all duration-300 ${
                    open ? 'top-[7px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <div
          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out lg:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-md ${
            open ? 'max-h-[28rem]' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col gap-1.5 p-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-brand-navy text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/preinscripcion"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-crimson px-4 py-3 text-center text-sm font-semibold text-white shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>Iniciar Preinscripción</span>
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}
