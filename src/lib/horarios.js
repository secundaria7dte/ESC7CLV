// Timetable logic for the classroom map.
//
// Input: the `bloques` list exported by the scheduling app (public/horarios.json):
//   { dia: 1-5 (lunes=1), desde: 'HH:MM', hasta: 'HH:MM', aula: <id in plano.js>,
//     curso, materia, docente }

export const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
const ABREV = { dom: 0, lun: 1, mar: 2, mie: 3, jue: 4, vie: 5, sab: 6 }

export const turnos = {
  manana: { label: 'Mañana', relleno: 'fill-amber-100 stroke-amber-400', punto: 'bg-amber-400', color: '#FBBF24' },
  tarde: { label: 'Tarde', relleno: 'fill-rose-100 stroke-rose-400', punto: 'bg-rose-400', color: '#FB7185' },
  noche: { label: 'Noche', relleno: 'fill-indigo-100 stroke-indigo-400', punto: 'bg-indigo-400', color: '#818CF8' },
}

export function aMinutos(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function turnoDe(bloque) {
  const m = aMinutos(bloque.desde)
  return m < 13 * 60 ? 'manana' : m < 18 * 60 ? 'tarde' : 'noche'
}

export function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[.º°]/g, '')
    .trim()
}

/**
 * Testing aid: `?hora=lun-09:15` pretends it is Monday 09:15, so the map can be
 * checked outside school hours. Anything unparseable falls back to the real clock.
 */
export function fechaSimulada(param, base = new Date()) {
  const m = /^(dom|lun|mar|mie|jue|vie|sab)-(\d{1,2}):(\d{2})$/.exec(param ?? '')
  if (!m) return base
  const f = new Date(base)
  f.setDate(f.getDate() + ((ABREV[m[1]] - f.getDay() + 7) % 7))
  f.setHours(Number(m[2]), Number(m[3]), 0, 0)
  return f
}

/**
 * What is happening in every room at `fecha`.
 * @returns {{ ahora, siguiente, hoy, restantes }}
 *   `ahora`: block running now per room · `siguiente`: next block per room ·
 *   `hoy`: all of today's blocks · `restantes`: today's blocks not finished yet
 */
export function estadoAulas(bloques, fecha) {
  const dia = fecha.getDay()
  const minuto = fecha.getHours() * 60 + fecha.getMinutes()
  const hoy = bloques
    .filter((b) => b.dia === dia)
    .sort((a, b) => aMinutos(a.desde) - aMinutos(b.desde))

  const ahora = {}
  const siguiente = {}
  for (const b of hoy) {
    const desde = aMinutos(b.desde)
    const hasta = aMinutos(b.hasta)
    if (desde <= minuto && minuto < hasta) ahora[b.aula] = b
    else if (desde > minuto && !siguiente[b.aula]) siguiente[b.aula] = b
  }
  const restantes = hoy.filter((b) => aMinutos(b.hasta) > minuto)
  return { ahora, siguiente, hoy, restantes }
}

/**
 * Search by room name, course, subject or teacher. For each course it points to
 * where the course is right now, or where it will be next today.
 */
export function buscar(consulta, salas, estado) {
  const q = normalizar(consulta)
  if (q.length < 1) return []
  const resultados = []

  for (const s of salas) {
    if (normalizar(s.nombre).includes(q)) resultados.push({ clave: `sala-${s.id}`, aulaId: s.id, titulo: s.nombre, detalle: s.piso === 0 ? 'Planta baja' : 'Planta alta' })
  }

  const vistos = new Set()
  for (const b of estado.restantes) {
    if (vistos.has(b.curso)) continue
    if (!normalizar(`${b.curso} ${b.materia ?? ''} ${b.docente ?? ''}`).includes(q)) continue
    vistos.add(b.curso)
    const enCurso = estado.ahora[b.aula] === b
    const sala = salas.find((x) => x.id === b.aula)
    resultados.push({
      clave: `curso-${b.curso}`,
      aulaId: b.aula,
      titulo: b.curso,
      detalle: `${enCurso ? 'Ahora' : `Desde las ${b.desde}`} · ${sala?.nombre ?? b.aula}${b.materia ? ` · ${b.materia}` : ''}`,
    })
  }
  return resultados.slice(0, 6)
}
