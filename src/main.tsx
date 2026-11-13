import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Schriften lokal eingebunden (keine Verbindung zu Google nötig)
import '@fontsource-variable/inter'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/700.css'
import 'leaflet/dist/leaflet.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
