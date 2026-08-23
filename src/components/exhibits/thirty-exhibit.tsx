import { useMemo, useState } from "react";
import { Prompt } from "@/components/museum-shell";
import { Button } from "@/components/ui/button";
import { useVisitStore } from "@/lib/visit-store";

const ITEMS = [
  { id: "test", label: "検電・放電" },
  { id: "read", label: "手順と盤の突き合わせ" },
  { id: "work", label: "実作業" },
  { id: "report", label: "報告" },
  { id: "idle", label: "余白" },
] as const;

type Id = (typeof ITEMS)[number]["id"];

function story(alloc: Record<Id, number>) {
  const lines: string[] = [];
  if (alloc.test < 8) lines.push("検電が短い。予備系は、測らなければ沈黙する。");
  else lines.push("検電に時間を割いた。今日中の空気と衝突する。");
  if (alloc.read < 5) lines.push("読めない紙を飛ばした。宛先はまだ不明のまま。");
  else lines.push("紙を読もうとした。判読に時間を溶かし、作業が圧迫される。");
  if (alloc.work <= 8) lines.push("実作業は短い。「もう終わった」顔ができる。");
  else lines.push("実作業を丁寧に伸ばした。終わらない可能性が残る。");
  if (alloc.idle >= 10 && alloc.work <= 8)
    lines.push("余白が十を超える。煽る人もいる。休み直す人もいる。再確認する人もいる。余白は性格を増幅する。");
  else if (alloc.idle >= 10) lines.push("余白はあるが、作業も残っている。暇ではない。");
  else lines.push("余白が無い。丁寧さも雑さも、枠の外に溢れる。");
  if (alloc.report >= 6) lines.push("報告は厚い。中身が薄くても、共有済みの形は整う。");
  else lines.push("報告は短い。現場は詳しいが、公式は一行になりやすい。");
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
        枠は三十分。配分を変えても合計は変わらない。変わるのは、何が省略され、何が余るか。
      </p>
      <p className="mt-4 font-display text-3xl tabular-nums text-paper">{total} 分</p>
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
      <Prompt>早く終わらせた職人は有能か。余った二十五分は、誰の時間か。</Prompt>
      <div className="mt-6">
        <Button type="button" variant="paper" onClick={() => mark("thirty", JSON.stringify(alloc))}>
          この室を閉じる
        </Button>
      </div>
    </div>
  );
}
