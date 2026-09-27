import { projects } from "@/data/portfolio";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-foreground/60">
        Projects
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col rounded-2xl border border-black/10 p-5 transition-colors hover:border-black/25"
          >
            <h3 className="font-medium">{project.title}</h3>
            <p className="mt-2 flex-1 text-sm text-foreground/70">
              {project.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-black/5 px-3 py-1 text-xs text-foreground/70"
                >
                  {tag}
                </li>
              ))}
            </ul>
            {(project.link || project.repo) && (
              <div className="mt-4 flex gap-4 text-sm">
                {project.link && (
                  <a
                    href={project.link}
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    Live
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    Code
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
