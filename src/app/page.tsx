"use client";

import Link from "next/link";
import { scenarios } from "@/data/scenarios";

const colorMap: Record<string, string> = {
  "accent-blue": "from-accent-blue/20 to-accent-blue/5 border-accent-blue/30 hover:border-accent-blue/60",
  "accent-green": "from-accent-green/20 to-accent-green/5 border-accent-green/30 hover:border-accent-green/60",
  "accent-purple": "from-accent-purple/20 to-accent-purple/5 border-accent-purple/30 hover:border-accent-purple/60",
  "accent-pink": "from-accent-pink/20 to-accent-pink/5 border-accent-pink/30 hover:border-accent-pink/60",
  "accent-orange": "from-accent-orange/20 to-accent-orange/5 border-accent-orange/30 hover:border-accent-orange/60",
};

export default function Home() {
  return (
    <main className="min-h-dvh bg-bg-primary flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <div className="text-5xl mb-4">🧠</div>
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
            Prompt Challenge
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            Das Leben bringt Herausforderungen.
            <br />
            <span className="text-text-primary font-semibold">
              Wähle deine.
            </span>
          </p>
        </div>

        {/* Scenario cards */}
        <div className="space-y-3">
          {scenarios.map((scenario, i) => (
            <Link
              key={scenario.id}
              href={`/szenario/${scenario.id}`}
              className={`block w-full bg-gradient-to-r ${colorMap[scenario.color]} border rounded-2xl p-5 text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] animate-slide-up`}
              style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{scenario.emoji}</span>
                <div>
                  <h2 className="font-bold text-lg">{scenario.title}</h2>
                  <p className="text-sm text-text-secondary">
                    {scenario.description}
                  </p>
                </div>
                <span className="ml-auto text-text-secondary text-xl">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-10 text-xs text-text-secondary/60">
          Hive Göppingen · Education Circle
        </p>
      </div>
    </main>
  );
}
