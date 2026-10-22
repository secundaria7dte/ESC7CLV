// Date helpers in Argentine Spanish. Dates in /data are local `new Date(y, m, d)`.

const DIA_MS = 24 * 60 * 60 * 1000

export function formatFecha(date, opciones = { day: 'numeric', month: 'long', year: 'numeric' }) {
  return new Intl.DateTimeFormat('es-AR', opciones).format(date)
}

export const formatFechaCorta = (date) => formatFecha(date, { day: 'numeric', month: 'short' })

export const nombreMes = (date) => formatFecha(date, { month: 'long', year: 'numeric' })

/** Midnight of the given day, to compare calendar days regardless of time. */
export function inicioDelDia(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/** Whole days from today until `date` (negative when it already passed). */
export function diasHasta(date, now = new Date()) {
  return Math.round((inicioDelDia(date) - inicioDelDia(now)) / DIA_MS)
}

/** Key such as '2026-10' used to group events by month. */
export const claveMes = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
