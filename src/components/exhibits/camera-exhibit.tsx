import { useState } from "react";
import { Prompt } from "@/components/museum-shell";
import { Button } from "@/components/ui/button";
import { useVisitStore } from "@/lib/visit-store";
import { cn } from "@/lib/utils";

const CHECKS = [
  { id: "pose", label: "人が盤の前にいる", camera: true, volt: false },
  { id: "ppe", label: "保護具を着けているように見える", camera: true, volt: false },
  { id: "open", label: "扉が開いている", camera: true, volt: false },
  { id: "backup", label: "予備系が充電されている", camera: false, volt: true },
  { id: "cap", label: "コンデンサに残電荷がある", camera: false, volt: true },
  { id: "earth", label: "接地が取れていない", camera: false, volt: true },
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
        左は遠隔の画。右は電気の状態。同じ時刻の、違う世界。
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
          <figcaption className="mt-2 text-xs text-subtle">現場カメラ 12:04</figcaption>
        </figure>
        <div className="rounded-2xl border border-border bg-bg-elevated p-4">
          <p className="text-xs tracking-[0.16em] text-subtle">いま見えている項目</p>
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
            ["cam", "カメラだけ"],
            ["volt", "電気の目"],
            ["both", "重ねる"],
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
          遠隔確認：問題なし、と書く
        </Button>
      </div>
      {report && (
        <p className="mt-4 rounded-xl bg-paper p-4 text-sm text-ink">
          {layer === "volt" || layer === "both"
            ? "電気の目がある状態で「問題なし」は書けない。書けるのは、カメラだけのときだ。"
            : "画は作業中の人を証明する。盤が死んでいることは証明しない。公式には後方支援済み。"}
        </p>
      )}
      <Prompt>遠隔臨場は、人の位置の証拠か。回路の証拠か。</Prompt>
      <div className="mt-6">
        <Button type="button" variant="ghost" onClick={() => mark("camera", layer)}>
          この室を閉じる
        </Button>
      </div>
    </div>
  );
}
