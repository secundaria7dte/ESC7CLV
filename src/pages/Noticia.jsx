import { Link, useParams } from 'react-router-dom'
import { buscarNoticia, noticiasOrdenadas } from '../data/noticias.js'
import { formatFecha } from '../lib/fechas.js'
import NoticiaCard, { EtiquetaCategoria } from '../components/NoticiaCard.jsx'
import { Arrow } from '../components/Icons.jsx'
import Seo from '../components/Seo.jsx'
import NoEncontrada from './NoEncontrada.jsx'

function Bloque({ bloque }) {
  if (typeof bloque === 'string') return <p>{bloque}</p>
  if (bloque.lista) {
    return (
      <ul className="space-y-2">
        {bloque.lista.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-crimson" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )
  }
  return null
}

export default function Noticia() {
  const { slug } = useParams()
  const noticia = buscarNoticia(slug)
  if (!noticia) return <NoEncontrada />

  const otras = noticiasOrdenadas.filter((n) => n.slug !== slug).slice(0, 3)

  return (
    <article className="min-h-screen">
      <Seo titulo={noticia.titulo} descripcion={noticia.resumen} />

      <header className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12">
        <Link
          to="/noticias"
          className="inline-flex items-center gap-1.5 rounded-full py-2 text-sm font-semibold text-slate-500 hover:text-brand-navy"
        >
          <Arrow className="w-4 h-4 rotate-180" />
          Todas las noticias
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <EtiquetaCategoria categoria={noticia.categoria} />
          <time dateTime={noticia.fecha.toISOString()} className="font-mono text-xs font-semibold text-slate-500">
            {formatFecha(noticia.fecha)}
          </time>
        </div>
        <h1 className="mt-4 text-[28px] sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-navy leading-[1.12]">
          {noticia.titulo}
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed">{noticia.resumen}</p>
      </header>

      {noticia.imagen && (
        <div className="max-w-4xl mx-auto mt-8 sm:px-6">
          <img
            src={noticia.imagen}
            alt=""
            className="aspect-[16/9] w-full object-cover sm:rounded-3xl"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="space-y-5 text-[17px] leading-relaxed text-slate-700">
          {noticia.cuerpo.map((b, i) => (
            <Bloque key={i} bloque={b} />
          ))}
        </div>

        {noticia.enlace && (
          <Link
            to={noticia.enlace.to}
            className="btn-shine group mt-8 flex w-full sm:inline-flex sm:w-auto items-center justify-center gap-2 rounded-2xl bg-brand-navy px-6 py-4 text-[15px] font-bold text-white hover:bg-brand-royal transition-colors"
          >
            {noticia.enlace.label}
            <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      {otras.length > 0 && (
        <section className="border-t border-slate-200 bg-white/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-brand-navy">Otras noticias</h2>
            <div className="mt-5 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otras.map((n, i) => (
                <NoticiaCard key={n.slug} noticia={n} delay={i * 80} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
