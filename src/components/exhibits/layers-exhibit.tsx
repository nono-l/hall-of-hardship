import { useState } from "react";
import { Prompt } from "@/components/museum-shell";
import { Button } from "@/components/ui/button";
import { useVisitStore } from "@/lib/visit-store";
import { cn } from "@/lib/utils";

const BOXES = [
  { id: "owner", label: "Client desk", readable: true, hand: false },
  { id: "gc", label: "GC desk", readable: true, hand: false },
  { id: "p1", label: "Prime desk", readable: true, hand: false },
  { id: "p2a", label: "** Elec.", readable: false, hand: true },
  { id: "p2b", label: "*wa *co", readable: false, hand: true },
  { id: "p3", label: "(card is worn through)", readable: false, hand: true },
];

export function LayersExhibit() {
  const [target, setTarget] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const mark = useVisitStore((s) => s.mark);
  const box = BOXES.find((b) => b.id === target);

  return (
    <div>
      <p className="text-sm text-muted">
        One warning. Choose a desk. The less readable the name, the more likely those hands
        actually touch the line.
      </p>
      <div className="mt-5 space-y-2">
        {BOXES.map((b, i) => (
          <button
            key={b.id}
            type="button"
            onClick={() => {
              setTarget(b.id);
              setSent(false);
            }}
            style={{ marginLeft: `${Math.min(i, 4) * 8}px` }}
            className={cn(
              "flex min-h-12 w-[calc(100%-2rem)] items-center justify-between rounded-xl border px-4 text-left text-sm",
              target === b.id
                ? "border-paper bg-paper text-ink"
                : "border-border bg-bg-elevated text-fg",
            )}
          >
            <span className={b.readable ? "" : "tracking-[0.2em] opacity-80"}>{b.label}</span>
            <span className="text-xs text-subtle">{b.hand ? "hands" : "desk"}</span>
          </button>
        ))}
      </div>
      <div className="mt-6">
        <Button type="button" variant="paper" disabled={!target} onClick={() => setSent(true)}>
          Set it on this desk
        </Button>
      </div>
      {sent && box && (
        <div className="mt-4 space-y-2 rounded-2xl border border-border bg-bg-elevated p-4 text-sm">
          {box.readable && !box.hand && (
            <p>
              It reached a readable desk. A briefing record remains. The person who will touch
              the wire lives in another box. The prime carries liability and does not carry the
              hands.
            </p>
          )}
          {box.hand && (
            <p>
              This is a desk for hands. The addressee is unreadable. You may have set it on the
              next box over. A banned tier of subcontracting can change only the label on the
              box.
            </p>
          )}
          <p className="text-muted">
            Before “which tier,” whose fingers are near the terminal. Official classification
            sometimes does not point at fingers.
          </p>
        </div>
      )}
      <Prompt>Are the box of liability and the box of shock the same box?</Prompt>
      <div className="mt-6">
        <Button type="button" variant="ghost" onClick={() => mark("layers", target ?? "unset")}>
          Close this room
        </Button>
      </div>
    </div>
  );
}
