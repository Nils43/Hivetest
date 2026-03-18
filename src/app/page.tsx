"use client";

import Link from "next/link";
import { scenarios } from "@/data/scenarios";
import { scenarioColors } from "@/data/scenarioColors";

export default function Home() {
  return (
    <main className="min-h-dvh bg-shell flex flex-col">
      {/* Dark nav header */}
      <div className="px-4 sm:px-6 pt-6 pb-4 flex items-center justify-between max-w-2xl mx-auto w-full">
        <h1 className="text-[20px] sm:text-[24px] font-bold text-white tracking-tight">
          PromptQuest
        </h1>
        <div className="bg-xp/15 text-xp text-[13px] font-semibold px-3 py-1.5 rounded-lg">
          0 XP
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 bg-content-bg rounded-t-[24px] px-4 sm:px-6 pt-6 pb-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-text-primary mb-1">
            Wähle deine Mission
          </h2>
          <p className="text-[13px] text-text-secondary mb-5">
            {scenarios.length} Szenarien verfügbar
          </p>

          {/* Scenario list cards */}
          <div className="flex flex-col gap-3">
            {scenarios.map((scenario, i) => {
              const colors = scenarioColors[scenario.id];
              return (
                <Link
                  key={scenario.id}
                  href={`/szenario/${scenario.id}`}
                  className="flex items-center gap-4 bg-white rounded-xl px-4 py-4 sm:px-5 sm:py-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all animate-slide-up"
                  style={{
                    borderLeft: `4px solid ${colors?.border || "#64748b"}`,
                    animationDelay: `${i * 0.06}s`,
                    opacity: 0,
                  }}
                >
                  <span className="text-[24px] shrink-0">{scenario.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] sm:text-[16px] font-semibold text-text-primary">
                      {scenario.title}
                    </h3>
                    <p className="text-[12px] sm:text-[13px] text-text-secondary leading-snug">
                      {scenario.description}
                    </p>
                  </div>
                  <span className="text-text-secondary/40 text-[18px] shrink-0">›</span>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <span className="text-[11px] font-medium text-text-secondary/50">
              Hive Göppingen · Education Circle
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
