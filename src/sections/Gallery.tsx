import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galleryItems } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<(typeof galleryItems)[number] | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: content,
        pinSpacing: false,
      });

      gsap.to(leftRef.current, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(rightRef.current, {
        yPercent: -34,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const left = galleryItems.slice(0, 3);
  const right = galleryItems.slice(3);

  return (
    <section ref={sectionRef} id="gallery" className="relative min-h-[300vh] overflow-hidden bg-bg">
      {/* Pinned center text */}
      <div ref={contentRef} className="relative z-10 flex h-screen items-center justify-center px-6 text-center">
        <div className="max-w-xl">
          <div className="mb-5 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="h-px w-8 bg-stroke" />
            Gallery
            <span className="h-px w-8 bg-stroke" />
          </div>
          <h2 className="mb-5 text-5xl leading-none text-text-primary md:text-7xl">
            Behind the <span className="font-display italic gradient-text">decks</span>
          </h2>
          <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-muted md:text-base">
            Moments captured across stages, clubs, and festivals. Click any photo to expand.
          </p>
          <button
            onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            className="gradient-ring relative inline-flex rounded-full text-sm text-text-primary"
          >
            <span className="relative rounded-full bg-bg px-6 py-3">Book a Set</span>
          </button>
        </div>
      </div>

      {/* Parallax photo columns */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto grid max-w-[1400px] grid-cols-2 gap-12 px-6 py-[30vh] md:gap-40 md:px-12">
        <div ref={leftRef} className="flex flex-col items-start gap-[38vh]">
          {left.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setSelected(item)}
              className={`pointer-events-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-[8px] border border-white/10 bg-surface shadow-2xl shadow-black/35 transition-transform duration-300 hover:scale-105 ${item.rotation}`}
            >
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
        <div ref={rightRef} className="mt-[45vh] flex flex-col items-end gap-[38vh]">
          {right.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setSelected(item)}
              className={`pointer-events-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-[8px] border border-white/10 bg-surface shadow-2xl shadow-black/35 transition-transform duration-300 hover:scale-105 ${item.rotation}`}
            >
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.button
            type="button"
            className="fixed inset-0 z-[80] flex cursor-zoom-out items-center justify-center bg-black/85 p-6 backdrop-blur-lg"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.image}
                alt={selected.title}
                className="max-h-[82vh] w-full rounded-[8px] object-cover"
              />
              <p className="mt-3 text-center text-sm text-muted">{selected.title}</p>
              <button
                className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center rounded-full bg-surface border border-stroke text-muted hover:text-text-primary transition-colors"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
