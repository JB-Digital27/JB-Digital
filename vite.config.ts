import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative Pfade: Die gebaute App funktioniert so lokal und unter
  // https://jb-digital27.github.io/JB-Digital/ (GitHub Pages, Unterordner).
  base: './',
})
