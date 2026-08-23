import { useMemo, useState } from "react";
import { Prompt } from "@/components/museum-shell";
import { Button } from "@/components/ui/button";
import { EXHIBITS } from "@/lib/exhibits";
import { useVisitStore } from "@/lib/visit-store";
import { cn } from "@/lib/utils";

const VOICES = [
  {
    id: "analyst",
    who: "The one who writes the numbers",
    said: "Eighty percent of fatal shocks are an information-sharing deficiency around hazard points.",
    hide: "Split the deficiency (paper, attitude, backup, time) and the brief will not stay one piece.",
  },
  {
    id: "prime",
    who: "Prime",
    said: "We briefed. We handed over the procedure. After that it is a site problem.",
    hide: "Whether the paper was readable is not in their score.",
  },
  {
    id: "hand",
    who: "Hands on the tools",
    said: "If I ask every little thing, the job dies. Same as always.",
    hide: "“Same as always” breaks on whether backup is live.",
  },
  {
    id: "client",
    who: "Client",
    said: "Keep the outage window. Safety first — also today.",
    hide: "Two firsts at once. The collision drops down the chain.",
  },
  {
    id: "remote",
    who: "Remote check",
    said: "On camera they were working. No particular anomaly.",
    hide: "The design does not let an anomaly show.",
  },
  {
    id: "new",
    who: "Just arrived",
    said: "I got the paper. I do not know where it came from. I cannot read the name.",
    hide: "Honesty does not sit with the official “briefed.”",
  },
];

export function TestimonyExhibit() {
  const [pins, setPins] = useState<string[]>([]);
  const notes = useVisitStore((s) => s.notes);
  const completed = useVisitStore((s) => s.completed);
  const mark = useVisitStore((s) => s.mark);

  function toggle(id: string) {
    setPins((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }

  const report = useMemo(() => {
    if (pins.length === 0) return "(Pin a testimony and an official line writes itself.)";
    return "The primary cause is considered to be an information-sharing deficiency regarding hazard points among the parties concerned. Awareness will be reinforced to prevent recurrence.";
  }, [pins]);

  return (
    <div>
      <p className="text-sm text-muted">
        The testimonies do not look like they contradict. Only the hiding-place differs. Pin
        the side that is hiding, and the official sentence is generated.
      </p>
      <div className="mt-5 space-y-3">
        {VOICES.map((v) => {
          const on = pins.includes(v.id);
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => toggle(v.id)}
              className={cn(
                "w-full rounded-2xl border p-4 text-left",
                on ? "border-stamp bg-bg-elevated" : "border-border bg-bg-subtle",
              )}
            >
              <p className="text-xs tracking-[0.14em] text-subtle">{v.who}</p>
              <p className="mt-1 text-sm">{v.said}</p>
              {on && <p className="mt-2 text-sm text-paper-deep">{v.hide}</p>}
            </button>
          );
        })}
      </div>
      <article className="mt-6 rounded-2xl bg-paper p-5 text-ink paper-grain">
        <p className="text-xs tracking-[0.18em] text-ink-soft">Auto-generated official report</p>
        <p className="mt-3 font-display text-lg leading-relaxed">{report}</p>
        <p className="mt-4 text-xs text-stamp">
          Select more and the official line still shortens. That is the job of mildness.
        </p>
      </article>
      {completed.length > 0 && (
        <section className="mt-8">
          <p className="text-xs tracking-[0.16em] text-subtle">Your footprints (this device only)</p>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {EXHIBITS.filter((e) => completed.includes(e.slug)).map((e) => (
              <li key={e.slug}>
                {e.title}
                {notes[e.slug] ? ` — ${notes[e.slug]}` : ""}
              </li>
            ))}
          </ul>
        </section>
      )}
      <Prompt>
        A report that keeps everything is long. A short report eases someone. Which do you write?
      </Prompt>
      <div className="mt-6">
        <Button type="button" variant="paper" onClick={() => mark("testimony", pins.join(","))}>
          Count the hall as walked
        </Button>
      </div>
    </div>
  );
}
