import { useEffect } from 'react'
import { institucion } from '../data/institucion.js'

const sitio = `${institucion.nombre} "${institucion.patrono}"`

// Updates the <title> and description already in index.html. Those static tags
// stay as they are for link previews (WhatsApp, Facebook), which don't run JS.
export default function Seo({ titulo, descripcion }) {
  useEffect(() => {
    document.title = titulo ? `${titulo} · ${institucion.nombre}` : sitio
    if (descripcion) document.querySelector('meta[name="description"]')?.setAttribute('content', descripcion)
  }, [titulo, descripcion])
  return null
}
