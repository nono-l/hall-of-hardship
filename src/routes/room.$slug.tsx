import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { EXHIBIT_UI } from "@/components/exhibits/registry";
import { MuseumShell } from "@/components/museum-shell";
import { Button } from "@/components/ui/button";
import { getExhibit, NEXT_SLUG } from "@/lib/exhibits";

export const Route = createFileRoute("/room/$slug")({
  component: RoomPage,
});

function RoomPage() {
  const { slug } = Route.useParams();
  const meta = getExhibit(slug);
  if (!meta) throw notFound();
  const Ui = EXHIBIT_UI[meta.slug];
  const next = NEXT_SLUG[meta.slug];

  return (
    <MuseumShell title={`${meta.number} ${meta.title}`}>
      <p className="text-xs tracking-[0.2em] text-official">Official phrase · {meta.official}</p>
      <h1 className="mt-2 font-display text-3xl">{meta.title}</h1>
      <p className="mt-2 text-sm text-muted">{meta.question}</p>
      <div className="mt-8">
        <Ui />
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        {next ? (
          <Button asChild variant="paper">
            <Link to="/room/$slug" params={{ slug: next }}>
              Next device
            </Link>
          </Button>
        ) : (
          <Button asChild variant="paper">
            <Link to="/hall">Return to the hall</Link>
          </Button>
        )}
      </div>
    </MuseumShell>
  );
}
