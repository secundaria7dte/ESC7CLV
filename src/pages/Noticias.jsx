import { useSearchParams } from 'react-router-dom'
import { noticiasOrdenadas, categoriasNoticias } from '../data/noticias.js'
import PageHeader, { Filtros } from '../components/PageHeader.jsx'
import NoticiaCard from '../components/NoticiaCard.jsx'
import Seo from '../components/Seo.jsx'

export default function Noticias() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activa = searchParams.get('categoria') || 'todas'

  // Only offer categories that actually have news.
  const opciones = [
    { id: 'todas', label: 'Todas' },
    ...Object.entries(categoriasNoticias)
      .filter(([id]) => noticiasOrdenadas.some((n) => n.categoria === id))
      .map(([id, c]) => ({ id, label: c.label })),
  ]

  const lista = activa === 'todas' ? noticiasOrdenadas : noticiasOrdenadas.filter((n) => n.categoria === activa)
  const [primera, ...resto] = lista

  return (
    <div className="min-h-screen">
      <Seo titulo="Noticias" descripcion="Novedades, comunicados y convocatorias de la Escuela Secundaria N.° 7." />
      <PageHeader
        migas={[{ label: 'Noticias' }]}
        eyebrow="Novedades"
        titulo={
          <>
            Lo que pasa en la{' '}
            <span className="font-serif italic font-normal text-brand-crimson">N.° 7</span>.
          </>
        }
        intro="Comunicados, convocatorias y novedades de nuestra comunidad escolar."
      >
        {opciones.length > 2 && (
          <Filtros
            opciones={opciones}
            activo={activa}
            onCambiar={(id) => setSearchParams(id === 'todas' ? {} : { categoria: id })}
          />
        )}
      </PageHeader>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {lista.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            Todavía no hay noticias en esta categoría.
          </p>
        ) : (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
              <NoticiaCard noticia={primera} grande />
            </div>
            {resto.map((n, i) => (
              <NoticiaCard key={n.slug} noticia={n} delay={i * 80} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
