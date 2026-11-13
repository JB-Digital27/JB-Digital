# Partnerkarte – JB Digital

Interaktive Karte aller Werbeflächen und Werbepartner im Kreis Gütersloh.

## Struktur

```
JB-digital/
└── Partnerkarte/
    └── Design/
        └── index.html   ← aktueller Stand (eigenständige Webseite)
```

## Funktionen

- Echte Straßenkarte (OpenStreetMap, über Leaflet), Zoom bis auf Straßenebene
- Auf der Karte: nur Werbeflächen. Ein Klick zeigt, wer dort wirbt.
- Linke Liste: Werbeflächen und Werbepartner, mit Suche sowie Typ- und Ortsfilter
- Partner auswählen: Seine gebuchten Flächen werden auf der Karte blau markiert.
- Alles bearbeitbar: anlegen, ändern, löschen, Buchungen zuordnen
- Standort per Adresssuche (OpenStreetMap Nominatim) oder per Klick auf die Karte
- Kontaktdaten: Ansprechpartner, Telefon, E-Mail, Website, Google-Maps-Link
- Hell-/Dunkelmodus (folgt der Systemeinstellung, umschaltbar)
- Export/Import der Daten als JSON

## Nutzung

`Partnerkarte/Design/index.html` im Browser öffnen oder per GitHub Pages veröffentlichen
(Settings → Pages → Branch `main`, Ordner `/ (root)`; Aufruf dann unter `…/Partnerkarte/Design/`).

## Hinweise

- **Datenspeicherung:** Änderungen werden im Browser (localStorage) des jeweiligen Geräts gespeichert.
  Zum Austausch im Team die Daten über **Export** speichern und beim Partner per **Import** laden.
  Für gemeinsame Live-Daten ist ein Backend nötig (z. B. Supabase oder Firebase).
- **Beispieldaten:** Alle mitgelieferten Einträge („Muster“, „Beispiel“) sind Platzhalter.
- **Karte:** © OpenStreetMap-Mitwirkende. Die öffentlichen OSM-Kacheln sind für geringe Nutzung gedacht.
  Bei stärkerer Nutzung einen Kachel-Anbieter mit eigenem Schlüssel verwenden (z. B. MapTiler, Stadia Maps).
