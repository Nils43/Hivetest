"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { scenarios } from "@/data/scenarios";
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
      <div className="min-h-dvh bg-k-purple flex items-center justify-center p-6">
        <div className="content-card text-center p-10">
          <p className="text-[20px] font-black text-k-dark-gray mb-4">Mission nicht gefunden</p>
          <button onClick={() => router.push("/")} className="btn-kahoot btn-kahoot-blue">Zurück</button>
        </div>
      </div>
    );
  }

  if (completed) {
    const cfg = totalStars >= 7
      ? { title: "Prompt-Profi!", color: "#26890C", rank: "S" }
      : totalStars >= 4
        ? { title: "Guter Fortschritt!", color: "#1368CE", rank: "A" }
        : { title: "Weiter üben!", color: "#EB670F", rank: "B" };

    return (
      <div className="min-h-dvh bg-k-purple flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-lg animate-slide-up">
          <div className="content-card p-6 sm:p-8 text-center mb-4">
            <h2 className="text-[24px] sm:text-[28px] font-black mb-1" style={{ color: cfg.color }}>{cfg.title}</h2>
            <p className="text-k-gray text-[14px] font-bold mb-6">Mission &quot;{scenario.title}&quot; abgeschlossen</p>

            {/* Stars per task */}
            <div className="flex justify-center gap-6 sm:gap-8 mb-5">
              {taskStars.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-[10px] font-black text-k-gray uppercase tracking-[2px] mb-1">Task {i + 1}</p>
                  <div className="flex gap-0.5 justify-center">
                    {[1, 2, 3].map((n) => (
                      <span key={n} className="text-[18px]" style={{ color: n <= s ? "#FFC00A" : "#E5E5E5" }}>★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Score row */}
            <div className="bg-k-near-white rounded-lg p-4 sm:p-5 mb-6 flex items-center justify-center gap-5 sm:gap-8">
              <div>
                <p className="text-[24px] sm:text-[28px] font-black text-k-dark-gray">{totalStars}/9</p>
                <p className="text-[10px] font-black text-k-gray uppercase tracking-[2px]">Sterne</p>
              </div>
              <div className="w-px h-10 bg-k-gray/30" />
              <div>
                <p className="text-[24px] sm:text-[28px] font-black xp-shimmer">{totalXP}</p>
                <p className="text-[10px] font-black text-k-gray uppercase tracking-[2px]">XP</p>
              </div>
              <div className="w-px h-10 bg-k-gray/30" />
              <div>
                <p className="text-[24px] sm:text-[28px] font-black" style={{ color: cfg.color }}>{cfg.rank}</p>
                <p className="text-[10px] font-black text-k-gray uppercase tracking-[2px]">Rang</p>
              </div>
            </div>

            {/* Learnings */}
            <div className="text-left space-y-2">
              <p className="text-[10px] font-black text-k-gray uppercase tracking-[2px] mb-3 text-center">Was du gelernt hast</p>
              {[
                { title: "Rolle", desc: "Die richtige Perspektive gibt bessere Antworten.", color: "#864CBF" },
                { title: "Kontext", desc: "Ohne Details liefert KI falsche Ergebnisse.", color: "#E21B3C" },
                { title: "Ergebnis", desc: "Klare Zieldefinition = besseres Ergebnis.", color: "#1368CE" },
              ].map((l, i) => (
                <div key={i} className="bg-k-near-white rounded-lg p-3 flex items-start gap-3" style={{ borderLeft: `4px solid ${l.color}` }}>
                  <div>
                    <p className="font-black text-[13px]" style={{ color: l.color }}>{l.title}</p>
                    <p className="text-[12px] text-k-gray">{l.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={() => router.push("/")} className="btn-kahoot btn-kahoot-green w-full">Neue Mission</button>
            <button onClick={() => { setCurrentTask(0); setCompleted(false); setTotalStars(0); setTaskStars([]); }} className="btn-kahoot btn-kahoot-white w-full">
              Nochmal versuchen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-k-purple-deep py-3 px-4 flex items-center gap-3 sticky top-0 z-30 border-b border-white/10">
        <button onClick={() => router.push("/")} className="w-10 h-10 rounded bg-white/10 flex items-center justify-center text-white font-black text-lg hover:bg-white/20 transition-colors shrink-0">
          ←
        </button>
        <h1 className="font-black text-white text-[15px] sm:text-[17px] flex-1 text-center pr-10">{scenario.title}</h1>
      </div>

      <TaskView
        key={currentTask}
        task={scenario.tasks[currentTask]}
        taskNumber={currentTask + 1}
        totalTasks={scenario.tasks.length}
        scenarioColor={scenario.color}
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
