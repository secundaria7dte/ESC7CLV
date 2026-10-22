import { institucion } from '../data/institucion.js'

// Builds an .ics file so families can add a school date to their phone calendar.

const fechaIcs = (d) =>
  `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`

const escapar = (texto = '') => texto.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, '\\n')

export function descargarIcs(evento) {
  const fin = new Date(evento.hasta ?? evento.fecha)
  fin.setDate(fin.getDate() + 1) // all-day events end on the following day (exclusive)

  const contenido = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Escuela Secundaria N 7//Calendario//ES',
    'BEGIN:VEVENT',
    `UID:${fechaIcs(evento.fecha)}-${evento.titulo.length}@esc7`,
    `DTSTAMP:${fechaIcs(new Date())}T000000Z`,
    `DTSTART;VALUE=DATE:${fechaIcs(evento.fecha)}`,
    `DTEND;VALUE=DATE:${fechaIcs(fin)}`,
    `SUMMARY:${escapar(evento.titulo)}`,
    evento.detalle && `DESCRIPTION:${escapar(evento.detalle)}`,
    `LOCATION:${escapar(`${institucion.nombre}, ${institucion.direccion}, ${institucion.localidad}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n')

  const url = URL.createObjectURL(new Blob([contenido], { type: 'text/calendar;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `${evento.titulo.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.ics`
  a.click()
  URL.revokeObjectURL(url)
}
