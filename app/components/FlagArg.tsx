export default function FlagArg({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 600"
      className={className}
      aria-label="Bandera Argentina"
      role="img"
      style={{ borderRadius: '2px', flexShrink: 0 }}
    >
      {/* Franja celeste superior */}
      <rect width="900" height="200" fill="#74ACDF" />
      {/* Franja blanca */}
      <rect y="200" width="900" height="200" fill="#FFFFFF" />
      {/* Franja celeste inferior */}
      <rect y="400" width="900" height="200" fill="#74ACDF" />
      {/* Sol de Mayo */}
      <g transform="translate(450,300)">
        {/* Rayos del sol */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180
          const isWavy = i % 2 === 0
          const x1 = Math.cos(angle) * 55
          const y1 = Math.sin(angle) * 55
          const x2 = Math.cos(angle) * 95
          const y2 = Math.sin(angle) * 95
          return isWavy ? (
            <path
              key={i}
              d={`M ${x1} ${y1} Q ${(x1 + x2) / 2 + Math.cos(angle + 0.4) * 12} ${(y1 + y2) / 2 + Math.sin(angle + 0.4) * 12} ${x2} ${y2}`}
              stroke="#F6B40E"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
          ) : (
            <line
              key={i}
              x1={x1} y1={y1}
              x2={x2} y2={y2}
              stroke="#F6B40E"
              strokeWidth="14"
              strokeLinecap="round"
            />
          )
        })}
        {/* Círculo del sol */}
        <circle r="50" fill="#F6B40E" stroke="#85340A" strokeWidth="3" />
        {/* Cara del sol */}
        <circle cx="-14" cy="-8" r="6" fill="#85340A" />
        <circle cx="14" cy="-8" r="6" fill="#85340A" />
        <path d="M -16 10 Q 0 26 16 10" stroke="#85340A" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}
