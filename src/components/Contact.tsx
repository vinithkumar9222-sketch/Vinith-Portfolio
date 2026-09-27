import { profile } from "@/data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-foreground/60">
        Contact
      </h2>
      <p className="mt-4 max-w-xl text-foreground/80">
        Have a project in mind or just want to connect? My inbox is open.
      </p>
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full bg-foreground px-5 py-2.5 font-medium text-background transition-opacity hover:opacity-90"
        >
          {profile.email}
        </a>
        {profile.socials.github && (
          <a
            href={profile.socials.github}
            className="rounded-full border border-black/15 px-5 py-2.5 font-medium transition-colors hover:bg-black/5"
          >
            GitHub
          </a>
        )}
        {profile.socials.linkedin && (
          <a
            href={profile.socials.linkedin}
            className="rounded-full border border-black/15 px-5 py-2.5 font-medium transition-colors hover:bg-black/5"
          >
            LinkedIn
          </a>
        )}
      </div>
    </section>
  );
}
