import { useRef, useState } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import { bookingPackages } from "../data";

type Step = "package" | "details" | "deposit" | "confirm";

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  location: string;
  hours: string;
  message: string;
  packageId: string;
}

const EVENT_TYPES = ["Private Party", "Club Night", "Festival", "Corporate Event", "Wedding", "Birthday", "Other"];

const STEPS: { id: Step; label: string }[] = [
  { id: "package", label: "Package" },
  { id: "details", label: "Details" },
  { id: "deposit", label: "Deposit" },
  { id: "confirm", label: "Confirm" },
];

export default function Booking() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [step, setStep] = useState<Step>("package");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    eventType: EVENT_TYPES[0],
    date: "",
    location: "",
    hours: "",
    message: "",
    packageId: "premium",
  });

  const selectedPkg = bookingPackages.find((p) => p.id === form.packageId) ?? bookingPackages[1];
  const stepIndex = STEPS.findIndex((s) => s.id === step);

  const update = (field: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const next = () => {
    const order: Step[] = ["package", "details", "deposit", "confirm"];
    const i = order.indexOf(step);
    if (i < order.length - 1) setStep(order[i + 1]);
  };

  const back = () => {
    const order: Step[] = ["package", "details", "deposit", "confirm"];
    const i = order.indexOf(step);
    if (i > 0) setStep(order[i - 1]);
  };

  const handleFinalSubmit = () => {
    setSubmitted(true);
  };

  return (
    <section ref={ref} id="booking" className="relative px-6 py-24 sm:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[140px]" style={{ background: "linear-gradient(135deg, #f30682, #445df3)" }} />
      </div>

      <div className="relative mx-auto max-w-3xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="h-px w-8 bg-stroke" />
            Bookings
            <span className="h-px w-8 bg-stroke" />
          </div>
          <h2 className="text-3xl font-display font-bold leading-tight sm:text-4xl lg:text-5xl">
            Book <span className="gradient-text">DJ Nish</span>
          </h2>
          <p className="mt-4 text-muted">
            A 50% deposit secures your date. The remaining balance is due on the day of the event.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-emerald-500/30 bg-surface/50 p-12 text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
              <svg className="h-10 w-10 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold">Booking Request Sent!</h3>
            <p className="mt-3 text-muted">
              Thanks, <strong>{form.name}</strong>! Your request for the <strong>{selectedPkg.name}</strong> package has been received.
              A deposit invoice of <strong>${selectedPkg.deposit}</strong> will be sent to <strong>{form.email}</strong> within 24 hours.
            </p>
            <button
              onClick={() => { setSubmitted(false); setStep("package"); setForm({ name: "", email: "", phone: "", eventType: EVENT_TYPES[0], date: "", location: "", hours: "", message: "", packageId: "premium" }); }}
              className="mt-8 rounded-full border border-stroke px-8 py-3 text-sm font-medium text-muted hover:text-text-primary transition-colors"
            >
              Submit another request
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Step indicator */}
            <div className="mb-10 flex items-center justify-center gap-0">
              {STEPS.map((s, i) => (
                <div key={s.id} className="flex items-center">
                  <button
                    onClick={() => i < stepIndex && setStep(s.id)}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                      s.id === step
                        ? "accent-gradient text-white shadow-[0_0_20px_rgba(243,6,130,0.4)]"
                        : i < stepIndex
                        ? "bg-emerald-500/20 text-emerald-400 cursor-pointer"
                        : "bg-surface text-muted cursor-default"
                    }`}
                  >
                    {i < stepIndex ? (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </button>
                  <span className={`ml-2 mr-4 text-xs hidden sm:block ${s.id === step ? "text-text-primary" : "text-muted"}`}>{s.label}</span>
                  {i < STEPS.length - 1 && (
                    <div className={`h-px w-8 sm:w-12 mr-4 ${i < stepIndex ? "bg-emerald-500/40" : "bg-stroke"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {/* ── Step 1: Package selection ── */}
                {step === "package" && (
                  <div>
                    <h3 className="mb-6 text-lg font-semibold">Choose your package</h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {bookingPackages.map((pkg) => (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => update("packageId", pkg.id)}
                          className={`relative rounded-2xl border p-6 text-left transition-all duration-200 ${
                            form.packageId === pkg.id
                              ? "border-pink/60 bg-surface shadow-[0_0_30px_rgba(243,6,130,0.15)]"
                              : "border-stroke bg-surface/50 hover:border-stroke/80"
                          }`}
                        >
                          {pkg.popular && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 accent-gradient rounded-full px-4 py-1 text-xs font-bold text-white">
                              Most Popular
                            </span>
                          )}
                          <div className="mb-3 flex items-center justify-between">
                            <span className="font-display text-xl font-bold">{pkg.name}</span>
                            {form.packageId === pkg.id && (
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink text-white">
                                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <path d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                            )}
                          </div>
                          <div className="mb-1 text-3xl font-bold gradient-text">${pkg.price.toLocaleString()}</div>
                          <div className="mb-4 text-sm text-muted">{pkg.hours}h set · ${pkg.deposit} deposit</div>
                          <ul className="space-y-1.5">
                            {pkg.features.map((f) => (
                              <li key={f} className="flex items-start gap-2 text-sm text-muted">
                                <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-pink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <path d="M5 13l4 4L19 7" />
                                </svg>
                                {f}
                              </li>
                            ))}
                          </ul>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 rounded-xl border border-stroke/50 bg-surface/30 p-4 text-sm text-muted">
                      Need something custom? <a href="mailto:booking@djnish.com" className="text-pink hover:underline">Email us</a> for a tailored quote.
                    </div>
                  </div>
                )}

                {/* ── Step 2: Event details ── */}
                {step === "details" && (
                  <div>
                    <h3 className="mb-6 text-lg font-semibold">Tell me about your event</h3>
                    <div className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium">Your Name *</label>
                          <input type="text" required value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full rounded-xl border border-stroke bg-surface px-4 py-3 text-text-primary outline-none transition-colors focus:border-pink placeholder:text-muted/50" placeholder="Full name" />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium">Email *</label>
                          <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full rounded-xl border border-stroke bg-surface px-4 py-3 text-text-primary outline-none transition-colors focus:border-pink placeholder:text-muted/50" placeholder="you@email.com" />
                        </div>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium">Phone</label>
                          <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full rounded-xl border border-stroke bg-surface px-4 py-3 text-text-primary outline-none transition-colors focus:border-pink placeholder:text-muted/50" placeholder="+1 (555) 000-0000" />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium">Event Type *</label>
                          <select value={form.eventType} onChange={(e) => update("eventType", e.target.value)} className="w-full rounded-xl border border-stroke bg-surface px-4 py-3 text-text-primary outline-none transition-colors focus:border-pink">
                            {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium">Event Date *</label>
                          <input type="date" required value={form.date} onChange={(e) => update("date", e.target.value)} className="w-full rounded-xl border border-stroke bg-surface px-4 py-3 text-text-primary outline-none transition-colors focus:border-pink" />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium">Venue / Location *</label>
                          <input type="text" required value={form.location} onChange={(e) => update("location", e.target.value)} className="w-full rounded-xl border border-stroke bg-surface px-4 py-3 text-text-primary outline-none transition-colors focus:border-pink placeholder:text-muted/50" placeholder="City, Venue name" />
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">Additional Notes</label>
                        <textarea rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} className="w-full rounded-xl border border-stroke bg-surface px-4 py-3 text-text-primary outline-none transition-colors focus:border-pink placeholder:text-muted/50 resize-none" placeholder="Music preferences, special requests, vibe you're going for..." />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Step 3: Deposit overview ── */}
                {step === "deposit" && (
                  <div>
                    <h3 className="mb-6 text-lg font-semibold">Deposit & Payment</h3>
                    <div className="rounded-2xl border border-stroke bg-surface/50 p-6">
                      <div className="mb-6 flex items-center justify-between border-b border-stroke pb-6">
                        <div>
                          <p className="text-sm text-muted">Selected package</p>
                          <p className="text-xl font-bold">{selectedPkg.name}</p>
                          <p className="text-sm text-muted">{selectedPkg.hours}-hour set</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold gradient-text">${selectedPkg.price.toLocaleString()}</p>
                          <p className="text-sm text-muted">total</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-xl bg-bg/60 px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink/20">
                              <svg className="h-5 w-5 text-pink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-semibold">Deposit (due now)</p>
                              <p className="text-xs text-muted">50% to secure your date</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold text-pink">${selectedPkg.deposit.toLocaleString()}</p>
                        </div>

                        <div className="flex items-center justify-between rounded-xl bg-bg/60 px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface">
                              <svg className="h-5 w-5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-semibold text-muted">Remaining balance</p>
                              <p className="text-xs text-muted">Due on event day</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold text-muted">${(selectedPkg.price - selectedPkg.deposit).toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="mt-6 rounded-xl border border-stroke/50 bg-bg/40 p-4 text-sm text-muted">
                        <strong className="text-text-primary">How it works:</strong> After submitting your request, you'll receive a deposit invoice via email within 24 hours. Once the deposit is paid, your date is officially locked in. The remaining balance is collected on the day of the event.
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-stroke/50 bg-surface/30 p-4">
                      <p className="text-sm font-medium mb-2">Accepted payment methods</p>
                      <div className="flex flex-wrap gap-2">
                        {["Venmo", "Zelle", "Cash App", "PayPal", "Bank Transfer"].map((m) => (
                          <span key={m} className="rounded-full border border-stroke px-3 py-1 text-xs text-muted">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Step 4: Confirm ── */}
                {step === "confirm" && (
                  <div>
                    <h3 className="mb-6 text-lg font-semibold">Review & Confirm</h3>
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-stroke bg-surface/50 p-6">
                        <p className="mb-4 text-xs uppercase tracking-widest text-muted">Package</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-lg">{selectedPkg.name}</p>
                            <p className="text-sm text-muted">{selectedPkg.hours}-hour set</p>
                          </div>
                          <p className="text-2xl font-bold gradient-text">${selectedPkg.price.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-stroke bg-surface/50 p-6">
                        <p className="mb-4 text-xs uppercase tracking-widest text-muted">Event Details</p>
                        <div className="grid gap-3 sm:grid-cols-2 text-sm">
                          {[
                            { label: "Name", value: form.name },
                            { label: "Email", value: form.email },
                            { label: "Event Type", value: form.eventType },
                            { label: "Date", value: form.date },
                            { label: "Location", value: form.location },
                            ...(form.phone ? [{ label: "Phone", value: form.phone }] : []),
                          ].map(({ label, value }) => (
                            <div key={label}>
                              <p className="text-muted">{label}</p>
                              <p className="font-medium">{value || "—"}</p>
                            </div>
                          ))}
                        </div>
                        {form.message && (
                          <div className="mt-4 border-t border-stroke pt-4">
                            <p className="text-muted text-sm">Notes</p>
                            <p className="mt-1 text-sm">{form.message}</p>
                          </div>
                        )}
                      </div>

                      <div className="rounded-2xl border border-pink/30 bg-pink/5 p-5 flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Deposit due</p>
                          <p className="text-sm text-muted">Invoice sent within 24 hours</p>
                        </div>
                        <p className="text-2xl font-bold text-pink">${selectedPkg.deposit.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="mt-8 flex items-center justify-between gap-4">
              {stepIndex > 0 ? (
                <button
                  type="button"
                  onClick={back}
                  className="rounded-full border border-stroke px-6 py-3 text-sm font-medium text-muted hover:text-text-primary transition-colors"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {step !== "confirm" ? (
                <button
                  type="button"
                  onClick={next}
                  disabled={step === "details" && (!form.name || !form.email || !form.date || !form.location)}
                  className="accent-gradient rounded-full px-8 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(243,6,130,0.4)] hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="accent-gradient rounded-full px-8 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(243,6,130,0.4)] hover:brightness-110 active:scale-95"
                >
                  Submit Booking Request
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
