// Custom SVG icon set

// ── MASCOT ──────────────────────────────────────────────────────────────────
export function IconRobot({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Antenna */}
      <line x1="24" y1="4" x2="24" y2="11" stroke="#5B21B6" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="24" cy="3" r="2.5" fill="#7C3AED"/>
      {/* Head */}
      <rect x="8" y="11" width="32" height="24" rx="6" fill="#7C3AED"/>
      <rect x="8" y="11" width="32" height="11" rx="6" fill="white" fillOpacity="0.15"/>
      {/* Eyes */}
      <rect x="14" y="18" width="8" height="7" rx="2" fill="white"/>
      <rect x="26" y="18" width="8" height="7" rx="2" fill="white"/>
      <circle cx="18" cy="21" r="2" fill="#1E1B2E"/>
      <circle cx="30" cy="21" r="2" fill="#1E1B2E"/>
      <circle cx="19" cy="20" r="0.8" fill="white"/>
      <circle cx="31" cy="20" r="0.8" fill="white"/>
      {/* Mouth */}
      <rect x="16" y="28" width="16" height="4" rx="2" fill="white" fillOpacity="0.75"/>
      {/* Ears */}
      <rect x="4"  y="18" width="5" height="8" rx="2.5" fill="#5B21B6"/>
      <rect x="39" y="18" width="5" height="8" rx="2.5" fill="#5B21B6"/>
    </svg>
  );
}

// ── SCENARIO ICONS ───────────────────────────────────────────────────────────
export function IconBook({ size = 32, color = "#0891B2" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="6" y="2" width="20" height="26" rx="3" fill="white" stroke={color} strokeWidth="2"/>
      <rect x="4" y="2" width="4" height="26" rx="2" fill={color}/>
      <line x1="11" y1="10" x2="22" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="11" y1="15" x2="22" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="11" y1="20" x2="17" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function IconGamepad({ size = 32, color = "#7C3AED" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="3" y="9" width="26" height="16" rx="8" fill={color}/>
      <rect x="3" y="9" width="26" height="8" rx="8" fill="white" fillOpacity="0.15"/>
      <rect x="8"   y="14" width="8" height="3" rx="1.5" fill="white" fillOpacity="0.7"/>
      <rect x="10.5" y="11.5" width="3" height="8" rx="1.5" fill="white" fillOpacity="0.7"/>
      <circle cx="22" cy="14" r="2" fill="white" fillOpacity="0.7"/>
      <circle cx="25" cy="17" r="2" fill="white" fillOpacity="0.5"/>
      <circle cx="19" cy="17" r="2" fill="white" fillOpacity="0.5"/>
    </svg>
  );
}

export function IconPeople({ size = 32, color = "#0D9488" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="11" cy="11" r="5" fill={color} fillOpacity="0.85"/>
      <path d="M2 27c0-5 4-8 9-8s9 3 9 8" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="23" cy="10" r="4" fill={color}/>
      <path d="M19 27c0-4.5 2.5-7.5 7-7.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.6"/>
    </svg>
  );
}

export function IconHeart({ size = 32, color = "#DB2777" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 27C16 27 4 20 4 11.5C4 7.36 7.36 4 11.5 4C13.74 4 15.5 5.2 16 6C16.5 5.2 18.26 4 20.5 4C24.64 4 28 7.36 28 11.5C28 20 16 27 16 27Z" fill={color}/>
      <path d="M16 27C16 27 4 20 4 11.5C4 7.36 7.36 4 11.5 4C13.74 4 15.5 5.2 16 6" fill="white" fillOpacity="0.2"/>
    </svg>
  );
}

export function IconHouse({ size = 32, color = "#D97706" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M4 14L16 4L28 14V28H20V21H12V28H4V14Z" fill={color}/>
      <path d="M4 14L16 4L28 14H4Z" fill="white" fillOpacity="0.15"/>
      <rect x="13" y="21" width="6" height="7" rx="1" fill="white" fillOpacity="0.35"/>
    </svg>
  );
}

// ── TASK TYPE ICONS ───────────────────────────────────────────────────────────
export function IconMask({ size = 18, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <ellipse cx="5.5" cy="9" rx="5" ry="6.5" fill={color} fillOpacity="0.9"/>
      <ellipse cx="12.5" cy="9" rx="5" ry="6.5" fill={color} fillOpacity="0.65"/>
      <circle cx="4.5" cy="7.5" r="1.2" fill="currentColor" fillOpacity="0.45"/>
      <path d="M3.5 11 Q5.5 12.5 7.5 11" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none" strokeOpacity="0.45"/>
    </svg>
  );
}

export function IconMagnify({ size = 18, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <circle cx="7.5" cy="7.5" r="5" stroke={color} strokeWidth="2.5"/>
      <line x1="11.2" y1="11.2" x2="16" y2="16" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function IconTarget({ size = 18, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.5" stroke={color} strokeWidth="2"/>
      <circle cx="9" cy="9" r="4.5" stroke={color} strokeWidth="2"/>
      <circle cx="9" cy="9" r="2"   fill={color}/>
    </svg>
  );
}

// ── UTILITY ICONS ─────────────────────────────────────────────────────────────
export function IconLightbulb({ size = 18, color = "#7C3AED" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M9 2C6.24 2 4 4.24 4 7C4 8.8 4.92 10.4 6.3 11.36L6.5 13H11.5L11.7 11.36C13.08 10.4 14 8.8 14 7C14 4.24 11.76 2 9 2Z" fill={color}/>
      <rect x="7"   y="13" width="4" height="1.5" rx="0.75" fill={color} fillOpacity="0.6"/>
      <rect x="7.5" y="15" width="3" height="1.5" rx="0.75" fill={color} fillOpacity="0.4"/>
    </svg>
  );
}

export function IconStar({ size = 48, filled = true, color = "#FFD900" }: { size?: number; filled?: boolean; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path
        d="M24 4L29.4 16.6L43 18.3L33.2 27.7L35.8 41.2L24 34.5L12.2 41.2L14.8 27.7L5 18.3L18.6 16.6L24 4Z"
        fill={filled ? color : "#E8E8F0"}
        stroke={filled ? "#C8A000" : "#D0D0DC"}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconTrophy({ size = 56, color = "#FFD900" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <path d="M14 8H42V30C42 38 35.7 44 28 44C20.3 44 14 38 14 30V8Z" fill={color}/>
      <path d="M14 8H42V18H14V8Z" fill="white" fillOpacity="0.2"/>
      <path d="M14 10C10 12 6 16 6 22C6 27 9 30 14 30" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M42 10C46 12 50 16 50 22C50 27 47 30 42 30" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <rect x="24" y="44" width="8" height="6" fill={color} fillOpacity="0.8"/>
      <rect x="18" y="50" width="20" height="4" rx="2" fill={color}/>
      <path d="M28 16L30.5 22H36.5L31.5 25.5L33.5 31.5L28 28L22.5 31.5L24.5 25.5L19.5 22H25.5L28 16Z" fill="white" fillOpacity="0.55"/>
    </svg>
  );
}

export function IconFlame({ size = 56, color = "#7C3AED" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <path d="M28 4C28 4 38 14 38 26C38 28 37.5 30 36.5 31.5C36.5 31.5 36 26 30 24C30 24 34 32 28 38C28 38 22 32 26 24C20 26 19.5 31.5 19.5 31.5C18.5 30 18 28 18 26C18 14 28 4 28 4Z" fill={color}/>
      <path d="M28 24C28 24 32 28 32 32C32 35.3 30.2 38 28 38C25.8 38 24 35.3 24 32C24 28 28 24 28 24Z" fill="#C4B5FD"/>
    </svg>
  );
}

export function IconSadFace({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="24" fill="#FDA4AF"/>
      <circle cx="28" cy="28" r="24" fill="url(#sad-grad)"/>
      <circle cx="19" cy="23" r="3" fill="#9F1239"/>
      <circle cx="37" cy="23" r="3" fill="#9F1239"/>
      <path d="M20 36C20 36 23 32 28 32C33 32 36 36 36 36" stroke="#9F1239" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <defs>
        <linearGradient id="sad-grad" x1="4" y1="4" x2="4" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function IconLightning({ size = 16, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M9 1L3 9H8L7 15L13 7H8L9 1Z" fill={color}/>
    </svg>
  );
}

export function IconCheck({ size = 16, color = "#7C3AED" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M2 8L6.5 12.5L14 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconArrowLeft({ size = 20, color = "#7C3AED" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M13 4L7 10L13 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconEye({ size = 16, color = "#7C3AED" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="8" cy="8" r="2.5" fill={color}/>
    </svg>
  );
}

export function IconPencil({ size = 16, color = "#A8A4B8" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M11 2L14 5L5 14H2V11L11 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      <line x1="9" y1="4" x2="12" y2="7" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

export function IconMap({ size = 14, color = "#A8A4B8" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M1 2L5 3.5L9 2L13 3.5V12L9 10.5L5 12L1 10.5V2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      <line x1="5" y1="3.5" x2="5" y2="12"   stroke={color} strokeWidth="1.5"/>
      <line x1="9" y1="2"   x2="9" y2="10.5" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

export function IconRefresh({ size = 16, color = "#6B6880" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M2 8C2 4.69 4.69 2 8 2C10.04 2 11.84 3.04 13 4.5"  stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M14 8C14 11.31 11.31 14 8 14C5.96 14 4.16 12.96 3 11.5" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M13 2V5H10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M3 14V11H6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export function IconPin({ size = 14, color = "#A8A4B8" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M7 1C4.79 1 3 2.79 3 5C3 8 7 13 7 13C7 13 11 8 11 5C11 2.79 9.21 1 7 1Z" fill={color}/>
      <circle cx="7" cy="5" r="1.5" fill="white"/>
    </svg>
  );
}

export function IconXCircle({ size = 14, color = "#DC2626" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" fill={color} fillOpacity="0.12"/>
      <path d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
