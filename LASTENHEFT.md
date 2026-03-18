# Lastenheft – PromptQuest v3.0

**Interaktive Lern-App für KI-Kompetenz im Alltag**
für den Education Circle im Hive Göppingen

| | |
|---|---|
| **Auftraggeber** | GARP Bildungszentrum e.V. |
| **Auftragnehmer** | Storytime – Inh. Nils Heck |
| **Version** | 1.0 |
| **Datum** | 14. März 2026 |
| **Ansprechpartner** | Simon Tillisch (GARP) |

---

## 1 Projektübersicht

PromptQuest ist eine webbasierte, interaktive Lern-App für Jugendliche im Alter von 12–16 Jahren. Die App wird im Rahmen des Education Circle im Hive Göppingen eingesetzt und vermittelt spielerisch die Grundlagen effektiven Promptings.

Im Mittelpunkt steht Prompting als Zukunftskompetenz, nicht als Technikthema, sondern als Denk- und Problemlösefähigkeit. Die Jugendlichen lernen anhand alltagsnaher Szenarien, wie sie KI-Systeme gezielt und sinnvoll einsetzen können. Der Fokus liegt auf erlebbaren Aha-Momenten statt theoretischer Wissensvermittlung.

### 1.1 Lernziele

- Verstehen, warum Rolle und Perspektive die Qualität einer KI-Antwort beeinflussen
- Erkennen, warum Kontext und Präzision entscheidend für brauchbare Ergebnisse sind
- Lernen, das gewünschte Ergebnis klar zu definieren (Ziel, Ton, Format, Länge)
- KI-Ergebnisse kritisch bewerten können
- KI als Werkzeug zur Unterstützung von Denken, Planung und Reflexion erleben – nicht als Ersatz

### 1.2 Projektziel

Fertigstellung und Einsatzbereitschaft der App spätestens 2 Wochen vor Beginn der Sommerferien Baden-Württemberg 2026.

---

## 2 Einsatzkontext & Rahmenbedingungen

### 2.1 Standort

Hive Göppingen – Education Circle. Die App wird als eine Station in einem Lernzirkel mit mehreren Stationen eingesetzt.

### 2.2 Geräte & Start der App

- Ca. 30 Tablets im Umlauf, die an die Jugendlichen ausgegeben werden
- Tablets werden stationsübergreifend genutzt

**Bevorzugter Startmechanismus:** QR-Code an der Station, der direkt zur Web-App führt. Die Jugendlichen scannen den Code mit dem Tablet-Browser und starten sofort. Alternativ: URL-Lesezeichen oder Hub-Portal des Hive.

### 2.3 Zeitrahmen pro Session

- Gesamtdauer des Lernzirkels: ca. 3 Stunden
- Verfügbare Zeit an unserer Station: ca. 15–20 Minuten
- Konsequenz: Schneller Einstieg, keine Registrierung, sofortiges Loslegen

### 2.4 Integration in den Education Circle

- Die Hive-Betreiber führen nach dem Zirkel intern einen Kahoot-Test durch (Multiple Choice)
- Unsere App liefert die Lerninhalte; der Kahoot-Test wird vom Hive eigenständig erstellt und durchgeführt

---

## 3 Funktionale Anforderungen

### 3.1 Startbildschirm & Szenario-Auswahl

Nach dem Aufrufen des Weblinks (via QR-Code) sehen die Jugendlichen einen Startbildschirm mit einer motivierenden Ansprache und einer Auswahl von 5 Szenarien:

| Nr. | Szenario | Themenfeld | Inhaltsstatus |
|-----|----------|------------|---------------|
| 1 | Schule | Praktikum, Referate, Prüfungsvorbereitung | Vollständig ausgearbeitet |
| 2 | Freizeit | Wochenendplanung, Gruppenaktivitäten | Vollständig ausgearbeitet |
| 3 | Liebe | Crush anschreiben, Valentinstag, Kommunikation | Vollständig ausgearbeitet |
| 4 | Familie | Haushaltsstress, Geburtstagsgrüße, Babysitting | Vollständig ausgearbeitet |
| 5 | Freunde | Konflikte, Gruppenentscheidungen | **Noch zu erstellen** |

- Auswahl durch Antippen einer Szenario-Kachel mit situativer Illustration
- Jedes Szenario ist eigenständig spielbar, keine feste Reihenfolge
- Kein Onboarding, kein Tutorial, direkter Einstieg

### 3.2 Aufgabenstruktur pro Szenario

Jedes Szenario besteht aus exakt 3 Aufgaben, die einem festen didaktischen Schema folgen. Jede Aufgabe präsentiert eine jugendgerechte Alltagssituation mit situativer Illustration.

#### Aufgabe 1 – Rolle und Perspektive vergeben

**Lernziel:** Die Perspektive / Rolle der KI beeinflusst die Qualität der Antwort.

**Mechanik:** Die Nutzer erhalten eine Alltagssituation und müssen einen Prompt formulieren, in dem sie der KI eine passende Rolle zuweisen (z.B. Berufsberater, Freizeitplaner, Kommunikationscoach, Mediator).

**KI-Interaktion:** Der Prompt wird live an das LLM gesendet. Die Antwort wird angezeigt und anschließend bewertet.

**Konkrete Aufgabenbeispiele pro Szenario:**

| Szenario | Situation | Erwartete Rolle |
|----------|-----------|-----------------|
| Schule | 8. Klasse, Praktikum steht an, keine Ahnung wo bewerben. Hobbys: draußen sein, Traum: Sänger/in werden. | Berufsberater/in für Jugendliche |
| Freizeit | Freundesgruppe will sich am Wochenende treffen. Einer will Schwimmbad, einer Zocken, einer Chillen. Endlose WhatsApp-Diskussion. | Freizeit-Coach oder Gruppenmoderator |
| Liebe | Findet jemanden aus der Klasse nett. Schreiben manchmal. Will nicht komisch oder verzweifelt wirken. | Kommunikationscoach für Jugendliche |
| Familie | Stress zu Hause: Eltern wollen mehr Hilfe im Haushalt. Gefühl, unfair behandelt zu werden gegenüber Geschwistern. | Neutraler Mediator / Familienberater |

#### Aufgabe 2 – Fehler erkennen und korrigieren

**Lernziel:** Kontext und genaue Informationen sind entscheidend – ein unpräziser Prompt führt zu falschen oder unpassenden Ergebnissen.

**Mechanik:** Es wird ein absichtlich schlechter Prompt zusammen mit einer vordefinierten Fehler-Antwort angezeigt. Die Nutzer müssen verstehen, warum das passiert ist, und den Prompt verbessern.

**KI-Interaktion:** Die Fehler-Antwort ist vordefiniert (kein LLM-Call). Der korrigierte Prompt wird live an das LLM gesendet.

**Konkrete Fehler-Szenarien:**

| Szenario | Schlechter Prompt | Fehler-Antwort | Was fehlt |
|----------|-------------------|----------------|-----------|
| Schule | "Schreib mir ein Referat über Jaguar." | KI liefert Referat über die Automarke statt das Tier | Kontext: Tier, Klasse, Länge, Format |
| Freizeit | "Was können wir am Wochenende machen?" | Museum, Wanderung, Brettspiel – passt nicht | Alter, Interessen, Budget, Wetter |
| Liebe | "Schreib mir eine Nachricht, damit sie/er mich mag." | Viel zu dramatisch und kitschig | Ton (locker), Kontakt, Alter, Länge |
| Familie | "Schreib einen Geburtstagsgruß für meine Mama." | Gruß für 70-Jährige, Mama ist 42 | Alter, Verhältnis, Ton, Länge |

#### Aufgabe 3 – Ergebnis klar definieren

**Lernziel:** Das gewünschte Ergebnis muss klar definiert werden (Ziel, Ton, Länge, Format, Rahmenbedingungen).

**Mechanik:** Eine Alltagssituation mit leichtem Zeitdruck oder konkretem Bedarf. Die Nutzer müssen einen umfassenden Prompt formulieren, der alle relevanten Informationen enthält.

**KI-Interaktion:** Der Prompt wird live an das LLM gesendet.

**Konkrete Ergebnis-Aufgaben:**

| Szenario | Situation | Erwartetes Ergebnisformat |
|----------|-----------|--------------------------|
| Schule | 20 Uhr, müde, morgen Abfrage Photosynthese, 20 Min. | Zusammenfassung + 5 Lehrerfragen + Antworten |
| Freizeit | Draußen treffen, 3 Stunden, wenig Geld, kein Stress | 3-Stunden-Plan mit Uhrzeiten + Schlechtwetter-Alternative |
| Liebe | Anonymer Valentinstag-Brief: ehrlich, nett, nicht peinlich | Max. 5 Sätze, 1 Kompliment + Wunsch, keine Übertreibung |
| Familie | 3-jährigen Bruder 2 Stunden beschäftigen | 5 Spielideen mit Anleitung, ungefährlich, drinnen |

### 3.3 Bewertungssystem

Nach jeder Aufgabe erhalten die Nutzer eine Bewertung:

| Sterne | Bedeutung | Feedback-Art |
|--------|-----------|-------------|
| ★☆☆ | Grundlegend richtig, deutliche Schwächen | Erklärung, was gefehlt hat und warum die KI diese Info braucht |
| ★★☆ | Guter Prompt mit Verbesserungspotenzial | Konkreter Hinweis zur Verbesserung |
| ★★★ | Sehr guter, vollständiger Prompt | Lob + Erklärung, warum das so gut funktioniert hat |

**Bewertungsmechanismus (Hybrid):**

- **Primär:** KI-gestützte Bewertung, der Prompt wird per LLM-API analysiert und anhand aufgabenspezifischer Kriterien bewertet
- **Fallback:** Regelbasierte Bewertung, bei API-Ausfall greift eine Checklisten-Auswertung
- Feedback ist immer ermutigend, altersgerecht und erklärt den Lerneffekt
- Die Sterne-Bewertung bildet die Grundlage für den späteren Kahoot-Test des Hive

### 3.4 KI-Integration

**LLM-Anbindung:** Integration von Claude Haiku (Anthropic) für:

- Live-Antworten auf die Prompts der Jugendlichen (Aufgaben 1, korrigierter Prompt in 2, und 3)
- KI-gestützte Bewertung der Prompt-Qualität

**Content-Safety:** Alle KI-Antworten werden jugendgerecht gefiltert. System-Prompts definieren: Lernhilfe statt Lösung, Ablehnung von Cheat-Prompts, altersgerechte Sprache, kein bedenklicher Content.

**Fehlerbehandlung:** Bei API-Timeout oder -Ausfall bleibt die App funktionsfähig (Fallback auf regelbasierte Bewertung, ggf. vordefinierte Beispiel-Antworten).

**Kostenkontrolle:** Pro Prompt ein LLM-Call. Rate Limiting zum Schutz vor Missbrauch.

**API-Kosten:** Die laufenden Kosten für die LLM-Nutzung (Claude Haiku) werden vom Hive / GARP selbst getragen. Eine Kostenkalkulation wird als Anlage zum Angebot mitgeliefert.

### 3.5 Erklärvideos (optional)

Zu jedem Szenario kann ein kurzes Erklärvideo bereitgestellt werden, das den Jugendlichen den Aufgabentyp und das Lernziel vor dem Start visuell vermittelt. Die Videos dienen als niedrigschwelliger Einstieg und können auch unabhängig von der App eingesetzt werden (z.B. als Intro an der Station).

- Umfang: ca. 30–60 Sekunden pro Video
- Anzahl: 5 Videos (eines pro Szenario)
- Format: Screencast mit Voice-Over oder animierte Kurzerklärung
- Dieser Posten wird als optionale Zusatzleistung im Angebot ausgewiesen

### 3.6 Visuelle Gestaltung & Illustrationen

Die App verwendet situative Illustrationen:

- Jede Aufgabe wird durch eine Illustration begleitet, die die beschriebene Alltagssituation visuell darstellt
- Illustrationen schaffen Identifikation und Immersion
- Stil: Modern, jugendgerecht, professionell
- Illustrationen werden als statische Grafiken eingebunden

**Umfang:** Ca. 15–20 Illustrationen (Szenario-Kacheln + Aufgaben-Illustrationen)

### 3.7 Navigation & Ablauf

- Linearer Ablauf innerhalb eines Szenarios: Aufgabe 1 → 2 → 3
- Vor jeder Aufgabe: Situationsbeschreibung mit Illustration
- Prompt-Eingabe über Textfeld
- Nach jeder Aufgabe: Sterne-Bewertung mit Feedback
- Nach Aufgabe 3: Zusammenfassung (Gesamtsterne, Kernerkenntnisse)
- Möglichkeit, zurück zur Szenario-Auswahl zu navigieren
- Kein Zurück-Button innerhalb einer Aufgabe

### 3.8 Session-Handling

- Kein Login, keine Registrierung, keine Datenspeicherung
- Anonymes Session-Handling. Session lebt nur im Browser
- Keine Speicherung von Prompts oder persönlichen Daten
- DSGVO-konform einsetzbar im Bildungsumfeld

---

## 4 Nicht-funktionale Anforderungen

### 4.1 Usability

- Maximale Zeit bis zum ersten Szenario-Start: < 10 Sekunden
- Selbsterklärend, keine Tutorials nötig
- Große Touch-Targets (min. 44px), gut lesbare Schrift
- Visuell klar, spielerisch, professionell
- Kurze, jugendgerechte Formulierungen – Nutzer werden geduzt

### 4.2 Performance

- Initiale Ladezeit: < 3 Sekunden auf Tablet mit WLAN
- KI-Antwortzeit: < 10 Sekunden (mit Ladeanimation)
- WLAN wird vorausgesetzt

### 4.3 Kompatibilität

- Optimiert für Tablets (Landscape und Portrait)
- Mindest-Browser: Chrome 90+, Safari 14+ (iOS), Edge 90+
- Responsive Design, Smartphones als nice-to-have
- Progressive Web App (PWA) als Option für Fullscreen-Modus

### 4.4 Barrierefreiheit

- Ausreichende Kontraste (WCAG AA)
- Schriftgröße mindestens 16px
- Keine rein farbbasierten Informationen

### 4.5 Sicherheit & Datenschutz

- Keine personenbezogenen Daten werden erhoben oder gespeichert
- Prompts werden nicht persistiert
- API-Keys serverseitig verwaltet, nie im Client exponiert
- Content-Filter für KI-Antworten (Jugendschutz)
- DSGVO-konform – kein Tracking, keine Cookies (außer Session)

---

## 5 Technische Anforderungen

### 5.1 Architektur

Webbasierte Anwendung bestehend aus:

- **Frontend:** React-basierte Single Page Application (SPA)
- **Backend:** Leichtgewichtiger API-Server (Node.js/Express oder Next.js API Routes)
- **Zweck des Backends:** Sichere API-Key-Verwaltung, LLM-Proxy, Content-Filtering, Rate Limiting

### 5.2 Hosting & Deployment

- Deployment als Web-App über einen einzigen URL-Link
- HTTPS erforderlich
- QR-Code wird generiert und an der Station ausgedruckt

### 5.3 Inhalte & Erweiterbarkeit

- Szenario-Inhalte in strukturierter Datendatei (JSON)
- Pro Aufgabe: Situationstext, Aufgabenstellung, Bewertungskriterien, System-Prompt, ggf. Fehler-Prompt und Fehler-Antwort
- Neue Szenarien ohne Code-Änderungen hinzufügbar
- Illustrationen als statische Assets referenziert

### 5.4 LLM-API

- Anbindung an Anthropic Claude Haiku API
- System-Prompt pro Aufgabentyp vorkonfiguriert
- Rate Limiting: max. Anzahl Calls pro Session konfigurierbar
- API-Account und laufende Kosten werden von GARP/Hive getragen

---

## 6 Inhaltsübersicht – Szenarien im Detail

Die folgenden 4 Szenarien sind inhaltlich vollständig ausgearbeitet. Das 5. Szenario "Freunde" ist noch zu erstellen.

### 6.1 Szenario: Schule

**Aufgabe 1 – Die richtige Rolle macht den Unterschied**
> Du bist in der 8. Klasse. Bald musst du ein Praktikum machen. Du hast keinen Plan, welche Berufe es gibt. In deiner Freizeit bist du viel draußen. Dein Traum: Sänger/in werden.

Aufgabe: Prompt mit Situationsbeschreibung, Ziel und klarer Rollenzuweisung (z.B. Berufsberater/in).

**Aufgabe 2 – Warum kam das falsche Ergebnis?**
> "Schreib mir ein Referat über Jaguar für die Schule." → KI liefert Referat über die Automarke.

Aufgabe: Prompt umformulieren: Tier, Klasse, Länge, Format klarmachen.

**Aufgabe 3 – Schnell vorbereitet, aber richtig**
> 20 Uhr, müde, morgen Abfrage Photosynthese, 20 Minuten Zeit.

Aufgabe: Prompt mit Situation, Zeitlimit, Ziel und konkretem Ergebnisformat.

### 6.2 Szenario: Freizeit

**Aufgabe 1 – Die richtige Rolle wählen**
> Freundesgruppe will sich treffen. Einer will Schwimmbad, einer Zocken, einer Chillen. Endlosdiskussion in WhatsApp.

Aufgabe: Prompt mit Gruppenbeschreibung, Problem, Ziel und Rolle (Freizeit-Coach).

**Aufgabe 2 – Warum war die Antwort nicht hilfreich?**
> "Was können wir am Wochenende machen?" → Museum, Wanderung, Brettspiel.

Aufgabe: Prompt mit Alter, Interessen, Budget, Wetter, Rahmenbedingungen.

**Aufgabe 3 – Das richtige Ergebnis verlangen**
> Draußen treffen, 3 Stunden, wenig Geld, kein Stress.

Aufgabe: Prompt für konkreten Plan mit Uhrzeiten, Beschreibungen, Schlechtwetter-Alternative.

### 6.3 Szenario: Liebe

**Aufgabe 1 – Die richtige Rolle wählen**
> Jemand aus der Klasse ist nett. Schreiben manchmal. Will nicht komisch wirken.

Aufgabe: Prompt mit Situation, Ziel (locker kennenlernen) und Rolle (Kommunikationscoach).

**Aufgabe 2 – Warum war die Antwort unangenehm?**
> "Schreib mir eine Nachricht, damit sie/er mich mag." → Viel zu dramatisch und kitschig.

Aufgabe: Prompt mit bisherigem Kontakt, Ton (locker), Alter, Länge.

**Aufgabe 3 – Das Ergebnis richtig festlegen**
> Anonymer Valentinstag-Brief: ehrlich, nett, nicht peinlich, max. 5 Sätze.

Aufgabe: Prompt mit Format, Ton, Inhalt und Ausschlüssen.

### 6.4 Szenario: Familie

**Aufgabe 1 – Die richtige Rolle wählen**
> Stress zu Hause: Eltern wollen mehr Hilfe. Gefühl der Ungerechtigkeit.

Aufgabe: Prompt mit Situation, Gefühl, Ziel (faire Lösung) und Rolle (Mediator).

**Aufgabe 2 – Warum kam der falsche Ton?**
> "Schreib einen Geburtstagsgruß für meine Mama." → Gruß für 70-Jährige, Mama ist 42.

Aufgabe: Prompt mit Alter, Verhältnis, Ton, Länge.

**Aufgabe 3 – Das Ergebnis richtig festlegen**
> Eltern weg, 3-jähriger Bruder, 2 Stunden beschäftigen.

Aufgabe: Prompt mit Alter, Dauer, Material und Ergebnisformat (5 Spielideen mit Anleitung).

### 6.5 Szenario: Freunde (noch zu erstellen)

Dieses Szenario muss noch inhaltlich erarbeitet werden. Es folgt dem gleichen Schema (Rolle → Fehler → Ergebnis) und grenzt sich thematisch von "Freizeit" ab, z.B. durch Fokus auf Konflikte und soziale Dynamiken.
