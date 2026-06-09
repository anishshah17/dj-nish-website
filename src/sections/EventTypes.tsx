import { useRef } from "react";
import { useInView, motion } from "framer-motion";

const eventTypes = [
  {
    title: "Weddings",
    description: "Elegant celebrations with seamless transitions and crowd-reading expertise.",
    icon: "💍",
    gradient: "from-pink to-purple",
  },
  {
    title: "Corporate Events",
    description: "Professional atmosphere with curated playlists for networking and celebrations.",
    icon: "🎤",
    gradient: "from-purple to-blue",
  },
  {
    title: "Private Parties",
    description: "High-energy sets tailored to your vibe and guest preferences.",
    icon: "🎉",
    gradient: "from-blue to-cyan",
  },
  {
    title: "Clubs & Venues",
    description: "Peak-time energy with technical mixing and crowd engagement.",
    icon: "🎧",
    gradient: "from-cyan to-pink",
  },
];

export default function EventTypes() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative px-6 py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink to-blue font-display font-bold">
            Event Types
          </span>
          <h2 className="text-5xl md:text-6xl font-display font-black leading-tight mt-3">
            Perfect for Every Occasion
          </h2>
          <p className="text-muted text-lg mt-4 max-w-2xl mx-auto">
            From intimate gatherings to high-energy venues, I bring the perfect energy to your event.
          </p>
        </motion.div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventTypes.map((event, i) => (
            <motion.div
              key={event.title}
              className="group glass-sm p-8 rounded-3xl cursor-pointer transition-all hover:bg-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Icon */}
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${event.gradient} flex items-center justify-center text-3xl mb-4 shadow-lg`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                {event.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-display font-bold mb-3">{event.title}</h3>

              {/* Description */}
              <p className="text-muted text-sm leading-relaxed mb-6">{event.description}</p>

              {/* CTA */}
              <motion.button
                className="text-pink font-bold text-sm uppercase tracking-widest flex items-center gap-2 group/btn"
                whileHover={{ x: 5 }}
              >
                Learn More
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
