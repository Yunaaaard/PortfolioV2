import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 border-t border-white/5 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 flex items-center gap-2 text-sm">
            © 2026 Leonard Tariman | Stay curious. Stay kind.
          </p>
          <div className="flex gap-6">
            {["about", "projects", "skills", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="neon-icon text-zinc-600 transition-colors text-sm capitalize"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
