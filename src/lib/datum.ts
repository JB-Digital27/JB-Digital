// Kleine Helfer für Datumsangaben. Gespeichert wird immer als Text „JJJJ-MM-TT“.

function zweistellig(n: number): string {
  return String(n).padStart(2, '0')
}

export function alsIsoDatum(d: Date): string {
  return `${d.getFullYear()}-${zweistellig(d.getMonth() + 1)}-${zweistellig(d.getDate())}`
}

export function heute(): string {
  return alsIsoDatum(new Date())
}

/** Datum in n Tagen (negativ = in der Vergangenheit). */
export function inTagen(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return alsIsoDatum(d)
}

/** „2026-11-18“ → „Mi., 18.11.2026“ */
export function datumAnzeigen(iso: string | null): string {
  if (!iso) return '–'
  const [j, m, t] = iso.split('-').map(Number)
  const d = new Date(j, m - 1, t)
  return d.toLocaleDateString('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

/** Kurzform ohne Wochentag: „18.11.2026“ */
export function datumKurz(iso: string | null): string {
  if (!iso) return '–'
  const [j, m, t] = iso.split('-')
  return `${t}.${m}.${j}`
}

/** Erzeugt eine eindeutige ID (funktioniert auch ohne HTTPS, z. B. im Heimnetz am Handy). */
export function neueId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    try {
      return crypto.randomUUID()
    } catch {
      // fällt unten auf die einfache Variante zurück
    }
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
}
