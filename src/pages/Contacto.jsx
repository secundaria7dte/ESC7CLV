import { Link } from 'react-router-dom'
import { fotos } from '../data/fotos.js'
import { institucion, preinscripcion } from '../data/institucion.js'
import { Arrow } from '../components/Icons.jsx'
import Seo from '../components/Seo.jsx'

// Only confirmed channels are listed; empty fields in institucion.js are skipped.
const datosContacto = [
  {
    tipo: 'ubicacion',
    label: 'Dónde estamos',
    valor: [institucion.direccion, institucion.localidad].filter(Boolean).join(', ') || null,
    href: institucion.direccion
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${institucion.direccion}, ${institucion.localidad}`,
        )}`
      : null,
  },
  {
    tipo: 'horario',
    label: 'Horario de atención',
    valor: institucion.horarioAtencion,
    detalle: 'Atención presencial en el establecimiento',
  },
  {
    tipo: 'telefono',
    label: 'Teléfono',
    valor: institucion.telefono || null,
    href: institucion.telefonoLink ? `tel:${institucion.telefonoLink}` : null,
  },
  {
    tipo: 'email',
    label: 'Correo electrónico',
    valor: institucion.email || null,
    href: institucion.email ? `mailto:${institucion.email}` : null,
  },
].filter((c) => c.valor)

function IconoContacto({ tipo }) {
  const common = { className: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: '1.9' }
  switch (tipo) {
    case 'ubicacion':
      return (
        <svg {...common}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    case 'horario':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    case 'telefono':
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      )
  }
}

export default function Contacto() {
  return (
    <div className="min-h-screen">
      <Seo
        titulo="Contacto"
        descripcion={`Dirección, teléfono y horario de atención de la ${institucion.nombreCompleto}, ${institucion.localidad}.`}
      />
      <section className="relative isolate overflow-hidden bg-brand-navy text-white">
        <img
          src={fotos.fachadaTarde}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-royal/50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 sm:pt-20 sm:pb-24 animate-fade-up">
          <span className="eyebrow eyebrow-light">Contacto</span>
          <h1 className="mt-3 text-[34px] sm:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.05]">
            Estamos para{' '}
            <span className="font-serif italic font-normal text-[#FF8A7A]">ayudarte</span>.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
            Si tenés dudas sobre la preinscripción, los requisitos o cualquier otra inquietud, acercate a nuestro
            establecimiento. Te acompañamos en todo el proceso.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            {datosContacto.map((c, i) => (
              <div
                key={c.tipo}
                style={{ '--reveal-delay': `${i * 90}ms` }}
                className="reveal bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4 hover:border-brand-royal hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-sky text-brand-royal flex items-center justify-center flex-none">
                  <IconoContacto tipo={c.tipo} />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">{c.label}</span>
                  <p className="text-lg font-bold text-brand-navy mt-0.5">
                    {c.href ? (
                      <a
                        href={c.href}
                        {...(c.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                        className="hover:text-brand-royal underline-offset-4 hover:underline"
                      >
                        {c.valor}
                      </a>
                    ) : (
                      c.valor
                    )}
                  </p>
                  {c.detalle && <p className="text-sm text-slate-500 mt-0.5">{c.detalle}</p>}
                </div>
              </div>
            ))}

            <div className="reveal rounded-2xl bg-white border border-slate-200 p-5 flex items-center gap-4">
              <img src={fotos.logo} alt="Escudo de la escuela" className="h-14 w-auto flex-none" />
              <div>
                <p className="font-extrabold text-brand-navy leading-tight">{institucion.nombre}</p>
                <p className="text-sm text-slate-500">&ldquo;{institucion.patrono}&rdquo;</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="reveal relative overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-crimson to-[#B8213F] p-6 sm:p-10 text-white h-full flex flex-col justify-between gap-8">
              <div className="pointer-events-none absolute inset-0 dot-grid opacity-10" />
              <div className="relative space-y-4">
                <span className="inline-block rounded-full bg-white/15 border border-white/25 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Preinscripción {preinscripcion.cicloLectivo}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                  ¿Venís por la preinscripción a 1.° año?
                </h2>
                <p className="text-white/85 leading-relaxed max-w-lg">
                  Antes de acercarte, revisá el checklist de documentación: para avanzar con el trámite es indispensable
                  presentarla completa. Te esperamos de {preinscripcion.horario}, hasta el {preinscripcion.fechaLimiteTexto}.
                </p>
              </div>
              <div className="relative flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <Link
                  to="/preinscripcion"
                  className="btn-shine group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-bold text-brand-crimson hover:bg-slate-50 transition-colors"
                >
                  Ver toda la información
                  <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/preinscripcion#documentacion"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/40 px-6 py-3.5 font-semibold hover:bg-white/10 transition-colors"
                >
                  Checklist de documentos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
