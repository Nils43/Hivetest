"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { scenarios } from "@/data/scenarios";
import { typeColors } from "@/data/scenarioColors";
import TaskView from "@/components/TaskView";
import { IconArrowLeft, IconLightbulb, IconMask, IconMagnify, IconTarget, IconCheck, IconRefresh } from "@/components/Icons";
import { CharacterCelebrate, CharacterProud, CharacterDetermined } from "@/components/Characters";

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
      <div className="h-dvh bg-content-bg flex items-center justify-center p-6">
        <div className="card text-center p-10 max-w-sm w-full">
          <p className="text-[18px] font-black text-text-primary mb-4">Mission nicht gefunden</p>
          <button onClick={() => router.push("/")} className="btn-primary">Zurück</button>
        </div>
      </div>
    );
  }

  if (completed) {
    // 3 stars = success green, 2 stars = brand violet, 1 star = warm orange
    const cfg = totalStars >= 7
      ? { icon: <CharacterCelebrate  size={100} />, title: "Prompt-Profi!",       subtitle: "Unglaublich! Du bist ein KI-Meister!",    color: "#16A34A", bg: "#DCFCE7", border: "#16A34A" }
      : totalStars >= 4
        ? { icon: <CharacterProud    size={100} />, title: "Guter Fortschritt!", subtitle: "Weiter so – du wirst immer besser!",        color: "#7C3AED", bg: "#EDE9FE", border: "#7C3AED" }
        : { icon: <CharacterDetermined size={100} />, title: "Weiter üben!",     subtitle: "Jede Übung macht dich besser!",            color: "#EA580C", bg: "#FFF7ED", border: "#EA580C" };

    const learnings = [
      { icon: <IconMask    size={18} color={typeColors.rolle.color}    />, title: "Rolle vergeben",    desc: "Die richtige Perspektive gibt bessere Antworten.", color: typeColors.rolle.color,    bg: typeColors.rolle.bg },
      { icon: <IconLightbulb size={18} color={typeColors.fehler.color} />, title: "Kontext geben",     desc: "Ohne Details liefert KI falsche Ergebnisse.",      color: typeColors.fehler.color,   bg: typeColors.fehler.bg },
      { icon: <IconTarget  size={18} color={typeColors.ergebnis.color} />, title: "Ergebnis definieren", desc: "Klare Zieldefinition = besseres Ergebnis.",       color: typeColors.ergebnis.color, bg: typeColors.ergebnis.bg },
    ];

    return (
      <div className="h-dvh bg-content-bg px-4 sm:px-6 py-6 flex flex-col overflow-y-auto">
        <div className="w-full max-w-lg mx-auto my-auto animate-slide-up">
          <div className="card p-6 sm:p-8 text-center mb-4">
            <div className="flex justify-center mb-3">{cfg.icon}</div>
            <h2 className="text-[24px] sm:text-[28px] font-black mb-1" style={{ color: cfg.color }}>{cfg.title}</h2>
            <p className="text-text-secondary text-[14px] font-semibold mb-5">{cfg.subtitle}</p>

            {/* Stars per task */}
            <div className="flex justify-center gap-5 sm:gap-8 mb-5">
              {taskStars.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-[10px] font-black text-text-tertiary uppercase tracking-wider mb-1.5">Aufgabe {i + 1}</p>
                  <div className="flex gap-0.5 justify-center">
                    {[1, 2, 3].map((n) => (
                      <svg key={n} width="20" height="20" viewBox="0 0 48 48" fill="none">
                        <path
                          d="M24 4L29.4 16.6L43 18.3L33.2 27.7L35.8 41.2L24 34.5L12.2 41.2L14.8 27.7L5 18.3L18.6 16.6L24 4Z"
                          fill={n <= s ? "#FFD900" : "#E8E8F0"}
                          stroke={n <= s ? "#C8A000" : "#D0D0DC"}
                          strokeWidth="1.5" strokeLinejoin="round"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Score row */}
            <div className="bg-content-bg rounded-[16px] p-4 sm:p-5 mb-5 flex items-center justify-center gap-5 sm:gap-8">
              <div>
                <p className="text-[26px] sm:text-[30px] font-black text-text-primary">{totalStars}/9</p>
                <p className="text-[10px] font-black text-text-tertiary uppercase tracking-wider">Sterne</p>
              </div>
              <div className="w-px h-10 bg-card-border" />
              <div>
                <p className="text-[26px] sm:text-[30px] font-black xp-shimmer">{totalXP}</p>
                <p className="text-[10px] font-black text-text-tertiary uppercase tracking-wider">XP</p>
              </div>
              <div className="w-px h-10 bg-card-border" />
              <div>
                <p className="text-[26px] sm:text-[30px] font-black" style={{ color: cfg.color }}>
                  {totalStars >= 7 ? "S" : totalStars >= 4 ? "A" : "B"}
                </p>
                <p className="text-[10px] font-black text-text-tertiary uppercase tracking-wider">Rang</p>
              </div>
            </div>

            {/* Learnings */}
            <div className="text-left space-y-2">
              <p className="text-[10px] font-black text-text-tertiary uppercase tracking-wider mb-3 text-center">
                Was du gelernt hast
              </p>
              {learnings.map((l, i) => (
                <div
                  key={i}
                  className="rounded-[16px] p-3 flex items-start gap-3"
                  style={{ background: l.bg, border: `2px solid ${l.color}20` }}
                >
                  <div className="mt-0.5 shrink-0">{l.icon}</div>
                  <div>
                    <p className="font-black text-[13px]" style={{ color: l.color }}>{l.title}</p>
                    <p className="text-[12px] font-semibold text-text-secondary">{l.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={() => router.push("/")} className="btn-primary w-full">
              Neue Mission
            </button>
            <button
              onClick={() => { setCurrentTask(0); setCompleted(false); setTotalStars(0); setTaskStars([]); }}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <IconRefresh size={16} color="#6B6880" />
              Nochmal versuchen
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = (currentTask / scenario.tasks.length) * 100;

  return (
    <div className="h-dvh flex flex-col bg-content-bg">
      {/* ── Header ── */}
      <div className="bg-white border-b-2 border-card-border flex items-center gap-3 shrink-0" style={{ padding: "clamp(8px, 1.2vh, 14px) clamp(12px, 1.5vw, 20px)" }}>
        <button
          onClick={() => router.push("/")}
          className="rounded-[12px] flex items-center justify-center hover:bg-brand-light transition-colors shrink-0"
          style={{ background: "#EDE9FE", border: "2px solid #C4B5FD", borderBottomWidth: "4px", width: "clamp(32px, 4vw, 42px)", height: "clamp(32px, 4vw, 42px)" }}
        >
          <IconArrowLeft size={18} color="#7C3AED" />
        </button>
        <div className="flex-1 flex flex-col" style={{ gap: "clamp(4px, 0.6vh, 8px)" }}>
          <div className="flex justify-between font-black text-text-tertiary" style={{ fontSize: "clamp(9px, 1vw, 11px)" }}>
            <span>{scenario.title}</span>
            <span className="flex items-center gap-1">
              {currentTask}/{scenario.tasks.length}
              <IconCheck size={11} color="#7C3AED" />
            </span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
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
