import { fotos } from './fotos.js'

// Captions stay generic on purpose: only the category is shown, never a description of the photo.
export const categoriasGaleria = {
  Escuela: { label: 'Escuela Secundaria N.° 7', tag: 'bg-brand-navy' },
  Deporte: { label: 'Deporte', tag: 'bg-amber-600' },
  Charlas: { label: 'Charlas', tag: 'bg-brand-crimson' },
  Convivencia: { label: 'Convivencia', tag: 'bg-emerald-600' },
}

export const galeria = [
  { id: 1, cat: 'Escuela', img: fotos.fachadaManana },
  { id: 2, cat: 'Deporte', img: fotos.deporte },
  { id: 3, cat: 'Charlas', img: fotos.charla1 },
  { id: 4, cat: 'Deporte', img: fotos.voley1 },
  { id: 5, cat: 'Escuela', img: fotos.entrada },
  { id: 6, cat: 'Convivencia', img: fotos.picnic },
  { id: 7, cat: 'Convivencia', img: fotos.alumnos },
  { id: 8, cat: 'Charlas', img: fotos.charla2 },
  { id: 9, cat: 'Deporte', img: fotos.voley2 },
  { id: 10, cat: 'Escuela', img: fotos.pasillo },
  { id: 11, cat: 'Escuela', img: fotos.interior },
].map((g) => ({ ...g, label: categoriasGaleria[g.cat].label }))
