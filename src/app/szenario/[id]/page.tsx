"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { scenarios } from "@/data/scenarios";
import TaskView from "@/components/TaskView";

export default function SzenarioPage() {
  const params = useParams();
  const router = useRouter();
  const [currentTask, setCurrentTask] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [totalStars, setTotalStars] = useState(0);

  const scenario = scenarios.find((s) => s.id === params.id);

  if (!scenario) {
    return (
      <div className="min-h-dvh bg-bg-primary flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-2xl mb-4">🤔</p>
          <p className="text-text-secondary">Szenario nicht gefunden.</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-6 py-2 bg-accent-purple rounded-xl text-sm font-semibold"
          >
            Zurück zur Auswahl
          </button>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-dvh bg-bg-primary flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center animate-slide-up">
          <div className="text-6xl mb-4">{scenario.emoji}</div>
          <h2 className="text-2xl font-bold mb-2">
            Szenario abgeschlossen!
          </h2>
          <p className="text-text-secondary mb-6">
            Du hast alle 3 Aufgaben im Bereich &quot;{scenario.title}&quot;
            gemeistert.
          </p>

          <div className="bg-bg-secondary rounded-2xl p-6 mb-6">
            <p className="text-sm text-text-secondary mb-2">Dein Ergebnis</p>
            <div className="text-4xl mb-2">
              {"⭐".repeat(totalStars)}
              {"☆".repeat(9 - totalStars)}
            </div>
            <p className="text-lg font-semibold">
              {totalStars} von 9 Sternen
            </p>
          </div>

          <div className="bg-bg-card rounded-2xl p-5 mb-6 text-left">
            <p className="text-sm font-semibold mb-2">
              🎓 Was du gelernt hast:
            </p>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                🎭 <strong>Rolle:</strong> Eine klare Rolle gibt der KI die
                richtige Perspektive.
              </li>
              <li>
                🔍 <strong>Kontext:</strong> Ohne genaue Details liefert die KI
                falsche Ergebnisse.
              </li>
              <li>
                🎯 <strong>Ergebnis:</strong> Je klarer du definierst was du
                willst, desto besser das Ergebnis.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 rounded-xl font-semibold text-white bg-accent-purple hover:brightness-110 transition-all"
            >
              Neues Szenario wählen
            </button>
            <button
              onClick={() => {
                setCurrentTask(0);
                setCompleted(false);
                setTotalStars(0);
              }}
              className="w-full py-3 rounded-xl font-semibold text-text-secondary bg-bg-secondary hover:bg-bg-card transition-all"
            >
              Nochmal versuchen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Back button */}
      <div className="fixed top-4 left-4 z-40">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary bg-bg-secondary/80 backdrop-blur-sm rounded-xl px-3 py-2 transition-colors"
        >
          ← Zurück
        </button>
      </div>

      {/* Scenario header */}
      <div className="bg-bg-secondary border-b border-white/5 pt-4 pb-3 px-4 text-center">
        <span className="text-2xl">{scenario.emoji}</span>
        <h1 className="text-sm font-semibold mt-1">{scenario.title}</h1>
      </div>

      <TaskView
        key={currentTask}
        task={scenario.tasks[currentTask]}
        taskNumber={currentTask + 1}
        totalTasks={scenario.tasks.length}
        scenarioColor={scenario.color}
        onComplete={(earnedStars: number) => {
          setTotalStars((prev) => prev + earnedStars);
          if (currentTask < scenario.tasks.length - 1) {
            setCurrentTask((prev) => prev + 1);
          } else {
            setCompleted(true);
          }
        }}
      />
    </div>
  );
}
