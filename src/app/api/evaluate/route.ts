import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple in-memory rate limiting
const rateLimiter = new Map<string, { count: number; resetAt: number }>();
const MAX_CALLS_PER_SESSION = 30;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();
  const entry = rateLimiter.get(sessionId);
  if (!entry || now > entry.resetAt) {
    rateLimiter.set(sessionId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= MAX_CALLS_PER_SESSION) return false;
  entry.count++;
  return true;
}

interface TaskData {
  type: "rolle" | "fehler" | "ergebnis";
  situation: string;
  instruction: string;
  keywords: string[];
  badPrompt?: string;
  badOutput?: string;
}

function buildSystemPrompt(task: TaskData): string {
  const rubrics: Record<string, string> = {
    rolle: `AUFGABENTYP: Rolle vergeben

PUNKTE-RUBRIK (zähle Punkte, sei STRENG):
- K1: Explizite Rollenzuweisung vorhanden? ("Du bist ein...", "Stell dir vor du bist...") → +1 Punkt. ACHTUNG: Nur zählen wenn eine KONKRETE Rolle genannt wird (z.B. "Berufsberater", "Coach", "Mentor"). "Hilf mir" oder "Kannst du..." ist KEINE Rollenzuweisung = 0 Punkte.
- K2: Eigene Situation beschrieben? (Alter, Klasse, konkretes Problem) → +1 Punkt. Muss MINDESTENS 2 Details enthalten. Ein einzelnes Wort reicht nicht.
- K3: Konkretes Ziel oder Frage formuliert? (Was soll rauskommen?) → +1 Punkt. Muss klar sein was der Nutzer WILL, nicht nur was er fühlt.

BEWERTUNG: 0-1 Punkte = 1★ | 2 Punkte = 2★ | 3 Punkte = 3★`,

    fehler: `AUFGABENTYP: Fehler erkennen & korrigieren
Fehlerhafter Original-Prompt: "${task.badPrompt}"
Falsche KI-Antwort (Auszug): "${task.badOutput?.slice(0, 120)}..."

PUNKTE-RUBRIK (zähle Punkte, sei STRENG):
- K1: Kernfehler behoben? (Mehrdeutigkeit des Originals aufgelöst) → +1 Punkt. Der neue Prompt muss das Thema EINDEUTIG klarmachen. Wenn immer noch mehrdeutig = 0 Punkte.
- K2: Mindestens 2 fehlende Kontext-Infos ergänzt? (z.B. Alter, Klasse, Format, Länge, Ton) → +1 Punkt. Nur zählen wenn KONKRETE neue Infos da sind die im Original fehlten.
- K3: Gewünschtes Ergebnis klar definiert? (Format, Umfang, Struktur) → +1 Punkt.

BEWERTUNG: 0-1 Punkte = 1★ | 2 Punkte = 2★ | 3 Punkte = 3★`,

    ergebnis: `AUFGABENTYP: Ergebnis klar definieren

PUNKTE-RUBRIK (zähle Punkte, sei STRENG):
- K1: Situation und Ziel erklärt? (Was ist die Lage, was will der Nutzer erreichen?) → +1 Punkt. Muss BEIDES enthalten — nur Situation oder nur Ziel = 0 Punkte.
- K2: Klares Ausgabeformat vorgegeben? (Liste, Plan, Stichpunkte, Tabelle, "Gib mir 1) ... 2) ... 3) ...") → +1 Punkt. "Hilf mir" oder "Sag mir was" ist KEIN Format = 0 Punkte.
- K3: Rahmenbedingungen genannt? (Zeitlimit, Ton, Länge, Budget, Zielgruppe — mindestens 2 davon) → +1 Punkt.

BEWERTUNG: 0-1 Punkte = 1★ | 2 Punkte = 2★ | 3 Punkte = 3★`,
  };

  return `Du bewertest Prompts von Jugendlichen (12-16) in einer Lern-App. Antworte auf Deutsch, altersgerecht, ermutigend.

KONTEXT: ${task.situation} — ${task.instruction}
${rubrics[task.type] || ""}

WICHTIGE REGELN:
- Sei STRENG aber FAIR. Die meisten Prompts von Anfängern verdienen 1-2 Sterne, NICHT 3.
- 3 Sterne sind die AUSNAHME für wirklich gute Prompts. Nur vergeben wenn ALLE 3 Kriterien klar erfüllt sind.
- Zähle die Punkte ehrlich. Wenn ein Kriterium nur halb erfüllt ist, gib 0 Punkte dafür.
- Kurze, vage Prompts wie "Hilf mir bei X" sind IMMER 1 Stern.
- Dein Feedback soll erklären WELCHES Kriterium fehlt und WIE man es verbessern kann.
- Lehne unangemessene Inhalte freundlich ab.

AUFGABEN:
1. Beantworte den Prompt natürlich und hilfreich (max 100 Wörter, Deutsch, altersgerecht)
2. Zähle die Punkte nach der Rubrik oben und vergib 1-3 Sterne
3. Gib ermutigendes Feedback (2 Sätze, duze den Nutzer, erkläre was fehlt)

Antworte NUR als JSON: {"response":"...","stars":1,"feedback":"..."}`;
}

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.headers.get("x-session-id") || "anonymous";

    if (!checkRateLimit(sessionId)) {
      return NextResponse.json(
        { error: "Du hast zu viele Anfragen gesendet. Warte einen Moment." },
        { status: 429 }
      );
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "sk-dein-key-hier") {
      return NextResponse.json(
        { error: "API-Key nicht konfiguriert" },
        { status: 500 }
      );
    }

    const { prompt, task } = await request.json();

    if (!prompt || !task) {
      return NextResponse.json(
        { error: "Prompt oder Aufgabe fehlt" },
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt(task);

    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      max_completion_tokens: 16384,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "Leere Antwort von der KI" },
        { status: 500 }
      );
    }

    // Parse JSON from response — handle markdown code blocks if present
    let jsonStr = content.trim();
    const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) jsonStr = fenceMatch[1].trim();
    const result = JSON.parse(jsonStr);
    const stars = Math.min(3, Math.max(1, Math.round(result.stars || 1)));

    return NextResponse.json({
      response: result.response || "",
      stars,
      feedback: result.feedback || "",
    });
  } catch (error: unknown) {
    console.error("Evaluate API error:", error);
    const message =
      error instanceof Error ? error.message : "Interner Serverfehler";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
