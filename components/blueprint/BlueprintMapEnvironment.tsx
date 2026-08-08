/** Architectural SVG — aligned to approved master blueprint reference */

const STAGE_DOWNSTAGE = 36.5;
/** Gap below curved apron before truss band */
const TRUSS_TOP = 41;
const TRUSS_BOTTOM = 45.5;
const TRUSS_MID = 43.25;
/** TR labels in lower third of band — clear of monitor labels */
const TRUSS_LABEL_Y = 44.85;
const AUDIENCE_FLOOR_START = 47.5;
/** Room centerline falls between TR-3 and TR-4 */
const ROOM_CENTERLINE = 50;
/**
 * Six truss positions — symmetric pairs with center gap at 50%.
 * TR-3 @ 43.5 | CENTER | TR-4 @ 56.5
 */
const TRUSS_X = [17.5, 30.5, 43.5, 56.5, 69.5, 82.5];
/** First seating row begins behind subwoofer on audience floor */
const FIRST_SEAT_ROW_Y = 53;
const SEAT_ROW_YS = [53, 57, 61, 65, 69, 73, 77, 81, 85];

function SeatRow({
  y,
  left,
  right,
  seats,
}: {
  y: number;
  left: number;
  right: number;
  seats: number;
}) {
  const width = right - left;
  const gap = width / seats;
  return (
    <>
      {Array.from({ length: seats }, (_, i) => {
        const cx = left + gap * i + gap * 0.5;
        return (
          <rect
            key={`${y}-${i}`}
            x={cx - 1.1}
            y={y - 0.55}
            width={2.2}
            height={1.1}
            rx={0.25}
            fill="rgba(72,150,145,0.14)"
            stroke="rgba(72,150,145,0.22)"
            strokeWidth={0.08}
          />
        );
      })}
    </>
  );
}

export function BlueprintMapEnvironment() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="bp-stage-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(14,18,26,0.98)" />
          <stop offset="100%" stopColor="rgba(8,10,16,0.99)" />
        </linearGradient>
        <linearGradient id="bp-audience-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(16,24,32,0.9)" />
          <stop offset="100%" stopColor="rgba(6,8,12,0.96)" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="100" height="100" fill="#020408" />

      {/* Upstage */}
      <rect x="0" y="0" width="100" height="6" fill="rgba(6,10,16,0.96)" />
      <line x1="0" y1="6" x2="100" y2="6" stroke="rgba(255,255,255,0.07)" strokeWidth={0.28} />

      {/* Shallow wide stage — unchanged proportions */}
      <path
        d={`M4 ${STAGE_DOWNSTAGE}
           Q4 ${STAGE_DOWNSTAGE - 3} 10 ${STAGE_DOWNSTAGE - 4}
           Q50 ${STAGE_DOWNSTAGE - 6} 90 ${STAGE_DOWNSTAGE - 4}
           Q96 ${STAGE_DOWNSTAGE - 3} 96 ${STAGE_DOWNSTAGE}
           L96 6 Q50 4 4 6 Z`}
        fill="url(#bp-stage-floor)"
      />

      {/* Curved downstage apron */}
      <path
        d={`M4 ${STAGE_DOWNSTAGE} Q50 ${STAGE_DOWNSTAGE + 2.8} 96 ${STAGE_DOWNSTAGE}`}
        fill="none"
        stroke="rgba(196,154,98,0.68)"
        strokeWidth={0.75}
      />
      <path
        d={`M4 ${STAGE_DOWNSTAGE + 1.1} Q50 ${STAGE_DOWNSTAGE + 3.8} 96 ${STAGE_DOWNSTAGE + 1.1}`}
        fill="none"
        stroke="rgba(100,75,42,0.32)"
        strokeWidth={0.22}
      />

      {/* Stage stairs */}
      <path
        d={`M4 28 L1.5 31 L1.5 ${STAGE_DOWNSTAGE} L4 ${STAGE_DOWNSTAGE}`}
        fill="rgba(12,16,24,0.9)"
        stroke="rgba(210,210,220,0.2)"
        strokeWidth={0.2}
      />
      {[29, 31, 33, 35].map((y) => (
        <line key={`sl-${y}`} x1="1.5" y1={y} x2="4" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={0.1} />
      ))}
      <path
        d={`M96 28 L98.5 31 L98.5 ${STAGE_DOWNSTAGE} L96 ${STAGE_DOWNSTAGE}`}
        fill="rgba(12,16,24,0.9)"
        stroke="rgba(210,210,220,0.2)"
        strokeWidth={0.2}
      />
      {[29, 31, 33, 35].map((y) => (
        <line key={`sr-${y}`} x1="96" y1={y} x2="98.5" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={0.1} />
      ))}

      {/* Gap: stage edge → truss */}
      <rect
        x="4"
        y={STAGE_DOWNSTAGE + 1.4}
        width="92"
        height={TRUSS_TOP - STAGE_DOWNSTAGE - 1.4}
        fill="rgba(0,0,0,0.3)"
      />

      {/* Front truss band — dedicated horizontal zone */}
      <rect
        x="4"
        y={TRUSS_TOP}
        width="92"
        height={TRUSS_BOTTOM - TRUSS_TOP}
        fill="rgba(148,163,184,0.045)"
        stroke="rgba(148,163,184,0.14)"
        strokeWidth={0.22}
      />
      {/* Top / bottom rails */}
      <line x1="4" y1={TRUSS_TOP + 0.55} x2="96" y2={TRUSS_TOP + 0.55} stroke="rgba(148,163,184,0.18)" strokeWidth={0.2} />
      <line x1="4" y1={TRUSS_BOTTOM - 0.55} x2="96" y2={TRUSS_BOTTOM - 0.55} stroke="rgba(148,163,184,0.18)" strokeWidth={0.2} />
      {/* Center structural line */}
      <line x1="4" y1={TRUSS_MID} x2="96" y2={TRUSS_MID} stroke="rgba(148,163,184,0.38)" strokeWidth={0.45} />
      {TRUSS_X.map((x, i) => (
        <g key={x}>
          <line
            x1={x}
            y1={TRUSS_TOP + 0.7}
            x2={x}
            y2={TRUSS_BOTTOM - 0.7}
            stroke="rgba(148,163,184,0.26)"
            strokeWidth={0.2}
          />
          <text
            x={x}
            y={TRUSS_LABEL_Y}
            textAnchor="middle"
            fill="rgba(148,163,184,0.38)"
            fontSize="2"
            fontWeight="600"
            fontFamily="system-ui, sans-serif"
          >
            TR-{i + 1}
          </text>
        </g>
      ))}

      {/* Projector mount zone — between TR-5 and TR-6 */}
      <rect
        x={73.5}
        y={TRUSS_MID - 0.55}
        width={5}
        height={1.1}
        rx={0.2}
        fill="rgba(56,189,248,0.12)"
        stroke="rgba(56,189,248,0.22)"
        strokeWidth={0.12}
      />

      {/* Room centerline — between TR-3 and TR-4, through audience floor */}
      <line
        x1={ROOM_CENTERLINE}
        y1={TRUSS_TOP}
        x2={ROOM_CENTERLINE}
        y2={FIRST_SEAT_ROW_Y - 1.5}
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={0.22}
        strokeDasharray="0.6 0.5"
      />

      {/* Gap: truss → audience floor (subwoofer zone) */}
      <rect
        x="4"
        y={TRUSS_BOTTOM}
        width="92"
        height={FIRST_SEAT_ROW_Y - TRUSS_BOTTOM - 2}
        fill="rgba(0,0,0,0.18)"
      />
      <line
        x1="4"
        y1={AUDIENCE_FLOOR_START}
        x2="96"
        y2={AUDIENCE_FLOOR_START}
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={0.25}
      />

      {/* Fan auditorium */}
      <path
        d={`M2 ${AUDIENCE_FLOOR_START}
           Q50 ${AUDIENCE_FLOOR_START - 1.5} 98 ${AUDIENCE_FLOOR_START}
           Q99 68 94 90
           Q50 94 6 90
           Q1 68 2 ${AUDIENCE_FLOOR_START} Z`}
        fill="url(#bp-audience-floor)"
      />

      {/* Seating — first row behind subwoofer */}
      {SEAT_ROW_YS.map((y, i) => (
        <SeatRow key={`l-${y}`} y={y} left={8 + i * 0.4} right={38 - i * 0.2} seats={8 + i} />
      ))}
      {SEAT_ROW_YS.map((y, i) => (
        <SeatRow key={`c-${y}`} y={y} left={40 - i * 0.2} right={60 + i * 0.2} seats={6 + Math.floor(i / 2)} />
      ))}
      {SEAT_ROW_YS.slice(0, 7).map((y, i) => (
        <SeatRow key={`r-${y}`} y={y} left={62 + i * 0.2} right={88 - i * 0.3} seats={7 + i} />
      ))}

      {[55, 63, 71, 79, 87].map((y, i) => {
        const spread = 10 + i * 3.5;
        return (
          <path
            key={`arc-${y}`}
            d={`M${50 - spread} ${y} Q50 ${y + 0.8} ${50 + spread} ${y}`}
            fill="none"
            stroke="rgba(72,150,145,0.07)"
            strokeWidth={0.12}
          />
        );
      })}

      {/* Aisles */}
      <path d={`M${ROOM_CENTERLINE} ${FIRST_SEAT_ROW_Y - 2} L${ROOM_CENTERLINE} 91`} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={0.4} />
      <path d={`M30 ${FIRST_SEAT_ROW_Y - 1} Q28 70 26 88`} fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth={0.25} />
      <path d={`M70 ${FIRST_SEAT_ROW_Y - 1} Q72 70 68 84`} fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth={0.25} />

      {/* House-right FOH platform — compact, widened slightly for equipment spacing */}
      <path
        d="M66 74
           Q69 72 74 71.5
           L96 70.5
           Q98.5 71 98.5 74
           L97.5 86
           Q96 88.5 92 88.5
           L71 87.5
           Q65 86.5 65 82
           L66 74 Z"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(196,154,98,0.35)"
        strokeWidth={0.28}
      />
      <text
        x="82"
        y="73.2"
        textAnchor="middle"
        fill="rgba(148,163,184,0.38)"
        fontSize="2"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
      >
        FOH
      </text>
    </svg>
  );
}
