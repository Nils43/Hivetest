// Custom SVG icons – Duolingo-inspired flat & rounded style

export function BrainIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M32 8C20 8 14 16 14 24c0 6 3 10 6 13l2 2v9a4 4 0 004 4h12a4 4 0 004-4v-9l2-2c3-3 6-7 6-13 0-8-6-16-18-16z" fill="#CE82FF"/>
      <path d="M32 8c-4 0-8 1.5-11 4.5C18 15.5 16 20 16 24c0 5 2.5 9 5 12" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M24 52v2a6 6 0 006 6h4a6 6 0 006-6v-2" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M22 32h20M24 38h16" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <circle cx="26" cy="22" r="3" fill="#E9D5FF" opacity="0.8"/>
    </svg>
  );
}

export function SchoolIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="18" width="32" height="24" rx="4" fill="white" fillOpacity="0.25"/>
      <path d="M24 6L6 18h36L24 6z" fill="white" fillOpacity="0.35"/>
      <rect x="20" y="28" width="8" height="14" rx="2" fill="white" fillOpacity="0.3"/>
      <rect x="11" y="22" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.2"/>
      <rect x="31" y="22" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.2"/>
      <circle cx="24" cy="14" r="2.5" fill="white" fillOpacity="0.5"/>
    </svg>
  );
}

export function GameIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="14" width="36" height="22" rx="11" fill="white" fillOpacity="0.25"/>
      <circle cx="16" cy="23" r="2" fill="white" fillOpacity="0.4"/>
      <circle cx="16" cy="27" r="2" fill="white" fillOpacity="0.4"/>
      <circle cx="12" cy="25" r="2" fill="white" fillOpacity="0.4"/>
      <circle cx="20" cy="25" r="2" fill="white" fillOpacity="0.4"/>
      <circle cx="31" cy="22" r="2.5" fill="white" fillOpacity="0.4"/>
      <circle cx="36" cy="27" r="2.5" fill="white" fillOpacity="0.4"/>
      <path d="M18 36l-2 4M30 36l2 4" stroke="white" strokeOpacity="0.3" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function FriendsIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="18" cy="16" r="7" fill="white" fillOpacity="0.3"/>
      <circle cx="32" cy="16" r="6" fill="white" fillOpacity="0.25"/>
      <path d="M6 40c0-8 5.5-14 12-14s12 6 12 14" fill="white" fillOpacity="0.2"/>
      <path d="M28 40c0-6 3.5-11 8-11s8 5 8 11" fill="white" fillOpacity="0.15"/>
    </svg>
  );
}

export function HeartIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 42S6 30 6 18a10 10 0 0118-6 10 10 0 0118 6c0 12-18 24-18 24z" fill="white" fillOpacity="0.3"/>
      <path d="M24 38S10 28 10 19a7 7 0 0114-4 7 7 0 0114 4c0 9-14 19-14 19z" fill="white" fillOpacity="0.15"/>
    </svg>
  );
}

export function HomeIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 6L4 22h6v18a4 4 0 004 4h20a4 4 0 004-4V22h6L24 6z" fill="white" fillOpacity="0.25"/>
      <rect x="19" y="28" width="10" height="16" rx="2" fill="white" fillOpacity="0.2"/>
      <rect x="14" y="22" width="7" height="6" rx="1.5" fill="white" fillOpacity="0.15"/>
      <rect x="27" y="22" width="7" height="6" rx="1.5" fill="white" fillOpacity="0.15"/>
    </svg>
  );
}

export function StarIcon({ filled = false, size = 32 }: { filled?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2l4.2 8.6L30 12l-7 6.8L24.6 28 16 23.4 7.4 28 9 18.8 2 12l9.8-1.4L16 2z"
        fill={filled ? "#FFC800" : "#E5E5E5"}
        stroke={filled ? "#E0A800" : "#D4D4D4"}
        strokeWidth="1.5"
      />
      {filled && (
        <path
          d="M16 5l3 6.2L26 12.6l-5 4.8 1.2 6.6L16 21l-6.2 3L11 17.4l-5-4.8 7-1.4L16 5z"
          fill="#FFE066"
          opacity="0.4"
        />
      )}
    </svg>
  );
}

export function RoleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="5" fill="currentColor" opacity="0.3"/>
      <path d="M4 20c0-5 3.5-8 8-8s8 3 8 8" fill="currentColor" opacity="0.2"/>
      <path d="M15 4l2-2M17 6l2-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function SearchIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="10" cy="10" r="6.5" fill="currentColor" fillOpacity="0.1"/>
      <path d="M15 15l5 5"/>
    </svg>
  );
}

export function TargetIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
  );
}

export function LightbulbIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2a8 8 0 00-3 15.4V20a2 2 0 002 2h2a2 2 0 002-2v-2.6A8 8 0 0012 2z" fill="currentColor" opacity="0.25"/>
      <path d="M10 22h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <path d="M12 2v2M4 12H2M22 12h-2M5.6 5.6L4.2 4.2M18.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

export function CheckIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2"/>
      <path d="M7 12.5l3.5 3.5L17 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function BookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4a2 2 0 012-2h5l1 1 1-1h5a2 2 0 012 2v14a2 2 0 01-2 2h-5l-1 1-1-1H6a2 2 0 01-2-2V4z" fill="currentColor" opacity="0.2"/>
      <path d="M12 3v17" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
    </svg>
  );
}

export function PenIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" fill="currentColor" opacity="0.2"/>
      <path d="M14 6l4 4" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
    </svg>
  );
}

export function TrophyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M18 10h28v18c0 10-6 18-14 18s-14-8-14-18V10z" fill="#FFC800"/>
      <path d="M18 10h28v8c0 4-6 8-14 8s-14-4-14-8V10z" fill="#FFE066" opacity="0.5"/>
      <path d="M18 14H8c0 8 4 14 10 14" stroke="#E0A800" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M46 14h10c0 8-4 14-10 14" stroke="#E0A800" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <rect x="26" y="46" width="12" height="6" rx="2" fill="#E0A800"/>
      <rect x="22" y="52" width="20" height="5" rx="2.5" fill="#FFC800"/>
    </svg>
  );
}

export function RocketIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2c-2 4-3 8-3 12l3 4 3-4c0-4-1-8-3-12z" fill="currentColor" opacity="0.3"/>
      <path d="M9 14l-3 3M15 14l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <circle cx="12" cy="10" r="2" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

export function BoltIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="#FFC800" stroke="#E0A800" strokeWidth="1"/>
    </svg>
  );
}
