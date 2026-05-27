import { useRef, useEffect, useState } from "react";
import { useInView, AnimatePresence, motion } from "framer-motion";
import { records, genreColor, genreColors } from "../data";

interface RecordsProps {
  onNavigate: (id: string) => void;
}

export default function Records({ onNavigate }: RecordsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [spinning, setSpinning] = useState(false);

  // Vinyl spinning when clicked
  const toggleSpin = () => setSpinning((s) => !s);

  return (
    <section ref={ref} id="records" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <h2
          className={`text-3xl font-display font-bold leading-tight transition-all duration-700 sm:text-4xl lg:text-5xl ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Vinyl <span className="gradient-text">Collection</span>
        </h2>

        <div className="mt-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {records.map((record, i) => {
              const delay = isInView ? i * 0.1 : 0;
              return (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{ duration: 0.5, delay }}
                  className="group cursor-pointer"
                  onClick={() => onNavigate("record-" + record.id)}
                >
                  <div className="relative mx-auto aspect-square w-48">
                    {/* Vinyl record */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={spinning ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 3, repeat: spinning ? Infinity : 0, ease: "linear" }}
                    >
                      {/* Record base */}
                      <div className="absolute inset-3 rounded-full bg-black" />
                      {/* Groove rings */}
                      {Array.from({ length: 6 }).map((_, j) => (
                        <div
                          key={j}
                          className="absolute inset-0 rounded-full border border-white/5"
                          style={{
                            inset: `${(j + 1) * 14}%`,
                          }}
                        />
                      ))}
                      {/* Center label */}
                      <div
                        className="absolute left-1/2 top-1/2 h-1/5 w-1/5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                          background: genreColor(record.genre),
                        }}
                      >
                        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Album info */}
                  <div className="mt-4 text-center">
                    <h3 className="font-semibold">{record.title}</h3>
                    <p className="text-sm text-muted">{record.genre} · {record.year}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Click hint */}
          <p className="mt-8 text-center text-sm text-muted">
            Click a record to play · {spinning ? "Click to pause" : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
