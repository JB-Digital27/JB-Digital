// Berechnete Werte, die nicht von Hand gepflegt werden, damit sie nie veralten.

import type { Buchung, Daten, Standort, Werbetreibender } from '../types'
import { heute } from './datum'

/** Läuft die Buchung am angegebenen Tag? */
export function istAktiv(b: Buchung, stichtag: string = heute()): boolean {
  return b.von <= stichtag && (b.bis === null || b.bis >= stichtag)
}

export interface AktiveWerbung {
  buchung: Buchung
  werbetreibender: Werbetreibender | undefined
}

/** Alle heute laufenden Buchungen eines Standorts, mit Werbetreibendem. */
export function aktiveWerbung(daten: Daten, standortId: string): AktiveWerbung[] {
  return daten.buchungen
    .filter((b) => b.standortId === standortId && istAktiv(b))
    .map((b) => ({
      buchung: b,
      werbetreibender: daten.werbetreibende.find((w) => w.id === b.werbetreibenderId),
    }))
}

/** Buchungen, die erst in Zukunft starten. */
export function kuenftigeBuchungen(daten: Daten, standortId: string): AktiveWerbung[] {
  const tag = heute()
  return daten.buchungen
    .filter((b) => b.standortId === standortId && b.von > tag)
    .map((b) => ({
      buchung: b,
      werbetreibender: daten.werbetreibende.find((w) => w.id === b.werbetreibenderId),
    }))
}

export interface Belegung {
  gesamt: number
  belegt: number
  frei: number
  ueberbucht: boolean
}

export function belegung(daten: Daten, standort: Standort): Belegung {
  if (standort.variante === 'ohne_werbung') {
    return { gesamt: 0, belegt: 0, frei: 0, ueberbucht: false }
  }
  const belegt = daten.buchungen.filter(
    (b) => b.standortId === standort.id && istAktiv(b),
  ).length
  const gesamt = standort.werbeplaetze
  return {
    gesamt,
    belegt,
    frei: Math.max(0, gesamt - belegt),
    ueberbucht: belegt > gesamt,
  }
}

export interface Kennzahlen {
  live: number
  plaetzeBelegt: number
  plaetzeFrei: number
}

/** Überblick über alle Läden, die live sind. */
export function kennzahlen(daten: Daten): Kennzahlen {
  const live = daten.standorte.filter((s) => s.status === 'live')
  let plaetzeBelegt = 0
  let plaetzeFrei = 0
  for (const s of live) {
    const b = belegung(daten, s)
    plaetzeBelegt += b.belegt
    plaetzeFrei += b.frei
  }
  return { live: live.length, plaetzeBelegt, plaetzeFrei }
}
