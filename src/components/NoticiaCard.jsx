import { Link } from 'react-router-dom'
import { categoriasNoticias } from '../data/noticias.js'
import { formatFecha } from '../lib/fechas.js'
import { Arrow } from './Icons.jsx'

export function EtiquetaCategoria({ categoria, className = '' }) {
  const cat = categoriasNoticias[categoria]
  if (!cat) return null
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white ${cat.color} ${className}`}>
      {cat.label}
    </span>
  )
}

/**
 * News card. On phones it is a compact row (thumbnail + text); from `sm` up it
 * becomes a vertical card. `grande` keeps the large layout at every size.
 */
export default function NoticiaCard({ noticia, grande = false, delay = 0 }) {
  return (
    <Link
      to={`/noticias/${noticia.slug}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={`reveal group flex overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(10,22,40,0.35)] ${
        grande ? 'flex-col' : 'flex-row sm:flex-col'
      }`}
    >
      {noticia.imagen && (
        <div
          className={`relative flex-none overflow-hidden bg-slate-100 ${
            grande ? 'aspect-[16/9]' : 'w-28 sm:w-auto sm:aspect-[16/10]'
          }`}
        >
          <img
            src={noticia.imagen}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <EtiquetaCategoria categoria={noticia.categoria} className={`absolute left-3 top-3 ${grande ? '' : 'hidden sm:inline-block'}`} />
        </div>
      )}
      <div className={`flex min-w-0 flex-1 flex-col ${grande ? 'p-5 sm:p-7' : 'p-4 sm:p-5'}`}>
        <time dateTime={noticia.fecha.toISOString()} className="font-mono text-xs font-semibold text-slate-500">
          {formatFecha(noticia.fecha)}
        </time>
        <h3
          className={`mt-1.5 font-extrabold tracking-tight text-brand-navy leading-snug group-hover:text-brand-royal transition-colors ${
            grande ? 'text-xl sm:text-2xl' : 'text-[15px] sm:text-lg line-clamp-3'
          }`}
        >
          {noticia.titulo}
        </h3>
        <p className={`mt-2 text-sm text-slate-600 leading-relaxed ${grande ? '' : 'hidden sm:block line-clamp-3'}`}>
          {noticia.resumen}
        </p>
        <span className="mt-auto hidden sm:inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-brand-navy">
          Leer más
          <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
