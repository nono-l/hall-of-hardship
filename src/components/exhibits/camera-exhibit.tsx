import { useState } from "react";
import { Prompt } from "@/components/museum-shell";
import { Button } from "@/components/ui/button";
import { useVisitStore } from "@/lib/visit-store";
import { cn } from "@/lib/utils";

const CHECKS = [
  { id: "pose", label: "A person is in front of the panel", camera: true, volt: false },
  { id: "ppe", label: "Looks like PPE is on", camera: true, volt: false },
  { id: "open", label: "The door is open", camera: true, volt: false },
  { id: "backup", label: "Backup circuit is energized", camera: false, volt: true },
  { id: "cap", label: "Capacitors still hold charge", camera: false, volt: true },
  { id: "earth", label: "Grounding is not made", camera: false, volt: true },
];

export function CameraExhibit() {
  const [layer, setLayer] = useState<"cam" | "volt" | "both">("cam");
  const [report, setReport] = useState(false);
  const mark = useVisitStore((s) => s.mark);
  const visible = CHECKS.filter((c) =>
    layer === "both" ? true : layer === "cam" ? c.camera : c.volt,
  );

  return (
    <div>
      <p className="text-sm text-muted">
        Left is the remote picture. Right is the electrical state. Same minute, different world.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <figure className="rounded-2xl border border-border bg-bg-subtle p-4">
          <svg viewBox="0 0 200 140" className="h-auto w-full text-muted" aria-hidden>
            <rect width="200" height="140" fill="#1a1814" />
            <rect x="20" y="18" width="90" height="104" fill="#2a2620" stroke="#6e675e" />
            <rect x="32" y="30" width="66" height="14" fill="#3a342c" />
            <rect x="32" y="50" width="66" height="14" fill="#3a342c" />
            <rect x="32" y="70" width="66" height="14" fill="#8b3a32" opacity="0.4" />
            <circle cx="150" cy="88" r="18" fill="#4a453c" />
            <rect x="138" y="104" width="24" height="28" fill="#4a453c" />
            {layer !== "cam" && (
              <>
                <path d="M32 77 H98" stroke="#c45c52" strokeWidth="2" />
                <circle cx="98" cy="77" r="4" fill="#c45c52" />
                <text x="108" y="80" fontSize="8" fill="#c45c52">
                  LIVE
                </text>
              </>
            )}
          </svg>
          <figcaption className="mt-2 text-xs text-subtle">Site camera 12:04</figcaption>
        </figure>
        <div className="rounded-2xl border border-border bg-bg-elevated p-4">
          <p className="text-xs tracking-[0.16em] text-subtle">Visible right now</p>
          <ul className="mt-3 space-y-2">
            {visible.map((c) => (
              <li key={c.id} className="flex items-start gap-2 text-sm">
                <span className={c.camera ? "text-muted" : "text-stamp"}>•</span>
                <span>{c.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {(
          [
            ["cam", "Camera only"],
            ["volt", "Electrical eye"],
            ["both", "Overlay"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setLayer(id)}
            className={cn(
              "min-h-11 rounded-xl border text-sm",
              layer === id ? "border-paper bg-paper text-ink" : "border-border text-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <Button type="button" variant="official" onClick={() => setReport(true)}>
          Write remote check: no issue
        </Button>
      </div>
      {report && (
        <p className="mt-4 rounded-xl bg-paper p-4 text-sm text-ink">
          {layer === "volt" || layer === "both"
            ? "With the electrical eye on, “no issue” will not write. It only writes on camera-only."
            : "The picture proves a person at work. It does not prove the panel is dead. Officially, remote support happened."}
        </p>
      )}
      <Prompt>Is remote presence evidence of a body — or of a circuit?</Prompt>
      <div className="mt-6">
        <Button type="button" variant="ghost" onClick={() => mark("camera", layer)}>
          Close this room
        </Button>
      </div>
    </div>
  );
}
