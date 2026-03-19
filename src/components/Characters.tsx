// Chibi anime-style characters
// Cel-shaded, bold outlines, large glossy eyes, expressive poses

// ─────────────────────────────────────────────────────────────────────────────
// Shared eye helper
// ─────────────────────────────────────────────────────────────────────────────
function Eye({ cx, cy, r = 11 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      {/* White */}
      <ellipse cx={cx} cy={cy} rx={r} ry={r + 1} fill="white" stroke="#1E1B2E" strokeWidth="2.5"/>
      {/* Iris */}
      <ellipse cx={cx} cy={cy + 1} rx={r * 0.7} ry={r * 0.78} fill="#3B6FE8"/>
      {/* Pupil */}
      <ellipse cx={cx} cy={cy + 2} rx={r * 0.45} ry={r * 0.55} fill="#1E1B2E"/>
      {/* Big gloss */}
      <ellipse cx={cx + r * 0.28} cy={cy - r * 0.32} rx={r * 0.3} ry={r * 0.24} fill="white"/>
      {/* Small gloss */}
      <ellipse cx={cx - r * 0.18} cy={cy + r * 0.48} rx={r * 0.15} ry={r * 0.09} fill="white" fillOpacity="0.7"/>
    </g>
  );
}

// Happy squint eye (curved, for celebrate)
function EyeHappy({ cx, cy, r = 11 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <path
        d={`M ${cx - r} ${cy} Q ${cx} ${cy - r * 0.9} ${cx + r} ${cy}`}
        fill="white" stroke="#1E1B2E" strokeWidth="2.5"
      />
      {/* Filled arc to make it look like a squinting eye */}
      <path
        d={`M ${cx - r + 1} ${cy} Q ${cx} ${cy - r * 0.85} ${cx + r - 1} ${cy}`}
        fill="#1E1B2E"
      />
      <ellipse cx={cx + r * 0.25} cy={cy - r * 0.5} rx={r * 0.22} ry={r * 0.16} fill="white" fillOpacity="0.9"/>
    </g>
  );
}

// Wink eye
function EyeWink({ cx, cy, r = 11 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <path
        d={`M ${cx - r} ${cy} Q ${cx} ${cy + r * 0.6} ${cx + r} ${cy}`}
        stroke="#1E1B2E" strokeWidth="2.5" strokeLinecap="round" fill="none"
      />
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared body/head base props
// ─────────────────────────────────────────────────────────────────────────────
const P = "#37ebf3"; // brand aqua
const PS = "#1ac5b0"; // shadow
const PD = "#0fa898"; // deep shadow
const OL = "#1A1A2E"; // outline

// ─────────────────────────────────────────────────────────────────────────────
// 1. MASCOT — curious wave, waving left arm
// ─────────────────────────────────────────────────────────────────────────────
export function CharacterMascot({ size = 100 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* ── Antenna ── */}
      <line x1="50" y1="5" x2="50" y2="15" stroke={OL} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Star on antenna */}
      <polygon points="50,1 52,7 58,7 53,11 55,17 50,13 45,17 47,11 42,7 48,7"
        fill="#FF4D8B" stroke="#CC2D6A" strokeWidth="1.2"/>

      {/* ── Head shadow ── */}
      <ellipse cx="51" cy="48" rx="33" ry="31" fill={PS}/>
      {/* ── Head ── */}
      <ellipse cx="50" cy="45" rx="33" ry="31" fill={P} stroke={OL} strokeWidth="2.5"/>
      {/* Highlight */}
      <ellipse cx="40" cy="32" rx="17" ry="10" fill="white" fillOpacity="0.18" transform="rotate(-12 40 32)"/>

      {/* ── Ears ── */}
      <ellipse cx="17" cy="46" rx="6" ry="9" fill={PS} stroke={OL} strokeWidth="2"/>
      <ellipse cx="17" cy="48" rx="3.5" ry="5.5" fill={PD}/>
      <ellipse cx="83" cy="46" rx="6" ry="9" fill={PS} stroke={OL} strokeWidth="2"/>
      <ellipse cx="83" cy="48" rx="3.5" ry="5.5" fill={PD}/>

      {/* ── Eyes ── */}
      <Eye cx={36} cy={42} r={11}/>
      <Eye cx={64} cy={42} r={11}/>

      {/* ── Cheeks ── */}
      <ellipse cx="22" cy="56" rx="7.5" ry="4.5" fill="#FDA4AF" fillOpacity="0.6"/>
      <ellipse cx="78" cy="56" rx="7.5" ry="4.5" fill="#FDA4AF" fillOpacity="0.6"/>

      {/* ── Mouth (open happy) ── */}
      <path d="M40 60 Q50 71 60 60" fill="#1E1B2E" stroke={OL} strokeWidth="2"/>
      <path d="M40 60 Q50 69 60 60" fill="#FDA4AF"/>

      {/* ── Body shadow ── */}
      <rect x="31" y="76" width="38" height="35" rx="10" fill={PD}/>
      {/* ── Body ── */}
      <rect x="31" y="72" width="38" height="34" rx="10" fill={PS} stroke={OL} strokeWidth="2.5"/>
      <ellipse cx="50" cy="78" rx="14" ry="5" fill="white" fillOpacity="0.15"/>
      {/* Chest detail */}
      <rect x="40" y="81" width="20" height="14" rx="4" fill={PD} stroke={OL} strokeWidth="1.5"/>
      <circle cx="50" cy="88" r="4" fill={P} stroke={OL} strokeWidth="1.2"/>
      <line x1="44" y1="84" x2="44" y2="91" stroke="#7B61FF" strokeWidth="1"/>
      <line x1="56" y1="84" x2="56" y2="91" stroke="#7B61FF" strokeWidth="1" strokeOpacity="0.6"/>

      {/* ── Left arm (raised wave) ── */}
      <ellipse cx="20" cy="74" rx="8" ry="11" fill={P} stroke={OL} strokeWidth="2.5"
        transform="rotate(-40 20 74)"/>
      <ellipse cx="10" cy="62" rx="9" ry="9" fill={P} stroke={OL} strokeWidth="2.5"/>
      {/* knuckle lines */}
      <line x1="7"  y1="60" x2="8"  y2="66" stroke={PS} strokeWidth="1.2"/>
      <line x1="10" y1="58" x2="10" y2="65" stroke={PS} strokeWidth="1.2"/>
      <line x1="13" y1="60" x2="12" y2="66" stroke={PS} strokeWidth="1.2"/>

      {/* ── Right arm (relaxed, angled down) ── */}
      <ellipse cx="80" cy="82" rx="8" ry="11" fill={P} stroke={OL} strokeWidth="2.5"
        transform="rotate(20 80 82)"/>
      <ellipse cx="88" cy="93" rx="9" ry="9" fill={P} stroke={OL} strokeWidth="2.5"/>

      {/* ── Legs ── */}
      <rect x="35" y="103" width="13" height="20" rx="6.5" fill={PD} stroke={OL} strokeWidth="2.5"/>
      <rect x="52" y="103" width="13" height="20" rx="6.5" fill={PD} stroke={OL} strokeWidth="2.5"/>
      {/* Feet */}
      <ellipse cx="41.5" cy="122" rx="10" ry="6" fill="#004D36" stroke={OL} strokeWidth="2"/>
      <ellipse cx="58.5" cy="122" rx="10" ry="6" fill="#004D36" stroke={OL} strokeWidth="2"/>
      {/* Shoe highlight */}
      <ellipse cx="38" cy="119" rx="4" ry="2" fill="white" fillOpacity="0.18"/>
      <ellipse cx="55" cy="119" rx="4" ry="2" fill="white" fillOpacity="0.18"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CELEBRATE — both arms up V, huge smile, eyes squinting, stars
// ─────────────────────────────────────────────────────────────────────────────
export function CharacterCelebrate({ size = 100 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* ── Floating stars ── */}
      <polygon points="12,18 13.5,23 18,23 14.5,26 15.5,31 12,28 8.5,31 9.5,26 6,23 10.5,23"
        fill="#FFD900" stroke="#C8A000" strokeWidth="1"/>
      <polygon points="88,14 89.5,19 94,19 90.5,22 91.5,27 88,24 84.5,27 85.5,22 82,19 86.5,19"
        fill="#FFD900" stroke="#C8A000" strokeWidth="1"/>
      <circle cx="18" cy="8" r="3" fill="#FFD900" stroke="#C8A000" strokeWidth="1"/>
      <circle cx="82" cy="10" r="2" fill="#FFD900" stroke="#C8A000" strokeWidth="1"/>
      <polygon points="50,3 51,6 54,6 52,8 52.5,11 50,9.5 47.5,11 48,8 46,6 49,6"
        fill="#FFD900" stroke="#C8A000" strokeWidth="1"/>

      {/* ── Head shadow ── */}
      <ellipse cx="51" cy="49" rx="33" ry="31" fill={PS}/>
      {/* ── Head ── */}
      <ellipse cx="50" cy="46" rx="33" ry="31" fill={P} stroke={OL} strokeWidth="2.5"/>
      <ellipse cx="39" cy="33" rx="18" ry="10" fill="white" fillOpacity="0.18" transform="rotate(-12 39 33)"/>

      {/* ── Ears ── */}
      <ellipse cx="17" cy="47" rx="6" ry="9" fill={PS} stroke={OL} strokeWidth="2"/>
      <ellipse cx="17" cy="49" rx="3.5" ry="5.5" fill={PD}/>
      <ellipse cx="83" cy="47" rx="6" ry="9" fill={PS} stroke={OL} strokeWidth="2"/>
      <ellipse cx="83" cy="49" rx="3.5" ry="5.5" fill={PD}/>

      {/* ── Eyes (happy squint) ── */}
      <EyeHappy cx={36} cy={45} r={11}/>
      <EyeHappy cx={64} cy={45} r={11}/>

      {/* ── Cheeks (extra bright for joy) ── */}
      <ellipse cx="21" cy="57" rx="8.5" ry="5.5" fill="#FF6B9D" fillOpacity="0.7"/>
      <ellipse cx="79" cy="57" rx="8.5" ry="5.5" fill="#FF6B9D" fillOpacity="0.7"/>

      {/* ── Mouth (huge open grin with teeth) ── */}
      <path d="M36 62 Q50 78 64 62" fill={OL} stroke={OL} strokeWidth="2" strokeLinecap="round"/>
      <path d="M36 62 Q50 76 64 62 Q50 68 36 62" fill="white"/>
      {/* Tooth dividers */}
      <line x1="46" y1="63" x2="46" y2="68" stroke="#E8E8F0" strokeWidth="1.5"/>
      <line x1="50" y1="63" x2="50" y2="69" stroke="#E8E8F0" strokeWidth="1.5"/>
      <line x1="54" y1="63" x2="54" y2="68" stroke="#E8E8F0" strokeWidth="1.5"/>

      {/* ── Body ── */}
      <rect x="31" y="78" width="38" height="33" rx="10" fill={PD}/>
      <rect x="31" y="74" width="38" height="33" rx="10" fill={PS} stroke={OL} strokeWidth="2.5"/>
      <ellipse cx="50" cy="80" rx="14" ry="5" fill="white" fillOpacity="0.15"/>
      <rect x="40" y="83" width="20" height="13" rx="4" fill={PD} stroke={OL} strokeWidth="1.5"/>
      <circle cx="50" cy="89.5" r="3.5" fill="#FFD900" stroke="#C8A000" strokeWidth="1.2"/>

      {/* ── Left arm (raised up-left) ── */}
      <ellipse cx="20" cy="68" rx="8" ry="12" fill={P} stroke={OL} strokeWidth="2.5"
        transform="rotate(-55 20 68)"/>
      <ellipse cx="8" cy="55" rx="9" ry="9" fill={P} stroke={OL} strokeWidth="2.5"/>
      <line x1="5"  y1="53" x2="6"  y2="59" stroke={PS} strokeWidth="1.2"/>
      <line x1="8"  y1="51" x2="8"  y2="58" stroke={PS} strokeWidth="1.2"/>
      <line x1="11" y1="53" x2="10" y2="59" stroke={PS} strokeWidth="1.2"/>

      {/* ── Right arm (raised up-right) ── */}
      <ellipse cx="80" cy="68" rx="8" ry="12" fill={P} stroke={OL} strokeWidth="2.5"
        transform="rotate(55 80 68)"/>
      <ellipse cx="92" cy="55" rx="9" ry="9" fill={P} stroke={OL} strokeWidth="2.5"/>
      <line x1="89" y1="53" x2="90" y2="59" stroke={PS} strokeWidth="1.2"/>
      <line x1="92" y1="51" x2="92" y2="58" stroke={PS} strokeWidth="1.2"/>
      <line x1="95" y1="53" x2="94" y2="59" stroke={PS} strokeWidth="1.2"/>

      {/* ── Legs (feet slightly off ground = jumping) ── */}
      <rect x="35" y="104" width="13" height="18" rx="6.5" fill={PD} stroke={OL} strokeWidth="2.5"
        transform="rotate(-8 35 104)"/>
      <rect x="52" y="104" width="13" height="18" rx="6.5" fill={PD} stroke={OL} strokeWidth="2.5"
        transform="rotate(8 65 104)"/>
      <ellipse cx="40" cy="121" rx="10" ry="6" fill="#004D36" stroke={OL} strokeWidth="2"/>
      <ellipse cx="62" cy="121" rx="10" ry="6" fill="#004D36" stroke={OL} strokeWidth="2"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. PROUD — thumbs up, one eye wink, satisfied smile
// ─────────────────────────────────────────────────────────────────────────────
export function CharacterProud({ size = 100 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* ── Antenna ── */}
      <line x1="50" y1="5" x2="50" y2="14" stroke={OL} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="50" cy="3.5" r="4" fill={P} stroke={OL} strokeWidth="1.5"/>
      <circle cx="50" cy="3.5" r="2" fill="white" fillOpacity="0.5"/>

      {/* ── Head ── */}
      <ellipse cx="51" cy="47" rx="33" ry="31" fill={PS}/>
      <ellipse cx="50" cy="44" rx="33" ry="31" fill={P} stroke={OL} strokeWidth="2.5"/>
      <ellipse cx="39" cy="31" rx="18" ry="10" fill="white" fillOpacity="0.18" transform="rotate(-12 39 31)"/>

      {/* ── Ears ── */}
      <ellipse cx="17" cy="45" rx="6" ry="9" fill={PS} stroke={OL} strokeWidth="2"/>
      <ellipse cx="17" cy="47" rx="3.5" ry="5.5" fill={PD}/>
      <ellipse cx="83" cy="45" rx="6" ry="9" fill={PS} stroke={OL} strokeWidth="2"/>
      <ellipse cx="83" cy="47" rx="3.5" ry="5.5" fill={PD}/>

      {/* ── Left eye (normal, knowing look) ── */}
      <Eye cx={36} cy={41} r={11}/>
      {/* ── Right eye (wink) ── */}
      <EyeWink cx={64} cy={41} r={11}/>

      {/* ── Cheeks ── */}
      <ellipse cx="22" cy="54" rx="7.5" ry="4.5" fill="#FDA4AF" fillOpacity="0.6"/>
      <ellipse cx="78" cy="54" rx="7.5" ry="4.5" fill="#FDA4AF" fillOpacity="0.6"/>

      {/* ── Mouth (confident closed smile) ── */}
      <path d="M38 59 Q50 68 62 59" stroke={OL} strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* ── Body ── */}
      <rect x="31" y="76" width="38" height="34" rx="10" fill={PD}/>
      <rect x="31" y="72" width="38" height="34" rx="10" fill={PS} stroke={OL} strokeWidth="2.5"/>
      <ellipse cx="50" cy="78" rx="14" ry="5" fill="white" fillOpacity="0.15"/>
      <rect x="40" y="81" width="20" height="13" rx="4" fill={PD} stroke={OL} strokeWidth="1.5"/>
      <circle cx="50" cy="87.5" r="3.5" fill={P} stroke={OL} strokeWidth="1.2"/>

      {/* ── Left arm (relaxed, slight angle) ── */}
      <ellipse cx="22" cy="80" rx="8" ry="11" fill={P} stroke={OL} strokeWidth="2.5"
        transform="rotate(-15 22 80)"/>
      <ellipse cx="16" cy="92" rx="9" ry="9" fill={P} stroke={OL} strokeWidth="2.5"/>

      {/* ── Right arm (thumbs up!) ── */}
      {/* Upper arm */}
      <ellipse cx="79" cy="72" rx="8" ry="12" fill={P} stroke={OL} strokeWidth="2.5"
        transform="rotate(-50 79 72)"/>
      {/* Fist/hand */}
      <rect x="85" y="52" width="14" height="12" rx="5" fill={P} stroke={OL} strokeWidth="2.5"/>
      {/* Thumb up */}
      <rect x="91" y="44" width="7" height="12" rx="3.5" fill={P} stroke={OL} strokeWidth="2"/>
      {/* Knuckle lines on fist */}
      <line x1="88" y1="55" x2="88" y2="62" stroke={PS} strokeWidth="1.2"/>
      <line x1="92" y1="55" x2="92" y2="62" stroke={PS} strokeWidth="1.2"/>
      <line x1="96" y1="55" x2="96" y2="62" stroke={PS} strokeWidth="1.2"/>

      {/* ── Legs ── */}
      <rect x="35" y="103" width="13" height="20" rx="6.5" fill={PD} stroke={OL} strokeWidth="2.5"/>
      <rect x="52" y="103" width="13" height="20" rx="6.5" fill={PD} stroke={OL} strokeWidth="2.5"/>
      <ellipse cx="41.5" cy="122" rx="10" ry="6" fill="#004D36" stroke={OL} strokeWidth="2"/>
      <ellipse cx="58.5" cy="122" rx="10" ry="6" fill="#004D36" stroke={OL} strokeWidth="2"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. DETERMINED — fist raised, pouty face, sweat drop, "keep going" energy
// ─────────────────────────────────────────────────────────────────────────────
export function CharacterDetermined({ size = 100 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* ── Sweat drop ── */}
      <path d="M80 12 Q82 18 78 18 Q76 18 76 16 Q76 12 80 12Z" fill="#93C5FD" stroke="#3B82F6" strokeWidth="1"/>

      {/* ── Antenna ── */}
      <line x1="50" y1="5" x2="50" y2="14" stroke={OL} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="50" cy="3.5" r="4" fill="#FDA4AF" stroke="#BE185D" strokeWidth="1.5"/>

      {/* ── Head ── */}
      <ellipse cx="51" cy="47" rx="33" ry="31" fill={PS}/>
      <ellipse cx="50" cy="44" rx="33" ry="31" fill={P} stroke={OL} strokeWidth="2.5"/>
      <ellipse cx="39" cy="31" rx="18" ry="10" fill="white" fillOpacity="0.18" transform="rotate(-12 39 31)"/>

      {/* ── Ears ── */}
      <ellipse cx="17" cy="45" rx="6" ry="9" fill={PS} stroke={OL} strokeWidth="2"/>
      <ellipse cx="17" cy="47" rx="3.5" ry="5.5" fill={PD}/>
      <ellipse cx="83" cy="45" rx="6" ry="9" fill={PS} stroke={OL} strokeWidth="2"/>
      <ellipse cx="83" cy="47" rx="3.5" ry="5.5" fill={PD}/>

      {/* ── Eyebrows (furrowed = determined) ── */}
      <path d="M26 30 Q36 27 42 31" stroke={OL} strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M58 31 Q64 27 74 30" stroke={OL} strokeWidth="3" strokeLinecap="round" fill="none"/>

      {/* ── Eyes (slightly narrowed) ── */}
      <Eye cx={36} cy={41} r={10}/>
      <Eye cx={64} cy={41} r={10}/>

      {/* ── Cheeks (less prominent, determined not sad) ── */}
      <ellipse cx="22" cy="54" rx="6" ry="3.5" fill="#FDA4AF" fillOpacity="0.45"/>
      <ellipse cx="78" cy="54" rx="6" ry="3.5" fill="#FDA4AF" fillOpacity="0.45"/>

      {/* ── Mouth (small determined pout / thin line) ── */}
      <path d="M40 61 Q50 58 60 61" stroke={OL} strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* ── Body ── */}
      <rect x="31" y="76" width="38" height="34" rx="10" fill={PD}/>
      <rect x="31" y="72" width="38" height="34" rx="10" fill={PS} stroke={OL} strokeWidth="2.5"/>
      <ellipse cx="50" cy="78" rx="14" ry="5" fill="white" fillOpacity="0.15"/>
      <rect x="40" y="81" width="20" height="13" rx="4" fill={PD} stroke={OL} strokeWidth="1.5"/>
      <circle cx="50" cy="87.5" r="3.5" fill={P} stroke={OL} strokeWidth="1.2"/>

      {/* ── Left arm (relaxed down) ── */}
      <ellipse cx="22" cy="82" rx="8" ry="11" fill={P} stroke={OL} strokeWidth="2.5"
        transform="rotate(10 22 82)"/>
      <ellipse cx="18" cy="94" rx="9" ry="9" fill={P} stroke={OL} strokeWidth="2.5"/>

      {/* ── Right arm (fist raised high — power pose) ── */}
      <ellipse cx="79" cy="68" rx="8" ry="13" fill={P} stroke={OL} strokeWidth="2.5"
        transform="rotate(-60 79 68)"/>
      {/* Fist */}
      <rect x="84" y="48" width="14" height="14" rx="5" fill={P} stroke={OL} strokeWidth="2.5"/>
      <line x1="87" y1="51" x2="87" y2="60" stroke={PS} strokeWidth="1.2"/>
      <line x1="91" y1="50" x2="91" y2="61" stroke={PS} strokeWidth="1.2"/>
      <line x1="95" y1="51" x2="95" y2="60" stroke={PS} strokeWidth="1.2"/>
      {/* Speed lines from fist */}
      <line x1="83" y1="46" x2="78" y2="40" stroke="#7B61FF" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="88" y1="44" x2="86" y2="38" stroke="#7B61FF" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="93" y1="46" x2="96" y2="40" stroke="#7B61FF" strokeWidth="1.5" strokeLinecap="round"/>

      {/* ── Legs ── */}
      <rect x="35" y="103" width="13" height="20" rx="6.5" fill={PD} stroke={OL} strokeWidth="2.5"/>
      <rect x="52" y="103" width="13" height="20" rx="6.5" fill={PD} stroke={OL} strokeWidth="2.5"/>
      <ellipse cx="41.5" cy="122" rx="10" ry="6" fill="#004D36" stroke={OL} strokeWidth="2"/>
      <ellipse cx="58.5" cy="122" rx="10" ry="6" fill="#004D36" stroke={OL} strokeWidth="2"/>
    </svg>
  );
}
