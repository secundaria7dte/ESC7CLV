import { preinscripcion } from './institucion.js'
import { mesaActual } from './mesas.js'

// School calendar. Dates tied to the exam call and the pre-registration come
// from their own data files, so they never drift apart. To add a date:
//   { fecha: new Date(2027, 2, 1), titulo: 'Inicio de clases', tipo: 'clases' }
// Use `hasta` for ranges and `enlace` to link to a page with more info.

export const tiposEvento = {
  clases: { label: 'Clases', color: 'bg-emerald-500', suave: 'bg-emerald-50 text-emerald-700' },
  inscripcion: { label: 'Inscripción', color: 'bg-brand-crimson', suave: 'bg-red-50 text-brand-crimson' },
  examen: { label: 'Exámenes', color: 'bg-brand-royal', suave: 'bg-brand-sky text-brand-royal' },
  acto: { label: 'Acto / Evento', color: 'bg-amber-500', suave: 'bg-amber-50 text-amber-700' },
  receso: { label: 'Receso / Feriado', color: 'bg-slate-400', suave: 'bg-slate-100 text-slate-600' },
}

const eventosCargados = [
  // Agregá aquí las fechas confirmadas del calendario escolar.
]

const eventosDerivados = [
  mesaActual && {
    fecha: mesaActual.inscripcion.desde,
    hasta: mesaActual.inscripcion.hasta,
    titulo: `Inscripción a ${mesaActual.titulo}`,
    detalle: `${mesaActual.inscripcion.lugar} · ${mesaActual.inscripcion.horarios.map((h) => h.texto).join(' / ')}`,
    tipo: 'inscripcion',
    enlace: '/mesas',
  },
  mesaActual && {
    fecha: mesaActual.examenes.desde,
    hasta: mesaActual.examenes.hasta,
    titulo: `${mesaActual.titulo} · ${mesaActual.periodo}`,
    tipo: 'examen',
    enlace: '/mesas',
  },
  {
    fecha: preinscripcion.fechaLimite,
    titulo: `Cierre de preinscripción a ${preinscripcion.anio} ${preinscripcion.cicloLectivo}`,
    detalle: `Último día para presentar la documentación, de ${preinscripcion.horario}`,
    tipo: 'inscripcion',
    enlace: '/preinscripcion',
  },
]

export const eventos = [...eventosCargados, ...eventosDerivados]
  .filter(Boolean)
  .sort((a, b) => a.fecha - b.fecha)

/** Events that have not finished yet (ongoing ranges included). */
export function proximosEventos(now = new Date(), cantidad = Infinity) {
  const hoy = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return eventos.filter((e) => (e.hasta ?? e.fecha) >= hoy).slice(0, cantidad)
}
