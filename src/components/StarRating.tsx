"use client";

import { useEffect, useState } from "react";

interface StarRatingProps {
  stars: number;
  feedback: string;
  onContinue: () => void;
  isLastTask?: boolean;
}

function Confetti() {
  const colors = ["#e94560","#0f3460","#e8793b","#2d6a4f","#7c3aed","#f59e0b"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="confetti-piece" style={{
          background: colors[i % colors.length],
          left: `${Math.random() * 100}%`, top: -10,
          width: 6 + Math.random() * 6, height: 6 + Math.random() * 6,
          animationDelay: `${Math.random() * 0.8}s`,
          borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        }} />
      ))}
    </div>
  );
}

export default function StarRating({ stars, feedback, onContinue, isLastTask }: StarRatingProps) {
  const [showXP, setShowXP] = useState(false);
  const xp = stars === 3 ? 30 : stars === 2 ? 20 : 10;

  useEffect(() => { const t = setTimeout(() => setShowXP(true), 900); return () => clearTimeout(t); }, []);

  const cfg = {
    3: { title: "Perfekt!", color: "#10b981" },
    2: { title: "Gut gemacht!", color: "#0f3460" },
    1: { title: "Weiter üben!", color: "#e8793b" },
  }[stars]!;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 animate-fade-in overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center relative overflow-hidden animate-slide-up shadow-xl my-4">
          {stars === 3 && <Confetti />}

          <div className="relative z-10">
            <div className="flex justify-center gap-3 mb-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-star-pop" style={{ animationDelay: `${i * 0.18}s`, opacity: 0 }}>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-2xl sm:text-3xl" style={{
                    background: i <= stars ? "#f59e0b" : "#f1f5f9",
                  }}>
                    {i <= stars ? "★" : "☆"}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-[20px] sm:text-[22px] font-bold mb-1" style={{ color: cfg.color }}>{cfg.title}</h3>

            {showXP && (
              <div className="animate-counter-up mb-3">
                <span className="inline-block bg-shell text-white font-semibold text-[13px] rounded-lg px-4 py-1.5">
                  +{xp} XP
                </span>
              </div>
            )}

            <div className="bg-content-bg rounded-xl p-3 sm:p-4 mb-4">
              <p className="text-[13px] sm:text-[14px] text-text-primary leading-relaxed">{feedback}</p>
            </div>

            <button onClick={onContinue} className="btn-primary w-full text-[15px]">
              {isLastTask ? "Ergebnis ansehen" : "Weiter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
