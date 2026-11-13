export function MissionPatch({ size = 44 }: { size?: number }) {
  return (
    <svg
      className="mission-patch"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Parche de misión NEXUS: horizonte lunar y órbita"
    >
      <defs>
        <linearGradient id="patch-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1220" />
          <stop offset="100%" stopColor="#13233a" />
        </linearGradient>
        <linearGradient id="patch-ground" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#patch-sky)" stroke="#67e8f9" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="24" fill="none" stroke="#334155" strokeWidth="0.8" />
      <path d="M2 40c10-6 20-8 30-8s20 2 30 8v12a30 30 0 0 1-60 0Z" fill="url(#patch-ground)" />
      <path d="M2 40c10-6 20-8 30-8s20 2 30 8" fill="none" stroke="#67e8f9" strokeWidth="1.4" />
      <circle cx="44" cy="20" r="4.5" fill="#e6edf7" />
      <path d="M39 20a5 5 0 0 1 10 0" fill="none" stroke="#94a3b8" strokeWidth="1" />
      <path d="M14 22l1.2 3.2L18 26l-2.8 1.2L14 30l-1.2-2.8L10 26l2.8-.8Z" fill="#fcd34d" />
      <path d="M52 31l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z" fill="#67e8f9" />
      <path d="M32 44v6M26 50h12" stroke="#67e8f9" strokeWidth="1.6" strokeLinecap="round" />
      <text x="32" y="60" textAnchor="middle" fill="#94a3b8" fontSize="5" letterSpacing="1.4">
        NX-01
      </text>
    </svg>
  );
}
