import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fotos, fachadaSegunHora } from '../data/fotos.js'
import { orientaciones } from '../data/orientaciones.js'
import { preinscripcion, totalDocumentos } from '../data/institucion.js'
import Countdown from '../components/Countdown.jsx'
import { Arrow, TurnoIcon } from '../components/Icons.jsx'

const heroFotos = {
  manana: { img: fotos.fachadaManana, label: 'Turno Mañana' },
  tarde: { img: fotos.fachadaTarde, label: 'Turno Tarde' },
  noche: { img: fotos.fachadaNoche, label: 'Turno Noche · ESJA' },
}
const orden = ['manana', 'tarde', 'noche']


export default function Inicio() {
  const [turno, setTurno] = useState(() => fachadaSegunHora().turno)
  const [pausado, setPausado] = useState(false)

  useEffect(() => {
    if (pausado) return
    const t = setInterval(() => {
      setTurno((prev) => orden[(orden.indexOf(prev) + 1) % orden.length])
    }, 6000)
    return () => clearInterval(t)
  }, [pausado])

  return (
    <>
      {/* ===================================================================== */}
      {/* HERO: foto a sangre con la fachada según el turno                     */}
      {/* ===================================================================== */}
      <section className="relative isolate overflow-hidden bg-brand-navy text-white">
        {orden.map((id) => (
          <img
            key={id}
            src={heroFotos[id].img}
            alt=""
            aria-hidden="true"
            fetchPriority={id === turno ? 'high' : 'auto'}
            className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-[1200ms] ${id === turno ? 'opacity-100 animate-kenburns' : 'opacity-0'
              }`}
          />
        ))}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-28 lg:pb-36">
          <div className="max-w-2xl space-y-7 animate-fade-up">
            <Link
              to="/preinscripcion"
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-slate-200 hover:bg-white/15 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Ciclo Lectivo {preinscripcion.cicloLectivo} · Preinscripciones abiertas →</span>
            </Link>

            <h1 className="text-[42px] sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02]">
              Tu próximo paso
              <br />
              empieza en la{' '}
              <span className="font-serif italic font-normal text-white">N.° 7</span>.
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-xl">
              En la <strong className="text-white">Escuela Secundaria N.° 7 &ldquo;Carlos Lorenzo Vergara&rdquo;</strong>{' '}
              te recibimos en una comunidad que te acompaña, con propuestas en los turnos mañana, tarde y noche.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                to="/preinscripcion"
                className="group inline-flex items-center gap-2 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 px-7 py-4 text-base font-semibold shadow-sm active:scale-[0.98] transition-all"
              >
                Quiero preinscribirme
                <Arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/orientaciones"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900/50 backdrop-blur-md text-white border border-white/20 hover:bg-white/10 px-7 py-4 text-base font-semibold active:scale-[0.98] transition-all"
              >
                Ver orientaciones
              </Link>
            </div>
          </div>

          {/* Selector de turno para la foto */}
          <div className="mt-14 flex flex-wrap gap-2">
            {orden.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setTurno(id)
                  setPausado(true)
                }}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold backdrop-blur-md border transition-all ${id === turno
                    ? 'bg-white text-slate-950 border-white'
                    : 'bg-slate-950/50 text-slate-300 border-white/15 hover:bg-slate-950/70'
                  }`}
              >
                <TurnoIcon id={id} className="w-4 h-4" />
                {heroFotos[id].label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* NOTICIA DESTACADA: tarjeta superpuesta al hero                        */}
      {/* ===================================================================== */}
      <section className="relative z-10 -mt-14 sm:-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="reveal grid overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_-30px_rgba(10,22,40,0.45)] border border-slate-200/80 lg:grid-cols-12">
          <div className="relative lg:col-span-5 min-h-[240px]">
            <img
              src={fotos.interior}
              alt="Estudiantes de la Escuela N.° 7"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-crimson/70 via-brand-crimson/10 to-transparent" />
            <div className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-crimson shadow">
              Novedad
            </div>
            <div className="absolute bottom-5 left-5 text-white">
              <span className="block font-mono text-sm font-semibold opacity-90">Ciclo Lectivo</span>
              <span className="block text-6xl font-extrabold leading-none tracking-tight">
                {preinscripcion.cicloLectivo}
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 p-7 sm:p-10 space-y-6">
            <div className="space-y-3">
              <span className="eyebrow">Preinscripción · {preinscripcion.anio}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-navy leading-tight">
                ¡Sumate a la Secundaria N.° 7! Ya podés preinscribirte para{' '}
                <span className="text-gradient-brand">1.° año</span>.
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Preparate para dar el siguiente paso en tu educación. Acercate a la escuela con la documentación
                completa — no dejes el trámite para el último día.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 sm:items-end">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Cierra el {preinscripcion.fechaLimiteTexto}
                </span>
                <Countdown target={preinscripcion.fechaLimite} />
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-sky text-brand-royal">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  </span>
                  Atención de <strong className="font-semibold text-brand-navy">{preinscripcion.horario}</strong>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-sky text-brand-royal">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </span>
                  <strong className="font-semibold text-brand-navy">{totalDocumentos}</strong>&nbsp;requisitos en el checklist
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                to="/preinscripcion"
                className="btn-shine group inline-flex items-center gap-2 rounded-xl bg-brand-navy px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-royal transition-colors"
              >
                Leer toda la información
                <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/preinscripcion#documentacion"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3.5 text-sm font-semibold text-brand-navy hover:border-brand-navy transition-colors"
              >
                ¿Qué tengo que llevar?
              </Link>
            </div>
          </div>
        </article>
      </section>

      {/* ===================================================================== */}
      {/* PROPUESTAS EDUCATIVAS                                                 */}
      {/* ===================================================================== */}
      <section id="orientaciones" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="eyebrow">Nuestras propuestas educativas</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-navy leading-[1.05]">
              Elegí el camino que{' '}
              <span className="font-serif italic font-normal text-brand-crimson">mejor te queda</span>.
            </h2>
          </div>
          <p className="text-slate-600 max-w-md leading-relaxed">
            Diferentes orientaciones y turnos para que elijas el recorrido que mejor se adapte a tu futuro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {orientaciones.map((o, i) => {
            const isNight = o.id === 'noche'
            return (
              <article
                key={o.id}
                style={{ '--reveal-delay': `${i * 120}ms` }}
                className={`reveal group relative flex flex-col overflow-hidden rounded-[26px] border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(10,22,40,0.35)] ${isNight ? 'bg-brand-navy text-white border-brand-navy' : 'bg-white border-slate-200'
                  }`}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={o.img}
                    alt={`Escuela Secundaria N.° 7, ${o.turno}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${o.accent} opacity-60 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 text-brand-navy shadow-lg">
                    <TurnoIcon id={o.id} />
                  </div>
                  <div className="absolute bottom-4 left-5 text-white">
                    <span className="block text-xs font-bold uppercase tracking-widest opacity-90">{o.turno}</span>
                    <h3 className="text-2xl font-extrabold">{o.title}</h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className={`text-sm font-semibold ${isNight ? 'text-red-300' : 'text-brand-crimson'}`}>
                    {o.schedule}
                  </span>
                  <ul className="mt-4 space-y-2.5 flex-1">
                    {o.materias.map((m) => (
                      <li key={m} className={`flex items-start gap-2.5 text-[15px] ${isNight ? 'text-slate-200' : 'text-slate-700'}`}>
                        <svg className={`mt-0.5 h-5 w-5 flex-none ${isNight ? 'text-red-300' : 'text-brand-royal'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                          <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>
                          {m}
                          {m === 'Programación y Robótica' && (
                            <span className="ml-2 inline-block rounded-full bg-brand-sky px-2 py-0.5 text-[11px] font-bold text-brand-royal align-middle">
                              Tecnología
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/orientaciones?turno=${o.id}`}
                    className={`mt-6 inline-flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${isNight
                        ? 'bg-white/10 hover:bg-brand-crimson'
                        : 'bg-slate-50 border border-slate-200 text-brand-navy group-hover:bg-brand-navy group-hover:text-white group-hover:border-brand-navy'
                      }`}
                  >
                    Ver más
                    <Arrow />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* VIDA ESCOLAR                                                          */}
      {/* ===================================================================== */}
      <section id="vida-escolar" className="relative overflow-hidden py-20 lg:py-24 bg-brand-sky/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div className="space-y-3">
              <span className="eyebrow">Vida escolar</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-navy">
                Momentos de nuestra comunidad
              </h2>
            </div>
            <Link
              to="/vida-escolar"
              className="group inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-crimson transition-colors"
            >
              Ver todas las fotos
              <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[520px]">
            {[
              { img: fotos.voley1, label: 'Escuela Secundaria N.° 7', title: 'Deporte', cls: 'col-span-2 row-span-2 min-h-[280px]' },
              { img: fotos.charla1, label: 'Escuela Secundaria N.° 7', title: 'Charlas', cls: 'col-span-2 min-h-[200px]' },
              { img: fotos.picnic, label: 'Escuela Secundaria N.° 7', title: 'Convivencia', cls: 'min-h-[180px]' },
              { img: fotos.deporte, label: 'Escuela Secundaria N.° 7', title: 'Deporte', cls: 'min-h-[180px]' },
            ].map((f, i) => (
              <Link
                to="/vida-escolar"
                key={i}
                style={{ '--reveal-delay': `${i * 90}ms` }}
                className={`reveal group relative overflow-hidden rounded-3xl bg-slate-900 ${f.cls}`}
              >
                <img
                  src={f.img}
                  alt={f.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider">
                    {f.label}
                  </span>
                  <h3 className="mt-1.5 font-bold leading-snug sm:text-lg">{f.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* CTA FINAL                                                             */}
      {/* ===================================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-crimson via-[#C72A45] to-brand-royal px-7 py-14 sm:px-14 sm:py-16 text-white shadow-2xl">
          <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.12]" />
          <img
            src={fotos.logo}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -bottom-14 h-80 opacity-[0.12] brightness-0 invert rotate-[-8deg]"
          />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
                ¡Estamos listos para recibirte!
              </h2>
              <p className="text-lg text-white/85 max-w-xl leading-relaxed">
                Leé los requisitos, prepará tu carpeta y acercate a la escuela antes del{' '}
                <strong className="text-white">{preinscripcion.fechaLimiteTexto}</strong>.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:items-end xl:justify-end">
              <Link
                to="/preinscripcion"
                className="btn-shine group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-base font-bold text-brand-crimson shadow-lg hover:bg-slate-50 transition-colors"
              >
                Ir a la preinscripción
                <Arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center rounded-2xl border border-white/40 px-7 py-4 text-base font-semibold hover:bg-white/10 transition-colors"
              >
                ¿Tenés dudas?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
