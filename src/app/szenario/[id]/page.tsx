"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { scenarios } from "@/data/scenarios";
import { typeColors } from "@/data/scenarioColors";
import TaskView from "@/components/TaskView";

export default function SzenarioPage() {
  const params = useParams();
  const router = useRouter();
  const [currentTask, setCurrentTask] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [totalStars, setTotalStars] = useState(0);
  const [taskStars, setTaskStars] = useState<number[]>([]);

  const scenario = scenarios.find((s) => s.id === params.id);
  const totalXP = useMemo(() => taskStars.reduce((sum, s) => sum + (s === 3 ? 30 : s === 2 ? 20 : 10), 0), [taskStars]);

  if (!scenario) {
    return (
      <div className="min-h-dvh bg-shell flex items-center justify-center p-6">
        <div className="card text-center p-10 max-w-sm w-full">
          <p className="text-[20px] font-bold text-text-primary mb-4">Mission nicht gefunden</p>
          <button onClick={() => router.push("/")} className="btn-primary">Zurück</button>
        </div>
      </div>
    );
  }

  if (completed) {
    const cfg = totalStars >= 7
      ? { title: "Prompt-Profi!", color: "#10b981", rank: "S" }
      : totalStars >= 4
        ? { title: "Guter Fortschritt!", color: "#0f3460", rank: "A" }
        : { title: "Weiter üben!", color: "#e8793b", rank: "B" };

    const learnings = [
      { title: "Rolle", desc: "Die richtige Perspektive gibt bessere Antworten.", color: typeColors.rolle.color },
      { title: "Kontext", desc: "Ohne Details liefert KI falsche Ergebnisse.", color: typeColors.fehler.color },
      { title: "Ergebnis", desc: "Klare Zieldefinition = besseres Ergebnis.", color: typeColors.ergebnis.color },
    ];

    return (
      <div className="min-h-dvh bg-shell flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-lg animate-slide-up">
          <div className="card p-6 sm:p-8 text-center mb-4">
            <h2 className="text-[24px] sm:text-[28px] font-bold mb-1" style={{ color: cfg.color }}>{cfg.title}</h2>
            <p className="text-text-secondary text-[14px] mb-6">Mission &quot;{scenario.title}&quot; abgeschlossen</p>

            <div className="flex justify-center gap-6 sm:gap-8 mb-5">
              {taskStars.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wider mb-1">Task {i + 1}</p>
                  <div className="flex gap-0.5 justify-center">
                    {[1, 2, 3].map((n) => (
                      <span key={n} className="text-[18px]" style={{ color: n <= s ? "#f59e0b" : "#e2e8f0" }}>★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-content-bg rounded-xl p-4 sm:p-5 mb-6 flex items-center justify-center gap-5 sm:gap-8">
              <div>
                <p className="text-[24px] sm:text-[28px] font-bold text-text-primary">{totalStars}/9</p>
                <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wider">Sterne</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <p className="text-[24px] sm:text-[28px] font-bold xp-shimmer">{totalXP}</p>
                <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wider">XP</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <p className="text-[24px] sm:text-[28px] font-bold" style={{ color: cfg.color }}>{cfg.rank}</p>
                <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wider">Rang</p>
              </div>
            </div>

            <div className="text-left space-y-2">
              <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wider mb-3 text-center">Was du gelernt hast</p>
              {learnings.map((l, i) => (
                <div key={i} className="bg-white rounded-xl p-3 flex items-start gap-3 border border-gray-100" style={{ borderLeft: `4px solid ${l.color}` }}>
                  <div>
                    <p className="font-semibold text-[13px]" style={{ color: l.color }}>{l.title}</p>
                    <p className="text-[12px] text-text-secondary">{l.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={() => router.push("/")} className="btn-primary w-full">Neue Mission</button>
            <button onClick={() => { setCurrentTask(0); setCompleted(false); setTotalStars(0); setTaskStars([]); }} className="btn-secondary w-full">
              Nochmal versuchen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh flex flex-col">
      {/* Dark header */}
      <div className="bg-shell-light py-3 px-4 flex items-center gap-3 border-b border-white/5">
        <button onClick={() => router.push("/")} className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white font-medium text-lg hover:bg-white/15 transition-colors shrink-0">
          ←
        </button>
        <h1 className="font-semibold text-white text-[15px] sm:text-[16px] flex-1 text-center">{scenario.title}</h1>
        {/* Step dots */}
        <div className="flex items-center gap-1.5 shrink-0">
          {Array.from({ length: scenario.tasks.length }).map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i < currentTask ? "bg-success" : i === currentTask ? "bg-white" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      <TaskView
        key={currentTask}
        task={scenario.tasks[currentTask]}
        taskNumber={currentTask + 1}
        totalTasks={scenario.tasks.length}
        onComplete={(earnedStars: number) => {
          setTotalStars((prev) => prev + earnedStars);
          setTaskStars((prev) => [...prev, earnedStars]);
          if (currentTask < scenario.tasks.length - 1) setCurrentTask((prev) => prev + 1);
          else setCompleted(true);
        }}
      />
    </div>
  );
}