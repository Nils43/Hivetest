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
