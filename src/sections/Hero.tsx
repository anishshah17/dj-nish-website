import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { gsap } from "gsap";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const controls = useAnimation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setLoaded(true),
      });
      tl.fromTo(
        "#hero-name .char",
        { opacity: 0, y: 80, rotateX: -40 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.08, ease: "back.out(1.4)" },
      )
        .fromTo(
          "#hero-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          "#hero-cta-group",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2",
        );
    }, ref);

    return () => ctx.revert();
  }, [isInView]);

  const name = "DJ NISH";
  const chars = name.split("");

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 left-1/4 h-[28rem] w-[28rem] rounded-full opacity-30 blur-[120px]"
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 60, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ background: "linear-gradient(135deg, #f30682, #b72cdb)" }}
        />
        <motion.div
          className="absolute -bottom-32 right-1/4 h-[28rem] w-[28rem] rounded-full opacity-20 blur-[120px]"
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 50, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
          style={{ background: "linear-gradient(135deg, #445df3, #08bde8)" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        {/* Name with character animation */}
        <div id="hero-name" className="flex flex-wrap justify-center gap-[0.15em] sm:gap-[0.2em]">
          {chars.map((ch, i) =>
            ch === " " ? (
              <motion.span
                key={i}
                className="inline-block w-[0.5em] sm:w-[0.6em]"
              />
            ) : (
              <motion.span
                key={i}
                className="char text-7xl font-display font-bold leading-none tracking-tight md:text-9xl lg:text-[11rem]"
                style={{
                  background: "linear-gradient(90deg, #f30682 0%, #b72cdb 36%, #445df3 67%, #08bde8 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              />
            ),
          )}
        </div>

        {/* Subtitle */}
        <motion.div
          id="hero-subtitle"
          className="max-w-md text-lg text-muted sm:text-xl"
        >
          DJ / Producer / Sound Architect
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          id="hero-cta-group"
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.button
            className="accent-gradient rounded-full px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:shadow-[0_0_30px_rgba(243,6,130,0.4)] hover:brightness-110 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document.getElementById("music")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Listen to My Mixes
          </motion.button>
          <motion.a
            href="#booking"
            className="rounded-full border border-stroke px-8 py-3 text-sm font-semibold text-text-primary transition-all duration-200 hover:border-pink hover:text-pink active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Set
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator mt-12 flex flex-col items-center gap-2 text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-xs">Scroll</span>
          <motion.div
            className="h-10 w-px bg-gradient-to-b from-muted to-transparent"
            animate={{ scaleY: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
