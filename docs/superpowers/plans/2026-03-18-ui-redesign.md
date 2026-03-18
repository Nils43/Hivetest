# PromptQuest UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Kahoot-style UI with a modern dark-shell + warm-white design using Navy/Warm palette, Inter font, and list cards.

**Architecture:** Pure visual reskin — no structural changes to routing, data model, or API. Swap CSS variables, update component JSX/classnames, add one shared color config file. All changes are in the presentation layer.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Inter (next/font/google)

**Spec:** `docs/superpowers/specs/2026-03-18-ui-redesign-design.md`

---

## File Structure

| File | Role | Action |
|------|------|--------|
| `src/data/scenarioColors.ts` | Shared scenario accent color config | **Create** |
| `src/app/globals.css` | CSS variables, component classes, animations | **Rewrite** |
| `src/app/layout.tsx` | Root layout, font, metadata | **Modify** |
| `src/app/page.tsx` | Startscreen with scenario list | **Rewrite** |
| `src/components/TaskView.tsx` | Task interaction view | **Modify** |
| `src/components/StarRating.tsx` | Star rating overlay | **Modify** |
| `src/app/szenario/[id]/page.tsx` | Scenario page + completion screen | **Modify** |

---

### Task 1: Create scenario color config

**Files:**
- Create: `src/data/scenarioColors.ts`

- [ ] **Step 1: Create the color config file**

```ts
// src/data/scenarioColors.ts
export const scenarioColors: Record<string, { primary: string; gradient: string; border: string }> = {
  schule:   { primary: "#e94560", gradient: "linear-gradient(135deg, #e94560, #c23152)", border: "#e94560" },
  freizeit: { primary: "#0f3460", gradient: "linear-gradient(135deg, #0f3460, #1a508b)", border: "#0f3460" },
  freunde:  { primary: "#7c3aed", gradient: "linear-gradient(135deg, #7c3aed, #6d28d9)", border: "#7c3aed" },
  liebe:    { primary: "#e8793b", gradient: "linear-gradient(135deg, #e8793b, #d4622b)", border: "#e8793b" },
  familie:  { primary: "#2d6a4f", gradient: "linear-gradient(135deg, #2d6a4f, #40916c)", border: "#2d6a4f" },
};

export const typeColors: Record<string, { color: string; label: string }> = {
  rolle:    { color: "#7c3aed", label: "Rolle vergeben" },
  fehler:   { color: "#ef4444", label: "Fehler finden" },
  ergebnis: { color: "#0f3460", label: "Ergebnis definieren" },
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/scenarioColors.ts
git commit -m "feat: add shared scenario color config for redesign"
```

---

### Task 2: Rewrite globals.css

**Files:**
- Rewrite: `src/app/globals.css`

- [ ] **Step 1: Replace globals.css with new design system**

Replace the entire file. New contents:

```css
@import "tailwindcss";

:root {
  /* Shell */
  --shell: #1a1a2e;
  --shell-light: #16213e;

  /* Content */
  --content-bg: #faf9f7;
  --card-bg: #ffffff;

  /* Text */
  --text-primary: #1a1a2e;
  --text-secondary: #64748b;
  --text-on-dark: #ffffff;
  --text-muted-dark: rgba(255,255,255,0.6);

  /* Functional */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --xp: #e8793b;
  --star-active: #f59e0b;
  --star-inactive: #e2e8f0;
}

@theme inline {
  --color-shell: var(--shell);
  --color-shell-light: var(--shell-light);
  --color-content-bg: var(--content-bg);
  --color-card-bg: var(--card-bg);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-on-dark: var(--text-on-dark);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-error: var(--error);
  --color-xp: var(--xp);
  --color-star-active: var(--star-active);
  --color-star-inactive: var(--star-inactive);
  --font-sans: var(--font-inter);
}

html, body {
  background: var(--shell);
  color: var(--text-on-dark);
  font-family: var(--font-sans), 'Inter', sans-serif;
  min-height: 100dvh;
  -webkit-font-smoothing: antialiased;
}

* { -webkit-tap-highlight-color: transparent; }

/* ===== BUTTONS ===== */
.btn-primary {
  font-family: inherit;
  font-weight: 600;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  padding: 14px 28px;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: center;
  color: white;
  background: linear-gradient(135deg, #e94560, #c23152);
}
.btn-primary:hover { filter: brightness(1.08); }
.btn-primary:active { transform: scale(0.98); }

.btn-secondary {
  font-family: inherit;
  font-weight: 600;
  font-size: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px 28px;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: center;
  color: var(--text-primary);
  background: white;
}
.btn-secondary:hover { background: var(--content-bg); }
.btn-secondary:active { transform: scale(0.98); }

/* ===== CARD ===== */
.card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  color: var(--text-primary);
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

/* ===== TEXTAREA ===== */
.prompt-textarea {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  padding: 16px;
  font-size: 16px;
  font-family: inherit;
  resize: none;
  width: 100%;
  min-height: 120px;
  color: var(--text-primary);
  transition: border-color 0.2s;
}
.prompt-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
}
.prompt-textarea::placeholder { color: var(--text-secondary); }
.prompt-textarea:disabled { opacity: 0.6; }

/* ===== ANIMATIONS ===== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes starPop {
  0% { transform: scale(0) rotate(-15deg); opacity: 0; }
  50% { transform: scale(1.3) rotate(5deg); opacity: 1; }
  100% { transform: scale(1) rotate(0); opacity: 1; }
}
@keyframes confettiFall {
  0% { transform: translateY(-10px) rotate(0); opacity: 1; }
  100% { transform: translateY(80px) rotate(360deg); opacity: 0; }
}
@keyframes counterUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
.animate-slide-up { animation: slideUp 0.3s ease-out forwards; }
.animate-star-pop { animation: starPop 0.5s ease-out forwards; opacity: 0; }
.animate-counter-up { animation: counterUp 0.4s ease-out forwards; }

.confetti-piece {
  position: absolute;
  width: 8px; height: 8px;
  border-radius: 2px;
  animation: confettiFall 1.5s ease-out forwards;
}

/* XP shimmer */
.xp-shimmer {
  background: linear-gradient(90deg, #e8793b 0%, #fbbf24 50%, #e8793b 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 2.5s ease-in-out infinite;
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
```

- [ ] **Step 2: Verify dev server still works**

Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000`
Expected: 200 (page may look broken — that's expected, components not updated yet).

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: rewrite CSS with new design system (Navy/Warm palette)"
```

---

### Task 3: Update layout.tsx (font + metadata)

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Swap Montserrat → Inter and update metadata**

Replace the entire `layout.tsx`:

```tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PromptQuest – Hive Göppingen",
  description:
    "Lerne spielerisch, wie du KI richtig nutzt. Eine interaktive Lern-App für den Education Circle im Hive Göppingen.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: swap Montserrat for Inter, rename to PromptQuest"
```

---

### Task 4: Rewrite startscreen (page.tsx)

**Files:**
- Rewrite: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx with new list-card layout**

```tsx
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
```

- [ ] **Step 2: Verify page loads in browser**

Open http://localhost:3000 — should show new list-card layout with dark header and warm white content.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: redesign startscreen with list cards and dark shell"
```

---

### Task 5: Update TaskView.tsx

**Files:**
- Modify: `src/components/TaskView.tsx`

- [ ] **Step 1: Replace the entire TaskView.tsx**

Write the complete file. This preserves all AI evaluation logic (async handleSubmit, fallback, loading states) and only changes imports, config, and JSX styling.

```tsx
"use client";

import { useState } from "react";
import type { Task } from "@/data/scenarios";
import { typeColors } from "@/data/scenarioColors";
import StarRating from "./StarRating";

interface TaskViewProps {
  task: Task;
  taskNumber: number;
  totalTasks: number;
  onComplete: (stars: number) => void;
}

// Fallback: regelbasierte Bewertung bei API-Ausfall
function evaluatePromptFallback(input: string, task: Task): number {
  const lower = input.toLowerCase();
  const words = lower.split(/\s+/);
  let score = 0;
  const matched = task.keywords.filter((kw) => lower.includes(kw.toLowerCase()));
  const ratio = matched.length / task.keywords.length;
  if (words.length >= 30) score += 2; else if (words.length >= 15) score += 1;
  if (ratio >= 0.4) score += 3; else if (ratio >= 0.2) score += 2; else if (ratio >= 0.1) score += 1;
  if (task.type === "rolle" && (lower.includes("du bist") || lower.includes("stell dir vor"))) score += 2;
  if (task.type === "ergebnis" && ["1)","2)","3)","format","liste","gib mir","zusammenfassung","stichpunkt","- "].some(f => lower.includes(f))) score += 2;
  if (score >= 6) return 3;
  if (score >= 3) return 2;
  return 1;
}

export default function TaskView({ task, taskNumber, totalTasks, onComplete }: TaskViewProps) {
  const [prompt, setPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [stars, setStars] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");

  const config = typeColors[task.type];
  const wordCount = prompt.trim().split(/\s+/).filter(Boolean).length;
  const canSubmit = prompt.trim().length >= 10;

  const handleSubmit = async () => {
    if (!canSubmit || isLoading) return;
    setIsLoading(true);

    try {
      const taskPayload = {
        type: task.type,
        situation: task.situation,
        instruction: task.instruction,
        keywords: task.keywords,
        badPrompt: task.badPrompt,
        badOutput: task.badOutput,
      };
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, task: taskPayload }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setStars(data.stars);
      setAiResponse(data.response);
      setAiFeedback(data.feedback);
    } catch {
      setStars(evaluatePromptFallback(prompt, task));
      setAiResponse("");
      setAiFeedback("");
    } finally {
      setIsLoading(false);
      setShowResult(true);
    }
  };

  const feedbackText =
    aiFeedback ||
    (stars === 3
      ? task.feedback.threeStars
      : stars === 2
        ? task.feedback.twoStars
        : task.feedback.oneStar);

  return (
    <>
      <div className="flex-1 bg-content-bg flex flex-col px-4 sm:px-6 py-4 sm:max-w-3xl sm:mx-auto overflow-y-auto">
        {/* Task type badge + title */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] sm:text-[18px] font-bold text-text-primary">{task.title}</h2>
          <span
            className="text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-lg text-white"
            style={{ background: config.color }}
          >
            {config.label}
          </span>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100">
            <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wider mb-1.5">Situation</p>
            <p className="text-[13px] sm:text-[14px] text-text-primary leading-relaxed">{task.situation}</p>
          </div>

          {task.type === "fehler" && task.badPrompt ? (
            <div className="bg-[#fef2f2] rounded-xl p-3 sm:p-4">
              <p className="text-[10px] font-medium text-error uppercase tracking-wider mb-1.5">Fehlerhafter Prompt</p>
              <p className="text-[13px] sm:text-[14px] text-text-primary italic">&quot;{task.badPrompt}&quot;</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100">
              <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: config.color }}>Deine Aufgabe</p>
              <p className="text-[13px] sm:text-[14px] text-text-primary leading-relaxed">{task.instruction}</p>
            </div>
          )}
        </div>

        {task.type === "fehler" && task.badOutput && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div className="bg-[#fff7ed] rounded-xl p-3 sm:p-4">
              <p className="text-[10px] font-medium text-xp uppercase tracking-wider mb-1.5">KI-Antwort</p>
              <p className="text-[13px] sm:text-[14px] text-text-primary leading-relaxed line-clamp-3">{task.badOutput}</p>
            </div>
            <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100">
              <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: config.color }}>Deine Aufgabe</p>
              <p className="text-[13px] sm:text-[14px] text-text-primary leading-relaxed">{task.instruction}</p>
            </div>
          </div>
        )}

        {/* Hints */}
        <div className="mb-3">
          <button onClick={() => setShowHints(!showHints)} className="text-[12px] font-medium text-xp">
            {showHints ? "– Tipps ausblenden" : "+ Tipps anzeigen"}
          </button>
          {showHints && (
            <div className="bg-white rounded-xl p-3 mt-2 border border-gray-100 animate-fade-in">
              <div className="flex flex-col gap-1.5">
                {task.hints.map((hint, i) => (
                  <p key={i} className="text-[13px] text-text-primary"><span className="text-xp mr-1.5">▸</span>{hint}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Textarea or AI Response */}
        <div className="flex-1 min-h-[100px] max-h-[220px] sm:max-h-[240px] mb-3">
          {showResult && aiResponse ? (
            <div className="h-full overflow-y-auto bg-white rounded-xl p-3 sm:p-4 border-l-4 border-success">
              <p className="text-[10px] font-medium text-success uppercase tracking-wider mb-1.5">KI-Antwort</p>
              <p className="text-[13px] sm:text-[14px] text-text-primary leading-relaxed whitespace-pre-line">{aiResponse}</p>
            </div>
          ) : (
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Schreibe deinen Prompt hier ..."
              className="prompt-textarea h-full"
              disabled={isLoading}
            />
          )}
        </div>

        {/* Button bar */}
        <div className="flex items-center justify-between py-2">
          <span className="text-[12px] font-medium text-text-secondary">{wordCount} Wörter</span>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin w-4 h-4 border-2 border-text-secondary/30 border-t-text-primary rounded-full" />
              <span className="text-[13px] font-medium text-text-secondary">KI analysiert...</span>
            </div>
          ) : !showResult ? (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={canSubmit ? "btn-primary" : "btn-secondary opacity-40 cursor-not-allowed"}
            >
              Abschicken
            </button>
          ) : null}
        </div>

        {/* Example prompt */}
        {showResult && (
          <div className="mt-1">
            <button onClick={() => setShowExample(!showExample)} className="text-[12px] font-medium text-success">
              {showExample ? "– Beispiel ausblenden" : "+ Beispiel-Prompt anzeigen"}
            </button>
            {showExample && (
              <div className="bg-white rounded-xl p-3 mt-2 border-l-4 border-success animate-fade-in">
                <p className="text-[13px] text-text-primary italic leading-relaxed">&quot;{task.exampleGoodPrompt}&quot;</p>
              </div>
            )}
          </div>
        )}
      </div>

      {showResult && (
        <StarRating
          stars={stars}
          feedback={feedbackText}
          onContinue={() => onComplete(stars)}
          isLastTask={taskNumber === totalTasks}
        />
      )}
    </>
  );
}
```

Note: The `scenarioColor` prop has been removed from the interface — it was unused in the new design. Task 7's scenario page still passes it but TypeScript will ignore the extra prop.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/TaskView.tsx
git commit -m "feat: redesign TaskView with warm-white content layout"
```

---

### Task 6: Update StarRating.tsx

**Files:**
- Modify: `src/components/StarRating.tsx`

- [ ] **Step 1: Update colors and styling**

Key changes:
- Confetti colors → new accent palette
- Star blocks: `#f59e0b` active, `#e2e8f0` inactive, no `box-shadow: 0 4px 0` trick
- Title colors: 3=`#10b981`, 2=`#0f3460`, 1=`#e8793b`
- Modal backdrop: `bg-black/60`
- Modal card: `rounded-2xl`, padding `p-6 sm:p-8`
- Feedback card: `bg-content-bg rounded-xl`
- Button: `btn-primary w-full`
- XP badge: `bg-shell text-white` pill

Full replacement of the component:

```tsx
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
            {/* Stars */}
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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/StarRating.tsx
git commit -m "feat: redesign StarRating with new color system"
```

---

### Task 7: Update scenario page (header + completion screen)

**Files:**
- Modify: `src/app/szenario/[id]/page.tsx`

- [ ] **Step 1: Update the entire scenario page**

Key changes:
- Import `scenarioColors` and `typeColors`
- Dark header: `bg-shell-light` with back arrow, scenario name, dot step indicators
- Step indicators: simple filled/unfilled dots instead of numbered circles
- Completion screen: dark shell bg, white centered card, new colors
- Not-found state: dark bg, white card, btn-primary
- Replace all `btn-kahoot-*` with `btn-primary` / `btn-secondary`
- Replace all Kahoot color references
- Learning cards: left border uses type colors (purple/red/blue)
- Score row: `bg-content-bg` background
- XP shimmer: keep class name (updated in CSS)
- Rank colors: S=`#10b981`, A=`#0f3460`, B=`#e8793b`

Full replacement:

```tsx
"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { scenarios } from "@/data/scenarios";
import { typeColors } from "@/data/scenarioColors";
import TaskView from "@/components/TaskView";

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
      <div className="min-h-dvh bg-shell flex items-center justify-center p-6">
        <div className="card text-center p-10 max-w-sm w-full">
          <p className="text-[20px] font-bold text-text-primary mb-4">Mission nicht gefunden</p>
          <button onClick={() => router.push("/")} className="btn-primary">Zurück</button>
        </div>
      </div>
    );
  }

  if (completed) {
    const cfg = totalStars >= 7
      ? { title: "Prompt-Profi!", color: "#10b981", rank: "S" }
      : totalStars >= 4
        ? { title: "Guter Fortschritt!", color: "#0f3460", rank: "A" }
        : { title: "Weiter üben!", color: "#e8793b", rank: "B" };

    const learnings = [
      { title: "Rolle", desc: "Die richtige Perspektive gibt bessere Antworten.", color: typeColors.rolle.color },
      { title: "Kontext", desc: "Ohne Details liefert KI falsche Ergebnisse.", color: typeColors.fehler.color },
      { title: "Ergebnis", desc: "Klare Zieldefinition = besseres Ergebnis.", color: typeColors.ergebnis.color },
    ];

    return (
      <div className="min-h-dvh bg-shell flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-lg animate-slide-up">
          <div className="card p-6 sm:p-8 text-center mb-4">
            <h2 className="text-[24px] sm:text-[28px] font-bold mb-1" style={{ color: cfg.color }}>{cfg.title}</h2>
            <p className="text-text-secondary text-[14px] mb-6">Mission &quot;{scenario.title}&quot; abgeschlossen</p>

            <div className="flex justify-center gap-6 sm:gap-8 mb-5">
              {taskStars.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wider mb-1">Task {i + 1}</p>
                  <div className="flex gap-0.5 justify-center">
                    {[1, 2, 3].map((n) => (
                      <span key={n} className="text-[18px]" style={{ color: n <= s ? "#f59e0b" : "#e2e8f0" }}>★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-content-bg rounded-xl p-4 sm:p-5 mb-6 flex items-center justify-center gap-5 sm:gap-8">
              <div>
                <p className="text-[24px] sm:text-[28px] font-bold text-text-primary">{totalStars}/9</p>
                <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wider">Sterne</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <p className="text-[24px] sm:text-[28px] font-bold xp-shimmer">{totalXP}</p>
                <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wider">XP</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <p className="text-[24px] sm:text-[28px] font-bold" style={{ color: cfg.color }}>{cfg.rank}</p>
                <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wider">Rang</p>
              </div>
            </div>

            <div className="text-left space-y-2">
              <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wider mb-3 text-center">Was du gelernt hast</p>
              {learnings.map((l, i) => (
                <div key={i} className="bg-white rounded-xl p-3 flex items-start gap-3 border border-gray-100" style={{ borderLeft: `4px solid ${l.color}` }}>
                  <div>
                    <p className="font-semibold text-[13px]" style={{ color: l.color }}>{l.title}</p>
                    <p className="text-[12px] text-text-secondary">{l.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={() => router.push("/")} className="btn-primary w-full">Neue Mission</button>
            <button onClick={() => { setCurrentTask(0); setCompleted(false); setTotalStars(0); setTaskStars([]); }} className="btn-secondary w-full">
              Nochmal versuchen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh flex flex-col">
      {/* Dark header */}
      <div className="bg-shell-light py-3 px-4 flex items-center gap-3 border-b border-white/5">
        <button onClick={() => router.push("/")} className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white font-medium text-lg hover:bg-white/15 transition-colors shrink-0">
          ←
        </button>
        <h1 className="font-semibold text-white text-[15px] sm:text-[16px] flex-1 text-center">{scenario.title}</h1>
        {/* Step dots */}
        <div className="flex items-center gap-1.5 shrink-0">
          {Array.from({ length: scenario.tasks.length }).map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i < currentTask ? "bg-success" : i === currentTask ? "bg-white" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      <TaskView
        key={currentTask}
        task={scenario.tasks[currentTask]}
        taskNumber={currentTask + 1}
        totalTasks={scenario.tasks.length}
        scenarioColor={scenario.color}
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
```

- [ ] **Step 2: Verify TypeScript compiles and all pages load**

Run: `npx tsc --noEmit`
Then check: http://localhost:3000 and http://localhost:3000/szenario/schule

- [ ] **Step 3: Commit**

```bash
git add src/app/szenario/[id]/page.tsx
git commit -m "feat: redesign scenario page with dark header and new completion screen"
```

---

### Task 8: Final cleanup and visual verification

**Files:**
- Optional: `src/components/Icons.tsx` (can be deleted — unused)

- [ ] **Step 1: Verify all pages render correctly**

Check each page in browser:
- http://localhost:3000 — startscreen with list cards
- http://localhost:3000/szenario/schule — task view
- Complete a scenario to see star rating and completion screen

- [ ] **Step 2: Check for any remaining Kahoot references**

Run: `grep -r "kahoot\|k-purple\|k-red\|k-blue\|k-green\|k-golden\|k-bright\|k-orange\|k-teal\|k-near-white\|k-dark-gray\|k-gray\|btn-kahoot\|Prompt Challenge" src/ --include="*.tsx" --include="*.ts" --include="*.css"`
Expected: No matches.

- [ ] **Step 3: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Commit final cleanup**

```bash
git add -A
git commit -m "chore: remove Kahoot remnants, final visual cleanup"
```
