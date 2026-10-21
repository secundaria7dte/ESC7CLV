import { useEffect, useState } from 'react'

function diff(target) {
  const ms = Math.max(0, target.getTime() - Date.now())
  return {
    dias: Math.floor(ms / 86400000),
    horas: Math.floor((ms / 3600000) % 24),
    minutos: Math.floor((ms / 60000) % 60),
    terminado: ms === 0,
  }
}

/** Days / hours / minutes left until `target`. */
export default function Countdown({ target, dark = false }) {
  const [left, setLeft] = useState(() => diff(target))

  useEffect(() => {
    const t = setInterval(() => setLeft(diff(target)), 30000)
    return () => clearInterval(t)
  }, [target])

  if (left.terminado) {
    return (
      <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-brand-navy'}`}>
        El período de presentación finalizó.
      </p>
    )
  }

  const cells = [
    { v: left.dias, l: 'días' },
    { v: left.horas, l: 'horas' },
    { v: left.minutos, l: 'min' },
  ]

  return (
    <div className="flex gap-2.5" aria-label={`Faltan ${left.dias} días`}>
      {cells.map((c) => (
        <div
          key={c.l}
          className={`min-w-[64px] rounded-2xl px-3 py-2.5 text-center ${
            dark ? 'bg-white/10 border border-white/15' : 'bg-white border border-slate-200 shadow-sm'
          }`}
        >
          <span className={`block font-mono text-2xl font-bold tabular-nums ${dark ? 'text-white' : 'text-brand-navy'}`}>
            {String(c.v).padStart(2, '0')}
          </span>
          <span className={`block text-[11px] font-semibold uppercase tracking-wider ${dark ? 'text-slate-300' : 'text-slate-500'}`}>
            {c.l}
          </span>
        </div>
      ))}
    </div>
  )
}
