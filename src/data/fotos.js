// Every photo lives in /public/img; this keeps the file names in one place.
// Keep file names lowercase, without spaces or accents (e.g. 'acto-25-de-mayo.webp').
const img = (name) => `/img/${name}`

export const fotos = {
  logo: '/logo-escuela7-web.png',
  fachadaManana: img('fachada-manana.webp'),
  fachadaTarde: img('fachada-tarde.webp'),
  fachadaNoche: img('fachada-noche.webp'),
  entrada: img('entrada-principal.webp'),
  interior: img('interior.webp'),
  pasillo: img('pasillo.webp'),
  deporte: img('jornada-deporte.webp'),
  voley1: img('voley-1.webp'),
  voley2: img('voley-2.webp'),
  charla1: img('charla-alimentacion-1.webp'),
  charla2: img('charla-alimentacion-2.webp'),
  picnic: img('picnic.webp'),
  alumnos: img('alumnos.webp'),
}

/**
 * Facade photo for the current time of day, following the school's shifts:
 * mañana until 12:59, tarde until 18:29, noche the rest.
 */
export function fachadaSegunHora(date = new Date()) {
  const minutes = date.getHours() * 60 + date.getMinutes()
  if (minutes >= 6 * 60 && minutes < 13 * 60) return { turno: 'manana', img: fotos.fachadaManana }
  if (minutes >= 13 * 60 && minutes < 18 * 60 + 30) return { turno: 'tarde', img: fotos.fachadaTarde }
  return { turno: 'noche', img: fotos.fachadaNoche }
}
