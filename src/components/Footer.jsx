import { Link } from 'react-router-dom'
import { fotos } from '../data/fotos.js'
import { institucion, preinscripcion, preinscripcionAbierta } from '../data/institucion.js'
import { secciones } from '../data/navegacion.js'
import { Icono } from './Icons.jsx'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="relative bg-brand-navy text-slate-300 border-t-4 border-brand-crimson">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-14">
        <div className="grid grid-cols-2 lg:grid-cols-10 gap-x-6 gap-y-10">
          {/* Identidad institucional */}
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-white p-1">
                <img src={fotos.logo} alt="" className="h-full w-full object-contain" />
              </div>
              <div>
                <span className="block text-base font-extrabold tracking-tight text-white leading-none">
                  {institucion.nombre}
                </span>
                <span className="block text-xs font-medium text-slate-400 mt-1">&ldquo;{institucion.patrono}&rdquo;</span>
              </div>
            </Link>

            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Icono nombre="ubicacion" className="w-4 h-4 mt-0.5 flex-none text-brand-crimson" />
                <span>{[institucion.direccion, institucion.localidad].filter(Boolean).join(', ')}</span>
              </li>
              <li className="flex items-start gap-2.5 font-mono text-xs text-slate-300">
                <Icono nombre="reloj" className="w-4 h-4 flex-none text-brand-crimson" />
                <span>Atención {institucion.horarioAtencion}</span>
              </li>
              {institucion.telefono && (
                <li className="flex items-start gap-2.5 font-mono text-xs text-slate-300">
                  <Icono nombre="contacto" className="w-4 h-4 flex-none text-brand-crimson" />
                  <a href={`tel:${institucion.telefonoLink}`} className="hover:text-white transition-colors">
                    {institucion.telefono}
                  </a>
                </li>
              )}
              {institucion.email && (
                <li className="flex items-start gap-2.5">
                  <Icono nombre="noticias" className="w-4 h-4 flex-none text-brand-crimson" />
                  <a href={`mailto:${institucion.email}`} className="hover:text-white transition-colors">
                    {institucion.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Mapa del sitio */}
          {secciones.map((s) => (
            <div key={s.id} className="lg:col-span-2 space-y-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">{s.titulo}</h2>
              <ul className="space-y-2.5 text-sm">
                {s.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center text-xs font-mono text-slate-500">
          <span>&copy; {currentYear} {institucion.nombreCompleto}</span>
          {preinscripcionAbierta() && (
            <Link to="/preinscripcion" className="hover:text-white transition-colors">
              Preinscripción {preinscripcion.cicloLectivo} →
            </Link>
          )}
        </div>
      </div>
    </footer>
  )
}
