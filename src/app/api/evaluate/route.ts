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
  const typeInfo: Record<string, string> = {
    rolle: `Typ: Rolle vergeben. Bewerte ob: 1) klare Rolle zugewiesen ("Du bist ein...") 2) Situation beschrieben 3) Ziel formuliert.
1★=keine Rolle 2★=Rolle aber Kontext fehlt 3★=Rolle+Situation+Ziel`,
    fehler: `Typ: Fehler korrigieren. Alter Prompt: "${task.badPrompt}" gab falsche Antwort: "${task.badOutput?.slice(0, 100)}..."
Bewerte ob: 1) Fehler behoben 2) fehlende Infos ergänzt 3) jetzt präzise genug.
1★=noch vage 2★=teilweise behoben 3★=alle Details enthalten`,
    ergebnis: `Typ: Ergebnis definieren. Bewerte ob: 1) Situation+Ziel erklärt 2) Ausgabeformat vorgegeben 3) Rahmenbedingungen genannt.
1★=kein Format/Ziel 2★=Grundgerüst aber Details fehlen 3★=alles klar definiert`,
  };

  return `Du bewertest Prompts von Jugendlichen (12-16) in einer Lern-App. Antworte auf Deutsch, altersgerecht, ermutigend. Lehne unangemessene Inhalte freundlich ab.

Aufgabe: ${task.situation} — ${task.instruction}
${typeInfo[task.type] || ""}
Relevante Konzepte: ${task.keywords?.join(", ") || "keine"}

Anleitung:
1. Beantworte den Prompt natürlich (max 100 Wörter, als wärst du die KI an die der Prompt gerichtet ist)
2. Bewerte mit 1-3 Sternen
3. Gib Feedback (2 Sätze, duze den Nutzer)

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
