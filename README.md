# ESC7CLV

Sitio institucional de la Escuela Secundaria N.° 7 "Carlos Lorenzo Vergara" (Diamante, Entre Ríos).
React + Vite + Tailwind, pensado mobile first.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # genera /dist
npm run lint
```

## Estructura

```
src/
  data/         contenido del sitio (lo único que hay que tocar para actualizarlo)
  pages/        una página por ruta
  components/   Header (avisos + menú + barra inferior móvil), Footer, PageHeader, NoticiaCard, Seo…
  lib/          utilidades de fechas y descarga de eventos (.ics)
  hooks/        animación de entrada al hacer scroll
public/
  img/          fotos (nombres en minúscula, sin espacios ni tildes)
```

## Cómo actualizar el contenido

| Quiero…                          | Archivo                      |
| -------------------------------- | ---------------------------- |
| Publicar una noticia             | `src/data/noticias.js`       |
| Agregar una fecha al calendario  | `src/data/calendario.js`     |
| Cargar una nueva mesa de examen  | `src/data/mesas.js`          |
| Agregar una pregunta frecuente   | `src/data/preguntas.js`      |
| Historia, patrono, autoridades   | `src/data/institucional.js`  |
| Teléfono, email, preinscripción  | `src/data/institucion.js`    |
| Agregar una página al menú       | `src/data/navegacion.js`     |
| Fotos de la galería              | `src/data/fotos.js` + `galeria.js` |

Los campos vacíos (`''` o `[]`) no se muestran: cada bloque aparece apenas se carga información confirmada.
Las fechas de la mesa y de la preinscripción aparecen solas en el calendario, en las noticias y en la barra de avisos.

## Despliegue

Es una SPA: el servidor tiene que devolver `index.html` en cualquier ruta.
Ya están incluidos `public/_redirects` (Netlify / Cloudflare Pages) y `vercel.json` (Vercel).
