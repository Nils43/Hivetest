export const scenarioColors: Record<string, { primary: string; border: string; borderBottom: string; bg: string }> = {
  schule:   { primary: "#3A86FF", border: "#2066CC", borderBottom: "#1755AA", bg: "#E0ECFF" },
  freizeit: { primary: "#E63946", border: "#C42B38", borderBottom: "#A82030", bg: "#FFE8EA" },
  freunde:  { primary: "#FF6B9D", border: "#CC4575", borderBottom: "#A33360", bg: "#FFE4EF" },
  liebe:    { primary: "#7B2FBE", border: "#5E1F95", borderBottom: "#4A1878", bg: "#EDE0FF" },
  familie:  { primary: "#FFD166", border: "#CC9900", borderBottom: "#AA7F00", bg: "#FFF3CD" },
};

export const typeColors: Record<string, { color: string; label: string; bg: string; borderBottom: string }> = {
  rolle:    { color: "#7B2FBE", label: "Rolle vergeben",      bg: "#EDE0FF", borderBottom: "#4A1878" },
  fehler:   { color: "#E63946", label: "Fehler finden",       bg: "#FFE8EA", borderBottom: "#A82030" },
  ergebnis: { color: "#3A86FF", label: "Ergebnis definieren", bg: "#E0ECFF", borderBottom: "#1755AA" },
};
