import { useRef, useEffect } from "react";
import { useInView, motion } from "framer-motion";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Reveal photo when in view
  useEffect(() => {
    if (!photoRef.current || !isInView) return;

    photoRef.current.style.clipPath = "inset(0% 0 0% 0)";
  }, [isInView]);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden px-6 py-24 sm:py-32 bg-off-black">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left: Photo with reveal */}
          <motion.div
            ref={photoRef}
            className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden"
            style={{
              clipPath: "inset(100% 0 0 0)",
              transition: "clipPath 1.2s ease",
            }}
          >
            <img
              src="/IMG-removebg-preview.png"
              alt="DJ Nish"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-off-black via-transparent to-transparent opacity-30" />
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xs uppercase tracking-[0.32em] text-muted font-semibold mb-4">
              ─ About DJ Nish
            </p>

            <h2 className="display-heading text-4xl sm:text-5xl font-bold mb-6 text-white">
              Music that moves crowds
            </h2>

            <p className="text-muted leading-relaxed mb-6 text-base sm:text-lg max-w-xl">
              DJ Nish blends technical skill, crowd reading, and seamless mixing to create unforgettable experiences at weddings, corporate events, private celebrations, and live venues.
            </p>

            <p className="text-muted leading-relaxed text-base max-w-xl">
              With over 5 years of experience, I specialize in reading the room and crafting sets that evolve with the energy. Whether it's a wedding reception, corporate gala, or intimate house party, every mix is tailored to create the perfect atmosphere.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
