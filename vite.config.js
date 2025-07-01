import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Como tu repo se llama fontalbert.github.io, la base es '/'
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})