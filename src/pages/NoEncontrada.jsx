import { Link } from 'react-router-dom'
import { secciones } from '../data/navegacion.js'
import { Arrow } from '../components/Icons.jsx'
import Seo from '../components/Seo.jsx'

const sugeridas = secciones.flatMap((s) => s.links).slice(0, 6)

export default function NoEncontrada() {
  return (
    <section className="bg-grid-pattern min-h-[70vh]">
      <Seo titulo="Página no encontrada" />
      <meta name="robots" content="noindex" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-24">
        <span className="font-mono text-sm font-bold text-brand-crimson">Error 404</span>
        <h1 className="mt-3 text-[32px] sm:text-5xl font-extrabold tracking-tight text-brand-navy leading-[1.1]">
          No encontramos esta{' '}
          <span className="font-serif italic font-normal text-brand-crimson">página</span>.
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed">
          Puede que el enlace esté mal escrito o que la página ya no exista. Probá con alguna de estas secciones:
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {sugeridas.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 hover:border-brand-navy transition-colors"
            >
              <span>
                <span className="block font-bold text-brand-navy">{l.label}</span>
                <span className="block text-xs text-slate-500">{l.detalle}</span>
              </span>
              <Arrow className="w-4 h-4 flex-none text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-navy" />
            </Link>
          ))}
        </div>

        <Link
          to="/"
          className="mt-8 flex w-full sm:inline-flex sm:w-auto items-center justify-center gap-2 rounded-2xl bg-brand-navy px-6 py-4 font-bold text-white hover:bg-brand-royal transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
