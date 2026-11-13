// Die Karte mit farbigen Pins (Farbe = Status).

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, Tooltip, useMap, useMapEvents } from 'react-leaflet'
import type { Position, Standort, Status } from '../types'
import { STATUS_INFO, STATUS_LISTE } from '../types'

// Mitte des Kreises Gütersloh
const START_MITTE: [number, number] = [51.93, 8.39]
const START_ZOOM = 11

const pinCache = new Map<string, L.DivIcon>()

function pinIcon(status: Status, ausgewaehlt: boolean): L.DivIcon {
  const key = `${status}-${ausgewaehlt}`
  let icon = pinCache.get(key)
  if (!icon) {
    const klasse = ['pin', `pin-${status}`, ausgewaehlt ? 'pin-aktiv' : ''].join(' ')
    icon = L.divIcon({
      className: 'pin-huelle',
      html: `<span class="${klasse}" style="--pin:${STATUS_INFO[status].farbe}"></span>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    })
    pinCache.set(key, icon)
  }
  return icon
}

const entwurfIcon = L.divIcon({
  className: 'pin-huelle',
  html: '<span class="pin-entwurf"></span>',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
})

/** Reagiert auf Klicks in die Karte (nur im Platzier-Modus). */
function KlickAufKarte({ aktiv, onKlick }: { aktiv: boolean; onKlick: (p: Position) => void }) {
  useMapEvents({
    click(e) {
      if (aktiv) onKlick({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
  })
  return null
}

/** Fährt zum ausgewählten Laden, falls er gerade nicht im Bild ist. */
function ZumAusgewaehlten({ lat, lng }: { lat?: number; lng?: number }) {
  const map = useMap()
  useEffect(() => {
    if (lat === undefined || lng === undefined) return
    const punkt = L.latLng(lat, lng)
    if (!map.getBounds().pad(-0.15).contains(punkt)) {
      map.flyTo(punkt, Math.max(map.getZoom(), 13), { duration: 0.6 })
    }
  }, [map, lat, lng])
  return null
}

/** Beim ersten Anzeigen so zoomen, dass alle Pins zu sehen sind. */
function AnfangsAusschnitt({ standorte }: { standorte: Standort[] }) {
  const map = useMap()
  const erledigt = useRef(false)
  useEffect(() => {
    if (erledigt.current || standorte.length === 0) return
    erledigt.current = true
    const grenzen = L.latLngBounds(standorte.map((s) => [s.lat, s.lng] as [number, number]))
    map.fitBounds(grenzen, { padding: [40, 40], maxZoom: 14 })
  }, [map, standorte])
  return null
}

/** Leaflet muss neu messen, wenn die Karte (z. B. am Handy) wieder eingeblendet wird. */
function GroesseAnpassen({ sichtbar }: { sichtbar: boolean }) {
  const map = useMap()
  useEffect(() => {
    if (!sichtbar) return
    const t = window.setTimeout(() => map.invalidateSize(), 50)
    return () => window.clearTimeout(t)
  }, [map, sichtbar])
  return null
}

interface Props {
  standorte: Standort[]
  ausgewaehltId: string | null
  onAuswahl: (id: string) => void
  platzieren: boolean
  onPlatzieren: (p: Position) => void
  entwurfPosition: Position | null
  sichtbar: boolean
}

export function Karte({
  standorte,
  ausgewaehltId,
  onAuswahl,
  platzieren,
  onPlatzieren,
  entwurfPosition,
  sichtbar,
}: Props) {
  const ausgewaehlt = standorte.find((s) => s.id === ausgewaehltId)

  return (
    <div className={`karte-huelle${platzieren ? ' platzieren' : ''}`}>
      <MapContainer
        center={START_MITTE}
        zoom={START_ZOOM}
        className="karte"
        zoomControl
        attributionControl
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende'
          maxZoom={19}
        />
        <KlickAufKarte aktiv={platzieren} onKlick={onPlatzieren} />
        <ZumAusgewaehlten lat={ausgewaehlt?.lat} lng={ausgewaehlt?.lng} />
        <GroesseAnpassen sichtbar={sichtbar} />
        <AnfangsAusschnitt standorte={standorte} />

        {standorte.map((s) => (
          <Marker
            key={s.id}
            position={[s.lat, s.lng]}
            icon={pinIcon(s.status, s.id === ausgewaehltId)}
            zIndexOffset={s.id === ausgewaehltId ? 1000 : 0}
            eventHandlers={{ click: () => !platzieren && onAuswahl(s.id) }}
            keyboard
            title={`${s.name} – ${STATUS_INFO[s.status].label}`}
          >
            <Tooltip direction="top" offset={[0, -14]}>
              {s.name}
            </Tooltip>
          </Marker>
        ))}

        {entwurfPosition && (
          <Marker position={[entwurfPosition.lat, entwurfPosition.lng]} icon={entwurfIcon} interactive={false} />
        )}
      </MapContainer>

      {platzieren && (
        <div className="platzier-hinweis" role="status">
          Tippe auf die Karte, wo der Laden ist.
        </div>
      )}

      <div className="legende" aria-label="Legende">
        {STATUS_LISTE.map((st) => (
          <span key={st}>
            <i className="punkt" style={{ background: STATUS_INFO[st].farbe }} aria-hidden="true" />
            {STATUS_INFO[st].label}
          </span>
        ))}
      </div>
    </div>
  )
}
