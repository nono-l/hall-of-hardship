import { createFileRoute, Link } from "@tanstack/react-router";
import { MuseumShell } from "@/components/museum-shell";
import { Button } from "@/components/ui/button";
import { EXHIBITS } from "@/lib/exhibits";
import { useVisitStore } from "@/lib/visit-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/hall")({ component: Hall });

function Hall() {
  const completed = useVisitStore((s) => s.completed);
  const reset = useVisitStore((s) => s.reset);
  const allDone = completed.length === EXHIBITS.length;

  return (
    <MuseumShell title="回廊" backTo="/" backLabel="玄関へ">
      <p className="text-sm leading-relaxed text-muted">
        七つの装置。触ると、公式の語がどこで楽をしているかが見える。全部回らなくてもよい。一つで十分なこともある。
      </p>
      <ol className="mt-8 space-y-3">
        {EXHIBITS.map((e) => {
          const done = completed.includes(e.slug);
          return (
            <li key={e.slug}>
              <Link
                to="/room/$slug"
                params={{ slug: e.slug }}
                className={cn(
                  "flex min-h-20 items-stretch overflow-hidden rounded-2xl border transition-colors",
                  done
                    ? "border-paper/40 bg-bg-elevated"
                    : "border-border bg-bg-subtle hover:border-border-strong",
                )}
              >
                <span className="flex w-16 shrink-0 items-center justify-center font-display text-lg text-subtle">
                  {e.number}
                </span>
                <span className="flex flex-1 flex-col justify-center py-3 pr-4">
                  <span className="font-display text-lg">{e.title}</span>
                  <span className="text-sm text-muted">{e.tease}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
      {allDone && (
        <p className="mt-8 rounded-2xl bg-paper p-5 font-display text-lg text-ink">
          公式の一行は、七室分の手触りを捨てて成立する。捨てずに残すなら、報告は長くなる。
        </p>
      )}
      <div className="mt-10">
        <Button type="button" variant="ghost" onClick={() => reset()}>
          足跡を消す
        </Button>
      </div>
    </MuseumShell>
  );
}
