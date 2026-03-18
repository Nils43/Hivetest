"use client";

import { useState } from "react";
import type { Task } from "@/data/scenarios";
import { typeColors } from "@/data/scenarioColors";
import StarRating from "./StarRating";

interface TaskViewProps {
  task: Task;
  taskNumber: number;
  totalTasks: number;
  onComplete: (stars: number) => void;
}

// Fallback: regelbasierte Bewertung bei API-Ausfall
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
      const taskPayload = {
        type: task.type,
        situation: task.situation,
        instruction: task.instruction,
        keywords: task.keywords,
        badPrompt: task.badPrompt,
        badOutput: task.badOutput,
      };
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, task: taskPayload }),
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
    (stars === 3
      ? task.feedback.threeStars
      : stars === 2
        ? task.feedback.twoStars
        : task.feedback.oneStar);

  return (
    <>
      <div className="flex-1 bg-content-bg flex flex-col px-4 sm:px-6 py-4 sm:max-w-3xl sm:mx-auto overflow-y-auto">
        {/* Task type badge + title */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] sm:text-[18px] font-bold text-text-primary">{task.title}</h2>
          <span
            className="text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-lg text-white"
            style={{ background: config.color }}
          >
            {config.label}
          </span>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100">
            <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wider mb-1.5">Situation</p>
            <p className="text-[13px] sm:text-[14px] text-text-primary leading-relaxed">{task.situation}</p>
          </div>

          {task.type === "fehler" && task.badPrompt ? (
            <div className="bg-[#fef2f2] rounded-xl p-3 sm:p-4">
              <p className="text-[10px] font-medium text-error uppercase tracking-wider mb-1.5">Fehlerhafter Prompt</p>
              <p className="text-[13px] sm:text-[14px] text-text-primary italic">&quot;{task.badPrompt}&quot;</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100">
              <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: config.color }}>Deine Aufgabe</p>
              <p className="text-[13px] sm:text-[14px] text-text-primary leading-relaxed">{task.instruction}</p>
            </div>
          )}
        </div>

        {task.type === "fehler" && task.badOutput && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div className="bg-[#fff7ed] rounded-xl p-3 sm:p-4">
              <p className="text-[10px] font-medium text-xp uppercase tracking-wider mb-1.5">KI-Antwort</p>
              <p className="text-[13px] sm:text-[14px] text-text-primary leading-relaxed line-clamp-3">{task.badOutput}</p>
            </div>
            <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100">
              <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: config.color }}>Deine Aufgabe</p>
              <p className="text-[13px] sm:text-[14px] text-text-primary leading-relaxed">{task.instruction}</p>
            </div>
          </div>
        )}

        {/* Hints */}
        <div className="mb-3">
          <button onClick={() => setShowHints(!showHints)} className="text-[12px] font-medium text-xp">
            {showHints ? "– Tipps ausblenden" : "+ Tipps anzeigen"}
          </button>
          {showHints && (
            <div className="bg-white rounded-xl p-3 mt-2 border border-gray-100 animate-fade-in">
              <div className="flex flex-col gap-1.5">
                {task.hints.map((hint, i) => (
                  <p key={i} className="text-[13px] text-text-primary"><span className="text-xp mr-1.5">▸</span>{hint}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Textarea or AI Response */}
        <div className="flex-1 min-h-[100px] max-h-[220px] sm:max-h-[240px] mb-3">
          {showResult && aiResponse ? (
            <div className="h-full overflow-y-auto bg-white rounded-xl p-3 sm:p-4 border-l-4 border-success">
              <p className="text-[10px] font-medium text-success uppercase tracking-wider mb-1.5">KI-Antwort</p>
              <p className="text-[13px] sm:text-[14px] text-text-primary leading-relaxed whitespace-pre-line">{aiResponse}</p>
            </div>
          ) : (
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Schreibe deinen Prompt hier ..."
              className="prompt-textarea h-full"
              disabled={isLoading}
            />
          )}
        </div>

        {/* Button bar */}
        <div className="flex items-center justify-between py-2">
          <span className="text-[12px] font-medium text-text-secondary">{wordCount} Wörter</span>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin w-4 h-4 border-2 border-text-secondary/30 border-t-text-primary rounded-full" />
              <span className="text-[13px] font-medium text-text-secondary">KI analysiert...</span>
            </div>
          ) : !showResult ? (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={canSubmit ? "btn-primary" : "btn-secondary opacity-40 cursor-not-allowed"}
            >
              Abschicken
            </button>
          ) : null}
        </div>

        {/* Example prompt */}
        {showResult && (
          <div className="mt-1">
            <button onClick={() => setShowExample(!showExample)} className="text-[12px] font-medium text-success">
              {showExample ? "– Beispiel ausblenden" : "+ Beispiel-Prompt anzeigen"}
            </button>
            {showExample && (
              <div className="bg-white rounded-xl p-3 mt-2 border-l-4 border-success animate-fade-in">
                <p className="text-[13px] text-text-primary italic leading-relaxed">&quot;{task.exampleGoodPrompt}&quot;</p>
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
