"use client";

import { useState } from "react";
import type { Task } from "@/data/scenarios";
import { typeColors } from "@/data/scenarioColors";
import StarRating from "./StarRating";
import { IconLightbulb, IconPin, IconXCircle, IconEye, IconPencil, IconMask, IconMagnify, IconTarget } from "@/components/Icons";

interface TaskViewProps {
  task: Task;
  taskNumber: number;
  totalTasks: number;
  onComplete: (stars: number) => void;
}

function evaluatePromptFallback(input: string, task: Task): number {
  const lower = input.toLowerCase();
  const words = lower.split(/\s+/);
  let score = 0;
  const matched = task.keywords.filter((kw) => lower.includes(kw.toLowerCase()));
  const ratio = matched.length / task.keywords.length;
  if (words.length >= 30) score += 2; else if (words.length >= 15) score += 1;
  if (ratio >= 0.4) score += 3; else if (ratio >= 0.2) score += 2; else if (ratio >= 0.1) score += 1;
  if (task.type === "rolle" && (lower.includes("du bist") || lower.includes("stell dir vor"))) score += 2;
  if (task.type === "ergebnis" && ["1)","2)","3)","format","liste","gib mir","zusammenfassung","stichpunkt","- "].some(f => lower.includes(f))) score += 2;
  if (score >= 6) return 3;
  if (score >= 3) return 2;
  return 1;
}

const typeIcons: Record<string, React.ReactNode> = {
  rolle:    <IconMask    size={16} color="white" />,
  fehler:   <IconMagnify size={16} color="white" />,
  ergebnis: <IconTarget  size={16} color="white" />,
};

// Fluid clamp values for responsive scaling
const fs = {
  label: "clamp(9px, 1vw, 11px)",
  body:  "clamp(12px, 1.4vw, 14px)",
  title: "clamp(14px, 1.8vw, 18px)",
  small: "clamp(11px, 1.2vw, 13px)",
};

export default function TaskView({ task, taskNumber, totalTasks, onComplete }: TaskViewProps) {
  const [prompt, setPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [stars, setStars] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");

  const config = typeColors[task.type];
  const wordCount = prompt.trim().split(/\s+/).filter(Boolean).length;
  const canSubmit = prompt.trim().length >= 10;

  const handleSubmit = async () => {
    if (!canSubmit || isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          task: {
            type: task.type,
            situation: task.situation,
            instruction: task.instruction,
            keywords: task.keywords,
            badPrompt: task.badPrompt,
            badOutput: task.badOutput,
          },
        }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setStars(data.stars);
      setAiResponse(data.response);
      setAiFeedback(data.feedback);
    } catch {
      setStars(evaluatePromptFallback(prompt, task));
      setAiResponse("");
      setAiFeedback("");
    } finally {
      setIsLoading(false);
      setShowResult(true);
    }
  };

  const feedbackText =
    aiFeedback ||
    (stars === 3 ? task.feedback.threeStars : stars === 2 ? task.feedback.twoStars : task.feedback.oneStar);

  return (
    <>
      <div
        className="flex-1 min-h-0 flex flex-col max-w-3xl mx-auto w-full"
        style={{ padding: "clamp(8px, 1.5vh, 20px) clamp(12px, 2vw, 24px)", gap: "clamp(6px, 1.2vh, 12px)" }}
      >

        {/* Title + type badge */}
        <div className="flex items-start justify-between gap-3 shrink-0">
          <h2 className="font-black text-text-primary flex-1 leading-snug" style={{ fontSize: fs.title }}>
            {task.title}
          </h2>
          <span className="type-badge shrink-0 mt-0.5" style={{ background: config.color }}>
            {typeIcons[task.type]}
            {config.label}
          </span>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 shrink-0" style={{ gap: "clamp(6px, 1vw, 12px)" }}>
          {/* Situation */}
          <div className="info-card">
            <p className="font-black text-text-tertiary uppercase tracking-wider flex items-center gap-1.5" style={{ fontSize: fs.label, marginBottom: "clamp(4px, 0.6vh, 8px)" }}>
              <IconPin size={11} color="#A8A4B8" />
              Situation
            </p>
            <p className="font-semibold text-text-primary leading-snug" style={{ fontSize: fs.body }}>
              {task.situation}
            </p>
          </div>

          {/* Task or bad prompt */}
          {task.type === "fehler" && task.badPrompt ? (
            <div className="rounded-[16px] border-2" style={{ background: "#FEE2E2", borderColor: "#DC262620", padding: "clamp(8px, 1.2vh, 14px) clamp(10px, 1.2vw, 14px)" }}>
              <p className="font-black text-error uppercase tracking-wider flex items-center gap-1.5" style={{ fontSize: fs.label, marginBottom: "clamp(4px, 0.6vh, 8px)" }}>
                <IconXCircle size={11} color="#DC2626" />
                Fehlerhafter Prompt
              </p>
              <p className="font-semibold text-text-primary italic" style={{ fontSize: fs.body }}>
                &quot;{task.badPrompt}&quot;
              </p>
            </div>
          ) : (
            <div className="rounded-[16px] border-2" style={{ background: config.bg, borderColor: `${config.color}20`, padding: "clamp(8px, 1.2vh, 14px) clamp(10px, 1.2vw, 14px)" }}>
              <p className="font-black uppercase tracking-wider flex items-center gap-1.5" style={{ fontSize: fs.label, color: config.color, marginBottom: "clamp(4px, 0.6vh, 8px)" }}>
                {typeIcons[task.type]}
                Deine Aufgabe
              </p>
              <p className="font-semibold text-text-primary leading-snug" style={{ fontSize: fs.body }}>
                {task.instruction}
              </p>
            </div>
          )}
        </div>

        {/* Bad output (fehler type) */}
        {task.type === "fehler" && task.badOutput && (
          <div className="grid grid-cols-2 shrink-0" style={{ gap: "clamp(6px, 1vw, 12px)" }}>
            <div className="rounded-[16px] border-2" style={{ background: "#FFF7ED", borderColor: "#EA580C20", padding: "clamp(8px, 1.2vh, 14px) clamp(10px, 1.2vw, 14px)" }}>
              <p className="font-black text-xp uppercase tracking-wider flex items-center gap-1.5" style={{ fontSize: fs.label, marginBottom: "clamp(4px, 0.6vh, 8px)" }}>
                <svg width="11" height="11" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="11" width="32" height="24" rx="6" fill="#EA580C"/>
                  <rect x="14" y="18" width="8" height="7" rx="2" fill="white"/>
                  <rect x="26" y="18" width="8" height="7" rx="2" fill="white"/>
                </svg>
                KI-Antwort (falsch)
              </p>
              <p className="font-semibold text-text-primary leading-snug line-clamp-3" style={{ fontSize: fs.body }}>
                {task.badOutput}
              </p>
            </div>
            <div className="rounded-[16px] border-2" style={{ background: config.bg, borderColor: `${config.color}20`, padding: "clamp(8px, 1.2vh, 14px) clamp(10px, 1.2vw, 14px)" }}>
              <p className="font-black uppercase tracking-wider flex items-center gap-1.5" style={{ fontSize: fs.label, color: config.color, marginBottom: "clamp(4px, 0.6vh, 8px)" }}>
                {typeIcons[task.type]}
                Deine Aufgabe
              </p>
              <p className="font-semibold text-text-primary leading-snug" style={{ fontSize: fs.body }}>
                {task.instruction}
              </p>
            </div>
          </div>
        )}

        {/* Hints */}
        <div className="shrink-0">
          <button
            onClick={() => setShowHints(!showHints)}
            className="font-black flex items-center gap-1.5"
            style={{ color: "#7C3AED", fontSize: fs.small }}
          >
            <IconLightbulb size={14} color="#7C3AED" />
            {showHints ? "Tipps ausblenden" : "Tipps anzeigen"}
          </button>
          {showHints && (
            <div
              className="rounded-[16px] animate-fade-in border-2 overflow-y-auto"
              style={{ background: "#F5F3FF", borderColor: "#7C3AED20", marginTop: "clamp(4px, 0.6vh, 8px)", padding: "clamp(8px, 1vh, 12px)", maxHeight: "clamp(80px, 12vh, 140px)" }}
            >
              <div className="flex flex-col gap-1.5">
                {task.hints.map((hint, i) => (
                  <p key={i} className="font-semibold text-text-primary flex gap-2 items-start" style={{ fontSize: fs.small }}>
                    <IconLightbulb size={13} color="#7C3AED" />
                    <span>{hint}</span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Textarea or AI response — fills remaining space */}
        <div className="flex-1 min-h-0">
          {showResult && aiResponse ? (
            <div
              className="h-full overflow-y-auto rounded-[16px] border-2"
              style={{ background: "#DCFCE7", borderColor: "#16A34A20", padding: "clamp(8px, 1.2vh, 14px) clamp(10px, 1.2vw, 14px)" }}
            >
              <p className="font-black text-success uppercase tracking-wider flex items-center gap-1.5" style={{ fontSize: fs.label, marginBottom: "clamp(4px, 0.6vh, 8px)" }}>
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8L6.5 12.5L14 4" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                KI-Antwort auf deinen Prompt
              </p>
              <p className="font-semibold text-text-primary leading-relaxed whitespace-pre-line" style={{ fontSize: fs.body }}>
                {aiResponse}
              </p>
            </div>
          ) : (
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Schreibe hier deinen Prompt ..."
              className="prompt-textarea"
              disabled={isLoading}
            />
          )}
        </div>

        {/* Submit bar */}
        <div className="flex items-center justify-between shrink-0">
          <span className="font-bold text-text-tertiary flex items-center gap-1.5" style={{ fontSize: fs.small }}>
            <IconPencil size={13} color="#A8A4B8" />
            {wordCount} {wordCount === 1 ? "Wort" : "Wörter"}
          </span>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin border-2 border-[#E8E8F0] rounded-full" style={{ width: "clamp(16px, 2vw, 20px)", height: "clamp(16px, 2vw, 20px)", borderTopColor: "#7C3AED" }} />
              <span className="font-bold text-text-secondary" style={{ fontSize: fs.small }}>KI analysiert...</span>
            </div>
          ) : !showResult ? (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="btn-primary"
              style={!canSubmit ? { opacity: 0.4, cursor: "not-allowed" } : {}}
            >
              Überprüfen
            </button>
          ) : null}
        </div>

        {/* Example prompt */}
        {showResult && (
          <div className="shrink-0">
            <button
              onClick={() => setShowExample(!showExample)}
              className="font-black flex items-center gap-1.5"
              style={{ color: "#7C3AED", fontSize: fs.small }}
            >
              <IconEye size={14} color="#7C3AED" />
              {showExample ? "Beispiel ausblenden" : "Beispiel-Prompt anzeigen"}
            </button>
            {showExample && (
              <div
                className="rounded-[16px] animate-fade-in border-2 overflow-y-auto"
                style={{ background: "#EDE9FE", borderColor: "#7C3AED20", marginTop: "clamp(4px, 0.6vh, 8px)", padding: "clamp(8px, 1vh, 12px)", maxHeight: "clamp(70px, 10vh, 110px)" }}
              >
                <p className="font-black uppercase tracking-wider" style={{ color: "#7C3AED", fontSize: fs.label, marginBottom: "clamp(3px, 0.5vh, 6px)" }}>
                  Beispiel-Prompt
                </p>
                <p className="font-semibold text-text-primary italic leading-relaxed" style={{ fontSize: fs.small }}>
                  &quot;{task.exampleGoodPrompt}&quot;
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {showResult && (
        <StarRating
          stars={stars}
          feedback={feedbackText}
          onContinue={() => onComplete(stars)}
          isLastTask={taskNumber === totalTasks}
        />
      )}
    </>
  );
}
