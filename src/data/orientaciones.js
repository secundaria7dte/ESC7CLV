import { fotos } from './fotos.js'

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
