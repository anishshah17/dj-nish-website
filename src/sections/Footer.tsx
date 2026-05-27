import { socials } from "../data";

export default function Footer() {
  return (
    <footer className="border-t border-stroke px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div>
            <span className="font-display text-lg font-bold text-text-primary">DJ NISH</span>
            <p className="mt-1 text-sm text-muted">
              Booking inquiries → booking@djnish.com
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-pink"
                aria-label={social.platform}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted/50">
            &copy; {new Date().getFullYear()} DJ Nish. All rights reserved.
          </div>
      </div>
    </footer>
  );
}
