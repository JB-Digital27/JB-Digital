# JB Digital – Internes Tool

## Zweck
Interne Website nur für Joel und Baraa (Gesellschafter der JB Digital GbR).
JB Digital stellt kleinen Läden und Imbissen kostenlos digitale Speisekarten
auf Bildschirmen bereit. Die Bildschirme sind gleichzeitig Werbefläche für
andere lokale Firmen. Die Bildschirme bleiben unser Eigentum. Wir verdienen
an Werbeplätzen (50 €/Monat pro Platz und Laden) oder an Läden ohne Werbung
(99 € Installation + 50 €/Monat).

Das Tool ersetzt Zettel und Tabellen: Wir sehen auf einen Blick, wo unsere
Bildschirme hängen, wer dort wirbt und mit welchen Läden wir gerade sprechen.

## Funktionen
1. Interaktive Karte mit Pins für Läden (Standorte)
   - Pin-Farbe nach Status: Idee, angesprochen, unsicher, Zusage, Vertrag, live, ausgestiegen
   - Klick auf Pin: Name, Status, Variante (mit/ohne Werbung), Werbeplätze belegt/frei,
     aktuelle Werbetreibende, Notizen, nächster Termin
2. Neue Kontakte eintragen: Klick auf die Karte setzt einen Pin, Formular für Name,
   Status, Notiz. Status später änderbar.
3. Suche über Läden, Werbetreibende und Notizen
4. Einnahmenrechner: Plan (Läden × Spots × Auslastung × Preis, minus ca. 7 €
   Software pro Bildschirm/Monat) und Ist-Stand aus echten Buchungen.
   Warnung bei Annäherung an 25.000 € Jahresumsatz (Kleinunternehmerregelung).

## Daten
- standorte, werbetreibende, buchungen (wer wirbt wo, Preis, Zeitraum,
  Vorauszahlung), gespraeche (Datum, wer, Inhalt, nächster Schritt)

## Technik
- React + Vite + TypeScript, Karte mit react-leaflet und OpenStreetMap
- Backend später: Supabase (EU-Region Frankfurt) für Datenbank und Login
- Hosting: Anbieter, der gewerbliche Nutzung im Gratis-Tarif erlaubt (nicht Vercel Hobby)

## Regeln
- Oberfläche auf Deutsch, einfach und mobil nutzbar
- Ich bin Anfänger: Schritte und Fachbegriffe kurz erklären, vor größeren
  Änderungen einen Plan zeigen
- Keine Passwörter oder Schlüssel in den Code, nur in .env (nicht ins Repo)
- Bis Login und Supabase stehen: nur erfundene Beispieldaten, keine echten Kundendaten
- Design-Vorlagen liegen im Ordner design/. Der Code ist die maßgebliche Version.

## Stand
- Build 1: lokal mit Beispieldaten (Karte, Pins, Formular, Status) – umgesetzt
  (Speicherung in localStorage über src/data/useDaten.ts, 6 Werbeplätze als Standard,
  Ausgestiegene bleiben gespeichert und sind per Filter einblendbar)
