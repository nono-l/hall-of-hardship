import { useState } from "react";
import { Chip, Prompt } from "@/components/museum-shell";
import { Button } from "@/components/ui/button";
import { useVisitStore } from "@/lib/visit-store";

const SCALE = [
  {
    n: 0,
    label: "現場の口",
    body: "ブレーカー落としてもキャパが残ってる。予備系が生きてるのに「切った」と言い張る。確認したら「舐めてんのか」だ。毎年、死ぬ。",
  },
  {
    n: 25,
    label: "作業メモ",
    body: "遮断後も残電荷と予備回路あり。二次は説明を聞き流す。書類は読めない。返事がない。感電は減っていない。",
  },
  {
    n: 50,
    label: "社内報告",
    body: "作業前の危険箇所説明が十分に定着していない。関係者間の連絡に漏れがある。類似災害が継続している。",
  },
  {
    n: 75,
    label: "公表資料",
    body: "感電死亡災害の多くは、危険箇所に関する情報共有の不足が背景にある。再発防止に向け周知を徹底する。",
  },
  {
    n: 100,
    label: "一行の公式",
    body: "情報共有不足。",
  },
];

const WHO = [
  { id: "analyst", label: "分析する側", hint: "分類できる。原因は一つに畳める。翌年の資料が書ける。" },
  { id: "prime", label: "一次", hint: "説明した記録が残る。伝わらなくても「共有した」側に立てる。" },
  { id: "second", label: "手を動かす側", hint: "マイルドな語は、自分の「はいはい」を目立たなくする。" },
  { id: "client", label: "発注", hint: "工程は守られ、責任の所在は現場のコミュニケーションになる。" },
  { id: "dead", label: "当人", hint: "どの言い方でも、残電圧は残電圧のまま。" },
];

export function WordsExhibit() {
  const [mild, setMild] = useState(50);
  const [who, setWho] = useState<string | null>(null);
  const mark = useVisitStore((s) => s.mark);
  const current = SCALE.reduce((acc, s) => (mild >= s.n ? s : acc), SCALE[0]);

  return (
    <div>
      <p className="text-sm text-muted">
        つまみを動かすと、同じ事実の皮だけが厚くなる。中身は増えない。
      </p>
      <label className="mt-6 block">
        <div className="mb-2 flex justify-between text-xs text-subtle">
          <span>生の口</span>
          <span className="tabular-nums">マイルド {mild}</span>
          <span>公式</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={mild}
          onChange={(e) => setMild(Number(e.target.value))}
          className="h-11 w-full accent-paper"
        />
      </label>
      <article className="mt-5 rounded-2xl bg-paper p-5 text-ink shadow-[var(--shadow-paper)] paper-grain">
        <p className="text-xs tracking-[0.18em] text-ink-soft">{current.label}</p>
        <p className="mt-3 font-display text-lg leading-relaxed">{current.body}</p>
      </article>
      <p className="mt-8 text-sm text-muted">この言い方で、いちばん楽になるのは誰か。</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {WHO.map((w) => (
          <Chip key={w.id} active={who === w.id} onClick={() => setWho(w.id)}>
            {w.label}
          </Chip>
        ))}
      </div>
      {who && (
        <p className="mt-4 rounded-xl border border-border bg-bg-elevated p-4 text-sm text-fg">
          {WHO.find((w) => w.id === who)?.hint}
        </p>
      )}
      <Prompt>マイルドさは優しさか。それとも、次の資料のための省略か。</Prompt>
      <div className="mt-6">
        <Button type="button" onClick={() => mark("words", who ?? "未選択")} variant="paper">
          この室を閉じる
        </Button>
      </div>
    </div>
  );
}
