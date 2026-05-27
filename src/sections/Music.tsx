import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { formatDuration, formatDate, mixes } from "../data";

export default function Music() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [activeMix, setActiveMix] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const togglePlay = (id: number) => {
    if (activeMix === id) {
      setActiveMix(null);
      setProgress(0);
    } else {
      setActiveMix(id);
      setProgress(0);
    }
  };

  // Simulate progress
  useState(() => {
    if (activeMix) {
      const iv = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.5));
      }, 100);
      return () => clearInterval(iv);
    }
  });

  return (
    <section ref={ref} id="music" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <h2
          className={`text-3xl font-display font-bold leading-tight transition-all duration-700 sm:text-4xl lg:text-5xl ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Latest <span className="gradient-text">Mixes</span>
        </h2>

        <div className="mt-12 space-y-4">
          {mixes.map((mix, i) => {
            const isActive = activeMix === mix.id;
            const delay = isInView ? i * 0.1 : 0;
            return (
              <div
                key={mix.id}
                className={`group relative overflow-hidden rounded-2xl border border-stroke bg-surface/50 transition-all duration-500 hover:border-pink/40 ${
                  isInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${delay}s` }}
              >
                <div className="flex items-center gap-4 p-5 sm:p-6">
                  {/* Play button */}
                  <button
                    onClick={() => togglePlay(mix.id)}
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full accent-gradient text-white transition-all hover:shadow-[0_0_20px_rgba(243,6,130,0.4)] active:scale-90"
                    aria-label={`Play ${mix.title}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      {isActive ? (
                        <>
                          <rect x="6" y="4" width="4" height="16" rx="1" />
                          <rect x="14" y="4" width="4" height="16" rx="1" />
                        </>
                      ) : (
                        <path d="M8 5.5v13l11-6.5-11-6.5z" />
                      )}
                    </svg>
                  </button>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-semibold">{mix.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted">
                      <span>{mix.genre}</span>
                      <span className="h-3 w-px bg-stroke" />
                      <span>{formatDate(mix.date)}</span>
                      <span className="h-3 w-px bg-stroke" />
                      <span>{formatDuration(mix.duration)}</span>
                    </div>
                  </div>

                  {/* Waveform visualization */}
                  <div className="hidden sm:flex items-end gap-px h-12">
                    {Array.from({ length: 32 }).map((_, j) => {
                  const h = isActive
                    ? 20 + Math.random() * 30
                    : 10 + j * 0.8;
                      return (
                        <div
                          key={j}
                          className="w-1 rounded-full accent-gradient transition-all duration-150"
                          style={{
                            height: `${h}%`,
                            opacity: isActive ? 0.4 + Math.random() * 0.6 : 0.2,
                            animationDelay: `${j * 0.05}s`,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Progress bar */}
                {isActive && (
                  <div className="h-0.5 w-full bg-stroke">
                    <div
                      className="h-full accent-gradient transition-[width] duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
