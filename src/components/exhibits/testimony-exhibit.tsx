import { useMemo, useState } from "react";
import { Prompt } from "@/components/museum-shell";
import { Button } from "@/components/ui/button";
import { EXHIBITS } from "@/lib/exhibits";
import { useVisitStore } from "@/lib/visit-store";
import { cn } from "@/lib/utils";

const VOICES = [
  {
    id: "analyst",
    who: "統計を書く人",
    said: "感電死亡の八割は危険箇所の情報共有不足です。",
    hide: "不足の中身（書類、態度、予備系、時間）を分解すると、資料が一本にならない。",
  },
  {
    id: "prime",
    who: "一次",
    said: "説明はした。手順も渡した。あとは現場の問題だ。",
    hide: "渡した紙が読めたかは、自分の成果指標に入っていない。",
  },
  {
    id: "hand",
    who: "手を動かす人",
    said: "いちいち聞いてたら仕事にならん。いつもと同じだ。",
    hide: "いつもと同じ、の前提が予備系の有無で崩れている。",
  },
  {
    id: "client",
    who: "発注",
    said: "停電枠は守ってほしい。安全は最優先だが今日中でもある。",
    hide: "二つの最優先を同時に置いている。衝突の処理は下へ落ちる。",
  },
  {
    id: "remote",
    who: "遠隔確認",
    said: "カメラでは作業中で、特段の異常は見られなかった。",
    hide: "異常が見える設計になっていない。",
  },
  {
    id: "new",
    who: "着いたばかりの人",
    said: "紙はもらった。どこから来たか分からない。名前も読めない。",
    hide: "正直さが、公式の「周知済み」と両立しない。",
  },
];

export function TestimonyExhibit() {
  const [pins, setPins] = useState<string[]>([]);
  const notes = useVisitStore((s) => s.notes);
  const completed = useVisitStore((s) => s.completed);
  const mark = useVisitStore((s) => s.mark);

  function toggle(id: string) {
    setPins((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }

  const report = useMemo(() => {
    if (pins.length === 0) return "（証言を選ぶと、公式の一行が自動で書かれる）";
    return "本件は、関係者間における危険箇所の情報共有不足が主因と考えられる。再発防止として周知の徹底を図る。";
  }, [pins]);

  return (
    <div>
      <p className="text-sm text-muted">
        証言は矛盾しないように見える。隠している場所だけが違う。隠している側をピン留めすると、公式文が生成される。
      </p>
      <div className="mt-5 space-y-3">
        {VOICES.map((v) => {
          const on = pins.includes(v.id);
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => toggle(v.id)}
              className={cn(
                "w-full rounded-2xl border p-4 text-left",
                on ? "border-stamp bg-bg-elevated" : "border-border bg-bg-subtle",
              )}
            >
              <p className="text-xs tracking-[0.14em] text-subtle">{v.who}</p>
              <p className="mt-1 text-sm">{v.said}</p>
              {on && <p className="mt-2 text-sm text-paper-deep">{v.hide}</p>}
            </button>
          );
        })}
      </div>
      <article className="mt-6 rounded-2xl bg-paper p-5 text-ink paper-grain">
        <p className="text-xs tracking-[0.18em] text-ink-soft">自動生成・公式報告</p>
        <p className="mt-3 font-display text-lg leading-relaxed">{report}</p>
        <p className="mt-4 text-xs text-stamp">
          選んだ数が増えても、公式は短くなる。それがマイルドの仕事だ。
        </p>
      </article>
      {completed.length > 0 && (
        <section className="mt-8">
          <p className="text-xs tracking-[0.16em] text-subtle">あなたの足跡（この端末だけ）</p>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {EXHIBITS.filter((e) => completed.includes(e.slug)).map((e) => (
              <li key={e.slug}>
                {e.title}
                {notes[e.slug] ? ` — ${notes[e.slug]}` : ""}
              </li>
            ))}
          </ul>
        </section>
      )}
      <Prompt>全部を残す報告は、長い。短い報告は、誰かを楽にする。あなたはどちらを書くか。</Prompt>
      <div className="mt-6">
        <Button type="button" variant="paper" onClick={() => mark("testimony", pins.join(","))}>
          館を一巡したことにする
        </Button>
      </div>
    </div>
  );
}
