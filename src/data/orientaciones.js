import { fotos } from './fotos.js'

// One tile per orientación for the home grid: a single reference photo and its colour.
// Colours come from the 2026 graduating-class flags; Educación Física still uses a placeholder photo.
// `nombre` must match the strings in `materias` below, so the tile can list the turnos that offer it.
export const orientacionesGrid = [
  { nombre: 'Ciencias Sociales y Humanidades', corto: 'Humanidades', color: '#1f5a5c', img: fotos.banderaHumanidades },
  { nombre: 'Ciencias Naturales', corto: 'Naturales', color: '#e0177a', img: fotos.banderaNaturales },
  { nombre: 'Economía y Administración', corto: 'Economía y Adm.', color: '#c4583c', img: fotos.banderaEconomia },
  { nombre: 'Programación y Robótica', corto: 'Robótica', color: '#0ea5e9', img: fotos.robotica },
  { nombre: 'Educación Física', corto: 'Ed. Física', color: '#f97316', img: fotos.voley1 },
]

// Official offer as published by the school for the 2027 school year.
export const orientaciones = [
  {
    id: 'manana',
    turno: 'Turno Mañana',
    title: 'Ciclo Orientado',
    schedule: '4.° a 6.° año',
    img: fotos.fachadaManana,
    accent: 'from-amber-400 to-orange-500',
    materias: [
      'Ciencias Sociales y Humanidades',
      'Economía y Administración',
      'Ciencias Naturales',
      'Programación y Robótica',
    ],
    destacada: 'Programación y Robótica',
  },
  {
    id: 'tarde',
    turno: 'Turno Tarde',
    title: 'Ciclo Orientado',
    schedule: '4.° a 6.° año',
    img: fotos.fachadaTarde,
    accent: 'from-rose-400 to-brand-crimson',
    materias: ['Economía y Administración', 'Educación Física'],
    destacada: 'Educación Física',
  },
  {
    id: 'noche',
    turno: 'Turno Noche',
    title: 'ESJA',
    schedule: 'Educación Secundaria de Jóvenes y Adultos',
    img: fotos.fachadaNoche,
    accent: 'from-indigo-400 to-brand-royal',
    materias: ['Ciencias Sociales y Humanidades', 'Ciencias Naturales'],
  },
]
