// Current exam-board call ("Mesa de Examen"). Update this object each time the
// school publishes a new one; the banner and /mesas page follow its dates.
// Set it to null when there is no call to show.

export const mesaActual = {
  titulo: 'Mesa de Examen',
  periodo: 'Noviembre 2026',
  destinatarios:
    'Estudiantes que hayan finalizado el Nivel Secundario con espacios curriculares pendientes de aprobación, según normativa vigente.',
  inscripcion: {
    desde: new Date(2026, 9, 19),
    hasta: new Date(2026, 9, 28, 23, 59),
    desdeTexto: 'lunes 19 de octubre',
    hastaTexto: 'miércoles 28 de octubre',
    lugar: 'Secretaría de la Institución',
    horarios: [
      { turno: 'Mañana', texto: '09:00 a 11:00 hs' },
      { turno: 'Tarde', texto: '15:00 a 17:00 hs' },
      { turno: 'Noche', texto: '19:00 a 21:00 hs' },
    ],
  },
  examenes: {
    desde: new Date(2026, 10, 24),
    hasta: new Date(2026, 10, 27, 23, 59),
    texto: 'del 24 al 27 de noviembre',
  },
  // Original flyer in /public, offered for download. '' hides the button.
  afiche: 'afiche-mesas-noviembre-2026.webp',
}

/**
 * Where the call stands today:
 * 'proxima' (registration not open yet), 'inscripcion' (registration open),
 * 'cerrada' (registration closed, exams pending), 'finalizada' or null (no call).
 */
export function estadoMesa(mesa = mesaActual, now = new Date()) {
  if (!mesa) return null
  if (now < mesa.inscripcion.desde) return 'proxima'
  if (now <= mesa.inscripcion.hasta) return 'inscripcion'
  if (now <= mesa.examenes.hasta) return 'cerrada'
  return 'finalizada'
}

export const etiquetaEstado = {
  proxima: 'Inscripción próximamente',
  inscripcion: 'Inscripción abierta',
  cerrada: 'Inscripción cerrada',
  finalizada: 'Mesa finalizada',
}
