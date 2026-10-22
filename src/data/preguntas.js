import { institucion, preinscripcion, totalDocumentos } from './institucion.js'
import { orientaciones } from './orientaciones.js'
import { mesaActual } from './mesas.js'

// Frequently asked questions, grouped by topic. Answers are built from the
// data files so they stay in sync. `enlace` adds a "read more" link.

const listaOrientaciones = orientaciones
  .map((o) => `${o.turno} (${o.title}): ${o.materias.join(', ')}.`)

export const preguntas = [
  {
    id: 'preinscripcion',
    titulo: 'Preinscripción',
    items: [
      {
        pregunta: `¿Hasta cuándo puedo preinscribirme a ${preinscripcion.anio}?`,
        respuesta: [
          `La documentación se presenta en la escuela hasta el ${preinscripcion.fechaLimiteTexto}, de ${preinscripcion.horario}. Te recomendamos no dejarlo para el último día.`,
        ],
        enlace: { to: '/preinscripcion', label: 'Ver la preinscripción' },
      },
      {
        pregunta: '¿Qué documentación tengo que llevar?',
        respuesta: [
          `Son ${totalDocumentos} elementos entre documentación personal, escolar, materiales para el legajo (carpeta y cuaderno de comunicación color verde) y planillas institucionales firmadas. Es indispensable presentarla completa para avanzar con el trámite.`,
        ],
        enlace: { to: '/preinscripcion#documentacion', label: 'Ver el checklist completo' },
      },
      preinscripcion.formUrl && {
        pregunta: '¿Puedo completar algo en línea?',
        respuesta: [
          'Sí: hay un formulario en línea para adelantar tus datos. Igualmente tenés que acercarte a la escuela con la documentación completa.',
        ],
        enlace: { to: '/preinscripcion#formulario', label: 'Ir al formulario' },
      },
    ],
  },
  {
    id: 'propuesta',
    titulo: 'Turnos y orientaciones',
    items: [
      {
        pregunta: '¿Qué orientaciones hay en cada turno?',
        respuesta: [{ lista: listaOrientaciones }],
        enlace: { to: '/orientaciones', label: 'Ver orientaciones y turnos' },
      },
      {
        pregunta: '¿Qué es la ESJA?',
        respuesta: [
          'Es la Educación Secundaria de Jóvenes y Adultos, que se cursa en el turno noche. Está pensada para quienes quieren terminar la secundaria.',
        ],
        enlace: { to: '/orientaciones?turno=noche', label: 'Ver turno noche' },
      },
    ],
  },
  {
    id: 'mesas',
    titulo: 'Mesas de examen',
    items: [
      {
        pregunta: '¿Cómo me inscribo a una mesa de examen?',
        respuesta: [
          mesaActual
            ? `La inscripción es presencial en la ${mesaActual.inscripcion.lugar}, dentro de las fechas de cada convocatoria. La próxima: ${mesaActual.periodo}, con inscripción del ${mesaActual.inscripcion.desdeTexto} al ${mesaActual.inscripcion.hastaTexto}.`
            : 'La inscripción es presencial en la Secretaría de la escuela, dentro de las fechas de cada convocatoria. Las publicamos en Noticias y en el Calendario.',
        ],
        enlace: { to: '/mesas', label: 'Ver mesas de examen' },
      },
    ],
  },
  {
    id: 'escuela',
    titulo: 'Atención y contacto',
    items: [
      {
        pregunta: '¿Dónde queda la escuela y en qué horario atienden?',
        respuesta: [
          `Estamos en ${institucion.direccion}, ${institucion.localidad}. El horario de atención es de ${institucion.horarioAtencion}.`,
        ],
        enlace: { to: '/contacto', label: 'Ver contacto y mapa' },
      },
      institucion.telefono && {
        pregunta: '¿Puedo consultar por teléfono?',
        respuesta: [`Sí, al ${institucion.telefono}, dentro del horario de atención.`],
        enlace: { to: '/contacto', label: 'Ver todos los canales' },
      },
    ],
  },
].map((g) => ({ ...g, items: g.items.filter(Boolean) }))
