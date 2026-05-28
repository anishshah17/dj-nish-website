import { useRef } from "react";
import { useInView, motion } from "framer-motion";

export default function Instagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} id="instagram" className="relative px-6 py-24 sm:py-32 bg-surface/30">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-pink to-transparent" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted font-mono">Follow</span>
            <span className="h-px w-12 bg-gradient-to-l from-pink to-transparent" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black leading-tight gradient-text mb-4">
            Behind the Scenes
          </h2>
          <p className="max-w-2xl text-muted text-sm md:text-base leading-relaxed">
            Get exclusive looks at studio sessions, live sets, and the energy behind every mix. Follow DJ Nish on Instagram for the latest updates.
          </p>
        </motion.div>

        {/* Instagram embed container */}
        <motion.div
          className="relative w-full rounded-[12px] overflow-hidden border border-stroke/50 bg-bg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Embed Instagram feed here - replace with your Instagram handle */}
          <div className="aspect-video md:aspect-auto flex items-center justify-center p-8 md:p-12 min-h-[500px]">
            <div className="text-center">
              <motion.div
                className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink to-blue"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                </svg>
              </motion.div>
              <h3 className="text-xl md:text-2xl font-display font-bold mb-2">@djnish</h3>
              <p className="text-muted text-sm md:text-base mb-6">
                Embed your Instagram feed here using an embed service like Elfsight, Instafeed.js, or Instagram's official embed.
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block accent-gradient rounded-full px-8 py-3 text-sm font-bold text-white uppercase tracking-wider transition-all hover:shadow-[0_0_24px_rgba(243,6,130,0.6)] hover:brightness-110"
              >
                Follow on Instagram →
              </a>
              <p className="text-xs text-muted mt-6 max-w-sm mx-auto">
                💡 Tip: To embed your real Instagram feed, use services like Elfsight, Instafeed.js, or add the Instagram embed code directly.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
