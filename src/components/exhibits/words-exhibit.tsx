import { useState } from "react";
import { Chip, Prompt } from "@/components/museum-shell";
import { Button } from "@/components/ui/button";
import { useVisitStore } from "@/lib/visit-store";

const SCALE = [
  {
    n: 0,
    label: "Field voice",
    body: "You throw the breaker and the caps still hold charge. Backup is live and they still say “it’s off.” Ask once and you get “you looking down on me?” People still die every year.",
  },
  {
    n: 25,
    label: "Work note",
    body: "Residual voltage and a live spare circuit after isolation. The crew on the tools waves the briefing off. Paper is unreadable. No reply. Electrocutions have not fallen.",
  },
  {
    n: 50,
    label: "Internal report",
    body: "Pre-work hazard briefing has not taken hold. Handoffs between parties leak. Similar incidents continue.",
  },
  {
    n: 75,
    label: "Public brief",
    body: "Most fatal shocks have an information-sharing deficiency around hazard points in the background. Awareness will be reinforced to prevent recurrence.",
  },
  {
    n: 100,
    label: "Official one-liner",
    body: "Information-sharing deficiency.",
  },
];

const WHO = [
  {
    id: "analyst",
    label: "The analyst",
    hint: "It classifies. Causes fold into one. Next year’s paper can be written.",
  },
  {
    id: "prime",
    label: "Prime contractor",
    hint: "A record of briefing remains. Even if it did not land, they can stand on “we shared it.”",
  },
  {
    id: "second",
    label: "Hands on the wire",
    hint: "Mild words make a yeah-yeah harder to see.",
  },
  {
    id: "client",
    label: "The client",
    hint: "The schedule holds. Blame becomes “communication on site.”",
  },
  {
    id: "dead",
    label: "The person on the line",
    hint: "In every phrasing, residual voltage is still residual voltage.",
  },
];

export function WordsExhibit() {
  const [mild, setMild] = useState(50);
  const [who, setWho] = useState<string | null>(null);
  const mark = useVisitStore((s) => s.mark);
  const current = SCALE.reduce((acc, s) => (mild >= s.n ? s : acc), SCALE[0]);

  return (
    <div>
      <p className="text-sm text-muted">
        Turn the knob and only the skin of the same facts gets thicker. Nothing is added inside.
      </p>
      <label className="mt-6 block">
        <div className="mb-2 flex justify-between text-xs text-subtle">
          <span>Raw voice</span>
          <span className="tabular-nums">Mildness {mild}</span>
          <span>Official</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={mild}
          onChange={(e) => setMild(Number(e.target.value))}
          className="h-11 w-full accent-paper"
        />
      </label>
      <article className="mt-5 rounded-2xl bg-paper p-5 text-ink shadow-[var(--shadow-paper)] paper-grain">
        <p className="text-xs tracking-[0.18em] text-ink-soft">{current.label}</p>
        <p className="mt-3 font-display text-lg leading-relaxed">{current.body}</p>
      </article>
      <p className="mt-8 text-sm text-muted">Who gets the most ease from this phrasing?</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {WHO.map((w) => (
          <Chip key={w.id} active={who === w.id} onClick={() => setWho(w.id)}>
            {w.label}
          </Chip>
        ))}
      </div>
      {who && (
        <p className="mt-4 rounded-xl border border-border bg-bg-elevated p-4 text-sm text-fg">
          {WHO.find((w) => w.id === who)?.hint}
        </p>
      )}
      <Prompt>Is mildness kindness — or omission for the next report?</Prompt>
      <div className="mt-6">
        <Button type="button" onClick={() => mark("words", who ?? "unset")} variant="paper">
          Close this room
        </Button>
      </div>
    </div>
  );
}
