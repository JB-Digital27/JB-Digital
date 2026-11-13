// Detailansicht eines Ladens (öffnet sich nach Klick auf Pin oder Listeneintrag).

import type { CSSProperties } from 'react'

import type { Daten, Standort, Status } from '../types'
import { STATUS_INFO, STATUS_LISTE, VARIANTE_LABEL } from '../types'
import { aktiveWerbung, belegung, kuenftigeBuchungen } from '../lib/auswertung'
import { datumAnzeigen, datumKurz } from '../lib/datum'

interface Props {
  standort: Standort
  daten: Daten
  onStatusAendern: (id: string, status: Status) => void
  onBearbeiten: () => void
  onSchliessen: () => void
}

function zeitraum(von: string, bis: string | null): string {
  return bis ? `${datumKurz(von)} – ${datumKurz(bis)}` : `seit ${datumKurz(von)}`
}

export function Details({ standort: s, daten, onStatusAendern, onBearbeiten, onSchliessen }: Props) {
  const b = belegung(daten, s)
  const werbung = aktiveWerbung(daten, s.id)
  const kuenftig = kuenftigeBuchungen(daten, s.id)
  const gespraeche = daten.gespraeche
    .filter((g) => g.standortId === s.id)
    .sort((x, y) => y.datum.localeCompare(x.datum))
    .slice(0, 3)
  const mitWerbung = s.variante === 'mit_werbung'
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${s.lat.toFixed(6)},${s.lng.toFixed(6)}`

  return (
    <article className="karte-details">
      <div className="zeile">
        <span
          className="status-badge"
          style={{ '--status': STATUS_INFO[s.status].farbe } as CSSProperties}
        >
          {STATUS_INFO[s.status].label}
        </span>
        <div className="zeile-aktionen">
          <button type="button" className="btn btn-klein" onClick={onBearbeiten}>
            Bearbeiten
          </button>
          <button type="button" className="icon-btn icon-btn-klein" onClick={onSchliessen} aria-label="Schließen">
            ✕
          </button>
        </div>
      </div>

      <div>
        <h2 className="display titel">{s.name}</h2>
        <p className="gedaempft">
          {[s.adresse, s.ort].filter(Boolean).join(', ') || 'Keine Adresse eingetragen'}
        </p>
        <a href={mapsLink} target="_blank" rel="noreferrer" className="klein">
          In Google Maps öffnen
        </a>
      </div>

      <label className="feld">
        Status ändern
        <select
          className="eingabe"
          value={s.status}
          onChange={(e) => onStatusAendern(s.id, e.target.value as Status)}
        >
          {STATUS_LISTE.map((st) => (
            <option key={st} value={st}>{STATUS_INFO[st].label}</option>
          ))}
        </select>
      </label>

      <div className="fakten">
        <div>
          <small>Variante</small>
          <b>{VARIANTE_LABEL[s.variante]}</b>
        </div>
        <div>
          <small>Werbeplätze</small>
          <b>{mitWerbung ? `${b.belegt} / ${b.gesamt} belegt` : '–'}</b>
        </div>
        <div>
          <small>Frei</small>
          <b className={mitWerbung && b.frei > 0 ? 'text-gruen' : ''}>
            {mitWerbung ? b.frei : '–'}
          </b>
        </div>
      </div>
      {b.ueberbucht && (
        <p className="warnung">Achtung: Mehr Buchungen als Werbeplätze.</p>
      )}

      <section>
        <h3 className="abschnitt">Nächster Termin</h3>
        {s.naechsterTermin ? (
          <p className="termin">
            <b>{datumAnzeigen(s.naechsterTermin)}</b>
            {s.terminInfo && <span>{s.terminInfo}</span>}
          </p>
        ) : (
          <p className="leer">Kein Termin eingetragen.</p>
        )}
      </section>

      {mitWerbung && (
        <section>
          <h3 className="abschnitt">Wer wirbt hier</h3>
          {werbung.length === 0 ? (
            <p className="leer">Aktuell keine Werbung gebucht.</p>
          ) : (
            <ul className="werbung-liste">
              {werbung.map(({ buchung, werbetreibender }) => (
                <li key={buchung.id}>
                  <span className="werbung-text">
                    <b>{werbetreibender?.name ?? 'Unbekannt'}</b>
                    <span>{werbetreibender?.branche} · {zeitraum(buchung.von, buchung.bis)}</span>
                  </span>
                  <span className="werbung-preis">{buchung.preisMonat} €/Monat</span>
                </li>
              ))}
            </ul>
          )}
          {kuenftig.length > 0 && (
            <p className="klein gedaempft">
              Demnächst: {kuenftig.map((k) => `${k.werbetreibender?.name ?? 'Unbekannt'} ab ${datumKurz(k.buchung.von)}`).join(', ')}
            </p>
          )}
        </section>
      )}

      <section>
        <h3 className="abschnitt">Notizen</h3>
        {s.notiz ? <p className="notiz">{s.notiz}</p> : <p className="leer">Keine Notizen.</p>}
      </section>

      {gespraeche.length > 0 && (
        <section>
          <h3 className="abschnitt">Letzte Gespräche</h3>
          <ul className="gespraeche">
            {gespraeche.map((g) => (
              <li key={g.id}>
                <span className="gedaempft klein">{datumKurz(g.datum)} · {g.wer}</span>
                <span>{g.inhalt}</span>
                {g.naechsterSchritt && (
                  <span className="klein">Nächster Schritt: {g.naechsterSchritt}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
