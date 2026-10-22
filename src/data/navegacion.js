// Site map shared by the header, the mobile menu, the bottom bar and the footer.
// Add a page here once and it shows up everywhere.

export const secciones = [
  {
    id: 'escuela',
    titulo: 'La escuela',
    links: [
      { to: '/institucional', label: 'Institucional', detalle: 'Quiénes somos y nuestra identidad' },
      { to: '/orientaciones', label: 'Orientaciones y turnos', detalle: 'Mañana, tarde y noche (ESJA)' },
      { to: '/vida-escolar', label: 'Vida escolar', detalle: 'Galería de nuestra comunidad' },
    ],
  },
  {
    id: 'informacion',
    titulo: 'Información',
    links: [
      { to: '/noticias', label: 'Noticias', detalle: 'Novedades y comunicados' },
      { to: '/calendario', label: 'Calendario', detalle: 'Fechas importantes del ciclo' },
      { to: '/mesas', label: 'Mesas de examen', detalle: 'Inscripción y fechas' },
      { to: '/preguntas-frecuentes', label: 'Preguntas frecuentes', detalle: 'Respuestas rápidas' },
    ],
  },
  {
    id: 'tramites',
    titulo: 'Trámites',
    links: [
      { to: '/preinscripcion', label: 'Preinscripción 2027', detalle: '1.° año · Requisitos y formulario' },
      { to: '/contacto', label: 'Contacto', detalle: 'Teléfono, dirección y horarios' },
    ],
  },
]

// Tabs of the bottom bar on phones. The last slot always opens the full menu.
export const barraInferior = [
  { to: '/', label: 'Inicio', icono: 'inicio' },
  { to: '/noticias', label: 'Noticias', icono: 'noticias' },
  { to: '/calendario', label: 'Calendario', icono: 'calendario' },
  { to: '/contacto', label: 'Contacto', icono: 'contacto' },
]
