// Cel-shaded anime chibi illustrations — themed flat-lay compositions
const OL = "#2A2D45";

// ── SCHULE: Backpack, chalkboard, books, apple, pencils ───────────────────────
export function ArtSchule() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#EFF6FF"/>
      <g transform="translate(20,20)">

      {/* ── Chalkboard (upper-left) ── */}
      <rect x="4" y="6" width="88" height="66" rx="4" fill="#C8904A" stroke={OL} strokeWidth="2.5"/>
      <rect x="10" y="12" width="76" height="54" rx="2" fill="#2A5424" stroke="#1A3A18" strokeWidth="1.5"/>
      <rect x="8" y="64" width="82" height="7" rx="1" fill="#A07840" stroke={OL} strokeWidth="1.5"/>
      <text x="16" y="32" fontSize="12" fontWeight="bold" fill="white" fillOpacity="0.9" fontFamily="monospace">2+2=4</text>
      <text x="16" y="48" fontSize="10" fill="#3A86FF" fillOpacity="0.88" fontFamily="monospace">ABC 123</text>
      <text x="66" y="32" fontSize="16" fill="#FFD166" fillOpacity="0.92">★</text>
      <circle cx="66" cy="52" r="10" fill="none" stroke="#FFD166" strokeWidth="1.8" strokeOpacity="0.9"/>
      <circle cx="62" cy="49" r="1.8" fill="#FFD166" fillOpacity="0.9"/>
      <circle cx="70" cy="49" r="1.8" fill="#FFD166" fillOpacity="0.9"/>
      <path d="M61,56 Q66,61 71,56" stroke="#FFD166" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeOpacity="0.9"/>
      <rect x="12" y="65" width="12" height="4.5" rx="1.5" fill="white" fillOpacity="0.88"/>
      <rect x="30" y="65" width="18" height="4.5" rx="1.5" fill="#FF6B9D" stroke={OL} strokeWidth="0.8"/>

      {/* ── Books + apple (upper-right) ── */}
      <rect x="100" y="56" width="54" height="10" rx="2" fill="#7B2FBE" stroke={OL} strokeWidth="2"/>
      <rect x="98" y="45" width="50" height="13" rx="2" fill="#3A86FF" stroke={OL} strokeWidth="2"/>
      <rect x="96" y="32" width="54" height="15" rx="2" fill="#E63946" stroke={OL} strokeWidth="2"/>
      <rect x="100" y="56" width="5" height="10" fill="#5E1F95" stroke={OL} strokeWidth="1"/>
      <rect x="98" y="45" width="5" height="13" fill="#2066CC" stroke={OL} strokeWidth="1"/>
      <rect x="96" y="32" width="5" height="15" fill="#C42B38" stroke={OL} strokeWidth="1"/>
      <circle cx="127" cy="21" r="13" fill="#E63946" stroke={OL} strokeWidth="2.5"/>
      <path d="M127,8 Q132,4 135,5" stroke="#2D8010" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <ellipse cx="121" cy="17" rx="3.5" ry="6" fill="rgba(255,255,255,0.32)" transform="rotate(-25,121,17)"/>

      {/* ── School bell (top-right) ── */}
      <path d="M140,30 Q136,24 140,18 Q144,12 150,12 Q156,12 160,18 Q164,24 160,30 L140,30 Z" fill="#FFD166" stroke={OL} strokeWidth="2"/>
      <rect x="138" y="30" width="24" height="6" rx="2" fill="#CC9900" stroke={OL} strokeWidth="1.8"/>
      <circle cx="150" cy="36" r="3.5" fill="#AA7F00" stroke={OL} strokeWidth="1.2"/>

      {/* ── Red backpack (center) ── */}
      <rect x="43" y="78" width="60" height="70" rx="9" fill="#E63946" stroke={OL} strokeWidth="2.5"/>
      <path d="M57,78 Q57,68 73,68 Q89,68 89,78" stroke={OL} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M57,78 Q57,70 73,70 Q89,70 89,78" stroke="#C42B38" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <rect x="43" y="78" width="13" height="20" rx="5" fill="#C42B38" stroke={OL} strokeWidth="2"/>
      <rect x="90" y="78" width="13" height="20" rx="5" fill="#C42B38" stroke={OL} strokeWidth="2"/>
      <rect x="49" y="108" width="48" height="36" rx="7" fill="#C42B38" stroke={OL} strokeWidth="2"/>
      <rect x="49" y="108" width="48" height="8" rx="6" fill="#A82030" stroke={OL} strokeWidth="1.5"/>
      <circle cx="73" cy="112" r="4" fill="#FFD166" stroke={OL} strokeWidth="1.5"/>
      <rect x="47" y="82" width="17" height="46" rx="5" fill="rgba(255,255,255,0.14)"/>

      {/* ── Colored pencils ── */}
      <g transform="rotate(-32, 22, 100)">
        <rect x="4" y="97" width="36" height="7" rx="2" fill="#FFD166" stroke={OL} strokeWidth="1.5"/>
        <polygon points="4,97 4,104 -3,100.5" fill="#CC9900" stroke={OL} strokeWidth="1.2"/>
        <rect x="38" y="97" width="7" height="7" rx="1.5" fill="#FFB0B0" stroke={OL} strokeWidth="1.2"/>
      </g>
      <g transform="rotate(22, 98, 78)">
        <rect x="80" y="75" width="34" height="6.5" rx="2" fill="#3A86FF" stroke={OL} strokeWidth="1.5"/>
        <polygon points="80,75 80,81.5 74,78.2" fill="#2066CC" stroke={OL} strokeWidth="1.2"/>
        <rect x="112" y="75" width="7" height="6.5" rx="1.5" fill="#FFB0B0" stroke={OL} strokeWidth="1.2"/>
      </g>
      <g transform="rotate(-14, 112, 96)">
        <rect x="96" y="92" width="32" height="6" rx="2" fill="#06D6A0" stroke={OL} strokeWidth="1.5"/>
        <polygon points="96,92 96,98 90,95" fill="#05AA80" stroke={OL} strokeWidth="1.2"/>
        <rect x="126" y="92" width="7" height="6" rx="1.5" fill="#FFB0B0" stroke={OL} strokeWidth="1.2"/>
      </g>
      </g>
    </svg>
  );
}

// ── FREIZEIT: Controller, soccer ball, skateboard, headphones, ice cream ──────
export function ArtFreizeit() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#FFFBEE"/>
      <g transform="translate(20,20)">

      {/* ── Headphones (top) ── */}
      <path d="M36,40 Q80,14 124,40" stroke="#3A2878" strokeWidth="9" fill="none" strokeLinecap="round"/>
      <path d="M36,40 Q80,18 124,40" stroke="#5A4898" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="36" cy="42" rx="13" ry="15" fill="#4A3888" stroke={OL} strokeWidth="2"/>
      <ellipse cx="36" cy="42" rx="9" ry="11" fill="#3A2870"/>
      <ellipse cx="36" cy="42" rx="5" ry="6" fill="#2A1858"/>
      <ellipse cx="124" cy="42" rx="13" ry="15" fill="#4A3888" stroke={OL} strokeWidth="2"/>
      <ellipse cx="124" cy="42" rx="9" ry="11" fill="#3A2870"/>
      <ellipse cx="124" cy="42" rx="5" ry="6" fill="#2A1858"/>
      <text x="36" y="45" fontSize="9" fill="#7B2FBE" textAnchor="middle">♪</text>
      <text x="124" y="45" fontSize="9" fill="#7B2FBE" textAnchor="middle">♪</text>

      {/* ── Ice cream (upper right) ── */}
      <polygon points="132,110 148,110 140,128" fill="#F0C870" stroke={OL} strokeWidth="2"/>
      <circle cx="140" cy="98" r="14" fill="#FF6B9D" stroke={OL} strokeWidth="2"/>
      <circle cx="138" cy="84" r="12" fill="#FFFDE0" stroke={OL} strokeWidth="2"/>
      <ellipse cx="133" cy="92" rx="4" ry="6" fill="rgba(255,255,255,0.35)" transform="rotate(-20,133,92)"/>
      <ellipse cx="133" cy="80" rx="3.5" ry="5" fill="rgba(255,255,255,0.35)" transform="rotate(-15,133,80)"/>
      <rect x="133" y="90" width="5" height="1.5" rx="1" fill="#E63946" transform="rotate(-20,133,90)"/>

      {/* ── Gaming controller (center, large) ── */}
      <rect x="18" y="62" width="104" height="52" rx="16" fill="#3A2878" stroke={OL} strokeWidth="2.5"/>
      <rect x="18" y="88" width="24" height="34" rx="12" fill="#3A2878" stroke={OL} strokeWidth="2.5"/>
      <rect x="98" y="88" width="24" height="34" rx="12" fill="#3A2878" stroke={OL} strokeWidth="2.5"/>
      <rect x="18" y="92" width="104" height="30" fill="#3A2878"/>
      <path d="M18,104 Q18,120 42,120 L98,120 Q122,120 122,104" stroke={OL} strokeWidth="2.5" fill="none"/>
      <rect x="36" y="76" width="8" height="24" rx="2" fill="#2A1860"/>
      <rect x="28" y="84" width="24" height="8" rx="2" fill="#2A1860"/>
      <circle cx="88" cy="78" r="6.5" fill="#E63946" stroke={OL} strokeWidth="1.5"/>
      <circle cx="100" cy="70" r="6.5" fill="#FFD166" stroke={OL} strokeWidth="1.5"/>
      <circle cx="102" cy="84" r="6.5" fill="#06D6A0" stroke={OL} strokeWidth="1.5"/>
      <circle cx="88" cy="92" r="6.5" fill="#3A86FF" stroke={OL} strokeWidth="1.5"/>
      <circle cx="40" cy="102" r="10" fill="#2A1860" stroke={OL} strokeWidth="1.5"/>
      <circle cx="40" cy="102" r="7" fill="#1A0840"/>
      <circle cx="100" cy="102" r="10" fill="#2A1860" stroke={OL} strokeWidth="1.5"/>
      <circle cx="100" cy="102" r="7" fill="#1A0840"/>
      <path d="M24,70 Q70,64 116,70" stroke="rgba(255,255,255,0.18)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>

      {/* ── Soccer ball (lower-left) ── */}
      <circle cx="30" cy="140" r="20" fill="white" stroke={OL} strokeWidth="2"/>
      <path d="M30,120 L36,126 L34,136 L24,136 L22,126 Z" fill={OL}/>
      <path d="M22,126 L30,120 L27,112 L18,112 L15,122 Z" fill={OL}/>
      <path d="M36,126 L43,122 L43,112 L34,109 L30,120 Z" fill={OL}/>
      <path d="M24,136 L20,144 L26,150 L34,147 L34,136 Z" fill={OL}/>
      <path d="M34,136 L38,146 L47,143 L48,133 L42,124 Z" fill={OL}/>
      <ellipse cx="20" cy="126" rx="5" ry="3.5" fill="rgba(255,255,255,0.3)" transform="rotate(-20,20,126)"/>

      {/* ── Skateboard (lower-right, diagonal, fully inside) ── */}
      <g transform="rotate(-14, 108, 148)">
        <rect x="84" y="140" width="80" height="16" rx="8" fill="#E63946" stroke={OL} strokeWidth="2"/>
        <rect x="88" y="142" width="72" height="12" rx="6" fill="#C42B38" fillOpacity="0.45"/>
        <rect x="92" y="155" width="18" height="4" rx="1.5" fill="#888" stroke={OL} strokeWidth="1.2"/>
        <rect x="130" y="155" width="18" height="4" rx="1.5" fill="#888" stroke={OL} strokeWidth="1.2"/>
        <circle cx="94" cy="159" r="5" fill="#FFD166" stroke={OL} strokeWidth="1.5"/>
        <circle cx="108" cy="159" r="5" fill="#FFD166" stroke={OL} strokeWidth="1.5"/>
        <circle cx="136" cy="159" r="5" fill="#FFD166" stroke={OL} strokeWidth="1.5"/>
        <circle cx="150" cy="159" r="5" fill="#FFD166" stroke={OL} strokeWidth="1.5"/>
      </g>

      {/* ── Music notes ── */}
      <text x="8" y="58" fontSize="14" fill="#7B2FBE" fillOpacity="0.85">♩</text>
      <text x="152" y="54" fontSize="12" fill="#FF6B9D" fillOpacity="0.8">♪</text>
      </g>
    </svg>
  );
}

// ── FREUNDE: Bracelets, pinky hands, popcorn, smartphone, sparkles ────────────
export function ArtFreunde() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#FFF8EE"/>
      <g transform="translate(20,20)">

      {/* ── Friendship bracelets (upper-left) ── */}
      <ellipse cx="28" cy="30" rx="20" ry="10" fill="none" stroke="#E63946" strokeWidth="7" strokeOpacity="0.9"/>
      <ellipse cx="28" cy="30" rx="20" ry="10" fill="none" stroke={OL} strokeWidth="1.5" strokeOpacity="0.6"/>
      {[0,40,80,120,160,200,240,280,320].map((a,i) => {
        const r = a * Math.PI / 180;
        const x = 28 + 20*Math.cos(r), y = 30 + 10*Math.sin(r);
        return <circle key={i} cx={x} cy={y} r="3.5" fill={["#FFD166","#3A86FF","#7B2FBE","#E63946","#FF6B9D","#FFD166","#3A86FF","#7B2FBE","#E63946"][i]} stroke={OL} strokeWidth="1"/>;
      })}
      <ellipse cx="58" cy="26" rx="20" ry="10" fill="none" stroke="#3A86FF" strokeWidth="7" strokeOpacity="0.9"/>
      <ellipse cx="58" cy="26" rx="20" ry="10" fill="none" stroke={OL} strokeWidth="1.5" strokeOpacity="0.6"/>
      {[0,45,90,135,180,225,270,315].map((a,i) => {
        const r = a * Math.PI / 180;
        const x = 58 + 20*Math.cos(r), y = 26 + 10*Math.sin(r);
        return <circle key={i} cx={x} cy={y} r="3.5" fill={["#FFD166","#E63946","#7B2FBE","#3A86FF","#FF6B9D","#FFD166","#E63946","#7B2FBE"][i]} stroke={OL} strokeWidth="1"/>;
      })}

      {/* ── Pinky promise (upper-right) ── */}
      <rect x="96" y="32" width="24" height="18" rx="8" fill="#F8C880" stroke={OL} strokeWidth="2"/>
      <rect x="96" y="24" width="10" height="14" rx="5" fill="#F8C880" stroke={OL} strokeWidth="1.8"/>
      <rect x="128" y="32" width="24" height="18" rx="8" fill="#F8D898" stroke={OL} strokeWidth="2"/>
      <rect x="138" y="24" width="10" height="14" rx="5" fill="#F8D898" stroke={OL} strokeWidth="1.8"/>
      <path d="M104,28 Q116,20 140,28" stroke="#E63946" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="3,2"/>
      <path d="M120,14 C120,12 117,10 117,13 C117,15 120,18 120,18 C120,18 123,15 123,13 C123,10 120,12 120,14 Z" fill="#E63946"/>

      {/* ── Popcorn bucket (center, large) ── */}
      <path d="M52,80 L58,148 L102,148 L108,80 Z" fill="#E63946" stroke={OL} strokeWidth="2.5"/>
      <path d="M55,80 L60,148" stroke="white" strokeWidth="6" strokeOpacity="0.9"/>
      <path d="M67,80 L71,148" stroke="white" strokeWidth="6" strokeOpacity="0.9"/>
      <path d="M79,80 L82,148" stroke="white" strokeWidth="6" strokeOpacity="0.9"/>
      <path d="M91,80 L93,148" stroke="white" strokeWidth="6" strokeOpacity="0.9"/>
      <path d="M103,80 L106,148" stroke="white" strokeWidth="6" strokeOpacity="0.9"/>
      <path d="M52,80 L58,148 L102,148 L108,80 Z" fill="none" stroke={OL} strokeWidth="2.5"/>
      <rect x="48" y="74" width="64" height="10" rx="3" fill="#C42B38" stroke={OL} strokeWidth="2"/>
      {[
        [56,62],[64,54],[72,62],[80,50],[88,58],[96,64],[102,56],[110,62],
        [60,70],[70,68],[84,66],[94,70],[104,66],
      ].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={i%3===0?8:i%2===0?7:6.5} fill={i%4===0?"#FFF0A0":i%4===1?"#FFFDE0":i%4===2?"#F8E898":"#FFF4C0"} stroke={OL} strokeWidth="1.8"/>
      ))}

      {/* ── Smartphone (right) ── */}
      <rect x="116" y="72" width="38" height="66" rx="6" fill="#1A1A2E" stroke={OL} strokeWidth="2"/>
      <rect x="120" y="76" width="30" height="58" rx="3" fill="#EEF4FF"/>
      <rect x="120" y="76" width="30" height="7" rx="2" fill="#D0D8F0"/>
      <rect x="122" y="87" width="18" height="9" rx="4" fill="#7B2FBE"/>
      <rect x="130" y="100" width="16" height="9" rx="4" fill="#E63946"/>
      <rect x="122" y="113" width="20" height="9" rx="4" fill="#3A86FF"/>
      <rect x="128" y="126" width="14" height="9" rx="4" fill="#FFD166"/>
      <text x="123" y="94" fontSize="6" fill="white">👍</text>
      <text x="131" y="107" fontSize="6" fill="white">❤️</text>
      <text x="123" y="120" fontSize="6" fill={OL}>😊</text>
      <circle cx="135" cy="138" r="3" fill="#3A3D55" stroke={OL} strokeWidth="1"/>

      {/* ── Stars ── */}
      {[[14,74],[14,96],[15,116],[148,76],[150,100],[148,124],[80,40]].map(([x,y],i) => (
        <text key={i} x={x} y={y} fontSize={i%2===0?14:10} fill={["#FFD166","#E63946","#3A86FF","#7B2FBE","#FFD166","#E63946","#FFD166"][i]} fillOpacity="0.85" textAnchor="middle">★</text>
      ))}
      </g>
    </svg>
  );
}

// ── LIEBE: Fairy lights, big heart, love letter, roses ────────────────────────
export function ArtLiebe() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6B9D" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#FF6B9D" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Background — warm blush */}
      <rect width="200" height="200" fill="#FFF0F6"/>
      <g transform="translate(20,20)">

      {/* Subtle polka dots */}
      {[20,50,80,110,140].map(x =>
        [20,50,80,110,140].map(y => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="1.5" fill="#FFB0D0" fillOpacity="0.35"/>
        ))
      )}

      {/* ── Fairy lights across top ── */}
      <path d="M0,22 Q20,18 40,22 Q60,26 80,22 Q100,18 120,22 Q140,26 160,22" stroke="#AA8830" strokeWidth="1.5" fill="none" strokeOpacity="0.7"/>
      {[12,36,60,84,108,132,156].map((x,i) => {
        const cy = i % 2 === 0 ? 28 : 30;
        const colors = ["#E63946","#FFD166","#3A86FF","#FF6B9D","#7B2FBE","#06D6A0","#FFD166"];
        return (
          <g key={i}>
            <line x1={x} y1="22" x2={x} y2={cy-6} stroke="#AA8830" strokeWidth="1" strokeOpacity="0.5"/>
            <ellipse cx={x} cy={cy} rx="4.5" ry="5.5" fill={colors[i]}  stroke={OL} strokeWidth="1"/>
            <ellipse cx={x} cy={cy} rx="8" ry="9" fill={colors[i]} fillOpacity="0.2"/>
            <ellipse cx={x-1} cy={cy-1.5} rx="1.5" ry="2" fill="rgba(255,255,255,0.55)"/>
          </g>
        );
      })}

      {/* ── Heart glow ── */}
      <ellipse cx="80" cy="76" rx="56" ry="50" fill="url(#heartGlow)"/>

      {/* ── BIG HEART (center hero) ── */}
      <path d="M80,112 C80,112 22,78 22,48 C22,28 44,18 80,40 C116,18 138,28 138,48 C138,78 80,112 80,112 Z" fill="#E63946" stroke={OL} strokeWidth="3"/>
      <path d="M80,112 C98,96 124,76 132,55 C136,44 136,48 138,48 C138,78 80,112 80,112 Z" fill="#C42B38" fillOpacity="0.5"/>
      <ellipse cx="54" cy="46" rx="14" ry="18" fill="rgba(255,255,255,0.28)" transform="rotate(-20,54,46)"/>
      <circle cx="48" cy="40" r="6" fill="rgba(255,255,255,0.2)"/>

      {/* ── Floating small hearts ── */}
      {([
        [16, 52, 9, "#FF6B9D"], [144, 48, 8, "#7B2FBE"],
        [10, 90, 7, "#E63946"], [150, 88, 10, "#FF6B9D"],
        [22, 124, 8, "#7B2FBE"], [138, 120, 7, "#E63946"],
        [56, 16, 7, "#FF6B9D"], [104, 14, 9, "#E63946"],
      ] as [number,number,number,string][]).map(([x,y,s,c],i) => (
        <path key={i}
          d={`M${x},${y+s*0.6} C${x},${y+s*0.6} ${x-s},${y-s*0.2} ${x-s},${y-s*0.4} C${x-s},${y-s*0.9} ${x},${y-s*0.9} ${x},${y-s*0.4} C${x},${y-s*0.9} ${x+s},${y-s*0.9} ${x+s},${y-s*0.4} C${x+s},${y-s*0.2} ${x},${y+s*0.6} ${x},${y+s*0.6} Z`}
          fill={c} fillOpacity="0.82"
        />
      ))}

      {/* ── Love letter (lower-left, large & prominent) ── */}
      <rect x="4" y="118" width="64" height="38" rx="5" fill="#FFFEF0" stroke={OL} strokeWidth="2.2"/>
      {/* Envelope flap */}
      <path d="M4,118 L36,138 L68,118" stroke={OL} strokeWidth="2" fill="none"/>
      {/* Bottom folds */}
      <path d="M4,156 L28,138" stroke={OL} strokeWidth="1.2" strokeOpacity="0.4"/>
      <path d="M68,156 L44,138" stroke={OL} strokeWidth="1.2" strokeOpacity="0.4"/>
      {/* Wax seal heart */}
      <circle cx="36" cy="138" r="9" fill="#E63946" stroke={OL} strokeWidth="1.5"/>
      <path d="M36,143 C36,143 29,139 29,136 C29,133 36,133 36,136 C36,133 43,133 43,136 C43,139 36,143 36,143 Z" fill="#C42B38"/>
      <text x="36" y="140" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">✉</text>
      {/* Lines on letter */}
      <line x1="12" y1="144" x2="52" y2="144" stroke="#E8DFC0" strokeWidth="1.2"/>
      <line x1="12" y1="150" x2="46" y2="150" stroke="#E8DFC0" strokeWidth="1.2"/>

      {/* ── Rose (lower-right, big & beautiful) ── */}
      {/* Stem + leaves */}
      <line x1="128" y1="158" x2="120" y2="118" stroke="#2D6A14" strokeWidth="3.5" strokeLinecap="round"/>
      <ellipse cx="112" cy="132" rx="11" ry="5" fill="#3A8020" stroke={OL} strokeWidth="1.2" transform="rotate(-40,112,132)"/>
      <ellipse cx="130" cy="124" rx="9" ry="4" fill="#2D6A14" stroke={OL} strokeWidth="1.2" transform="rotate(30,130,124)"/>
      {/* Rose petals — layered circles */}
      <circle cx="120" cy="108" r="20" fill="#E63946" stroke={OL} strokeWidth="2.2"/>
      <circle cx="120" cy="108" r="15" fill="#C42B38"/>
      <circle cx="116" cy="104" r="10" fill="#E63946"/>
      <circle cx="120" cy="108" r="6" fill="#C42B38"/>
      <circle cx="120" cy="108" r="3" fill="#A82030"/>
      {/* Petal highlights */}
      <ellipse cx="112" cy="102" rx="6" ry="9" fill="rgba(255,255,255,0.22)" transform="rotate(-25,112,102)"/>
      <ellipse cx="128" cy="116" rx="5" ry="7" fill="rgba(0,0,0,0.1)" transform="rotate(20,128,116)"/>
      {/* Small bud beside */}
      <circle cx="142" cy="118" r="10" fill="#FF6B9D" stroke={OL} strokeWidth="1.8"/>
      <circle cx="142" cy="118" r="6" fill="#E63946"/>
      <line x1="142" y1="128" x2="140" y2="145" stroke="#2D6A14" strokeWidth="2.5" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// ── FAMILIE: Cozy night house with glowing windows ────────────────────────────
export function ArtFamilie() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D1B4B"/>
          <stop offset="60%" stopColor="#1A3270"/>
          <stop offset="100%" stopColor="#2A4E90"/>
        </linearGradient>
        <radialGradient id="winGlowL" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD166" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#FFD166" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="winGlowR" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD166" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#FFD166" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Night sky background */}
      <rect width="200" height="200" fill="url(#nightSky)"/>
      <g transform="translate(20,20)">

      {/* Stars */}
      {([
        [12,10],[30,6],[55,14],[78,8],[100,12],[118,5],[140,10],[150,18],
        [8,28],[25,22],[48,30],[92,25],[130,22],[152,32],
        [18,40],[65,35],[145,38],
      ] as [number,number][]).map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={i%3===0?1.5:1} fill="white" fillOpacity={i%2===0?0.9:0.6}/>
      ))}

      {/* Moon */}
      <circle cx="144" cy="20" r="14" fill="#FFF9D0" stroke="#E8D870" strokeWidth="1.5"/>
      <circle cx="150" cy="15" r="10" fill="#1A3270"/>

      {/* ── Ground ── */}
      <rect x="0" y="130" width="160" height="30" fill="#1A3A14"/>
      <rect x="0" y="128" width="160" height="5" rx="2" fill="#224818"/>

      {/* Path to door */}
      <ellipse cx="80" cy="140" rx="12" ry="5" fill="#3A6028" stroke="#2A4818" strokeWidth="1"/>
      <rect x="74" y="130" width="12" height="16" rx="2" fill="#4A7830" stroke="#3A6020" strokeWidth="1"/>

      {/* Garden flowers */}
      <circle cx="20" cy="128" r="5" fill="#FF6B9D" stroke={OL} strokeWidth="1.2"/>
      <circle cx="20" cy="128" r="2.5" fill="#FFD166"/>
      <line x1="20" y1="133" x2="20" y2="140" stroke="#2D6A14" strokeWidth="2"/>
      <circle cx="140" cy="128" r="5" fill="#E63946" stroke={OL} strokeWidth="1.2"/>
      <circle cx="140" cy="128" r="2.5" fill="#FFD166"/>
      <line x1="140" y1="133" x2="140" y2="140" stroke="#2D6A14" strokeWidth="2"/>

      {/* ── Chimney (behind roof) ── */}
      <rect x="104" y="46" width="16" height="30" rx="2" fill="#C42B38" stroke={OL} strokeWidth="2"/>
      <rect x="102" y="44" width="20" height="7" rx="2" fill="#A82030" stroke={OL} strokeWidth="1.5"/>
      {/* Smoke */}
      <path d="M108,42 Q104,34 108,26 Q112,20 109,14" stroke="rgba(220,215,205,0.75)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M114,42 Q118,34 115,27" stroke="rgba(220,215,205,0.55)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* ── Roof ── */}
      <polygon points="14,72 80,30 146,72" fill="#E63946" stroke={OL} strokeWidth="2.5" strokeLinejoin="round"/>
      <polygon points="18,72 80,34 142,72" fill="#F05050"/>
      {/* Roof shadow strip */}
      <rect x="14" y="70" width="132" height="5" rx="1" fill="#C42B38" stroke={OL} strokeWidth="1.5"/>

      {/* ── House body ── */}
      <rect x="22" y="72" width="116" height="60" rx="3" fill="#F5EDD8" stroke={OL} strokeWidth="2.5"/>

      {/* ── Left window glow ── */}
      <ellipse cx="52" cy="95" rx="22" ry="16" fill="url(#winGlowL)"/>
      {/* Left window */}
      <rect x="34" y="80" width="36" height="28" rx="4" fill="#FFE0A0" stroke={OL} strokeWidth="2.2"/>
      <line x1="52" y1="80" x2="52" y2="108" stroke={OL} strokeWidth="1.5"/>
      <line x1="34" y1="94" x2="70" y2="94" stroke={OL} strokeWidth="1.5"/>
      {/* Window curtains */}
      <path d="M34,80 Q43,88 34,94" fill="#FF6B9D" fillOpacity="0.5" stroke="#E63946" strokeWidth="1"/>
      <path d="M70,80 Q61,88 70,94" fill="#FF6B9D" fillOpacity="0.5" stroke="#E63946" strokeWidth="1"/>
      {/* Family silhouette in window */}
      <circle cx="45" cy="90" r="4" fill="#1A1A2E" fillOpacity="0.35"/>
      <circle cx="59" cy="88" r="5" fill="#1A1A2E" fillOpacity="0.35"/>
      {/* Window trim */}
      <rect x="33" y="77" width="38" height="7" rx="3" fill="#E63946" stroke={OL} strokeWidth="1.5"/>

      {/* ── Right window glow ── */}
      <ellipse cx="108" cy="95" rx="22" ry="16" fill="url(#winGlowR)"/>
      {/* Right window */}
      <rect x="90" y="80" width="36" height="28" rx="4" fill="#FFE0A0" stroke={OL} strokeWidth="2.2"/>
      <line x1="108" y1="80" x2="108" y2="108" stroke={OL} strokeWidth="1.5"/>
      <line x1="90" y1="94" x2="126" y2="94" stroke={OL} strokeWidth="1.5"/>
      <path d="M90,80 Q99,88 90,94" fill="#FF6B9D" fillOpacity="0.5" stroke="#E63946" strokeWidth="1"/>
      <path d="M126,80 Q117,88 126,94" fill="#FF6B9D" fillOpacity="0.5" stroke="#E63946" strokeWidth="1"/>
      <circle cx="100" cy="92" r="3" fill="#1A1A2E" fillOpacity="0.35"/>
      <circle cx="115" cy="90" r="4.5" fill="#1A1A2E" fillOpacity="0.35"/>
      <rect x="89" y="77" width="38" height="7" rx="3" fill="#E63946" stroke={OL} strokeWidth="1.5"/>

      {/* ── Door ── */}
      <rect x="65" y="98" width="30" height="34" rx="4" fill="#5A3010" stroke={OL} strokeWidth="2.2"/>
      <rect x="65" y="98" width="30" height="10" rx="3" fill="#3A1800"/>
      {/* Door window */}
      <rect x="70" y="101" width="20" height="12" rx="3" fill="#FFD080" fillOpacity="0.6" stroke={OL} strokeWidth="1"/>
      <circle cx="91" cy="116" r="2.5" fill="#FFD166" stroke={OL} strokeWidth="1"/>
      {/* Welcome mat */}
      <rect x="62" y="128" width="36" height="8" rx="2" fill="#7B2FBE" stroke={OL} strokeWidth="1.5"/>
      <text x="80" y="135" fontSize="5" fill="white" textAnchor="middle" fontWeight="bold">WELCOME</text>
      </g>
    </svg>
  );
}
