import { fotos } from '../data/fotos.js'

export default function Logo({ className = 'h-10 w-10' }) {
  return (
    <img
      src={fotos.logo}
      alt="Escudo Escuela Secundaria N.º 7"
      className={`${className} object-contain`}
    />
  )
}
