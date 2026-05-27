import { useRef } from "react";
import { useInView, useAnimation } from "framer-motion";
import { gsap } from "gsap";

const roles = ["DJ", "Producer", "Sound Architect"] as const;

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  return (
    <section ref={ref} className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 md:items-center">
          {/* Photo placeholder with gradient ring */}
          <div className="relative flex justify-center">
            <div className="gradient-ring relative h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96 rounded-full bg-surface">
              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-pink/20 via-purple/10 to-blue/20 halftone mix-blend-overlay" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl">🎧</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-display font-bold leading-tight sm:text-4xl lg:text-5xl">
                Crafting soundscapes that move <span className="gradient-text">crowds</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 flex items-center gap-3"
            >
              <span className="h-px w-12 bg-gradient-to-r from-pink to-transparent" />
              <div className="flex gap-4">
                {roles.map((role, i) => (
                  <span
                    key={role}
                    className="text-muted transition-colors hover:text-text-primary/70"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 leading-relaxed text-muted"
            >
              With over a decade behind the decks, DJ Nish has been shaping the underground
              electronic music scene — from intimate warehouse parties to sunlit festival
              stages. Blending deep house grooves with melodic techno textures, each set is
              a journey through emotion, rhythm, and atmosphere.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 flex gap-8"
            >
              {[
                { label: "Years", value: "10+" },
                { label: "Sets", value: "500+" },
                { label: "Countries", value: "15+" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-2xl font-bold gradient-text">{value}</div>
                  <div className="text-sm text-muted">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
