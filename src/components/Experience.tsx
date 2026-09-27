import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-foreground/60">
        Experience
      </h2>
      <div className="mt-6 flex flex-col gap-6">
        {experience.map((role) => (
          <div
            key={`${role.company}-${role.role}`}
            className="rounded-2xl border border-black/10 p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-medium">
                {role.role} · {role.company}
              </h3>
              <span className="text-xs text-foreground/60">{role.period}</span>
            </div>
            <p className="mt-2 text-sm text-foreground/70">
              {role.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
