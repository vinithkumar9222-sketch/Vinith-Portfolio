import Image from "next/image";
import HeroParticles from "@/components/HeroParticles";
import ResumeDownload from "@/components/ResumeDownload";
import { profile, stats } from "@/data/portfolio";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-background"
    >
      {profile.photo && (
        <div className="pointer-events-none relative mx-auto mt-4 h-72 w-full max-w-[300px] shrink-0 sm:h-96 sm:max-w-sm lg:absolute lg:right-0 lg:top-4 lg:bottom-0 lg:m-0 lg:h-auto lg:w-[46%] lg:max-w-none">
          <div className="animate-shape-float-a absolute right-[10%] top-[38%] z-0 h-[10%] w-[10%] rounded-full bg-blue-200" />
          <div className="animate-shape-float-b absolute -right-[6%] bottom-[6%] z-0 h-[16%] w-[16%] rounded-full bg-blue-100" />
          <div className="absolute inset-0 z-0 opacity-80">
            <HeroParticles />
          </div>
          <Image
            src={profile.photo}
            alt={profile.name}
            fill
            sizes="(min-width: 1024px) 46vw, 300px"
            className="pointer-events-none z-10 object-cover object-top"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 0%, black 82%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 82%, transparent 100%)",
            }}
            priority
          />
        </div>
      )}

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 py-10 lg:py-6">
        <div className="pointer-events-auto max-w-xl xl:max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
            {profile.title}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl xl:text-5xl">
            Turning Business Needs into{" "}
            <span className="text-accent">Real Solutions</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/60 sm:text-base">
            {profile.heroDescription}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-accent/30 transition-opacity hover:opacity-90"
            >
              View My Work
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <ResumeDownload />
          </div>

          <dl className="mt-8 grid grid-cols-3 divide-x divide-black/10">
            {stats.map((stat) => (
              <div key={stat.label} className="pl-4 pr-2 first:pl-0 sm:pl-8">
                <dt className="text-xl font-extrabold text-foreground sm:text-2xl xl:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs text-foreground/50 sm:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
