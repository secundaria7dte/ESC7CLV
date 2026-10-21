import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/Loader.jsx'
import useReveal from './hooks/useReveal.js'
import Inicio from './pages/Inicio.jsx'
import Orientaciones from './pages/Orientaciones.jsx'
import VidaEscolar from './pages/VidaEscolar.jsx'
import Contacto from './pages/Contacto.jsx'
import Preinscripcion from './pages/Preinscripcion.jsx'
import Mesas from './pages/Mesas.jsx'

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

export default function App() {
  const [loading, setLoading] = useState(true)
  useReveal()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Loader hidden={!loading} />
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-[#F8FAFC] text-brand-navy">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/orientaciones" element={<Orientaciones />} />
            <Route path="/vida-escolar" element={<VidaEscolar />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/preinscripcion" element={<Preinscripcion />} />
            <Route path="/mesas" element={<Mesas />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}
