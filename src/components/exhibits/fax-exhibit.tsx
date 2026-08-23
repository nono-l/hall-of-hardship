import { useMemo, useState } from "react";
import { Chip, Prompt } from "@/components/museum-shell";
import { Button } from "@/components/ui/button";
import { useVisitStore } from "@/lib/visit-store";
import { cn } from "@/lib/utils";

const FRAGMENTS = [
  { id: "a", look: "※※現※※第※棟", truth: "北変電 第3棟", slot: "site" as const },
  { id: "b", look: "田※ ※郎", truth: "名前は判読不能", slot: "name" as const },
  { id: "c", look: "予※系 切※済", truth: "予備系は切っていない", slot: "body" as const },
  { id: "d", look: "東※ ※工場", truth: "別現場の控え", slot: "site" as const },
  { id: "e", look: "佐※ ※", truth: "別件の署名", slot: "name" as const },
  { id: "f", look: "本日中に復旧", truth: "誰が書いたか不明の追記", slot: "body" as const },
];

const CHANNELS = [
  { id: "fax", label: "再送する", result: "同じノイズがもう一枚積まれる。共有回数は増える。" },
  { id: "call", label: "電話する", result: "出ない。折り返しは「後で」。記録は残らない。" },
  { id: "mail", label: "メールする", result: "既読はつく。内容の確認はつかない。" },
  { id: "go", label: "現物を見に行く", result: "時間は溶ける。予備系の活きは、そこでしか分からない。" },
  { id: "leave", label: "届いたことにする", result: "公式には共有済み。現場には何も届いていない。" },
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
        劣化コピーが机にある。送信元は分からない。三枚を選んで、現場・名前・内容を復元してみる。
      </p>
      <button
        type="button"
        className="mt-4 min-h-11 w-full rounded-xl border border-border bg-bg-elevated text-sm text-muted"
        onPointerDown={() => setHeld(true)}
        onPointerUp={() => setHeld(false)}
        onPointerLeave={() => setHeld(false)}
      >
        押し続けて現像する
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
              <span className="font-display text-base tracking-widest">
                {held ? f.truth : f.look}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-subtle">選択 {picked.length}/3 — 押している間だけ、わずかに読める。</p>
      {picked.length === 3 && (
        <p className="mt-4 rounded-xl border border-border bg-bg-elevated p-4 text-sm">
          {slotsOk
            ? "いちばん近い三枚だ。それでも氏名は読めず、予備系の記述は事実と逆だった。"
            : "揃えたつもりが、別現場と別署名が混ざっている。神経衰弱の勝ちは、正しさではない。"}
        </p>
      )}
      <p className="mt-8 text-sm text-muted">確認の次の一手。</p>
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
      <Prompt>読めない紙を「共有済み」にできる制度は、誰のための制度か。</Prompt>
      <div className="mt-6">
        <Button type="button" variant="paper" onClick={() => mark("fax", channel ?? "未操作")}>
          この室を閉じる
        </Button>
      </div>
    </div>
  );
}
