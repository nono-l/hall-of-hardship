import { useState } from "react";
import { Prompt } from "@/components/museum-shell";
import { Button } from "@/components/ui/button";
import { useVisitStore } from "@/lib/visit-store";
import { cn } from "@/lib/utils";

const ROLES = [
  { id: "client", label: "発注" },
  { id: "gc", label: "元請" },
  { id: "prime", label: "一次" },
  { id: "hand", label: "手を動かす人" },
] as const;

type RoleId = (typeof ROLES)[number]["id"];

const PERSONAS = [
  {
    id: "careful",
    label: "残す人",
    run: (m: string) => ({
      out: m + "／検電と予備系も確認せよ",
      leak: "詳細は増える。読む負担も増える。",
    }),
  },
  {
    id: "yeah",
    label: "はいはいする人",
    run: (m: string) => ({
      out: "了解。いつも通り。",
      leak: `元の「${m.slice(0, 12)}…」は消えた。`,
    }),
  },
  {
    id: "today",
    label: "今日中の人",
    run: (m: string) => ({
      out: m.replace("確認", "なるべく早く") + "　本日復旧",
      leak: "安全の語が工程の語に置換された。",
    }),
  },
  {
    id: "unread",
    label: "読めない人",
    run: () => ({
      out: "（判読不能のため口頭で「あとで」）",
      leak: "紙は渡った。意味は渡っていない。",
    }),
  },
  {
    id: "camera",
    label: "映像で済ませる人",
    run: (m: string) => ({
      out: "カメラ上、作業中。問題なし。",
      leak: `電圧の話（${m.includes("予備") ? "予備系" : "残電"}）は画に乗らない。`,
    }),
  },
  {
    id: "self",
    label: "自分で測る人",
    run: (m: string) => ({
      out: m + " → 現地で検電してから触る",
      leak: "伝達は不完全でも、最後の行為が危険を止めることがある。",
    }),
  },
];

const SEEDS = [
  "遮断済みに見えるが予備系が生きている。残電荷あり。触る前に検電。",
  "今日中に終わらせること。詳細は一次から。",
  "いつもの盤。手順書どおり。",
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
        二次が悪い、と決めない。四人に性格を割り当て、同じ文がどこで薄まるかを見る。
      </p>
      <p className="mt-6 text-xs tracking-[0.16em] text-subtle">最初の文</p>
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
          渡してみる
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
        丁寧な二次と、はいはいする一次。入れ替えたとき、公式の「二次請け以上」はまだ使えるか。
      </Prompt>
      <div className="mt-6">
        <Button
          type="button"
          variant="ghost"
          onClick={() => mark("relay", ran ? steps[steps.length - 1]?.out : "未実施")}
        >
          この室を閉じる
        </Button>
      </div>
    </div>
  );
}
