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

  // Check keyword matches
  const matchedKeywords = task.keywords.filter((kw) =>
    lower.includes(kw.toLowerCase())
  );
  const keywordRatio = matchedKeywords.length / task.keywords.length;

  // Length check - good prompts are usually longer
  if (words.length >= 30) score += 2;
  else if (words.length >= 15) score += 1;

  // Keyword scoring
  if (keywordRatio >= 0.4) score += 3;
  else if (keywordRatio >= 0.2) score += 2;
  else if (keywordRatio >= 0.1) score += 1;

  // Type-specific checks
  if (task.type === "rolle") {
    if (lower.includes("du bist") || lower.includes("stell dir vor"))
      score += 2;
  }
  if (task.type === "ergebnis") {
    // Check for format indicators
    const formatIndicators = [
      "1)",
      "2)",
      "3)",
      "format",
      "liste",
      "gib mir",
      "zusammenfassung",
      "stichpunkt",
      "- ",
    ];
    const hasFormat = formatIndicators.some((f) => lower.includes(f));
    if (hasFormat) score += 2;
  }

  // Convert score to stars
  if (score >= 6) return 3;
  if (score >= 3) return 2;
  return 1;
}

export default function TaskView({
  task,
  taskNumber,
  totalTasks,
  scenarioColor,
  onComplete,
}: TaskViewProps) {
  const [prompt, setPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [stars, setStars] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const typeLabels = {
    rolle: "🎭 Rolle vergeben",
    fehler: "🔍 Fehler finden",
    ergebnis: "🎯 Ergebnis definieren",
  };

  const handleSubmit = () => {
    if (prompt.trim().length < 10) return;
    const result = evaluatePrompt(prompt, task);
    setStars(result);
    setShowResult(true);
  };

  const getFeedback = () => {
    if (stars === 3) return task.feedback.threeStars;
    if (stars === 2) return task.feedback.twoStars;
    return task.feedback.oneStar;
  };

  return (
    <div className="min-h-dvh bg-bg-primary p-4 pb-8">
      {/* Progress bar */}
      <div className="max-w-lg mx-auto mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">
            Aufgabe {taskNumber} von {totalTasks}
          </span>
          <span className="text-sm font-medium">{typeLabels[task.type]}</span>
        </div>
        <div className="h-2 bg-bg-card rounded-full overflow-hidden">
          <div
            className={`h-full bg-${scenarioColor} rounded-full transition-all duration-500`}
            style={{ width: `${(taskNumber / totalTasks) * 100}%` }}
          />
        </div>
      </div>

      {/* Task content */}
      <div className="max-w-lg mx-auto space-y-4 animate-slide-up">
        <h2 className="text-xl font-bold">{task.title}</h2>

        {/* Situation */}
        <div className="bg-bg-secondary rounded-xl p-4">
          <p className="text-sm font-semibold text-text-secondary mb-1">
            Situation
          </p>
          <p className="text-sm leading-relaxed">{task.situation}</p>
        </div>

        {/* Bad prompt + output for "fehler" type */}
        {task.type === "fehler" && task.badPrompt && task.badOutput && (
          <div className="space-y-3">
            <div className="bg-accent-red/10 border border-accent-red/30 rounded-xl p-4">
              <p className="text-sm font-semibold text-accent-red mb-1">
                ❌ Fehlerhafter Prompt
              </p>
              <p className="text-sm italic">&quot;{task.badPrompt}&quot;</p>
            </div>
            <div className="bg-accent-orange/10 border border-accent-orange/30 rounded-xl p-4">
              <p className="text-sm font-semibold text-accent-orange mb-1">
                🤖 Falsches Ergebnis
              </p>
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {task.badOutput}
              </p>
            </div>
          </div>
        )}

        {/* Instruction */}
        <div className="bg-bg-card rounded-xl p-4 border border-white/5">
          <p className="text-sm font-semibold mb-1">📝 Deine Aufgabe</p>
          <p className="text-sm leading-relaxed text-text-secondary">
            {task.instruction}
          </p>
        </div>

        {/* Hints toggle */}
        <button
          onClick={() => setShowHints(!showHints)}
          className="text-sm text-accent-purple hover:underline"
        >
          {showHints ? "💡 Tipps ausblenden" : "💡 Brauchst du Tipps?"}
        </button>

        {showHints && (
          <div className="bg-accent-purple/10 border border-accent-purple/20 rounded-xl p-4 animate-fade-in">
            <ul className="space-y-1">
              {task.hints.map((hint, i) => (
                <li key={i} className="text-sm text-text-secondary">
                  • {hint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Prompt input */}
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Schreibe deinen Prompt hier..."
            className="w-full h-36 bg-bg-secondary border border-white/10 rounded-xl p-4 text-sm resize-none focus:outline-none focus:border-accent-purple transition-colors placeholder:text-text-secondary/50"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-text-secondary">
              {prompt.trim().split(/\s+/).filter(Boolean).length} Wörter
            </span>
            <button
              onClick={handleSubmit}
              disabled={prompt.trim().length < 10}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                prompt.trim().length >= 10
                  ? `bg-${scenarioColor} text-white hover:brightness-110 animate-pulse-glow`
                  : "bg-bg-card text-text-secondary cursor-not-allowed"
              }`}
            >
              Prompt abschicken
            </button>
          </div>
        </div>

        {/* Show example after submission */}
        {showResult && (
          <div className="mt-4">
            <button
              onClick={() => setShowExample(!showExample)}
              className="text-sm text-accent-green hover:underline"
            >
              {showExample
                ? "✅ Beispiel-Prompt ausblenden"
                : "✅ Beispiel-Prompt anzeigen"}
            </button>
            {showExample && (
              <div className="bg-accent-green/10 border border-accent-green/20 rounded-xl p-4 mt-2 animate-fade-in">
                <p className="text-sm font-semibold text-accent-green mb-1">
                  So könnte ein guter Prompt aussehen:
                </p>
                <p className="text-sm italic text-text-secondary">
                  &quot;{task.exampleGoodPrompt}&quot;
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Star Rating Modal */}
      {showResult && (
        <StarRating
          stars={stars}
          feedback={getFeedback()}
          onContinue={() => onComplete(stars)}
          isLastTask={taskNumber === totalTasks}
        />
      )}
    </div>
  );
}
