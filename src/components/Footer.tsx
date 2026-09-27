import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 py-8">
      <div className="mx-auto max-w-5xl px-6 text-xs text-foreground/50">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js.
      </div>
    </footer>
  );
}
