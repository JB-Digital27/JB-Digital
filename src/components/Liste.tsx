// Liste aller (gefilterten) Läden.

import type { Daten, Standort } from '../types'
import { STATUS_INFO } from '../types'
import { belegung } from '../lib/auswertung'

interface Props {
  standorte: Standort[]
  daten: Daten
  ausgewaehltId: string | null
  onAuswahl: (id: string) => void
  ausgeblendeteAusgestiegene: number
}

export function Liste({ standorte, daten, ausgewaehltId, onAuswahl, ausgeblendeteAusgestiegene }: Props) {
  const sortiert = [...standorte].sort((a, b) => a.name.localeCompare(b.name, 'de'))

  return (
    <div className="liste">
      <div className="liste-kopf">
        <h2 className="display">Läden</h2>
        <span>{standorte.length} {standorte.length === 1 ? 'Eintrag' : 'Einträge'}</span>
      </div>

      {sortiert.length === 0 && (
        <p className="leer">Keine Läden für diesen Filter.</p>
      )}

      <ul className="liste-eintraege">
        {sortiert.map((s) => {
          const b = belegung(daten, s)
          return (
            <li key={s.id}>
              <button
                type="button"
                className="eintrag"
                aria-current={s.id === ausgewaehltId ? 'true' : undefined}
                onClick={() => onAuswahl(s.id)}
              >
                <i className="punkt" style={{ background: STATUS_INFO[s.status].farbe }} aria-hidden="true" />
                <span className="eintrag-text">
                  <b>{s.name}</b>
                  <span>{STATUS_INFO[s.status].label} · {s.ort}</span>
                </span>
                {s.variante === 'mit_werbung' && (s.status === 'live' || b.belegt > 0) ? (
                  <span className={`badge ${b.frei > 0 ? 'badge-frei' : 'badge-voll'}`}>
                    {b.frei > 0 ? `${b.frei} frei` : 'voll'}
                  </span>
                ) : s.variante === 'ohne_werbung' ? (
                  <span className="badge badge-neutral">ohne Werbung</span>
                ) : null}
              </button>
            </li>
          )
        })}
      </ul>

      {ausgeblendeteAusgestiegene > 0 && (
        <p className="liste-hinweis">
          {ausgeblendeteAusgestiegene === 1
            ? '1 ausgestiegener Laden ist ausgeblendet.'
            : `${ausgeblendeteAusgestiegene} ausgestiegene Läden sind ausgeblendet.`}
        </p>
      )}
    </div>
  )
}
