import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import useReveal from './hooks/useReveal.js'
import Inicio from './pages/Inicio.jsx'

// Every page except the home one is loaded on demand, so phones download less up front.
const Institucional = lazy(() => import('./pages/Institucional.jsx'))
const Orientaciones = lazy(() => import('./pages/Orientaciones.jsx'))
const VidaEscolar = lazy(() => import('./pages/VidaEscolar.jsx'))
const Noticias = lazy(() => import('./pages/Noticias.jsx'))
const Noticia = lazy(() => import('./pages/Noticia.jsx'))
const Calendario = lazy(() => import('./pages/Calendario.jsx'))
const Mesas = lazy(() => import('./pages/Mesas.jsx'))
const Preguntas = lazy(() => import('./pages/Preguntas.jsx'))
const Preinscripcion = lazy(() => import('./pages/Preinscripcion.jsx'))
const Contacto = lazy(() => import('./pages/Contacto.jsx'))
const NoEncontrada = lazy(() => import('./pages/NoEncontrada.jsx'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])
  return null
}

function Cargando() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status">
      <span className="h-8 w-8 rounded-full border-[3px] border-slate-200 border-t-brand-crimson animate-spin" />
      <span className="sr-only">Cargando…</span>
    </div>
  )
}

export default function App() {
  useReveal()

  return (
    <>
      <ScrollToTop />
      {/* Bottom padding on phones keeps content clear of the fixed bottom bar. */}
      <div className="flex min-h-screen flex-col bg-brand-surface text-brand-navy pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:shadow-lg"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" className="flex-1">
          <Suspense fallback={<Cargando />}>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/institucional" element={<Institucional />} />
              <Route path="/orientaciones" element={<Orientaciones />} />
              <Route path="/vida-escolar" element={<VidaEscolar />} />
              <Route path="/noticias" element={<Noticias />} />
              <Route path="/noticias/:slug" element={<Noticia />} />
              <Route path="/calendario" element={<Calendario />} />
              <Route path="/mesas" element={<Mesas />} />
              <Route path="/preguntas-frecuentes" element={<Preguntas />} />
              <Route path="/preinscripcion" element={<Preinscripcion />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="*" element={<NoEncontrada />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  )
}
