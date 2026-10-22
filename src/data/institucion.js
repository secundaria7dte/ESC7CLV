// Single source of truth for institutional data. Only confirmed information
// lives here: anything left empty ('' / null) is simply not rendered.

export const institucion = {
  nombre: 'Escuela Secundaria N.° 7',
  nombreCompleto: 'Escuela Secundaria N.° 7 "Carlos Lorenzo Vergara"',
  patrono: 'Carlos Lorenzo Vergara',
  direccion: 'Urquiza y Sarmiento',
  localidad: 'Diamante, Entre Ríos',
  telefono: '498-3863',
  // Full international number for tel: links (Diamante area code 0343).
  telefonoLink: '+543434983863',
  // Pending confirmation: fill in to show it on the site.
  email: '',
  horarioAtencion: '08:00 a 11:00 hs',
}

export const preinscripcion = {
  cicloLectivo: 2027,
  anio: '1.° Año',
  fechaLimite: new Date(2027, 1, 20, 23, 59), // 20 de febrero de 2027
  fechaLimiteTexto: '20 de febrero de 2027',
  horario: '08:00 a 11:00 hs',
  // Paste the Google Form (or similar) link here to enable the button.
  formUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSdAatrmS38EvqEcFWpAqBlc4xlT2wIrnLGSm0YdmvGgHbwoEw/viewform?usp=send_form',
  // Put the QR image in /public and write its name here, e.g. 'qr-preinscripcion.png'.
  qr: 'qr-preinscripcion.png',
}

export const documentacion = [
  {
    id: 'personal',
    titulo: 'Documentación personal',
    items: [
      'Fotocopia del DNI del estudiante (ambos lados).',
      'Constancia de CUIL del estudiante.',
      'Fotocopia del DNI del padre, madre y/o tutor (si el estudiante es menor de edad).',
      'Copia autenticada de la Partida de Nacimiento.',
    ],
  },
  {
    id: 'escolar',
    titulo: 'Documentación escolar',
    items: [
      'Copia autenticada del Certificado de estudios de Nivel Primario.',
      'Boletín de calificaciones autenticado.',
    ],
  },
  {
    id: 'legajo',
    titulo: 'Materiales para el legajo',
    items: [
      'Carpeta de legajo con elástico color verde.',
      'Cuaderno de comunicación color verde, con los datos del estudiante y del adulto responsable en la tapa o primera hoja.',
    ],
  },
  {
    id: 'planillas',
    titulo: 'Planillas institucionales (completas y firmadas)',
    items: [
      'Planilla de autorizaciones.',
      'Acuerdo Escolar de Convivencia (firmado por el estudiante y el adulto responsable).',
      'Planilla de datos.',
    ],
  },
]

export const totalDocumentos = documentacion.reduce((n, g) => n + g.items.length, 0)

/** True while pre-registration is still being received. */
export const preinscripcionAbierta = (now = new Date()) => now <= preinscripcion.fechaLimite
