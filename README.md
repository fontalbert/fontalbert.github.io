# [Albert Font · Portfolio](https://fontalbert.github.io)

Portfolio personal de Albert Font Sala, desarrollador fullstack (React · Node.js · C#).

## Stack

- **React 19** + **Vite 7**
- **Tailwind CSS** para los estilos
- **Three.js** — fondo animado de pájaros con simulación de *flocking*
- **Framer Motion** — golondrinas animadas sobre un cable
- Contenido separado en JSON (`src/data/`) para editar textos sin tocar componentes

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción en dist/
npm run preview  # previsualizar el build
```

## Despliegue

Cada push a `main` lanza el workflow de GitHub Actions que hace el build y publica en GitHub Pages automáticamente.
