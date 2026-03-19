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

const fs = {
  label: "clamp(10px, 1.1vw, 12px)",
  body:  "clamp(14px, 1.6vw, 16px)",
  title: "clamp(18px, 2.4vw, 22px)",
  small: "clamp(13px, 1.4vw, 15px)",
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
        style={{ padding: "clamp(14px, 2vh, 24px) clamp(16px, 2.5vw, 28px)", gap: "clamp(10px, 1.5vh, 16px)" }}
      >

        {/* Title + type badge */}
        <div className="flex items-start justify-between gap-3 shrink-0">
          <h2 className="font-black flex-1 leading-snug" style={{ fontSize: fs.title, color: "#1A1A2E" }}>
            {task.title}
          </h2>
          <span className="type-badge shrink-0 mt-0.5" style={{ background: config.color }}>
            {typeIcons[task.type]}
            {config.label}
          </span>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 shrink-0" style={{ gap: "clamp(8px, 1.2vw, 14px)" }}>
          {/* Situation */}
          <div className="info-card">
            <p className="font-black uppercase tracking-wider flex items-center gap-1.5" style={{ fontSize: fs.label, color: "#9090AA", marginBottom: "clamp(6px, 0.8vh, 10px)" }}>
              <IconPin size={11} color="#9090AA" />
              Situation
            </p>
            <p className="font-semibold leading-snug" style={{ fontSize: fs.body, color: "#1A1A2E" }}>
              {task.situation}
            </p>
          </div>

          {/* Task or bad prompt */}
          {task.type === "fehler" && task.badPrompt ? (
            <div className="rounded-[16px] border-2" style={{ background: "#FFE8EA", borderColor: "#E6394625", padding: "clamp(12px, 1.5vh, 16px) clamp(12px, 1.5vw, 16px)" }}>
              <p className="font-black uppercase tracking-wider flex items-center gap-1.5" style={{ fontSize: fs.label, color: "#E63946", marginBottom: "clamp(6px, 0.8vh, 10px)" }}>
                <IconXCircle size={11} color="#E63946" />
                Fehlerhafter Prompt
              </p>
              <p className="font-semibold italic" style={{ fontSize: fs.body, color: "#1A1A2E" }}>
                &quot;{task.badPrompt}&quot;
              </p>
            </div>
          ) : (
            <div className="rounded-[16px] border-2" style={{ background: config.bg, borderColor: `${config.color}20`, padding: "clamp(12px, 1.5vh, 16px) clamp(12px, 1.5vw, 16px)" }}>
              <p className="font-black uppercase tracking-wider flex items-center gap-1.5" style={{ fontSize: fs.label, color: config.color, marginBottom: "clamp(6px, 0.8vh, 10px)" }}>
                {typeIcons[task.type]}
                Deine Aufgabe
              </p>
              <p className="font-semibold leading-snug" style={{ fontSize: fs.body, color: "#1A1A2E" }}>
                {task.instruction}
              </p>
            </div>
          )}
        </div>

        {/* Bad output (fehler type) */}
        {task.type === "fehler" && task.badOutput && (
          <div className="grid grid-cols-1 sm:grid-cols-2 shrink-0" style={{ gap: "clamp(8px, 1.2vw, 14px)" }}>
            <div className="rounded-[16px] border-2" style={{ background: "#FFE4EF", borderColor: "#FF6B9D20", padding: "clamp(12px, 1.5vh, 16px) clamp(12px, 1.5vw, 16px)" }}>
              <p className="font-black uppercase tracking-wider flex items-center gap-1.5" style={{ color: "#FF6B9D", fontSize: fs.label, marginBottom: "clamp(6px, 0.8vh, 10px)" }}>
                <svg width="11" height="11" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="11" width="32" height="24" rx="6" fill="#FF6B9D"/>
                  <rect x="14" y="18" width="8" height="7" rx="2" fill="white"/>
                  <rect x="26" y="18" width="8" height="7" rx="2" fill="white"/>
                </svg>
                KI-Antwort (falsch)
              </p>
              <p className="font-semibold leading-snug line-clamp-3" style={{ fontSize: fs.body, color: "#1A1A2E" }}>
                {task.badOutput}
              </p>
            </div>
            <div className="rounded-[16px] border-2" style={{ background: config.bg, borderColor: `${config.color}20`, padding: "clamp(12px, 1.5vh, 16px) clamp(12px, 1.5vw, 16px)" }}>
              <p className="font-black uppercase tracking-wider flex items-center gap-1.5" style={{ fontSize: fs.label, color: config.color, marginBottom: "clamp(6px, 0.8vh, 10px)" }}>
                {typeIcons[task.type]}
                Deine Aufgabe
              </p>
              <p className="font-semibold leading-snug" style={{ fontSize: fs.body, color: "#1A1A2E" }}>
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
            style={{ color: "#7B2FBE", fontSize: fs.small }}
          >
            <IconLightbulb size={15} color="#7B2FBE" />
            {showHints ? "Tipps ausblenden" : "Tipps anzeigen"}
          </button>
          {showHints && (
            <div
              className="rounded-[16px] animate-fade-in border-2 overflow-y-auto"
              style={{ background: "#EDE0FF", borderColor: "#7B2FBE20", marginTop: "clamp(6px, 0.8vh, 10px)", padding: "clamp(10px, 1.2vh, 14px)", maxHeight: "clamp(90px, 13vh, 150px)" }}
            >
              <div className="flex flex-col gap-2">
                {task.hints.map((hint, i) => (
                  <p key={i} className="font-semibold flex gap-2 items-start" style={{ fontSize: fs.small, color: "#1A1A2E" }}>
                    <IconLightbulb size={14} color="#7B2FBE" />
                    <span>{hint}</span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Textarea or AI response */}
        <div className="flex-1 min-h-0">
          {showResult && aiResponse ? (
            <div
              className="h-full overflow-y-auto rounded-[16px] border-2"
              style={{ background: "#CCFAED", borderColor: "#06D6A020", padding: "clamp(12px, 1.5vh, 16px) clamp(12px, 1.5vw, 16px)" }}
            >
              <p className="font-black uppercase tracking-wider flex items-center gap-1.5" style={{ color: "#06D6A0", fontSize: fs.label, marginBottom: "clamp(6px, 0.8vh, 10px)" }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8L6.5 12.5L14 4" stroke="#06D6A0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                KI-Antwort auf deinen Prompt
              </p>
              <p className="font-semibold leading-relaxed whitespace-pre-line" style={{ fontSize: fs.body, color: "#1A1A2E" }}>
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
          <span className="font-bold flex items-center gap-1.5" style={{ fontSize: fs.small, color: "#9090AA" }}>
            <IconPencil size={14} color="#9090AA" />
            {wordCount} {wordCount === 1 ? "Wort" : "Wörter"}
          </span>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin border-2 rounded-full" style={{ width: "clamp(18px, 2.2vw, 22px)", height: "clamp(18px, 2.2vw, 22px)", borderColor: "#E8E6F0", borderTopColor: "#3A86FF" }} />
              <span className="font-bold" style={{ fontSize: fs.small, color: "#9090AA" }}>KI analysiert...</span>
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
              style={{ color: "#3A86FF", fontSize: fs.small }}
            >
              <IconEye size={15} color="#3A86FF" />
              {showExample ? "Beispiel ausblenden" : "Beispiel-Prompt anzeigen"}
            </button>
            {showExample && (
              <div
                className="rounded-[16px] animate-fade-in border-2 overflow-y-auto"
                style={{ background: "#E0ECFF", borderColor: "#3A86FF20", marginTop: "clamp(6px, 0.8vh, 10px)", padding: "clamp(10px, 1.2vh, 14px)", maxHeight: "clamp(80px, 11vh, 120px)" }}
              >
                <p className="font-black uppercase tracking-wider" style={{ color: "#3A86FF", fontSize: fs.label, marginBottom: "clamp(4px, 0.5vh, 6px)" }}>
                  Beispiel-Prompt
                </p>
                <p className="font-semibold italic leading-relaxed" style={{ fontSize: fs.small, color: "#1A1A2E" }}>
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
