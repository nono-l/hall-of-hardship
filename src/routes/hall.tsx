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
    <MuseumShell title="The hall" backTo="/" backLabel="Back to the entrance">
      <p className="text-sm leading-relaxed text-muted">
        Seven devices. Touch them and you can see where official language is taking it easy.
        You do not have to finish all of them. One is sometimes enough.
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
          The official one-liner only works after throwing away the feel of seven rooms. Keep
          the feel, and the report gets long.
        </p>
      )}
      <div className="mt-10">
        <Button type="button" variant="ghost" onClick={() => reset()}>
          Erase footprints
        </Button>
      </div>
    </MuseumShell>
  );
}
