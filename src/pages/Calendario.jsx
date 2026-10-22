import { useState } from 'react'
import { Link } from 'react-router-dom'
import { eventos, proximosEventos, tiposEvento } from '../data/calendario.js'
import { claveMes, diasHasta, formatFecha, nombreMes } from '../lib/fechas.js'
import { descargarIcs } from '../lib/ics.js'
import PageHeader, { Filtros } from '../components/PageHeader.jsx'
import { Arrow, Icono } from '../components/Icons.jsx'
import Seo from '../components/Seo.jsx'

/** "Hoy", "En curso", "Faltan 5 días"… or null once it is over. */
function cuentaRegresiva(evento) {
  const inicio = diasHasta(evento.fecha)
  const fin = diasHasta(evento.hasta ?? evento.fecha)
  if (fin < 0) return null
  if (inicio <= 0 && fin > 0) return { texto: 'En curso', urgente: true }
  if (inicio === 0) return { texto: 'Hoy', urgente: true }
  if (inicio === 1) return { texto: 'Mañana', urgente: true }
  return { texto: `Faltan ${inicio} días`, urgente: inicio <= 7 }
}

function rango(evento) {
  if (!evento.hasta || diasHasta(evento.hasta, evento.fecha) === 0) return formatFecha(evento.fecha, { weekday: 'long', day: 'numeric', month: 'long' })
  const mismoMes = evento.fecha.getMonth() === evento.hasta.getMonth()
  return mismoMes
    ? `Del ${evento.fecha.getDate()} al ${formatFecha(evento.hasta, { day: 'numeric', month: 'long' })}`
    : `Del ${formatFecha(evento.fecha, { day: 'numeric', month: 'long' })} al ${formatFecha(evento.hasta, { day: 'numeric', month: 'long' })}`
}

function Evento({ evento, delay }) {
  const tipo = tiposEvento[evento.tipo] ?? tiposEvento.acto
  const cuenta = cuentaRegresiva(evento)
  const pasado = !cuenta

  return (
    <li
      style={{ '--reveal-delay': `${delay}ms` }}
      className={`reveal flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 ${pasado ? 'opacity-60' : ''}`}
    >
      <div className="flex w-14 flex-none flex-col items-center justify-center rounded-xl bg-brand-navy py-2 text-white">
        <span className="font-mono text-[11px] font-bold uppercase text-slate-300">
          {formatFecha(evento.fecha, { month: 'short' }).replace('.', '')}
        </span>
        <span className="text-2xl font-extrabold leading-none">{evento.fecha.getDate()}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${tipo.suave}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${tipo.color}`} />
            {tipo.label}
          </span>
          {cuenta && (
            <span className={`text-[11px] font-bold ${cuenta.urgente ? 'text-brand-crimson' : 'text-slate-500'}`}>
              {cuenta.texto}
            </span>
          )}
        </div>
        <h3 className="mt-1.5 font-extrabold text-brand-navy leading-snug">{evento.titulo}</h3>
        <p className="mt-0.5 text-sm text-slate-500 first-letter:uppercase">{rango(evento)}</p>
        {evento.detalle && <p className="mt-1 text-sm text-slate-600">{evento.detalle}</p>}

        <div className="mt-3 flex flex-wrap gap-2">
          {evento.enlace && (
            <Link
              to={evento.enlace}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-brand-navy hover:bg-slate-200 transition-colors"
            >
              Más info
              <Arrow className="w-3.5 h-3.5" />
            </Link>
          )}
          {!pasado && (
            <button
              type="button"
              onClick={() => descargarIcs(evento)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:border-brand-navy hover:text-brand-navy transition-colors"
            >
              <Icono nombre="calendario" className="w-3.5 h-3.5" strokeWidth={2} />
              Agendar
            </button>
          )}
        </div>
      </div>
    </li>
  )
}

export default function Calendario() {
  const [vista, setVista] = useState('proximos')
  const lista = vista === 'proximos' ? proximosEventos() : eventos

  const meses = []
  lista.forEach((e) => {
    const clave = claveMes(e.fecha)
    const grupo = meses.find((m) => m.clave === clave)
    if (grupo) grupo.eventos.push(e)
    else meses.push({ clave, titulo: nombreMes(e.fecha), eventos: [e] })
  })

  return (
    <div className="min-h-screen">
      <Seo titulo="Calendario escolar" descripcion="Fechas importantes: inscripciones, mesas de examen y actividades de la Escuela Secundaria N.° 7." />
      <PageHeader
        migas={[{ label: 'Calendario' }]}
        eyebrow="Calendario escolar"
        titulo={
          <>
            Fechas que{' '}
            <span className="font-serif italic font-normal text-brand-crimson">no te podés perder</span>.
          </>
        }
        intro="Inscripciones, mesas de examen y actividades del ciclo lectivo. Tocá «Agendar» para sumarlas al calendario de tu celular."
      >
        <Filtros
          opciones={[
            { id: 'proximos', label: 'Próximas fechas' },
            { id: 'todos', label: 'Todo el ciclo' },
          ]}
          activo={vista}
          onCambiar={setVista}
        />
      </PageHeader>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {meses.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            No hay fechas próximas cargadas por el momento.
          </p>
        ) : (
          <div className="space-y-10">
            {meses.map((m) => (
              <div key={m.clave}>
                <h2 className="sticky top-16 lg:top-20 z-10 -mx-4 bg-brand-surface/95 px-4 py-2 backdrop-blur text-sm font-extrabold uppercase tracking-wider text-brand-navy first-letter:uppercase sm:mx-0 sm:px-0">
                  {m.titulo}
                </h2>
                <ol className="mt-3 space-y-3">
                  {m.eventos.map((e, i) => (
                    <Evento key={`${e.titulo}-${e.fecha}`} evento={e} delay={i * 70} />
                  ))}
                </ol>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-5">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Referencias</span>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
            {Object.values(tiposEvento).map((t) => (
              <li key={t.label} className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${t.color}`} />
                {t.label}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
