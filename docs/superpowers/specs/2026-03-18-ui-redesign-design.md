# PromptQuest UI Redesign — Design Spec

## Overview

Complete visual redesign of the PromptQuest web app. Replace the current Kahoot-style design with a modern, dark-shell + warm-white content approach. Target: Jugendliche 12–16 auf Tablets im Bildungskontext.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Direction | Dark Elegant + Clean Playful hybrid | Premium feel with good readability |
| Color Palette | Navy/Warm (#1a1a2e shell, warm-white content) | Warm, inviting, bold |
| Typography | Inter (400, 500, 600, 700) | Clean, neutral, excellent screen legibility |
| Card Layout | List Cards with colored left border | Fast to scan, mobile-first, clean |

## Color System

### Core

| Token | Value | Usage |
|-------|-------|-------|
| `--shell` | `#1a1a2e` | Nav, page background, overlays |
| `--shell-light` | `#16213e` | Elevated shell elements |
| `--content-bg` | `#faf9f7` | Main content area background |
| `--card-bg` | `#ffffff` | Cards, modals, inputs |
| `--text-primary` | `#1a1a2e` | Headings, primary text on light bg |
| `--text-secondary` | `#64748b` | Descriptions, secondary info |
| `--text-on-dark` | `#ffffff` | Text on shell/dark backgrounds |
| `--text-muted-dark` | `rgba(255,255,255,0.6)` | Secondary text on dark bg |

### Scenario Accents

Each scenario gets a gradient pair for its accent color:

| Scenario | Primary | Gradient | Left-border |
|----------|---------|----------|-------------|
| Schule | `#e94560` | `#e94560 → #c23152` | `#e94560` |
| Freizeit | `#0f3460` | `#0f3460 → #1a508b` | `#0f3460` |
| Freunde | `#7c3aed` | `#7c3aed → #6d28d9` | `#7c3aed` |
| Liebe | `#e8793b` | `#e8793b → #d4622b` | `#e8793b` |
| Familie | `#2d6a4f` | `#2d6a4f → #40916c` | `#2d6a4f` |

### Functional Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--success` | `#10b981` | Completed steps, good ratings |
| `--warning` | `#f59e0b` | Medium ratings, hints |
| `--error` | `#ef4444` | Bad prompts, errors |
| `--xp` | `#e8793b` | XP display, rewards |
| `--star-active` | `#f59e0b` | Filled stars |
| `--star-inactive` | `#e2e8f0` | Empty stars |

## Typography

**Font:** Inter via `next/font/google`

| Element | Weight | Size | Line Height |
|---------|--------|------|-------------|
| Page title | 700 | 24px / 28px (sm) | 1.2 |
| Card title | 600 | 16px | 1.3 |
| Card subtitle | 400 | 13px | 1.4 |
| Body text | 400 | 14px / 15px (sm) | 1.5 |
| Label / badge | 500 | 11px / 12px | 1 |
| Button | 600 | 14px | 1 |
| Textarea | 400 | 16px | 1.5 |

No more `font-weight: 900`. No more ALL-CAPS tracking-[4px] labels. Use sentence case everywhere except badges.

## Naming

The app is renamed from "Prompt Challenge" to **PromptQuest** (matching the Lastenheft). Update `metadata.title` in `layout.tsx` and all visible text.

## Accent Color Mapping

Replace the current `cardConfig` in `page.tsx` with a shared config object. The `Scenario.color` field in `scenarios.ts` should be updated from string names (`"accent-blue"`) to scenario IDs that map to this config:

```ts
// src/data/scenarioColors.ts (new file — only exception to "no new files")
export const scenarioColors: Record<string, { primary: string; gradient: string; border: string }> = {
  schule:   { primary: "#e94560", gradient: "linear-gradient(135deg, #e94560, #c23152)", border: "#e94560" },
  freizeit: { primary: "#0f3460", gradient: "linear-gradient(135deg, #0f3460, #1a508b)", border: "#0f3460" },
  freunde:  { primary: "#7c3aed", gradient: "linear-gradient(135deg, #7c3aed, #6d28d9)", border: "#7c3aed" },
  liebe:    { primary: "#e8793b", gradient: "linear-gradient(135deg, #e8793b, #d4622b)", border: "#e8793b" },
  familie:  { primary: "#2d6a4f", gradient: "linear-gradient(135deg, #2d6a4f, #40916c)", border: "#2d6a4f" },
};
```

Task type badges use these fixed colors (replacing the current `typeConfig`):

| Type | Color | Label |
|------|-------|-------|
| rolle | `#7c3aed` (purple) | Rolle vergeben |
| fehler | `#ef4444` (red) | Fehler finden |
| ergebnis | `#0f3460` (blue) | Ergebnis definieren |

## CSS Class Migration

All old Kahoot CSS classes are removed and replaced:

| Old Class | New Class | Notes |
|-----------|-----------|-------|
| `btn-kahoot`, `btn-kahoot-green`, `btn-kahoot-blue` | `btn-primary` | Single gradient button |
| `btn-kahoot-white` | `btn-secondary` | White with border |
| `btn-kahoot-disabled` | `btn-secondary` + `opacity-40 cursor-not-allowed` | Disabled via Tailwind |
| `kahoot-card` | removed | Replaced by Tailwind classes inline |
| `content-card` | `card` | White rounded card |
| `step-dot`, `step-connector` | removed | Replaced by simple dot indicators |
| `prompt-textarea` | `prompt-textarea` | Keep name, update styles |
| `xp-shimmer` | `xp-shimmer` | Keep name, update colors to orange |

## Responsive Breakpoints

Tailwind `sm:` = 640px (default, unchanged). Primary target: tablets 768px+.

| Element | Mobile (<640px) | Tablet (>=640px) |
|---------|----------------|-----------------|
| Page title | 24px | 28px |
| Body text | 14px | 15px |
| Content area padding | 16px | 24px |
| Card padding | 14px 16px | 16px 20px |
| Grid columns (info cards) | 1 col stacked | 2 col side by side |

## Components

### Startseite (`page.tsx`)

```
┌─────────────────────────────────────────┐
│  [dark shell]                           │
│  🚀 PromptQuest            ◆ 0 XP      │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ [warm white content area]       │    │
│  │                                 │    │
│  │  Wähle deine Mission            │    │
│  │  5 Szenarien verfügbar          │    │
│  │                                 │    │
│  │  ┌─────────────────────────┐    │    │
│  │  │▌📚 Schule               ›│    │    │
│  │  │▌   Referate & Prüfungen  │    │    │
│  │  └─────────────────────────┘    │    │
│  │  ┌─────────────────────────┐    │    │
│  │  │▌🎮 Freizeit             ›│    │    │
│  │  │▌   Gaming & Kreatives    │    │    │
│  │  └─────────────────────────┘    │    │
│  │  ┌─────────────────────────┐    │    │
│  │  │▌👥 Freunde              ›│    │    │
│  │  │▌   Konflikte & Gruppen   │    │    │
│  │  └─────────────────────────┘    │    │
│  │  ... (Liebe, Familie)           │    │
│  │                                 │    │
│  │  Hive Göppingen · Education     │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

- Dark shell fills viewport, content area is a rounded white container
- List cards: white bg, 4px colored left border, emoji + title + subtitle, chevron right
- Subtle box-shadow on cards, hover: slight lift + shadow increase
- XP badge in nav: pill with warm orange bg

### Task View (`TaskView.tsx`)

```
┌─────────────────────────────────────────┐
│ [dark header bar]                       │
│  ← Schule          ● ● ○  Step 1/3     │
├─────────────────────────────────────────┤
│ [warm white content]                    │
│                                         │
│  Rolle vergeben                         │
│  ─────────────────                      │
│                                         │
│  ┌──────────┐  ┌──────────┐            │
│  │ Situation │  │ Aufgabe  │            │
│  │ ...       │  │ ...      │            │
│  └──────────┘  └──────────┘            │
│                                         │
│  ▸ Tipps anzeigen                       │
│                                         │
│  ┌─────────────────────────┐            │
│  │ Schreibe deinen Prompt  │            │
│  │ hier ...                │            │
│  │                         │            │
│  └─────────────────────────┘            │
│                                         │
│  12 Wörter          [Abschicken]        │
└─────────────────────────────────────────┘
```

- Dark compact header: back arrow + scenario name + step indicators (dots, not numbered circles)
- Content area: warm white background, max-width for readability
- Info cards: white bg, subtle border, no colored left borders (keep it calm)
- Situation card and task card side by side (2-col grid)
- For "fehler" type: 3 cards total in the info area:
  - Row 1: Situation card (normal) + Bad Prompt card (bg `#fef2f2`, subtle red-tinted)
  - Row 2: Bad KI-Antwort card (bg `#fff7ed`, subtle orange-tinted) + Aufgabe card (normal)
  - All fehler-specific cards use their tinted background instead of colored left borders
- Textarea: white, rounded-xl, 2px border, blue focus ring
- Submit button: gradient from `#e94560` to `#c23152`, rounded-lg, no box-shadow-bottom trick
- Loading state: spinner + "KI analysiert..." replaces button
- After submit: AI response replaces textarea with green left border

### Star Rating (`StarRating.tsx`)

- White modal card on dark backdrop (`rgba(0,0,0,0.6)`)
- Stars: warm gold `#f59e0b`, inactive: `#e2e8f0`, scale animation on appear
- Title: colored by rating (green/blue/orange)
- XP badge: warm orange pill
- Feedback: light gray bg card with text
- Continue button: full-width, same gradient as submit
- Confetti: keep, use new colors: `#e94560`, `#0f3460`, `#e8793b`, `#2d6a4f`, `#7c3aed`, `#f59e0b`

### Completion Screen (`szenario/[id]/page.tsx` — completed state)

```
┌─────────────────────────────────────────┐
│ [dark shell, full viewport]             │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ [white card, centered]          │    │
│  │                                 │    │
│  │  Prompt-Profi!  (or title)      │    │
│  │  Mission "Schule" abgeschlossen │    │
│  │                                 │    │
│  │  Task 1   Task 2   Task 3      │    │
│  │  ★★★     ★★☆     ★★★          │    │
│  │                                 │    │
│  │  ┌───────────────────────┐      │    │
│  │  │  7/9    60 XP    S   │      │    │
│  │  │  Sterne  XP    Rang  │      │    │
│  │  └───────────────────────┘      │    │
│  │                                 │    │
│  │  Was du gelernt hast            │    │
│  │  ┌─ Rolle: ...             ┐    │    │
│  │  ┌─ Kontext: ...           ┐    │    │
│  │  ┌─ Ergebnis: ...          ┐    │    │
│  │                                 │    │
│  │  [Neue Mission]  btn-primary    │    │
│  │  [Nochmal]       btn-secondary  │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

- Dark shell background, white centered card (max-w-lg)
- Rank title uses functional colors: S=`--success`, A=`#0f3460`, B=`--xp`
- Score row: `--content-bg` background, three columns separated by dividers
- XP number uses `xp-shimmer` (updated to orange tones)
- Learning cards: white bg, 4px left border using task type colors (rolle=purple, fehler=red, ergebnis=blue)
- Buttons: Primary "Neue Mission", Secondary "Nochmal versuchen"

### Not Found State

- Dark shell background, centered white card
- "Mission nicht gefunden" title in `--text-primary`
- Single "Zurück" button (btn-primary)

### Buttons

Two button variants:

| Variant | Style |
|---------|-------|
| Primary | Gradient `#e94560 → #c23152`, white text, rounded-lg, hover: brightness bump. Fixed color — does NOT change per scenario. |
| Secondary | White bg, `#1a1a2e` text, subtle border, rounded-lg |

No more `box-shadow: 0 4px 0` bottom-shadow trick. Use subtle `box-shadow` or none.

### Animations

Keep but simplify:
- `fadeIn`: 0.2s ease-out (faster)
- `slideUp`: 0.3s ease-out (faster)
- `starPop`: keep as-is
- `confettiFall`: keep, update colors
- Remove: `float`, `bounceIn` (unused/over-animated)

## Files to Modify

| File | Change |
|------|--------|
| `src/app/globals.css` | Complete rewrite: new variables, new component styles |
| `src/app/layout.tsx` | Swap Montserrat → Inter |
| `src/app/page.tsx` | New startscreen layout with list cards |
| `src/components/TaskView.tsx` | New task layout, dark header, warm content |
| `src/components/StarRating.tsx` | Updated colors, cleaner modal |
| `src/app/szenario/[id]/page.tsx` | Updated colors for completion screen |

One new file: `src/data/scenarioColors.ts` (color config). No new dependencies (Inter comes from next/font/google like Montserrat).

Note: XP display on startscreen shows static "0 XP" (no persistence). Session state lives only in browser memory per Lastenheft requirement. XP accumulates within a scenario session only.

## Success Criteria

- Looks modern and professional on iPad (landscape + portrait)
- All text is legible (WCAG AA contrast on all surfaces)
- Touch targets >= 44px
- Page loads < 3s
- Consistent visual language across all screens
- Dark nav + warm content creates clear visual hierarchy
- No Kahoot visual remnants
