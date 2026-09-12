# [Albert Font · AI Software Engineer](https://fontalbert.github.io)

Personal site of Albert Font — AI Software Engineer, AI Automation & Business Process Engineering.
"Building software that automates real business processes."

## Design

"Murmuración": the page is a whole day — the sky moves from dawn to night as you scroll, with a live
murmuration of swallows in the background (2D canvas flocking that flees the cursor).
Hidden game: double-click the sky to create a wire where the swallows perch.

## Stack

- **React 19** + **Vite 7**
- **Tailwind CSS** (design tokens in `tailwind.config.js`)
- **CSS + IntersectionObserver** reveals — no animation library
- **Canvas 2D** — swallow murmuration (no 3D libraries)
- All copy lives in `src/data/content.js` (English); components only read from it

## Development

```bash
npm install
npm run dev      # dev server
npm run build    # production build in dist/
npm run preview  # preview the build
```

## Deployment

Every push to `main` runs the GitHub Actions workflow that builds the site and publishes it to GitHub Pages.
