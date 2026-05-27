import { useRef } from "react";
import { useInView } from "framer-motion";
import { events, formatDate, statusLabel } from "../data";

interface EventsProps {
  onNavigate: (id: string) => void;
}

export default function Events({ onNavigate }: EventsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} id="events" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <h2
          className={`text-3xl font-display font-bold leading-tight transition-all duration-700 sm:text-4xl lg:text-5xl ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Upcoming <span className="gradient-text">Events</span>
        </h2>

        <div className="mt-12 space-y-4">
          {events.map((event, i) => {
            const delay = isInView ? i * 0.1 : 0;
            return (
              <div
                key={event.id}
                className={`group relative overflow-hidden rounded-2xl border border-stroke bg-surface/50 transition-all duration-500 hover:border-pink/40 ${
                  isInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${delay}s` }}
              >
                <div className="flex items-center gap-4 p-5 sm:p-6">
                  {/* Date */}
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-surface text-center leading-tight">
                    <div>
                      <div className="text-xs text-muted uppercase">
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                      </div>
                      <div className="text-xl font-bold">
                        {new Date(event.date).getDate()}
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold">{event.venue}</h3>
                    <div className="mt-1 text-sm text-muted">{event.location}</div>
                  </div>

                  {/* Status / CTA */}
                  {event.status === "tickets" ? (
                    <button
                      onClick={() => onNavigate("event-" + event.id)}
                      className="accent-gradient rounded-full px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(243,6,130,0.4)] active:scale-95"
                    >
                      {statusLabel(event.status)}
                    </button>
                  ) : (
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        event.status === "sold-out"
                          ? "border border-red/30 text-red/70"
                          : "border border-muted/30 text-muted"
                      }`}
                    >
                      {statusLabel(event.status)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
