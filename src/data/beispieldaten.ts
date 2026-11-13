// ERFUNDENE Beispieldaten – keine echten Läden, Firmen oder Personen.
// Namen mit „Muster“/„Beispiel“, Adressen erfunden, Positionen nur grob im jeweiligen Ort.
// Termine und Zeiträume werden relativ zum heutigen Tag berechnet, damit die Daten nicht veralten.

import type { Daten } from '../types'
import { inTagen } from '../lib/datum'

export function erzeugeBeispieldaten(): Daten {
  const angelegt = inTagen(-90)

  return {
    standorte: [
      {
        id: 's1', name: 'Döner Muster', adresse: 'Musterstraße 1', ort: 'Gütersloh',
        lat: 51.9071, lng: 8.3812, status: 'live', variante: 'mit_werbung', werbeplaetze: 6,
        notiz: 'Viel Mittagskundschaft. Bildschirm hängt über der Theke.',
        naechsterTermin: inTagen(12), terminInfo: 'Kurz vorbeischauen, Inhalte prüfen',
        erstelltAm: angelegt,
      },
      {
        id: 's2', name: 'Pizzeria Beispiel', adresse: 'Beispielweg 4', ort: 'Rheda-Wiedenbrück',
        lat: 51.8478, lng: 8.3012, status: 'live', variante: 'mit_werbung', werbeplaetze: 6,
        notiz: 'Inhaber möchte Mittagsangebot wöchentlich ändern.',
        naechsterTermin: null, terminInfo: '', erstelltAm: angelegt,
      },
      {
        id: 's3', name: 'Café Muster', adresse: 'Am Musterplatz 2', ort: 'Verl',
        lat: 51.8832, lng: 8.5131, status: 'live', variante: 'ohne_werbung', werbeplaetze: 0,
        notiz: 'Wollte keine fremde Werbung. Zahlt 50 €/Monat.',
        naechsterTermin: null, terminInfo: '', erstelltAm: angelegt,
      },
      {
        id: 's4', name: 'Grillhaus Beispiel', adresse: 'Beispielstraße 10', ort: 'Rietberg',
        lat: 51.8013, lng: 8.4275, status: 'vertrag', variante: 'mit_werbung', werbeplaetze: 6,
        notiz: 'Vertrag unterschrieben, Bildschirm noch nicht montiert.',
        naechsterTermin: inTagen(5), terminInfo: 'Bildschirm montieren',
        erstelltAm: angelegt,
      },
      {
        id: 's5', name: 'Asia Imbiss Muster', adresse: 'Musterallee 7', ort: 'Halle (Westf.)',
        lat: 52.0598, lng: 8.3608, status: 'zusage', variante: 'mit_werbung', werbeplaetze: 6,
        notiz: 'Mündliche Zusage. Vertrag vorbereiten.',
        naechsterTermin: inTagen(3), terminInfo: 'Vertrag unterschreiben',
        erstelltAm: angelegt,
      },
      {
        id: 's6', name: 'Burger Beispiel', adresse: 'Beispielring 3', ort: 'Steinhagen',
        lat: 52.0081, lng: 8.4118, status: 'unsicher', variante: 'mit_werbung', werbeplaetze: 6,
        notiz: 'Sorge, dass der Bildschirm zu viel Platz braucht. Kleineres Modell zeigen?',
        naechsterTermin: inTagen(9), terminInfo: 'Zweites Gespräch mit Muster-Bildschirm',
        erstelltAm: angelegt,
      },
      {
        id: 's7', name: 'Kiosk Muster', adresse: 'Musterstraße 22', ort: 'Harsewinkel',
        lat: 51.9622, lng: 8.2287, status: 'angesprochen', variante: 'mit_werbung', werbeplaetze: 6,
        notiz: 'Flyer dagelassen. Inhaberin meldet sich.',
        naechsterTermin: null, terminInfo: '', erstelltAm: angelegt,
      },
      {
        id: 's8', name: 'Falafel Beispiel', adresse: 'Beispielgasse 5', ort: 'Gütersloh',
        lat: 51.9128, lng: 8.3936, status: 'angesprochen', variante: 'ohne_werbung', werbeplaetze: 0,
        notiz: 'Interesse an Variante ohne Werbung.',
        naechsterTermin: inTagen(16), terminInfo: 'Angebot vorstellen',
        erstelltAm: angelegt,
      },
      {
        id: 's9', name: 'Bäckerei Muster', adresse: 'Musterweg 9', ort: 'Schloß Holte-Stukenbrock',
        lat: 51.8995, lng: 8.6176, status: 'idee', variante: 'mit_werbung', werbeplaetze: 6,
        notiz: 'Gesehen beim Vorbeifahren, noch nicht angesprochen.',
        naechsterTermin: null, terminInfo: '', erstelltAm: angelegt,
      },
      {
        id: 's10', name: 'Imbiss Beispiel', adresse: 'Beispielstraße 14', ort: 'Versmold',
        lat: 52.0418, lng: 8.1521, status: 'ausgestiegen', variante: 'mit_werbung', werbeplaetze: 6,
        notiz: 'Laden schließt Ende des Jahres. Bildschirm abgeholt.',
        naechsterTermin: null, terminInfo: '', erstelltAm: angelegt,
      },
    ],

    werbetreibende: [
      { id: 'w1', name: 'Autohaus Beispiel', branche: 'Automobil', ansprechpartner: 'Thomas Muster', telefon: '05241 000001', email: 'kontakt@example.com', notiz: '' },
      { id: 'w2', name: 'Fahrschule Muster', branche: 'Fahrschule', ansprechpartner: 'Lena Beispiel', telefon: '05241 000002', email: 'info@example.com', notiz: 'Will vor allem junge Kundschaft erreichen.' },
      { id: 'w3', name: 'Fitnessstudio Beispiel', branche: 'Sport', ansprechpartner: 'Jonas Muster', telefon: '05242 000003', email: 'fitness@example.com', notiz: '' },
      { id: 'w4', name: 'Friseur Muster', branche: 'Friseur', ansprechpartner: 'Sabine Beispiel', telefon: '05242 000004', email: 'friseur@example.com', notiz: '' },
      { id: 'w5', name: 'Steuerbüro Beispiel', branche: 'Dienstleistung', ansprechpartner: 'Michael Muster', telefon: '05244 000005', email: 'steuer@example.com', notiz: '' },
    ],

    buchungen: [
      // Döner Muster: 4 von 6 Plätzen belegt
      { id: 'b1', standortId: 's1', werbetreibenderId: 'w1', preisMonat: 50, von: inTagen(-80), bis: null, vorauszahlung: 0 },
      { id: 'b2', standortId: 's1', werbetreibenderId: 'w2', preisMonat: 50, von: inTagen(-60), bis: inTagen(120), vorauszahlung: 300 },
      { id: 'b3', standortId: 's1', werbetreibenderId: 'w3', preisMonat: 50, von: inTagen(-30), bis: null, vorauszahlung: 0 },
      { id: 'b4', standortId: 's1', werbetreibenderId: 'w4', preisMonat: 50, von: inTagen(-10), bis: inTagen(80), vorauszahlung: 150 },
      // Pizzeria Beispiel: 2 von 6 Plätzen belegt, 1 Buchung bereits abgelaufen
      { id: 'b5', standortId: 's2', werbetreibenderId: 'w1', preisMonat: 50, von: inTagen(-50), bis: null, vorauszahlung: 0 },
      { id: 'b6', standortId: 's2', werbetreibenderId: 'w5', preisMonat: 50, von: inTagen(-40), bis: null, vorauszahlung: 600 },
      { id: 'b7', standortId: 's2', werbetreibenderId: 'w4', preisMonat: 50, von: inTagen(-200), bis: inTagen(-20), vorauszahlung: 0 },
      // Grillhaus Beispiel: Buchung startet erst, wenn der Bildschirm hängt
      { id: 'b8', standortId: 's4', werbetreibenderId: 'w2', preisMonat: 50, von: inTagen(14), bis: null, vorauszahlung: 0 },
    ],

    gespraeche: [
      { id: 'g1', standortId: 's5', datum: inTagen(-4), wer: 'Baraa', inhalt: 'Bildschirm-Muster gezeigt. Inhaber findet die Speisekarte gut.', naechsterSchritt: 'Vertrag mitbringen' },
      { id: 'g2', standortId: 's6', datum: inTagen(-7), wer: 'Joel', inhalt: 'Platz an der Wand ist knapp. Möchte erst überlegen.', naechsterSchritt: 'Kleineres Modell zeigen' },
      { id: 'g3', standortId: 's4', datum: inTagen(-12), wer: 'Joel', inhalt: 'Vertrag unterschrieben. Montage abgestimmt.', naechsterSchritt: 'Bildschirm montieren' },
      { id: 'g4', standortId: 's7', datum: inTagen(-2), wer: 'Baraa', inhalt: 'Kurz vorgestellt, Flyer dagelassen.', naechsterSchritt: 'Nächste Woche nachfragen' },
    ],
  }
}
