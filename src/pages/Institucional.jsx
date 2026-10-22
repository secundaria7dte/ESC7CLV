import { Link } from 'react-router-dom'
import { institucional } from '../data/institucional.js'
import { institucion } from '../data/institucion.js'
import { orientaciones } from '../data/orientaciones.js'
import { fotos } from '../data/fotos.js'
import { Arrow, Icono, TurnoIcon } from '../components/Icons.jsx'
import Seo from '../components/Seo.jsx'

const totalOrientaciones = new Set(orientaciones.flatMap((o) => o.materias)).size

const datos = [
  { valor: orientaciones.length, label: 'Turnos', detalle: 'Mañana, tarde y noche' },
  { valor: totalOrientaciones, label: 'Orientaciones', detalle: 'En el ciclo orientado y la ESJA' },
  { valor: 'ESJA', label: 'Jóvenes y adultos', detalle: 'Secundaria en el turno noche' },
]

const mapaUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${institucion.direccion}, ${institucion.localidad}`,
)}`

function Bloque({ titulo, eyebrow, children }) {
  return (
    <section className="reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-navy">{titulo}</h2>
      <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-slate-700">{children}</div>
    </section>
  )
}

export default function Institucional() {
  const { presentacion, historia, patrono, valores, autoridades } = institucional

  return (
    <div className="min-h-screen">
      <Seo
        titulo="Institucional"
        descripcion={`${institucion.nombreCompleto}, ${institucion.localidad}. ${presentacion}`}
      />

      {/* Portada */}
      <section className="relative isolate overflow-hidden bg-brand-navy text-white">
        <img src={fotos.entrada} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/30 sm:bg-gradient-to-r" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-24 sm:pb-24 animate-fade-up">
          <nav aria-label="Ruta de navegación" className="mb-6 flex items-center gap-1.5 text-[13px] text-slate-300">
            <Link to="/" className="hover:text-white">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-white">Institucional</span>
          </nav>
          <span className="eyebrow eyebrow-light">Quiénes somos</span>
          <h1 className="mt-3 max-w-3xl text-[34px] sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
            {institucion.nombre}{' '}
            <span className="block font-serif italic font-normal text-[#FF8A7A]">&ldquo;{institucion.patrono}&rdquo;</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200 leading-relaxed">{presentacion}</p>
        </div>
      </section>

      {/* En números */}
      <section className="relative z-10 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {datos.map((d, i) => (
            <div
              key={d.label}
              style={{ '--reveal-delay': `${i * 90}ms` }}
              className="reveal rounded-2xl border border-slate-200 bg-white p-3 sm:p-6 text-center sm:text-left shadow-[0_20px_40px_-28px_rgba(10,22,40,0.4)]"
            >
              <span className="block text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-crimson">{d.valor}</span>
              <span className="mt-1 block text-xs sm:text-sm font-bold text-brand-navy">{d.label}</span>
              <span className="mt-0.5 hidden sm:block text-sm text-slate-500">{d.detalle}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20 space-y-14">
        {historia.length > 0 && (
          <Bloque eyebrow="Nuestra historia" titulo="Una escuela con historia en Diamante">
            {historia.map((p) => <p key={p}>{p}</p>)}
          </Bloque>
        )}

        {patrono.length > 0 && (
          <Bloque eyebrow="Nuestro patrono" titulo={institucion.patrono}>
            {patrono.map((p) => <p key={p}>{p}</p>)}
          </Bloque>
        )}

        {valores.length > 0 && (
          <Bloque eyebrow="Proyecto educativo" titulo="Lo que nos guía">
            <div className="grid gap-3 sm:grid-cols-2">
              {valores.map((v) => (
                <div key={v.titulo} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="font-extrabold text-brand-navy">{v.titulo}</h3>
                  <p className="mt-1 text-[15px] text-slate-600">{v.texto}</p>
                </div>
              ))}
            </div>
          </Bloque>
        )}

        {/* Propuesta: siempre visible, sale de orientaciones.js */}
        <Bloque eyebrow="Nuestra propuesta" titulo="Tres turnos, un mismo acompañamiento">
          <div className="space-y-3">
            {orientaciones.map((o) => (
              <Link
                key={o.id}
                to={`/orientaciones?turno=${o.id}`}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 hover:border-brand-navy transition-colors"
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand-sky text-brand-royal">
                  <TurnoIcon id={o.id} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-extrabold text-brand-navy">{o.turno} · {o.title}</span>
                  <span className="block truncate text-sm text-slate-500">{o.materias.join(' · ')}</span>
                </span>
                <Arrow className="w-4 h-4 flex-none text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-navy" />
              </Link>
            ))}
          </div>
        </Bloque>

        {autoridades.length > 0 && (
          <Bloque eyebrow="Equipo directivo" titulo="Autoridades">
            <ul className="grid gap-3 sm:grid-cols-2">
              {autoridades.map((a) => (
                <li key={a.cargo} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">{a.cargo}</span>
                  <span className="mt-1 block font-extrabold text-brand-navy">{a.nombre}</span>
                </li>
              ))}
            </ul>
          </Bloque>
        )}

        {/* Visitanos */}
        <section className="reveal overflow-hidden rounded-3xl bg-brand-navy text-white sm:grid sm:grid-cols-2">
          <img src={fotos.fachadaManana} alt="Fachada de la escuela" loading="lazy" className="aspect-[16/10] w-full object-cover sm:aspect-auto sm:h-full" />
          <div className="p-6 sm:p-8">
            <span className="eyebrow eyebrow-light">Visitanos</span>
            <p className="mt-3 flex items-start gap-2.5 text-lg font-bold">
              <Icono nombre="ubicacion" className="mt-1 w-5 h-5 flex-none text-[#FF8A7A]" />
              {institucion.direccion}, {institucion.localidad}
            </p>
            <p className="mt-2 flex items-center gap-2.5 text-slate-300">
              <Icono nombre="reloj" className="w-5 h-5 flex-none text-[#FF8A7A]" />
              Atención de {institucion.horarioAtencion}
            </p>
            <a
              href={mapaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 font-bold text-brand-navy hover:bg-slate-100 transition-colors"
            >
              Cómo llegar
              <Arrow className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
