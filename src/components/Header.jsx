import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { fotos } from '../data/fotos.js'
import { preinscripcion, preinscripcionAbierta } from '../data/institucion.js'
import { mesaActual, estadoMesa } from '../data/mesas.js'
import { secciones, barraInferior } from '../data/navegacion.js'
import { Chevron, Icono } from './Icons.jsx'

// Announcements for the top bar, most urgent first. Empty list hides the bar.
function avisosVigentes() {
  const avisos = []
  const estado = estadoMesa()
  if (estado && estado !== 'finalizada') {
    const { inscripcion, examenes } = mesaActual
    const texto = {
      proxima: `Inscripción desde el ${inscripcion.desdeTexto}`,
      inscripcion: `Inscripción hasta el ${inscripcion.hastaTexto} en Secretaría`,
      cerrada: `Exámenes ${examenes.texto}`,
    }[estado]
    avisos.push({ to: '/mesas', destacado: `Mesa de Examen ${mesaActual.periodo}`, texto })
  }
  if (preinscripcionAbierta()) {
    avisos.push({
      to: '/preinscripcion',
      destacado: `Preinscripción ${preinscripcion.anio} ${preinscripcion.cicloLectivo}`,
      texto: `Hasta el ${preinscripcion.fechaLimiteTexto}`,
    })
  }
  return avisos
}

function BarraAvisos() {
  const avisos = avisosVigentes()
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    if (avisos.length < 2) return
    const t = setInterval(() => setIndice((i) => (i + 1) % avisos.length), 5000)
    return () => clearInterval(t)
  }, [avisos.length])

  if (avisos.length === 0) return null
  const aviso = avisos[indice % avisos.length]

  return (
    <Link
      to={aviso.to}
      className="group block bg-gradient-to-r from-brand-navy via-brand-blue to-brand-royal text-white text-[13px]"
    >
      <div key={indice} className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-center gap-2 text-center">
        <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#FF8A7A] animate-pulse" />
        <span className="truncate">
          <strong className="font-bold">{aviso.destacado}</strong>
          <span className="text-slate-300"> · {aviso.texto}</span>
        </span>
        <span className="hidden sm:inline font-semibold underline underline-offset-4 decoration-white/40 group-hover:decoration-white">
          Ver más
        </span>
      </div>
    </Link>
  )
}

function Identidad() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-3 group">
      <div className="flex h-10 w-10 lg:h-11 lg:w-11 flex-none items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm p-1 group-hover:border-brand-navy transition-colors">
        <img src={fotos.logo} alt="" className="h-full w-full object-contain" />
      </div>
      <div className="min-w-0">
        <span className="block truncate text-[15px] font-extrabold tracking-tight text-brand-navy leading-none">
          Escuela Secundaria N.° 7
        </span>
        <span className="mt-1 block truncate text-xs font-medium text-slate-500">
          &ldquo;Carlos Lorenzo Vergara&rdquo;
        </span>
      </div>
    </Link>
  )
}

const pill = (activo) =>
  `inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
    activo ? 'bg-white text-brand-navy shadow-sm' : 'text-slate-600 hover:text-brand-navy hover:bg-white/60'
  }`

// Desktop dropdown for one section of the site map.
function Desplegable({ seccion, abierto, onAbrir, onCerrar }) {
  const { pathname } = useLocation()
  const activo = seccion.links.some((l) => pathname.startsWith(l.to))

  return (
    <div className="relative" onMouseEnter={onAbrir} onMouseLeave={onCerrar}>
      <button
        type="button"
        aria-expanded={abierto}
        onClick={abierto ? onCerrar : onAbrir}
        className={pill(activo)}
      >
        {seccion.titulo}
        <Chevron className={`w-3.5 h-3.5 transition-transform ${abierto ? 'rotate-180' : ''}`} />
      </button>
      {abierto && (
        <div className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3">
          <div className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_24px_50px_-20px_rgba(10,22,40,0.35)]">
            {seccion.links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 transition-colors ${isActive ? 'bg-brand-sky' : 'hover:bg-slate-50'}`
                }
              >
                <span className="block text-sm font-bold text-brand-navy">{l.label}</span>
                <span className="block text-xs text-slate-500 mt-0.5">{l.detalle}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Bottom sheet with the whole site map, for phones and tablets.
function MenuMovil({ abierto, onCerrar }) {
  return (
    <div className={`lg:hidden fixed inset-0 z-[60] ${abierto ? '' : 'pointer-events-none'}`} inert={!abierto}>
      <div
        onClick={onCerrar}
        className={`absolute inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 ${abierto ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menú del sitio"
        className={`absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-y-auto rounded-t-[28px] bg-white pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl transition-transform duration-300 ease-out ${
          abierto ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white/95 backdrop-blur px-5 pt-3 pb-3 border-b border-slate-100">
          <span className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-slate-300" />
          <span className="pt-2 text-sm font-extrabold text-brand-navy">Menú</span>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar menú"
            className="mt-2 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-brand-navy"
          >
            <Icono nombre="cerrar" className="w-4 h-4" strokeWidth={2.2} />
          </button>
        </div>

        <nav className="px-3 pt-2">
          {secciones.map((s) => (
            <div key={s.id} className="py-2">
              <span className="block px-3 pb-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400">
                {s.titulo}
              </span>
              {s.links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={onCerrar}
                  className={({ isActive }) =>
                    `flex items-center justify-between gap-3 rounded-2xl px-3 py-3 transition-colors ${
                      isActive ? 'bg-brand-sky' : 'active:bg-slate-100'
                    }`
                  }
                >
                  <span className="min-w-0">
                    <span className="block text-[15px] font-bold text-brand-navy">{l.label}</span>
                    <span className="block truncate text-xs text-slate-500">{l.detalle}</span>
                  </span>
                  <Chevron className="w-4 h-4 flex-none -rotate-90 text-slate-400" />
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {preinscripcionAbierta() && (
          <div className="px-5 pt-2">
            <Link
              to="/preinscripcion"
              onClick={onCerrar}
              className="flex items-center justify-center gap-2 rounded-2xl bg-brand-crimson px-4 py-4 text-[15px] font-bold text-white"
            >
              <span className="h-2 w-2 rounded-full bg-white" />
              Preinscripción {preinscripcion.cicloLectivo}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function BarraInferior({ menuAbierto, onMenu }) {
  const item = 'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-semibold transition-colors'
  return (
    <nav
      aria-label="Navegación principal"
      className="lg:hidden fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto flex max-w-xl">
        {barraInferior.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) => `${item} ${isActive && !menuAbierto ? 'text-brand-crimson' : 'text-slate-500'}`}
          >
            <Icono nombre={l.icono} className="w-[22px] h-[22px]" />
            {l.label}
          </NavLink>
        ))}
        <button
          type="button"
          onClick={onMenu}
          aria-expanded={menuAbierto}
          className={`${item} ${menuAbierto ? 'text-brand-crimson' : 'text-slate-500'}`}
        >
          <Icono nombre={menuAbierto ? 'cerrar' : 'menu'} className="w-[22px] h-[22px]" />
          Menú
        </button>
      </div>
    </nav>
  )
}

export default function Header() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  // Menus remember the page they were opened on, so navigating closes them.
  const [movilEn, setMovilEn] = useState(null)
  const [desplegable, setDesplegable] = useState({ id: null, en: null })
  const movilAbierto = movilEn === pathname
  const abiertoId = desplegable.en === pathname ? desplegable.id : null

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!movilAbierto && !abiertoId) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setMovilEn(null)
      setDesplegable({ id: null, en: null })
    }
    document.body.style.overflow = movilAbierto ? 'hidden' : ''
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [movilAbierto, abiertoId])

  const [escuela, informacion] = secciones

  return (
    <>
      <BarraAvisos />

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_24px_rgba(10,22,40,0.08)] border-b border-slate-200/90'
            : 'bg-white/95 backdrop-blur-sm border-b border-slate-200/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-4">
          <Identidad />

          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-0.5 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/70">
            <NavLink to="/" end className={({ isActive }) => pill(isActive)}>Inicio</NavLink>
            {[escuela, informacion].map((s) => (
              <Desplegable
                key={s.id}
                seccion={s}
                abierto={abiertoId === s.id}
                onAbrir={() => setDesplegable({ id: s.id, en: pathname })}
                onCerrar={() => setDesplegable({ id: null, en: null })}
              />
            ))}
            <NavLink to="/contacto" className={({ isActive }) => pill(isActive)}>Contacto</NavLink>
          </nav>

          <Link
            to="/preinscripcion"
            className="btn-shine hidden sm:inline-flex flex-none items-center gap-2 px-4 lg:px-5 py-2.5 rounded-xl bg-brand-crimson text-white text-sm font-semibold hover:bg-red-700 active:scale-[0.98] transition-all shadow-[0_8px_20px_-6px_rgba(217,38,50,0.6)]"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Preinscripción {preinscripcion.cicloLectivo}
          </Link>
        </div>
      </header>

      <MenuMovil abierto={movilAbierto} onCerrar={() => setMovilEn(null)} />
      <BarraInferior
        menuAbierto={movilAbierto}
        onMenu={() => setMovilEn(movilAbierto ? null : pathname)}
      />
    </>
  )
}
