// Laden und Speichern aller Daten.
//
// Build 1: Gespeichert wird im Browser (localStorage) – also nur auf diesem Gerät.
// Später wird NUR diese Datei auf Supabase umgestellt; der Rest der App bleibt gleich.

import { useCallback, useRef, useState } from 'react'
import type { Daten, Standort, Status } from '../types'
import { erzeugeBeispieldaten } from './beispieldaten'

const SPEICHER_SCHLUESSEL = 'jb-digital-daten-v1'

function istGueltig(d: unknown): d is Daten {
  if (!d || typeof d !== 'object') return false
  const x = d as Record<string, unknown>
  return (
    Array.isArray(x.standorte) &&
    Array.isArray(x.werbetreibende) &&
    Array.isArray(x.buchungen) &&
    Array.isArray(x.gespraeche)
  )
}

function laden(): Daten {
  try {
    const roh = localStorage.getItem(SPEICHER_SCHLUESSEL)
    if (roh) {
      const d: unknown = JSON.parse(roh)
      if (istGueltig(d)) return d
    }
  } catch {
    // Speicher nicht lesbar (z. B. privates Fenster) → Beispieldaten
  }
  return erzeugeBeispieldaten()
}

export function useDaten() {
  const [daten, setDaten] = useState<Daten>(laden)
  const [speicherFehler, setSpeicherFehler] = useState(false)
  const aktuell = useRef(daten)

  /** Zentrale Stelle für jede Änderung: neuen Stand berechnen, anzeigen und speichern. */
  const aendern = useCallback((f: (d: Daten) => Daten) => {
    const neu = f(aktuell.current)
    aktuell.current = neu
    setDaten(neu)
    try {
      localStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify(neu))
      setSpeicherFehler(false)
    } catch {
      setSpeicherFehler(true)
    }
  }, [])

  /** Neuen Standort anlegen oder bestehenden (gleiche id) überschreiben. */
  const standortSpeichern = useCallback((s: Standort) => {
    aendern((d) => {
      const vorhanden = d.standorte.some((x) => x.id === s.id)
      return {
        ...d,
        standorte: vorhanden
          ? d.standorte.map((x) => (x.id === s.id ? s : x))
          : [...d.standorte, s],
      }
    })
  }, [aendern])

  const statusAendern = useCallback((id: string, status: Status) => {
    aendern((d) => ({
      ...d,
      standorte: d.standorte.map((x) => (x.id === id ? { ...x, status } : x)),
    }))
  }, [aendern])

  /** Löscht den Standort samt zugehöriger Buchungen und Gespräche. */
  const standortLoeschen = useCallback((id: string) => {
    aendern((d) => ({
      ...d,
      standorte: d.standorte.filter((x) => x.id !== id),
      buchungen: d.buchungen.filter((b) => b.standortId !== id),
      gespraeche: d.gespraeche.filter((g) => g.standortId !== id),
    }))
  }, [aendern])

  const beispieldatenWiederherstellen = useCallback(() => {
    aendern(() => erzeugeBeispieldaten())
  }, [aendern])

  return {
    daten,
    speicherFehler,
    standortSpeichern,
    statusAendern,
    standortLoeschen,
    beispieldatenWiederherstellen,
  }
}
