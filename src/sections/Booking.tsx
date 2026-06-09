import { useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { bookingPackages } from "../data";

export default function Booking() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [step, setStep] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section ref={ref} className="relative px-6 py-24 sm:py-32 overflow-hidden min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center max-w-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink to-blue flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-display font-black mb-4">
            Let's Make It Unforgettable
          </h2>
          <p className="text-muted text-xl mb-8">
            Your booking inquiry has been received. I'll be in touch within 24 hours to confirm details and discuss your vision.
          </p>
          <motion.button
            onClick={() => {
              setSubmitted(false);
              setStep(0);
              setSelectedPackage(null);
            }}
            className="accent-gradient rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider text-white"
            whileHover={{ scale: 1.05 }}
          >
            Book Another Event
          </motion.button>
        </motion.div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative px-6 py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink to-blue font-display font-bold">
            Bookings
          </span>
          <h2 className="text-5xl md:text-6xl font-display font-black leading-tight mt-3">
            Book DJ Nish
          </h2>
          <p className="text-muted text-lg mt-4">
            A 50% deposit secures your date. The remaining balance is due on the day of the event.
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex justify-center gap-3 mb-12">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i <= step ? "accent-gradient w-12" : "bg-stroke w-8"
              }`}
              initial={{ width: 32 }}
              animate={{ width: i <= step ? 48 : 32 }}
            />
          ))}
        </div>

        {/* Step 1: Package Selection */}
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-2xl font-display font-bold mb-8 text-center">Choose Your Package</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {bookingPackages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  className={`glass-sm p-8 rounded-3xl cursor-pointer transition-all ${
                    selectedPackage === pkg.id
                      ? "ring-2 ring-pink bg-white/10"
                      : "hover:bg-white/5"
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {pkg.popular && (
                    <div className="inline-block accent-gradient rounded-full px-4 py-1 text-xs font-bold text-white mb-4">
                      Most Popular
                    </div>
                  )}
                  <h4 className="text-2xl font-display font-bold mb-2">{pkg.name}</h4>
                  <p className="text-3xl font-black gradient-text mb-1">${pkg.price}</p>
                  <p className="text-sm text-muted mb-6">{pkg.hours}h set · ${pkg.deposit} deposit</p>
                  <ul className="space-y-3 text-sm">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-pink">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            <div className="text-center mb-8">
              <p className="text-muted text-sm">
                Need something custom?{" "}
                <a href="mailto:booking@djnish.com" className="text-pink hover:underline">
                  Email us
                </a>{" "}
                for a tailored quote.
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setStep(1)}
                disabled={!selectedPackage}
                className="accent-gradient rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_40px_rgba(243,6,130,0.6)]"
              >
                Continue →
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2-4: Form */}
        {step > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="glass-sm p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-display font-bold mb-6">
              {step === 1 && "Event Details"}
              {step === 2 && "Availability & Deposit"}
              {step === 3 && "Confirm Your Booking"}
            </h3>

            {step === 1 && (
              <div className="space-y-4 mb-8">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full glass-sm px-6 py-3 rounded-2xl text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-pink"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full glass-sm px-6 py-3 rounded-2xl text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-pink"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full glass-sm px-6 py-3 rounded-2xl text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-pink"
                />
                <input
                  type="text"
                  placeholder="Event Location"
                  className="w-full glass-sm px-6 py-3 rounded-2xl text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-pink"
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-bold mb-2">Event Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full glass-sm px-6 py-3 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-pink"
                  />
                </div>
                <div className="glass-sm p-6 rounded-2xl">
                  <p className="text-sm text-muted mb-2">Deposit Amount Due</p>
                  <p className="text-4xl font-black gradient-text">
                    ${bookingPackages.find((p) => p.id === selectedPackage)?.deposit}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Payment Method</label>
                  <select className="w-full glass-sm px-6 py-3 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-pink">
                    <option>Credit Card</option>
                    <option>Bank Transfer</option>
                    <option>PayPal</option>
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="glass-sm p-6 rounded-2xl mb-8">
                <p className="text-sm text-muted mb-4">Booking Summary</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Package:</span>
                    <span className="font-bold">
                      {bookingPackages.find((p) => p.id === selectedPackage)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Total Price:</span>
                    <span className="font-bold gradient-text text-lg">
                      ${bookingPackages.find((p) => p.id === selectedPackage)?.price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Deposit Due:</span>
                    <span className="font-bold text-pink">
                      ${bookingPackages.find((p) => p.id === selectedPackage)?.deposit}
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-3 mt-3 flex justify-between">
                    <span className="text-muted">Balance Due on Event Day:</span>
                    <span className="font-bold">
                      ${
                        (bookingPackages.find((p) => p.id === selectedPackage)?.price || 0) -
                        (bookingPackages.find((p) => p.id === selectedPackage)?.deposit || 0)
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                className="glass rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all hover:bg-white/10"
              >
                ← Back
              </button>
              <button
                onClick={() => {
                  if (step === 3) {
                    handleSubmit();
                  } else {
                    setStep(Math.min(3, step + 1));
                  }
                }}
                disabled={isSubmitting}
                className="accent-gradient rounded-full px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:shadow-[0_0_40px_rgba(243,6,130,0.6)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                    ⏳
                  </motion.span>
                ) : step === 3 ? (
                  "Complete Booking"
                ) : (
                  "Continue →"
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
