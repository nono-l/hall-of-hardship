import { useState } from "react";
import { Prompt } from "@/components/museum-shell";
import { Button } from "@/components/ui/button";
import { useVisitStore } from "@/lib/visit-store";
import { cn } from "@/lib/utils";

const BOXES = [
  { id: "owner", label: "発注の机", readable: true, hand: false },
  { id: "gc", label: "元請の机", readable: true, hand: false },
  { id: "p1", label: "一次の机", readable: true, hand: false },
  { id: "p2a", label: "※※電設", readable: false, hand: true },
  { id: "p2b", label: "※和※業", readable: false, hand: true },
  { id: "p3", label: "（名刺が擦れている）", readable: false, hand: true },
];

export function LayersExhibit() {
  const [target, setTarget] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const mark = useVisitStore((s) => s.mark);
  const box = BOXES.find((b) => b.id === target);

  return (
    <div>
      <p className="text-sm text-muted">
        警告文は一通。入れる机を選ぶ。名前が読めない机ほど、実際に線に触る可能性が高い。
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
            <span className={b.readable ? "" : "tracking-[0.3em] opacity-80"}>{b.label}</span>
            <span className="text-xs text-subtle">{b.hand ? "手" : "机"}</span>
          </button>
        ))}
      </div>
      <div className="mt-6">
        <Button type="button" variant="paper" disabled={!target} onClick={() => setSent(true)}>
          この机に置く
        </Button>
      </div>
      {sent && box && (
        <div className="mt-4 space-y-2 rounded-2xl border border-border bg-bg-elevated p-4 text-sm">
          {box.readable && !box.hand && (
            <p>
              読める机に届いた。説明の記録は残る。線に触る人は、別の箱の中にいる。一次は責任を負うが、手は持っていない。
            </p>
          )}
          {box.hand && (
            <p>
              手を動かす側の机だ。ただし宛名が読めない。置いたつもりが、隣の箱かもしれない。禁止された次数は、呼び方を変えれば箱のラベルだけが変わる。
            </p>
          )}
          <p className="text-muted">
            何次か、より先に、誰の指が端子に近いか。公式の分類は、指の位置を指さないことがある。
          </p>
        </div>
      )}
      <Prompt>責任の所在と、感電の所在は、同じ箱か。</Prompt>
      <div className="mt-6">
        <Button type="button" variant="ghost" onClick={() => mark("layers", target ?? "未選択")}>
          この室を閉じる
        </Button>
      </div>
    </div>
  );
}
