import { fotos } from '../data/fotos.js'

export default function Loader({ hidden }) {
  return (
    <div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-brand-navy transition-opacity duration-700 ease-out"
      style={{
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? 'none' : 'auto',
      }}
      aria-hidden={hidden}
    >
      <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-3xl bg-white p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 animate-esc7-pulse">
        <img
          src={fotos.logo}
          alt="Escudo oficial Escuela Secundaria N.° 7"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="mt-6 text-center">
        <span className="block text-lg sm:text-xl font-extrabold tracking-tight text-white font-sans">
          Escuela Secundaria N.° 7
        </span>
        <span className="block mt-1 text-xs sm:text-sm font-medium text-slate-300 font-serif italic">
          &ldquo;Carlos Lorenzo Vergara&rdquo;
        </span>
      </div>
      <div className="mt-5 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-crimson animate-ping" />
        <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
          Cargando portal institucional...
        </span>
      </div>
    </div>
  )
}
