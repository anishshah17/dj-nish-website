import { useRef, useEffect, useState } from "react";
import { useInView, motion } from "framer-motion";

const stats = [
  { value: "5+", label: "Years Experience", icon: "✦" },
  { value: "200+", label: "Events Performed", icon: "◈" },
  { value: "100%", label: "Client Satisfaction", icon: "◉" },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function StatCard({ stat, index, active }: { stat: typeof stats[0]; index: number; active: boolean }) {
  const numericTarget = parseInt(stat.value.replace(/\D/g, ""), 10);
  const suffix = stat.value.replace(/[0-9]/g, "");
  const count = useCountUp(numericTarget, 1200, active);

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center gap-2 rounded-2xl px-6 py-7 text-center overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.55 + index * 0.1 }}
      whileHover={{
        background: "rgba(255,255,255,0.07)",
        borderColor: "rgba(196,0,107,0.25)",
        y: -4,
        transition: { duration: 0.25 },
      }}
    >
      {/* Glow spot */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(196,0,107,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Icon */}
      <span
        className="text-base"
        style={{
          background: "linear-gradient(135deg, #c4006b, #7a3db5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {stat.icon}
      </span>

      {/* Number */}
      <span
        className="text-3xl font-bold text-white leading-none"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {count}{suffix}
      </span>

      {/* Label */}
      <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-medium">
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!photoRef.current || !isInView) return;
    photoRef.current.style.clipPath = "inset(0% 0 0% 0)";
  }, [isInView]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
      style={{ background: "#050505" }}
    >
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(ellipse at center, #7a3db5 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 items-start">

          {/* Left: Photo */}
          <motion.div
            ref={photoRef}
            className="relative h-[500px] md:h-[620px] rounded-3xl overflow-hidden"
            style={{
              clipPath: "inset(100% 0 0 0)",
              transition: "clip-path 1.3s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <img
              src="/IMG-removebg-preview.png"
              alt="DJ Nish"
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(5,5,5,0.6) 0%, rgba(5,5,5,0.1) 50%, transparent 100%)",
              }}
            />
          </motion.div>

          {/* Right: Bio + Stats */}
          <div className="flex flex-col gap-8 lg:pt-4">
            {/* Kicker */}
            <motion.p
              className="text-[11px] uppercase tracking-[0.35em] font-medium"
              style={{ color: "rgba(196,0,107,0.8)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              About DJ Nish
            </motion.p>

            {/* Heading */}
            <motion.h2
              className="text-4xl sm:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18 }}
            >
              Music that moves crowds
            </motion.h2>

            {/* Body copy */}
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28 }}
            >
              <p className="text-white/45 leading-relaxed text-base max-w-xl">
                DJ Nish blends technical skill, crowd reading, and seamless mixing to create unforgettable experiences at weddings, corporate events, private celebrations, and live venues.
              </p>
              <p className="text-white/35 leading-relaxed text-sm max-w-xl">
                With over 5 years of experience, I specialise in reading the room and crafting sets that evolve with the energy. Whether it's a wedding reception, corporate gala, or intimate house party, every mix is tailored to create the perfect atmosphere.
              </p>
            </motion.div>

            {/* ── Liquid glass stat boxes ── */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} active={isInView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
