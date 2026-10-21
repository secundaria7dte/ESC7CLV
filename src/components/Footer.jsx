import { Link } from 'react-router-dom'
import { fotos } from '../data/fotos.js'
import { institucion, preinscripcion } from '../data/institucion.js'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="relative bg-brand-navy text-slate-300 border-t-4 border-brand-crimson">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Identidad Institucional */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-white border border-slate-700 shadow-sm p-1 overflow-hidden">
                <img
                  src={fotos.logo}
                  alt="Escudo oficial Escuela Secundaria N.° 7"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="block text-base font-extrabold tracking-tight text-white leading-none">
                  Escuela Secundaria N.° 7
                </span>
                <span className="block text-xs font-medium text-slate-400 mt-1">
                  &ldquo;Carlos Lorenzo Vergara&rdquo;
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Una comunidad que te acompaña. Propuestas educativas en los turnos mañana, tarde y noche (ESJA).
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
              <span>Preinscripción {preinscripcion.cicloLectivo} abierta · 1.° Año</span>
            </div>
          </div>

          {/* Navegación */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
              </li>
              <li>
                <Link to="/orientaciones" className="hover:text-white transition-colors">Orientaciones y Turnos</Link>
              </li>
              <li>
                <Link to="/vida-escolar" className="hover:text-white transition-colors">Vida Escolar</Link>
              </li>
              <li>
                <Link to="/preinscripcion" className="hover:text-brand-crimson text-white font-medium transition-colors">
                  Preinscripción
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link>
              </li>
            </ul>
          </div>

          {/* Información y Contacto */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Atención</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-brand-crimson mt-0.5 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  {[institucion.direccion, institucion.localidad].filter(Boolean).join(', ') ||
                    'Atención presencial en el establecimiento'}
                </span>
              </li>
              <li className="flex items-start gap-2.5 font-mono text-xs text-slate-300">
                <svg className="w-4 h-4 text-brand-crimson mt-0.5 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{institucion.horarioAtencion}</span>
              </li>
              {institucion.telefono && (
                <li className="flex items-start gap-2.5 font-mono text-xs text-slate-300">
                  <svg className="w-4 h-4 text-brand-crimson mt-0.5 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a href={`tel:${institucion.telefonoLink}`} className="hover:text-white transition-colors">
                    {institucion.telefono}
                  </a>
                </li>
              )}
              {institucion.email && (
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-brand-crimson mt-0.5 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>{institucion.email}</span>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Barra inferior de derechos y créditos */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <span>&copy; {currentYear} Escuela Secundaria N.° 7 &ldquo;Carlos Lorenzo Vergara&rdquo;. Todos los derechos reservados.</span>
          <Link to="/preinscripcion" className="hover:text-white transition-colors">Preinscripción {preinscripcion.cicloLectivo} →</Link>
        </div>
      </div>
    </footer>
  )
}
