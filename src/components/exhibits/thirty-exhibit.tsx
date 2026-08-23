import { useMemo, useState } from "react";
import { Prompt } from "@/components/museum-shell";
import { Button } from "@/components/ui/button";
import { useVisitStore } from "@/lib/visit-store";

const ITEMS = [
  { id: "test", label: "Test and discharge" },
  { id: "read", label: "Match procedure to the panel" },
  { id: "work", label: "The work itself" },
  { id: "report", label: "Report" },
  { id: "idle", label: "Slack" },
] as const;

type Id = (typeof ITEMS)[number]["id"];

function story(alloc: Record<Id, number>) {
  const lines: string[] = [];
  if (alloc.test < 8) lines.push("Testing is short. Backup stays silent unless you measure it.");
  else lines.push("You spent time on testing. It collides with the finish-today weather.");
  if (alloc.read < 5) lines.push("You skipped the unreadable paper. The addressee is still unknown.");
  else lines.push("You tried to read the paper. Deciphering burns the clock; the work is squeezed.");
  if (alloc.work <= 8) lines.push("Hands-on time is short. You can wear a “done already” face.");
  else lines.push("You stretched the work carefully. Not finishing stays possible.");
  if (alloc.idle >= 10 && alloc.work <= 8)
    lines.push(
      "Slack tops ten. Some people needle others. Some rest. Some check again. Slack amplifies temperament.",
    );
  else if (alloc.idle >= 10) lines.push("There is slack, but work remains. This is not idle.");
  else lines.push("No slack. Care and sloppiness both spill outside the window.");
  if (alloc.report >= 6)
    lines.push("The report is thick. Even if the inside is thin, the shape of “shared” is tidy.");
  else lines.push("The report is short. The field is detailed; official language likes one line.");
  return lines;
}

export function ThirtyExhibit() {
  const [alloc, setAlloc] = useState<Record<Id, number>>({
    test: 6,
    read: 6,
    work: 12,
    report: 4,
    idle: 2,
  });
  const mark = useVisitStore((s) => s.mark);
  const total = ITEMS.reduce((s, i) => s + alloc[i.id], 0);
  const lines = useMemo(() => story(alloc), [alloc]);

  function set(id: Id, v: number) {
    const next = Math.max(0, Math.min(30, v));
    const others = ITEMS.filter((i) => i.id !== id);
    const rest = 30 - next;
    const sumO = others.reduce((s, i) => s + alloc[i.id], 0) || 1;
    const n = { ...alloc, [id]: next };
    let used = next;
    others.forEach((i, idx) => {
      if (idx === others.length - 1) n[i.id] = Math.max(0, 30 - used);
      else {
        const x = Math.round((alloc[i.id] / sumO) * rest);
        n[i.id] = x;
        used += x;
      }
    });
    setAlloc(n);
  }

  return (
    <div>
      <p className="text-sm text-muted">
        The window is thirty minutes. Change the split and the total stays. What changes is what
        gets skipped, and what is left over.
      </p>
      <p className="mt-4 font-display text-3xl tabular-nums text-paper">{total} min</p>
      <div className="mt-4 space-y-4">
        {ITEMS.map((i) => (
          <label key={i.id} className="block">
            <div className="mb-1 flex justify-between text-sm">
              <span>{i.label}</span>
              <span className="tabular-nums text-muted">{alloc[i.id]}</span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              value={alloc[i.id]}
              onChange={(e) => set(i.id, Number(e.target.value))}
              className="h-11 w-full accent-paper"
            />
          </label>
        ))}
      </div>
      <ul className="mt-6 space-y-2 rounded-2xl bg-paper p-5 text-ink paper-grain">
        {lines.map((l) => (
          <li key={l} className="text-sm leading-relaxed">
            {l}
          </li>
        ))}
      </ul>
      <Prompt>Is the worker who finished early skilled? Whose time is the leftover twenty-five?</Prompt>
      <div className="mt-6">
        <Button type="button" variant="paper" onClick={() => mark("thirty", JSON.stringify(alloc))}>
          Close this room
        </Button>
      </div>
    </div>
  );
}
