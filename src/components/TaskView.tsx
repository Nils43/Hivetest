"use client";

import { useState } from "react";
import type { Task } from "@/data/scenarios";
import StarRating from "./StarRating";

interface TaskViewProps {
  task: Task;
  taskNumber: number;
  totalTasks: number;
  scenarioColor: string;
  onComplete: (stars: number) => void;
}

function evaluatePrompt(input: string, task: Task): number {
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

const typeConfig: Record<string, { label: string; color: string }> = {
  rolle:    { label: "Rolle vergeben",    color: "#864CBF" },
  fehler:   { label: "Fehler finden",     color: "#E21B3C" },
  ergebnis: { label: "Ergebnis definieren", color: "#1368CE" },
};

export default function TaskView({ task, taskNumber, totalTasks, onComplete }: TaskViewProps) {
  const [prompt, setPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [stars, setStars] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const config = typeConfig[task.type];
  const wordCount = prompt.trim().split(/\s+/).filter(Boolean).length;
  const canSubmit = prompt.trim().length >= 10;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setStars(evaluatePrompt(prompt, task));
    setShowResult(true);
  };

  return (
    <>
      {/* Full viewport layout – no scrolling */}
      <div className="h-[calc(100dvh-65px)] bg-k-purple flex flex-col justify-center px-3 sm:px-5 py-3 sm:max-w-3xl sm:mx-auto">
        {/* Top: Steps + badge (compact) */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-0">
            {Array.from({ length: totalTasks }).map((_, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-black text-[11px] sm:text-[13px] ${
                  i < taskNumber - 1 ? "bg-k-green text-white" : i === taskNumber - 1 ? "bg-k-green text-white ring-2 ring-k-green/30" : "bg-white/15 text-white/50"
                }`}>
                  {i < taskNumber - 1 ? "✓" : i + 1}
                </div>
                {i < totalTasks - 1 && <div className={`w-6 sm:w-8 h-[3px] rounded ${i < taskNumber - 1 ? "bg-k-green" : "bg-white/15"}`} />}
              </div>
            ))}
          </div>
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[1px] px-2 sm:px-3 py-1 rounded" style={{ background: config.color }}>
            {config.label}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-[16px] sm:text-[20px] font-black text-white text-center mb-2">{task.title}</h2>

        {/* Middle: Content area – fills available space */}
        <div className="flex-1 flex flex-col min-h-0 gap-2">
          {/* Info cards row */}
          <div className="grid grid-cols-2 gap-2 flex-shrink-0">
            {/* Situation card */}
            <div className="bg-white rounded-lg p-2 sm:p-4 text-k-dark-gray">
              <p className="text-[9px] sm:text-[10px] font-black text-k-gray uppercase tracking-[2px] mb-1">Situation</p>
              <p className="text-[11px] sm:text-[13px] leading-snug">{task.situation}</p>
            </div>

            {/* Fehler type: show bad prompt instead of instruction here */}
            {task.type === "fehler" && task.badPrompt ? (
              <div className="bg-white rounded-lg p-2 sm:p-4 text-k-dark-gray" style={{ borderLeft: `3px solid #E21B3C` }}>
                <p className="text-[9px] sm:text-[10px] font-black text-k-red uppercase tracking-[2px] mb-1">Fehlerhafter Prompt</p>
                <p className="text-[11px] sm:text-[13px] italic bg-k-near-white rounded p-1.5">&quot;{task.badPrompt}&quot;</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-2 sm:p-4 text-k-dark-gray" style={{ borderLeft: `3px solid ${config.color}` }}>
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[2px] mb-1" style={{ color: config.color }}>Deine Aufgabe</p>
                <p className="text-[11px] sm:text-[13px] leading-snug">{task.instruction}</p>
              </div>
            )}
          </div>

          {/* For fehler: show instruction + bad output in a second row */}
          {task.type === "fehler" && task.badOutput && (
            <div className="grid grid-cols-2 gap-2 flex-shrink-0">
              <div className="bg-white rounded-lg p-2 sm:p-4 text-k-dark-gray" style={{ borderLeft: `3px solid #EB670F` }}>
                <p className="text-[9px] sm:text-[10px] font-black text-k-orange uppercase tracking-[2px] mb-1">KI-Antwort</p>
                <p className="text-[11px] sm:text-[13px] leading-snug line-clamp-3">{task.badOutput}</p>
              </div>
              <div className="bg-white rounded-lg p-2 sm:p-4 text-k-dark-gray" style={{ borderLeft: `3px solid ${config.color}` }}>
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[2px] mb-1" style={{ color: config.color }}>Deine Aufgabe</p>
                <p className="text-[11px] sm:text-[13px] leading-snug">{task.instruction}</p>
              </div>
            </div>
          )}

          {/* Hints (collapsible, compact) */}
          <div className="flex-shrink-0">
            <button onClick={() => setShowHints(!showHints)} className="text-[11px] sm:text-[12px] font-black text-k-golden uppercase tracking-[1px]">
              {showHints ? "— Tipps" : "+ Tipps"}
            </button>
            {showHints && (
              <div className="bg-white rounded-lg p-2 sm:p-3 mt-1 animate-fade-in text-k-dark-gray" style={{ borderLeft: "3px solid #FFC00A" }}>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {task.hints.map((hint, i) => (
                    <p key={i} className="text-[11px] sm:text-[12px]"><span className="text-k-golden font-black">&#x25B8;</span> {hint}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Textarea – flexible height, capped */}
          <div className="flex-1 flex flex-col min-h-0 max-h-[220px] sm:flex-none sm:h-[180px]">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Schreibe deinen Prompt hier ..."
              className="prompt-textarea flex-1"
              style={{ minHeight: "60px" }}
            />
          </div>

          {/* Button bar – directly under textarea */}
          <div className="flex items-center justify-between pt-2 flex-shrink-0">
            <span className="text-[12px] font-bold text-white/40">{wordCount} Wörter</span>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={canSubmit ? "btn-kahoot btn-kahoot-green" : "btn-kahoot btn-kahoot-white"}
              style={!canSubmit ? { opacity: 0.4 } : {}}
            >
              Abschicken
            </button>
          </div>

          {/* Example (only after result) */}
          {showResult && (
            <div className="flex-shrink-0">
              <button onClick={() => setShowExample(!showExample)} className="text-[11px] font-black text-k-bright-green uppercase tracking-[1px]">
                {showExample ? "— Beispiel" : "+ Beispiel-Prompt"}
              </button>
              {showExample && (
                <div className="bg-white rounded-lg p-2 sm:p-3 mt-1 animate-fade-in text-k-dark-gray" style={{ borderLeft: "3px solid #26890C" }}>
                  <p className="text-[11px] sm:text-[12px] italic leading-snug">&quot;{task.exampleGoodPrompt}&quot;</p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {showResult && (
        <StarRating
          stars={stars}
          feedback={stars === 3 ? task.feedback.threeStars : stars === 2 ? task.feedback.twoStars : task.feedback.oneStar}
          onContinue={() => onComplete(stars)}
          isLastTask={taskNumber === totalTasks}
        />
      )}
    </>
  );
}
