import { useRef } from "react";
import { useInView, motion } from "framer-motion";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    { value: "10+", label: "Years" },
    { value: "500+", label: "Sets" },
    { value: "15+", label: "Countries" },
  ];

  return (
    <section ref={ref} className="relative px-6 py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square">
              {/* Floating blob background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink/30 to-blue/30 rounded-full blur-3xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Image container */}
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/IMG-removebg-preview.png"
                  alt="DJ Nish"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating accent */}
              <motion.div
                className="absolute -bottom-6 -right-6 w-24 h-24 glass rounded-full flex items-center justify-center text-3xl"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🎧
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink to-blue font-display font-bold">
                About Me
              </span>
              <h2 className="text-5xl md:text-6xl font-display font-black leading-tight mt-3 mb-6">
                Crafting Soundscapes That Move Crowds
              </h2>
            </div>

            <p className="text-lg text-muted leading-relaxed mb-8">
              With over a decade behind the decks, DJ Nish has been shaping the underground electronic music scene — from intimate warehouse parties to sunlit festival stages. Blending deep house grooves with melodic techno textures, each set is a journey through emotion, rhythm, and atmosphere.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="glass-sm p-4 text-center rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                >
                  <p className="text-3xl md:text-4xl font-display font-black gradient-text">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-muted mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              className="accent-gradient rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:shadow-[0_0_40px_rgba(243,6,130,0.6)]"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Book a Set →
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
