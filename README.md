# JB Digital – Internes Tool

Interne Web-App für Joel und Baraa: Karte aller Läden mit unseren Bildschirmen,
Status der Gespräche und Belegung der Werbeplätze.

> **Stand: Build 1** – läuft lokal im Browser mit **erfundenen Beispieldaten**.
> Noch kein Login, keine gemeinsame Datenbank.

## Starten (einmalig einrichten)

Voraussetzung: [Node.js](https://nodejs.org) (Version 20 oder neuer) ist installiert.

1. Repository herunterladen und im Terminal in den Ordner wechseln.
2. Abhängigkeiten installieren (lädt die benötigten Bibliotheken in den Ordner `node_modules`):

   ```bash
   npm install
   ```

3. App starten:

   ```bash
   npm run dev
   ```

4. Die angezeigte Adresse öffnen, meist <http://localhost:5173>.

**Am Handy testen:** `npm run dev -- --host` starten und am Handy (im selben WLAN)
die angezeigte „Network“-Adresse öffnen.

## Online öffnen (GitHub Pages)

Adresse: **<https://jb-digital27.github.io/JB-Digital/>**

Bei jedem Push auf `main` baut GitHub die App automatisch neu und veröffentlicht sie
(siehe `.github/workflows/github-pages.yml`, Fortschritt unter dem Reiter „Actions“).

Einmalig einschalten: Repository → **Settings** → **Pages** → bei „Source“
**GitHub Actions** auswählen.

Hinweis: Die Seite ist öffentlich erreichbar (nicht in Suchmaschinen gelistet). Das ist
in Ordnung, solange nur Beispieldaten drin sind. Eingetragene Daten bleiben ohnehin nur
im Browser des jeweiligen Geräts. GitHub Pages ist nur eine Übergangslösung bis zum
endgültigen Hosting mit Login.

## Was Build 1 kann

- Karte (OpenStreetMap) mit Pins, Farbe je Status:
  Idee · Angesprochen · Unsicher · Zusage · Vertrag · Live · Ausgestiegen
- Klick auf einen Pin: Status, Variante (mit/ohne Werbung), Werbeplätze belegt/frei,
  aktuelle Werbetreibende, Notizen, nächster Termin, letzte Gespräche
- Status direkt in den Details ändern
- „Neuer Laden“: auf die Karte tippen, Formular ausfüllen, speichern
- Bearbeiten und Löschen
- Filter nach Status; Ausgestiegene sind ausgeblendet, aber gespeichert und einblendbar
- Hell-/Dunkelmodus, am Handy bedienbar

## Wichtig zu wissen

- **Daten liegen nur im Browser** des jeweiligen Geräts (localStorage).
  Joel und Baraa sehen also noch nicht dieselben Daten. Das ändert sich mit Supabase.
- **Nur Beispieldaten eintragen**, keine echten Kundendaten, bis Login und Supabase stehen.
- „Beispieldaten wiederherstellen“ (unten auf der Seite) setzt alles zurück.

## Aufbau des Codes

```
src/
├── types.ts                  Datenmodell (Standort, Werbetreibender, Buchung, Gespräch) + Status-Farben
├── data/
│   ├── beispieldaten.ts      Erfundene Beispieldaten
│   └── useDaten.ts           Laden & Speichern – wird später auf Supabase umgestellt
├── lib/
│   ├── auswertung.ts         Berechnungen (Belegung, aktive Buchungen, Kennzahlen)
│   ├── datum.ts              Datums-Helfer
│   └── useIstMobil.ts        Erkennt schmale Bildschirme
├── components/
│   ├── Karte.tsx             Karte mit Pins
│   ├── Liste.tsx             Liste der Läden
│   ├── Details.tsx           Detailansicht
│   ├── StandortFormular.tsx  Formular Neu/Bearbeiten
│   └── DarstellungsKnopf.tsx Hell/Dunkel
├── App.tsx                   Setzt alles zusammen
└── index.css                 Aussehen
design/
└── partnerkarte.html         Design-Vorlage (nur Referenz)
```

## Befehle

| Befehl | Was er tut |
|---|---|
| `npm run dev` | Startet die App zum Entwickeln (lädt bei Änderungen automatisch neu) |
| `npm run build` | Prüft den Code auf Fehler und baut die fertige Version in `dist/` |
| `npm run lint` | Sucht nach typischen Programmierfehlern |
| `npm run preview` | Zeigt die gebaute Version aus `dist/` an |

Kartendaten © OpenStreetMap-Mitwirkende.
