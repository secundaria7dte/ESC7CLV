import { fotos } from './fotos.js'
import { preinscripcion, documentacion } from './institucion.js'
import { mesaActual } from './mesas.js'

// News and announcements. To publish one, add an object at the top of the list:
//   slug       unique, lowercase, with dashes: it becomes /noticias/<slug>
//   fecha      publication date, new Date(year, month - 1, day)
//   categoria  one of the keys in `categoriasNoticias`
//   resumen    one or two sentences shown on the cards
//   imagen     a photo from fotos.js (optional)
//   cuerpo     paragraphs; a { lista: [...] } item renders a bullet list
//   enlace     optional call to action: { to: '/ruta', label: 'Texto' }
//   destacada  true pins it on the home page

export const categoriasNoticias = {
  institucional: { label: 'Institucional', color: 'bg-brand-navy' },
  inscripciones: { label: 'Inscripciones', color: 'bg-brand-crimson' },
  mesas: { label: 'Mesas de examen', color: 'bg-brand-royal' },
  deporte: { label: 'Deporte', color: 'bg-amber-600' },
  charlas: { label: 'Charlas', color: 'bg-emerald-600' },
}

const noticias = [
  mesaActual && {
    slug: 'mesa-de-examen-noviembre-2026',
    fecha: mesaActual.inscripcion.desde,
    categoria: 'mesas',
    titulo: `Inscripción a ${mesaActual.titulo} · ${mesaActual.periodo}`,
    resumen: `La inscripción se realiza del ${mesaActual.inscripcion.desdeTexto} al ${mesaActual.inscripcion.hastaTexto} en la ${mesaActual.inscripcion.lugar}. Los exámenes se toman ${mesaActual.examenes.texto}.`,
    imagen: fotos.pasillo,
    cuerpo: [
      `La Rectoría convoca a Mesa de Examen a los ${mesaActual.destinatarios.charAt(0).toLowerCase()}${mesaActual.destinatarios.slice(1)}`,
      `La inscripción es presencial en la ${mesaActual.inscripcion.lugar}, del ${mesaActual.inscripcion.desdeTexto} al ${mesaActual.inscripcion.hastaTexto}, en estos horarios:`,
      { lista: mesaActual.inscripcion.horarios.map((h) => `${h.turno}: ${h.texto}`) },
      `Las mesas se desarrollan ${mesaActual.examenes.texto}.`,
    ],
    enlace: { to: '/mesas', label: 'Ver toda la información de la mesa' },
  },
  {
    slug: 'preinscripcion-1-anio-2027',
    fecha: new Date(2026, 9, 21),
    categoria: 'inscripciones',
    titulo: `Abrió la preinscripción a ${preinscripcion.anio} para el Ciclo Lectivo ${preinscripcion.cicloLectivo}`,
    resumen: `Hay tiempo hasta el ${preinscripcion.fechaLimiteTexto} para presentar la documentación completa en la escuela, de ${preinscripcion.horario}.`,
    imagen: fotos.alumnos,
    destacada: true,
    cuerpo: [
      `¡Estamos listos para recibirte! Ya se encuentran abiertas las preinscripciones para el ${preinscripcion.anio} del Ciclo Lectivo ${preinscripcion.cicloLectivo}.`,
      `La fecha límite de presentación es el ${preinscripcion.fechaLimiteTexto} y el horario de atención es de ${preinscripcion.horario}. Para avanzar con el trámite es indispensable presentar la documentación completa:`,
      { lista: documentacion.map((g) => g.titulo) },
      'No dejes el trámite para el último día.',
    ],
    enlace: { to: '/preinscripcion', label: 'Ver requisitos y formulario' },
  },
].filter(Boolean)

export const noticiasOrdenadas = [...noticias].sort((a, b) => b.fecha - a.fecha)

export const buscarNoticia = (slug) => noticiasOrdenadas.find((n) => n.slug === slug)

/** Pinned news first, then the most recent ones. */
export function ultimasNoticias(cantidad = 3) {
  const destacadas = noticiasOrdenadas.filter((n) => n.destacada)
  const resto = noticiasOrdenadas.filter((n) => !n.destacada)
  return [...destacadas, ...resto].slice(0, cantidad)
}
