// Every photo lives in /public; this keeps the file names in one place.
const pub = (name) => encodeURI(`/${name}`)

export const fotos = {
  logo: pub('logo-escuela7-web.png'),
  fachadaManana: pub('Imagen escuela vacia 2 Fachada mañana.webp'),
  fachadaTarde: pub('Imagen escuela vacia 2 Fachada tarde.webp'),
  fachadaNoche: pub('Imagen escuela vacia 2 Fachada noche.webp'),
  entrada: pub('Entrada principal.webp'),
  interior: pub('Imagen escuela vacia 1 copada.webp'),
  pasillo: pub('Pasillo vacio.webp'),
  deporte: pub('jornada deporte.webp'),
  voley1: pub('voley deporte.webp'),
  voley2: pub('voley deporte 2.webp'),
  charla1: pub('charla alimentacion sentados.webp'),
  charla2: pub('charla alimentacion sentados 2.webp'),
  picnic: pub('chicos de picnic.webp'),
  alumnos: pub('alumnos sentados, vertical.webp'),
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
