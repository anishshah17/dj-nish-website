import { useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function Booking() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1000);
  };

  return (
    <section ref={ref} id="booking" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <h2
          className={`text-3xl font-display font-bold leading-tight text-center transition-all duration-700 sm:text-4xl lg:text-5xl ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Book <span className="gradient-text">DJ Nish</span>
        </h2>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 rounded-2xl border border-green/30 bg-surface/50 p-12 text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green/20">
              <svg className="h-8 w-8 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Request Sent!</h3>
            <p className="mt-2 text-muted">I'll get back to you within 24 hours.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="mt-12 space-y-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-stroke bg-surface px-4 py-3 text-text-primary outline-none transition-colors focus:border-pink"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  required
                  className="w-full rounded-xl border border-stroke bg-surface px-4 py-3 text-text-primary outline-none transition-colors focus:border-pink"
                  placeholder="you@email.com"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Event Type</label>
              <select
                className="w-full rounded-xl border border-stroke bg-surface px-4 py-3 text-text-primary outline-none transition-colors focus:border-pink"
              >
                <option>Private Party</option>
                <option>Club Night</option>
                <option>Festival</option>
                <option>Corporate Event</option>
                <option>Wedding</option>
                <option>Other</option>
              </select>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Date</label>
                <input
                  type="date"
                  className="w-full rounded-xl border border-stroke bg-surface px-4 py-3 text-text-primary outline-none transition-colors focus:border-pink"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Location</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-stroke bg-surface px-4 py-3 text-text-primary outline-none transition-colors focus:border-pink"
                  placeholder="City, Venue"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Message</label>
              <textarea
                rows={4}
                className="w-full rounded-xl border border-stroke bg-surface px-4 py-3 text-text-primary outline-none transition-colors focus:border-pink"
                placeholder="Tell me about your event..."
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full accent-gradient rounded-xl py-4 text-sm font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(243,6,130,0.4)] active:scale-[0.98] disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Sending..." : "Send Request"}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
