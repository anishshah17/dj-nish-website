import { useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

const genres = [
  { name: "House", color: "from-pink to-purple" },
  { name: "Hip-Hop", color: "from-purple to-blue" },
  { name: "Open Format", color: "from-blue to-cyan" },
  { name: "Bollywood", color: "from-cyan to-pink" },
  { name: "EDM", color: "from-pink to-blue" },
  { name: "Top 40", color: "from-purple to-cyan" },
];

export default function SignatureSound() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [vinylRotation, setVinylRotation] = useState(0);

  return (
    <section ref={ref} className="relative px-6 py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink to-blue font-display font-bold">
            Signature Sound
          </span>
          <h2 className="text-5xl md:text-6xl font-display font-black leading-tight mt-3">
            My Sonic Identity
          </h2>
          <p className="text-muted text-lg mt-4 max-w-2xl mx-auto">
            Explore the genres and sounds that define my DJ sets. Hover over the vinyl to discover.
          </p>
        </motion.div>

        {/* Vinyl Record + Genres */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Vinyl Record */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-80 h-80">
              {/* Spinning vinyl */}
              <motion.div
                className="absolute inset-0 rounded-full border-8 border-gray-800 bg-gradient-to-br from-black via-gray-900 to-black shadow-2xl"
                animate={{ rotate: vinylRotation }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 50%),
                    radial-gradient(circle, #000 0%, #1a1a1a 50%, #000 100%)
                  `,
                }}
              >
                {/* Vinyl grooves */}
                <div className="absolute inset-0 rounded-full opacity-30">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full border border-gray-700"
                      style={{ inset: `${i * 8}px` }}
                    />
                  ))}
                </div>

                {/* Center label with gradient */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className={`w-24 h-24 rounded-full bg-gradient-to-br ${genres[selectedGenre].color} flex items-center justify-center shadow-lg`}
                    animate={{ rotate: -vinylRotation }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                      <span className="text-xs font-bold text-white text-center">
                        {genres[selectedGenre].name}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Needle arm */}
              <div className="absolute -top-2 -right-8 w-24 h-2 bg-gray-600 rounded-full origin-left transform -rotate-12 shadow-lg">
                <div className="absolute right-0 w-3 h-3 bg-gray-400 rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Genre Selection */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {genres.map((genre, i) => (
              <motion.button
                key={genre.name}
                onClick={() => {
                  setSelectedGenre(i);
                  setVinylRotation(vinylRotation + 360);
                }}
                className={`w-full glass-sm p-6 rounded-2xl text-left transition-all ${
                  selectedGenre === i ? "ring-2 ring-pink bg-white/10" : "hover:bg-white/5"
                }`}
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${genre.color} shadow-lg`} />
                  <div>
                    <p className="font-bold text-lg">{genre.name}</p>
                    <p className="text-sm text-muted">Click to explore</p>
                  </div>
                  {selectedGenre === i && (
                    <motion.div
                      className="ml-auto"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <svg className="w-6 h-6 text-pink" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
