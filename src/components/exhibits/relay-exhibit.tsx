import { useState } from "react";
import { Prompt } from "@/components/museum-shell";
import { Button } from "@/components/ui/button";
import { useVisitStore } from "@/lib/visit-store";
import { cn } from "@/lib/utils";

const ROLES = [
  { id: "client", label: "Client" },
  { id: "gc", label: "General contractor" },
  { id: "prime", label: "Prime" },
  { id: "hand", label: "Hands on the tools" },
] as const;

type RoleId = (typeof ROLES)[number]["id"];

const PERSONAS = [
  {
    id: "careful",
    label: "The one who keeps it",
    run: (m: string) => ({
      out: m + " / Also verify voltage and backup.",
      leak: "Detail grows. So does the cost of reading.",
    }),
  },
  {
    id: "yeah",
    label: "Yeah-yeah",
    run: (m: string) => ({
      out: "Got it. Same as always.",
      leak: `The original “${m.slice(0, 18)}…” is gone.`,
    }),
  },
  {
    id: "today",
    label: "Finish-today",
    run: (m: string) => ({
      out: m.replace(/confirm|verify/gi, "asap") + " Restore today.",
      leak: "Safety words were swapped for schedule words.",
    }),
  },
  {
    id: "unread",
    label: "Cannot read it",
    run: () => ({
      out: "(Illegible — said “later” out loud)",
      leak: "The paper moved. The meaning did not.",
    }),
  },
  {
    id: "camera",
    label: "Settles it on camera",
    run: (m: string) => ({
      out: "On camera: at work. No issue.",
      leak: `Voltage talk (${m.toLowerCase().includes("backup") ? "backup" : "residual"}) does not ride in the picture.`,
    }),
  },
  {
    id: "self",
    label: "Measures it themselves",
    run: (m: string) => ({
      out: m + " → test live on site before touching",
      leak: "Handoff can be broken and the last act can still stop the hazard.",
    }),
  },
];

const SEEDS = [
  "Looks isolated. Backup is live. Residual charge. Test before you touch.",
  "Finish it today. Details from the prime.",
  "Same panel as always. Follow the procedure.",
];

export function RelayExhibit() {
  const [seed, setSeed] = useState(SEEDS[0]);
  const [cast, setCast] = useState<Record<RoleId, string>>({
    client: "today",
    gc: "careful",
    prime: "yeah",
    hand: "unread",
  });
  const [ran, setRan] = useState(false);
  const mark = useVisitStore((s) => s.mark);

  const steps = ran
    ? ROLES.reduce<{ role: string; out: string; leak: string }[]>((acc, role) => {
        const prev = acc.length ? acc[acc.length - 1].out : seed;
        const persona = PERSONAS.find((p) => p.id === cast[role.id]) ?? PERSONAS[0];
        const r = persona.run(prev);
        acc.push({ role: role.label, out: r.out, leak: r.leak });
        return acc;
      }, [])
    : [];

  return (
    <div>
      <p className="text-sm text-muted">
        Do not decide the subcontractor is the problem. Cast four temperaments and watch where
        the same sentence thins out.
      </p>
      <p className="mt-6 text-xs tracking-[0.16em] text-subtle">Opening line</p>
      <div className="mt-2 grid gap-2">
        {SEEDS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setSeed(s);
              setRan(false);
            }}
            className={cn(
              "min-h-11 rounded-xl border px-3 py-2 text-left text-sm",
              seed === s ? "border-paper bg-paper text-ink" : "border-border text-muted",
            )}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4">
        {ROLES.map((role) => (
          <div key={role.id} className="rounded-2xl border border-border bg-bg-elevated p-4">
            <p className="text-xs text-subtle">{role.label}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {PERSONAS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setCast((c) => ({ ...c, [role.id]: p.id }));
                    setRan(false);
                  }}
                  className={cn(
                    "min-h-10 rounded-full border px-3 text-xs",
                    cast[role.id] === p.id
                      ? "border-paper bg-paper text-ink"
                      : "border-border text-muted",
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Button type="button" variant="paper" onClick={() => setRan(true)}>
          Pass it down
        </Button>
      </div>
      {ran && (
        <ol className="mt-6 space-y-3">
          {steps.map((s, i) => (
            <li key={s.role} className="rounded-2xl bg-paper p-4 text-ink paper-grain">
              <p className="text-xs text-ink-soft">
                {i + 1} {s.role}
              </p>
              <p className="mt-2 text-sm leading-relaxed">{s.out}</p>
              <p className="mt-2 text-xs text-stamp">{s.leak}</p>
            </li>
          ))}
        </ol>
      )}
      <Prompt>
        A careful crew on the tools, a yeah-yeah prime. Swap them — does the official line
        “breaks below the prime” still hold?
      </Prompt>
      <div className="mt-6">
        <Button
          type="button"
          variant="ghost"
          onClick={() => mark("relay", ran ? steps[steps.length - 1]?.out : "not run")}
        >
          Close this room
        </Button>
      </div>
    </div>
  );
}
