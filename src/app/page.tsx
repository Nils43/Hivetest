"use client";

import Link from "next/link";
import { scenarios } from "@/data/scenarios";
import { scenarioColors } from "@/data/scenarioColors";
import { CharacterMascot } from "@/components/Characters";
import { ArtSchule, ArtFreizeit, ArtFreunde, ArtLiebe, ArtFamilie } from "@/components/ScenarioArt";
import { Boxes } from "@/components/ui/background-boxes";

const scenarioArt: Record<string, React.FC> = {
  schule:   ArtSchule,
  freizeit: ArtFreizeit,
  freunde:  ArtFreunde,
  liebe:    ArtLiebe,
  familie:  ArtFamilie,
};

const colClass = ["scenario-col-1", "scenario-col-2", "scenario-col-3", "scenario-col-4", "scenario-col-5"];

export default function Home() {
  return (
    <main className="h-dvh flex flex-col overflow-hidden relative" style={{ background: "#0F0B1E" }}>

      {/* Background boxes grid */}
      <Boxes />

      {/* Radial vignette — transparent center, dark edges */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, #0F0B1E 75%)" }}
      />

      {/* Content */}
      <div className="relative z-20 flex-1 flex flex-col min-h-0 max-w-2xl w-full mx-auto"
        style={{ padding: "clamp(12px, 1.8vh, 22px) clamp(14px, 2vw, 24px)", gap: "clamp(10px, 1.4vh, 16px)" }}
      >
        {/* Title */}
        <h1 className="font-black shrink-0" style={{ fontSize: "clamp(28px, 4.5vw, 40px)", color: "#ffffff", letterSpacing: "-0.5px" }}>
          Missionen
        </h1>

        {/* Banner */}
        <div
          className="relative shrink-0 animate-fade-in"
          style={{
            borderRadius: 20,
            background: "linear-gradient(135deg, #FFD166 0%, #FFBE33 100%)",
            padding: "clamp(14px, 2vh, 20px) clamp(14px, 2vw, 22px)",
            paddingRight: "clamp(86px, 13vw, 118px)",
            minHeight: "clamp(72px, 10vh, 92px)",
            border: "2px solid #CC9900",
            borderBottomWidth: 5,
            boxShadow: "0 6px 28px rgba(255,209,102,0.30)",
            overflow: "visible",
          }}
        >
          <div
            className="animate-float"
            style={{
              position: "absolute",
              right: "clamp(10px, 1.8vw, 16px)",
              bottom: 0,
              zIndex: 10,
              filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.25))",
            }}
          >
            <CharacterMascot size={88} />
          </div>

          <p className="font-bold" style={{ color: "rgba(26,26,46,0.5)", fontSize: "clamp(10px, 1.2vw, 12px)", marginBottom: 3, letterSpacing: "0.4px" }}>
            Hey! Bereit?
          </p>
          <h2 className="font-black leading-tight" style={{ color: "#1A1A2E", fontSize: "clamp(15px, 2.2vw, 22px)" }}>
            Wähle eine Mission und leg los!
          </h2>
        </div>

        {/* Scenario grid */}
        <div className="shrink-0 scenario-grid">
          {scenarios.map((scenario, i) => {
            const colors = scenarioColors[scenario.id];
            const Art = scenarioArt[scenario.id];
            const isLight = colors.primary === "#FFD166";
            return (
              <Link
                key={scenario.id}
                href={`/szenario/${scenario.id}`}
                className={`animate-slide-up ${colClass[i]}`}
                style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}
              >
                <div
                  className="relative overflow-hidden w-full h-full"
                  style={{
                    borderRadius: 18,
                    border: `2px solid ${colors.border}`,
                    borderBottomWidth: 5,
                    borderBottomColor: colors.borderBottom,
                    boxShadow: `0 6px 20px ${colors.primary}30`,
                    transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.15s ease",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 10px 28px ${colors.primary}45`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 6px 20px ${colors.primary}30`; }}
                >
                  <div style={{ position: "absolute", inset: 0 }}>
                    <Art />
                  </div>
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
                    background: "linear-gradient(to bottom, transparent, rgba(15,10,30,0.94))",
                    pointerEvents: "none",
                  }}/>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px 10px 10px" }}>
                    <h3 className="font-black" style={{ color: "white", fontSize: "clamp(11px, 1.5vw, 14px)", marginBottom: 5 }}>
                      {scenario.title}
                    </h3>
                    <div
                      className="font-black text-center"
                      style={{
                        fontSize: "clamp(9px, 1.1vw, 11px)",
                        padding: "4px 0",
                        borderRadius: 999,
                        background: colors.primary,
                        color: isLight ? "#1A1A2E" : "white",
                        border: `1.5px solid ${colors.borderBottom}`,
                        borderBottomWidth: 3,
                      }}
                    >
                      Starten
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-20 shrink-0 text-center" style={{ padding: "clamp(6px, 1vh, 10px)", borderTop: "1.5px solid rgba(255,255,255,0.08)" }}>
        <p className="font-semibold" style={{ fontSize: "clamp(10px, 1.1vw, 12px)", color: "rgba(255,255,255,0.3)" }}>
          Hive Göppingen · Education Circle
        </p>
      </div>

    </main>
  );
}
