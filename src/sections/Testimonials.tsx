import { useRef } from "react";
import { useInView, motion } from "framer-motion";

const testimonials = [
  {
    quote: "DJ Nish brought incredible energy to our wedding. The seamless transitions and perfect song selection kept everyone dancing all night.",
    author: "Sarah & Mike",
    role: "Wedding Clients",
    avatar: "👰",
  },
  {
    quote: "Professional, reliable, and incredibly talented. DJ Nish understood our corporate event vibe perfectly and delivered an unforgettable experience.",
    author: "James Chen",
    role: "Corporate Event Planner",
    avatar: "💼",
  },
  {
    quote: "The energy, the mixing, the crowd reading—everything was perfect. DJ Nish is a true master of the craft.",
    author: "Alex Rivera",
    role: "Venue Manager",
    avatar: "🎵",
  },
  {
    quote: "Booking DJ Nish was the best decision for our private party. The vibe was immaculate from start to finish.",
    author: "Jordan Lee",
    role: "Party Host",
    avatar: "🎉",
  },
];

export default function Testimonials() {
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
            Testimonials
          </span>
          <h2 className="text-5xl md:text-6xl font-display font-black leading-tight mt-3">
            What People Say
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className="glass-sm p-8 rounded-3xl"
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} className="w-5 h-5 text-pink" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg font-light leading-relaxed mb-6 italic">"{testimonial.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink to-blue flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-muted">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
