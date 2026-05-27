import { useRef } from "react";
import { useInView, motion } from "framer-motion";

const roles = ["DJ", "Producer", "Sound Architect"] as const;

const stats = [
  { value: "10+", label: "Years" },
  { value: "500+", label: "Sets" },
  { value: "15+", label: "Countries" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} id="about" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 md:items-center">
          {/* Photo / visual */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="gradient-ring relative h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96 rounded-full bg-surface overflow-hidden">
              <img
                src="/IMG-removebg-preview.png"
                alt="DJ Nish"
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-pink/20 via-purple/10 to-blue/20 halftone mix-blend-overlay pointer-events-none" />
              {/* Fallback icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl opacity-20">🎧</span>
              </div>
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 right-8 rounded-2xl border border-stroke bg-surface px-5 py-3 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-sm font-medium">Available to book</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Bio */}
          <div>
            <motion.h2
              className="text-3xl font-display font-bold leading-tight sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Crafting soundscapes that move <span className="gradient-text">crowds</span>
            </motion.h2>

            <motion.div
              className="mt-6 flex items-center gap-3"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="h-px w-12 bg-gradient-to-r from-pink to-transparent" />
              <div className="flex gap-4">
                {roles.map((role) => (
                  <span key={role} className="text-muted text-sm">{role}</span>
                ))}
              </div>
            </motion.div>

            <motion.p
              className="mt-6 leading-relaxed text-muted"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              With over a decade behind the decks, DJ Nish has been shaping the underground
              electronic music scene — from intimate warehouse parties to sunlit festival
              stages. Blending deep house grooves with melodic techno textures, each set is
              a journey through emotion, rhythm, and atmosphere.
            </motion.p>

            <motion.div
              className="mt-8 flex gap-8"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              {stats.map(({ label, value }) => (
                <div key={label}>
                  <div className="text-2xl font-bold gradient-text">{value}</div>
                  <div className="text-sm text-muted">{label}</div>
                </div>
              ))}
            </motion.div>

            <motion.button
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-8 accent-gradient rounded-full px-8 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(243,6,130,0.4)] hover:brightness-110 active:scale-95"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Set →
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
