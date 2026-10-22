import { useEffect } from 'react'

/**
 * Adds `.is-visible` to every `.reveal` element once it scrolls into view.
 * Watches the DOM so lazily loaded pages and filtered lists also get revealed.
 */
export default function useReveal() {
  useEffect(() => {
    const pendientes = () => document.querySelectorAll('.reveal:not(.is-visible)')

    if (!('IntersectionObserver' in window)) {
      const mostrar = () => pendientes().forEach((el) => el.classList.add('is-visible'))
      mostrar()
      const mo = new MutationObserver(mostrar)
      mo.observe(document.body, { childList: true, subtree: true })
      return () => mo.disconnect()
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    const observar = () => pendientes().forEach((el) => io.observe(el))
    observar()
    const mo = new MutationObserver(observar)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      mo.disconnect()
      io.disconnect()
    }
  }, [])
}
