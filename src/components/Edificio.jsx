import MapaAulas from './MapaAulas.jsx'
import { plano } from '../data/plano.js'

/**
 * Both floors rendered as stacked layers. `vista="plano"` shows the chosen floor flat
 * (switching floors slides like an elevator); `vista="edificio"` tilts them into an
 * isometric stack. The geometry is pure CSS (see .edificio in index.css).
 */
export default function Edificio({ piso, vista, ahora, seleccionada, onSeleccionar, onElegirPiso }) {
  const isometrico = vista === 'edificio'

  return (
    <div className="edificio" data-vista={vista}>
      <div className="edificio-escena">
        {plano.pisos.map((p) => {
          const activa = isometrico || p.id === piso
          return (
            <div
              key={p.id}
              className="edificio-capa"
              data-piso={p.id}
              data-elegida={p.id === piso}
              inert={!activa}
              aria-hidden={!activa}
              onClick={isometrico ? () => onElegirPiso(p.id) : undefined}
            >
              <div className="capa-losa" aria-hidden="true" />
              <MapaAulas piso={p.id} activa={activa} ahora={ahora} seleccionada={seleccionada} onSeleccionar={onSeleccionar} />
              <span className="capa-etiqueta" aria-hidden="true">
                {p.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
