import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader, { Filtros } from '../components/PageHeader.jsx'
import Edificio from '../components/Edificio.jsx'
import Seo from '../components/Seo.jsx'
import { Icono } from '../components/Icons.jsx'
import { plano, salaPorId, salas } from '../data/plano.js'
import { DIAS, buscar, estadoAulas, fechaSimulada, turnoDe, turnos } from '../lib/horarios.js'

const URL_HORARIOS = '/horarios.json'
const REFRESCO_MS = 60_000

const hhmm = (f) => f.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })

/** Loads the timetable export and re-reads it every minute so changes show up without reloading. */
function useHorarios() {
  const [datos, setDatos] = useState({ bloques: [], ejemplo: false, actualizado: null, cargando: true, error: false })

  useEffect(() => {
    let vivo = true
    const cargar = async () => {
      try {
        const r = await fetch(URL_HORARIOS, { cache: 'no-store' })
        if (!r.ok) throw new Error(r.status)
        const j = await r.json()
        if (vivo) setDatos({ bloques: j.bloques ?? [], ejemplo: !!j.ejemplo, actualizado: j.actualizado ?? null, cargando: false, error: false })
      } catch {
        if (vivo) setDatos((d) => ({ ...d, cargando: false, error: true }))
      }
    }
    cargar()
    const t = setInterval(cargar, REFRESCO_MS)
    return () => {
      vivo = false
      clearInterval(t)
    }
  }, [])

  return datos
}

function Detalle({ sala, bloque, siguiente }) {
  const esAula = sala.tipo === 'aula' || sala.tipo === 'lab'
  return (
    <div key={sala.id} className="mapa-panel rounded-2xl border border-slate-200 bg-white p-5">
      <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-crimson">
        {plano.pisos[sala.piso].label}
      </p>
      <h2 className="mt-1 text-2xl font-extrabold text-brand-navy">{sala.nombre}</h2>

      {!esAula && <p className="mt-2 text-slate-600">{sala.detalle}</p>}

      {esAula && (
        <>
          {bloque ? (
            <div className="mt-3 rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <span className={`h-2 w-2 rounded-full ${turnos[turnoDe(bloque)].punto}`} />
                Ahora · hasta las {bloque.hasta}
              </div>
              <p className="mt-1 text-lg font-extrabold text-brand-navy">{bloque.curso}</p>
              {(bloque.materia || bloque.docente) && (
                <p className="text-sm text-slate-600">{[bloque.materia, bloque.docente].filter(Boolean).join(' · ')}</p>
              )}
            </div>
          ) : (
            <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">Libre en este momento</p>
          )}
          {siguiente && (
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-bold text-brand-navy">Después, {siguiente.desde}:</span> {[siguiente.curso, siguiente.materia].filter(Boolean).join(' · ')}
            </p>
          )}
        </>
      )}

      {esAula && Object.keys(sala.habitual ?? {}).length > 0 && (
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-t border-slate-100 pt-3 text-sm">
          {Object.entries(sala.habitual).map(([t, curso]) => (
            <div key={t} className="contents">
              <dt className="flex items-center gap-1.5 font-semibold text-slate-500">
                <span className={`h-2 w-2 rounded-full ${turnos[t].punto}`} />
                {turnos[t].label}
              </dt>
              <dd className="font-bold text-brand-navy">{curso}</dd>
            </div>
          ))}
        </dl>
      )}

      {sala.piso === 1 && (
        <p className="mt-3 text-sm text-slate-500">Entrás por planta baja y subís por la escalera.</p>
      )}
    </div>
  )
}

export default function Mapa() {
  const [params, setParams] = useSearchParams()
  const horarios = useHorarios()
  const simulada = params.get('hora')
  const [reloj, setReloj] = useState(() => new Date())
  const ahoraFecha = useMemo(() => fechaSimulada(simulada, reloj), [simulada, reloj])

  useEffect(() => {
    const t = setInterval(() => setReloj(new Date()), 30_000)
    return () => clearInterval(t)
  }, [])

  const aulaParam = params.get('aula')
  const seleccionada = salaPorId[aulaParam] ? aulaParam : null
  const [piso, setPiso] = useState(salaPorId[aulaParam]?.piso ?? 0)
  const [vista, setVista] = useState('plano')
  const [consulta, setConsulta] = useState('')

  const estado = useMemo(() => estadoAulas(horarios.bloques, ahoraFecha), [horarios.bloques, ahoraFecha])
  const resultados = useMemo(() => buscar(consulta, salas, estado), [consulta, estado])

  const seleccionar = (id) => {
    const siguiente = new URLSearchParams(params)
    if (id === seleccionada) siguiente.delete('aula')
    else siguiente.set('aula', id)
    setParams(siguiente, { replace: true })
    if (id !== seleccionada) setPiso(salaPorId[id].piso)
  }

  const elegirResultado = (r) => {
    const siguiente = new URLSearchParams(params)
    siguiente.set('aula', r.aulaId)
    setParams(siguiente, { replace: true })
    setPiso(salaPorId[r.aulaId].piso)
    setConsulta('')
  }

  const sala = seleccionada ? salaPorId[seleccionada] : null
  const ocupadas = Object.keys(estado.ahora).length
  const hayClases = ocupadas > 0

  return (
    <>
      <Seo
        titulo="Mapa de aulas"
        descripcion="Encontrá tu aula en el plano de la escuela y mirá qué curso y materia hay en cada una en este momento."
      />
      <PageHeader
        migas={[{ label: 'Mapa de aulas' }]}
        eyebrow="En tiempo real"
        titulo="Encontrá tu aula"
        intro="Buscá tu curso, tu materia o un aula y mirá el camino desde la entrada. El mapa muestra qué se cursa en cada aula ahora."
      />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Map */}
          <div className="min-w-0">
            <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Filtros
                  opciones={plano.pisos.map((p) => ({ id: p.id, label: p.label }))}
                  activo={piso}
                  onCambiar={setPiso}
                />
                <button
                  type="button"
                  onClick={() => setVista((v) => (v === 'plano' ? 'edificio' : 'plano'))}
                  aria-pressed={vista === 'edificio'}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-brand-navy aria-pressed:border-brand-royal aria-pressed:text-brand-royal"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                    <path d="m12 3 9 4.5-9 4.5-9-4.5Z" />
                    <path d="m3 12 9 4.5 9-4.5" />
                    <path d="m3 16.5 9 4.5 9-4.5" />
                  </svg>
                  {vista === 'plano' ? 'Ver edificio' : 'Ver plano'}
                </button>
                <p className="mt-7 flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <Icono nombre="reloj" className="h-4 w-4" strokeWidth={2} />
                  <span className="capitalize">{DIAS[ahoraFecha.getDay()]}</span> {hhmm(ahoraFecha)}
                  {simulada && <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[11px] font-bold text-amber-800">simulado</span>}
                </p>
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl bg-brand-surface p-2 sm:p-4">
                <Edificio
                  piso={piso}
                  vista={vista}
                  ahora={estado.ahora}
                  seleccionada={seleccionada}
                  onSeleccionar={seleccionar}
                  onElegirPiso={(id) => {
                    setPiso(id)
                    setVista('plano')
                  }}
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-600">
                {Object.entries(turnos).map(([id, t]) => (
                  <span key={id} className="inline-flex items-center gap-1.5">
                    <span className={`h-2.5 w-2.5 rounded-full ${t.punto}`} />
                    {t.label}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-slate-300 bg-white" />
                  Libre
                </span>
              </div>
            </div>

            <p className="mt-3 px-1 text-xs text-slate-500" role="status">
              {horarios.cargando && 'Cargando horarios…'}
              {horarios.error && 'No pudimos cargar los horarios. Podés explorar el plano igual.'}
              {!horarios.cargando && !horarios.error && (
                <>
                  {hayClases ? `${ocupadas} aulas en uso ahora.` : 'No hay clases en este momento.'}
                  {horarios.ejemplo && ' Los horarios y el plano que se ven son de ejemplo.'}
                </>
              )}
            </p>
          </div>

          {/* Side panel */}
          <aside className="space-y-4">
            <div className="relative">
              <label htmlFor="buscar-aula" className="sr-only">
                Buscar curso, materia o aula
              </label>
              <input
                id="buscar-aula"
                type="search"
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                placeholder="Buscar: 5.º A, Matemática, Aula 3…"
                autoComplete="off"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] shadow-sm outline-none transition focus:border-brand-royal focus:ring-4 focus:ring-brand-royal/10"
              />
              {consulta && (
                <ul className="mapa-panel absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  {resultados.length === 0 && <li className="px-4 py-3 text-sm text-slate-500">Sin resultados para hoy.</li>}
                  {resultados.map((r) => (
                    <li key={r.clave}>
                      <button
                        type="button"
                        onClick={() => elegirResultado(r)}
                        className="block w-full px-4 py-3 text-left transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
                      >
                        <span className="block text-sm font-extrabold text-brand-navy">{r.titulo}</span>
                        <span className="block text-xs text-slate-500">{r.detalle}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {sala ? (
              <Detalle sala={sala} bloque={estado.ahora[sala.id]} siguiente={estado.siguiente[sala.id]} />
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-5 text-sm leading-relaxed text-slate-600">
                <p className="font-extrabold text-brand-navy">Tocá un aula del mapa</p>
                <p className="mt-1">o buscá tu curso arriba. Te marcamos el camino desde la entrada.</p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  )
}
