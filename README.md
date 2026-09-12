# [Albert Font · AI Software Engineer](https://fontalbert.github.io)

Web personal de Albert Font — AI Software Engineer, automatización con IA e ingeniería de procesos de negocio.
"Construyo software que automatiza procesos de negocio reales."

## Diseño

"Murmuración": la página es un día entero — el cielo cambia con el scroll de alba a noche,
con una murmuración de golondrinas viva de fondo (canvas 2D con flocking que huye del cursor).
Juego escondido: doble clic en el cielo crea un cable donde se posan las golondrinas.

## Stack

- **React 19** + **Vite 7**
- **Tailwind CSS** (tokens de diseño en `tailwind.config.js`)
- **CSS + IntersectionObserver** para las apariciones — sin librería de animación
- **Canvas 2D** — murmuración de golondrinas (sin librerías 3D)
- **Bilingüe ES/EN** — castellano por defecto, inglés con el selector del menú. Todo el contenido
  vive en `src/data/content.js`; los componentes solo leen `content[lang]`

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción en dist/
npm run preview  # previsualizar el build
```

## Despliegue

Cada push a `main` lanza el workflow de GitHub Actions que hace el build y publica en GitHub Pages automáticamente.
