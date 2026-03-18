"use client";

import Link from "next/link";
import { scenarios } from "@/data/scenarios";
import { scenarioColors } from "@/data/scenarioColors";
import { IconBook, IconGamepad, IconPeople, IconHeart, IconHouse, IconMap } from "@/components/Icons";
import { CharacterMascot } from "@/components/Characters";

const scenarioIcons: Record<string, React.ReactNode> = {
  schule:   <IconBook    size={36} color="#0891B2" />,
  freizeit: <IconGamepad size={36} color="#7C3AED" />,
  freunde:  <IconPeople  size={36} color="#0D9488" />,
  liebe:    <IconHeart   size={36} color="#DB2777" />,
  familie:  <IconHouse   size={36} color="#D97706" />,
};

export default function Home() {
  return (
    <main className="h-dvh flex flex-col bg-content-bg overflow-hidden">

      {/* ── Header ── */}
      <div className="bg-white border-b-2 border-card-border shrink-0" style={{ padding: "clamp(8px, 1.2vh, 14px) clamp(12px, 2vw, 24px)" }}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-black leading-tight" style={{ fontSize: "clamp(18px, 2.5vw, 26px)", color: "#7C3AED" }}>
              PromptQuest
            </h1>
            <p className="font-bold text-text-secondary" style={{ fontSize: "clamp(10px, 1.2vw, 12px)" }}>Werde zum KI-Profi!</p>
          </div>
          <div
            className="text-white font-black rounded-xl flex items-center gap-1.5"
            style={{ fontSize: "clamp(11px, 1.3vw, 13px)", padding: "clamp(6px, 0.8vh, 10px) clamp(10px, 1.2vw, 14px)", background: "#EA580C", border: "2px solid #C2410C", borderBottomWidth: "4px" }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M9 1L3 9H8L7 15L13 7H8L9 1Z" fill="white"/>
            </svg>
            0 XP
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 min-h-0 overflow-y-auto">
      <div className="max-w-2xl mx-auto" style={{ padding: "clamp(10px, 1.5vh, 20px) clamp(12px, 2vw, 24px)" }}>

        {/* Mascot greeting */}
        <div
          className="bg-white rounded-[20px] flex items-center animate-fade-in"
          style={{ padding: "clamp(8px, 1.2vh, 14px) clamp(10px, 1.5vw, 16px)", marginBottom: "clamp(10px, 1.5vh, 20px)", gap: "clamp(8px, 1.5vw, 16px)", border: "2px solid #E8E8F0", borderLeft: "4px solid #7C3AED", boxShadow: "0 2px 8px rgba(124,58,237,0.07)" }}
        >
          <div className="shrink-0 animate-float">
            <CharacterMascot size={56} />
          </div>
          <div>
            <p className="font-black text-text-primary" style={{ fontSize: "clamp(13px, 1.6vw, 15px)" }}>Hey! Bereit für die nächste Mission?</p>
            <p className="font-semibold text-text-secondary" style={{ fontSize: "clamp(11px, 1.3vw, 13px)", marginTop: "2px" }}>Wähle ein Thema und leg los!</p>
          </div>
        </div>

        {/* Section label */}
        <div className="flex items-center gap-2" style={{ marginBottom: "clamp(6px, 1vh, 12px)" }}>
          <IconMap size={12} color="#A8A4B8" />
          <p className="font-black text-text-tertiary uppercase tracking-[2px]" style={{ fontSize: "clamp(9px, 1vw, 11px)" }}>
            Deine Missionen
          </p>
        </div>

        {/* Scenario grid */}
        <div className="grid grid-cols-2" style={{ gap: "clamp(8px, 1.2vw, 14px)" }}>
          {scenarios.map((scenario, i) => {
            const colors = scenarioColors[scenario.id];
            const icon = scenarioIcons[scenario.id];
            return (
              <Link
                key={scenario.id}
                href={`/szenario/${scenario.id}`}
                className="animate-slide-up block"
                style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}
              >
                <div
                  className="rounded-[20px] cursor-pointer transition-all hover:-translate-y-1 active:translate-y-1 h-full"
                  style={{
                    padding: "clamp(10px, 1.5vw, 18px)",
                    background: colors.bg,
                    border: `2px solid ${colors.primary}38`,
                    borderBottomWidth: "5px",
                    borderBottomColor: colors.borderBottom,
                    boxShadow: `0 2px 8px ${colors.primary}12`,
                  }}
                >
                  <div style={{ marginBottom: "clamp(4px, 0.8vh, 10px)" }}>{icon}</div>
                  <h3 className="font-black text-text-primary" style={{ fontSize: "clamp(12px, 1.5vw, 15px)", marginBottom: "clamp(2px, 0.4vh, 6px)" }}>
                    {scenario.title}
                  </h3>
                  <p className="text-text-secondary font-semibold leading-snug" style={{ fontSize: "clamp(10px, 1.1vw, 12px)" }}>
                    {scenario.description}
                  </p>
                  <p className="font-black" style={{ fontSize: "clamp(10px, 1.1vw, 12px)", marginTop: "clamp(4px, 0.6vh, 8px)", color: colors.primary }}>
                    {scenario.tasks.length} Aufgaben →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 mb-2">
          <p className="text-[11px] font-semibold text-text-tertiary">
            Hive Göppingen · Education Circle
          </p>
        </div>
      </div>
      </div>
    </main>
  );
}
