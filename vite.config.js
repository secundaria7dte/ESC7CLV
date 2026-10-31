import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { secciones } from './src/data/navegacion.js'
import { noticiasOrdenadas } from './src/data/noticias.js'

// Public address of the site, needed for absolute links in previews and the sitemap.
// SITE_URL wins when set (e.g. a custom domain); on Vercel the production domain is
// provided automatically at build time.
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'http://localhost:5180'
).replace(/\/$/, '')

const rutas = ['/', ...secciones.flatMap((s) => s.links.map((l) => l.to)), ...noticiasOrdenadas.map((n) => `/noticias/${n.slug}`)]

function sitemap() {
  const hoy = new Date().toISOString().slice(0, 10)
  const urls = rutas
    .map((r) => `  <url><loc>${siteUrl}${r}</loc><lastmod>${hoy}</lastmod></url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function seoEstatico() {
  return {
    name: 'seo-estatico',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoEstatico()],
})
