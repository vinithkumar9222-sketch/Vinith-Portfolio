"use client";

import { useState } from "react";
import { profile } from "@/data/portfolio";

type Format = "pdf" | "docx";

const FORMATS: {
  id: Format;
  label: string;
  description: string;
  url: string;
  accent: string;
}[] = [
  {
    id: "pdf",
    label: "Download as PDF",
    description: "Best for viewing and sharing",
    url: profile.resumeUrl,
    accent: "bg-red-500",
  },
  {
    id: "docx",
    label: "Download as DOCX",
    description: "Editable format (Microsoft Word)",
    url: profile.resumeDocUrl,
    accent: "bg-blue-600",
  },
];

function FormatIcon({ format }: { format: Format }) {
  return (
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white ${
        format === "pdf" ? "bg-red-500" : "bg-blue-600"
      }`}
    >
      {format === "pdf" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6z" opacity="0.35" />
          <path d="M14 2v6h6" opacity="0.6" />
        </svg>
      ) : (
        <span>W</span>
      )}
    </div>
  );
}

export default function ResumeDownload() {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<Format>("pdf");

  const handleDownload = () => {
    const chosen = FORMATS.find((f) => f.id === format)!;
    const link = document.createElement("a");
    link.href = chosen.url;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border-2 border-accent bg-background px-6 py-3 text-sm font-semibold text-accent transition-colors hover:bg-blue-50"
      >
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
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
          <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
        </svg>
        Download Resume
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-foreground/40 transition-colors hover:bg-black/5 hover:text-foreground"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-blue-50" />
              <div
                className="absolute -right-1 -top-1 opacity-70"
                style={{
                  backgroundImage:
                    "radial-gradient(#93c5fd 1.4px, transparent 1.4px)",
                  backgroundSize: "9px 9px",
                  width: 32,
                  height: 32,
                }}
              />
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="relative text-accent">
                <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6z" fill="currentColor" opacity="0.15" />
                <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.6" opacity="0.5" />
                <line x1="8" y1="13" x2="15" y2="13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="8" y1="16.5" x2="13" y2="16.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white shadow-md shadow-accent/30">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
            </div>

            <h3 className="mt-5 text-center text-xl font-bold text-foreground">
              Download My Resume
            </h3>
            <p className="mx-auto mt-2 max-w-xs text-center text-sm text-foreground/60">
              Choose the format you prefer to download my latest resume.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {FORMATS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormat(f.id)}
                  className={`relative rounded-2xl border-2 p-3.5 text-left transition-colors ${
                    format === f.id
                      ? "border-accent bg-blue-50/50"
                      : "border-black/10 hover:border-black/20"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <FormatIcon format={f.id} />
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                        format === f.id
                          ? "border-accent"
                          : "border-black/20"
                      }`}
                    >
                      {format === f.id && (
                        <span className="h-2 w-2 rounded-full bg-accent" />
                      )}
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm font-semibold text-foreground">
                    {f.label}
                  </p>
                  <p className="mt-0.5 text-xs text-foreground/50">
                    {f.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-black/10 py-3 text-sm font-semibold text-foreground/70 transition-colors hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-semibold text-white shadow-sm shadow-accent/30 transition-opacity hover:opacity-90"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                  <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
                </svg>
                Download Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
