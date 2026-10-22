import { Link } from 'react-router-dom'
import { preguntas } from '../data/preguntas.js'
import { institucion } from '../data/institucion.js'
import PageHeader from '../components/PageHeader.jsx'
import { Arrow, Chevron, Icono } from '../components/Icons.jsx'
import Seo from '../components/Seo.jsx'

function Respuesta({ bloques }) {
  return bloques.map((b, i) =>
    typeof b === 'string' ? (
      <p key={i}>{b}</p>
    ) : (
      <ul key={i} className="space-y-1.5">
        {b.lista.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-crimson" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  )
}

export default function Preguntas() {
  const grupos = preguntas.filter((g) => g.items.length > 0)

  return (
    <div className="min-h-screen">
      <Seo titulo="Preguntas frecuentes" descripcion="Respuestas rápidas sobre preinscripción, turnos, mesas de examen y atención en la Escuela Secundaria N.° 7." />
      <PageHeader
        migas={[{ label: 'Preguntas frecuentes' }]}
        ancho="max-w-3xl"
        eyebrow="Ayuda"
        titulo={
          <>
            Preguntas{' '}
            <span className="font-serif italic font-normal text-brand-crimson">frecuentes</span>.
          </>
        }
        intro="Lo que más nos consultan, en un solo lugar."
      >
        <div className="-mx-4 mt-7 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar sm:mx-0 sm:flex-wrap sm:px-0">
          {grupos.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="flex-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-brand-navy hover:bg-slate-50"
            >
              {g.titulo}
            </a>
          ))}
        </div>
      </PageHeader>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">
        {grupos.map((g) => (
          <div key={g.id} id={g.id} className="scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-brand-navy">{g.titulo}</h2>
            <div className="mt-3 space-y-2.5">
              {g.items.map((item) => (
                <details
                  key={item.pregunta}
                  className="group rounded-2xl border border-slate-200 bg-white open:border-brand-royal/40 open:shadow-sm transition-colors"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold text-brand-navy [&::-webkit-details-marker]:hidden">
                    <span>{item.pregunta}</span>
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-slate-100 transition-transform group-open:rotate-180 group-open:bg-brand-sky group-open:text-brand-royal">
                      <Chevron className="w-4 h-4" />
                    </span>
                  </summary>
                  <div className="space-y-3 px-5 pb-5 text-[15px] leading-relaxed text-slate-600">
                    <Respuesta bloques={item.respuesta} />
                    {item.enlace && (
                      <Link
                        to={item.enlace.to}
                        className="inline-flex items-center gap-1.5 pt-1 text-sm font-bold text-brand-royal hover:text-brand-navy"
                      >
                        {item.enlace.label}
                        <Arrow className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="reveal rounded-3xl bg-brand-navy p-6 sm:p-8 text-white">
          <h2 className="text-xl sm:text-2xl font-extrabold">¿No encontraste tu respuesta?</h2>
          <p className="mt-2 text-slate-300">
            Acercate a la escuela de {institucion.horarioAtencion} o comunicate con nosotros.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            {institucion.telefono && (
              <a
                href={`tel:${institucion.telefonoLink}`}
                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 font-bold text-brand-navy"
              >
                <Icono nombre="contacto" className="w-4 h-4" strokeWidth={2} />
                Llamar al {institucion.telefono}
              </a>
            )}
            <Link
              to="/contacto"
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/30 px-5 py-3.5 font-semibold hover:bg-white/10"
            >
              Ver contacto
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
