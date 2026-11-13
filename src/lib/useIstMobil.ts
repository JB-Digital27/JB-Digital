import { useEffect, useState } from 'react'

/** Muss zur Breite in index.css (@media max-width: 999px) passen. */
const ABFRAGE = '(max-width: 999px)'

/** true, wenn der Bildschirm schmal ist (Handy, kleines Tablet). */
export function useIstMobil(): boolean {
  const [mobil, setMobil] = useState(() => window.matchMedia(ABFRAGE).matches)
  useEffect(() => {
    const mq = window.matchMedia(ABFRAGE)
    const aendern = () => setMobil(mq.matches)
    mq.addEventListener('change', aendern)
    return () => mq.removeEventListener('change', aendern)
  }, [])
  return mobil
}
