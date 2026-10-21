import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fotos } from '../data/fotos.js'
import { orientaciones } from '../data/orientaciones.js'
import { preinscripcion, documentacion, totalDocumentos } from '../data/institucion.js'
import Countdown from '../components/Countdown.jsx'
import { Arrow, TurnoIcon } from '../components/Icons.jsx'

const STORAGE_KEY = `esc7-checklist-${preinscripcion.cicloLectivo}`

function cargarChecklist() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

const pasos = [
  { n: '01', t: 'Leé esta información', d: 'Revisá fechas, horarios y propuestas antes de empezar.' },
  { n: '02', t: 'Prepará tu carpeta', d: 'Usá el checklist para no olvidarte de ningún documento.' },
  { n: '03', t: 'Completá el formulario', d: 'Cargá tus datos en el formulario de preinscripción online.' },
  { n: '04', t: 'Acercate a la escuela', d: `Presentá la documentación completa de ${preinscripcion.horario}.` },
]

export default function Preinscripcion() {
  const [checks, setChecks] = useState(cargarChecklist)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checks))
    } catch {
      // Storage unavailable (private mode): the checklist still works for this visit.
    }
  }, [checks])

  const toggle = (key) => setChecks((c) => ({ ...c, [key]: !c[key] }))
  const hechos = Object.values(checks).filter(Boolean).length
  const progreso = Math.round((hechos / totalDocumentos) * 100)
  const formDisponible = Boolean(preinscripcion.formUrl)

  return (
    <div className="bg-[#F8FAFC]">
      {/* ===================================================================== */}
      {/* PORTADA DE LA NOTICIA                                                 */}
      {/* ===================================================================== */}
      <section className="relative isolate overflow-hidden bg-brand-navy text-white">
        <img
          src={fotos.entrada}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40 animate-kenburns"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-navy via-brand-navy/90 to-brand-crimson/60" />
        <div className="pointer-events-none absolute -right-20 top-10 -z-10 h-96 w-96 rounded-full bg-brand-royal/50 blur-[120px] animate-float" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-28 sm:pt-20 sm:pb-36">
          <nav className="mb-8 flex items-center gap-2 text-sm text-slate-300 animate-fade-up">
            <Link to="/" className="hover:text-white">Inicio</Link>
            <span>/</span>
            <span className="text-white font-semibold">Novedades</span>
          </nav>

          <div className="space-y-6 animate-fade-up">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-brand-crimson px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Preinscripción abierta
              </span>
              <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                {preinscripcion.anio} · Ciclo Lectivo {preinscripcion.cicloLectivo}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.04] max-w-4xl">
              ¡Sumate a la Secundaria N.° 7{' '}
              <span className="font-serif italic font-normal text-[#FF8A7A]">&ldquo;Carlos Lorenzo Vergara&rdquo;</span>!
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 max-w-2xl leading-relaxed">
              ¡Estamos listos para recibirte! Ya se encuentran abiertas las <strong className="text-white">Preinscripciones
              para el 1.° Año</strong> del Ciclo Lectivo {preinscripcion.cicloLectivo}. Preparate para dar el siguiente paso en
              tu educación en una comunidad que te acompaña.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#formulario"
                className="btn-shine group inline-flex items-center gap-2 rounded-2xl bg-brand-crimson px-7 py-4 font-bold shadow-[0_14px_34px_-10px_rgba(217,38,50,0.9)] hover:bg-red-600 transition-colors"
              >
                Ir al formulario
                <Arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#documentacion"
                className="inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/25 px-7 py-4 font-semibold backdrop-blur hover:bg-white/20 transition-colors"
              >
                Ver documentación
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* DATOS CLAVE (tarjeta superpuesta)                                     */}
      {/* ===================================================================== */}
      <section className="relative z-10 -mt-16 sm:-mt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal rounded-[28px] bg-white border border-slate-200/80 shadow-[0_30px_80px_-30px_rgba(10,22,40,0.45)] p-6 sm:p-9">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-sky text-brand-royal">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy">Datos clave para tu inscripción</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-gradient-to-br from-brand-crimson to-[#E8452F] p-5 text-white">
              <span className="text-xs font-bold uppercase tracking-wider opacity-90">Fecha límite</span>
              <p className="mt-1 text-2xl font-extrabold leading-tight">Hasta el 20 de febrero de 2027</p>
            </div>
            <div className="rounded-2xl bg-brand-navy p-5 text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Horario de atención</span>
              <p className="mt-1 font-mono text-3xl font-bold">08:00 – 11:00</p>
              <span className="text-sm text-slate-300">hs, en la escuela</span>
            </div>
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tiempo restante</span>
              <div className="mt-2">
                <Countdown target={preinscripcion.fechaLimite} />
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-amber-900">
            <svg className="mt-0.5 h-5 w-5 flex-none text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm leading-relaxed">
              <strong>Aviso importante:</strong> para poder avanzar con tu trámite, es indispensable presentar la
              documentación completa. No dejes el trámite para el último día.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* CÓMO ES EL PROCESO                                                    */}
      {/* ===================================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="reveal mb-8 space-y-2">
          <span className="eyebrow">Paso a paso</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-navy">¿Cómo me preinscribo?</h2>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((p, i) => (
            <li
              key={p.n}
              style={{ '--reveal-delay': `${i * 100}ms` }}
              className="reveal relative rounded-2xl bg-white border border-slate-200 p-5 hover:border-brand-royal hover:shadow-lg transition-all"
            >
              <span className="font-mono text-3xl font-bold text-gradient-brand">{p.n}</span>
              <h3 className="mt-2 font-bold text-brand-navy">{p.t}</h3>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">{p.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ===================================================================== */}
      {/* PROPUESTAS EDUCATIVAS                                                 */}
      {/* ===================================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="reveal mb-8 space-y-2">
          <span className="eyebrow">Nuestras propuestas educativas</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-navy">
            Orientaciones y turnos
          </h2>
          <p className="text-slate-600 max-w-2xl">
            Contamos con diferentes orientaciones y turnos para que elijas el camino que mejor se adapte a tu futuro.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {orientaciones.map((o, i) => {
            const isNight = o.id === 'noche'
            return (
              <div
                key={o.id}
                style={{ '--reveal-delay': `${i * 100}ms` }}
                className={`reveal rounded-2xl p-6 border ${
                  isNight ? 'bg-brand-navy border-brand-navy text-white' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${o.accent} text-white`}>
                    <TurnoIcon id={o.id} />
                  </span>
                  <div>
                    <h3 className="font-extrabold">{o.turno}</h3>
                    <span className={`text-xs font-semibold ${isNight ? 'text-slate-300' : 'text-slate-500'}`}>
                      {isNight ? 'ESJA · Jóvenes y Adultos' : `${o.title} · ${o.schedule}`}
                    </span>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {o.materias.map((m) => (
                    <li key={m} className={`flex items-start gap-2 text-sm ${isNight ? 'text-slate-200' : 'text-slate-700'}`}>
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-crimson" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* CHECKLIST DE DOCUMENTACIÓN                                            */}
      {/* ===================================================================== */}
      <section id="documentacion" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 scroll-mt-24">
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div className="space-y-2">
            <span className="eyebrow">Checklist</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-navy">
              ¿Qué documentación tenés que traer?
            </h2>
            <p className="text-slate-600">Marcá cada ítem a medida que lo vas juntando. Se guarda en este dispositivo.</p>
          </div>
          <div className="w-full sm:w-64 flex-none">
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-semibold text-brand-navy">
                {hechos} de {totalDocumentos}
              </span>
              <span className="font-mono font-bold text-brand-royal">{progreso}%</span>
            </div>
            <div className="mt-2 h-3 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-crimson to-brand-royal transition-all duration-500"
                style={{ width: `${progreso}%` }}
              />
            </div>
          </div>
        </div>

        {progreso === 100 && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900 animate-fade-up">
            <svg className="h-6 w-6 flex-none text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="M22 4L12 14.01l-3-3" />
            </svg>
            <p className="text-sm font-semibold">¡Tenés todo listo! Ya podés acercarte a la escuela a presentar tu carpeta.</p>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {documentacion.map((g, gi) => (
            <div
              key={g.id}
              style={{ '--reveal-delay': `${gi * 80}ms` }}
              className="reveal rounded-2xl bg-white border border-slate-200 p-6"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-crimson">{g.titulo}</h3>
              <ul className="mt-4 space-y-2">
                {g.items.map((item, i) => {
                  const key = `${g.id}-${i}`
                  const ok = Boolean(checks[key])
                  return (
                    <li key={key}>
                      <label
                        className={`flex cursor-pointer items-start gap-3 rounded-xl p-2.5 -mx-2.5 transition-colors ${
                          ok ? 'bg-emerald-50/70' : 'hover:bg-slate-50'
                        }`}
                      >
                        <input type="checkbox" checked={ok} onChange={() => toggle(key)} className="peer sr-only" />
                        <span
                          className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border-2 transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-brand-royal ${
                            ok ? 'bg-emerald-500 border-emerald-500 text-white scale-110' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {ok && (
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5">
                              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        <span className={`text-[15px] leading-snug ${ok ? 'text-slate-500 line-through decoration-emerald-500/60' : 'text-slate-700'}`}>
                          {item.split(/(color verde)/).map((part, pi) =>
                            part === 'color verde' ? (
                              <strong key={pi} className="font-bold text-emerald-700 no-underline">
                                color verde
                              </strong>
                            ) : (
                              part
                            ),
                          )}
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* FORMULARIO + QR                                                       */}
      {/* ===================================================================== */}
      <section id="formulario" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24">
        <div className="reveal relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-navy via-[#14245A] to-brand-royal p-7 sm:p-12 text-white shadow-2xl">
          <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.08]" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-brand-crimson/40 blur-[90px]" />

          <div className="relative grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-brand-crimson animate-pulse" />
                Último paso online
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Completá el formulario de preinscripción
              </h2>
              <p className="text-slate-200 leading-relaxed">
                Una vez que hayas leído toda la información, cargá tus datos en el formulario. Después acercate a la
                escuela con la documentación completa antes del <strong className="text-white">{preinscripcion.fechaLimiteTexto}</strong>.
              </p>

              {formDisponible ? (
                <a
                  href={preinscripcion.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine group inline-flex items-center gap-2 rounded-2xl bg-brand-crimson px-8 py-4 text-base font-bold shadow-[0_14px_34px_-10px_rgba(217,38,50,0.9)] hover:bg-red-600 transition-colors"
                >
                  Abrir formulario
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
                  </svg>
                </a>
              ) : (
                <div className="inline-flex items-center gap-3 rounded-2xl bg-white/10 border border-white/20 px-5 py-4 text-sm font-semibold">
                  <svg className="h-5 w-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  El formulario estará disponible muy pronto.
                </div>
              )}
            </div>

            <div className="md:col-span-5 flex md:justify-end">
              <div className="w-full max-w-[260px] rounded-3xl bg-white p-5 text-center shadow-xl rotate-[-2deg] hover:rotate-0 transition-transform">
                <div className="aspect-square rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center">
                  {preinscripcion.qr ? (
                    <img
                      src={encodeURI(`/${preinscripcion.qr}`)}
                      alt="Código QR del formulario de preinscripción"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="p-6 text-slate-400">
                      <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.4">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <path d="M14 14h3v3h-3zM18 18h3v3h-3zM14 20h2M20 14v2" />
                      </svg>
                      <span className="mt-2 block text-xs font-semibold">QR próximamente</span>
                    </div>
                  )}
                </div>
                <p className="mt-3 text-sm font-bold text-brand-navy">Escaneá con tu celular</p>
                <p className="text-xs text-slate-500">y completá la preinscripción</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dudas */}
        <div className="reveal mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl bg-white border border-slate-200 p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand-sky text-brand-royal">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <div>
              <h3 className="font-bold text-brand-navy">¿Tenés dudas?</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                Si necesitás ampliar esta información, consultar requisitos particulares o resolver cualquier inquietud,
                ¡acercate a nuestro establecimiento! Estamos para ayudarte en todo el proceso.
              </p>
            </div>
          </div>
          <Link
            to="/contacto"
            className="inline-flex flex-none items-center justify-center gap-2 rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-royal transition-colors"
          >
            Cómo contactarnos
            <Arrow />
          </Link>
        </div>
      </section>
    </div>
  )
}
