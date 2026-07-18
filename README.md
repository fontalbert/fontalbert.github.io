# [Albert Font · Portfolio](https://fontalbert.github.io)

Portfolio personal de Albert Font Sala, desarrollador fullstack (React · Node.js · C#).

## Diseño

"Murmuración": la página es un día entero — el cielo cambia con el scroll de alba a noche,
con una murmuración de golondrinas viva de fondo (canvas 2D con flocking que huye del cursor).
Juego escondido: doble clic en el cielo crea un cable donde se posan las golondrinas.

## Stack

- **React 19** + **Vite 7**
- **Tailwind CSS** para los estilos
- **Framer Motion** — apariciones al hacer scroll
- **Canvas 2D** — murmuración de golondrinas (sin librerías 3D)
- **Bilingüe ES/EN** — todo el contenido en `src/data/content.js`, selector en el nav

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción en dist/
npm run preview  # previsualizar el build
```

## Despliegue

Cada push a `main` lanza el workflow de GitHub Actions que hace el build y publica en GitHub Pages automáticamente.
