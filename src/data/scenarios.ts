export interface Task {
  id: number;
  type: "rolle" | "fehler" | "ergebnis";
  title: string;
  description: string;
  situation: string;
  instruction: string;
  hints: string[];
  // For "fehler" type: the bad prompt and wrong output
  badPrompt?: string;
  badOutput?: string;
  // Keywords/concepts that a good answer should contain
  keywords: string[];
  // Feedback per star level
  feedback: {
    oneStar: string;
    twoStars: string;
    threeStars: string;
  };
  exampleGoodPrompt: string;
}

export interface Scenario {
  id: string;
  title: string;
  emoji: string;
  color: string;
  description: string;
  tasks: Task[];
}

export const scenarios: Scenario[] = [
  {
    id: "schule",
    title: "Schule",
    emoji: "📚",
    color: "accent-blue",
    description: "Hausaufgaben, Referate & Prüfungen meistern",
    tasks: [
      {
        id: 1,
        type: "rolle",
        title: "Die richtige Rolle vergeben",
        description:
          "Lerne, warum es wichtig ist, der KI eine Rolle zuzuweisen.",
        situation:
          "Du bist in der 8. Klasse und hast bald ein Praktikum. Du weißt aber gar nicht, wo du dich bewerben sollst oder welcher Beruf zu dir passen könnte.",
        instruction:
          "Schreibe einen Prompt, in dem du der KI eine passende Rolle zuweist. Wer soll die KI für dich sein? Ein Berufsberater? Ein Lehrer? Ein Coach? Überlege dir, welche Perspektive dir am meisten helfen würde.",
        hints: [
          "Gib der KI eine konkrete Rolle (z.B. \"Du bist ein Berufsberater\")",
          "Nenne dein Alter / deine Klasse",
          "Beschreibe deine Situation",
        ],
        keywords: [
          "rolle",
          "berufsberater",
          "coach",
          "berater",
          "du bist",
          "klasse",
          "praktikum",
          "8.",
        ],
        feedback: {
          oneStar:
            "Du hast keinen klaren Rollenauftrag gegeben. Ohne Rolle antwortet die KI sehr allgemein – wie ein Lexikon statt wie ein Berater.",
          twoStars:
            "Du hast eine Rolle angedeutet, aber sie war nicht ganz klar oder der Kontext fehlte. Je genauer die Rolle, desto besser die Antwort!",
          threeStars:
            "Perfekt! Du hast der KI eine klare Rolle gegeben und deine Situation beschrieben. So bekommst du eine Antwort, die wirklich zu dir passt.",
        },
        exampleGoodPrompt:
          "Du bist ein erfahrener Berufsberater für Jugendliche. Ich bin in der 8. Klasse und muss bald ein Praktikum machen. Ich interessiere mich für Technik und Tiere. Welche Praktikumsplätze würdest du mir empfehlen?",
      },
      {
        id: 2,
        type: "fehler",
        title: "Fehler finden & korrigieren",
        description:
          "Erkenne, warum ein schlechter Prompt zu einem falschen Ergebnis führt.",
        situation:
          "Ein Schüler muss ein Referat über den Jaguar halten – das Tier! Er hat einen Prompt geschrieben, aber das Ergebnis ist total falsch.",
        instruction:
          'Unten siehst du den fehlerhaften Prompt und das falsche Ergebnis. Schreibe den Prompt so um, dass die KI versteht: Es geht um das Tier Jaguar, für die 7. Klasse, ca. 5 Minuten lang.',
        badPrompt: "Schreib mir ein Referat über Jaguar.",
        badOutput:
          "Der Jaguar ist eine britische Luxusautomarke, die 1922 als Swallow Sidecar Company gegründet wurde. Bekannt für elegante Sportwagen wie den E-Type, gehört Jaguar heute zu Tata Motors. Die Modellpalette umfasst Limousinen wie den XF, den SUV F-PACE und den vollelektrischen I-PACE. Das markante Jaguar-Logo zeigt einen springenden Jaguar und steht für Leistung und britische Handwerkskunst ...",
        hints: [
          "Mach klar, dass es um das TIER geht",
          "Nenne die Klassenstufe",
          "Gib eine Länge / Dauer an",
          "Beschreibe das gewünschte Format",
        ],
        keywords: [
          "tier",
          "raubkatze",
          "7. klasse",
          "klasse",
          "5 minuten",
          "minuten",
          "referat",
          "regenwald",
          "südamerika",
          "format",
        ],
        feedback: {
          oneStar:
            "Dein Prompt ist noch zu unklar. Ohne Kontext wie Klassenstufe und Thema-Klarstellung liefert die KI weiter falsche Ergebnisse.",
          twoStars:
            "Schon besser! Du hast einige Details ergänzt, aber es fehlen noch wichtige Angaben wie Länge oder Format.",
          threeStars:
            "Super! Dein Prompt ist jetzt eindeutig. Die KI weiß genau, was du brauchst: Tier, Klassenstufe, Dauer und Format. Kontext ist der Schlüssel!",
        },
        exampleGoodPrompt:
          "Schreibe mir ein Referat über den Jaguar – das Raubtier, nicht die Automarke. Das Referat ist für die 7. Klasse und soll ca. 5 Minuten dauern. Gliedere es in Einleitung, Hauptteil und Schluss.",
      },
      {
        id: 3,
        type: "ergebnis",
        title: "Ergebnis klar definieren",
        description:
          "Lerne, wie du unter Zeitdruck den perfekten Prompt schreibst.",
        situation:
          "Es ist 20 Uhr. Du bist müde. Morgen wirst du in Bio zum Thema Photosynthese abgefragt. Du hast nur noch 20 Minuten zum Lernen.",
        instruction:
          "Schreibe einen Prompt, der deine Situation erklärt und der KI genau sagt, was du brauchst. Denke an: Ziel, Zeitlimit, Ton, Format und was genau rauskommen soll.",
        hints: [
          "Erkläre deine Situation (müde, wenig Zeit)",
          "Nenne dein Ziel (mündliche Abfrage bestehen)",
          "Gib ein Format vor (z.B. Zusammenfassung + Fragen)",
          "Setze ein Zeitlimit (20 Minuten Lernzeit)",
        ],
        keywords: [
          "photosynthese",
          "20 minuten",
          "zusammenfassung",
          "fragen",
          "mündlich",
          "abfrage",
          "einfach",
          "kurz",
          "format",
          "lehrerfragen",
          "antworten",
        ],
        feedback: {
          oneStar:
            "Dein Prompt beschreibt die Situation kaum und gibt kein klares Format vor. Die KI weiß nicht, was genau rauskommen soll.",
          twoStars:
            "Guter Ansatz! Du hast die Situation beschrieben, aber das gewünschte Ergebnis könnte noch klarer sein. Was genau soll die KI liefern?",
          threeStars:
            "Hervorragend! Du hast Situation, Ziel, Zeitrahmen UND ein klares Ausgabeformat definiert. So bekommst du genau das, was du brauchst!",
        },
        exampleGoodPrompt:
          "Ich werde morgen in Bio mündlich zu Photosynthese abgefragt (8. Klasse). Ich habe nur 20 Minuten zum Lernen. Gib mir: 1) Eine einfache Zusammenfassung der Photosynthese in max. 10 Sätzen 2) Die 5 häufigsten Lehrerfragen mit kurzen Antworten 3) 3 Eselsbrücken zum Merken. Schreibe einfach und verständlich.",
      },
    ],
  },
  {
    id: "freizeit",
    title: "Freizeit",
    emoji: "🎮",
    color: "accent-green",
    description: "Hobbys, Gaming & kreative Projekte",
    tasks: [
      {
        id: 1,
        type: "rolle",
        title: "Die richtige Rolle vergeben",
        description: "Gib der KI die richtige Perspektive für dein Hobby.",
        situation:
          "Du willst anfangen, eigene Beats zu produzieren, hast aber keine Ahnung, wo du anfangen sollst. Du hast kein großes Budget.",
        instruction:
          "Schreibe einen Prompt, in dem du der KI eine Rolle gibst, die dir bei deinem Musikprojekt helfen kann. Wer wäre der perfekte Berater?",
        hints: [
          "Gib der KI eine Rolle (z.B. Musikproduzent, Mentor)",
          "Beschreibe dein Level (Anfänger)",
          "Nenne dein Budget (wenig/kein Geld)",
        ],
        keywords: [
          "produzent",
          "mentor",
          "coach",
          "du bist",
          "anfänger",
          "beats",
          "musik",
          "budget",
          "kostenlos",
        ],
        feedback: {
          oneStar:
            "Ohne Rolle weiß die KI nicht, aus welcher Perspektive sie antworten soll. Ein Musikproduzent gibt andere Tipps als ein Lexikon!",
          twoStars:
            "Du hast eine Rolle vergeben, aber dein Level oder Budget fehlt. Je mehr Kontext, desto passender die Tipps.",
          threeStars:
            "Top! Die KI weiß jetzt genau, wer sie sein soll und kann dir als Anfänger gezielt helfen.",
        },
        exampleGoodPrompt:
          "Du bist ein erfahrener Musikproduzent, der Anfängern hilft. Ich bin 14, habe noch nie Beats gemacht und habe kein Geld für teure Software. Welche kostenlosen Tools und ersten Schritte empfiehlst du mir?",
      },
      {
        id: 2,
        type: "fehler",
        title: "Fehler finden & korrigieren",
        description: "Finde heraus, warum der Prompt daneben ging.",
        situation:
          "Jemand wollte Tipps, um in einem Videospiel besser zu werden. Aber das Ergebnis ist komplett falsch.",
        instruction:
          "Schau dir den fehlerhaften Prompt und das Ergebnis an. Schreibe einen besseren Prompt, der genau das liefert, was gemeint war.",
        badPrompt: "Wie werde ich besser in Apex?",
        badOutput:
          "Um in der Apex-Programmiersprache besser zu werden, empfehle ich folgende Schritte: 1) Lernen Sie die Salesforce-Plattform kennen, 2) Verstehen Sie die objektorientierten Konzepte von Apex, 3) Üben Sie mit Trailhead-Modulen, 4) Schreiben Sie Unit Tests mit @isTest Annotation ...",
        hints: [
          "Mach klar, welches Spiel gemeint ist",
          "Nenne dein aktuelles Level",
          "Sag, welche Art Tipps du willst",
        ],
        keywords: [
          "apex legends",
          "spiel",
          "game",
          "shooter",
          "rang",
          "rank",
          "tipps",
          "aim",
          "movement",
          "legend",
        ],
        feedback: {
          oneStar:
            "Dein Prompt ist noch zu vage. Die KI könnte immer noch das Falsche verstehen.",
          twoStars:
            "Besser! Aber Details wie dein Rang oder welche Tipps du willst fehlen noch.",
          threeStars:
            "Perfekt! Die KI weiß jetzt genau: Es geht um Apex Legends, dein Level und welche Tipps du brauchst.",
        },
        exampleGoodPrompt:
          "Ich spiele Apex Legends auf der PS5 und bin gerade in Gold. Gib mir 5 konkrete Tipps, wie ich meinen Aim und mein Movement verbessern kann, um Platin zu erreichen.",
      },
      {
        id: 3,
        type: "ergebnis",
        title: "Ergebnis klar definieren",
        description: "Bekomme genau das kreative Ergebnis, das du brauchst.",
        situation:
          "Du willst einen eigenen Instagram-Post gestalten. Du brauchst eine Bildidee und eine Caption für deinen neuen Skate-Trick, den du gelernt hast.",
        instruction:
          "Schreibe einen Prompt, der der KI genau sagt, was du brauchst: Bildidee, Caption-Stil, Länge, Hashtags und Ton.",
        hints: [
          "Beschreibe den Trick / das Thema",
          "Gib den Ton an (cool, lustig, motivierend?)",
          "Nenne das Format (Caption + Hashtags)",
          "Gib eine gewünschte Länge an",
        ],
        keywords: [
          "instagram",
          "caption",
          "hashtag",
          "skate",
          "trick",
          "ton",
          "stil",
          "kurz",
          "cool",
          "format",
        ],
        feedback: {
          oneStar:
            "Ohne klares Format und Tonangabe bekommst du eine generische Antwort, die nicht nach dir klingt.",
          twoStars:
            "Du hast ein gutes Grundgerüst, aber Details wie Ton oder Hashtag-Anzahl fehlen noch.",
          threeStars:
            "Stark! Die KI kann jetzt einen Post erstellen, der genau zu deinem Stil passt.",
        },
        exampleGoodPrompt:
          "Ich habe gerade meinen ersten Kickflip auf dem Skateboard gelernt und will das auf Instagram posten. Schreib mir: 1) Eine coole, kurze Caption (max. 2 Sätze, lässiger Ton) 2) 8 passende Hashtags auf Deutsch und Englisch. Kein cringe, sondern authentisch.",
      },
    ],
  },
  {
    id: "freunde",
    title: "Freunde",
    emoji: "👥",
    color: "accent-purple",
    description: "Konflikte lösen & Freundschaften stärken",
    tasks: [
      {
        id: 1,
        type: "rolle",
        title: "Die richtige Rolle vergeben",
        description:
          "Die richtige Perspektive hilft bei schwierigen Gesprächen.",
        situation:
          "Dein bester Freund / deine beste Freundin ist sauer auf dich. Du weißt nicht genau warum und willst das Gespräch suchen, aber du hast Angst, dass es eskaliert.",
        instruction:
          "Schreibe einen Prompt, in dem du der KI eine Rolle zuweist, die dir helfen kann, das Gespräch vorzubereiten. Wer wäre der ideale Berater?",
        hints: [
          "Gib der KI eine Rolle (z.B. Mediator, Schulpsychologe)",
          "Beschreibe die Situation",
          "Sag, was du erreichen willst",
        ],
        keywords: [
          "mediator",
          "psycholog",
          "berater",
          "coach",
          "du bist",
          "freund",
          "gespräch",
          "streit",
          "konflikt",
        ],
        feedback: {
          oneStar:
            "Ohne Rolle antwortet die KI wie ein Ratgeber-Buch. Ein Mediator oder Coach gibt dir viel bessere, einfühlsamere Tipps!",
          twoStars:
            "Die Rolle ist da, aber mehr Kontext zur Situation würde helfen.",
          threeStars:
            "Klasse! Die KI nimmt jetzt die richtige Perspektive ein und kann dir wirklich helfen.",
        },
        exampleGoodPrompt:
          "Du bist ein Mediator für Konflikte unter Jugendlichen. Mein bester Freund ist sauer auf mich, aber ich weiß nicht genau warum. Ich möchte morgen mit ihm reden, ohne dass es eskaliert. Wie kann ich das Gespräch beginnen? Gib mir 3 konkrete Gesprächseinstiege.",
      },
      {
        id: 2,
        type: "fehler",
        title: "Fehler finden & korrigieren",
        description: "Erkenne den Fehler im Prompt und mach ihn besser.",
        situation:
          "Jemand wollte eine nette Nachricht für einen Freund schreiben, der traurig ist. Das Ergebnis klingt aber gar nicht wie ein Jugendlicher.",
        instruction:
          "Schau dir den Prompt und das Ergebnis an. Was fehlt? Schreibe einen besseren Prompt.",
        badPrompt: "Schreib eine Nachricht an meinen Freund der traurig ist.",
        badOutput:
          "Sehr geehrter Freund,\n\nich möchte Ihnen mein aufrichtiges Mitgefühl aussprechen. In schwierigen Zeiten ist es wichtig, dass man weiß, dass man nicht allein ist. Ich möchte Ihnen versichern, dass ich stets an Ihrer Seite stehe und Sie jederzeit auf meine Unterstützung zählen können.\n\nMit freundlichen Grüßen",
        hints: [
          "Nenne den Ton (locker, wie ein Jugendlicher)",
          "Beschreibe die Situation genauer",
          "Gib die gewünschte Länge an",
          "Sag, worüber der Freund traurig ist",
        ],
        keywords: [
          "ton",
          "locker",
          "jugendlich",
          "normal",
          "whatsapp",
          "kurz",
          "traurig",
          "grund",
          "warum",
          "freund",
        ],
        feedback: {
          oneStar:
            "Der Prompt ist noch zu allgemein. Die KI weiß nicht, wie alt ihr seid oder wie ihr normalerweise schreibt.",
          twoStars:
            "Besser! Der Ton ist klarer, aber Details zur Situation würden die Nachricht authentischer machen.",
          threeStars:
            "Super! Die Nachricht klingt jetzt echt und so, wie du wirklich schreiben würdest.",
        },
        exampleGoodPrompt:
          "Schreib eine WhatsApp-Nachricht an meinen besten Freund (beide 14). Er ist traurig, weil er sich mit seinen Eltern gestritten hat. Die Nachricht soll kurz sein (3-4 Sätze), locker klingen wie unter Freunden und zeigen, dass ich für ihn da bin. Kein formelles Deutsch!",
      },
      {
        id: 3,
        type: "ergebnis",
        title: "Ergebnis klar definieren",
        description:
          "Plane eine Überraschung mit einem perfekt definierten Ergebnis.",
        situation:
          "Dein Freund hat bald Geburtstag. Du willst mit der Gruppe eine Überraschungsparty planen, hast aber nur 30€ Budget und keinen Plan.",
        instruction:
          "Schreibe einen Prompt, der der KI genau sagt, was du brauchst: eine konkrete Planung mit Budget, Zeitrahmen und klarem Format.",
        hints: [
          "Nenne das Budget (30€)",
          "Gib die Anzahl der Gäste an",
          "Beschreibe den Rahmen (drinnen/draußen)",
          "Gib ein klares Ausgabeformat vor (Liste, Plan, etc.)",
        ],
        keywords: [
          "30",
          "euro",
          "budget",
          "geburtstag",
          "party",
          "plan",
          "gäste",
          "format",
          "liste",
          "checkliste",
          "überraschung",
        ],
        feedback: {
          oneStar:
            "Ohne Budget, Gästeanzahl und Format bekommst du nur vage Ideen statt eines echten Plans.",
          twoStars:
            "Gute Basis! Aber ein klareres Ausgabeformat (z.B. Checkliste) würde dir mehr helfen.",
          threeStars:
            "Perfekt! Die KI kann dir jetzt einen konkreten, umsetzbaren Plan liefern.",
        },
        exampleGoodPrompt:
          "Hilf mir, eine Überraschungs-Geburtstagsparty für meinen Freund (wird 15) zu planen. Budget: 30€. Ca. 8 Gäste. Bei mir zuhause. Gib mir: 1) Eine Einkaufsliste mit Preisen 2) Einen Zeitplan für die Vorbereitung 3) 3 Spielideen die nichts kosten. Alles als übersichtliche Checkliste.",
      },
    ],
  },
  {
    id: "liebe",
    title: "Liebe",
    emoji: "💕",
    color: "accent-pink",
    description: "Crush, Dating & Gefühle verstehen",
    tasks: [
      {
        id: 1,
        type: "rolle",
        title: "Die richtige Rolle vergeben",
        description:
          "Die richtige Perspektive für Herzensangelegenheiten.",
        situation:
          "Du hast einen Crush, traust dich aber nicht, die Person anzusprechen. Du wüsstest gerne, wie du cool und locker rüberkommen kannst.",
        instruction:
          "Schreibe einen Prompt und gib der KI eine Rolle, die dir helfen kann. Wer wäre der perfekte Ratgeber für so eine Situation?",
        hints: [
          "Gib der KI eine Rolle (z.B. großer Bruder, Vertrauensperson)",
          "Beschreibe deine Situation",
          "Sag, was du dir erhoffst",
        ],
        keywords: [
          "du bist",
          "bruder",
          "schwester",
          "freund",
          "berater",
          "coach",
          "crush",
          "ansprechen",
          "tipp",
        ],
        feedback: {
          oneStar:
            "Ohne Rolle bekommst du allgemeine Dating-Tipps aus dem Internet. Ein persönlicher Ratgeber versteht deine Situation besser!",
          twoStars:
            "Gute Rolle! Aber beschreibe deine Situation etwas genauer, damit die Tipps wirklich zu dir passen.",
          threeStars:
            "Perfekt! Du hast der KI eine vertrauensvolle Rolle gegeben. Die Tipps werden persönlich und hilfreich sein!",
        },
        exampleGoodPrompt:
          "Du bist wie ein cooler großer Bruder, der mir bei Beziehungsfragen hilft. Ich bin 15 und habe einen Crush auf jemanden aus meiner Klasse. Wir reden manchmal, aber ich trau mich nicht, mehr zu zeigen. Gib mir 3 lockere Wege, wie ich ein Gespräch anfangen kann, ohne dass es weird wird.",
      },
      {
        id: 2,
        type: "fehler",
        title: "Fehler finden & korrigieren",
        description: "Dieser Prompt ging schief – finde den Fehler!",
        situation:
          "Jemand wollte Hilfe für eine süße Nachricht an seinen Crush. Das Ergebnis ist aber viel zu kitschig und peinlich.",
        instruction:
          "Schau dir den Prompt und das Ergebnis an. Was fehlt an Kontext? Schreibe einen besseren Prompt.",
        badPrompt: "Schreib eine Liebesnachricht.",
        badOutput:
          "Meine allerliebste Herzensdame,\n\nseit dem ersten Moment, als meine Augen die Ihren erblickten, war mir gewiss, dass das Schicksal uns füreinander bestimmt hat. Sie sind der Stern an meinem Firmament, die Rose in meinem Garten der Sehnsucht. Mein Herz schlägt nur für Sie, in jedem Atemzug flüstere ich Ihren Namen ...",
        hints: [
          "Nenne euer Alter",
          "Sag, über welchen Kanal (WhatsApp, Zettel, etc.)",
          "Beschreibe den Ton (locker, nicht kitschig)",
          "Gib die Länge an (kurz!)",
        ],
        keywords: [
          "alter",
          "14",
          "15",
          "16",
          "whatsapp",
          "locker",
          "kurz",
          "nicht kitschig",
          "normal",
          "crush",
          "ton",
        ],
        feedback: {
          oneStar:
            "Der Prompt ist noch zu vage. Ohne Alter, Ton und Kontext klingt die Nachricht weiter wie aus einem alten Roman.",
          twoStars:
            "Schon besser! Aber der gewünschte Ton und die Länge fehlen noch für ein perfektes Ergebnis.",
          threeStars:
            "Genau richtig! Die KI weiß jetzt, dass es locker und kurz sein soll – authentisch statt kitschig!",
        },
        exampleGoodPrompt:
          "Schreib eine kurze, süße WhatsApp-Nachricht an meinen Crush. Wir sind beide 15 und kennen uns aus der Schule. Die Nachricht soll locker und nicht kitschig sein, max. 2-3 Sätze. Sie soll zeigen, dass ich die Person mag, ohne zu direkt zu sein.",
      },
      {
        id: 3,
        type: "ergebnis",
        title: "Ergebnis klar definieren",
        description: "Plane das perfekte Date mit klarem Ergebnis.",
        situation:
          "Du willst dein erstes Date planen. Ihr seid beide 15, habt wenig Geld und wohnt in einer Kleinstadt. Du bist mega nervös.",
        instruction:
          "Schreibe einen Prompt, der alle wichtigen Details enthält und ein klares Ergebnis definiert. Was genau soll die KI dir liefern?",
        hints: [
          "Nenne euer Alter und die Situation",
          "Beschreibe den Ort (Kleinstadt)",
          "Nenne das Budget",
          "Gib ein klares Format vor (z.B. 3 Date-Ideen + Gesprächstipps)",
        ],
        keywords: [
          "date",
          "15",
          "alter",
          "klein",
          "budget",
          "geld",
          "ideen",
          "gespräch",
          "tipps",
          "nervös",
          "format",
        ],
        feedback: {
          oneStar:
            "Zu wenig Details. Die KI schlägt dir vielleicht ein Candle-Light-Dinner vor – nicht gerade passend für 15-Jährige!",
          twoStars:
            "Gute Infos! Aber das Ausgabeformat könnte klarer sein, damit du direkt umsetzbare Ideen bekommst.",
          threeStars:
            "Top! Die KI hat jetzt alles: Alter, Budget, Ort und Format. Du bekommst Date-Ideen, die wirklich passen!",
        },
        exampleGoodPrompt:
          "Ich plane mein erstes Date. Wir sind beide 15 und wohnen in einer kleinen Stadt. Ich habe max. 10€. Ich bin super nervös. Gib mir: 1) 3 Date-Ideen die günstig sind und in einer Kleinstadt funktionieren 2) 5 Gesprächsthemen falls es still wird 3) Einen Tipp gegen Nervosität. Alles kurz und in lockerer Sprache.",
      },
    ],
  },
  {
    id: "familie",
    title: "Familie",
    emoji: "🏠",
    color: "accent-orange",
    description: "Eltern, Geschwister & Zuhause",
    tasks: [
      {
        id: 1,
        type: "rolle",
        title: "Die richtige Rolle vergeben",
        description: "Die richtige Perspektive für Familienthemen.",
        situation:
          "Du möchtest deine Eltern davon überzeugen, dass du länger aufbleiben darfst am Wochenende. Bisher sagen sie immer Nein.",
        instruction:
          "Schreibe einen Prompt und gib der KI eine Rolle, die dir hilft, gute Argumente zu finden. Wer wäre der beste Berater?",
        hints: [
          "Gib der KI eine Rolle (z.B. Verhandlungscoach, Familienberater)",
          "Beschreibe deine Situation und dein Alter",
          "Sag, was du erreichen willst",
        ],
        keywords: [
          "du bist",
          "coach",
          "berater",
          "verhandl",
          "eltern",
          "aufbleiben",
          "argumente",
          "überzeugen",
        ],
        feedback: {
          oneStar:
            "Ohne klare Rolle gibt die KI nur allgemeine Tipps. Ein Verhandlungscoach denkt strategisch!",
          twoStars:
            "Gute Rolle! Nenne noch dein Alter und die genauen Regeln deiner Eltern für bessere Tipps.",
          threeStars:
            "Perfekt! Die KI versteht deine Situation und kann dir echte, durchdachte Argumente liefern.",
        },
        exampleGoodPrompt:
          "Du bist ein Verhandlungscoach für Jugendliche. Ich bin 14 und meine Eltern lassen mich am Wochenende nur bis 21 Uhr aufbleiben. Ich möchte bis 23 Uhr. Gib mir 3 gute Argumente, die meine Eltern überzeugen könnten, und sag mir, welche Gegenargumente sie haben könnten.",
      },
      {
        id: 2,
        type: "fehler",
        title: "Fehler finden & korrigieren",
        description: "Dieser Prompt war zu unklar – was ist schiefgelaufen?",
        situation:
          "Jemand wollte Hilfe, um nach einem Streit mit den Eltern wieder ins Gespräch zu kommen. Das Ergebnis ist aber total unpassend.",
        instruction:
          "Schau dir den Prompt und das Ergebnis an. Was fehlt? Schreibe einen besseren Prompt.",
        badPrompt: "Wie rede ich mit meinen Eltern nach Streit?",
        badOutput:
          "Als Erwachsener in einer reifen Beziehung zu Ihren betagten Eltern empfehle ich: 1) Vereinbaren Sie einen formellen Gesprächstermin 2) Erstellen Sie eine schriftliche Agenda 3) Erwägen Sie professionelle Familienmediation 4) Dokumentieren Sie die Vereinbarungen schriftlich 5) Planen Sie regelmäßige Familien-Meetings ein ...",
        hints: [
          "Nenne dein Alter",
          "Beschreibe den Streitgrund",
          "Sag, welchen Ton die Tipps haben sollen",
          "Gib an, was du dir wünschst",
        ],
        keywords: [
          "14",
          "15",
          "16",
          "alter",
          "jugendlich",
          "streit",
          "grund",
          "handy",
          "ausgang",
          "locker",
          "einfach",
          "entschuldigen",
        ],
        feedback: {
          oneStar:
            "Noch zu allgemein. Die KI denkt, du bist erwachsen und gibt formelle Business-Tipps.",
          twoStars:
            "Schon besser! Aber ein konkreter Streitgrund und dein Alter würden die Tipps viel passender machen.",
          threeStars:
            "Top! Die KI versteht jetzt, dass du ein Teenager bist und gibt Tipps, die wirklich zu deiner Situation passen.",
        },
        exampleGoodPrompt:
          "Ich bin 14 und hatte gestern Streit mit meinen Eltern, weil sie mir das Handy weggenommen haben. Jetzt herrscht zu Hause schlechte Stimmung und ich will mich wieder vertragen. Gib mir 3 einfache Tipps, wie ich als Jugendlicher das Gespräch suchen kann, ohne dass es wieder eskaliert. Lockerer, verständlicher Ton.",
      },
      {
        id: 3,
        type: "ergebnis",
        title: "Ergebnis klar definieren",
        description: "Plane ein konkretes Familienprojekt mit klarem Output.",
        situation:
          "Ihr wollt als Familie am Wochenende etwas Cooles zusammen machen, aber niemand hat eine Idee. Du willst die KI nutzen, um einen konkreten Vorschlag zu machen.",
        instruction:
          "Schreibe einen Prompt, der alle Details enthält und der KI ein klares Format vorgibt. Was soll genau rauskommen?",
        hints: [
          "Beschreibe deine Familie (Anzahl, Alter)",
          "Nenne den Zeitrahmen (Wochenende)",
          "Gib ein Budget an",
          "Fordere ein konkretes Format (z.B. Tagesplan)",
        ],
        keywords: [
          "familie",
          "wochenende",
          "budget",
          "personen",
          "alter",
          "plan",
          "tagesplan",
          "format",
          "aktivität",
          "idee",
        ],
        feedback: {
          oneStar:
            "Ohne Details über deine Familie und ein gewünschtes Format bleibt der Vorschlag zu allgemein.",
          twoStars:
            "Gute Basis! Aber ein konkretes Ausgabeformat wie ein Tagesplan wäre hilfreicher.",
          threeStars:
            "Perfekt! Die KI kann euch jetzt einen maßgeschneiderten Familienplan liefern!",
        },
        exampleGoodPrompt:
          "Wir sind eine Familie mit 4 Personen (Eltern + ich 14 + Schwester 10). Wir wollen am Samstag etwas zusammen machen, das allen Spaß macht. Budget: max. 50€. Wir wohnen in der Nähe von Göppingen. Gib mir: 1) 3 Aktivitätsvorschläge mit Kosten 2) Einen Tagesplan für den besten Vorschlag 3) Was wir mitnehmen sollten. Alles als übersichtliche Liste.",
      },
    ],
  },
];
