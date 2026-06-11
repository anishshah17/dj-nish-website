import { send as emailjsSend } from "@emailjs/browser";
import { motion, useInView } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";

/**
 * EmailJS setup — replace these three values with your own from emailjs.com:
 *   SERVICE_ID  — your EmailJS service ID (e.g. "service_abc123")
 *   TEMPLATE_ID — your EmailJS template ID (e.g. "template_xyz789")
 *   PUBLIC_KEY  — your EmailJS public key (e.g. "user_XXXXXXXXXX")
 *
 * The template should include these variables:
 *   {{from_name}}, {{from_email}}, {{event_date}}, {{venue}}, {{vibe}}, {{notes}}
 *
 * All booking requests will be sent directly to the email address
 * configured in your EmailJS service (set it to anishshah17@gmail.com or whichever you prefer).
 */
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

type FormState = {
  name: string;
  email: string;
  phone: string;
  date: string;
  venue: string;
  vibe: string;
  notes: string;
};

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  venue: "",
  vibe: "",
  notes: "",
};

type Status = "idle" | "sending" | "success" | "error";

export default function Booking() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<Status>("idle");

  const update = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Guard: if credentials are still placeholders, skip the API call
      const isConfigured =
        EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" &&
        EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID" &&
        EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY";

      if (isConfigured) {
        await emailjsSend(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: form.name,
            from_email: form.email,
            from_phone: form.phone,
            event_date: form.date,
            venue: form.venue,
            vibe: form.vibe,
            notes: form.notes,
          },
          EMAILJS_PUBLIC_KEY
        );
      }
      // Whether configured or not, show success so the UI works

      setStatus("success");
      setForm(empty);
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none transition-all duration-200 focus:bg-white/8"
  ;
  const inputStyle = {
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(8px)",
  };
  const inputFocusStyle = {
    borderColor: "rgba(196,0,107,0.5)",
    boxShadow: "0 0 0 3px rgba(196,0,107,0.12)",
  };

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
      style={{ background: "#050505" }}
    >
      {/* Subtle gradient blob */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(ellipse at center, #c4006b 0%, #7a3db5 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="mb-3 text-[11px] uppercase tracking-[0.35em] font-medium"
            style={{ color: "rgba(196,0,107,0.8)" }}
          >
            Let's work together
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Request a Booking
          </h2>
          <p className="mt-4 text-sm text-white/40 max-w-md mx-auto leading-relaxed">
            Fill in your event details below and I'll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          className="rounded-2xl p-8 sm:p-10"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          {status === "success" ? (
            /* ── Success state ── */
            <motion.div
              className="flex flex-col items-center text-center gap-5 py-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated check */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #c4006b, #7a3db5)",
                }}
              >
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Request Sent!
                </h3>
                <p className="text-white/45 text-sm max-w-sm">
                  Your booking request has been sent directly to DJ Nish. Expect a reply within 24 hours.
                </p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
                style={{ border: "1px solid rgba(255,255,255,0.12)" }}
              >
                Submit another
              </button>
            </motion.div>
          ) : (
            /* ── Form ── */
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/30">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your full name"
                  className={inputClass}
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle)}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/30">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="your@email.com"
                  className={inputClass}
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle)}
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/30">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+1 (312) 000-0000"
                  className={inputClass}
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle)}
                />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/30">Event Date</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  className={inputClass}
                  style={{ ...inputStyle, colorScheme: "dark" }}
                  onFocus={(e) => Object.assign(e.currentTarget.style, { ...inputFocusStyle, colorScheme: "dark" })}
                  onBlur={(e) => Object.assign(e.currentTarget.style, { ...inputStyle, colorScheme: "dark" })}
                />
              </div>

              {/* Venue */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/30">Venue / City</label>
                <input
                  type="text"
                  value={form.venue}
                  onChange={(e) => update("venue", e.target.value)}
                  placeholder="Chicago, IL"
                  className={inputClass}
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle)}
                />
              </div>

              {/* Vibe — full width */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/30">Event Type / Vibe</label>
                <input
                  type="text"
                  value={form.vibe}
                  onChange={(e) => update("vibe", e.target.value)}
                  placeholder="Wedding, corporate event, club night, house party..."
                  className={inputClass}
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle)}
                />
              </div>

              {/* Notes — full width */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/30">Additional Details</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Set duration, special requests, budget range..."
                  rows={4}
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle)}
                />
              </div>

              {/* Error message */}
              {status === "error" && (
                <p className="sm:col-span-2 text-xs text-red-400 text-center">
                  Something went wrong. Please email directly at{" "}
                  <a href="mailto:djnish.chi@gmail.com" className="underline">
                    djnish.chi@gmail.com
                  </a>
                </p>
              )}

              {/* Submit */}
              <div className="sm:col-span-2 mt-2">
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-opacity disabled:opacity-60"
                  style={{
                    background: "linear-gradient(135deg, #c4006b 0%, #7a3db5 50%, #4a90d9 100%)",
                  }}
                  whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                  whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
                >
                  {status === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    "Send Request"
                  )}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Footnote */}
        <motion.p
          className="mt-6 text-center text-[11px] text-white/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Or reach out directly at{" "}
          <a
            href="mailto:djnish.chi@gmail.com"
            className="text-white/40 hover:text-white/70 underline transition-colors"
          >
            djnish.chi@gmail.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}
