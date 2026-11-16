// Floor plan of the school used by the classroom map (/mapa).
//
// Transcribed from the school's hand-drawn sketches (Planta baja and Planta alta).
// The sketch only shows the rooms, so these are ASSUMPTIONS to confirm on site:
//   - where the main entrance is (`inicio` of the ground floor),
//   - which side of each room its door is on (`lado`).
// Positions are drawn to the sketch's proportions, not to scale.
//
// Coordinates are SVG units inside a 760 x 560 box. `id` is what the timetable
// export (public/horarios.json) refers to in its `aula` field.
//
// tipo:      'aula' | 'lab' (appear in the timetable) · 'servicio' (informative)
// lado:      side of the room where the door is: 'n' top, 's' bottom, 'w' left
// habitual:  course that usually uses the room, per turno (from the sketch)

export const plano = {
  ancho: 760,
  alto: 560,
  pisos: [
    {
      id: 0,
      label: 'Planta baja',
      // Hallway lines the route walks along.
      corredorY: 440,
      corredorX: 625,
      // U-shaped stairs in front of 2.º D, 2.º F and 1.º C. Entered from the left; `via` is the
      // x of the walkway in front of the door.
      escalera: { x: 500, y: 245, w: 112, h: 156, puerta: { x: 500, y: 323 }, via: 480 },
      inicio: { x: 483, y: 552 }, // main entrance (gap between Secretaría and Sala de Profesores)
    },
    {
      id: 1,
      label: 'Planta alta',
      corredorY: 396,
      corredorX: 605,
      // In front of 4.º Economía and 4.º Robótica. You come out on the same side you went in.
      escalera: { x: 478, y: 311, w: 112, h: 72, puerta: { x: 478, y: 347 }, via: 458 },
    },
  ],
}

const aula = (id, piso, x, y, w, h, lado, habitual) => ({
  id,
  nombre: `Aula ${habitual.manana ?? habitual.tarde ?? habitual.noche}`,
  tipo: 'aula',
  piso,
  x,
  y,
  w,
  h,
  lado,
  habitual,
})

const servicio = (id, nombre, piso, x, y, w, h, lado, detalle) => ({ id, nombre, tipo: 'servicio', piso, x, y, w, h, lado, detalle })

export const salas = [
  // ---- Planta baja: bottom row ----
  aula('pb-1b', 0, 8, 462, 69, 76, 'n', { manana: '1.º B', tarde: '4.º Economía' }),
  aula('pb-5eco', 0, 77, 462, 69, 76, 'n', { manana: '5.º Economía', tarde: '5.º Economía' }),
  servicio('pb-archivo', 'Archivo', 0, 146, 462, 52, 76, 'n', 'Archivo de la escuela'),
  servicio('pb-eot', 'EOT · Sala de Ed. Física', 0, 198, 462, 58, 76, 'n', 'Equipo de Orientación y sala de Educación Física'),
  aula('pb-1a', 0, 256, 462, 56, 76, 'n', { manana: '1.º A', tarde: '6.º Economía' }),
  servicio('pb-rectoria', 'Rectoría', 0, 312, 462, 60, 76, 'n', 'Equipo directivo'),
  servicio('pb-museo', 'Museo', 0, 372, 462, 38, 76, 'n', 'Aula pequeña donde se guardan y exponen objetos de la escuela'),
  servicio('pb-secretaria', 'Secretaría', 0, 410, 462, 66, 76, 'n', 'Trámites y certificados'),
  servicio('pb-profes', 'Sala de Profesores', 0, 491, 462, 85, 76, 'n', 'Sala de profesores'),
  aula('pb-1f', 0, 576, 462, 40, 76, 'n', { manana: '1.º F', tarde: '5.º Ed. Física' }),

  // ---- Planta baja: right-hand wing ----
  servicio('pb-prec1', 'Preceptoría', 0, 638, 82, 107, 48, 'w', 'Preceptoría'),
  aula('pb-3d', 0, 638, 137, 107, 53, 'w', { manana: '3.º D', tarde: '1.º D', noche: '3.º Cs. Nat. ESJA' }),
  aula('pb-3a', 0, 638, 190, 107, 53, 'w', { manana: '3.º A', tarde: '6.º Ed. Física', noche: '3.º Cs. Soc. ESJA' }),
  aula('pb-2d', 0, 638, 243, 107, 53, 'w', { manana: '2.º D', tarde: '3.º E', noche: '2.º Cs. Nat. ESJA' }),
  aula('pb-2f', 0, 638, 296, 107, 53, 'w', { manana: '2.º F', tarde: '2.º C', noche: '2.º Cs. Soc. ESJA' }),
  aula('pb-1c', 0, 638, 349, 107, 53, 'w', { manana: '1.º C', tarde: '3.º C', noche: '1.º Cs. Nat. ESJA' }),
  aula('pb-3f', 0, 638, 402, 107, 53, 'w', { manana: '3.º F', tarde: '2.º E', noche: '1.º Cs. Soc. ESJA' }),
  servicio('pb-prec2', 'Preceptoría', 0, 638, 458, 107, 50, 'w', 'Preceptoría'),

  // ---- Planta baja: free-standing rooms ----
  aula('pb-2a', 0, 478, 138, 96, 47, 's', { manana: '2.º A', tarde: '1.º G' }),
  aula('pb-5nat', 0, 8, 347, 126, 64, 's', { manana: '5.º Naturales', tarde: '4.º Ed. Física' }),
  servicio('pb-cocina', 'Cocina', 0, 134, 347, 62, 64, 's', 'Cocina de la escuela'),
  servicio('pb-banos', 'Baños', 0, 196, 347, 62, 64, 's', 'Baños de planta baja'),
  servicio('pb-biblio', 'Biblioteca', 0, 258, 347, 72, 64, 's', 'Biblioteca escolar'),
  servicio('pb-escenario', 'Escenario', 0, 336, 296, 130, 115, 's', 'Escenario y espacio amplio frente a la escalera, donde se arman actos y eventos con sillas'),

  // ---- Planta alta (sketch only shows the morning turn) ----
  servicio('pa-prec', 'Preceptoría', 1, 591, 137, 150, 46, 'w', 'Preceptoría'),
  aula('pa-6eco', 1, 474, 204, 122, 46, 's', { manana: '6.º Economía' }),
  aula('pa-6soc', 1, 619, 203, 122, 36, 'w', { manana: '6.º Cs. Sociales' }),
  aula('pa-6nat', 1, 619, 239, 122, 36, 'w', { manana: '6.º Naturales' }),
  aula('pa-5soc', 1, 619, 275, 122, 36, 'w', { manana: '5.º Cs. Sociales' }),
  aula('pa-4eco', 1, 619, 311, 122, 36, 'w', { manana: '4.º Economía' }),
  aula('pa-4rob', 1, 619, 347, 122, 36, 'w', { manana: '4.º Robótica' }),
  servicio('pa-video', 'Sala de Video', 1, 156, 346, 118, 38, 's', 'Sala de video'),
  aula('pa-6rob', 1, 158, 408, 101, 78, 'n', { manana: '6.º Robótica' }),
  aula('pa-5rob', 1, 259, 408, 108, 78, 'n', { manana: '5.º Robótica' }),
  aula('pa-4nat', 1, 367, 408, 115, 78, 'n', { manana: '4.º Naturales' }),
  { id: 'pa-lab', nombre: 'Laboratorio', tipo: 'lab', piso: 1, x: 482, y: 408, w: 155, h: 78, lado: 'n', habitual: {} },
  aula('pa-4soc', 1, 637, 408, 110, 78, 'n', { manana: '4.º Cs. Sociales' }),
]

export const salaPorId = Object.fromEntries(salas.map((s) => [s.id, s]))

/** Door of a room: the middle of the edge on its `lado`. */
export function puerta(sala) {
  if (sala.lado === 'w') return { x: sala.x, y: sala.y + sala.h / 2 }
  if (sala.lado === 's') return { x: sala.x + sala.w / 2, y: sala.y + sala.h }
  return { x: sala.x + sala.w / 2, y: sala.y }
}

/**
 * Walking route for one floor, as an SVG path, towards `destino`.
 * Ground floor starts at the main entrance; upstairs starts at the stairs door.
 * Returns null when the destination is on a lower floor than the one shown.
 */
export function rutaEnPiso(destino, piso) {
  if (!destino || destino.piso < piso) return null
  const cfg = plano.pisos[piso]
  const { puerta: pe, via } = cfg.escalera
  const mismoPiso = destino.piso === piso
  // Upstairs you arrive at the stairs door, so the walk starts there.
  const puntos = piso === 0
    ? [cfg.inicio, { x: cfg.inicio.x, y: cfg.corredorY }]
    : [pe, { x: via, y: pe.y }, { x: via, y: cfg.corredorY }]

  if (!mismoPiso) {
    puntos.push({ x: via, y: cfg.corredorY }, { x: via, y: pe.y }, pe)
  } else {
    const fin = puerta(destino)
    if (destino.lado === 'w') {
      puntos.push({ x: cfg.corredorX, y: cfg.corredorY }, { x: cfg.corredorX, y: fin.y })
    } else {
      puntos.push({ x: fin.x, y: cfg.corredorY })
    }
    puntos.push(fin)
  }
  const unicos = puntos.filter((p, i) => i === 0 || p.x !== puntos[i - 1].x || p.y !== puntos[i - 1].y)
  if (unicos.length < 2) return null
  return unicos.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ')
}
