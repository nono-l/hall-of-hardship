import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-bg text-fg">
      <div className="pointer-events-none absolute inset-0 opacity-40 paper-grain" />
      <div className="relative mx-auto flex min-h-dvh max-w-2xl flex-col justify-end px-5 pb-16 pt-20">
        <p className="text-xs tracking-[0.28em] text-muted">Permanent exhibition</p>
        <h1 className="mt-4 font-display text-5xl leading-none sm:text-6xl">Hall of Hardship</h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
          Official language stays mild. The field keeps other words. This hall is a set of
          devices that peel that skin. There is no correct label.
        </p>
        <blockquote className="mt-8 border-l border-stamp pl-4 text-sm text-paper-deep">
          “Information-sharing deficiency” — a short phrase that can hold unreadable paper,
          yeah-yeah, a live backup circuit, and “finish today” in one box.
        </blockquote>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="paper" size="lg">
            <Link to="/hall">Enter</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link to="/room/$slug" params={{ slug: "words" }}>
              Start with the first device
            </Link>
          </Button>
        </div>
        <p className="mt-10 text-xs leading-relaxed text-subtle">
          This is not an indictment of one trade. The same facts fail differently depending on
          cast, time, and the state of the paper.
        </p>
      </div>
    </main>
  );
}
