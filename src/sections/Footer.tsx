import { socials } from "../data";

export default function Footer() {
  return (
    <footer className="border-t border-stroke/30 px-6 py-8 bg-bg/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted font-medium">© {new Date().getFullYear()} DJ Nish. All rights reserved.</p>
        <div className="flex flex-wrap gap-6">
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted font-medium transition-colors hover:text-text"
            >
              {social.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
