// Umschalter Hell/Dunkel. Ohne Auswahl folgt die App der Einstellung des Geräts.

import { useEffect, useState } from 'react'

const SCHLUESSEL = 'jb-digital-darstellung'
type Darstellung = 'hell' | 'dunkel'

function gespeichert(): Darstellung | null {
  try {
    const w = localStorage.getItem(SCHLUESSEL)
    return w === 'hell' || w === 'dunkel' ? w : null
  } catch {
    return null
  }
}

function systemIstDunkel(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function DarstellungsKnopf() {
  const [wahl, setWahl] = useState<Darstellung | null>(gespeichert)

  useEffect(() => {
    const root = document.documentElement
    if (wahl === 'dunkel') root.setAttribute('data-theme', 'dark')
    else if (wahl === 'hell') root.setAttribute('data-theme', 'light')
    else root.removeAttribute('data-theme')
  }, [wahl])

  const istDunkel = wahl ? wahl === 'dunkel' : systemIstDunkel()

  function umschalten() {
    const neu: Darstellung = istDunkel ? 'hell' : 'dunkel'
    setWahl(neu)
    try {
      localStorage.setItem(SCHLUESSEL, neu)
    } catch {
      // nicht schlimm, gilt dann nur bis zum Neuladen
    }
  }

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={umschalten}
      aria-label={istDunkel ? 'Helle Darstellung' : 'Dunkle Darstellung'}
      title={istDunkel ? 'Helle Darstellung' : 'Dunkle Darstellung'}
    >
      {istDunkel ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  )
}
