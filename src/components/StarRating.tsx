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
  const colors = ["#E63946", "#FFD166", "#FF6B9D", "#3A86FF", "#7B2FBE", "#06D6A0"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 36 }).map((_, i) => (
        <div key={i} className="confetti-piece" style={{
          background: colors[i % colors.length],
          left: `${Math.random() * 100}%`,
          top: -10,
          width:  8 + Math.random() * 8,
          height: 8 + Math.random() * 8,
          animationDelay: `${Math.random() * 1.1}s`,
          borderRadius: Math.random() > 0.5 ? "50%" : "4px",
        }} />
      ))}
    </div>
  );
}

const resultConfig = {
  3: { icon: <CharacterCelebrate  size={90} />, title: "Perfekt gemacht!", color: "#06D6A0", bg: "#CCFAED", border: "#06D6A0", shadow: "rgba(6,214,160,0.25)" },
  2: { icon: <CharacterProud      size={90} />, title: "Gut gemacht!",     color: "#3A86FF", bg: "#E0ECFF", border: "#3A86FF", shadow: "rgba(58,134,255,0.2)"  },
  1: { icon: <CharacterDetermined size={90} />, title: "Weiter üben!",     color: "#E63946", bg: "#FFE8EA", border: "#E63946", shadow: "rgba(230,57,70,0.2)"   },
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
    /* Glassmorphism backdrop */
    <div
      className="fixed inset-0 z-50 animate-fade-in flex items-center justify-center"
      style={{ background: "rgba(26,26,46,0.65)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", padding: "clamp(14px, 2.5vw, 28px)" }}
    >
      <div
        className="w-full text-center relative overflow-hidden animate-slide-up"
        style={{
          maxWidth: "clamp(300px, 42vw, 460px)",
          padding: "clamp(20px, 3vh, 36px) clamp(20px, 3vw, 36px)",
          borderRadius: 24,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `2px solid ${cfg.border}35`,
          borderBottomWidth: 5,
          borderBottomColor: cfg.border,
          boxShadow: `0 24px 64px ${cfg.shadow}, 0 4px 16px rgba(0,0,0,0.08)`,
        }}
      >
        {stars === 3 && <Confetti />}

        <div className="relative z-10">
          {/* Character */}
          <div className="flex justify-center animate-bounce-in" style={{ marginBottom: "clamp(8px, 1.2vh, 14px)" }}>
            {cfg.icon}
          </div>

          {/* Stars */}
          <div className="flex justify-center" style={{ gap: "clamp(8px, 1.2vw, 12px)", marginBottom: "clamp(10px, 1.5vh, 18px)" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-star-pop" style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}>
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "clamp(48px, 7vw, 64px)",
                    height: "clamp(48px, 7vw, 64px)",
                    borderRadius: 16,
                    background: i <= stars
                      ? "linear-gradient(145deg, #FFE080, #FFD166)"
                      : "#F4F2FF",
                    border: `2.5px solid ${i <= stars ? "#CC9900" : "#E8E6F0"}`,
                    borderBottomWidth: 4,
                    boxShadow: i <= stars ? "0 4px 14px rgba(255,209,102,0.45)" : "none",
                  }}
                >
                  <IconStar size={i <= stars ? 30 : 24} filled={i <= stars} />
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-black" style={{ fontSize: "clamp(18px, 2.8vw, 24px)", color: cfg.color, marginBottom: "clamp(6px, 0.8vh, 10px)" }}>
            {cfg.title}
          </h3>

          {showXP && (
            <div className="animate-counter-up" style={{ marginBottom: "clamp(8px, 1.2vh, 14px)" }}>
              <span
                className="inline-flex items-center gap-2 font-black"
                style={{
                  fontSize: "clamp(13px, 1.5vw, 15px)",
                  padding: "clamp(6px, 0.8vh, 10px) clamp(14px, 1.6vw, 20px)",
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #FF6B9D, #E63946)",
                  color: "white",
                  boxShadow: "0 4px 14px rgba(230,57,70,0.38)",
                  border: "2px solid #C42B38",
                  borderBottomWidth: 3,
                }}
              >
                <IconLightning size={14} color="white" />
                +{xp} XP verdient!
              </span>
            </div>
          )}

          <div
            className="rounded-[16px]"
            style={{ padding: "clamp(10px, 1.4vh, 16px)", marginBottom: "clamp(12px, 1.6vh, 20px)", background: cfg.bg, border: `2px solid ${cfg.border}20` }}
          >
            <p className="font-semibold leading-relaxed" style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "#1A1A2E" }}>
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
