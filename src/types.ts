// Datenmodell des Tools.
// Die Felder entsprechen den Tabellen, die später in Supabase angelegt werden:
// standorte, werbetreibende, buchungen, gespraeche.

/** Reihenfolge = typischer Verlauf von der Idee bis zum laufenden Bildschirm. */
export const STATUS_LISTE = [
  'idee',
  'angesprochen',
  'unsicher',
  'zusage',
  'vertrag',
  'live',
  'ausgestiegen',
] as const

export type Status = (typeof STATUS_LISTE)[number]

export const STATUS_INFO: Record<Status, { label: string; farbe: string }> = {
  idee: { label: 'Idee', farbe: '#8A94A0' },
  angesprochen: { label: 'Angesprochen', farbe: '#2F6FEB' },
  unsicher: { label: 'Unsicher', farbe: '#E0A100' },
  zusage: { label: 'Zusage', farbe: '#7CC242' },
  vertrag: { label: 'Vertrag', farbe: '#1F9D55' },
  live: { label: 'Live', farbe: '#0B5D3B' },
  ausgestiegen: { label: 'Ausgestiegen', farbe: '#D63B2F' },
}

/** mit_werbung: Bildschirm gratis, wir verkaufen Werbeplätze.
 *  ohne_werbung: Laden zahlt 99 € Installation + 50 €/Monat, keine Werbung. */
export type Variante = 'mit_werbung' | 'ohne_werbung'

export const VARIANTE_LABEL: Record<Variante, string> = {
  mit_werbung: 'Mit Werbung',
  ohne_werbung: 'Ohne Werbung',
}

/** Standard-Anzahl Werbeplätze pro Bildschirm. */
export const STANDARD_WERBEPLAETZE = 6

/** Ein Laden bzw. Imbiss, bei dem ein Bildschirm hängt oder hängen könnte. */
export interface Standort {
  id: string
  name: string
  adresse: string
  ort: string
  lat: number
  lng: number
  status: Status
  variante: Variante
  /** Anzahl Werbeplätze auf dem Bildschirm (nur bei „mit Werbung“ relevant). */
  werbeplaetze: number
  notiz: string
  /** Datum im Format JJJJ-MM-TT oder null, wenn kein Termin steht. */
  naechsterTermin: string | null
  /** Kurz, worum es beim Termin geht, z. B. „Vertrag unterschreiben“. */
  terminInfo: string
  erstelltAm: string
}

/** Eine Firma, die auf unseren Bildschirmen wirbt. */
export interface Werbetreibender {
  id: string
  name: string
  branche: string
  ansprechpartner: string
  telefon: string
  email: string
  notiz: string
}

/** Wer wirbt wo, zu welchem Preis, in welchem Zeitraum. */
export interface Buchung {
  id: string
  standortId: string
  werbetreibenderId: string
  /** Preis pro Monat in Euro. */
  preisMonat: number
  /** Startdatum JJJJ-MM-TT */
  von: string
  /** Enddatum JJJJ-MM-TT oder null = läuft unbefristet */
  bis: string | null
  /** Im Voraus bezahlter Betrag in Euro (0 = keine Vorauszahlung). */
  vorauszahlung: number
}

/** Notiz zu einem Gespräch mit einem Laden. */
export interface Gespraech {
  id: string
  standortId: string
  datum: string
  wer: 'Joel' | 'Baraa'
  inhalt: string
  naechsterSchritt: string
}

export interface Daten {
  standorte: Standort[]
  werbetreibende: Werbetreibender[]
  buchungen: Buchung[]
  gespraeche: Gespraech[]
}

export interface Position {
  lat: number
  lng: number
}
