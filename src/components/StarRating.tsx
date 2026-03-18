"use client";

import { useEffect, useState } from "react";
import { IconStar, IconLightning } from "@/components/Icons";
import { CharacterCelebrate, CharacterProud, CharacterDetermined } from "@/components/Characters";

interface StarRatingProps {
  stars: number;
  feedback: string;
  onContinue: () => void;
  isLastTask?: boolean;
}

function Confetti() {
  const colors = ["#7C3AED", "#FFD900", "#DB2777", "#0891B2", "#0D9488", "#EA580C"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="confetti-piece" style={{
          background: colors[i % colors.length],
          left: `${Math.random() * 100}%`,
          top: -10,
          width:  7 + Math.random() * 7,
          height: 7 + Math.random() * 7,
          animationDelay: `${Math.random() * 0.9}s`,
          borderRadius: Math.random() > 0.5 ? "50%" : "3px",
        }} />
      ))}
    </div>
  );
}

// 3 stars = success green | 2 stars = brand violet | 1 star = warm orange
const resultConfig = {
  3: { icon: <CharacterCelebrate  size={80} />, title: "Perfekt gemacht!", color: "#16A34A", bg: "#DCFCE7", border: "#16A34A" },
  2: { icon: <CharacterProud      size={80} />, title: "Gut gemacht!",     color: "#7C3AED", bg: "#EDE9FE", border: "#7C3AED" },
  1: { icon: <CharacterDetermined size={80} />, title: "Weiter üben!",     color: "#EA580C", bg: "#FFF7ED", border: "#EA580C" },
};

export default function StarRating({ stars, feedback, onContinue, isLastTask }: StarRatingProps) {
  const [showXP, setShowXP] = useState(false);
  const xp  = stars === 3 ? 30 : stars === 2 ? 20 : 10;
  const cfg = resultConfig[stars as 1 | 2 | 3];

  useEffect(() => {
    const t = setTimeout(() => setShowXP(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 animate-fade-in flex items-center justify-center" style={{ padding: "clamp(12px, 2vw, 24px)" }}>
      <div
        className="rounded-[20px] w-full text-center relative overflow-hidden animate-slide-up bg-white"
        style={{
          maxWidth: "clamp(300px, 40vw, 440px)",
          padding: "clamp(16px, 2.5vh, 32px) clamp(16px, 2.5vw, 32px)",
          border: `2px solid ${cfg.border}30`,
          borderBottomWidth: "5px",
          borderBottomColor: cfg.border,
          boxShadow: `0 8px 32px ${cfg.border}20`,
        }}
      >
        {stars === 3 && <Confetti />}

        <div className="relative z-10">
          {/* Character */}
          <div className="flex justify-center animate-bounce-in" style={{ marginBottom: "clamp(6px, 1vh, 12px)" }}>
            {cfg.icon}
          </div>

          {/* Stars */}
          <div className="flex justify-center" style={{ gap: "clamp(6px, 1vw, 10px)", marginBottom: "clamp(8px, 1.2vh, 16px)" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-star-pop" style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}>
                <div
                  className="rounded-[14px] flex items-center justify-center"
                  style={{
                    width: "clamp(44px, 6vw, 60px)",
                    height: "clamp(44px, 6vw, 60px)",
                    background:        i <= stars ? "#FFD900" : "#F4F4F8",
                    border:            `2px solid ${i <= stars ? "#C8A000" : "#E8E8F0"}`,
                    borderBottomWidth: "4px",
                  }}
                >
                  <IconStar size={i <= stars ? 28 : 24} filled={i <= stars} />
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-black" style={{ fontSize: "clamp(16px, 2.5vw, 22px)", color: cfg.color, marginBottom: "clamp(4px, 0.6vh, 8px)" }}>
            {cfg.title}
          </h3>

          {showXP && (
            <div className="animate-counter-up" style={{ marginBottom: "clamp(6px, 1vh, 12px)" }}>
              <span
                className="inline-flex items-center gap-1.5 text-white font-black rounded-[12px]"
                style={{ fontSize: "clamp(12px, 1.4vw, 14px)", padding: "clamp(4px, 0.6vh, 8px) clamp(10px, 1.2vw, 16px)", background: "#EA580C", border: "2px solid #C2410C", borderBottomWidth: "3px" }}
              >
                <IconLightning size={13} color="white" />
                +{xp} XP verdient!
              </span>
            </div>
          )}

          <div
            className="rounded-[16px]"
            style={{ padding: "clamp(8px, 1.2vh, 14px)", marginBottom: "clamp(8px, 1.2vh, 16px)", background: cfg.bg, border: `2px solid ${cfg.border}18` }}
          >
            <p className="font-semibold text-text-primary leading-relaxed" style={{ fontSize: "clamp(12px, 1.4vw, 14px)" }}>
              {feedback}
            </p>
          </div>

          <button onClick={onContinue} className="btn-primary w-full">
            {isLastTask ? "Ergebnis ansehen" : "Weiter"}
          </button>
        </div>
      </div>
    </div>
  );
}
