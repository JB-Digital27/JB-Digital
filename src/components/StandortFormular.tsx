// Formular zum Anlegen und Bearbeiten eines Ladens.

import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Position, Standort, Status, Variante } from '../types'
import { STANDARD_WERBEPLAETZE, STATUS_INFO, STATUS_LISTE, VARIANTE_LABEL } from '../types'
import { heute, neueId } from '../lib/datum'

interface Props {
  /** undefined = neuer Laden */
  vorlage?: Standort
  position: Position | null
  platzieren: boolean
  onPositionWaehlen: () => void
  onSpeichern: (s: Standort) => void
  onAbbrechen: () => void
  onLoeschen?: (id: string) => void
}

export function StandortFormular({
  vorlage,
  position,
  platzieren,
  onPositionWaehlen,
  onSpeichern,
  onAbbrechen,
  onLoeschen,
}: Props) {
  const [name, setName] = useState(vorlage?.name ?? '')
  const [status, setStatus] = useState<Status>(vorlage?.status ?? 'idee')
  const [variante, setVariante] = useState<Variante>(vorlage?.variante ?? 'mit_werbung')
  const [werbeplaetze, setWerbeplaetze] = useState(
    String(vorlage?.werbeplaetze || STANDARD_WERBEPLAETZE),
  )
  const [adresse, setAdresse] = useState(vorlage?.adresse ?? '')
  const [ort, setOrt] = useState(vorlage?.ort ?? '')
  const [notiz, setNotiz] = useState(vorlage?.notiz ?? '')
  const [termin, setTermin] = useState(vorlage?.naechsterTermin ?? '')
  const [terminInfo, setTerminInfo] = useState(vorlage?.terminInfo ?? '')
  const [fehler, setFehler] = useState<string | null>(null)
  const [loeschenFragen, setLoeschenFragen] = useState(false)

  function absenden(e: FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setFehler('Bitte einen Namen eingeben.')
      return
    }
    if (!position) {
      setFehler('Bitte den Standort auf der Karte setzen.')
      return
    }
    const plaetze = Math.round(Number(werbeplaetze))
    if (variante === 'mit_werbung' && (!Number.isFinite(plaetze) || plaetze < 1 || plaetze > 20)) {
      setFehler('Werbeplätze: bitte eine Zahl zwischen 1 und 20.')
      return
    }
    onSpeichern({
      id: vorlage?.id ?? neueId(),
      name: name.trim(),
      status,
      variante,
      werbeplaetze: variante === 'mit_werbung' ? plaetze : 0,
      adresse: adresse.trim(),
      ort: ort.trim(),
      notiz: notiz.trim(),
      naechsterTermin: termin || null,
      terminInfo: termin ? terminInfo.trim() : '',
      lat: position.lat,
      lng: position.lng,
      erstelltAm: vorlage?.erstelltAm ?? heute(),
    })
  }

  return (
    <form className="karte-details formular" onSubmit={absenden} noValidate>
      <div className="zeile">
        <h2 className="display titel-klein">{vorlage ? 'Laden bearbeiten' : 'Neuer Laden'}</h2>
        <button type="button" className="icon-btn icon-btn-klein" onClick={onAbbrechen} aria-label="Abbrechen">
          ✕
        </button>
      </div>

      <div className="positionsbox">
        <span>
          {platzieren
            ? 'Tippe jetzt auf die Karte …'
            : position
              ? '✓ Standort auf der Karte gesetzt'
              : 'Noch kein Standort gesetzt'}
        </span>
        {!platzieren && (
          <button type="button" className="btn btn-klein" onClick={onPositionWaehlen}>
            {position ? 'Ändern' : 'Auf Karte setzen'}
          </button>
        )}
      </div>

      <label className="feld">
        Name *
        <input
          className="eingabe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="z. B. Döner Muster"
          autoFocus={!vorlage}
        />
      </label>

      <div className="zwei">
        <label className="feld">
          Status
          <select className="eingabe" value={status} onChange={(e) => setStatus(e.target.value as Status)}>
            {STATUS_LISTE.map((st) => (
              <option key={st} value={st}>{STATUS_INFO[st].label}</option>
            ))}
          </select>
        </label>
        <label className="feld">
          Variante
          <select className="eingabe" value={variante} onChange={(e) => setVariante(e.target.value as Variante)}>
            {(Object.keys(VARIANTE_LABEL) as Variante[]).map((v) => (
              <option key={v} value={v}>{VARIANTE_LABEL[v]}</option>
            ))}
          </select>
        </label>
      </div>

      {variante === 'mit_werbung' && (
        <label className="feld">
          Werbeplätze auf dem Bildschirm
          <input
            className="eingabe"
            type="number"
            inputMode="numeric"
            min={1}
            max={20}
            value={werbeplaetze}
            onChange={(e) => setWerbeplaetze(e.target.value)}
          />
        </label>
      )}

      <div className="zwei">
        <label className="feld">
          Straße und Nr.
          <input className="eingabe" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
        </label>
        <label className="feld">
          Ort
          <input className="eingabe" value={ort} onChange={(e) => setOrt(e.target.value)} placeholder="z. B. Gütersloh" />
        </label>
      </div>

      <label className="feld">
        Notiz
        <textarea className="eingabe" rows={3} value={notiz} onChange={(e) => setNotiz(e.target.value)} />
      </label>

      <div className="zwei">
        <label className="feld">
          Nächster Termin
          <input className="eingabe" type="date" value={termin} onChange={(e) => setTermin(e.target.value)} />
        </label>
        <label className="feld">
          Worum geht es?
          <input
            className="eingabe"
            value={terminInfo}
            onChange={(e) => setTerminInfo(e.target.value)}
            placeholder="z. B. Vertrag unterschreiben"
            disabled={!termin}
          />
        </label>
      </div>

      {fehler && <p className="fehler" role="alert">{fehler}</p>}

      <div className="formular-aktionen">
        <button type="submit" className="btn btn-primaer">Speichern</button>
        <button type="button" className="btn" onClick={onAbbrechen}>Abbrechen</button>
      </div>

      {vorlage && onLoeschen && (
        <>
          <hr />
          {loeschenFragen ? (
            <div className="bestaetigen">
              <span>
                „{vorlage.name}“ wirklich löschen? Buchungen und Gespräche zu diesem Laden werden mitgelöscht.
                Tipp: Statt zu löschen kannst du den Status auf „Ausgestiegen“ setzen.
              </span>
              <div className="formular-aktionen">
                <button type="button" className="btn btn-gefahr" onClick={() => onLoeschen(vorlage.id)}>
                  Endgültig löschen
                </button>
                <button type="button" className="btn" onClick={() => setLoeschenFragen(false)}>
                  Behalten
                </button>
              </div>
            </div>
          ) : (
            <button type="button" className="btn-text-gefahr" onClick={() => setLoeschenFragen(true)}>
              Laden löschen
            </button>
          )}
        </>
      )}
    </form>
  )
}
