import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { type ReactNode, useEffect } from "react";
import { EXHIBITS } from "@/lib/exhibits";
import { useVisitStore } from "@/lib/visit-store";
import { cn } from "@/lib/utils";

export function MuseumShell({
  children,
  title,
  backTo = "/hall",
  backLabel = "Back to the hall",
}: {
  children: ReactNode;
  title?: string;
  backTo?: string;
  backLabel?: string;
}) {
  const hydrate = useVisitStore((s) => s.hydrate);
  const completed = useVisitStore((s) => s.completed);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/92 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <Link
            to={backTo}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted hover:bg-bg-elevated hover:text-fg"
            aria-label={backLabel}
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="font-display text-xs tracking-[0.2em] text-muted">Hall of Hardship</p>
            <p className="truncate text-sm text-fg">{title ?? "Permanent exhibition"}</p>
          </div>
          <p className="tabular-nums text-xs text-subtle">
            {completed.length}/{EXHIBITS.length}
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6 pb-20">{children}</main>
    </div>
  );
}

export function Prompt({ children }: { children: ReactNode }) {
  return (
    <aside className="mt-8 rounded-2xl border border-border bg-bg-elevated p-4 pl-5">
      <p className="text-xs tracking-[0.16em] text-subtle">A question to sit with</p>
      <p className="mt-2 font-display text-base leading-snug text-paper">{children}</p>
    </aside>
  );
}

export function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full border px-3.5 text-sm transition-colors duration-150",
        active
          ? "border-paper bg-paper text-ink"
          : "border-border bg-transparent text-muted hover:border-border-strong hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
