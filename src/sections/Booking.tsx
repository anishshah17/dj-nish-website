import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

type Inquiry = {
  name: string;
  email: string;
  date: string;
  venue: string;
  vibe: string;
  notes: string;
};

const storageKey = "djnish-inquiry";

const emptyInquiry: Inquiry = {
  name: "",
  email: "",
  date: "",
  venue: "",
  vibe: "",
  notes: "",
};

export default function Booking() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [form, setForm] = useState<Inquiry>(emptyInquiry);
  const [submitted, setSubmitted] = useState<Inquiry | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return;

    const parsed = JSON.parse(raw) as { inquiry?: Inquiry; savedAt?: string };
    if (parsed.inquiry) setSubmitted(parsed.inquiry);
    if (parsed.savedAt) setSavedAt(parsed.savedAt);
  }, []);

  const preview = useMemo(() => submitted ?? form, [submitted, form]);

  const update = (key: keyof Inquiry, value: string) => {
    setSubmitted(null);
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      inquiry: form,
      savedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(storageKey, JSON.stringify(payload));
    setSubmitted(form);
    setSavedAt(payload.savedAt);
  };

  return (
    <section ref={ref} id="booking" className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left: Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-kicker">Booking</span>
          <h2 className="display-heading mt-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Request a booking
          </h2>
          <p className="section-copy mt-5 text-base sm:text-lg leading-relaxed">
            Share your event details below. I’ll get back to you shortly.
          </p>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          className="bg-surface/50 border border-stroke/40 p-6 sm:p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {submitted ? (
            <div className="text-center text-muted">
              <p className="text-2xl font-bold mb-4">Booking request received!</p>
              <p className="mb-6">
                Thanks {form.name}. I’ve saved your details and will be in touch.
              </p>
              <button
                onClick={() => {
                  setForm(emptyInquiry);
                  setSubmitted(null);
                  setSavedAt(null);
                  window.localStorage.removeItem(storageKey);
                }}
                className="ghost-button px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em]"
              >
                Submit another
              </button>
            </div>
          ) : (
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-stroke/40 bg-bg/60 px-4 py-3 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-pink/40 transition-all"
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="Email address"
                className="w-full rounded-lg border border-stroke/40 bg-bg/60 px-4 py-3 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-pink/40 transition-all"
              />
              <input
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className="w-full rounded-lg border border-stroke/40 bg-bg/60 px-4 py-3 text-sm text-text focus:outline-none focus:ring-2 focus:ring-brand-pink/40 transition-all"
              />
              <input
                type="text"
                value={form.venue}
                onChange={(e) => update("venue", e.target.value)}
                placeholder="Venue or city"
                className="w-full rounded-lg border border-stroke/40 bg-bg/60 px-4 py-3 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-pink/40 transition-all"
              />
              <input
                type="text"
                value={form.vibe}
                onChange={(e) => update("vibe", e.target.value)}
                placeholder="Preferred genre / vibe"
                className="w-full rounded-lg border border-stroke/40 bg-bg/60 px-4 py-3 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-pink/40 transition-all"
              />
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Additional details (date, time, special requests)..."
                className="min-h-32 w-full rounded-lg border border-stroke/40 bg-bg/60 px-4 py-3 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-pink/40 transition-all resize-none"
              />

              <div className="mt-4">
                <button type="submit" className="accent-button w-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em]">
                  Send Request
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
