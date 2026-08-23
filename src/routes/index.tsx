import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-bg text-fg">
      <div className="pointer-events-none absolute inset-0 opacity-40 paper-grain" />
      <div className="relative mx-auto flex min-h-dvh max-w-2xl flex-col justify-end px-5 pb-16 pt-20">
        <p className="text-xs tracking-[0.28em] text-muted">常設展示</p>
        <h1 className="mt-4 font-display text-5xl leading-none sm:text-6xl">本当の苦労館</h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
          公式はマイルドに書く。現場は別の言葉を持っている。この館は、その皮を剥がす装置を置く。正解は置かない。
        </p>
        <blockquote className="mt-8 border-l border-stamp pl-4 text-sm text-paper-deep">
          情報共有不足——短い語は、書類の劣化も、はいはいも、予備系も、今日中も、一つの箱に入れる。
        </blockquote>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="paper" size="lg">
            <Link to="/hall">入館する</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link to="/room/$slug" params={{ slug: "words" }}>
              最初の装置から
            </Link>
          </Button>
        </div>
        <p className="mt-10 text-xs leading-relaxed text-subtle">
          特定の職種を断罪しない。同じ事実が、配役と時間と書類の状態で別の失敗になることを試す。
        </p>
      </div>
    </main>
  );
}
