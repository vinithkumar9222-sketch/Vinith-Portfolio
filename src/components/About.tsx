import { profile } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-foreground/60">
        About
      </h2>
      <p className="mt-4 max-w-2xl whitespace-pre-line text-base leading-relaxed text-foreground/80">
        {profile.bio}
      </p>
    </section>
  );
}
