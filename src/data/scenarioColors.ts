// Tonal scenario palette — same saturation/lightness structure, different hues
export const scenarioColors: Record<string, { primary: string; border: string; borderBottom: string; bg: string }> = {
  schule:   { primary: "#0891B2", border: "#67E8F9", borderBottom: "#0E7490", bg: "#ECFEFF" },
  freizeit: { primary: "#7C3AED", border: "#C4B5FD", borderBottom: "#5B21B6", bg: "#F5F3FF" },
  freunde:  { primary: "#0D9488", border: "#5EEAD4", borderBottom: "#0F766E", bg: "#F0FDFA" },
  liebe:    { primary: "#DB2777", border: "#F9A8D4", borderBottom: "#BE185D", bg: "#FDF2F8" },
  familie:  { primary: "#D97706", border: "#FCD34D", borderBottom: "#B45309", bg: "#FFFBEB" },
};

// Task type colors — semantically meaningful and distinct
export const typeColors: Record<string, { color: string; label: string; bg: string; borderBottom: string }> = {
  rolle:    { color: "#7C3AED", label: "Rolle vergeben",      bg: "#EDE9FE", borderBottom: "#5B21B6" },
  fehler:   { color: "#DC2626", label: "Fehler finden",       bg: "#FEE2E2", borderBottom: "#B91C1C" },
  ergebnis: { color: "#0891B2", label: "Ergebnis definieren", bg: "#ECFEFF", borderBottom: "#0E7490" },
};
