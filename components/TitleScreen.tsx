export default function TitleScreen() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-amber-950 px-6 text-center">
      {/* Radial glow behind the title, evoking a desert sun */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/20 blur-3xl" />

      {/* Sun disc motif */}
      <svg
        viewBox="0 0 100 100"
        className="relative mb-8 h-16 w-16 text-amber-400"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="18" fill="currentColor" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 50 + Math.cos(angle) * 26;
          const y1 = 50 + Math.sin(angle) * 26;
          const x2 = 50 + Math.cos(angle) * 42;
          const y2 = 50 + Math.sin(angle) * 42;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      <p className="relative text-sm uppercase tracking-[0.4em] text-amber-400/80">
        Heroes of
      </p>
      <h1 className="relative mt-2 font-serif text-6xl font-bold tracking-wide text-amber-100 drop-shadow-[0_2px_12px_rgba(217,119,6,0.35)] sm:text-8xl">
        Kengir
      </h1>
      <p className="relative mt-4 text-lg uppercase tracking-[0.5em] text-amber-400/80 sm:text-xl">
        Sumeria
      </p>

      <div className="relative mt-10 h-px w-24 bg-amber-500/40" />

      <p className="relative mt-10 max-w-md text-sm text-stone-400">
        Digitale implementatie van het bordspel Kengir: Heroes of Sumeria
      </p>
    </div>
  );
}
