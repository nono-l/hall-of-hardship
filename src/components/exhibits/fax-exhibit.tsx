import { useMemo, useState } from "react";
import { Chip, Prompt } from "@/components/museum-shell";
import { Button } from "@/components/ui/button";
import { useVisitStore } from "@/lib/visit-store";
import { cn } from "@/lib/utils";

const FRAGMENTS = [
  { id: "a", look: "**SUB** BLDG *3", truth: "North substation, building 3", slot: "site" as const },
  { id: "b", look: "T* *ro", truth: "Name is unreadable", slot: "name" as const },
  { id: "c", look: "B*ckup  ISO*", truth: "Backup was not isolated", slot: "body" as const },
  { id: "d", look: "East * plant", truth: "Copy from another site", slot: "site" as const },
  { id: "e", look: "S* *", truth: "Signature from another job", slot: "name" as const },
  { id: "f", look: "Restore today", truth: "Addendum, author unknown", slot: "body" as const },
];

const CHANNELS = [
  { id: "fax", label: "Resend", result: "The same noise stacks another sheet. Share-count goes up." },
  { id: "call", label: "Call", result: "No pickup. Callback is “later.” Nothing is on record." },
  { id: "mail", label: "Email", result: "Read receipt fires. Confirmation of meaning does not." },
  { id: "go", label: "Go look", result: "Time burns. Whether backup is live is only knowable there." },
  { id: "leave", label: "Treat as received", result: "Officially shared. On site, nothing arrived." },
];

export function FaxExhibit() {
  const [held, setHeld] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const [channel, setChannel] = useState<string | null>(null);
  const mark = useVisitStore((s) => s.mark);
  const order = useMemo(() => [...FRAGMENTS].sort(() => 0.3 - Math.random()), []);

  function toggle(id: string) {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length >= 3 ? p : [...p, id]));
  }

  const chosen = FRAGMENTS.filter((f) => picked.includes(f.id));
  const slotsOk =
    chosen.some((f) => f.id === "a") &&
    chosen.some((f) => f.id === "b") &&
    chosen.some((f) => f.id === "c");

  return (
    <div>
      <p className="text-sm text-muted">
        A degraded copy sits on the desk. Sender unknown. Pick three sheets and try to restore
        site, name, and body.
      </p>
      <button
        type="button"
        className="mt-4 min-h-11 w-full rounded-xl border border-border bg-bg-elevated text-sm text-muted"
        onPointerDown={() => setHeld(true)}
        onPointerUp={() => setHeld(false)}
        onPointerLeave={() => setHeld(false)}
      >
        Hold to develop
      </button>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {order.map((f) => {
          const on = picked.includes(f.id);
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => toggle(f.id)}
              className={cn(
                "min-h-24 rounded-xl border p-3 text-left fax-noise transition-colors",
                on ? "border-stamp bg-paper text-ink" : "border-border bg-paper-deep/90 text-ink-soft",
              )}
            >
              <span className="font-display text-base tracking-wide">{held ? f.truth : f.look}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-subtle">
        Selected {picked.length}/3 — barely readable only while you hold.
      </p>
      {picked.length === 3 && (
        <p className="mt-4 rounded-xl border border-border bg-bg-elevated p-4 text-sm">
          {slotsOk
            ? "Closest three. The name is still unreadable, and the backup line said the opposite of the truth."
            : "You matched a set. It mixed another site and another signature. Winning memory-match is not being right."}
        </p>
      )}
      <p className="mt-8 text-sm text-muted">Next move, after “checking.”</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {CHANNELS.map((c) => (
          <Chip key={c.id} active={channel === c.id} onClick={() => setChannel(c.id)}>
            {c.label}
          </Chip>
        ))}
      </div>
      {channel && (
        <p className="mt-4 rounded-xl bg-paper p-4 text-sm text-ink paper-grain">
          {CHANNELS.find((c) => c.id === channel)?.result}
        </p>
      )}
      <Prompt>Who is a system for, if unreadable paper can count as “shared”?</Prompt>
      <div className="mt-6">
        <Button type="button" variant="paper" onClick={() => mark("fax", channel ?? "untouched")}>
          Close this room
        </Button>
      </div>
    </div>
  );
}
