import { Link } from 'react-router-dom'

/**
 * Shared page heading: breadcrumb, eyebrow, title and intro on the light grid
 * background. `children` renders below (filters, chips…).
 */
export default function PageHeader({ migas = [], eyebrow, titulo, intro, children, ancho = 'max-w-7xl' }) {
  return (
    <section className="bg-grid-pattern border-b border-slate-200 pt-8 pb-10 sm:pt-14 sm:pb-14">
      <div className={`${ancho} mx-auto px-4 sm:px-6 lg:px-8`}>
        <nav aria-label="Ruta de navegación" className="mb-5 flex flex-wrap items-center gap-1.5 text-[13px] text-slate-500">
          <Link to="/" className="hover:text-brand-navy">Inicio</Link>
          {migas.map((m) => (
            <span key={m.label} className="contents">
              <span aria-hidden="true">/</span>
              {m.to ? (
                <Link to={m.to} className="hover:text-brand-navy">{m.label}</Link>
              ) : (
                <span className="font-semibold text-brand-navy line-clamp-1">{m.label}</span>
              )}
            </span>
          ))}
        </nav>

        {eyebrow && (
          <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-brand-crimson">
            <span className="h-2 w-2 rounded-full bg-brand-crimson" />
            <span>{eyebrow}</span>
          </div>
        )}
        <h1 className="max-w-3xl text-[32px] sm:text-5xl font-extrabold tracking-tight text-brand-navy leading-[1.1]">
          {titulo}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">{intro}</p>
        )}
        {children}
      </div>
    </section>
  )
}

/** Horizontal filter chips that scroll sideways on phones instead of wrapping. */
export function Filtros({ opciones, activo, onCambiar }) {
  return (
    <div className="-mx-4 mt-7 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar sm:mx-0 sm:flex-wrap sm:px-0">
      {opciones.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onCambiar(o.id)}
          aria-pressed={activo === o.id}
          className={`flex-none rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
            activo === o.id
              ? 'bg-brand-navy text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:text-brand-navy hover:bg-slate-50'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
