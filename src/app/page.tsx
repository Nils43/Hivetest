"use client";

import Link from "next/link";
import { scenarios } from "@/data/scenarios";

const cardConfig: Record<string, { bg: string; shape: string }> = {
  schule:  { bg: "#E21B3C", shape: "triangle" },
  freizeit: { bg: "#1368CE", shape: "diamond" },
  freunde: { bg: "#D89E00", shape: "circle" },
  liebe:   { bg: "#FF3355", shape: "triangle" },
  familie: { bg: "#26890C", shape: "square" },
};

function KahootShape({ shape, size = 32 }: { shape: string; size?: number }) {
  const s = size;
  if (shape === "triangle")
    return <svg width={s} height={s} viewBox="0 0 32 32"><polygon points="16,4 28,28 4,28" fill="white" opacity="0.25"/></svg>;
  if (shape === "diamond")
    return <svg width={s} height={s} viewBox="0 0 32 32"><polygon points="16,2 30,16 16,30 2,16" fill="white" opacity="0.25"/></svg>;
  if (shape === "circle")
    return <svg width={s} height={s} viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="white" opacity="0.25"/></svg>;
  return <svg width={s} height={s} viewBox="0 0 32 32"><rect x="4" y="4" width="24" height="24" rx="3" fill="white" opacity="0.25"/></svg>;
}

export default function Home() {
  const topRow = scenarios.slice(0, 3);
  const bottomRow = scenarios.slice(3);

  return (
    <main className="min-h-dvh bg-k-purple flex flex-col items-center px-4 sm:px-6 pt-8 sm:pt-12 pb-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 animate-fade-in">
          <h1 className="text-[28px] sm:text-[40px] font-black text-white mb-2 tracking-tight">
            Prompt Challenge
          </h1>
          <p className="text-white/70 text-[14px] sm:text-[16px] font-bold mb-5">
            Lerne, wie du KI richtig nutzt
          </p>

          {/* XP bar */}
          <div className="inline-flex items-center gap-3 bg-white/10 rounded-lg px-5 py-2.5">
            <span className="text-[16px] font-black text-k-golden">0 XP</span>
            <span className="text-white/40 font-bold">|</span>
            <span className="text-[14px] font-bold text-white/70">5 Missionen</span>
          </div>
        </div>

        {/* Section title */}
        <p className="text-center text-[12px] sm:text-[13px] font-black text-white/40 uppercase tracking-[4px] mb-5">
          Wähle deine Mission
        </p>

        {/* Top row – 2 cols mobile, 3 cols tablet */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
          {topRow.map((scenario, i) => {
            const cfg = cardConfig[scenario.id];
            return (
              <Link
                key={scenario.id}
                href={`/szenario/${scenario.id}`}
                className={`kahoot-card animate-slide-up ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}
                style={{ background: cfg.bg, animationDelay: `${i * 0.08}s`, opacity: 0 }}
              >
                <div className="flex justify-center mb-3">
                  <KahootShape shape={cfg.shape} size={36} />
                </div>
                <h2 className="font-black text-[16px] sm:text-[18px] mb-1">{scenario.title}</h2>
                <p className="text-[11px] sm:text-[12px] text-white/75 font-bold leading-snug">
                  {scenario.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Bottom row centered */}
        <div className="flex justify-center gap-3 sm:gap-4">
          {bottomRow.map((scenario, i) => {
            const cfg = cardConfig[scenario.id];
            return (
              <Link
                key={scenario.id}
                href={`/szenario/${scenario.id}`}
                className="kahoot-card animate-slide-up w-full max-w-[calc(50%-6px)] sm:max-w-[210px]"
                style={{ background: cfg.bg, animationDelay: `${(i + 3) * 0.08}s`, opacity: 0 }}
              >
                <div className="flex justify-center mb-3">
                  <KahootShape shape={cfg.shape} size={36} />
                </div>
                <h2 className="font-black text-[16px] sm:text-[18px] mb-1">{scenario.title}</h2>
                <p className="text-[11px] sm:text-[12px] text-white/75 font-bold leading-snug">
                  {scenario.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-10 animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
          <span className="text-[10px] sm:text-[11px] font-black text-white/30 uppercase tracking-[3px]">
            Hive Göppingen · Education Circle
          </span>
        </div>
      </div>
    </main>
  );
}
