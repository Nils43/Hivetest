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
      <div className="h-dvh flex items-center justify-center p-6" style={{ background: "#F9F7F3" }}>
        <div className="card text-center p-10 max-w-sm w-full">
          <p className="font-black mb-4" style={{ fontSize: 18, color: "#1A1A2E" }}>Mission nicht gefunden</p>
          <button onClick={() => router.push("/")} className="btn-primary">Zurück</button>
        </div>
      </div>
    );
  }

  if (completed) {
    const cfg = totalStars >= 7
      ? { icon: <CharacterCelebrate  size={110} />, title: "Prompt-Profi!",       subtitle: "Unglaublich! Du bist ein KI-Meister!",  color: "#06D6A0", bg: "#CCFAED", border: "#06D6A0" }
      : totalStars >= 4
        ? { icon: <CharacterProud    size={110} />, title: "Guter Fortschritt!",  subtitle: "Weiter so – du wirst immer besser!",     color: "#3A86FF", bg: "#E0ECFF", border: "#3A86FF" }
        : { icon: <CharacterDetermined size={110} />, title: "Weiter üben!",      subtitle: "Jede Übung macht dich besser!",          color: "#E63946", bg: "#FFE8EA", border: "#E63946" };

    const learnings = [
      { icon: <IconMask      size={20} color={typeColors.rolle.color}    />, title: "Rolle vergeben",      desc: "Die richtige Perspektive gibt bessere Antworten.", color: typeColors.rolle.color,    bg: typeColors.rolle.bg },
      { icon: <IconLightbulb size={20} color={typeColors.fehler.color}   />, title: "Kontext geben",       desc: "Ohne Details liefert KI falsche Ergebnisse.",      color: typeColors.fehler.color,   bg: typeColors.fehler.bg },
      { icon: <IconTarget    size={20} color={typeColors.ergebnis.color} />, title: "Ergebnis definieren", desc: "Klare Zieldefinition = besseres Ergebnis.",         color: typeColors.ergebnis.color, bg: typeColors.ergebnis.bg },
    ];

    return (
      <div className="h-dvh flex flex-col overflow-y-auto" style={{ background: "#F9F7F3" }}>
        {/* Header */}
        <div
          className="glass shrink-0 flex items-center sticky top-0 z-10"
          style={{ borderBottom: "1.5px solid rgba(232,230,240,0.8)", padding: "clamp(10px, 1.5vh, 16px) clamp(16px, 2.5vw, 28px)" }}
        >
          <button
            onClick={() => router.push("/")}
            className="rounded-[999px] flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(170deg, #FFD980, #FFD166)", border: "2px solid #CC9900", borderBottomWidth: 4, width: "clamp(36px, 5vw, 46px)", height: "clamp(36px, 5vw, 46px)", boxShadow: "0 3px 10px rgba(255,209,102,0.4)" }}
          >
            <IconArrowLeft size={20} color="#1A1A2E" />
          </button>
          <h1 className="font-black ml-3" style={{ fontSize: "clamp(18px, 2.5vw, 24px)", color: "#1A1A2E" }}>
            Ergebnis
          </h1>
        </div>

        <div className="flex-1 flex items-start justify-center px-4 sm:px-6 py-6">
          <div className="w-full max-w-lg animate-slide-up">
            <div className="card p-6 sm:p-8 text-center mb-4">
              <div className="flex justify-center mb-4 animate-bounce-in">{cfg.icon}</div>
              <h2 className="font-black mb-1" style={{ fontSize: "clamp(22px, 3.5vw, 30px)", color: cfg.color }}>{cfg.title}</h2>
              <p className="font-semibold mb-5" style={{ fontSize: "clamp(13px, 1.6vw, 15px)", color: "#4A4A6A" }}>{cfg.subtitle}</p>

              {/* Stars per task */}
              <div className="flex justify-center gap-5 sm:gap-8 mb-5">
                {taskStars.map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="font-black uppercase tracking-wider mb-2" style={{ fontSize: "clamp(9px, 1vw, 11px)", color: "#9090AA" }}>Aufgabe {i + 1}</p>
                    <div className="flex gap-0.5 justify-center">
                      {[1, 2, 3].map((n) => (
                        <svg key={n} width="22" height="22" viewBox="0 0 48 48" fill="none">
                          <path
                            d="M24 4L29.4 16.6L43 18.3L33.2 27.7L35.8 41.2L24 34.5L12.2 41.2L14.8 27.7L5 18.3L18.6 16.6L24 4Z"
                            fill={n <= s ? "#FFD166" : "#E8E6F0"}
                            stroke={n <= s ? "#CC9900" : "#D0D0DC"}
                            strokeWidth="1.5" strokeLinejoin="round"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Score row */}
              <div className="rounded-[18px] p-4 sm:p-5 mb-5 flex items-center justify-center gap-5 sm:gap-8" style={{ background: "#F4F2FF" }}>
                <div>
                  <p style={{ fontSize: "clamp(26px, 4vw, 32px)", color: "#1A1A2E" }} className="font-black">{totalStars}/9</p>
                  <p className="font-black uppercase tracking-wider" style={{ fontSize: "clamp(9px, 1vw, 11px)", color: "#9090AA" }}>Sterne</p>
                </div>
                <div className="w-px h-10" style={{ background: "#E8E6F0" }} />
                <div>
                  <p style={{ fontSize: "clamp(26px, 4vw, 32px)" }} className="font-black xp-shimmer">{totalXP}</p>
                  <p className="font-black uppercase tracking-wider" style={{ fontSize: "clamp(9px, 1vw, 11px)", color: "#9090AA" }}>XP</p>
                </div>
                <div className="w-px h-10" style={{ background: "#E8E6F0" }} />
                <div>
                  <p style={{ fontSize: "clamp(26px, 4vw, 32px)", color: cfg.color }} className="font-black">
                    {totalStars >= 7 ? "S" : totalStars >= 4 ? "A" : "B"}
                  </p>
                  <p className="font-black uppercase tracking-wider" style={{ fontSize: "clamp(9px, 1vw, 11px)", color: "#9090AA" }}>Rang</p>
                </div>
              </div>

              {/* Learnings */}
              <div className="text-left space-y-2">
                <p className="font-black uppercase tracking-wider mb-3 text-center" style={{ fontSize: "clamp(9px, 1vw, 11px)", color: "#9090AA" }}>
                  Was du gelernt hast
                </p>
                {learnings.map((l, i) => (
                  <div
                    key={i}
                    className="rounded-[16px] p-3 flex items-start gap-3"
                    style={{ background: l.bg, border: `2px solid ${l.color}25` }}
                  >
                    <div className="mt-0.5 shrink-0">{l.icon}</div>
                    <div>
                      <p className="font-black" style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: l.color }}>{l.title}</p>
                      <p className="font-semibold" style={{ fontSize: "clamp(12px, 1.3vw, 14px)", color: "#4A4A6A" }}>{l.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pb-6">
              <button onClick={() => router.push("/")} className="btn-primary w-full">
                Neue Mission
              </button>
              <button
                onClick={() => { setCurrentTask(0); setCompleted(false); setTotalStars(0); setTaskStars([]); }}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <IconRefresh size={16} color="#4A4A6A" />
                Nochmal versuchen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progress = (currentTask / scenario.tasks.length) * 100;

  return (
    <div className="h-dvh flex flex-col" style={{ background: "#F9F7F3" }}>
      {/* ── Header — glassmorphism ── */}
      <div
        className="glass flex items-center gap-3 shrink-0 sticky top-0 z-10"
        style={{ borderBottom: "1.5px solid rgba(232,230,240,0.8)", padding: "clamp(10px, 1.5vh, 16px) clamp(16px, 2.5vw, 28px)" }}
      >
        <button
          onClick={() => router.push("/")}
          className="rounded-[999px] flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(170deg, #FFD980, #FFD166)", border: "2px solid #CC9900", borderBottomWidth: 4, width: "clamp(36px, 5vw, 46px)", height: "clamp(36px, 5vw, 46px)", boxShadow: "0 3px 10px rgba(255,209,102,0.4)" }}
        >
          <IconArrowLeft size={20} color="#1A1A2E" />
        </button>
        <div className="flex-1 flex flex-col" style={{ gap: "clamp(4px, 0.8vh, 8px)" }}>
          <div className="flex justify-between font-black" style={{ fontSize: "clamp(11px, 1.3vw, 13px)" }}>
            <span style={{ color: "#1A1A2E" }}>{scenario.title}</span>
            <span className="flex items-center gap-1" style={{ color: "#9090AA" }}>
              {currentTask}/{scenario.tasks.length}
              <IconCheck size={12} color="#3A86FF" />
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
