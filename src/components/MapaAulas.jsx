import { plano, puerta, rutaEnPiso, salas } from '../data/plano.js'
import { turnoDe, turnos } from '../lib/horarios.js'

const BASE = 'fill-white stroke-slate-300'
const SERVICIO = 'fill-slate-100 stroke-slate-300'

function relleno(sala, bloque) {
  if (bloque) return turnos[turnoDe(bloque)].relleno
  return sala.tipo === 'servicio' ? SERVICIO : BASE
}

/** Greedy word wrap: the biggest font size at which `texto` fits a w x h box. */
function ajustar(texto, w, h) {
  const palabras = texto.split(' ')
  for (const fs of [13, 12, 11, 10, 9, 8]) {
    const ancho = fs * 0.6
    const max = Math.floor((w - 6) / ancho)
    if (palabras.some((p) => p.length > max)) continue
    const lineas = []
    let actual = ''
    for (const p of palabras) {
      if (actual && (actual + ' ' + p).length > max) {
        lineas.push(actual)
        actual = p
      } else actual = actual ? `${actual} ${p}` : p
    }
    lineas.push(actual)
    if (lineas.length * fs * 1.2 <= h - 6) return { fs, lineas }
  }
  return { fs: 8, lineas: [texto] }
}

function Etiqueta({ sala, bloque }) {
  const texto = bloque ? bloque.curso : sala.nombre
  const { fs, lineas } = ajustar(texto, sala.w - 6, sala.h - (bloque?.materia ? 14 : 0))
  const cx = sala.x + sala.w / 2
  const alto = lineas.length * fs * 1.2
  const y0 = sala.y + sala.h / 2 - alto / 2 + fs * 0.9 - (bloque?.materia ? 6 : 0)
  return (
    <text textAnchor="middle" pointerEvents="none" className={bloque ? 'fill-brand-navy font-extrabold' : 'fill-slate-500 font-bold'} style={{ fontSize: fs }}>
      {lineas.map((l, i) => (
        <tspan key={i} x={cx} y={y0 + i * fs * 1.2}>
          {l}
        </tspan>
      ))}
      {bloque?.materia && (
        <tspan x={cx} y={y0 + alto + 8} className="fill-slate-600 font-medium" style={{ fontSize: 9 }}>
          {bloque.materia.length > 18 ? `${bloque.materia.slice(0, 17)}…` : bloque.materia}
        </tspan>
      )}
    </text>
  )
}

/** U-shaped stairs seen from above: two flights side by side joined by a turn, entered and left on the left. */
function Escalera({ e }) {
  const pad = 8
  const alto = (e.h - 3 * pad) / 2
  const y1 = e.y + pad + alto / 2
  const y2 = e.y + 2 * pad + alto * 1.5
  const r = (y2 - y1) / 2
  const x0 = e.x + 12
  const xr = e.x + e.w - 14 - r
  const peldanos = Math.floor((xr - 6 - (e.x + 14)) / 9)
  return (
    <g pointerEvents="none">
      <rect x={e.x + 2} y={e.y + 2} width={e.w - 4} height={e.h - 4} rx="8" className="fill-brand-sky stroke-brand-royal/40" strokeWidth="1.5" />
      <g className="stroke-brand-royal/30" strokeWidth="1.5">
        {Array.from({ length: peldanos }, (_, i) => {
          const x = e.x + 16 + i * 9
          return (
            <g key={i}>
              <line x1={x} x2={x} y1={e.y + pad} y2={e.y + pad + alto} />
              <line x1={x} x2={x} y1={e.y + 2 * pad + alto} y2={e.y + 2 * pad + 2 * alto} />
            </g>
          )
        })}
      </g>
      <path
        d={`M${x0} ${y1}H${xr}A${r} ${r} 0 0 1 ${xr} ${y2}H${x0}M${x0 + 8} ${y2 - 4}L${x0} ${y2}L${x0 + 8} ${y2 + 4}`}
        fill="none"
        className="stroke-brand-royal"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x={e.x + e.w / 2} y={e.y + e.h / 2 + 4} textAnchor="middle" className="fill-brand-royal text-[11px] font-extrabold" paintOrder="stroke" stroke="#EEF0FF" strokeWidth="4">
        Escalera
      </text>
    </g>
  )
}

/**
 * Interactive SVG plan of one floor. Rooms are painted by what is happening in
 * them right now; the selected one gets a route traced from the entrance.
 */
export default function MapaAulas({ piso, ahora, seleccionada, onSeleccionar, activa = true }) {
  const cfg = plano.pisos[piso]
  const delPiso = salas.filter((s) => s.piso === piso)
  const destino = seleccionada ? salas.find((s) => s.id === seleccionada) : null
  const ruta = rutaEnPiso(destino, piso)
  const e = cfg.escalera
  const puntoDestino = destino && destino.piso === piso ? puerta(destino) : null

  return (
    <svg
      viewBox={`0 0 ${plano.ancho} ${plano.alto}`}
      className="h-auto w-full select-none"
      role="group"
      aria-label={`Plano de la ${cfg.label.toLowerCase()}`}
    >
      {/* Hallways */}
      <g className="stroke-slate-300" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" fill="none">
        <line x1="20" x2="745" y1={cfg.corredorY} y2={cfg.corredorY} />
        <line x1={cfg.corredorX} x2={cfg.corredorX} y1="90" y2={cfg.corredorY} />
      </g>

      {delPiso.map((sala, i) => {
        const bloque = ahora[sala.id]
        const elegida = seleccionada === sala.id
        const etiqueta = bloque
          ? `${sala.nombre}: ${bloque.curso}${bloque.materia ? `, ${bloque.materia}` : ''}`
          : `${sala.nombre}${sala.tipo === 'aula' || sala.tipo === 'lab' ? ': libre ahora' : ''}`
        return (
          <g
            key={sala.id}
            className="mapa-sala"
            style={{ '--i': i }}
            role="button"
            tabIndex={0}
            aria-pressed={elegida}
            aria-label={etiqueta}
            onClick={() => onSeleccionar(sala.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSeleccionar(sala.id)
              }
            }}
          >
            <rect
              className={`mapa-forma ${relleno(sala, bloque)}`}
              x={sala.x + 2}
              y={sala.y + 2}
              width={sala.w - 4}
              height={sala.h - 4}
              rx="8"
              strokeWidth="1.5"
              style={elegida ? { stroke: 'var(--color-brand-crimson)', strokeWidth: 3.5 } : undefined}
            />
            <Etiqueta sala={sala} bloque={bloque} />
            {bloque && (
              <>
                <circle cx={sala.x + sala.w - 11} cy={sala.y + 11} r="4" fill={turnos[turnoDe(bloque)].color} pointerEvents="none" />
                <circle className="mapa-pulso" cx={sala.x + sala.w - 11} cy={sala.y + 11} r="4" fill={turnos[turnoDe(bloque)].color} pointerEvents="none" />
              </>
            )}
          </g>
        )
      })}

      {/* Route from the entrance (or the stairs upstairs) to the selected room */}
      {ruta && (
        <g key={`${seleccionada}-${piso}-${activa}`} pointerEvents="none">
          <path
            d={ruta}
            pathLength="1"
            className="mapa-ruta"
            fill="none"
            stroke="var(--color-brand-crimson)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle className="mapa-punto-ruta" r="8" fill="var(--color-brand-crimson)" stroke="#fff" strokeWidth="3">
            <animateMotion dur="1.3s" begin="0.15s" fill="freeze" path={ruta} keyTimes="0;1" keySplines=".45 0 .55 1" calcMode="spline" />
          </circle>
          {puntoDestino && <circle cx={puntoDestino.x} cy={puntoDestino.y} r="6" fill="var(--color-brand-crimson)" />}
        </g>
      )}

      <Escalera e={e} />

      {/* "You are here" at the main entrance */}
      {piso === 0 && (
        <g pointerEvents="none">
          <circle cx={cfg.inicio.x} cy={cfg.inicio.y} r="7" className="fill-brand-royal" stroke="#fff" strokeWidth="3" />
          <text x={cfg.inicio.x + 14} y={cfg.inicio.y + 4} className="fill-brand-royal text-[11px] font-bold">
            Entrada
          </text>
        </g>
      )}
    </svg>
  )
}
