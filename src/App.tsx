import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hls from "hls.js";
import { useEffect, useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const hlsSource =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const roles = ["Performer", "Producer", "Curator", "Storyteller"];

const projects = [
  {
    title: "Automotive Motion",
    category: "Live visuals",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1300&q=85",
    span: "md:col-span-7",
    ratio: "aspect-[1.18/1]",
  },
  {
    title: "Urban Architecture",
    category: "Venue direction",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1100&q=85",
    span: "md:col-span-5",
    ratio: "aspect-[0.88/1]",
  },
  {
    title: "Human Perspective",
    category: "Crowd energy",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1100&q=85",
    span: "md:col-span-5",
    ratio: "aspect-[0.88/1]",
  },
  {
    title: "Brand Identity",
    category: "Campaign system",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1300&q=85",
    span: "md:col-span-7",
    ratio: "aspect-[1.18/1]",
  },
];

const journal = [
  {
    title: "Building a set that can breathe between genres",
    date: "May 2026",
    read: "4 min",
    image:
      "https://images.unsplash.com/photo-1571266028243-d220c9c3b463?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Why lighting cues matter as much as the drop",
    date: "Apr 2026",
    read: "6 min",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Crate digging for a neon room at 1:17 AM",
    date: "Mar 2026",
    read: "3 min",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Designing identity systems for nightlife",
    date: "Feb 2026",
    read: "5 min",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80",
  },
];

const explorations = [
  {
    title: "Chrome pulse",
    image:
      "https://images.unsplash.com/photo-1614149162883-504ce4d13909?auto=format&fit=crop&w=800&q=85",
    rotation: "-rotate-3",
  },
  {
    title: "Afterhours color",
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=800&q=85",
    rotation: "rotate-2",
  },
  {
    title: "Stage language",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=85",
    rotation: "rotate-3",
  },
  {
    title: "Vinyl studies",
    image:
      "https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=800&q=85",
    rotation: "-rotate-2",
  },
  {
    title: "Motion sketch",
    image:
      "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=800&q=85",
    rotation: "-rotate-1",
  },
  {
    title: "Signal flare",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=85",
    rotation: "rotate-3",
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function HlsVideo({ className = "", flipped = false }: { className?: string; flipped?: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    let hls: Hls | null = null;
    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(hlsSource);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsSource;
    }

    const play = () => {
      void video.play().catch(() => undefined);
    };
    video.addEventListener("loadedmetadata", play);
    play();

    return () => {
      video.removeEventListener("loadedmetadata", play);
      hls?.destroy();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      autoPlay
      muted
      loop
      playsInline
      className={`absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover ${flipped ? "scale-y-[-1]" : ""} ${className}`}
    />
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = useMemo(() => ["Design", "Create", "Inspire"], []);

  useEffect(() => {
    document.body.classList.add("loading");
    const wordTimer = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % words.length);
    }, 900);

    const start = performance.now();
    let frame = 0;
    let completed = false;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / 2700, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextCount = Math.round(eased * 100);
      setCount(nextCount);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      if (!completed) {
        completed = true;
        window.setTimeout(() => {
          document.body.classList.remove("loading");
          onComplete();
        }, 400);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("loading");
      window.clearInterval(wordTimer);
      cancelAnimationFrame(frame);
    };
  }, [onComplete, words.length]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      <motion.p
        className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-muted md:left-10 md:top-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Portfolio
      </motion.p>

      <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={words[wordIndex]}
            className="font-display text-4xl italic text-text-primary/80 md:text-6xl lg:text-7xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {words[wordIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-6 font-display text-6xl tabular-nums text-text-primary md:bottom-12 md:right-10 md:text-8xl lg:text-9xl">
        {String(count).padStart(3, "0")}
      </div>

      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-stroke/50">
        <div
          className="accent-gradient h-full origin-left"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: "0 0 12px rgba(243, 6, 130, 0.25), 0 0 14px rgba(8, 189, 232, 0.25)",
          }}
        />
      </div>
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
      const sections = ["home", "work", "resume"];
      const current = [...sections].reverse().find((id: string) => {
        const section = document.getElementById(id);
        return section ? section.offsetTop - 140 <= window.scrollY : false;
      });
      if (current) {
        setActive(current);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    ["Home", "home"],
    ["Work", "work"],
    ["Resume", "resume"],
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <div
        className={`inline-flex max-w-[calc(100vw-2rem)] items-center rounded-full border border-white/10 bg-surface/90 px-2 py-2 shadow-black/10 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => scrollToId("home")}
          className="group logo-shell flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full transition-transform duration-300 hover:scale-110"
          aria-label="Go to home"
        >
          <img src="/nish-logo.png" alt="" className="h-full w-full rounded-full object-cover" />
        </button>
        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />
        <div className="flex items-center">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setActive(id);
                scrollToId(id);
              }}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                active === id ? "bg-stroke/50 text-text-primary" : "text-muted hover:bg-stroke/50 hover:text-text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />
        <button
          type="button"
          onClick={() => scrollToId("contact")}
          className="gradient-ring relative ml-1 rounded-full text-xs text-text-primary transition-transform duration-200 hover:scale-105 sm:text-sm"
        >
          <span className="relative block rounded-full bg-surface px-3 py-1.5 backdrop-blur-md sm:px-4 sm:py-2">
            Say hi <span aria-hidden="true">↗</span>
          </span>
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo(".name-reveal", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.1 })
        .fromTo(
          ".blur-in",
          { opacity: 0, filter: "blur(10px)", y: 20 },
          { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
          0.3,
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
      <HlsVideo />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-20 text-center">
        <div className="blur-in mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted">
          <span className="hidden h-px w-10 bg-gradient-to-r from-pink to-cyan sm:block" />
          <span>Collection '26</span>
          <span className="hidden h-px w-10 bg-gradient-to-r from-cyan to-pink sm:block" />
        </div>

        <div className="blur-in mb-5 w-[min(46vw,220px)] rounded-[8px] border border-white/10 bg-white p-2 shadow-2xl shadow-black/35">
          <img src="/nish-logo.png" alt="DJ Nish logo" className="w-full rounded-[6px]" />
        </div>

        <h1 className="name-reveal mb-4 font-display text-6xl italic leading-[0.9] tracking-normal text-text-primary md:text-7xl lg:text-8xl">
          DJ <span className="gradient-text">Nish</span>
        </h1>

        <p className="blur-in mb-4 text-base text-text-primary/90 md:text-xl">
          A{" "}
          <span key={roleIndex} className="inline-block animate-role-fade-in font-display text-2xl italic text-text-primary md:text-3xl">
            {roles[roleIndex]}
          </span>{" "}
          lives in Chicago.
        </p>

        <p className="blur-in mb-8 max-w-md text-sm leading-7 text-muted md:text-base">
          Designing seamless nights through sound, motion, and the small moments that make a room feel alive.
        </p>

        <div className="blur-in flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollToId("work")}
            className="gradient-ring relative rounded-full text-sm font-medium text-bg transition-transform duration-200 hover:scale-105 hover:text-text-primary"
          >
            <span className="relative block rounded-full bg-text-primary px-7 py-3.5 transition-colors duration-200 hover:bg-bg">
              See Works
            </span>
          </button>
          <a
            href="mailto:hello@djnish.com"
            className="gradient-ring relative rounded-full text-sm font-medium text-text-primary transition-transform duration-200 hover:scale-105"
          >
            <span className="relative block rounded-full border-2 border-stroke bg-bg px-7 py-3.5 transition-colors duration-200 hover:border-transparent">
              Reach out...
            </span>
          </a>
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-stroke">
          <span className="accent-gradient absolute left-0 top-0 h-1/2 w-px animate-scroll-down" />
        </span>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  italic,
  subtext,
  action,
}: {
  eyebrow: string;
  title: string;
  italic: string;
  subtext: string;
  action: string;
}) {
  return (
    <motion.div
      className="mb-10 flex flex-col justify-between gap-8 md:mb-14 md:flex-row md:items-end"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">{eyebrow}</span>
        </div>
        <h2 className="mb-4 text-4xl leading-none text-text-primary md:text-6xl">
          {title} <span className="font-display italic gradient-text">{italic}</span>
        </h2>
        <p className="max-w-md text-sm leading-7 text-muted md:text-base">{subtext}</p>
      </div>
      <button
        type="button"
        className="gradient-ring relative hidden rounded-full text-sm text-text-primary transition-transform duration-200 hover:scale-105 md:inline-flex"
      >
        <span className="relative rounded-full bg-bg px-6 py-3">
          {action} <span aria-hidden="true">↗</span>
        </span>
      </button>
    </motion.div>
  );
}

function SelectedWorks() {
  return (
    <section id="work" className="bg-bg pb-12 pt-8 md:pb-16 md:pt-10">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          title="Featured"
          italic="projects"
          subtext="A selection of stage systems, visual worlds, and brand moments shaped from concept to launch."
          action="View all work"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {projects.map((project) => (
            <motion.article
              key={project.title}
              className={`group relative overflow-hidden rounded-[8px] border border-stroke bg-surface ${project.span} ${project.ratio}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <img
                src={project.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="halftone absolute inset-0 opacity-20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                {project.category}
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-300 group-hover:opacity-100">
                <span className="gradient-ring relative rounded-full">
                  <span className="relative block rounded-full bg-white px-6 py-3 text-sm text-bg">
                    View - <span className="font-display italic">{project.title}</span>
                  </span>
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Journal"
          title="Recent"
          italic="thoughts"
          subtext="Notes on performance design, nightlife systems, and the craft behind memorable sets."
          action="View all"
        />
        <div className="space-y-4">
          {journal.map((entry) => (
            <motion.a
              key={entry.title}
              href="#contact"
              className="group flex items-center gap-4 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors duration-300 hover:bg-surface sm:rounded-full sm:pr-8 md:gap-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <img src={entry.image} alt="" className="h-20 w-20 shrink-0 rounded-full object-cover sm:h-24 sm:w-24" />
              <div className="min-w-0 flex-1">
                <h3 className="text-base text-text-primary transition-colors duration-200 group-hover:text-cyan md:text-xl">
                  {entry.title}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
                  {entry.date} / {entry.read}
                </p>
              </div>
              <span className="hidden text-xl text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-text-primary sm:block">
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Explorations() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<(typeof explorations)[number] | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) {
      return;
    }

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

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] overflow-hidden bg-bg">
      <div ref={contentRef} className="relative z-10 flex h-screen items-center justify-center px-6 text-center">
        <div className="max-w-xl">
          <div className="mb-5 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="h-px w-8 bg-stroke" />
            Explorations
            <span className="h-px w-8 bg-stroke" />
          </div>
          <h2 className="mb-5 text-5xl leading-none text-text-primary md:text-7xl">
            Visual <span className="font-display italic gradient-text">playground</span>
          </h2>
          <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-muted md:text-base">
            Experimental fragments for stage screens, social loops, and the chromatic language around the Nish identity.
          </p>
          <a href="#contact" className="gradient-ring relative inline-flex rounded-full text-sm text-text-primary">
            <span className="relative rounded-full bg-bg px-6 py-3">Dribbble studies</span>
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto grid max-w-[1400px] grid-cols-2 gap-12 px-6 py-[30vh] md:gap-40 md:px-12">
        <div ref={leftRef} className="flex flex-col items-start gap-[38vh]">
          {explorations.slice(0, 3).map((item) => (
            <button
              type="button"
              key={item.title}
              onClick={() => setSelected(item)}
              className={`pointer-events-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-[8px] border border-white/10 bg-surface shadow-2xl shadow-black/35 transition-transform duration-300 hover:scale-105 ${item.rotation}`}
            >
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
        <div ref={rightRef} className="mt-[45vh] flex flex-col items-end gap-[38vh]">
          {explorations.slice(3).map((item) => (
            <button
              type="button"
              key={item.title}
              onClick={() => setSelected(item)}
              className={`pointer-events-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-[8px] border border-white/10 bg-surface shadow-2xl shadow-black/35 transition-transform duration-300 hover:scale-105 ${item.rotation}`}
            >
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.button
            type="button"
            className="fixed inset-0 z-[80] flex cursor-zoom-out items-center justify-center bg-black/80 p-6 backdrop-blur-lg"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selected.image}
              alt={selected.title}
              className="max-h-[82vh] w-full max-w-4xl rounded-[8px] object-cover"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
            />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function Stats() {
  const stats = [
    ["20+", "Years Experience"],
    ["95+", "Projects Done"],
    ["200%", "Satisfied Clients"],
  ];

  return (
    <section id="resume" className="bg-bg py-16 md:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-px overflow-hidden rounded-[8px] border border-stroke bg-stroke px-0 md:grid-cols-3">
        {stats.map(([value, label]) => (
          <motion.div
            key={label}
            className="bg-bg p-8 text-center md:p-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true }}
          >
            <p className="font-display text-6xl italic gradient-text md:text-7xl">{value}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-muted">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!marqueeRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  const socials = ["Twitter", "LinkedIn", "Dribbble", "GitHub"];

  return (
    <footer id="contact" className="relative overflow-hidden bg-bg pb-8 pt-16 md:pb-12 md:pt-20">
      <HlsVideo flipped className="opacity-60" />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent" />

      <div className="relative z-10 mb-14 w-[200%] overflow-hidden whitespace-nowrap">
        <div ref={marqueeRef} className="flex w-max gap-8 font-display text-7xl italic text-white/10 md:text-9xl">
          {Array.from({ length: 10 }).map((_, index) => (
            <span key={index}>BUILDING THE FUTURE &bull;</span>
          ))}
          {Array.from({ length: 10 }).map((_, index) => (
            <span key={`clone-${index}`}>BUILDING THE FUTURE &bull;</span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center px-6 text-center md:px-10 lg:px-16">
        <img src="/nish-logo.png" alt="DJ Nish logo" className="mb-8 w-44 rounded-[8px] bg-white p-2" />
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">Now booking</p>
        <h2 className="mb-8 max-w-3xl text-5xl leading-none text-text-primary md:text-7xl">
          Make the next room feel <span className="font-display italic gradient-text">electric</span>.
        </h2>
        <a href="mailto:hello@djnish.com" className="gradient-ring relative rounded-full text-sm text-text-primary">
          <span className="relative block rounded-full bg-bg px-7 py-3.5">hello@djnish.com</span>
        </a>

        <div className="mt-16 flex w-full flex-col items-center justify-between gap-6 border-t border-stroke pt-8 text-xs uppercase tracking-[0.2em] text-muted md:flex-row">
          <div className="flex flex-wrap justify-center gap-5">
            {socials.map((social) => (
              <a key={social} href="#home" className="transition-colors duration-200 hover:text-text-primary">
                {social}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Available for projects
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>{isLoading ? <LoadingScreen onComplete={() => setIsLoading(false)} /> : null}</AnimatePresence>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Hero />
        <SelectedWorks />
        <Journal />
        <Explorations />
        <Stats />
        <Contact />
      </motion.main>
    </>
  );
}
