// Hauptkomponente: hält den Zustand der Oberfläche und setzt Liste, Karte und Details zusammen.

import { useEffect, useState } from 'react'
import type { Position, Standort, Status } from './types'
import { STATUS_INFO, STATUS_LISTE } from './types'
import { useDaten } from './data/useDaten'
import { kennzahlen } from './lib/auswertung'
import { Karte } from './components/Karte'
import { Liste } from './components/Liste'
import { Details } from './components/Details'
import { StandortFormular } from './components/StandortFormular'
import { DarstellungsKnopf } from './components/DarstellungsKnopf'
import { useIstMobil } from './lib/useIstMobil'

type Modus = { art: 'ansehen' } | { art: 'neu' } | { art: 'bearbeiten'; id: string }
type Filter = Status | 'alle'

export default function App() {
  const {
    daten,
    speicherFehler,
    standortSpeichern,
    statusAendern,
    standortLoeschen,
    beispieldatenWiederherstellen,
  } = useDaten()

  const istMobil = useIstMobil()
  const [ausgewaehltId, setAusgewaehltId] = useState<string | null>(null)
  const [modus, setModus] = useState<Modus>({ art: 'ansehen' })
  const [platzieren, setPlatzieren] = useState(false)
  const [entwurfPosition, setEntwurfPosition] = useState<Position | null>(null)
  const [filter, setFilter] = useState<Filter>('alle')
  const [zeigeAusgestiegene, setZeigeAusgestiegene] = useState(false)
  const [tab, setTab] = useState<'karte' | 'liste'>('karte')

  const formularOffen = modus.art !== 'ansehen'

  function passtZumFilter(s: Standort, f: Filter = filter, zeigeAus = zeigeAusgestiegene): boolean {
    if (f !== 'alle') return s.status === f
    return s.status !== 'ausgestiegen' || zeigeAus
  }

  const sichtbare = daten.standorte.filter((s) => passtZumFilter(s))
  const anzahlAusgestiegen = daten.standorte.filter((s) => s.status === 'ausgestiegen').length
  const ausgeblendet = filter === 'alle' && !zeigeAusgestiegene ? anzahlAusgestiegen : 0
  const ausgewaehlt = daten.standorte.find((s) => s.id === ausgewaehltId) ?? null
  const k = kennzahlen(daten)

  // Escape bricht das Setzen eines Pins ab
  useEffect(() => {
    if (!platzieren) return
    const beiTaste = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPlatzieren(false)
        if (modus.art === 'neu' && !entwurfPosition) setModus({ art: 'ansehen' })
      }
    }
    window.addEventListener('keydown', beiTaste)
    return () => window.removeEventListener('keydown', beiTaste)
  }, [platzieren, modus.art, entwurfPosition])

  function formularSchliessen() {
    setModus({ art: 'ansehen' })
    setPlatzieren(false)
    setEntwurfPosition(null)
  }

  function auswaehlen(id: string) {
    if (formularOffen && !window.confirm('Das Formular ist noch offen. Eingaben verwerfen?')) return
    formularSchliessen()
    setAusgewaehltId(id)
    if (istMobil) setTab('karte')
  }

  function neuerLaden() {
    setAusgewaehltId(null)
    setEntwurfPosition(null)
    setModus({ art: 'neu' })
    setPlatzieren(true)
    if (istMobil) setTab('karte')
  }

  function bearbeiten() {
    if (!ausgewaehlt) return
    setEntwurfPosition({ lat: ausgewaehlt.lat, lng: ausgewaehlt.lng })
    setModus({ art: 'bearbeiten', id: ausgewaehlt.id })
  }

  function positionWaehlen() {
    setPlatzieren(true)
    if (istMobil) setTab('karte')
  }

  function aufKarteGesetzt(p: Position) {
    setEntwurfPosition(p)
    setPlatzieren(false)
  }

  function speichern(s: Standort) {
    standortSpeichern(s)
    // Damit der gespeicherte Laden sichtbar ist, Filter ggf. lockern
    if (!passtZumFilter(s)) {
      setFilter('alle')
      if (s.status === 'ausgestiegen') setZeigeAusgestiegene(true)
    }
    formularSchliessen()
    setAusgewaehltId(s.id)
  }

  function loeschen(id: string) {
    standortLoeschen(id)
    formularSchliessen()
    setAusgewaehltId(null)
  }

  function zuruecksetzen() {
    if (window.confirm('Alle Änderungen verwerfen und die Beispieldaten neu laden?')) {
      formularSchliessen()
      setAusgewaehltId(null)
      beispieldatenWiederherstellen()
    }
  }

  const zaehler = (st: Status) => daten.standorte.filter((s) => s.status === st).length
  const detailsOffen = formularOffen || ausgewaehlt !== null

  let detailInhalt
  if (modus.art === 'neu') {
    detailInhalt = (
      <StandortFormular
        key="neu"
        position={entwurfPosition}
        platzieren={platzieren}
        onPositionWaehlen={positionWaehlen}
        onSpeichern={speichern}
        onAbbrechen={formularSchliessen}
      />
    )
  } else if (modus.art === 'bearbeiten') {
    const vorlage = daten.standorte.find((s) => s.id === modus.id)
    detailInhalt = vorlage && (
      <StandortFormular
        key={vorlage.id}
        vorlage={vorlage}
        position={entwurfPosition}
        platzieren={platzieren}
        onPositionWaehlen={positionWaehlen}
        onSpeichern={speichern}
        onAbbrechen={formularSchliessen}
        onLoeschen={loeschen}
      />
    )
  } else if (ausgewaehlt) {
    detailInhalt = (
      <Details
        standort={ausgewaehlt}
        daten={daten}
        onStatusAendern={statusAendern}
        onBearbeiten={bearbeiten}
        onSchliessen={() => setAusgewaehltId(null)}
      />
    )
  } else {
    detailInhalt = (
      <div className="platzhalter">
        Tippe auf einen Pin oder einen Laden in der Liste, um Details zu sehen.
      </div>
    )
  }

  return (
    <div className="app" data-tab={tab}>
      <header className="kopf">
        <div className="marke">
          <div className="logo" aria-hidden="true">JB</div>
          <div>
            <div className="display marke-name">JB Digital</div>
            <small>Standorte &amp; Werbeplätze</small>
          </div>
        </div>
        <div className="kopf-aktionen">
          <DarstellungsKnopf />
          <button type="button" className="btn btn-primaer btn-gross" onClick={neuerLaden} aria-label="Neuer Laden">
            <span aria-hidden="true">＋</span>
            <span className="wort-lang">Neuer Laden</span>
            <span className="wort-kurz">Neu</span>
          </button>
        </div>
      </header>

      <div className="werkzeugleiste">
        <div className="chips" role="group" aria-label="Nach Status filtern">
          <button type="button" className="chip" aria-pressed={filter === 'alle'} onClick={() => setFilter('alle')}>
            Alle <span className="n">{daten.standorte.length - ausgeblendet}</span>
          </button>
          {STATUS_LISTE.map((st) => (
            <button
              key={st}
              type="button"
              className="chip"
              aria-pressed={filter === st}
              onClick={() => setFilter(filter === st ? 'alle' : st)}
            >
              <i className="punkt" style={{ background: STATUS_INFO[st].farbe }} aria-hidden="true" />
              {STATUS_INFO[st].label} <span className="n">{zaehler(st)}</span>
            </button>
          ))}
        </div>
        <div className="werkzeugleiste-unten">
          <label className="schalter">
            <input
              type="checkbox"
              checked={zeigeAusgestiegene}
              onChange={(e) => setZeigeAusgestiegene(e.target.checked)}
              disabled={filter !== 'alle'}
            />
            Ausgestiegene <span className="wort-lang">einblenden</span> ({anzahlAusgestiegen})
          </label>
          <div className="kennzahlen">
            <span><b>{k.live}</b> live</span>
            <span><b>{k.plaetzeBelegt}</b> <span className="wort-lang">Werbeplätze</span> belegt</span>
            <span><b>{k.plaetzeFrei}</b> frei</span>
          </div>
        </div>
      </div>

      <div className="tabs-mobil" role="tablist" aria-label="Ansicht">
        <button type="button" role="tab" aria-selected={tab === 'karte'} onClick={() => setTab('karte')}>
          Karte
        </button>
        <button type="button" role="tab" aria-selected={tab === 'liste'} onClick={() => setTab('liste')}>
          Liste ({sichtbare.length})
        </button>
      </div>

      <main className="hauptbereich">
        <section className="spalte-liste panel" aria-label="Liste der Läden">
          <Liste
            standorte={sichtbare}
            daten={daten}
            ausgewaehltId={ausgewaehltId}
            onAuswahl={auswaehlen}
            ausgeblendeteAusgestiegene={ausgeblendet}
          />
        </section>

        <section className="spalte-karte" aria-label="Karte">
          <Karte
            standorte={sichtbare}
            ausgewaehltId={ausgewaehltId}
            onAuswahl={auswaehlen}
            platzieren={platzieren}
            onPlatzieren={aufKarteGesetzt}
            entwurfPosition={formularOffen ? entwurfPosition : null}
            sichtbar={!istMobil || tab === 'karte'}
          />
          {platzieren && (
            <button type="button" className="btn platzier-abbrechen" onClick={() => {
              setPlatzieren(false)
              if (modus.art === 'neu' && !entwurfPosition) setModus({ art: 'ansehen' })
            }}>
              Abbrechen
            </button>
          )}
        </section>

        <aside
          className={`spalte-details panel${detailsOffen ? ' offen' : ''}${platzieren ? ' beim-platzieren' : ''}`}
          aria-label="Details"
        >
          {detailInhalt}
        </aside>
      </main>

      <footer className="fuss">
        <span>
          {speicherFehler
            ? 'Speichern im Browser nicht möglich – Änderungen gehen beim Schließen verloren.'
            : 'Nur erfundene Beispieldaten. Änderungen werden in diesem Browser gespeichert.'}
        </span>
        <button type="button" className="btn-text" onClick={zuruecksetzen}>
          Beispieldaten wiederherstellen
        </button>
      </footer>
    </div>
  )
}
